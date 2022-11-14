<template>
  <div class="home">
    <UploadDialogue msg="visualize your snapchat userdata" />
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
