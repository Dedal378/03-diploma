import { createStore } from 'vuex'
import axios from "axios"

const firebaseLink = process.env.VUE_APP_FIREBASE_LINK

export default createStore({
  state() {
    return {
      tasks: [],
    }
  },
  mutations: {
    loadTasks(state, tasks) {
      state.tasks = Object.keys(tasks).map(key => {
        return { ...tasks[key] }
      })
    },
    setStatus(state, newStatus) {
      const id = state.tasks.find(t => t.id === newStatus.id)
      id.status = newStatus.status
    },
  },
  actions: {
    async loadTasks({ commit }) {
      const { data } = await axios.get(`${ firebaseLink }tasks.json`)
      commit('loadTasks', data)
    },
    async setStatus({ commit, state }, newStatus) {
      const id = state.tasks.find(t => t.id === newStatus.id).id
      await axios.put(`${ firebaseLink }tasks/${id}.json`, newStatus)
      commit('setStatus', newStatus)
    },
  },
  getters: {
    tasks(state) {
      return state.tasks
    },
    taskId(_, getters) {
      return id => getters.tasks.find(t => t.id === id)
    },
    taskActive(state) {
      return state.tasks.filter(t => t.status === 'active').length
    },
  },
})