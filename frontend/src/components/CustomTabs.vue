<script setup lang="ts">
import '../styles/components/customtabs.css'
import { ref } from 'vue';

const props = defineProps<{
    tabs: string[]
}>()

const currentTab = ref(props.tabs[0])
const songs = ref<string[]>()

fetch("/api/songs")
.then(res => res.json())
.then((data) => songs.value = [...data])

function changeSong(songName: string) {
    console.log(songName)
    fetch("/api/changesong", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            message: `${songName}`
        }
    })
}

</script>

<template>
    <section class="custom-tabs standard-box-style">
        <div class="tabs">
            <button v-for="tab in tabs" :style="{width: [tabs.length > 1 ? 1 / tabs.length : 100 ] + '%', border: [currentTab == tab ? '4px solid black' : '']}">{{ tab }}</button>
        </div>
        <div class="tabs-output">
            <button v-for="song in songs" @click="changeSong(song)">{{ song }}</button>
        </div>
    </section>
</template>

