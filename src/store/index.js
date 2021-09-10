import { createStore } from 'vuex'

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

  },
  actions: {

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