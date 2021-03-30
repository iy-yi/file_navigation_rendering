<template>
    <v-container>
      <div>
        <div v-if="this.isLoading"><p>Loading...</p></div>
        <ul v-if="!this.isLoading">
          <template v-for="file in this.structure.files">
            <li  :key="file.name">
              <strong>{{file.name}}</strong>
            </li>
          </template>
          <template v-for="folder in this.structure.folders">
            <li :key="folder.name">
              <strong>{{folder.name}}</strong>
            </li>
          </template>
        </ul>
      </div>
        <!-- <v-row>
            <v-col cols="2">
                <v-btn
                    v-on:click="click('sample.csv')"
                    color="primary"
                    block
                >
                    Download csv
                </v-btn>
            </v-col>

            <v-col cols="2">
                <v-btn
                    v-on:click="click('sample.png')"
                    color="primary"
                    block
                >
                    Download image
                </v-btn>
            </v-col>
        </v-row> -->
    </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'FileView',
  data() {
    return {
    currentPath: 'public',
    structure: {
      files: [],
      folders: [],
    },
    isLoading: true,
    }
  },
  methods: {
    getFiles(directory) {
      axios.get('http://localhost:3000/files', {
        params: {
          root: directory,
        },
        })
      .then((response) => {
        console.log(response.data);
        this.structure.files = response.data.files;
        this.structure.folders = response.data.directories;
        this.isLoading = false;
      })
      .catch((error) => {
          console.log(error)
      })
    },
  },
  created() {
      this.getFiles('public');
    }
}
</script>