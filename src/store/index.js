import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      tasks: [
        {
          id: '0768768',
          title: 'Записать решение 3 курсовой',
          date: new Date().getTime(),
          status: 'active',
          text: 'Текст этой задачи',
        },
        {
          id: '0768769',
          title: 'Записать решение 3 курсовой',
          date: new Date().getTime(),
          status: 'active',
          text: 'Текст этой задачи',
        },
        {
          id: '0768770',
          title: 'Записать решение 3 курсовой',
          date: new Date().getTime(),
          status: 'inAction',
          text: 'Текст этой задачи',
        },
      ],
      badges: [
        { active: 'primary' },
        { inAction: 'warning' },
        { completed: 'primary' },
        { cancelled: 'danger' },
      ],
    }
  },
  mutations: {},
  actions: {},
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