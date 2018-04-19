const LG = console.log; // eslint-disable-line no-console, no-unused-vars

export const currentUser = {
  // Getter of your current user.
  // If you use store, then store will be passed
  child: store => (store ? store.state.a12n.user.info : null),

  // child: (store) =>
  //   return store.state.user;
  //   // or
  //   // return decode(localStorage.getItem('jwt'));
  //   // or your very own logic..
  // }
};

const state = {
  user: {
    info: {
      name: 'Bob',
      role: 'admin',
    },
  },
};

const getters = {};

const mutations = {
  changeRole(vx, newRole) {
    vx.a12n.user.info.role = newRole; // eslint-disable-line no-param-reassign
  },
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions,
};
