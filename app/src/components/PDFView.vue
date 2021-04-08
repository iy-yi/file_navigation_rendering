<template>
<v-container>
  <div v-if="this.message !== ''">
    <v-alert border="top" color="red lighten-2" dark>
      {{this.message}}
    </v-alert>
  </div>
  <v-toolbar dense>
    <v-btn small @click.stop="prePage">
      <v-icon>mdi-arrow-left</v-icon>Previous</v-btn>
    <v-spacer></v-spacer>
    <div class="page">Page: {{pageNum}}/{{pageTotalNum}} </div>
    <v-spacer></v-spacer>
    <v-btn small @click.stop="nextPage"><v-icon>mdi-arrow-right</v-icon>Next</v-btn>
  </v-toolbar>

  <pdf ref="pdf"
    :src="url"
    :page="pageNum"
    @totalPages="pageTotalNum=$event"
    @link-clicked="page = $event"
    >
  </pdf>
</v-container>
</template>

<script>
import pdf from 'vue-pdf'
import axios from 'axios';
export default {
  components:{
      pdf
  },
  data(){
    return {
      url: "",
      pageNum: 1,
      pageTotalNum: 1,
      message: "",
      SERVER: 'http://localhost:3000/',
    }
  },
  props: {
    path: String,
  },
  mounted(){
    const parts = this.path.split('public/');
    this.url=parts[1];
    this.getNumPages(this.url);
    const dirParts = this.path.split('/');
    const fileName = dirParts[dirParts.length-1];
    this.downloadFile(fileName);
  },
  methods: {
    downloadFile(fileName) {
      axios.get(this.SERVER+`api/download/`, {
        params: {
          file: this.path,
        },
        responseType: 'blob', // 'arraybuffer'
      })
      .then((response)=> {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();        
      })
      .catch((err) => {
        console.log(err);
      });
    },
    prePage() {
        let page = this.pageNum
        page = page > 1 ? page - 1 : this.pageTotalNum
        this.pageNum = page
      },
    nextPage() {
        let page = this.pageNum
        page = page < this.pageTotalNum ? page + 1 : 1
        this.pageNum = page
      },

     getNumPages(url) {
       const pdfURL = this.SERVER+url;
       console.log(pdfURL);
        const loadingTask = pdf.createLoadingTask(pdfURL);
        this.pageTotalNum = pdf.numPages;
        this.url = loadingTask;
        loadingTask.promise.then(pdf => {
          this.message = "";
          this.url = loadingTask;
          this.pageTotalNum = pdf.numPages;
        })
        .catch(() => {
          this.message = 'File loading failed!';
        })
      },    
  }

}
</script>