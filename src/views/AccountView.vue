<template>
  <div class="account"></div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  computed: {
    state() {
      return this.$store.state;
    },
  },
  created() {
    if (!this.state.uploaded) {
      this.$router.push("/");
    }
  },
})
export default class HomeView extends Vue {}
</script>

<style lang="scss" scoped>
.home {
  margin-inline: 1rem;
  text-align: center;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
