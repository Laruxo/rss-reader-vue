<template>
  <div class="flex items-center my-4">
    <h1 class="flex-1 truncate">{{ title }} Feed</h1>
    <button class="button ml-2" @click="sortBy('title')">
      Title {{ sorting.field === 'title' ? direction : '' }}
    </button>
    <button class="button ml-2" @click="sortBy('pubDate')">
      Date {{ sorting.field === 'pubDate' ? direction : '' }}
    </button>
  </div>
  <ol>
    <ListItem
      v-for="item in sortedFeed"
      :key="item.guid"
      :item="item"
      @click="activeItem = item"
    />
  </ol>
  <ItemModal v-if="activeItem" :item="activeItem" @close="activeItem = null" />
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import ListItem from './ListItem.vue'
import ItemModal from './ItemModal.vue'

type SortField = 'title' | 'pubDate'
type SortDir = 'asc' | 'desc'
type SortingState = {
  field: SortField
  dir: SortDir
}

const props = defineProps<{ title: string; feed: FeedItem[] }>()

const activeItem = ref<FeedItem | null>(null)

const sorting = ref<SortingState>({ field: 'pubDate', dir: 'asc' })
const direction = computed(() =>
  sorting.value.dir === 'asc' ? '\u2193' : '\u2191',
)
const sortedFeed = computed<FeedItem[]>(() => {
  const _feed = props.feed.slice(0)
  const multiplier = sorting.value.dir === 'asc' ? 1 : -1
  if (sorting.value.field === 'title') {
    _feed.sort(
      (a, b) => (a.title || '').localeCompare(b.title || '') * multiplier,
    )
  } else if (sorting.value.field === 'pubDate') {
    _feed.sort(
      (a, b) =>
        (new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()) *
        multiplier,
    )
  }
  return _feed
})
function sortBy(field: SortField) {
  sorting.value = {
    field,
    dir: sorting.value.dir === 'asc' ? 'desc' : 'asc',
  }
}
</script>
