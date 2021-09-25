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
      state.tasks = tasks
    },
    setStatus(state, newStatus) {
      const id = state.tasks.find(t => t.id === newStatus.id)
      id.status = newStatus.status
    },
    createTask(state, tasks) {
      state.tasks.push(tasks)
    },
  },
  actions: {
    async loadTasks({ commit }) {
      let { data: tasks } = await axios.get(`${ firebaseLink }tasks.json`)

      tasks = Object.keys(tasks).map(key => {
        return { ...tasks[key] }
      })
      commit('loadTasks', tasks)
    },
    async setStatus({ commit, state }, newStatus) {
      const id = state.tasks.find(t => t.id === newStatus.id).id
      await axios.put(`${ firebaseLink }tasks/${ id }.json`, newStatus)
      commit('setStatus', newStatus)
    },
    async createTask({ commit }, task) {
      await axios.post(`${ firebaseLink }tasks.json`, task)

      let { data: tasks } = await axios.get(`${ firebaseLink }tasks.json`)
      const arrTasks = Object.entries(tasks)
      const lastEl = arrTasks[arrTasks.length - 1]
      lastEl[1].id = lastEl[0]
      tasks = await axios.put(`${ firebaseLink }tasks/${ lastEl[0] }.json`, lastEl[1])

      commit('createTask', tasks.data)
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