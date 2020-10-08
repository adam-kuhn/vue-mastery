<template>
  <div>
    <!-- because the module is not named spaced have to use the module name to access the user object -->
    <h1>Events for {{user.user.name}}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event"/>
    <!-- Why use template instead of a div? answered in notes
    Templates do not have a node in the DOM -->
    <template v-if="page !== 1"> 
      <router-link :to="{name: 'event-list', query: {page: page - 1}}" rel="prev">Prev Page</router-link>
      |
    </template>
    <router-link v-if="onLastPage" :to="{name: 'event-list', query: {page: page + 1}}" rel="next">Next Page</router-link>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'
export default {
  components: {
    EventCard
  },
  created() {
    // why aren't they using mounted?
    // did some goolging and `created` should be used for fetchingAPI data, if you do not need access to any DOM elements
    // therefore in my work project I probably should have been using mounted and not created to fetch apis (React had componentDidMount and I ran with that idea without really looking into it)
    this.$store.dispatch('event/fetchEvents', { perPage: 3, page: this.page })
  },
  computed: {
    ...mapState(['event', 'user']),
    onLastPage() {
      return this.event.totalEvents / 3 >= this.page
    },
    page() {
      // gets the page value from the URL
      return parseInt(this.$route.query.page) || 1
    }
  }
}
</script>
