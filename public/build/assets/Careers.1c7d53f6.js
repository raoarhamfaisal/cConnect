import { _ as u } from "./SignUpLayout.9eb7bf4e.js";
import { _ as h, a as m } from "./WelcomeFooter.ba3aa8d4.js";
import {
  u as p,
  c as g,
  e as r,
  h as o,
  s as l,
  F as v,
  d as n,
  i,
  H as f,
  f as t,
  L as d,
  g as w,
  t as s,
  l as x,
} from "./app.907bb242.js";
import "./spanish.afd7e950.js";
import "./cConnectWord.60dc90ac.js";
import "./_plugin-vue_export-helper.cdc0426e.js";
import "./ResponsiveNavLink.04cb55a4.js";
import "./iconify.99e09ef6.js";
import "./DialogUpgradeToGoldPlatinum.8daf4ac5.js";
import "./CustomDialog.f5ff7c4f.js";
import "./tContractorWhite.08eee911.js";
const b = { class: "bg-gray-100 min-h-screen p-3 sm:p-5 max-sm:rounded" },
  k = { class: "mb-3 sm:mb-6" },
  y = { class: "text-4xl font-bold mb-3 sm:mb-6" },
  B = { class: "text-lg mb-3 sm:mb-6" },
  N = { class: "grid grid-cols-1 md:grid-cols-2 gap-6" },
  j = { class: "bg-white p-6 rounded-lg shadow-lg" },
  C = { class: "text-2xl font-semibold mb-3" },
  V = { class: "text-gray-700" },
  F = { class: "bg-white p-6 rounded-lg shadow-lg" },
  H = { class: "text-2xl font-semibold mb-3" },
  S = { class: "text-gray-700" },
  $ = { class: "bg-white p-6 rounded-lg shadow-lg" },
  L = { class: "text-2xl font-semibold mb-3" },
  D = { class: "text-gray-700" },
  E = { class: "bg-white p-6 rounded-lg shadow-lg" },
  M = { class: "text-2xl font-semibold mb-3" },
  T = { class: "text-gray-700" },
  U = { class: "bg-white p-6 rounded-lg shadow-lg" },
  q = { class: "text-2xl font-semibold mb-3" },
  z = { class: "text-gray-700" },
  A = { key: 0, class: "flex justify-center space-x-3" },
  G = {
    class:
      "text-lg font-bold text-white uppercase transition-colors group-hover:font-extrabold group-active:text-indigo-500",
  },
  I = t(
    "span",
    {
      class:
        "ml-4 flex-shrink-0 rounded-full border border-current bg-white p-2 text-indigo-600 group-active:text-indigo-500",
    },
    [
      t(
        "svg",
        {
          class: "h-5 w-5",
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
        },
        [
          t("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M17 8l4 4m0 0l-4 4m4-4H3",
          }),
        ]
      ),
    ],
    -1
  ),
  se = {
    __name: "Careers",
    props: { showit: Boolean },
    setup(a) {
      const c = p(),
        e = g(() => c.getters.translations);
      return (_, J) => (
        n(),
        r(
          v,
          null,
          [
            o(u, null, {
              default: l(() => [
                o(i(f), { title: e.value && e.value.careers }, null, 8, [
                  "title",
                ]),
                o(
                  m,
                  { showNewsFeed: !0, showit: a.showit, showSignUp: !0 },
                  null,
                  8,
                  ["showit"]
                ),
                t("div", b, [
                  t("div", k, [
                    o(
                      i(d),
                      { href: "/", class: "text-blue-500 hover:underline" },
                      {
                        default: l(() => [
                          w(
                            "\u2190 " + s(e.value && e.value.back_to_main_page),
                            1
                          ),
                        ]),
                        _: 1,
                      }
                    ),
                  ]),
                  t(
                    "h1",
                    y,
                    s(e.value && e.value.join_our_network_of_contractors),
                    1
                  ),
                  t(
                    "p",
                    B,
                    s(e.value && e.value.building_community_at_tcontractor),
                    1
                  ),
                  t("div", N, [
                    t("div", j, [
                      t(
                        "h2",
                        C,
                        s(e.value && e.value.hire_talented_contractors),
                        1
                      ),
                      t(
                        "p",
                        V,
                        s(e.value && e.value.find_skilled_professionals),
                        1
                      ),
                    ]),
                    t("div", F, [
                      t(
                        "h2",
                        H,
                        s(e.value && e.value.find_work_opportunities),
                        1
                      ),
                      t(
                        "p",
                        S,
                        s(e.value && e.value.explore_new_work_opportunities),
                        1
                      ),
                    ]),
                    t("div", $, [
                      t(
                        "h2",
                        L,
                        s(e.value && e.value.offer_and_receive_help),
                        1
                      ),
                      t(
                        "p",
                        D,
                        s(e.value && e.value.engage_in_give_and_take),
                        1
                      ),
                    ]),
                    t("div", E, [
                      t(
                        "h2",
                        M,
                        s(e.value && e.value.spot_red_flag_customers),
                        1
                      ),
                      t(
                        "p",
                        T,
                        s(e.value && e.value.identify_difficult_customers),
                        1
                      ),
                    ]),
                    t("div", U, [
                      t(
                        "h2",
                        q,
                        s(e.value && e.value.stay_updated_with_news_feed),
                        1
                      ),
                      t(
                        "p",
                        z,
                        s(e.value && e.value.keep_yourself_informed),
                        1
                      ),
                    ]),
                  ]),
                  a.showit
                    ? x("", !0)
                    : (n(),
                      r("div", A, [
                        o(
                          i(d),
                          {
                            class:
                              "group flex items-center justify-between rounded-xl border border-red-500 bg-red-500 px-5 py-3 mt-8 transition-colors hover:bg-red-800 focus:outline-none focus:ring",
                            href: _.route("signup"),
                          },
                          {
                            default: l(() => [
                              t(
                                "span",
                                G,
                                s(e.value && e.value.get_started),
                                1
                              ),
                              I,
                            ]),
                            _: 1,
                          },
                          8,
                          ["href"]
                        ),
                      ])),
                ]),
              ]),
              _: 1,
            }),
            o(h, { showit: a.showit }, null, 8, ["showit"]),
          ],
          64
        )
      );
    },
  };
export { se as default };
