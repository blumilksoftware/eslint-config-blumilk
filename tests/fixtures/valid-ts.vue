<script setup lang="ts">
interface Props {
  message: string
}

const props = defineProps<Props>()
</script>

<template>
  <div>{{ props.message }}</div>
</template>

<style scoped>
div { color: red; }
</style>
