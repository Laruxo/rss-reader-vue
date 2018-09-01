<template>
  <div id="app">
    <h1>RSS Feed Reader</h1>
    <feed></feed>
  </div>
</template>

<script>
  import Feed from './components/Feed.vue';

  export default {
    components: {
      Feed,
    },
  };
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Roboto');
  @import 'sass/variables';

  * {
    box-sizing: content-box;
  }

  body {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    line-height: 1.15;
    margin: 0;
    color: $primary-text-color;
  }

  h1 {
    font-size: 2rem;
    margin: $base-margin;
    text-align: center;
  }

  a {
    color: $brand-color;
    text-decoration: none;

    &:hover {
      opacity: .7;
    }
  }

  button,
  .button {
    display: inline-block;
    font-size: 1rem;
    padding: 10px 30px;
    background: $brand-color;
    color: $brand-text-color;
    border-radius: 2px;
    border: 0;

    &:hover {
      opacity: .9;
    }

    &:active,
    &:focus {
      outline: none;
    }
  }
</style>
