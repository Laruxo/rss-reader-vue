import { ref, watch, type Ref } from 'vue'

async function doFetch(url: string, options?: RequestInit) {
  const result = await fetch(url, options)
  const json = await result.json()

  if (json.status === 'ok') {
    return json
  } else {
    throw new Error(json.message)
  }
}

export function useFetch(url: Ref<string>): Ref<ResponseState> {
  const response = ref<ResponseState>(null)

  watch(
    url,
    async (newUrl, _, onCleanup) => {
      const controller = new AbortController()
      let didCancel = false
      onCleanup(() => {
        controller.abort()
        didCancel = true
      })

      response.value = null
      try {
        const result = await doFetch(newUrl, { signal: controller.signal })
        if (didCancel) return
        response.value = result
      } catch (e) {
        response.value = {
          error: e instanceof Error ? e.message : 'Unknown error',
        }
      }
    },
    { immediate: true },
  )

  return response
}
