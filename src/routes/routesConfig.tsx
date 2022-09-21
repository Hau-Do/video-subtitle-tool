import { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { IRoutes } from './Routes.d';
import { RoutesString } from './routesString';

const HomePage = lazy(() => import('pages/home'));
const TranslatorPage = lazy(() => import('pages/translator'));
const AnonymousLayout = lazy(() => import('layouts/anonymous'));

export const routesConfig: IRoutes[] = [
  {
    path: RoutesString.MemberLayout,
    layout: AnonymousLayout,
    routes: [
      {
        path: RoutesString.Home,
        page: HomePage,
        exact: true,
      },
      {
        path: RoutesString.Translator,
        page: TranslatorPage,
      },
    ],
  },
];
