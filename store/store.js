import { defineStore } from "pinia";

export const useStore = defineStore("store", () => {
  const baseUrl = "https://catalogservice.inminternational.uz";
  const userInfoBase = "https://userservice.inminternational.uz";
  const authBase = "https://authservice.inminternational.uz";
  const paymentUrl = "https://billingservice.inminternational.uz/billing";
  const analiticsUrl = "https://analitics-service.inminternational.uz";
  const loader = ref(true);
  const overlay = ref(false);
  const search_open = ref(false);
  const planId = ref(null);
  const tokenOpen = ref(false);

  const plan_name = ref("");

  let token =
    typeof window !== "undefined"
      ? localStorage.getItem("access__token")
      : null;
  const runtimeConfig = useRuntimeConfig();
  const categories = ref(null);
  async function getCategory() {
    const data = await $fetch(baseUrl + `/category/`);
    categories.value = data;
  }
  const savedMovies = ref();
  async function getSavedMovies() {
    const data = await $fetch(`${baseUrl}/user-favorites/`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    savedMovies.value = data;
  }
  return {
    getCategory,
    analiticsUrl,
    plan_name,
    savedMovies,
    tokenOpen,
    getSavedMovies,
    planId,
    paymentUrl,
    categories,
    userInfoBase,
    authBase,
    token,
    baseUrl,
    loader,
    overlay,
    search_open,
  };
});
