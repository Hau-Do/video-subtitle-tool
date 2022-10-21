import { lazy } from 'react'
import { Redirect } from 'react-router-dom'
import { IRoutes } from './Routes.d'
import { RoutesString } from './routesString'

const PrivateLayout = lazy(() => import('layouts/PrivateLayout'))
const ErrorLayout = lazy(() => import('layouts/ErrorLayout'))
const TimebarPage = lazy(() => import('components/pages/TimebarPage'))
const TranslatorPage = lazy(() => import('components/pages/TranslatorPage'))
const ErrorNotFoundPage = lazy(() => import('components/pages/Errors/NotFoundPage'))
const ErrorAccessDeniedPage = lazy(() => import('components/pages/Errors/AccessDeniedPage'))
const Guard = lazy(() => import('guards'))

export const routesConfig: IRoutes[] = [
  {
    layout: ErrorLayout,
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
    layout: PrivateLayout,
    path: RoutesString.Home,
    guard: Guard,
    routes: [
      {
        path: RoutesString.Home,
        page: TimebarPage,
        exact: true
      },
      {
        path: RoutesString.Timebar,
        page: TimebarPage,
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
