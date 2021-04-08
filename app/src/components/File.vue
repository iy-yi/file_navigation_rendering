<template>
  <v-list-item-content><a :href="'#'+f.path">{{ f.name }}</a></v-list-item-content>
</template>

<script>
export default {
  name: 'File',
  props: {
    f: Object
  },
}
</script>