<script setup lang="ts">
import { ref } from 'vue';
import CurrentSong from './components/CurrentSong.vue';
import CustomTabs from './components/CustomTabs.vue';
</script>

<template>
  <CustomTabs :tabs="['All']"/>
  <CurrentSong />
</template>

<style scoped>
</style>
