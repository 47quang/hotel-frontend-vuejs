import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from '../views/Search.vue'
import CustomerHomepage from '../views/CustomerHomepage.vue'
import OwnerDashboard from '../views/OwnerDashboard.vue'
import OwnerHomepage from '../views/OwnerHomepage.vue'
import HotelBooking from '../views/HotelBooking.vue'
import HotelDetail from '../views/HotelDetail.vue'
import HotelRegister from '../views/HotelRegister.vue'
import Product from '../views/Product.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'CustomerHomepage',
    component: CustomerHomepage
  },
  {
    path: '/owner',
    name: 'OwnerHomepage',
    component: OwnerHomepage
  },
  {
    path: '/dashboard',
    name: 'OwnerDashboard',
    component: OwnerDashboard,
  },
  {
    path: '/product',
    name: 'Product',
    component: Product
  },
  {
    path: '/details',
    name: 'HotelDetail',
    component: HotelDetail
  },
  {
    path: '/booking',
    name: 'HotelBooking',
    component: HotelBooking
  },
  {
    path: '/register',
    name: 'HotelRegister',
    component: HotelRegister
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
