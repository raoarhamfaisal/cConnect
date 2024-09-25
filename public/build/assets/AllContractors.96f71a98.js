import { H as V } from "./Header.8b20dfa0.js";
import {
  D as F,
  u as H,
  r as a,
  c as M,
  o as U,
  S as z,
  N as O,
  X as R,
  I as D,
  e as p,
  h as n,
  i as A,
  K as x,
  s as b,
  l as m,
  F as N,
  d as r,
  H as E,
  f as l,
  n as j,
  j as K,
  L as X,
  U as q,
  V as G,
} from "./app.907bb242.js";
import { L as B } from "./Loader.9dfd413c.js";
import { C as J } from "./Card.0c51827f.js";
import Q from "./Contractor.427d9795.js";
import { _ as Y } from "./SearchInput.af7e43a6.js";
import { P as Z } from "./PageTitle.f25bd43b.js";
import { _ as ee } from "./_plugin-vue_export-helper.cdc0426e.js";
import "./spanish.afd7e950.js";
import "./cConnectWord.60dc90ac.js";
import "./filepond-plugin-file-poster.b4b2d2f1.js";
import "./CustomDialog.f5ff7c4f.js";
import "./iconify.99e09ef6.js";
import "./selectListsHelpters.6d73b684.js";
import "./Badge.c427ce3e.js";
import "./DialogProfileTabs.3ff770e3.js";
import "./Trades.1aa0dbd9.js";
import "./Views.82daefe6.js";
import "./Avatar.72f6a2c8.js";
import "./InputLabel.c691f6db.js";
import "./InputError.a485c9eb.js";
import "./SelectProfile.a00d96e3.js";
import "./DialogUpgradeToGoldPlatinum.8daf4ac5.js";
/* empty css                                                             */ import "./StarRating.345caaaf.js";
/* empty css                                                                  */ const y =
    (e) => (q("data-v-bff6a327"), (e = e()), G(), e),
  te = { class: "bg-gray-200 mt-10" },
  ae = { class: "mb-6" },
  oe = { class: "flex gap-3" },
  se = ["disabled"],
  re = y(() =>
    l("div", { class: "flex items-center justify-center" }, "Contractors", -1)
  ),
  le = [re],
  ie = ["disabled"],
  ne = y(() =>
    l("div", { class: "flex items-center justify-center" }, "Reviewers", -1)
  ),
  ce = [ne],
  de = { key: 0, class: "flex flex-col" },
  ue = { key: 0, class: "text-center font-bold mt-4" },
  pe = { key: 1 },
  me = y(() =>
    l(
      "div",
      {
        class:
          "p-2 text-xl text-grey-600 font-bold h-60 flex items-center justify-center",
      },
      " No Contractors Available ",
      -1
    )
  ),
  ve = [me],
  fe = {
    __name: "AllContractors",
    props: {
      profile: Object,
      region_id: [String, Number],
      showit: Boolean,
      postSearchFilters: { type: Object, default: () => ({ postSearch: "" }) },
    },
    setup(e) {
      const { region_id: I } = e,
        C = F().props.value.auth.user.appeals_privileges === 1,
        g = H(),
        c = a(1),
        P = a(10),
        w = a(!1),
        k = a(""),
        v = a(!1),
        u = a(!1),
        o = a(!1),
        h = a({}),
        s = a([]),
        L = M(() => g.getters.screenWidth);
      U(async () => {
        (o.value = !0), await _(), (o.value = !1);
      }),
        z(() => {
          !C &&
            window.location.pathname !== "/post" &&
            O.Inertia.visit("/post");
        });
      const T = async () => {
          console.log("Loading more"), (u.value = !0);
          let t = c.value + 1;
          await _(t), (u.value = !1), (c.value = t);
        },
        _ = async (t = 1, d = !0) => {
          try {
            const i = await axios.get(
              `/api/admin/${I}/search-contractor?search=${k.value}&per_page=${P.value}&page=${t}`,
              R()
            );
            i.data &&
              (d
                ? (s.value = [...s.value, ...i.data.profiles])
                : (s.value = [...i.data.profiles]),
              (h.value = i.data.pagination));
          } catch {
            somethingWentWrong();
          }
        },
        W = async (t) => {
          (k.value = t),
            (c.value = 1),
            (o.value = !0),
            await _(1, !1),
            (o.value = !1);
        },
        S = (t) => {
          (v.value = t),
            g.commit("ratings/setLoading", !0),
            setTimeout(() => {
              g.commit("ratings/setLoading", !1);
            }, 200);
        };
      return (t, d) => {
        const i = D("v-lazy");
        return (
          r(),
          p(
            N,
            null,
            [
              n(A(E), { title: "All Contractors" }),
              C
                ? (r(),
                  x(
                    V,
                    {
                      key: 0,
                      profile: e.profile,
                      "post-search-filters": e.postSearchFilters,
                      showit: e.showit,
                      "show-post-buttons": !0,
                      color: "rgb(229 231 235 / var(--tw-bg-opacity))",
                    },
                    {
                      default: b(() => [
                        l("div", te, [
                          n(
                            J,
                            {
                              shadowLevel: 2,
                              bgColor: "white",
                              padding: L.value < 640 ? "7px" : "20px",
                            },
                            {
                              default: b(() => [
                                n(Z, {
                                  linkUrl: "/admin/regions/contractors",
                                  pageTitle: "All Contractors",
                                }),
                                n(
                                  Y,
                                  {
                                    class: "mb-8",
                                    barWidth: L.value < 640 ? 50 : 35,
                                    icon: "iconamoon:search",
                                    onSearchClicked: W,
                                  },
                                  null,
                                  8,
                                  ["barWidth"]
                                ),
                                l("div", ae, [
                                  l("div", oe, [
                                    l(
                                      "button",
                                      {
                                        class: j([
                                          "rounded px-2 py-1 xs:px-4 xs:py-2 xs:text-md text-sm flex gap-2",
                                          { selected: !v.value },
                                        ]),
                                        disabled: w.value,
                                        onClick: d[0] || (d[0] = (f) => S(!1)),
                                      },
                                      le,
                                      10,
                                      se
                                    ),
                                    l(
                                      "button",
                                      {
                                        class: j([
                                          "rounded px-2 py-1 xs:px-4 xs:py-2 xs:text-md text-sm flex gap-2",
                                          { selected: v.value },
                                        ]),
                                        disabled: w.value,
                                        onClick: d[1] || (d[1] = (f) => S(!0)),
                                      },
                                      ce,
                                      10,
                                      ie
                                    ),
                                  ]),
                                ]),
                                s.value && !o.value && s.value.length > 0
                                  ? (r(),
                                    p("div", de, [
                                      (r(!0),
                                      p(
                                        N,
                                        null,
                                        K(
                                          s.value,
                                          (f, $) => (
                                            r(),
                                            x(
                                              A(X),
                                              {
                                                key: $,
                                                href: `/admin/regions/${
                                                  e.region_id
                                                }/contractors/${f.id}${
                                                  v.value ? "/reviews" : ""
                                                }`,
                                                class:
                                                  "hover:bg-[#f8f9fa] hover:rounded",
                                              },
                                              {
                                                default: b(() => [
                                                  n(
                                                    Q,
                                                    {
                                                      class:
                                                        "border-b-2 py-2 border-gray-200 cursor-pointer",
                                                      contractor: f,
                                                    },
                                                    null,
                                                    8,
                                                    ["contractor"]
                                                  ),
                                                  +c.value !=
                                                    +h.value.last_page &&
                                                  $ === s.value.length - 1
                                                    ? (r(),
                                                      x(i, {
                                                        key: 0,
                                                        "min-height": 5,
                                                        options: {
                                                          threshold: 0.5,
                                                        },
                                                        "onUpdate:modelValue":
                                                          T,
                                                        transition:
                                                          "fade-transition",
                                                      }))
                                                    : m("", !0),
                                                ]),
                                                _: 2,
                                              },
                                              1032,
                                              ["href"]
                                            )
                                          )
                                        ),
                                        128
                                      )),
                                      c.value > 1 &&
                                      !o.value &&
                                      !u.value &&
                                      +c.value == +h.value.last_page
                                        ? (r(),
                                          p(
                                            "div",
                                            ue,
                                            " No More Contractors to Load "
                                          ))
                                        : m("", !0),
                                      n(
                                        B,
                                        {
                                          classes: "flex gap-2 mt-4",
                                          loading: u.value,
                                          circleClasses: "small-circle",
                                          textClasses: "small-text",
                                          background: "",
                                          height: "70px",
                                        },
                                        null,
                                        8,
                                        ["loading"]
                                      ),
                                    ]))
                                  : m("", !0),
                                s.value.length === 0 && !o.value
                                  ? (r(), p("div", pe, ve))
                                  : m("", !0),
                                n(
                                  B,
                                  {
                                    loading: o.value && !u.value,
                                    background: "white",
                                    height: "60vh",
                                  },
                                  null,
                                  8,
                                  ["loading"]
                                ),
                              ]),
                              _: 1,
                            },
                            8,
                            ["padding"]
                          ),
                        ]),
                      ]),
                      _: 1,
                    },
                    8,
                    ["profile", "post-search-filters", "showit"]
                  ))
                : m("", !0),
            ],
            64
          )
        );
      };
    },
  },
  Oe = ee(fe, [["__scopeId", "data-v-bff6a327"]]);
export { Oe as default };
