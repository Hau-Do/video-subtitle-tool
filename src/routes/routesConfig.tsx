import { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { IRoutes } from './Routes.d';
import { RoutesString } from './routesString';

const HomePage = lazy(() => import('pages/home'));

export const routesConfig: IRoutes[] = [
  {
    path: RoutesString.MemberLayout,
    routes: [
      {
        path: RoutesString.Home,
        page: HomePage,
      },
    ],
  },
];
