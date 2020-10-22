const state = {
  openDialog: false
}

const getters = {
  getOpenDialog (state) {
    return state.openDialog
  }
}

const mutations = {
  SET_OPENDIALOG (state, data) {
    state.openDialog = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
