<template>
  <li
    class="feed__item"
    tabIndex="0"
    role="button"
    @click="$emit('click')"
    @keypress.self.enter.space.prevent="$emit('click')"
  >
    <div class="feed__item-title">{{ item.title }}</div>
    <span class="feed__item-date">{{ item.pubDate }}</span>
    <p class="feed__item-description">{{ firstParagraph }}</p>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<FeedItem>,
      required: true,
    },
  },
  emits: ["click"],
  computed: {
    firstParagraph(): string {
      const div = document.createElement("div");
      div.innerHTML = this.item.description;
      if (!div.firstElementChild) {
        return this.item.description;
      }
      return div.innerText.substring(0, 120);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../style/variables";

.feed__item {
  border-top: 1px solid $active-color;
  padding: $base-margin;
  cursor: pointer;
  outline: none;

  &:hover,
  &:focus {
    background: $active-color;
  }
}

.feed__item-date {
  font-size: $small-font-size;
}

.feed__item-description {
  margin: $small-margin 0 0;
}
</style>
