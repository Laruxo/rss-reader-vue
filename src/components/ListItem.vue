<template>
  <li class="border-t border-gray-200">
    <button
      class="w-full text-left p-4 outline-none hover:bg-gray-200 focus-visible:bg-gray-200"
      @click="$emit('click')"
      @keydown.self.enter.space.prevent="$emit('click')"
    >
      <strong class="block">{{ item.title }}</strong>
      <span class="block text-xs">{{ item.pubDate }}</span>
      <span class="block mt-2">{{ firstParagraph }}</span>
    </button>
  </li>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{ item: FeedItem }>()
defineEmits(['click'])

const firstParagraph = computed((): string => {
  const div = document.createElement('div')
  div.innerHTML = props.item.description
  if (!div.firstElementChild) {
    return props.item.description
  }
  return div.innerText.substring(0, 120)
})
</script>
