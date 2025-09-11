<template>
  <form
    name="feed search form"
    class="flex items-center relative border-b border-white"
    @submit.prevent="emit('submit', value)"
  >
    <input
      ref="input"
      v-model="value"
      type="url"
      name="url"
      title="RSS URL"
      aria-label="RSS URL"
      placeholder="Enter RSS URL"
      class="min-w-2xs w-full text-white py-2 pr-2 outline-none"
      autoComplete="off"
      role="combobox"
      aria-controls="search-suggestions"
      :aria-expanded="showSuggestions ? 'true' : 'false'"
      @focus="showSuggestions = true"
      @blur="showSuggestions = false"
      @keydown.down.prevent="
        activeSuggestion = Math.min(
          suggestions.length - 1,
          activeSuggestion + 1,
        )
      "
      @keydown.up.prevent="activeSuggestion = Math.max(0, activeSuggestion - 1)"
      @keydown.enter="onEnterPress"
    />
    <ul
      v-if="showSuggestions"
      id="search-suggestions"
      class="absolute top-full w-full shadow-lg bg-white"
      role="listbox"
    >
      <li v-for="(item, ind) in suggestions" :key="item.url" role="option">
        <button
          class="text-left w-full p-2 hover:bg-gray-200"
          :class="{ 'bg-gray-200': activeSuggestion === ind }"
          @mouseenter="activeSuggestion = ind"
          @mousedown="$emit('submit', item.url)"
        >
          <span class="block truncate">{{ item.title }}</span>
          <span class="block truncate text-xs">{{ item.url }}</span>
        </button>
      </li>
    </ul>
    <span
      v-if="loading"
      class="inline-block size-6"
      role="progressbar"
      aria-valuetext="loading"
      aria-busy="true"
      aria-live="assertive"
    >
      <svg
        class="animate-spin fill-white"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
        />
      </svg>
    </span>
    <button
      v-else
      type="submit"
      class="w-6 h-full text-white text-xl hover:opacity-80"
    >
      &#x276F;
    </button>
  </form>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { getHistory } from '../utils/feedHistory'

defineProps<{ loading: boolean }>()

const emit = defineEmits({
  submit: (value: string) => !!value,
})

const input = ref<HTMLInputElement | null>(null)
const value = ref('')

const showSuggestions = ref(false)
const suggestions = ref(getHistory())
const activeSuggestion = ref(0)

watch(value, () => {
  activeSuggestion.value = 0
  const history = getHistory()
  if (value.value) {
    const regex = new RegExp(`(^|\\s)${value.value}`, 'i')
    suggestions.value = history.filter(
      ({ title, url }) => regex.test(title) || url.includes(value.value),
    )
  } else {
    suggestions.value = history
  }
})

function onEnterPress(e: KeyboardEvent) {
  if (suggestions.value.length) {
    e.preventDefault()
    emit('submit', suggestions.value[activeSuggestion.value].url)
    value.value = ''
    input.value?.blur()
  }
}
</script>
