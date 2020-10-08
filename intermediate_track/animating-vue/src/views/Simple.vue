<template>
  <!-- It seems that you can't have a direct nesting between transtions
      <transition>
         <transition></transition>
      </transition>  
      wrapping the transition in a <div> allows for both transitions to take place (routeer redirect and the components
        gsap)-->
  <div>
    <transition
      appear
      @before-enter="beforeEnter"
      @enter="enter"
      :css="false"
      mode="out-in"
    >
      <div class="card"></div>
    </transition>
  </div>
</template>

<script>
import gsap from 'gsap'

export default {
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0
      el.style.transform = 'scale(0,0)'
    },
    enter(el, done) {
      gsap.to(
        el, // what element to animate
        {
          // how to animate it
          duration: 1,
          opacity: 1,
          scale: 1,
          ease: 'bounce.inOut',
          onComplete: done
        }
      )
    }
  }
}
</script>

<style scoped>
.card {
  display: block;
  margin: 0 auto 0 auto;
  height: 6.5em;
  width: 6.5em;
  border-radius: 1%;
  background-color: #16c0b0;
  box-shadow: 0.08em 0.03em 0.4em #ababab;
}
</style>
