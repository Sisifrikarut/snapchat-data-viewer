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
    <v-btn
      :loading="popupActive"
      class="ma-2"
      append-icon="mdi-cloud-upload"
      @click="togglePopup"
    >
      Upload
    </v-btn>
    <v-dialog v-model="popupActive">
      <v-container>
        <v-row>
          <v-col>
            <v-sheet rounded class="pa-4">
              <v-file-input
                v-model="file"
                label="Upload your userdata archive"
                prepend-icon="mdi-folder-zip"
                accept=".zip"
                show-size
                outlined
                dense
              ></v-file-input>
              <v-btn class="ma-2" color="primary" @click="upload">
                Upload
              </v-btn>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import * as zip from "jszip";

@Options({
  props: {
    msg: String,
  },
  data: () => ({
    popupActive: false,
    file: [],
  }),
  methods: {
    togglePopup() {
      this.popupActive = !this.popupActive;
    },
    parseZipBuffer(buffer: ArrayBuffer | null) {
      if (buffer) {
        zip.loadAsync(buffer).then((zip) => {
          zip.forEach((relativePath, zipEntry) => {
            if (relativePath.endsWith("account.json")) {
              zipEntry.async("string").then((data) => {
                const account = JSON.parse(data);
                this.$store.commit("parseAccount", account);
              });
            }
          });
          this.popupActive = false;
        });
      }
    },
    upload() {
      let reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          this.parseZipBuffer(e.target.result as ArrayBuffer | null);
        }
      };
      reader.readAsArrayBuffer(this.file[0]);
    },
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
