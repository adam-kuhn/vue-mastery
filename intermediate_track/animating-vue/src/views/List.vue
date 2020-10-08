<template>
  <div>
    <input v-model="newContact" placeholder="Name" type="text" />
    <button @click="addContact">Add Contact</button>
    <button @click="sortContacts">Sort Contacts</button>
    <!-- the tag is the wrapping element for the group, can be a div or any block level element -->
    <transition-group name="slide-up" tag="ul" appear>
      <li v-for="contact in contacts" :key="contact">
        {{ contact }}
      </li>
    </transition-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newContact: '',
      contacts: ['Beau Thabeast', 'Cindy Rella', 'Alice Wunderlind']
    }
  },
  methods: {
    addContact() {
      this.contacts.push(this.newContact)
      this.newContact = ''
    },
    sortContacts() {
      this.contacts.sort()
    }
  }
}
</script>

<style scoped>
.slide-up-enter {
  /* translateX says come in 10px from the right */
  transform: translateY(10px);
  opacity: 0;
}
.slide-up-enter-active {
  /* all indications transition everything */
  transition: all 0.2s ease;
}
/* v-move  fine tune how member of the group move within the group*/
/* the below transform targets the transform in .slide-up-enter */
/* .slide-up-move {
  transition: transform 0.8s ease-in;
} */
.slide-up-move {
  transition: transform 0.5s ease-out;
}
</style>
