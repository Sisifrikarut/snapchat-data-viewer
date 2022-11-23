<template>
  <div class="home">
    <div class="home-content-container">
      <h1>visualize your snapchat userdata</h1>
      <p>
        You can request your snapchat userdata at the
        <a
          href="https://accounts.snapchat.com/accounts/downloadmydata"
          target="_blank"
          rel="noopener"
        >
          snapchat webinterface</a
        >.
        <br />
        This might take a few hours.
      </p>
      <UploadDialogue />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import UploadDialogue from "@/components/UploadDialogue.vue"; // @ is an alias to /src

@Options({
  components: {
    UploadDialogue,
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
