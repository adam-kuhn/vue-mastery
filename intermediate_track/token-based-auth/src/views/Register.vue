<template>
  <div>
    <!-- submits default is to bubble up -->
    <form @submit.prevent="register">
      <label for="name">Name</label>
      <input v-model="name" type="text" name="name" value>

      <label for="email">Email</label>
      <input v-model="email" type="email" name="email" value>

      <label for="password">Password</label>
      <input v-model="password" type="password" name="password" value>
      <div v-if="errors.length">
        <p v-for="(error, idx) in errors" :key="idx">
          {{ error }}
        </p>
      </div>
      <button type="submit" name="button">
        Register
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      errors: []
    }
  },
  methods: {
    register () {
      this.$store.dispatch('register', {
        name: this.name,
        email: this.email,
        password: this.password
      }).then(() => {
        this.$router.push({ name: 'dashboard' })
      }).catch(err => {
        console.log(err.response)
        this.errors = err.response.data
      })
    }
  }
}
</script>
