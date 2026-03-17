<script setup lang="ts">
// @stylistic/member-delimiter-style (multiline with semicolons — should be none)
interface Props {
  message: string;
  count: number;
}

// @typescript-eslint/consistent-type-imports
import { App } from 'not-installed-package'

const props = defineProps<Props>()

export type { App }
</script>

<template>
  <div>{{ props.message }}</div>
</template>

<style scoped>
div { color: red; }
</style>
