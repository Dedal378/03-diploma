import { createStore } from 'vuex'
import axios from "axios"

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
  },
  actions: {
    async loadTasks({ commit }) {
      const firebaseData = process.env.VUE_APP_FIREBASE_DATA
      const { data } = await axios.get(`${ firebaseData }/tasks.json`)
      commit('loadTasks', data)
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