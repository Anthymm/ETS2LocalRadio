<script setup lang="ts">
import {ref} from "vue"
const currentSong = ref({})

fetch("/api/currentsong")
    .then((data) => console.log(data))
</script>

<template>
    <div>{{ currentSong }}</div>
</template>