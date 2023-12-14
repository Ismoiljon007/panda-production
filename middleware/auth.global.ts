import { useStore } from "~~/store/store";
export default defineNuxtRouteMiddleware((to, from) => {
  const store = useStore();
  if (store.token && to.path == "/login") {
    return navigateTo("/");
  }
});
