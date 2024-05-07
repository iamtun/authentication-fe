import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import React from 'react';
import { HomePage, LoginPage } from '../pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },

  {
    path: '/login',
    element: <LoginPage />,
  },
]);

const RootRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default RootRouter;
