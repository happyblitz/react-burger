import {
  createBrowserRouter,
  redirect,
  type LoaderFunctionArgs,
} from 'react-router-dom';

import { App } from './components/app/app';
import { IngredientModal } from './components/ingredient-modal/ingredient-modal';
import { Profile } from './components/profile/profile';
import { ErrorPage } from './pages/error-page/error-page';
import { FeedPage } from './pages/feed-page/feed-page';
import { ForgotPasswordPage } from './pages/forgot-password/forgot-password';
import { HomePage } from './pages/home-page/home-page';
import { LoginPage } from './pages/login-page/login-page';
import { NotFoundPage } from './pages/not-found-page/not-found-page';
import { ProfileOrderPage } from './pages/profile-order-page/profile-order-page';
import { ProfilePage } from './pages/profile-page/profile-page';
import { RegisterPage } from './pages/register-page/register-page';
import { ResetPasswordPage } from './pages/reset-password/reset-password';
import { ingredientsApi } from './services/api/ingredientsApi';
import { store } from './services/store';
import { CustomError } from './utils/CustomError';

import type { TIngredient } from './utils/types';

const ingredientModalLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<TIngredient> => {
  const { id } = params;

  if (!id) {
    throw new CustomError({ message: 'Ingredient not found', status: 404 });
  }

  const { data: ingredients } = await store.dispatch(
    ingredientsApi.endpoints.getIngredients.initiate()
  );
  const ingredient = ingredients?.find((i) => i._id === id);

  if (!ingredient) {
    throw new CustomError({ message: 'Ingredient not found', status: 404 });
  }

  return ingredient;
};

const resetPasswordLoader = (): Response | null => {
  const isResetPasswordRequested = localStorage.getItem('isResetPasswordRequested');

  if (!isResetPasswordRequested) {
    return redirect('/forgot-password');
  }

  return null;
};

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: '',
            element: <HomePage />,
            children: [
              {
                path: 'ingredients/:id',
                element: <IngredientModal />,
                loader: ingredientModalLoader,
              },
            ],
          },
          {
            path: 'register',
            element: <RegisterPage />,
          },
          {
            path: 'login',
            element: <LoginPage />,
          },
          {
            path: 'forgot-password',
            element: <ForgotPasswordPage />,
          },
          {
            path: 'reset-password',
            element: <ResetPasswordPage />,
            loader: resetPasswordLoader,
          },
          {
            path: 'profile',
            element: <Profile />,
            children: [
              {
                path: '',
                element: <ProfilePage />,
              },
              {
                path: 'orders',
                element: <ProfileOrderPage />,
              },
            ],
          },
          {
            path: 'feed',
            element: <FeedPage />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
