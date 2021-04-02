<template>
  <li><strong><a @click.prevent="navigate()" :href="f.path">{{ f.name }}</a></strong></li>
</template>

<script>
export default {
  name: 'Folder',
  props: {
    f: Object,
  },
  methods: {
    navigate() {
      console.log('folder:', this.f.path);
      this.$emit('path', this.f.path);
    }
  }
}
</script>