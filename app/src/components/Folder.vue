<template>
  <v-list-item>
    <v-icon>mdi-folder-outline</v-icon>
    <v-list-item-content><a :href="'#'+f.path">{{ f.name }}</a></v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'Folder',
  props: {
    f: Object,
  },
}
</script>