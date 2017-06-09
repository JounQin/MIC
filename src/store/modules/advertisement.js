import {generateGetters} from 'utils'

const SET_BANNERS = 'SET_BANNERS'
const SET_RECOMMENDATIONS = 'SET_RECOMMENDATIONS'

export default axios => {
  const state = {
    banners: null,
    recommendations: null
  }

  const getters = generateGetters(Object.keys(state))

  const actions = {
    async fetchBanners({state, commit}) {
      if (state.banners) return
      commit(SET_BANNERS, (await axios.get('/fetch-banners')).data)
    },
    async fetchRecommendations({state, commit}) {
      if (state.recommendations) return
      commit(SET_RECOMMENDATIONS, (await axios.get('/fetch-recommendations')).data)
    }
  }

  const mutations = {
    [SET_BANNERS](state, banners) {
      state.banners = banners
    },
    [SET_RECOMMENDATIONS](state, recommendations) {
      state.recommendations = recommendations
    }
  }

  return {
    state,
    getters,
    actions,
    mutations
  }
}
