import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const BASE_URL= process.env.VUE_APP_API_BASE_URL;

const client = axios.create({
  baseURL : BASE_URL,
  timeout: 10000,
  withCredentials: false
});

client.interceptors.request.use((config) => {
  Object.assign(config.headers, getDefaultHeader());
  return config;
});

function getDefaultHeader() {
  return {
    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
  };
}

export default new Vuex.Store({
  state: {
    BASE_URL,
    curOwner: {},
    customer: {
      username: '',
      password: '',
      address : '',
      phone: '',
      email: '',
      fullname: ''
    },
    myCustomer:{},
    hotel: {}
  },
  mutations: {
    SIGN_IN(state, payload){
      state.myCustomer = payload
    },
    OWNER_SIGN_IN(state, payload) {
      state.curOwner = payload;
      console.log('CurUser:', state.curOwner);
    },
    SEARCH_HOTEL(state, payload) {
      state.hotel= payload
    },
   
  },
  actions: {
    async register(ctx, payload){
      await axios.post(`${BASE_URL}/api.customer/register`, payload)
    },
    signIn(ctx, payload){
      return new Promise ((resolve, reject) => {
        client
        .post(`${BASE_URL}/api.customer/login`, payload)
        .then( res => {
          ctx.commit('SIGN_IN', res.data.user);
          localStorage.setItem('accessToken', JSON.stringify(res.data.accessToken));
          console.log(res.data);
          resolve(res)
        })
        .catch(err => {
          reject(err);
          alert('Your username was wrong! Please re-try');
        })
      })
    },
    async ownerSignUp(ctx, payload) {
      await axios.post(`${BASE_URL}/api.user/register`, payload)
    },
    ownerSignIn(ctx, payload) {
      return new Promise((resolve, reject) => {
        client
        .post(`${BASE_URL}/api.user/login`, payload)
        .then(res => {
          ctx.commit('OWNER_SIGN_IN', res.data.user);
          localStorage.setItem('accessToken', res.data.accessToken);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          resolve(res);
        })
        .catch(err => {
          reject(err);
          alert("Something went wrong! Please check your username or password!")
        })
      })
    },
    searchHotel(ctx,payload) {
      ctx.commit('SEARCH_HOTEL', payload);
      console.log(payload)
    },
    saveInfo(ctx,payload) {
      return new Promise((resolve, reject) => {
        
        client
        .put(`${BASE_URL}/api.user/${payload.id}`, payload.owner)
        .then(res => {
          ctx.commit('OWNER_UPDATE', res.data)
          console.log(res.data)
          resolve(res);
        })
        .catch(err => {
          reject(err);
        })
      })
    }
  },
  modules: {
  }
})
