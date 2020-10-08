<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home (Modal)</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/list">List</router-link> |
      <router-link to="/drawer">Drawer</router-link> |
      <router-link to="/cards">Cards</router-link> |
      <router-link to="/simple">Simple</router-link> |
      <router-link to="/stagger">Stagger</router-link> |
      <router-link to="/state">State</router-link> |
      <router-link to="/timeline">Timeline</router-link> |
      <router-link to="/nested-timeline">Nested Timeline</router-link>
    </div>
    <!-- because we would be navigating from 1 page to another
    if we do not specify the mode, the page we are leaving and the page
    we are entering will transition at the same time
    specifying the mode as "out-in" says first transition out and once that is done
    transition the new element in -->
    <!-- FOR THE "SIMPLE"  transition to work the below <transition> must be commented out...not sure why must
      have to do with nested transitions? It seems that you can't have a direct nesting between transtions
      <transition>
         <transition></transition>
      </transition> -->
    <transition name="slide" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

button {
  width: 5em;
  height: 2em;
  margin: 0.5em;
  border-radius: 5px;
  background: linear-gradient(to right, #16c0b0, #84cf6a);
  font-size: 1em;
  color: white;
  border: none;
  outline: none;
  cursor: pointer;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

ul {
  list-style-type: none;
}

.modal {
  width: 250px;
  height: 200px;
  padding: 10px;
  margin: 0 auto;
  margin-top: 20px;
  border-radius: 2%;
  background-color: #e0e0e0;
}
/*** TRANSITIONS ***/
/* can be a good idea to have global transitions to keep animations consistent
across the app */
/* the name of the transition replaces the "v" in v-enter, etc., */
/* starting opactive */
.fade-enter {
  opacity: 0;
}
/* we know the ending opacity is 1 therefore do not
need .fade-enter-to */
/* apply the same transition to both the leave and enter transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}
/* going from opacity 1 (default) to 0 */
.fade-leave-to {
  opacity: 0;
}

.slide-enter {
  /* translateX says come in 10px from the right */
  transform: translateX(10px);
  opacity: 0;
}
.slide-enter-active,
.slide-leave-active {
  /* all indications transition everything */
  transition: all 0.5s ease;
}
.slide-leave-to {
  /* translateX says leave from 10px to the left */
  transform: translateX(-10px);
  opacity: 0;
}
</style>
