<template>
  <div>
    <div :style="{ width: tweenedValue + 'px' }" class="bar">
      <span>{{ tweenedValue.toFixed() }}</span>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'
export default {
  data() {
    return {
      number: 0,
      tweenedValue: 0
    }
  },
  watch: {
    number(newValue) {
      gsap.to(this.$data, {
        // gives gsap access to our data
        duration: 1,
        ease: 'circ.out',
        tweenedValue: newValue // tells gsap to tween up/down to the newValue
        // that sets the value of our data? and the tweening is done under the hood and knows to account for
        // all the values between the newvalue and the old value
      })
    }
  },
  methods: {
    // generates a random number for our "bar graph" to display mock real time data
    randomNumber() {
      this.number = Math.floor(Math.random() * (800 - 0))
    }
  },
  created() {
    setInterval(this.randomNumber, 1500)
  }
}
</script>

<style scoped>
.bar {
  padding: 5px;
  background-color: #2c3e50;
  border: 1px #16c0b0 solid;
  min-width: 20px;
}
.bar span {
  color: white;
}
</style>
