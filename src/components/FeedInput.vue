<template>
  <div class="feed-input">
    <div class="feed-input__row">
      <div class="feed-input__url">
        <input id="feed-url" class="feed-input__url-input" type="url" autocomplete="off" autofocus
               :class="{invalid: !isValid}" v-model="feedUrl" @keyup.enter="fetchFeed">
        <label for="feed-url" class="feed-input__url-label">Enter URL</label>
      </div>
      <button class="feed-input__button" :class="{'feed-input__button--loading': isLoading}" @click="fetchFeed">
        {{ isLoading ? '&#8635;' : '&#10095;' }}
      </button>
    </div>
    <ul class="feed-input__history">
      <li class="feed-input__history-item" v-for="item in history" @click="feedUrl = item.url; fetchFeed();">
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script>
  import 'promise-polyfill';
  import 'whatwg-fetch';

  export default {
    name: 'feed-input',
    data() {
      return {
        feedUrl: localStorage.getItem('lastUrl') || 'http://waitbutwhy.com/feed',
        isValid: true,
        isLoading: false,
        history: JSON.parse(localStorage.getItem('urlHistory')) || [],
      };
    },
    methods: {
      fetchFeed: function() {
        this.isValid = true;
        this.isLoading = true;

        fetch('https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(this.feedUrl))
          .then(response => {
            return response.json();
          })
          .then(json => {
            this.isLoading = false;

            if (json.status === 'ok') {
              this.$emit('feedUpdate', json.items);
              this.updateHistory(json.feed);
            } else {
              throw new Error();
            }
          })
          .catch(() => {
            this.isValid = false;
          });
      },
      updateHistory: function(feed) {
        const historyItem = {
          title: feed.title,
          url: feed.url,
        };

        const itemIndex = this.history.findIndex(item => {
          return item.title === historyItem.title && item.url === historyItem.url;
        });
        if (itemIndex !== -1) {
          this.history.splice(itemIndex, 1);
        }
        this.history.unshift(historyItem);

        localStorage.setItem('urlHistory', JSON.stringify(this.history));
        localStorage.setItem('lastUrl', feed.url);
      },
    },
    mounted: function() {
      this.fetchFeed();
    },
  };
</script>

<style lang="scss">
  @import '../sass/variables';

  .feed-input {
    text-align: center;
    margin: $base-margin;

    &__row {
      display: flex;
      flex-direction: row;
      align-items: flex-end;
    }

    &__url {
      height: 3.5rem;
      border-bottom: 1px solid $brand-color;
      display: inline-block;
      position: relative;
      flex-grow: 1;

      &-input {
        color: $primary-text-color;
        border: none;
        padding: 1.25rem 0 0;
        font-size: 2rem;
        width: 100%;

        &:active,
        &:focus {
          outline: none;
        }

        &.invalid,
        &:invalid {
          border-bottom: 1px solid $invalid-color;

          ~ .feed-input__url-label {
            color: $invalid-color;
          }
        }
      }

      &-label {
        color: $brand-color;
        position: absolute;
        top: 0;
        left: 0;
      }
    }

    &__button {
      color: $brand-color;
      background: none;
      font-size: 2rem;
      line-height: 1;
      padding: 0;
      width: 2rem;
      margin-left: $small-margin;

      &:hover {
        background: $active-color;
      }

      &--loading {
        animation: spin 1s infinite;

        &:hover {
          background: none;
        }

        @keyframes spin {
          100% {
            transform: rotate(360deg);
          }
        }
      }
    }

    &__history {
      padding: 0;
      list-style: none;
      margin: $small-margin 0;
      text-align: left;

      &-item {
        display: block;
        cursor: pointer;
        padding: $small-margin 0;
        color: $brand-color;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;

        &:hover {
          background: $active-color;
        }
      }
    }
  }
</style>
