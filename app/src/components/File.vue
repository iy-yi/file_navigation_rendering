<template>
  <!-- <li><a :href="f.path" v-on:click.prevent="viewFile()"><strong>{{ f.name }}</strong></a></li> -->
  <li><a :href="'#'+f.path"><strong>{{ f.name }}</strong></a></li>
</template>

<script>
// import axios from 'axios';
export default {
  name: 'File',
  props: {
    f: Object
  },
  // methods: {
  //   viewFile() {
  //     this.$emit('file', this.f.path);
  //   }
    // download() {
    // axios.get('http://localhost:3000/api/download', {
    //   params: {
    //     filePath: this.f.path,
    //     fileName: this.f.name,
    //   },
    //   })
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //     this.$emit('error', error);
    //   })      
    //   console.log("Downloaded");
    // }
  // }
}
</script>