import { defineComponent, resolveComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { a as useAuth } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:url';
import 'node:path';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'pinia';
import 'vue-router';
import 'netlify-identity-widget';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    const auth = useAuth();
    const hubs = [
      {
        id: "home",
        title: "Home Hub",
        path: "/home-hub",
        icon: "HomeIcon",
        stats: { tasks: 0, events: 0, notes: 0 }
      },
      {
        id: "work",
        title: "Work Hub",
        path: "/work-hub",
        icon: "BriefcaseIcon",
        stats: { tasks: 0, events: 0, notes: 0 }
      },
      {
        id: "business",
        title: "Side Business Hub",
        path: "/business-hub",
        icon: "ChartBarIcon",
        stats: { tasks: 0, events: 0, notes: 0 }
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_hub_preview_card = resolveComponent("hub-preview-card");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}><h1 class="text-3xl font-bold text-neutral-800 dark:text-white"> Welcome back, ${ssrInterpolate((_b = (_a = unref(auth).user) == null ? void 0 : _a.user_metadata) == null ? void 0 : _b.full_name)}</h1><div class="grid grid-cols-1 md:grid-cols-3 gap-6"><!--[-->`);
      ssrRenderList(hubs, (hub) => {
        _push(ssrRenderComponent(_component_hub_preview_card, {
          key: hub.id,
          hub
        }, null, _parent));
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=dashboard-CB3lLOGT.mjs.map
