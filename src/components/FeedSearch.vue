<template>
  <SearchInput :loading="response === null" @submit="url = $event" />
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { useFetch } from '../composables/useFetch'
import { getHistory, addHistoryItem } from '../utils/feedHistory'
import SearchInput from './SearchInput.vue'

const emit = defineEmits({
  response: (data: ResponseState) => data !== undefined,
})

const url = ref(getHistory()[0]?.url ?? '')
const feedUrl = computed(
  () => `https://api.rss2json.com/v1/api.json?rss_url=${url.value}`,
)
const response = useFetch(feedUrl)
watch(response, () => {
  emit('response', response.value)
  if (response.value && 'feed' in response.value) {
    addHistoryItem(response.value.feed)
  }
}, { immediate: true })
</script>
