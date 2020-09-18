import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const BASE_URL= "http://hotel.eyeteam.vn:3456"

const client = axios.create({
  baseURL : BASE_URL,
  timeout: 10000,
  withCredentials: false
})
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
    myCustomer:{
    
    }
  },
  mutations: {
    SIGN_IN(state, payload){
      state.myCustomer = payload
    },
    OWNER_SIGN_IN(state, payload) {
      state.curOwner = payload;
      console.log('CurUser:', state.curOwner);
    }
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
          localStorage.setItem('accessToken', JSON.stringify(res.data.accessToken));
          localStorage.setItem('user', JSON.stringify(res.data.user));
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
