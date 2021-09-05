import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      tasks: [
        {
          id: '0768768',
          title: 'Записать решение 3 курсовой',
          date: new Date().getTime(),
          status: 'primary',
          text: 'Текст этой задачи',
        },
        {
          id: '0768769',
          title: 'Записать решение 3 курсовой',
          date: new Date().getTime(),
          status: 'primary',
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
  mutations: {},
  actions: {},
  getters: {
    tasks(state) {
      return state.tasks
    },
    badges(state) {
      return state.badges
    },
    taskId(_, getters) {
      return id => getters.tasks.find(t => t.id === id)
    },
  },
})