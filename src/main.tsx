import axios from 'axios';
import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, defer, RouterProvider } from 'react-router-dom';
import { PREFIX } from './helpers/API.ts';
import RequireAuth from './helpers/RequireAuth.tsx';
import './index.css';
import AuthLayout from './layout/Auth/Auth.layout.tsx';
import Layout from './layout/Menu/Layout.tsx';
import Cart from './pages/Cart/Cart.tsx';
import ErrorPage from './pages/Error/Error.tsx';
import Login from './pages/Login/Login.tsx';
import Product from './pages/Product/Product.tsx';
import Registration from './pages/Registration/Registration.tsx';
import { Success } from './pages/Success/Success.tsx';
import { store } from './store/store.ts';

const Menu = lazy(() => import('./pages/Menu/Menu.tsx'));

const router = createBrowserRouter([
	{
		path: '/',
		element: <RequireAuth><Layout /></RequireAuth>,
		children: [
			{
				path: '/',
				element: <Suspense fallback={<>Загрузка...</>}><Menu /></Suspense>
			},
			{
				path: '/success',
				element: <Success />
			},
			{
				path: '/cart',
				element: <Cart />
			},
			{
				path: '/product/:id',
				element: <Product />,
				errorElement: <>Ошибка</>,
				loader: async ({ params }) => {
					return defer({
						data: new Promise((resolve, reject) => {
							setTimeout(() => {
								axios.get(`${PREFIX}/products/${params.id}`).then(data => resolve(data)).catch(e => reject(e));
							}, 2000);
						})
					});
				}
			}
		]
	},
	{
		path: '/auth',
		element: <AuthLayout />,
		children: [
			{
				path: 'login',
				element: <Login />
			},
			{
				path: 'registration',
				element: <Registration />
			}
		]
	},
	{
		path: '*',
		element: <ErrorPage />
	}
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
);
