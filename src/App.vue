<template>
  <v-app>
    <v-navigation-drawer v-model="drawer"> </v-navigation-drawer>
    <v-app-bar>
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>

      <v-app-bar-title icon="mdi-vuetify">snapchat data viewer</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="toggleTheme">
        <v-icon>mdi-moon-waxing-crescent</v-icon>
      </v-btn>
      <v-btn icon @click="openRemote">
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view id="router-view" v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { useTheme } from "vuetify";
@Options({
  name: "App",
  data: () => ({
    drawer: true,
    theme: useTheme(),
  }),
  methods: {
    openRemote() {
      window.open("https://github.com/0x280/snapchat-data-viewer");
    },
    toggleTheme() {
      this.theme.name = this.theme.current.dark ? "light" : "dark";
      localStorage.theme = this.theme.name;
    },
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
  },
  mounted() {
    if (localStorage.theme) {
      this.theme.name = localStorage.theme;
    }
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.125s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
