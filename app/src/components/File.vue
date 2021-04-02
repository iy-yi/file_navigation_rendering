<template>
  <li><a :href="f.path" v-on:click.prevent="download()"><strong>{{ f.name }}</strong></a></li>
</template>

<script>
import axios from 'axios';
export default {
  name: 'File',
  props: {
    f: Object
  },
  methods: {
    download() {
    axios.get('http://localhost:3000/api/download', {
      params: {
        filePath: this.f.path,
        fileName: this.f.name,
      },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error)
        this.$emit('error', error);
      })      
      console.log("Downloaded");
    }
  }
}
</script>