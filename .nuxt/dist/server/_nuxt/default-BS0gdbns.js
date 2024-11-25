import { _ as __nuxt_component_0 } from "./nuxt-link-BaKpSByS.js";
import { defineComponent, mergeProps, unref, useSSRContext, computed, withCtx, openBlock, createBlock, toDisplayString, createTextVNode, createVNode, Transition } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderSlot } from "vue/server-renderer";
import { SunIcon, MoonIcon } from "@heroicons/vue/outline";
import { b as useState, a as useAuth } from "../server.mjs";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import "ufo";
import "hookable";
import "ofetch";
import "#internal/nuxt/paths";
import "unctx";
import "h3";
import "pinia";
import "defu";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "radix3";
import "destr";
import "klona";
import "netlify-identity-widget";
const useColorMode = () => {
  return useState("color-mode").value;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ThemeToggle",
  __ssrInlineRender: true,
  setup(__props) {
    const colorMode = useColorMode();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({ class: "p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700" }, _attrs))}>`);
      if (unref(colorMode).value === "dark") {
        _push(ssrRenderComponent(unref(SunIcon), { class: "h-5 w-5" }, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(MoonIcon), { class: "h-5 w-5" }, null, _parent));
      }
      _push(`</button>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ThemeToggle.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "UserMenu",
  __ssrInlineRender: true,
  setup(__props) {
    const auth = useAuth();
    const userInitials = computed(() => {
      var _a, _b, _c;
      const name = ((_b = (_a = auth.user) == null ? void 0 : _a.user_metadata) == null ? void 0 : _b.full_name) || ((_c = auth.user) == null ? void 0 : _c.email) || "";
      return name.split(" ").map((word) => word[0]).join("").toUpperCase().slice(0, 2);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(ssrRenderComponent(unref(Menu), mergeProps({
        as: "div",
        class: "relative"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(MenuButton), { class: "flex items-center space-x-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a, _b, _c, _d;
                if (_push3) {
                  if ((_b = (_a = unref(auth).user) == null ? void 0 : _a.user_metadata) == null ? void 0 : _b.avatar_url) {
                    _push3(`<img${ssrRenderAttr("src", unref(auth).user.user_metadata.avatar_url)} alt="User avatar" class="h-8 w-8 rounded-full"${_scopeId2}>`);
                  } else {
                    _push3(`<div class="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center"${_scopeId2}>${ssrInterpolate(unref(userInitials))}</div>`);
                  }
                } else {
                  return [
                    ((_d = (_c = unref(auth).user) == null ? void 0 : _c.user_metadata) == null ? void 0 : _d.avatar_url) ? (openBlock(), createBlock("img", {
                      key: 0,
                      src: unref(auth).user.user_metadata.avatar_url,
                      alt: "User avatar",
                      class: "h-8 w-8 rounded-full"
                    }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center"
                    }, toDisplayString(unref(userInitials)), 1))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(``);
            _push2(ssrRenderComponent(unref(MenuItems), { class: "absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-neutral-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="py-1"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(MenuItem), null, {
                    default: withCtx(({ active }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtLink, {
                          to: "/profile",
                          class: [
                            active ? "bg-neutral-100 dark:bg-neutral-700" : "",
                            "block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200"
                          ]
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Profile Settings `);
                            } else {
                              return [
                                createTextVNode(" Profile Settings ")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtLink, {
                            to: "/profile",
                            class: [
                              active ? "bg-neutral-100 dark:bg-neutral-700" : "",
                              "block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200"
                            ]
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Profile Settings ")
                            ]),
                            _: 2
                          }, 1032, ["class"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(MenuItem), null, {
                    default: withCtx(({ active }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<button class="${ssrRenderClass([
                          active ? "bg-neutral-100 dark:bg-neutral-700" : "",
                          "block w-full text-left px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200"
                        ])}"${_scopeId3}> Sign Out </button>`);
                      } else {
                        return [
                          createVNode("button", {
                            onClick: unref(auth).logout,
                            class: [
                              active ? "bg-neutral-100 dark:bg-neutral-700" : "",
                              "block w-full text-left px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200"
                            ]
                          }, " Sign Out ", 10, ["onClick"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "py-1" }, [
                      createVNode(unref(MenuItem), null, {
                        default: withCtx(({ active }) => [
                          createVNode(_component_NuxtLink, {
                            to: "/profile",
                            class: [
                              active ? "bg-neutral-100 dark:bg-neutral-700" : "",
                              "block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200"
                            ]
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Profile Settings ")
                            ]),
                            _: 2
                          }, 1032, ["class"])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(MenuItem), null, {
                        default: withCtx(({ active }) => [
                          createVNode("button", {
                            onClick: unref(auth).logout,
                            class: [
                              active ? "bg-neutral-100 dark:bg-neutral-700" : "",
                              "block w-full text-left px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200"
                            ]
                          }, " Sign Out ", 10, ["onClick"])
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(MenuButton), { class: "flex items-center space-x-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary" }, {
                default: withCtx(() => {
                  var _a, _b;
                  return [
                    ((_b = (_a = unref(auth).user) == null ? void 0 : _a.user_metadata) == null ? void 0 : _b.avatar_url) ? (openBlock(), createBlock("img", {
                      key: 0,
                      src: unref(auth).user.user_metadata.avatar_url,
                      alt: "User avatar",
                      class: "h-8 w-8 rounded-full"
                    }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center"
                    }, toDisplayString(unref(userInitials)), 1))
                  ];
                }),
                _: 1
              }),
              createVNode(Transition, {
                "enter-active-class": "transition duration-100 ease-out",
                "enter-from-class": "transform scale-95 opacity-0",
                "enter-to-class": "transform scale-100 opacity-100",
                "leave-active-class": "transition duration-75 ease-in",
                "leave-from-class": "transform scale-100 opacity-100",
                "leave-to-class": "transform scale-95 opacity-0"
              }, {
                default: withCtx(() => [
                  createVNode(unref(MenuItems), { class: "absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-neutral-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "py-1" }, [
                        createVNode(unref(MenuItem), null, {
                          default: withCtx(({ active }) => [
                            createVNode(_component_NuxtLink, {
                              to: "/profile",
                              class: [
                                active ? "bg-neutral-100 dark:bg-neutral-700" : "",
                                "block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200"
                              ]
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Profile Settings ")
                              ]),
                              _: 2
                            }, 1032, ["class"])
                          ]),
                          _: 1
                        }),
                        createVNode(unref(MenuItem), null, {
                          default: withCtx(({ active }) => [
                            createVNode("button", {
                              onClick: unref(auth).logout,
                              class: [
                                active ? "bg-neutral-100 dark:bg-neutral-700" : "",
                                "block w-full text-left px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200"
                              ]
                            }, " Sign Out ", 10, ["onClick"])
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UserMenu.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "NavBar",
  __ssrInlineRender: true,
  setup(__props) {
    const navLinks = [
      { name: "Home Hub", path: "/home-hub" },
      { name: "Work Hub", path: "/work-hub" },
      { name: "Side Business", path: "/business-hub" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_theme_toggle = _sfc_main$3;
      const _component_user_menu = _sfc_main$2;
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-neutral-800 shadow-lg" }, _attrs))}><div class="container mx-auto px-4"><div class="flex justify-between items-center h-16">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/dashboard",
        class: "text-2xl font-bold text-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Leyef Hub `);
          } else {
            return [
              createTextVNode(" Leyef Hub ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="hidden md:flex space-x-8"><!--[-->`);
      ssrRenderList(navLinks, (link) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: link.path,
          to: link.path,
          class: "text-neutral-600 hover:text-primary dark:text-neutral-200"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(link.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(link.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div><div class="flex items-center space-x-4">`);
      _push(ssrRenderComponent(_component_theme_toggle, null, null, _parent));
      _push(ssrRenderComponent(_component_user_menu, null, null, _parent));
      _push(`</div></div></div></nav>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/NavBar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const auth = useAuth();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nav_bar = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-background dark:bg-neutral-900" }, _attrs))}>`);
      if (unref(auth).isAuthenticated) {
        _push(ssrRenderComponent(_component_nav_bar, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<main class="container mx-auto px-4 py-8">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=default-BS0gdbns.js.map
