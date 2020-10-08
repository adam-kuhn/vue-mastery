<template>
  <div>
    <h1>Create Event {{user.name}}</h1>
    <!-- OLD CODE FROM PREVIOUS VIDEOS -->
    <!-- <p>This event was created by {{user.id}}</p>
    <p>There are {{categoryLength}} categories</p>
    <p>Current event {{getEventById(2)}} </p>
    <ul>
      <li v-for="cat of categories" :key="cat">{{ cat }}</li>
    </ul> -->
     <form @submit.prevent="createEvent">
       <label>Select a category</label>
       <select v-model="event.category">
         <option v-for="cat in categories" :key="cat">{{ cat }}</option>
       </select>
       <h3>Name & describe your event</h3>
       <div class="field">
         <label>Title</label>
         <input v-model="event.title" type="text" placeholder="Add an event title"/>
       </div>
       <div class="field">
         <label>Description</label>
         <input v-model="event.description" type="text" placeholder="Add a description"/>
       </div>
       <h3>Where is your event?</h3>
       <div class="field">
         <label>Location</label>
         <input v-model="event.location" type="text" placeholder="Add a location"/>
       </div>
       <h3>When is your event?</h3>
       <div class="field">
         <label>Date</label>
         <datepicker v-model="event.date" placeholder="Select a date"/>
       </div>
       <div class="field">
         <label>Select a time</label>
         <select v-model="event.time">
           <option v-for="time in times" :key="time">{{ time }}</option>
         </select>
       </div>
       <input type="submit" class="button -fill-gradient" value="Submit"/>
     </form>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Datepicker from 'vuejs-datepicker'

export default {
  components: { Datepicker },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      times,
      categoreis: this.$store.state.categories,
      event: this.createFreshEventObject()
    }
  },
  computed: {
    ...mapState({
      user: 'user', // if your prop is top level can access it like this
      categories: state => state.categories
    }),
    // ...mapState(['user', 'categories']), // These do the exact same thing and only work for top level properties
    // ...mapState({
    //   user: 'user',
    //   categories: state => state.categories
    // })
    categoryLength() {
      return this.$store.getters.catLength
    },
    ...mapGetters({
      getEventById: 'getEventById'
    })
    // getEventById() {
    //   return this.$store.getters.getEventById(1) // this is valid but it's much easier to us mapGetters etc., provided by Vuex
    // }
  },
  methods: {
    async createEvent() {
      try {
        // need the event/ because it is namespaced
        await this.$store.dispatch('event/createEvent', this.event)
        this.$router.push({
          name: 'event-show',
          params: { id: this.event.id }
        })
        this.event = this.createFreshEventObject()
      } catch (err) {
        console.error('There was an error', err.message)
      }
    },
    createFreshEventObject() {
      const user = this.$store.state.user.user // I really don't like this use of acessing $store
      // Using the createFreshEventObject in the state is not the best idea either as it forces us to use $store here because data() runs before the computed properties and vuex can be evaluted
      console.log('U', user)
      const id = Math.floor(Math.random() * 100000000)
      return {
        id,
        user,
        category: '',
        organizer: user,
        title: '',
        description: '',
        date: '',
        time: '',
        attendees: []
      }
    }
  }
}
</script>
