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
          localStorage.setItem('accessToken', JSON.stringify(res.data.accessToken))
          console.log(res.data)
          resolve(res);
        })
        .catch(err => {
          reject(err);
          alert('Your username was wrong! Please re-try')
        })
      })
    }
  },
  modules: {
  }
})
