<template>
  <header>
    <h1>RSS Reader</h1>
    <FeedSearch @response="response = $event" />
  </header>
  <main>
    <h3 v-if="response && 'error' in response" class="error">{{ response.error }}</h3>
    <SortableList
      v-if="response && 'feed' in response"
      :title="response.feed.title"
      :feed="response.items"
    />
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import FeedSearch from "./components/FeedSearch.vue";
import SortableList from "./components/SortableList.vue";

export default defineComponent({
  components: {
    FeedSearch,
    SortableList,
  },
  setup() {
    const response = ref<ResponseState>(null);
    const setResponse = (data: ResponseState) => {
      response.value = data;
    };
    return { response, setResponse };
  },
});
</script>

<style lang="scss">
@import-normalize;
@import url("https://fonts.googleapis.com/css?family=Roboto");
@import "style/variables";
@import "style/utils";

body {
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  line-height: 1.15;
  margin: 0;
  color: $primary-text-color;
}

header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: $base-margin;
  background: $brand-color;
  color: $brand-text-color;
}

main {
  margin: $base-margin;
}

h1 {
  text-align: center;
  margin: 0 0 $base-margin;
}

a {
  display: inline-block;
  color: $brand-color;
  text-decoration: none;

  &:hover,
  &:focus {
    opacity: 0.7;
  }
}

button,
.button {
  cursor: pointer;
  display: inline-block;
  font-size: $medium-font-size;
  padding: $small-margin $base-margin;
  background: $brand-color;
  color: $brand-text-color;
  border-radius: 2px;
  border: 0;

  &:hover,
  &:focus {
    opacity: 0.9;
  }

  &:active,
  &:focus {
    outline: none;
  }
}

@media only screen and (min-width: 768px) {
  header {
    flex-direction: row;

    h1 {
      text-align: left;
      margin: 0;
    }
  }
}
</style>
