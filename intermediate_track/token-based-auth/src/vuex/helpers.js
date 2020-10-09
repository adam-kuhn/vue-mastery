import { mapGetters } from 'vuex'
// I guess this can make things slightly easier to access, by imported just the
// authComputed value into a componented, rather than having this code in the component
// however this method makes it less clear would properties your component as access to as they
// are in this file and not easily readable in the component
export const authComputed = {
  ...mapGetters(['loggedIn'])
}
