<template>
  <form name="feed search form" class="feed-search" @submit.prevent="url = $event.target[0].value">
    <SearchInput @submit="url = $event" />
    <span
      v-if="response === null"
      class="spinner"
      role="progressbar"
      aria-valuetext="loading"
      aria-busy="true"
      aria-live="assertive"
    />
    <button v-else class="feed-search__button">&#x276F;</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import { useFetch } from "../composables/useFetch";
import { getHistory, addHistoryItem } from "../utils/feedHistory";
import SearchInput from "./SearchInput.vue";

export default defineComponent({
  components: {
    SearchInput,
  },
  emits: {
    response: (data: ResponseState) => data !== undefined,
  },
  setup(props, { emit }) {
    const url = ref(getHistory()[0].url);
    const feedUrl = computed(() => `https://api.rss2json.com/v1/api.json?rss_url=${url.value}`);
    const response = useFetch(feedUrl);

    watch(response, () => {
      emit("response", response.value);
      if (response.value && "feed" in response.value) {
        addHistoryItem(response.value.feed);
      }
    });

    return { url, response };
  },
});
</script>

<style lang="scss" scoped>
@import "../style/variables";

.feed-search {
  display: flex;
  align-items: center;
}

.feed-search__button {
  background: none;
  font-size: $large-font-size;
  line-height: 1;
  padding: 0;
  width: 2rem;
  height: 100%;

  &:hover,
  &:focus {
    background: $active-color;
  }
}
</style>
