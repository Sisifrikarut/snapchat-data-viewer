<template>
  <div class="upload">
    <h1>{{ msg }}</h1>
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
      This might take a few hours to multiple days.
    </p>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    msg: String,
  },
})
export default class UploadDialogue extends Vue {
  msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 1rem 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 0.25rem;
}
a {
  color: #42b983;
}
</style>
