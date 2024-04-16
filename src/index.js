import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { persistor } from './store/store'
import { PersistGate } from 'redux-persist/integration/react'
import MainPage from './pages/MainPage'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import App from './App'
import './style/app.scss'

import CategoriesPage from './pages/CategoriesPage'
import ProductsPage from './pages/ProductsPage'
import SalesPage from './pages/SalesPage'
import SingleCategoryPage from './pages/SingleCategoryPage'
import SingleProductPage from './pages/SingleProductPage'
import CartPage from './pages/CartPage'
import FavoritesPage from './pages/FavoritesPage'
import NotFound from './components/NotFound/NotFound'

const router = createBrowserRouter([
  {
    path: '/', // домашняя страница
    element: <App />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/categories',
        element: <CategoriesPage />,
      },
      {
        path: '/categories/:id',

        element: <SingleCategoryPage />,
      },
      {
        path: '/products',
        element: <ProductsPage />,
      },
      {
        path: '/products/:id',

        element: <SingleProductPage />,
      },
      {
        path: '/sales',
        element: <SalesPage />,
      },
      {
        path: '/cart',
        element: <CartPage />,
      },
      {
        path: '/favorites',
        element: <FavoritesPage />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </PersistGate>
  </Provider>,
)
console.log('API URL:', process.env.REACT_APP_API_URL)
