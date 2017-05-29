<template>
  <transition name="modal">
    <div class="modal" v-show="show">
      <div class="modal__backdrop" @click="$emit('close')"></div>
      <transition name="modal__dialog">
        <dialog class="modal__dialog" v-if="show && item">
          <a class="modal__close" @click="$emit('close')">&times;</a>
          <h2>{{ item.title }}</h2>
          <a class="button modal__action" :href="item.link" target="_blank">Read Full Story...</a>
          <p v-html="item.description"></p>
          <p v-html="item.content"></p>
        </dialog>
      </transition>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'modal',
    props: ['item', 'show'],
  };
</script>

<style lang="scss">
  @import '../sass/variables';

  .modal {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    justify-content: center;
    align-items: center;
    transition-duration: .5s;

    &__backdrop {
      width: 100%;
      height: 100%;
      background: $shadow-color;
      position: absolute;
    }

    &__close {
      position: absolute;
      right: $base-margin;
      top: $base-margin;
      cursor: pointer;
      font-size: 2rem;
      width: 1rem;
      line-height: 1rem;
    }

    &__dialog {
      display: block;
      margin: 0 5%;
      height: 90vh;
      text-align: center;
      padding: $base-margin;
      overflow-y: scroll;
      border: 0;
      position: absolute;
      left: 0;
      right: 0;
      transition: transform .5s ease-out;

      img {
        max-width: 100%;
        display: block;
        margin: 0 auto;
      }

      &-enter {
        transform: translateY(100%);
      }

      &-leave-active {
        transition-timing-function: ease-in;
        transform: translateY(100%);
      }
    }
  }
</style>
