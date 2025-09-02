import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import HomePage from '../views/HomePage.vue'
import FeaturedProductsPage from '../views/FeaturedProductsPage.vue'
import CategoriesPage from '../views/CategoriesPage.vue'
import NewArrivalsPage from '../views/NewArrivalsPage.vue'
import DealsPage from '../views/DealsPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import HistoryPage from '../views/HistoryPage.vue'
import FavoritesPage from '../views/FavoritesPage.vue'
import OrdersPage from '../views/OrdersPage.vue'
import LogisticsPage from '../views/LogisticsPage.vue'
import CouponsPage from '../views/CouponsPage.vue'
import MembershipPage from '../views/MembershipPage.vue'
import ProductDetailPage from '../views/ProductDetailPage.vue'
import ElectronicsPage from '../views/ElectronicsPage.vue'
import ClothingPage from '../views/ClothingPage.vue'
import HomeLifePage from '../views/HomeLifePage.vue'
import BeautyPage from '../views/BeautyPage.vue'
import SportsPage from '../views/SportsPage.vue'
import BooksPage from '../views/BooksPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/featured',
    name: 'FeaturedProducts',
    component: FeaturedProductsPage
  },
  {
    path: '/categories',
    name: 'Categories',
    component: CategoriesPage
  },
  {
    path: '/new-arrivals',
    name: 'NewArrivals',
    component: NewArrivalsPage
  },
  {
    path: '/deals',
    name: 'Deals',
    component: DealsPage
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage
  },
  {
    path: '/history',
    name: 'History',
    component: HistoryPage
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: FavoritesPage
  },
  {
    path: '/orders',
    name: 'Orders',
    component: OrdersPage
  },
  {
    path: '/logistics',
    name: 'Logistics',
    component: LogisticsPage
  },
  {
    path: '/coupons',
    name: 'Coupons',
    component: CouponsPage
  },
  {
    path: '/membership',
    name: 'Membership',
    component: MembershipPage
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetailPage
  },
  {
    path: '/electronics',
    name: 'Electronics',
    component: ElectronicsPage
  },
  {
    path: '/clothing',
    name: 'Clothing',
    component: ClothingPage
  },
  {
    path: '/home-life',
    name: 'HomeLife',
    component: HomeLifePage
  },
  {
    path: '/beauty',
    name: 'Beauty',
    component: BeautyPage
  },
  {
    path: '/sports',
    name: 'Sports',
    component: SportsPage
  },
  {
    path: '/books',
    name: 'Books',
    component: BooksPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router