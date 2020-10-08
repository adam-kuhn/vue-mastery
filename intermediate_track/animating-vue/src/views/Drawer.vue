<template>
  <div>
    <button @click="isOpen = !isOpen">
      My Profile
    </button>
    <!-- css="false" tells vue, to not handle transition classes because 
we are using JS hooks instead -->
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
      :css="false"
    >
      <div v-if="isOpen" class="drawer">
        <img src="../assets/avatar.png" alt="avatar" />
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </transition>
  </div>
</template>

<script>
import Velocity from 'velocity-animate'

export default {
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    beforeEnter(el) {
      // before the drawer opens its invisible and has 0 width
      // i.e. it is closed
      el.style.opacity = 0
      el.style.width = '0em'
    },
    // the name of the easing functions (easeOutCubic, easeInCubic etc.,) refer
    // to the curve of the animation and not when/where to use them (i.e it is ok
    // to use easeInCubic when were are "leaving")
    enter(el, done) {
      Velocity(
        el, // element to animate
        { opacity: 1, width: '12em' }, // new style rules
        // using an array with two items as an easing functin provides spring physics
        // the large the difference between the two number the snappier the effect
        // [tension, friction]
        { duration: 1000, easing: [90, 5], complete: done } // define how transition happens and complete it
      )
    },
    leave(el, done) {
      Velocity(
        el,
        { opacity: 0, width: '0em' },
        { duration: 500, easing: 'easeInCubic', complete: done }
      )
    }
  }
}
</script>

<style scoped>
/* these styles are needed so the transition no what to expand to?
I'm not totally sure, but they don't work without it */
img {
  height: 2.5em;
  width: 2.5em;
  border-radius: 50%;
}

.drawer {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 20em;
  width: 12em;
  border-radius: 1%;
  background-color: #e0e0e0;
  box-shadow: 0.08em 0.03em 0.4em #ababab;
  padding-top: 0.7em;
}

.drawer div {
  height: 3.5em;
  width: 95%;
  margin-top: 0.6em;
  background-color: #f0f0f0;
  border: 0.02em solid #ababab;
  border-radius: 1%;
}
</style>
