import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      tasks: [
        {
          id: '0768768',
          title: 'Записать решение 3 курсовой',
          date: '24.05.23',
          status: 'danger',
          text: 'Текст этой задачи',
        },
      ],
      badges: [
        { done: 'primary' },
        { cancelled: 'danger' },
        { inAction: 'warning' },
        { completed: 'primary' },
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
  },
})
