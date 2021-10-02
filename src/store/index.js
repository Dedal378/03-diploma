import { createStore } from 'vuex'
import axios from "axios"

const firebaseLink = process.env.VUE_APP_FIREBASE_LINK

export default createStore({
  state() {
    return {
      tasks: [],
      loading: false
    }
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload
    },
    loadTasks(state, tasks) {
      state.tasks = tasks
    },
    setStatus(state, newStatus) {
      const id = state.tasks.find(t => t.id === newStatus.id)
      id.status = newStatus.status
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    createTask(state, tasks) {
      state.tasks.push(tasks)
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
  },
  actions: {
    setLoading({ commit }, payload) {
      commit('setLoading', payload)
    },
    async loadTasks({ commit }) {
      commit('setLoading', true)
      let { data: tasks } = await axios.get(`${ firebaseLink }tasks.json`)

      if (localStorage !== 'tasks') {
        localStorage.setItem('tasks', JSON.stringify(tasks))
      } else {
        JSON.parse(localStorage.getItem('tasks'))
      }

      tasks = Object.keys(tasks).map(key => {
        return { ...tasks[key] }
      })
      commit('loadTasks', tasks)
      commit('setLoading', false)
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
    loading(state) {
      return state.loading
    },
    tasks(state) {
      return state.tasks
    },
    taskId(_, getters) {
      return id => getters.tasks.find(t => t.id === id)
    },
    taskActive(state) {
      return state.tasks.filter(t => t.status === 'active').length
    },
    filterByStatus(_, getters) {
      const filteredTasks = status => {
        if (!status) return getters.tasks
        return getters.tasks.filter(t => t.status === status)
      }
      return filteredTasks
    },
  },
})
