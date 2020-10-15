<template>
  <div class="search-input-container">
    <input
      ref="input"
      v-model="value"
      type="url"
      title="RSS URL"
      placeholder="Enter RSS URL"
      class="search-input"
      autoComplete="off"
      @focus="showSuggestions = true"
      @blur="showSuggestions = false"
      @keydown.down.prevent="
        activeSuggestion = Math.min(suggestions.length - 1, activeSuggestion + 1)
      "
      @keydown.up.prevent="activeSuggestion = Math.max(0, activeSuggestion - 1)"
      @keydown.enter="onEnterPress"
    />
    <ul v-if="showSuggestions" class="search-input__suggestions">
      <li
        v-for="(item, ind) in suggestions"
        :key="item.url"
        class="search-input__suggestion"
        :class="{ 'search-input__suggestion--active': activeSuggestion === ind }"
        @mouseenter="activeSuggestion = ind"
        @mousedown="$emit('submit', item.url)"
      >
        <div class="search-input__suggestion-title">{{ item.title }}</div>
        <div>{{ item.url }}</div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { getHistory } from "../utils/feedHistory";

export default defineComponent({
  emits: {
    submit: (value: string) => !!value,
  },
  setup(_, { emit }) {
    const input = ref<HTMLInputElement | null>(null);
    const value = ref("");

    const showSuggestions = ref(false);
    const suggestions = ref(getHistory());
    const activeSuggestion = ref(0);

    watch(value, () => {
      activeSuggestion.value = 0;
      const history = getHistory();
      if (value.value) {
        const regex = new RegExp(`(^|\\s)${value.value}`, "i");
        suggestions.value = history.filter(
          ({ title, url }) => regex.test(title) || url.includes(value.value)
        );
      } else {
        suggestions.value = history;
      }
    });

    function onEnterPress(e: KeyboardEvent) {
      if (suggestions.value.length) {
        e.preventDefault();
        emit("submit", suggestions.value[activeSuggestion.value].url);
        value.value = "";
        input.value?.blur();
      }
    }

    return {
      input,
      value,
      showSuggestions,
      suggestions,
      activeSuggestion,
      onEnterPress,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../style/variables";

.search-input-container {
  position: relative;
  flex: 1;
  margin-right: $small-margin;
}

.search-input {
  color: $primary-text-color;
  border: none;
  padding: $small-margin $base-margin;
  font-size: $medium-font-size;
  width: 100%;
  min-width: 300px;
  box-sizing: border-box;

  &:active,
  &:focus {
    outline: none;
  }
}

.search-input__suggestions {
  list-style: none;
  padding: 0;
  margin: 0;
  background: $primary-color;
  color: $primary-text-color;
  font-size: $small-font-size;
  width: 100%;
  position: absolute;
  top: 100%;
  box-shadow: 0 5px 5px 0 $shadow-color;
}

.search-input__suggestion {
  cursor: pointer;
  display: block;
  padding: $small-margin;

  & > div {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &--active,
  &:hover {
    background: $active-color;
  }
}

.search-input__suggestion-title {
  font-size: $medium-font-size;
}
</style>
