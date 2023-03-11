import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux'
import App from '../src/app'
import store from '../src/store/index'
import SignIn from './pages/SignIn';
import SignUp from './pages/signUp';
import NewOrders from './pages/NewOrders';
import MenuRefactoring from './pages/Menurefactoring';
import Tables from './pages/Tables';
import Orders from './pages/Orders';
import CurrentOrder from './pages/currentOrder';
import Myprofilerefactoring from './pages/Myprofilerefactoring';


const router = createBrowserRouter([
  {
    path: '/sign-in',
    element: <SignIn />
  },
  {
    path: '/sign-up',
    element: <SignUp />
  },
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: '/neworders',
        element: <NewOrders />
      },
      {
        path: '/menu',
        element: <MenuRefactoring/>
      },
      {
        path: '/profile',
        element: <Myprofilerefactoring />
      },
      {
        path: '/tables',
        element: <Tables />
      },
      {
        path: '/orders',
        element: <Orders />
      },
      {
        path: '/neworders/:id',
        element: <CurrentOrder />
      },
      {
        path: '/orders/:id',
        element: <CurrentOrder />
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(

  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
