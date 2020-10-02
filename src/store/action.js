import axios from 'axios';

export const BASE_URL = process.env.VUE_APP_API_BASE_URL;

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: false,
});

client.interceptors.request.use((config) => {
  Object.assign(config.headers, getDefaultHeader());
  return config;
});

function getDefaultHeader() {
  return {
    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('accessToken')),
  };
}

export const actions = {
  async register(ctx, payload) {
    await axios.post(`${BASE_URL}/api.customer/register`, payload);
  },
  signIn(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
        .post(`${BASE_URL}/api.customer/login`, payload)
        .then((resp) => resp.data)
        .then((body) => {
          ctx.commit('SIGN_IN', body.data.user);
          localStorage.setItem('accessToken', JSON.stringify(body.data.accessToken));
          resolve(body);
        })
        .catch((err) => {
          reject(err);
          alert('Your username was wrong! Please re-try');
        });
    });
  },
  uploadImage(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
        .post(`${BASE_URL}/api.upload/image`, payload, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((resp) => resp.data)
        .then((body) => {
          resolve(body);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  async ownerSignUp(ctx, payload) {
    await axios.post(`${BASE_URL}/api.user/register`, payload);
  },
  ownerSignIn(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
        .post(`${BASE_URL}/api.user/login`, payload)
        .then((resp) => resp.data)
        .then((body) => {
          ctx.commit('OWNER_SIGN_IN', body.data.user);
          localStorage.setItem('accessToken', JSON.stringify(body.data.accessToken));
          localStorage.setItem('user', JSON.stringify(body.data.user));
          resolve(body);
        })
        .catch((err) => {
          reject(err);
          alert('Something went wrong! Please check your username or password!');
        });
    });
  },
  ownerSignOut(ctx) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    localStorage.removeItem('hotels');
    ctx.commit('OWNER_SIGN_OUT');
  },
  searchHotel(ctx, payload) {
    ctx.commit('SEARCH_HOTEL', payload);
  },
  updateUser(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
        .put(`${BASE_URL}/api.user/${payload.id}`, payload)
        .then((resp) => resp.data)
        .then((body) => {
          ctx.commit('OWNER_UPDATE', body.data);
          localStorage.setItem('user', JSON.stringify(body.data));
          resolve(body);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  registerHotel(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
      .post(`${BASE_URL}/api.hotel`, payload)
      .then((resp) => resp.data)
      .then(body => {
        resolve(body);
      })
      .catch(err => {
        reject(err);
      })
    })
  },
  fetchProvince(ctx) {
    return new Promise((resolve, reject) => {
      client
      .get(`${BASE_URL}/api.province`)
      .then(resp => resp.data)
      .then(body => {
        ctx.commit('FETCH_PROVINCE', body.data);
        resolve(body);
      })
      .catch(err => {
        reject(err);
      })
    })
  },
  fetchDistrict(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
      .get(`${BASE_URL}/api.district?provinceId=${payload}`)
      .then(resp => resp.data)
      .then(body => {
        ctx.commit('FETCH_DISTRICT', body.data);
        resolve(body);
      })
      .catch(err => {
        reject(err);
      })
    })
  },
  fetchHotels(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
      .get(`${BASE_URL}/api.hotel?ownerId=${payload}`)
      .then(resp => resp.data)
      .then(body => {
        ctx.commit('FETCH_HOTELS', body.data);
        localStorage.setItem('hotels', JSON.stringify(body.data));
        resolve(body);
      })
      .catch(err => {
        reject(err);
      })
    })
  },
  fetchWards(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
      .get(`${BASE_URL}/api.ward?districtId=${payload}`)
      .then(resp => resp.data)
      .then(body => {
        ctx.commit('FETCH_WARDS', body.data);
        resolve(body);
      })
      .catch(err => {
        reject(err);
      })
    })
  },
  deleteHotel(ctx, payload) {
    return new Promise((resolve, reject) => {
      client
      .delete(`${BASE_URL}/api.hotel/${payload}`)
      .then(resp => resp.data)
      .then(body => {
        resolve(body);
      })
      .catch(err => {
        reject(err);
      })
    })
  }
};
