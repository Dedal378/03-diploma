import { createStore } from 'vuex'
import axios from "axios"

const firebaseLink = process.env.VUE_APP_FIREBASE_LINK

export default createStore({
  state() {
    return {
      tasks: [],
      badges: [
        { active: 'primary' },
        { inAction: 'warning' },
        { completed: 'primary' },
        { cancelled: 'danger' },
      ],
    }
  },
  mutations: {
    loadTasks(state, tasks) {
      state.tasks = Object.keys(tasks).map(key => {
        return { ...tasks[key] }
      })
    },
    setStatus(state, status) {
      state.tasks.map(key => key.status = status)
    },
  },
  actions: {
    async loadTasks({ commit }) {
      const { data } = await axios.get(`${ firebaseLink }/tasks.json`)
      commit('loadTasks', data)
    },
    async setStatus({ commit }, status) {

      commit('setStatus', status)
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