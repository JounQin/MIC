import {generateGetters} from 'utils'

const RESET_USER = 'RESET_USER'

export default axios => {
  const state = {
    userName: null,
    userId: null,
    unreadMsg: false
  }
  const getters = generateGetters(Object.keys(state))
  const actions = {
    async fetchUser({state, commit}) {
      if (state.userId) return
      commit(RESET_USER, (await axios.get('/fetch-user')).data)
    }
  }
  const mutations = {
    [RESET_USER](state, user) {
      Object.assign(state, user)
    }
  }

  return {
    state,
    getters,
    actions,
    mutations
  }
}
