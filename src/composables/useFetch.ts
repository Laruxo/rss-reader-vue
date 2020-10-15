import { ref, watch, onMounted, Ref } from "vue";

async function doFetch(url: string, options?: RequestInit) {
  const result = await fetch(url, options);
  const json = await result.json();

  if (json.status === "ok") {
    return json;
  } else {
    throw new Error(json.message);
  }
}

export function useFetch(url: Ref<string>): Ref<ResponseState> {
  const response = ref<ResponseState>(null);

  watch(url, async (newUrl, _, onInvalidate) => {
    const controller = new AbortController();
    let didCancel = false;
    onInvalidate(() => {
      controller.abort();
      didCancel = true;
    });

    response.value = null;
    try {
      const result = await doFetch(newUrl, { signal: controller.signal });
      if (didCancel) return;
      response.value = result;
    } catch (e) {
      response.value = { error: e.message };
    }
  });
  onMounted(async () => {
    try {
      response.value = await doFetch(url.value);
    } catch (e) {
      response.value = { error: e.message };
    }
  });

  return response;
}
