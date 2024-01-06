import { defineStore } from "pinia";

export const useStore = defineStore("store", () => {
  const baseUrl = "https://gateway.pandatv.uz/catalogservice";
  const userInfoBase = "https://gateway.pandatv.uz/userservice";
  const authBase = "https://gateway.pandatv.uz";
  const paymentUrl = "https://gateway.pandatv.uz/billingservice";
  const analiticsUrl  = "https://gateway.pandatv.uz/analytics"; // Corrected spelling
  const loader = ref(true);
  const overlay = ref(false);
  const searchOpen = ref(false); // Corrected variable name
  const planId = ref(null);
  const tokenOpen = ref(false);

  const planName = ref(""); // Corrected variable name

  let token =
    typeof window !== "undefined"
      ? localStorage.getItem("access_token") // Corrected variable name
      : null;
  const categories = ref(null);
  async function getCategories() { // Corrected function name
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
      try {
        const res = await fetch(userInfoBase + "/users", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        if (res.status !== 200) {
          localStorage.clear();
          tokenOpen.value = false;
          token =
            typeof window !== "undefined"
              ? localStorage.getItem("access_token")
              : null;
          window.location = "/login";
        } else {
          const data = await res.json();
          if (data?.data) {
            userInfo.value = data.data;
            localStorage.setItem("user_id", data.data.id);
          }
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    }
  }

  const history = ref([]);
  async function getHistory() {
    try {
      const user = await $fetch(userInfoBase + "/users", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const res = await $fetch(
        analiticsUrl  + "/user-watch-history/" + user?.data?.id + "/",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      history.value = res;
    } catch (error) {
      console.error("Error fetching user history:", error);
    }
  }

  return {
    history,
    getHistory,
    userInfo,
    getUserInfo,
    getCategories,
    analiticsUrl ,
    planName,
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
    searchOpen,
  };
});
