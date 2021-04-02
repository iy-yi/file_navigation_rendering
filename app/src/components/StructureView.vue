<template>
    <v-container>
      <div>
        <div v-if="this.isLoading">       
          <div v-if="isLoading === 'error'">
            <v-alert border="top" color="red lighten-2" dark>
              Failed to load the directory.
            </v-alert>
            <p><a href="">Go home</a></p>
          </div>
          <div v-else>
            <p>Loading the page...</p>
          </div>
        </div>
        <div v-if="!this.isLoading">
          <Breadcrumb :p="path"></Breadcrumb>
          <ul>
            <template v-for="file in this.structure.files">
              <File :f="file" :key="file.name" />
            </template>
            <template v-for="folder in this.structure.folders">
              <Folder :f="folder" :key="folder.name"></Folder>
            </template>
          </ul>
        </div>
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
import axios from 'axios';
import Folder from './Folder';
import File from './File';
import Breadcrumb from './Breadcrumb';

export default {
  name: 'StructureView',
  components: { Folder, File, Breadcrumb },
  data() {
    return {
    structure: {
      files: [],
      folders: [],
    },
    isLoading: true,
    // path: 'public',
    }
  },
  props: {
    path: String,
  },
  methods: {
    getFiles(path) {
      // window.location.hash = path;
      axios.get('http://localhost:3000/api/files', {
        params: {
          root: path,
        },
        })
      .then((response) => {
        // this.path = path;
        console.log(response.data);
        this.structure.files = response.data.files;
        this.structure.folders = response.data.directories;
        this.isLoading = false;
      })
      .catch((error) => {
        this.isLoading = 'error';
        console.log(error)
      })
    },
    updateStructure(path) {
      this.isLoading = true;
      this.getFiles(path);
    }
  },
  created() {
    this.getFiles(this.path);
  },
  watch: {
    path() {
      this.updateStructure(this.path);
    }
  }
}
</script>