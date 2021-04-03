<template>
<v-container>
  <v-toolbar dense>
    <v-btn small @click.stop="prePage">Previous</v-btn>
    <v-spacer></v-spacer>
    <div class="page">Page: {{pageNum}}/{{pageTotalNum}} </div>
    <v-spacer></v-spacer>
    <v-btn small @click.stop="nextPage">Next</v-btn>
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
export default {
  components:{
      pdf
  },
  data(){
    return {
      url: "./sample.pdf",
      pageNum: 1,
      pageTotalNum: 1,
    }
  },
  mounted(){
    this.getNumPages()
  },
  methods: {
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
     getNumPages() {
        const loadingTask = pdf.createLoadingTask(this.url);
        // console.log("pdf", pdf);
        this.pageTotalNum = pdf.numPages;
        this.url = loadingTask;
        loadingTask.promise
        .then(pdf => {
          this.url = loadingTask
          this.pageTotalNum = pdf.numPages
        })
        .catch(() => {
          console.error('pdf loading failed!')
        })
      },    
  }

}
</script>