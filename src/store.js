import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from './router';

Vue.use(Vuex);

const mutations = {
  cacheUser(state, { token, username, displayName }) {
    state.isLoggedIn = true;
    state.userToken = token;
    state.userEmail = username;
    state.userDisplayName = displayName;
  },

  deleteUserCache(state) {
    state.isLoggedIn = false;
    state.userToken = '';
    state.userEmail = '';
    state.userDisplayName = '';
  },
};

const actions = {
  async login({ commit }, payload) {
    const response = await axios.post(`${process.env.VUE_APP_API_URL}/jwt-auth/v1/token`, {
      username: payload.username,
      password: payload.password,
    });
    
    const data = response.data.data;
    
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('token', data.token);
    localStorage.setItem('displayName', data.displayName);
    localStorage.setItem('email', data.email);

    // call cacheUser() from mutations
    await commit('cacheUser', {
      token: data.token,
      email: data.email,
      displayName: data.displayName,
    });
  },

  async logout({ commit }) {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('displayName');

    await commit('deleteUserCache');
    router.push({ name: 'UserLogin' });

  },

  /**
   * Check if user if logged in
   */
  async checkLoginState({ commit }) {
    const token = localStorage.getItem('token');

    // if no token, empty the loggedIn cache
    if (!token) {
      await commit('deleteUserCache');
      return false;
    }

    // if has token, check if it's still valid
    try {
      await axios.post(
        `${process.env.VUE_APP_API_URL}/jwt-auth/v1/token/validate`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      
      // if still valid, cache it again
      await commit('cacheUser', {
        token,
        email: localStorage.getItem('email'),
        displayName: localStorage.getItem('displayName'),
      });

      return true;
    } catch (error) {
      localStorage.setItem('token', '');
      return false;
    }
  },
}


const store = {
  // This is global data, use mutations and actions to change this value.
  state: {
    isAdmin: false,
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    userToken: localStorage.getItem('token') || '',
    userEmail: localStorage.getItem('email') || '',
    userDisplayName: localStorage.getItem('displayName') || '',
  },

  mutations,
  actions,
  modules: {
  },
};

export default new Vuex.Store(store);
