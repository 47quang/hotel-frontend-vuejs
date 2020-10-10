import Vue from 'vue';
import Vuex from 'vuex';
import { BASE_URL, actions } from './action';
import { mutations } from './mutation';
Vue.use(Vuex);

const localUser = JSON.parse(localStorage.getItem('user'));
const localHotels = JSON.parse(localStorage.getItem('hotels'));
const localCustomer = JSON.parse(localStorage.getItem('customer'));
const orderLines = JSON.parse(localStorage.getItem('orderLine'));

export default new Vuex.Store({
  state: {
    BASE_URL,
    curOwner: localUser || {},
    customer: {
      username: '',
      password: '',
      address: '',
      phone: '',
      email: '',
      fullname: '',
    },
    myCustomer:localCustomer || {},
    hotel: {},
    provinces: {},
    districts: {},
    wards: {},
    ownerHotels: localHotels || [],
    hotelById: {},
    wardById: {},
    districtById: {},
    provinceById: {},
    attributes: {},
    roomsByHotelId: {},
    roomById: {},
    reviews: {},
    customerById: {},
    orderLines,
  },
  mutations,
  actions,
});
