<template>
  <header class="flex flex-col md:flex-row justify-between bg-blue-800 p-4">
    <p class="text-2xl text-white text-center mb-4 md:text-left md:mb-0">
      RSS Reader
    </p>
    <FeedSearch @response="response = $event" />
  </header>
  <main class="m-4">
    <div
      v-if="response && 'error' in response"
      class="bg-red-200 p-4 text-xl text-red-700"
    >
      {{ response.error }}
    </div>
    <SortableList
      v-if="response && 'feed' in response"
      :title="response.feed.title"
      :feed="response.items"
    />
  </main>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import FeedSearch from './components/FeedSearch.vue'
import SortableList from './components/SortableList.vue'

const response = ref<ResponseState>(null)
</script>
