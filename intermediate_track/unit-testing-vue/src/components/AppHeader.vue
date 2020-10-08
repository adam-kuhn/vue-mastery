<template>
  <div>
    <!-- this is our output. Is the button shown or not -->
    <button v-show="loggedIn">Logout</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loggedIn: false // this is our Input when thinking about unit testing
    };
  }
};
</script>
