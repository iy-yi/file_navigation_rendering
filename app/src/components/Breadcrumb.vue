<template>
  <div>
      <span v-for="(f, i) in folders" :key=i>
      <a :href="f.path">{{ f.name }}</a>
      <i v-if="i !== (folders.length - 1)"> &raquo; </i>
      </span>
    </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: {
    p: String,
  },
  computed: {
    folders() {
      const output = [];
      let slug = '';
      const parts = this.p.split('/'); 
      for (const item of parts) {
        slug += item;
        output.push({'name': item || 'home', 'path': '#' + slug});
        slug += '/';
      }
      // console.log(output);
      return output;
    }
  },
  methods: {
    navigate(folder) {
      this.$emit('path', folder.path);
    }
}
}
</script>