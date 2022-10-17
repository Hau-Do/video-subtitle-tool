import { lazy } from 'react'
import { Redirect } from 'react-router-dom'
import { IRoutes } from './Routes.d'
import { RoutesString } from './routesString'

const HomePage = lazy(() => import('components/pages/home'))
const TranslatorPage = lazy(() => import('components/pages/translator'))
const MemberLayout = lazy(() => import('layouts/member'))
const AnonymousLayout = lazy(() => import('layouts/anonymous'))
const MemberGuard = lazy(() => import('guards/member'))
const ErrorNotFoundPage = lazy(() => import('components/pages/errors/notFound'))
const ErrorAccessDeniedPage = lazy(() => import('components/pages/errors/accessDenied'))

export const routesConfig: IRoutes[] = [
  {
    layout: AnonymousLayout,
    path: RoutesString.Error,
    routes: [
      {
        path: RoutesString.AccessDenied,
        page: ErrorAccessDeniedPage,
        exact: true
      },
      {
        path: RoutesString.NotFound,
        page: ErrorNotFoundPage,
        exact: true
      }
    ]
  },
  {
    path: RoutesString.MemberLayout,
    layout: MemberLayout,
    guard: MemberGuard,
    routes: [
      {
        path: RoutesString.Home,
        page: HomePage,
        exact: true
      },
      {
        path: RoutesString.Translator,
        page: TranslatorPage
      },
      {
        page: () => <Redirect to={RoutesString.NotFound} />,
        path: '*'
      }
    ]
  }
]
