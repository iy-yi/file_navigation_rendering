<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <v-btn href="/" text>
          <v-icon>mdi-home</v-icon>
          <span>Home</span>       
        </v-btn>
        
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <div v-if="this.isFile">
        <PDFView :path="path" />
      </div>
      <div v-else>
        <StructureView :path="path"/>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import StructureView from './components/StructureView';
import PDFView from './components/PDFView';

export default {
  name: 'App',
  components: {
    StructureView,
    PDFView,
  },
  data: () => ({
    path: '',
    isFile: false,
  }),
  methods: {
    updateHash() {
      const hash = window.location.hash.substring(1);
      console.log("updateHash", hash);
      this.path = (hash || 'public');
      if (hash.slice(-3) === 'pdf') {
        this.isFile = true;
      }
      else {
        this.isFile = false;
      }
    }
  },
  created() {
    this.updateHash();
  },
  mounted() {
    window.onhashchange = () => {
      this.updateHash();
    }
  }
};
</script>
