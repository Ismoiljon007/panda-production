import { defineStore } from "pinia";

export const useStore = defineStore("store", () => {
  const baseUrl = "https://catalogservice.inminternational.uz";
  const loader = ref(true);
  const overlay = ref(false);
  const search_open = ref(false);
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("access__token")
      : null;
  const runtimeConfig = useRuntimeConfig();
  const { data: categories } = useAsyncData(
    "cat",
    async () => await $fetch(runtimeConfig.apiSecret + `/category`)
  );
  return {
    categories,
    token,
    baseUrl,
    loader,
    overlay,
    search_open,
  };
});
