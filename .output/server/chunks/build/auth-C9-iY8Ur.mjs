import { d as defineNuxtRouteMiddleware, a as useAuth, n as navigateTo } from './server.mjs';
import 'vue';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:url';
import 'node:path';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import 'vue/server-renderer';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'pinia';
import 'vue-router';
import 'netlify-identity-widget';

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

export { auth as default };
//# sourceMappingURL=auth-C9-iY8Ur.mjs.map
