import { defineStore } from "pinia";

export const useStore = defineStore("store", () => {
  const baseUrl = "https://gateway.pandatv.uz/catalogservice";
  const userInfoBase = "https://gateway.pandatv.uz/userservice";
  const authBase = "https://gateway.pandatv.uz";
  const paymentUrl = "https://gateway.pandatv.uz/billingservice";
  const analiticsUrl = "https://gateway.pandatv.uz/analitics";
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

  const userInfo = ref(null);
  async function getUserInfo() {
    if (token) {
      fetch(userInfoBase + "/users", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }).then((res) => {
        if (res.status != 200) {
          localStorage.clear();
          tokenOpen.value = false;
          token =
            typeof window !== "undefined"
              ? localStorage.getItem("access__token")
              : null;
          window.location = "/login";
        } else {
          res.json().then((data) => {
            if (data?.data) {
              userInfo.value = data?.data;
              localStorage.setItem("user_id", data?.data?.id);
            }
          });
        }
      });
    }
  }
  const history = ref([]);
  async function getHistory() {
    const us = await $fetch(userInfoBase + "/users", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const res = await $fetch(
      analiticsUrl + "/user-watch-history/" + us?.data?.id + "/",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    history.value = res;
  }
  return {
    history,
    getHistory,
    userInfo,
    getUserInfo,
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
