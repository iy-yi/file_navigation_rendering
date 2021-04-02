<template>
  <li><strong>{{ f.name }}</strong></li>
</template>

<script>
export default {
  name: 'File',
  props: {
    f: Object
  },
}
</script>