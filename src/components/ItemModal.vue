<template>
  <teleport to="body">
    <div class="fixed inset-0 flex content-center items-center md:p-16">
      <div class="absolute inset-0 bg-black/50" @click="$emit('close')" />
      <dialog
        class="relative size-full overflow-y-auto mx-auto max-w-7xl"
        :aria-label="item.title"
        role="alertdialog"
        aria-modal="true"
        open
        @keyup.esc.prevent="$emit('close')"
      >
        <div class="sticky top-0 bg-white flex py-6 px-4">
          <h2 class="flex-1 mb-4 mr-6">{{ item.title }}</h2>
          <button
            type="button"
            class="size-6 text-3xl leading-0 hover:opacity-80"
            @click="$emit('close')"
            ref="closeButton"
          >
            &times;
          </button>
        </div>
        <div class="content px-4" v-html="item.description" />
        <a
          class="button m-4"
          :href="item.link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read the Full Story
        </a>
        <div
          v-if="item.description !== item.content"
          class="content mx-4 pt-4 pb-6 border-t"
          v-html="item.content"
        />
      </dialog>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

defineProps<{ item: FeedItem }>()

defineEmits(['close'])

const closeButton = ref<HTMLElement | null>(null)
onMounted(() => {
  closeButton.value?.focus()
})
</script>
