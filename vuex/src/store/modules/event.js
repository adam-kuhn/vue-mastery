import EventService from '@/services/EventService'
// it is not needed to export each object seperate, we can use export default and combine everything into one export

// this forced all mutations, actions, getters, to be namespace under event
export const namespaced = true

export const state = {
  totalEvents: null,
  event: {},
  events: [
    { id: 1, title: '...', organizer: '...' },
    { id: 2, title: '...', organizer: '...' },
    { id: 3, title: '...', organizer: '...' },
    { id: 4, title: '...', organizer: '...' }
  ]
}
export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENT(state, event) {
    state.event = event
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_TOTAL_EVENTS(state, total) {
    state.totalEvents = total
  }
}
export const actions = {
  exampleAction({ commit, dispatch, rootState }) {
    //rootState gives us access to the entire store. We can get information from other modules if we want
    // if you really neeed to call an action that is in another namespace module you can do the below
    // null is the payload, and {root: true} says to go to the root and look through the modules to find the correct one
    dispatch('moduleName/actionToCall', null, { root: true })
  },
  async createEvent({ commit, dispatch }, event) {
    // the object that "commit" is being destructured from, is the context object
    const { data } = await EventService.postEvent(event).catch(error => {
      const notification = {
        type: 'error',
        message: 'There was a problem adding events:' + error.message
      }
      dispatch('notifications/add', notification, { root: true })
      throw error
    })
    commit('ADD_EVENT', data)
    const notification = {
      type: 'success',
      message: 'Event was created!'
    }
    dispatch('notifications/add', notification, { root: true })
  },
  async fetchEvent({ commit, dispatch }, id) {
    const { data } = await EventService.getEvent(id).catch(error => {
      const notification = {
        type: 'error',
        message: 'There was a problem fetching events:' + error.message
      }
      dispatch('notifications/add', notification, { root: true })
    })
    commit('SET_EVENT', data)
  },
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then(response => {
        const totalEvents = response.headers['x-total-count']
        commit('SET_TOTAL_EVENTS', totalEvents)
        commit('SET_EVENTS', response.data)
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching events:' + error.message
        }
        dispatch('notifications/add', notification, { root: true })
      })
  }
}
export const getters = {
  categoryLength: state => state.categories.length,
  getEventById: state => id => state.events.find(event => event.id === id)
}
