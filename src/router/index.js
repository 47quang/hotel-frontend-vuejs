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
import Review from '../views/Review.vue'
import OwnerUpdate from '../components/Owner/OwnerUpdate'
import Dashboard from '../components/Dashboard/Dashboard'
import DashboardHotelListing from '../components/Dashboard/DashboardHotelListing'
import DashboardAddHotel from '../components/Dashboard/DashboardAddHotel'
import DashboardEditHotel from '../components/Dashboard/DashboardEditHotel'
import DashboardAddRoom from '../components/Dashboard/DashboardAddRoom'
import DashboardRoomListing from '../components/Dashboard/DashboardRoomListing'
import DashboardUpdateRoom from '../components/Dashboard/DashboardUpdateRoom'
import DashboardUpdateHotel from '../components/Dashboard/DashboardUpdateHotel'
import AddToCart from '../views/AddToCart'
import CustomerReviews from '../components/CustomerReviews'

import DashboardManageOrder from '../components/Dashboard/DashboardManageOrder'
import DashboardHotelOrder from '../components/Dashboard/DashboardHotelOrder'
import AdminSignIn from '../components/Admin/AdminSignIn'
import CustomerUpdate from '../components/Customer/CustomerUpdate.vue'
import AdminDashboard from '../components/Admin/AdminDashboard'
import AdminOverall from '../components/Admin/AdminOverall'
import AdminAttribute from '../components/Admin/AdminAttribute'
import DashboardAddHotelStep1 from '../components/Dashboard/DashboardAddHotelStep1'
import DashboardAddHotelStep2 from '../components/Dashboard/DashboardAddHotelStep2'
import DashboardAddHotelStep3 from '../components/Dashboard/DashboardAddHotelStep3'


Vue.use(VueRouter)

const routes = [
  {
    path: '/customer-update',
    name: 'CustomerUpdate',
    component: CustomerUpdate
  },
  {
    path: '/customer-review',
    name:  'CustomerReviews',
    component: CustomerReviews
  },
  {
    path: '/add-to-cart/:id',
    name:  'AddToCart',
    component: AddToCart
  },
  {
    path: '/review/:id',
    name:  'Review',
    component: Review
  },
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
    path: '/dashboard/:id',
    // name: 'OwnerDashboard',
    component: OwnerDashboard,
    children: [
      {
        path: '',
        component: Dashboard
      },
      {
        path: 'profile',
        component: OwnerUpdate
      },
      {
        path: 'listing',
        component: DashboardHotelListing
      },
      {
        path: 'hotels',
        component: DashboardAddHotel,
        children: [
          {
            path: '',
            component: DashboardAddHotelStep1
          },
          {
            path: 'location',
            component: DashboardAddHotelStep2
          },
          {
            path: 'photos',
            component: DashboardAddHotelStep3
          }
        ]
      },
      {
        path: 'orders',
        component: DashboardManageOrder
      }
    ]
  },
  {
    path: '/product',
    name: 'Product',
    component: Product
  },
  {
    path: '/details/:id',
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
    path: '/search/:id',
    name: 'Search',
    component: Search
  },
  {
    path: '/hotel/:id/room',
    component: DashboardEditHotel,
    children: [
      {
        path: '',
        component: DashboardRoomListing
      },
      {
        path: 'new',
        component: DashboardAddRoom
      },
      {
        path: ':roomId',
        component: DashboardUpdateRoom
      }
    ]
  },
  {
    path: '/hotel/:id',
    component: DashboardEditHotel,
    children: [
      {
        path: 'update',
        component: DashboardUpdateHotel
      },
      {
        path: 'orders',
        component: DashboardHotelOrder
      }
    ]
  },
  {
    path: '/admin',
    component: AdminSignIn,
  },
  {
    path: '/admin/dashboard/:id',
    component: AdminDashboard,
    children: [
      {
        path: '',
        component: AdminOverall
      },
      {
        path: 'attributes',
        component: AdminAttribute
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  var token = localStorage.getItem('accessToken')
  let requiredAuth = ['/dashboard']
  if (!token && requiredAuth.find((r) => to.path.includes(r))) {
    next('/')
  } else {
    next()
  }
})
export default router
