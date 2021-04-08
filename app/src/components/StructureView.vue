<template>
    <v-container>
      <div>
        <div v-if="this.isLoading">       
          <div v-if="isLoading === 'error'">
            <v-alert border="top" color="red lighten-2" dark>
              Failed to load the directory..<a href=""> Go home </a>
            </v-alert>
          </div>
          <div v-else>
            <p>Loading the page...</p>
          </div>
        </div>
        <div v-if="!this.isLoading">
          <Breadcrumb :p="path"></Breadcrumb>
          <v-list dense>
            <v-list-item-group color="primary">
              <v-list-item v-for="file in this.structure.files" :key="file.path">
                <File :f="file" />
              </v-list-item>
            </v-list-item-group>
            <template v-for="folder in this.structure.folders">
              <Folder :f="folder" :key="folder.path"/>
            </template>
          </v-list>
        </div>
      </div>
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
    }
  },
  props: {
    path: String,
  },
  methods: {
    getFiles(path) {
      axios.get('http://localhost:3000/api/files', {
        params: {
          root: path,
        },
      })
      .then((response) => {
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
    this.updateStructure(this.path);
  },
  watch: {
    path() {
      console.log("watch", this.path);
      this.updateStructure(this.path);
    }
  }
}
</script>