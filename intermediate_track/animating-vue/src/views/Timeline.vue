<template>
  <div>
    <img class="runner first" src="../assets/avatar.png" alt="runner" />
    <img class="runner second" src="../assets/avatar.png" alt="runner" />
    <img class="runner third" src="../assets/avatar.png" alt="runner" />
  </div>
</template>

<script>
import gsap from 'gsap'

export default {
  mounted() {
    let tl = gsap.timeline({ repeat: -1, repeatDelay: 1 }) // -1 means repeat forever
    // defeault behaviour is that timelines run consecutively
    tl.to('.first', { x: 700, duration: 2, ease: 'expo.out' })
    tl.to('.second', { x: 700, duration: 2, ease: 'expo.out' })
    tl.to('.third', { x: 700, duration: 2, ease: 'expo.out' }, '<.5')
    // can add a position paramet to tl.to() that allows us to customise when different animations occur
    // tl.to('.second', { x: 100, duration: 2, ease: 'expo.out' }, 0.5) // animate 0.5 seconds into the timeline. The third animation will fire once this one as completed (at 2.5 seconds)
    // tl.to('.second', { x: 100, duration: 2, ease: 'expo.out' }, '-=.75') // animate 0.75 seconds before the first animation ends (can alose use += here)
    // tl.to('.second', { x: 100, duration: 2, ease: 'expo.out' }, '<') // animate at the same time as the previous animation
    // tl.to('.second', { x: 100, duration: 2, ease: 'expo.out' }, '<.5') // animate 0.5 seconds after the start of the previous animation
  }
}
</script>

<style scoped>
.runner {
  display: block;
  height: 5em;
  width: 5em;
  margin-top: 1.5em;
}
</style>
