import { d as defineNuxtRouteMiddleware, a as useAuth, n as navigateTo } from "../server.mjs";
import "vue";
import "ofetch";
import "#internal/nuxt/paths";
import "hookable";
import "unctx";
import "h3";
import "pinia";
import "defu";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "radix3";
import "ufo";
import "destr";
import "klona";
import "netlify-identity-widget";
import "vue/server-renderer";
const auth = defineNuxtRouteMiddleware(
  (to) => {
    const auth2 = useAuth();
    if (!auth2.isAuthenticated && to.path !== "/login") {
      return navigateTo("/login");
    }
    if (auth2.isAuthenticated && to.path === "/login") {
      return navigateTo("/dashboard");
    }
  }
);
export {
  auth as default
};
//# sourceMappingURL=auth-C9-iY8Ur.js.map
