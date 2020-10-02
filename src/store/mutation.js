export const mutations = {
  SIGN_IN(state, payload) {
    state.myCustomer = payload;
  },
  OWNER_SIGN_IN(state, payload) {
    state.curOwner = payload;
  },
  OWNER_SIGN_OUT(state) {
    state.curOwner = {};
  },
  SEARCH_HOTEL(state, payload) {
    state.hotel = payload;
  },
  OWNER_UPDATE(state, payload) {
    state.curOwner = payload;
  },
  FETCH_PROVINCE(state, payload) {
    state.provinces = payload;
  },
  FETCH_DISTRICT(state, payload) {
    state.districts = payload;
  },
  FETCH_HOTELS(state, payload) {
    state.ownerHotels = payload;
  },
  FETCH_WARDS(state, payload) {
    state.wards = payload;
  }
}