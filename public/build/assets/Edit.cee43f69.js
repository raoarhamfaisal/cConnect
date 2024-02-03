import { H as c } from "./Header.dde460c4.js";
import p from "./DeleteUserForm.efee8261.js";
import u from "./UpdatePasswordForm.3880ed21.js";
import h from "./GeneralInfo.143a05b5.js";
import {
  r as g,
  f as s,
  h as o,
  i as t,
  j as _,
  l as f,
  F as x,
  H as y,
  n as l,
  m as i,
} from "./app.9755ce2a.js";
import b from "./Tabs.6b05128b.js";
import w from "./CompanyInfo.0eb40570.js";
import v from "./AddressInfo.6a2a65ec.js";
import k from "./Trades.c3167a29.js";
import $ from "./Views.34509ccb.js";
import B from "./LinksInfo.f5f2d4c1.js";
import "./PostForm.1a0d1801.js";
import "./tContractorWord.dc451942.js";
import "./_plugin-vue_export-helper.cdc0426e.js";
import "./iconify.d4bdef87.js";
import "./InputError.ec8a5011.js";
import "./InputLabel.aa21d361.js";
import "./TextInput.0d7f8fae.js";
import "./PrimaryButton.bb59afa8.js";
import "./UserAvatar.579b12b0.js";
const V = l(
    "header",
    { class: "bg-gray-200" },
    [
      l(
        "div",
        { class: "max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 max-lg:pt-10" },
        [
          l(
            "h2",
            { class: "font-bold text-xl text-blue-rgba leading-tight" },
            "Profile"
          ),
        ]
      ),
    ],
    -1
  ),
  j = { class: "bg-gray-200" },
  C = { class: "max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6" },
  E = { key: 0 },
  F = { key: 1 },
  H = { key: 2 },
  N = { key: 3 },
  O = { key: 0, class: "p-4 sm:p-8 bg-white  shadow sm:rounded-lg" },
  P = { key: 1, class: "p-4 sm:p-8 bg-white  shadow sm:rounded-lg" },
  S = { key: 2, class: "p-4 sm:p-8 bg-white  shadow sm:rounded-lg" },
  G = { key: 3, class: "p-4 sm:p-8 bg-white  shadow sm:rounded-lg" },
  I = l("br", null, null, -1),
  U = l("br", null, null, -1),
  re = {
    __name: "Edit",
    props: {
      mustVerifyEmail: Boolean,
      status: Boolean,
      profile: Object,
      posts: Object,
      showit: Boolean,
      postSearchFilters: { type: Object, default: () => ({ postSearch: "" }) },
    },
    setup(e) {
      const n = ["General Info", "Update Password", "Trades", "views"],
        r = g(0),
        d = (m) => {
          r.value = m;
        };
      return (m, q) => (
        s(),
        o(
          x,
          null,
          [
            t(_(y), { title: "Profile" }),
            t(
              c,
              {
                profile: e.profile,
                posts: e.posts,
                "show-post-buttons": !1,
                "post-search-filters": e.postSearchFilters,
                showit: e.showit,
              },
              {
                default: f(() => [
                  V,
                  l("div", j, [
                    l("div", C, [
                      t(
                        b,
                        { tabs: n, onTabChanged: d },
                        {
                          default: f(({ activeTab: a }) => [
                            a === 0
                              ? (s(),
                                o("div", E, [
                                  t(
                                    h,
                                    {
                                      "must-verify-email": e.mustVerifyEmail,
                                      status: e.status,
                                      profile: e.profile,
                                      class:
                                        "flex flex-col justify-center m-auto",
                                    },
                                    null,
                                    8,
                                    ["must-verify-email", "status", "profile"]
                                  ),
                                ]))
                              : i("", !0),
                            a === 1 ? (s(), o("div", F, [t(u)])) : i("", !0),
                            a === 2
                              ? (s(),
                                o("div", H, [
                                  t(k, { profile: e.profile }, null, 8, [
                                    "profile",
                                  ]),
                                ]))
                              : i("", !0),
                            a === 3
                              ? (s(),
                                o("div", N, [
                                  t($, { profile: e.profile }, null, 8, [
                                    "profile",
                                  ]),
                                ]))
                              : i("", !0),
                          ]),
                          _: 1,
                        }
                      ),
                      r.value === 0
                        ? (s(),
                          o("div", O, [
                            t(w, { profile: e.profile }, null, 8, ["profile"]),
                          ]))
                        : i("", !0),
                      r.value === 0
                        ? (s(),
                          o("div", P, [
                            t(v, { profile: e.profile }, null, 8, ["profile"]),
                          ]))
                        : i("", !0),
                      r.value === 0
                        ? (s(),
                          o("div", S, [
                            t(B, { profile: e.profile }, null, 8, ["profile"]),
                          ]))
                        : i("", !0),
                      r.value === 0
                        ? (s(), o("div", G, [t(p, { class: "max-w-xl" })]))
                        : i("", !0),
                    ]),
                    I,
                    U,
                  ]),
                ]),
                _: 1,
              },
              8,
              ["profile", "posts", "post-search-filters", "showit"]
            ),
          ],
          64
        )
      );
    },
  };
export { re as default };
