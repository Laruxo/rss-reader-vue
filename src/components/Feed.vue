<template>
  <div class="feed">
    <feed-input @feedUpdate="updateFeed"></feed-input>
    <div class="feed__header">
      <button class="feed__header-button" @click="sortFeed('title')">
        Title {{ isAscending['title'] ? '&darr;' : '&uarr;' }}
      </button>
      <button class="feed__header-button" @click="sortFeed('pubDate')">
        Date {{ isAscending['pubDate'] ? '&darr;' : '&uarr;' }}
      </button>
    </div>
    <transition-group name="feed__item" tag="ol" class="feed__list">
      <li class="feed__item" v-for="item in feed" :key="item.guid" @click="openModal(item)">
        <div class="feed__item-title">{{ item.title }}</div>
        <span class="feed__item-date">{{ item.pubDate }}</span>
        <p class="feed__item-description" v-html="firstParagraph(item.description)"></p>
      </li>
    </transition-group>
    <modal :show="showModal" :item="activeItem" v-on:close="closeModal"></modal>
  </div>
</template>

<script>
  import FeedInput from './FeedInput.vue';
  import Modal from './Modal.vue';

  const sortCompare = {
    asc: function(a, b, field) {
      if (a[field] < b[field]) {
        return -1;
      }

      if (a[field] > b[field]) {
        return 1;
      }

      return 0;
    },
    desc: function(a, b, field) {
      if (a[field] > b[field]) {
        return -1;
      }

      if (a[field] < b[field]) {
        return 1;
      }

      return 0;
    },
  };

  export default {
    name: 'feed',
    components: {
      FeedInput,
      Modal,
    },
    data() {
      return {
        isAscending: {
          title: true,
          pubDate: true,
        },
        feed: [],
        showModal: false,
        activeItem: null,
      };
    },
    methods: {
      updateFeed: function(feed) {
        this.isAscending.title = true;
        this.isAscending.pubDate = true;

        if (this.feed.length > 0) {
          this.feed = [];
          setTimeout(() => {
            this.feed = feed;
          }, 500);
        } else {
          this.feed = feed;
        }
      },
      sortFeed: function(field) {
        const orderFunc = this.isAscending[field] ? 'asc' : 'desc';
        this.feed.sort((a, b) => {
          return sortCompare[orderFunc](a, b, field);
        });
        this.isAscending[field] = !this.isAscending[field];
      },
      firstParagraph: function(text) {
        const div = document.createElement('div');
        div.innerHTML = text;
        let content = div.firstElementChild.innerHTML.substr(0, 120);
        if (content.length) {
          content += '...';
        }
        return content;
      },
      openModal: function(item) {
        this.activeItem = item;
        this.showModal = true;
      },
      closeModal: function() {
        this.showModal = false;
      },
    },
  };
</script>

<style lang="scss">
  @import '../sass/variables';

  .feed {
    margin: $base-margin;

    &__header {
      text-align: right;
      margin: $base-margin 0;

      &-button {
        margin-left: $small-margin;
      }
    }

    &__list {
      padding: 0;
      list-style: none;
      margin: 0;
      overflow-x: hidden;
    }

    &__item {
      padding: $base-margin;
      cursor: pointer;
      transition: transform .5s ease-out;

      &:hover {
        background: $active-color;
      }

      &-date {
        font-size: .75rem;
      }

      &-description {
        margin: $small-margin 0 0;
      }

      &-enter {
        transform: translateX(100%);
      }

      &-leave-active {
        transition-timing-function: ease-in;
        transform: translateX(-100%);
      }
    }
  }

</style>
