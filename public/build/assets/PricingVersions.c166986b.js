import { _ as G } from "./freebox.8421bda3.js";
import { I as k } from "./iconify.99e09ef6.js";
import {
  u as M,
  c as $,
  d as i,
  e as v,
  f as t,
  t as a,
  K as N,
  i as C,
  y as T,
  l as y,
  n as I,
  I as E,
  h as o,
  s as d,
  g as n,
  U as re,
  V as ce,
  r as S,
  o as ne,
  a as ge,
  X as ie,
  D as pe,
  F as xe,
  N as W,
} from "./app.907bb242.js";
import { _ as _e } from "./_plugin-vue_export-helper.cdc0426e.js";
import { C as ue } from "./CustomDialog.f5ff7c4f.js";
const me = { key: 0, class: I("flex gap-2 ") },
  he = { class: "w-[55%] text-xl text-end font-semibold" },
  be = { key: 0, class: "w-[15%] flex justify-center items-center" },
  Te = { class: "text-xl mb-2 text-center font-semibold" },
  ye = { key: 0, class: "flex justify-center items-center" },
  we = { key: 2, class: "text-lg lg:text-2xl font-extrabold" },
  ke = { class: "flex justify-center items-center" },
  Ne = { key: 2, class: "text-lg lg:text-2xl font-extrabold" },
  Ce = { class: "flex justify-center items-center" },
  $e = { key: 2, class: "text-lg lg:text-2xl font-extrabold" },
  f = {
    __name: "PricingFeature",
    props: {
      featureText: { type: String },
      bgColor: { type: String },
      freeText: { type: [String, Number, Boolean] },
      goldText: { type: [String, Number, Boolean] },
      platinumText: { type: [String, Number, Boolean] },
      pageName: { type: String, default: "pricing" },
    },
    setup(m) {
      const c = m,
        l = M(),
        r = $(() => l.getters.userVersion),
        _ = $(() => l.getters.screenWidth),
        s = $(() => l.getters.translations),
        x = $(
          () => c.pageName !== "pricing" && _.value > 768 && _.value < 1200
        ),
        h = $(() => r.value !== 0 && r.value !== 1);
      return (z, V) =>
        _.value > 768
          ? (i(),
            v("div", me, [
              t("div", he, a(c.featureText), 1),
              r.value === 1 || r.value === 0
                ? (i(),
                  v("div", be, [
                    c.freeText === 1
                      ? (i(),
                        N(C(k), {
                          key: 0,
                          color: "#099268",
                          width: "26",
                          height: "26",
                          icon: "mdi:tick-circle",
                        }))
                      : c.freeText === 0
                      ? (i(),
                        N(C(k), {
                          key: 1,
                          color: "#e03131",
                          width: "28",
                          height: "28",
                          icon: "clarity:remove-solid",
                        }))
                      : (i(),
                        v(
                          "div",
                          {
                            key: 2,
                            style: T({ fontSize: x.value ? "1.2rem" : "" }),
                            class: "text-lg lg:text-2xl font-bold",
                          },
                          a(
                            c.freeText === 99
                              ? s.value && s.value.unlimited
                              : c.freeText
                          ),
                          5
                        )),
                  ]))
                : y("", !0),
              t(
                "div",
                {
                  class: "flex justify-center items-center",
                  style: T({ width: h.value ? "22.5%" : "15%" }),
                },
                [
                  c.goldText === 1
                    ? (i(),
                      N(C(k), {
                        key: 0,
                        color: "#099268",
                        width: "28",
                        height: "28",
                        icon: "mdi:tick-circle",
                      }))
                    : c.goldText === 0
                    ? (i(),
                      N(C(k), {
                        key: 1,
                        color: "#e03131",
                        width: "26",
                        height: "26",
                        icon: "clarity:remove-solid",
                      }))
                    : (i(),
                      v(
                        "div",
                        {
                          key: 2,
                          style: T({ fontSize: x.value ? "1.2rem" : "" }),
                          class: "text-lg lg:text-2xl font-bold",
                        },
                        a(
                          c.goldText === 99
                            ? s.value && s.value.unlimited
                            : c.goldText
                        ),
                        5
                      )),
                ],
                4
              ),
              t(
                "div",
                {
                  style: T({ width: h.value ? "22.5%" : "15%" }),
                  class: "flex justify-center items-center",
                },
                [
                  c.platinumText === 1
                    ? (i(),
                      N(C(k), {
                        key: 0,
                        color: "#099268",
                        width: "26",
                        height: "26",
                        icon: "mdi:tick-circle",
                      }))
                    : c.platinumText === 0
                    ? (i(),
                      N(C(k), {
                        key: 1,
                        color: "#e03131",
                        width: "26",
                        height: "26",
                        icon: "clarity:remove-solid",
                      }))
                    : (i(),
                      v(
                        "div",
                        {
                          key: 2,
                          style: T({ fontSize: x.value ? "1.2rem" : "" }),
                          class: "text-lg lg:text-2xl font-bold",
                        },
                        a(
                          c.platinumText === 99
                            ? s.value && s.value.unlimited
                            : c.platinumText
                        ),
                        5
                      )),
                ],
                4
              ),
            ]))
          : (i(),
            v(
              "div",
              { key: 1, class: I(` ${m.bgColor}`) },
              [
                t("div", Te, a(c.featureText), 1),
                t(
                  "div",
                  {
                    class: I([
                      "grid gap-x-1",
                      r.value !== 1 ? "grid-cols-2" : "grid-cols-3",
                    ]),
                  },
                  [
                    r.value === 1 || r.value === 0
                      ? (i(),
                        v("div", ye, [
                          c.freeText === 1
                            ? (i(),
                              N(C(k), {
                                key: 0,
                                color: "#099268",
                                width: "22",
                                height: "22",
                                icon: "mdi:tick-circle",
                              }))
                            : c.freeText === 0
                            ? (i(),
                              N(C(k), {
                                key: 1,
                                color: "#e03131",
                                width: "22",
                                height: "22",
                                icon: "clarity:remove-solid",
                              }))
                            : (i(),
                              v(
                                "div",
                                we,
                                a(
                                  c.freeText === 99
                                    ? s.value && s.value.unlimited
                                    : c.freeText
                                ),
                                1
                              )),
                        ]))
                      : y("", !0),
                    t("div", ke, [
                      c.goldText === 1
                        ? (i(),
                          N(C(k), {
                            key: 0,
                            color: "#099268",
                            width: "22",
                            height: "22",
                            icon: "mdi:tick-circle",
                          }))
                        : c.goldText === 0
                        ? (i(),
                          N(C(k), {
                            key: 1,
                            color: "#e03131",
                            width: "22",
                            height: "22",
                            icon: "clarity:remove-solid",
                          }))
                        : (i(),
                          v(
                            "div",
                            Ne,
                            a(
                              c.goldText === 99
                                ? s.value && s.value.unlimited
                                : c.goldText
                            ),
                            1
                          )),
                    ]),
                    t("div", Ce, [
                      c.platinumText === 1
                        ? (i(),
                          N(C(k), {
                            key: 0,
                            color: "#099268",
                            width: "22",
                            height: "22",
                            icon: "mdi:tick-circle",
                          }))
                        : c.platinumText === 0
                        ? (i(),
                          N(C(k), {
                            key: 1,
                            color: "#e03131",
                            width: "22",
                            height: "22",
                            icon: "clarity:remove-solid",
                          }))
                        : (i(),
                          v(
                            "div",
                            $e,
                            a(
                              c.platinumText === 99
                                ? s.value && s.value.unlimited
                                : c.platinumText
                            ),
                            1
                          )),
                    ]),
                  ],
                  2
                ),
              ],
              2
            ));
    },
  };
const u = (m) => (re("data-v-dcc6de6f"), (m = m()), ce(), m),
  Se = { class: "mt-4" },
  je = { class: "flex justify-center", ref: "whatVersionAreYourRef" },
  Ve = { class: "text-5xl font-extrabold mb-4 text-center text-blue-rgba" },
  Pe = u(() => t("br", null, null, -1)),
  Ie = u(() => t("br", null, null, -1)),
  ze = { class: "list-disc pl-8" },
  Fe = u(() => t("br", null, null, -1)),
  Ee = u(() => t("br", null, null, -1)),
  Be = u(() => t("strong", { class: "inline" }, "cConnect", -1)),
  Ae = u(() => t("strong", { class: "inline" }, "cConnect", -1)),
  De = u(() => t("br", null, null, -1)),
  We = u(() => t("br", null, null, -1)),
  Re = { class: "inline" },
  qe = u(() => t("br", null, null, -1)),
  Ue = u(() => t("br", null, null, -1)),
  He = u(() => t("br", null, null, -1)),
  Le = u(() => t("br", null, null, -1)),
  Ge = u(() => t("br", null, null, -1)),
  Me = u(() => t("br", null, null, -1)),
  Qe = u(() => t("br", null, null, -1)),
  Ye = u(() => t("br", null, null, -1)),
  Ke = u(() => t("strong", { class: "inline" }, "cConnect", -1)),
  Xe = u(() => t("br", null, null, -1)),
  Je = u(() => t("br", null, null, -1)),
  Oe = u(() => t("br", null, null, -1)),
  Ze = u(() => t("br", null, null, -1)),
  et = u(() => t("strong", { class: "inline" }, "cConnect", -1)),
  tt = u(() => t("br", null, null, -1)),
  lt = u(() => t("br", null, null, -1)),
  at = u(() => t("br", null, null, -1)),
  ot = u(() => t("br", null, null, -1)),
  st = u(() => t("br", null, null, -1)),
  nt = u(() => t("strong", { class: "inline" }, "cConnect", -1)),
  it = u(() => t("br", null, null, -1)),
  ut = u(() => t("br", null, null, -1)),
  rt = u(() => t("strong", { class: "inline" }, "cConnect", -1)),
  ct = u(() => t("strong", { class: "inline" }, "cConnect", -1)),
  _t = u(() => t("br", null, null, -1)),
  dt = u(() => t("br", null, null, -1)),
  vt = u(() => t("strong", { class: "inline" }, "cConnect", -1)),
  ft = {
    __name: "FAQS",
    setup(m) {
      const c = M();
      $(() => c.getters.screenWidth);
      const l = $(() => c.getters.translations);
      return (r, _) => {
        const s = E("v-expansion-panel-title"),
          x = E("v-expansion-panel-text"),
          h = E("v-expansion-panel"),
          z = E("v-expansion-panels");
        return (
          i(),
          v("div", Se, [
            t("div", je, [t("span", Ve, a(l.value && l.value.faqs), 1)], 512),
            o(
              z,
              { multiple: "", class: "" },
              {
                default: d(() => [
                  o(
                    h,
                    { class: "rounded-lg-imp" },
                    {
                      default: d(() => [
                        o(
                          s,
                          {
                            "expand-icon": "mdi-plus",
                            "collapse-icon": "mdi-minus",
                            class: "text-3xl-imp",
                          },
                          {
                            default: d(() => [
                              n(a(l.value && l.value.what_is_the_news_feed), 1),
                            ]),
                            _: 1,
                          }
                        ),
                        o(
                          x,
                          {
                            class:
                              "p-3 sm:p-6 flex-col text-lg font-semibold text-gray-900",
                          },
                          {
                            default: d(() => [
                              t(
                                "div",
                                null,
                                a(
                                  l.value && l.value.the_news_feed_is_the_heart
                                ),
                                1
                              ),
                              n(
                                " " +
                                  a(
                                    l.value &&
                                      l.value.use_the_news_feed_community
                                  ) +
                                  " ",
                                1
                              ),
                              Pe,
                              Ie,
                              n(
                                " " + a(l.value && l.value.post_often_to) + " ",
                                1
                              ),
                              t("ul", ze, [
                                t(
                                  "li",
                                  null,
                                  a(l.value && l.value.advertise_your_services),
                                  1
                                ),
                                t(
                                  "li",
                                  null,
                                  a(l.value && l.value.put_your_brag_out_there),
                                  1
                                ),
                                t(
                                  "li",
                                  null,
                                  a(l.value && l.value.post_new_jobs_coming_up),
                                  1
                                ),
                                t(
                                  "li",
                                  null,
                                  a(l.value && l.value.got_a_question_post_it),
                                  1
                                ),
                                t(
                                  "li",
                                  null,
                                  a(
                                    l.value &&
                                      l.value.ran_into_a_situation_post_it
                                  ),
                                  1
                                ),
                              ]),
                            ]),
                            _: 1,
                          }
                        ),
                      ]),
                      _: 1,
                    }
                  ),
                  o(
                    h,
                    { class: "rounded-lg-imp" },
                    {
                      default: d(() => [
                        o(
                          s,
                          {
                            "expand-icon": "mdi-plus",
                            "collapse-icon": "mdi-minus",
                            class: "text-3xl-imp",
                          },
                          {
                            default: d(() => [
                              n(a(l.value && l.value.why_tcontractor), 1),
                            ]),
                            _: 1,
                          }
                        ),
                        o(
                          x,
                          {
                            class:
                              "p-3 sm:p-6 flex-col text-lg font-semibold text-gray-900",
                          },
                          {
                            default: d(() => [
                              n(
                                a(
                                  l.value &&
                                    l.value.true_social_media_platforms_offer
                                ),
                                1
                              ),
                              Fe,
                              Ee,
                              t("div", null, [
                                Be,
                                n(
                                  " " +
                                    a(
                                      l.value &&
                                        l.value.is_the_answer_to_these_issues
                                    ),
                                  1
                                ),
                              ]),
                            ]),
                            _: 1,
                          }
                        ),
                      ]),
                      _: 1,
                    }
                  ),
                  o(
                    h,
                    { class: "rounded-lg-imp" },
                    {
                      default: d(() => [
                        o(
                          s,
                          {
                            "expand-icon": "mdi-plus",
                            "collapse-icon": "mdi-minus",
                            class: "text-3xl-imp",
                          },
                          {
                            default: d(() => [
                              n(
                                a(
                                  l.value &&
                                    l.value.how_much_does_it_cost_to_advertise
                                ),
                                1
                              ),
                            ]),
                            _: 1,
                          }
                        ),
                        o(
                          x,
                          {
                            class:
                              "p-3 sm:p-6 flex-col text-lg font-semibold text-gray-900",
                          },
                          {
                            default: d(() => [
                              t("div", null, [
                                n(
                                  a(
                                    l.value &&
                                      l.value.member_contractor_advertises_free
                                  ) + " ",
                                  1
                                ),
                                Ae,
                                n(". "),
                              ]),
                            ]),
                            _: 1,
                          }
                        ),
                      ]),
                      _: 1,
                    }
                  ),
                  o(
                    h,
                    { class: "rounded-lg-imp" },
                    {
                      default: d(() => [
                        o(
                          s,
                          {
                            "expand-icon": "mdi-plus",
                            "collapse-icon": "mdi-minus",
                            class: "text-3xl-imp",
                          },
                          {
                            default: d(() => [
                              n(a(l.value && l.value.what_is_sub_finder), 1),
                            ]),
                            _: 1,
                          }
                        ),
                        o(
                          x,
                          {
                            class:
                              "p-3 sm:p-6 flex-col text-lg font-semibold text-gray-900",
                          },
                          {
                            default: d(() => [
                              n(
                                a(
                                  l.value &&
                                    l.value.sub_finder_allows_you_to_find
                                ) + " ",
                                1
                              ),
                              De,
                              We,
                              t(
                                "strong",
                                Re,
                                a(l.value && l.value.simple_but_powerful),
                                1
                              ),
                            ]),
                            _: 1,
                          }
                        ),
                      ]),
                      _: 1,
                    }
                  ),
                  o(
                    h,
                    { class: "rounded-lg-imp" },
                    {
                      default: d(() => [
                        o(
                          s,
                          {
                            "expand-icon": "mdi-plus",
                            "collapse-icon": "mdi-minus",
                            class: "text-3xl-imp",
                          },
                          {
                            default: d(() => [
                              n(
                                a(
                                  l.value && l.value.what_are_red_flag_customers
                                ),
                                1
                              ),
                            ]),
                            _: 1,
                          }
                        ),
                        o(
                          x,
                          {
                            class:
                              "p-3 sm:p-6 flex-col text-lg font-semibold text-gray-900",
                          },
                          {
                            default: d(() => [
                              n(
                                a(
                                  l.value &&
                                    l.value.have_you_ever_had_a_customer
                                ),
                                1
                              ),
                              qe,
                              Ue,
                              n(
                                " " +
                                  a(l.value && l.value.they_are_out_there) +
                                  " ",
                                1
                              ),
                              He,
                              Le,
                              n(
                                " " +
                                  a(
                                    l.value &&
                                      l.value.would_you_like_to_know_experiences
                                  ) +
                                  " ",
                                1
                              ),
                              Ge,
                              Me,
                              n(
                                a(
                                  l.value &&
                                    l.value
                                      .as_a_contractor_you_are_always_under_review
                                ),
                                1
                              ),
                            ]),
                            _: 1,
                          }
                        ),
                      ]),
                      _: 1,
                    }
                  ),
                  o(
                    h,
                    { class: "rounded-lg-imp" },
                    {
                      default: d(() => [
                        o(
                          s,
                          {
                            "expand-icon": "mdi-plus",
                            "collapse-icon": "mdi-minus",
                            class: "text-3xl-imp",
                          },
                          {
                            default: d(() => [
                              n(
                                a(
                                  l.value &&
                                    l.value
                                      .more_business_more_profit_less_headaches
                                ),
                                1
                              ),
                            ]),
                            _: 1,
                          }
                        ),
                        o(
                          x,
                          {
                            class:
                              "p-3 sm:p-6 flex-col text-lg font-semibold text-gray-900",
                          },
                          {
                            default: d(() => [
                              n(
                                a(
                                  l.value &&
                                    l.value.sounds_great_how_do_i_do_this
                                ),
                                1
                              ),
                              Qe,
                              Ye,
                              t("div", null, [
                                n(a(l.value && l.value.with) + " ", 1),
                                Ke,
                                n(", " + a(l.value && l.value.its_easy), 1),
                              ]),
                              Xe,
                              n(
                                " " +
                                  a(l.value && l.value.heres_a_simple_example),
                                1
                              ),
                              Je,
                              Oe,
                              n(
                                " " +
                                  a(
                                    l.value &&
                                      l.value.most_contractors_would_refuse
                                  ),
                                1
                              ),
                              Ze,
                              t("div", null, [
                                n(a(l.value && l.value.with) + " ", 1),
                                et,
                                n(
                                  ", " +
                                    a(
                                      l.value &&
                                        l.value.you_can_now_have_the_tools
                                    ),
                                  1
                                ),
                              ]),
                              tt,
                              n(
                                " " +
                                  a(l.value && l.value.or_heres_another) +
                                  " ",
                                1
                              ),
                              lt,
                              at,
                              n(
                                " " +
                                  a(
                                    l.value &&
                                      l.value
                                        .youre_a_roofer_or_general_contractor
                                  ),
                                1
                              ),
                              ot,
                              st,
                              t("div", null, [
                                n(
                                  a(
                                    l.value &&
                                      l.value.use_tcontractors_sub_finder
                                  ) + " ",
                                  1
                                ),
                                nt,
                                n(
                                  ". " +
                                    a(
                                      l.value &&
                                        l.value.someone_you_can_reasonably_trust
                                    ),
                                  1
                                ),
                              ]),
                            ]),
                            _: 1,
                          }
                        ),
                      ]),
                      _: 1,
                    }
                  ),
                  o(
                    h,
                    { class: "rounded-lg-imp" },
                    {
                      default: d(() => [
                        o(
                          s,
                          {
                            "expand-icon": "mdi-plus",
                            "collapse-icon": "mdi-minus",
                            class: "text-3xl-imp",
                          },
                          {
                            default: d(() => [
                              n(a(l.value && l.value.what_are_trades), 1),
                            ]),
                            _: 1,
                          }
                        ),
                        o(
                          x,
                          {
                            class:
                              "p-3 sm:p-6 flex-col text-lg font-semibold text-gray-900",
                          },
                          {
                            default: d(() => [
                              n(
                                a(l.value && l.value.trades_are_what_you_do) +
                                  " ",
                                1
                              ),
                              it,
                              ut,
                              t("div", null, [
                                rt,
                                n(
                                  " " +
                                    a(
                                      l.value &&
                                        l.value.has_26_plus_trade_groups
                                    ) +
                                    " ",
                                  1
                                ),
                                ct,
                                n(
                                  " " +
                                    a(
                                      l.value &&
                                        l.value
                                          .allows_you_to_view_only_your_trade_group
                                    ),
                                  1
                                ),
                              ]),
                            ]),
                            _: 1,
                          }
                        ),
                      ]),
                      _: 1,
                    }
                  ),
                  o(
                    h,
                    { class: "rounded-lg-imp" },
                    {
                      default: d(() => [
                        o(
                          s,
                          {
                            "expand-icon": "mdi-plus",
                            "collapse-icon": "mdi-minus",
                            class: "text-3xl-imp",
                          },
                          {
                            default: d(() => [
                              n(a(l.value && l.value.what_are_regions), 1),
                            ]),
                            _: 1,
                          }
                        ),
                        o(
                          x,
                          {
                            class:
                              "p-3 sm:p-6 flex-col text-lg font-semibold text-gray-900",
                          },
                          {
                            default: d(() => [
                              n(
                                a(
                                  l.value &&
                                    l.value.regions_are_major_metropolitan_areas
                                ) + " ",
                                1
                              ),
                              _t,
                              dt,
                              t("div", null, [
                                vt,
                                n(
                                  " " +
                                    a(
                                      l.value &&
                                        l.value.lets_you_limit_your_searches
                                    ),
                                  1
                                ),
                              ]),
                            ]),
                            _: 1,
                          }
                        ),
                      ]),
                      _: 1,
                    }
                  ),
                ]),
                _: 1,
              }
            ),
          ])
        );
      };
    },
  },
  gt = _e(ft, [["__scopeId", "data-v-dcc6de6f"]]);
const j = (m) => (re("data-v-8f0f7b40"), (m = m()), ce(), m),
  pt = { class: "flex items-center justify-center flex-col" },
  xt = { class: "w-full sm:text-lg sm:font-semibold" },
  mt = { class: "flex items-center justify-center flex-col" },
  ht = { class: "text-2xl font-bold self-start mb-1" },
  bt = { class: "w-full sm:text-lg sm:semi-bold" },
  Tt = j(() => t("strong", null, "cConnect", -1)),
  yt = { class: "text-lg font-bold text-white uppercase transition" },
  wt = j(() =>
    t(
      "span",
      {
        class:
          "ml-4 flex-shrink-0 rounded-full border border-current bg-white p-2 text-indigo-600",
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
    )
  ),
  kt = {
    key: 0,
    class:
      "h-[30vh] mx-auto w-1/2 flex flex-col items-center justify-center space-y-4",
  },
  Nt = { class: "text-center text-xl" },
  Ct = { key: 1, id: "pricing", class: "" },
  $t = { key: 0, class: "flex justify-center", ref: "whatVersionAreYourRef" },
  St = { class: "text-3xl font-extrabold mb-4 text-center text-blue-rgba" },
  jt = { key: 1, class: "flex gap-2" },
  Vt = j(() => t("div", { class: "w-[55%]" }, null, -1)),
  Pt = { key: 0, class: "w-[15%] flex flex-col justify-between" },
  It = j(() =>
    t("img", { class: "mb-3 h-full object-contain", src: G }, null, -1)
  ),
  zt = { class: "flex flex-col items-center h-full" },
  Ft = { class: "flex text-green-rgba font-extrabold mt-1" },
  Et = { class: "flex flex-col justify-center items-center h-full" },
  Bt = { class: "flex text-blue-rgba font-extrabold mt-1" },
  At = { key: 0, class: "flex flex-col justify-between" },
  Dt = j(() =>
    t("img", { class: "mb-3 h-full object-contain", src: G }, null, -1)
  ),
  Wt = { class: "flex flex-col justify-start items-center h-full" },
  Rt = { class: I("text-black text-lg font-bold ") },
  qt = { class: "flex text-green-rgba font-extrabold mt-1" },
  Ut = j(() => t("div", { class: "text-lg self-center mt-[-30px]" }, "$", -1)),
  Ht = { class: "text-[50px] leading-[0.9]" },
  Lt = { class: "text-base font-semibold capitalize" },
  Gt = { class: "flex flex-col justify-center items-center h-full" },
  Mt = { class: "text-black text-lg font-bold" },
  Qt = { class: "flex text-blue-rgba font-extrabold mt-1" },
  Yt = j(() => t("div", { class: "text-lg self-center mt-[-30px]" }, "$", -1)),
  Kt = { class: "text-[50px] t leading-[0.9]" },
  Xt = { class: "text-base font-semibold capitalize" },
  Jt = { class: "features pb-4" },
  Ot = { class: "w-full mb-2" },
  Zt = { class: "text-2xl font-extrabold text-blue-rgba" },
  el = { class: "flex flex-col gap-2" },
  tl = { class: "w-full my-2" },
  ll = { class: "text-2xl font-extrabold text-blue-rgba" },
  al = { class: "flex flex-col gap-2" },
  ol = { class: "w-full my-2" },
  sl = { class: "text-2xl font-extrabold text-blue-rgba" },
  nl = { class: "flex flex-col gap-2" },
  il = { class: "w-full my-2" },
  ul = { class: "text-2xl font-extrabold text-blue-rgba" },
  rl = { class: "flex flex-col gap-2" },
  cl = { class: "w-full my-2" },
  _l = { class: "text-2xl font-extrabold text-blue-rgba" },
  dl = { class: "flex flex-col gap-2" },
  vl = { class: "w-full my-2" },
  fl = { class: "text-2xl font-extrabold text-blue-rgba" },
  gl = { class: "flex flex-col gap-2" },
  pl = { class: "w-full my-2" },
  xl = { class: "text-2xl font-extrabold text-blue-rgba" },
  ml = { class: "flex flex-col gap-2" },
  hl = { key: 0, class: "flex flex-col justify-between" },
  bl = j(() =>
    t("img", { class: "mb-3 h-full object-contain", src: G }, null, -1)
  ),
  Tl = { class: "flex flex-col justify-start items-center h-full" },
  yl = { class: I("text-black text-lg font-bold ") },
  wl = { class: "flex text-green-rgba font-extrabold mt-1" },
  kl = j(() => t("div", { class: "text-lg self-center mt-[-30px]" }, "$", -1)),
  Nl = { class: "text-[50px] leading-[0.9]" },
  Cl = { class: "text-base font-semibold capitalize" },
  $l = { class: "flex flex-col justify-center items-center h-full" },
  Sl = { class: "text-black text-lg font-bold" },
  jl = { class: "flex text-blue-rgba font-extrabold mt-1" },
  Vl = j(() => t("div", { class: "text-lg self-center mt-[-30px]" }, "$", -1)),
  Pl = { class: "text-[50px] t leading-[0.9]" },
  Il = { class: "text-base font-semibold capitalize" },
  zl = {
    __name: "PricingVersions",
    props: {
      showRightVersionText: { type: Boolean, default: !0 },
      pageName: { type: String, default: "pricing" },
      currentStep: { type: Number, default: 1 },
      showGoldSelect: { type: Boolean, default: !0 },
    },
    emits: ["platinumSelected"],
    setup(m, { emit: c }) {
      const l = m,
        r = S({}),
        _ = S({}),
        s = S({}),
        x = S(!1),
        h = S(!1),
        z = M(),
        V = S({}),
        Q = S(),
        Y = S(),
        g = $(() => z.getters.userVersion),
        P = $(() => z.getters.screenWidth),
        e = $(() => z.getters.translations),
        w = $(
          () => l.pageName !== "pricing" && P.value > 768 && P.value < 1200
        ),
        K = $(() => g.value !== 0 && g.value !== 1);
      ne(() => {
        z.dispatch("fetchUserVersion"), ve(), de();
      });
      const de = async () => {
          x.value = !0;
          try {
            const p = await axios.get("api/all-versions");
            p.data &&
              (console.log(p.data),
              p.data.forEach((b) => {
                b.id === 1
                  ? (r.value = b)
                  : b.id === 2
                  ? (_.value = b)
                  : b.id === 3 && (s.value = b);
              })),
              Z();
          } catch {
            somethingWentWrong();
          } finally {
            x.value = !1;
          }
        },
        R = S(!1),
        X = S(null),
        q = S(null),
        B = () => {
          console.log("in scroll mode");
          const p = X.value,
            b = q.value;
          if (
            (console.log(
              p.getBoundingClientRect().top,
              b.getBoundingClientRect().top,
              "top"
            ),
            p && b)
          ) {
            const A = p.getBoundingClientRect().top,
              D = b.getBoundingClientRect().top;
            A <= 0 && D >= 400
              ? (R.value = !0)
              : (D < 400 || A > 0) && (R.value = !1);
          }
        };
      ne(() => {
        P.value < 768 &&
          (l.pageName !== "pricing"
            ? document
                .querySelector("#scrollable")
                .addEventListener("scroll", B)
            : window.addEventListener("scroll", B));
      }),
        ge(() => {
          P.value < 768 &&
            (l.pageName !== "pricing"
              ? document
                  .querySelector("#scrollable")
                  .removeEventListener("scroll", B)
              : window.removeEventListener("scroll", B));
        });
      const ve = async () => {
          x.value = !0;
          try {
            const p = await axios.get("/api/payment-info-of-a-region/1", ie());
            console.log(p, "response"),
              p.data && (V.value = { ...p.data.paymentInfo }),
              Z();
          } catch {
            somethingWentWrong();
          } finally {
            x.value = !1;
          }
        },
        F = (p) => {
          const b = parseFloat(p);
          return Math.floor(b) === b ? Math.floor(b).toString() : b.toString();
        },
        U = () => {
          l.pageName === "pricing"
            ? W.Inertia.visit("/signup")
            : l.pageName === "profile-setup" && Q.value.openDialog();
        },
        fe = async () => {
          h.value = !0;
          try {
            const p = await axios.post(
              "/api/profile/complete-profile-and-start-free-subscription",
              {},
              ie()
            );
            console.log(p, "response"), p.data && Y.value.openDialog();
          } catch {
            somethingWentWrong();
          } finally {
            h.value = !1;
          }
        },
        J = () => {
          l.pageName === "profile-setup"
            ? localStorage.setItem("prevUrlPricingPlan", "/profile-setup")
            : l.pageName === "pricing"
            ? localStorage.setItem("prevUrlPricingPlan", "/pricing")
            : l.pageName === "settings" &&
              localStorage.setItem("prevUrlPricingPlan", "/settings");
        },
        O = () => {
          l.pageName === "profile-setup" ||
          (l.pageName === "settings" && g.value === 1)
            ? (console.log("in pricing plan"), W.Inertia.visit("/pricing-plan"))
            : l.pageName === "settings" && g.value === 2
            ? c("platinumSelected", {})
            : l.pageName === "pricing" && g.value === 0
            ? W.Inertia.visit("/signup")
            : l.pageName === "pricing" &&
              g.value !== 0 &&
              (localStorage.setItem("activeTab", 2),
              W.Inertia.visit("/settings"));
        },
        H = () => {
          J(), localStorage.setItem("choosedVersion", "gold"), O();
        },
        L = () => {
          J(), localStorage.setItem("choosedVersion", "platinum"), O();
        },
        Z = () => {
          pe().url.value.includes("#faqs") &&
            q.value.scrollIntoView({ behavior: "auto", block: "start" });
        };
      return (p, b) => {
        var ee, te, le, ae, oe, se;
        const A = E("Link"),
          D = E("v-progress-linear");
        return (
          i(),
          v(
            xe,
            null,
            [
              o(
                ue,
                {
                  onSubmit: fe,
                  loading: h.value,
                  disabled: h.value,
                  submitText: e.value && e.value.confirm,
                  dialogWidth: "width-40",
                  ref_key: "freeConfirmDialog",
                  ref: Q,
                  title: "Are you sure you want to choose the Free Package?",
                },
                {
                  default: d(() => [
                    t("div", pt, [
                      t("div", xt, [
                        t(
                          "div",
                          null,
                          a(e.value && e.value.with_this_option_you_get),
                          1
                        ),
                        t("ul", null, [
                          t(
                            "li",
                            null,
                            a(e.value && e.value.access_to_news_feed),
                            1
                          ),
                          t(
                            "li",
                            null,
                            a(e.value && e.value.post_up_to_8_times_per_month),
                            1
                          ),
                          t(
                            "li",
                            null,
                            a(e.value && e.value.conduct_5_searches_per_month),
                            1
                          ),
                          t(
                            "li",
                            null,
                            a(e.value && e.value.join_3_trade_groups),
                            1
                          ),
                          t(
                            "li",
                            null,
                            a(
                              e.value &&
                                e.value.ability_to_view_all_trade_group_postings
                            ),
                            1
                          ),
                        ]),
                        t(
                          "div",
                          null,
                          a(e.value && e.value.this_package_is_great_to_start),
                          1
                        ),
                        t("div", null, [
                          n(a(e.value && e.value.click) + " ", 1),
                          t(
                            "strong",
                            null,
                            '"' + a(e.value && e.value.confirm) + '"',
                            1
                          ),
                          n(" " + a(e.value && e.value.to_proceed_or) + " ", 1),
                          t(
                            "strong",
                            null,
                            '"' + a(e.value && e.value.cancel) + '"',
                            1
                          ),
                          n(
                            " " + a(e.value && e.value.to_review_other_options),
                            1
                          ),
                        ]),
                      ]),
                    ]),
                  ]),
                  _: 1,
                },
                8,
                ["loading", "disabled", "submitText"]
              ),
              o(
                ue,
                {
                  dontAllowCancel: !0,
                  submitText: e.value && e.value.okay,
                  showFooter: !1,
                  dialogWidth: "width-40",
                  ref_key: "freeActivatedDialog",
                  ref: Y,
                  title: e.value && e.value.free_version_has_started,
                },
                {
                  default: d(() => [
                    t("div", mt, [
                      t(
                        "div",
                        ht,
                        a(e.value && e.value.welcome_to_tcontractor),
                        1
                      ),
                      t("div", bt, [
                        t("div", null, [
                          n(a(e.value && e.value.you_now_have_access), 1),
                          Tt,
                          n(" " + a(e.value && e.value.is_your_source_to), 1),
                        ]),
                        t("ul", null, [
                          t(
                            "li",
                            null,
                            a(
                              e.value &&
                                e.value.keep_up_to_date_on_whats_going_on
                            ),
                            1
                          ),
                          t(
                            "li",
                            null,
                            a(
                              e.value &&
                                e.value.find_out_what_jobs_are_available
                            ),
                            1
                          ),
                          t("li", null, [
                            n(a(e.value && e.value.you_can_always) + " ", 1),
                            t(
                              "strong",
                              null,
                              a(
                                e.value &&
                                  e.value.upgrade_to_gold_or_platinum_version
                              ),
                              1
                            ),
                            n(
                              " " + a(e.value && e.value.by_going_to_settings),
                              1
                            ),
                          ]),
                          t(
                            "li",
                            null,
                            a(
                              e.value &&
                                e.value.press_continue_to_enter_the_news_feed
                            ),
                            1
                          ),
                        ]),
                      ]),
                      o(
                        A,
                        {
                          class:
                            "group flex items-center self-start justify-between rounded-xl border border-teal-500 bg-[#16a34a] px-5 py-3 mt-4 hover:bg-[#16a34a] focus:outline-none focus:ring transition transform duration-300 hover:shadow-lg active:scale-95",
                          href: "/post",
                        },
                        {
                          default: d(() => [
                            t("span", yt, a(e.value && e.value.continue), 1),
                            wt,
                          ]),
                          _: 1,
                        }
                      ),
                    ]),
                  ]),
                  _: 1,
                },
                8,
                ["submitText", "title"]
              ),
              t(
                "div",
                {
                  class: I(
                    ` xl:container bg-white md:mx-auto ${
                      l.pageName !== "pricing"
                        ? " mt-4"
                        : "mt-4 px-2 sm:p-6 py-4"
                    }   shadow-md rounded-lg`
                  ),
                },
                [
                  x.value
                    ? (i(),
                      v("div", kt, [
                        t("div", Nt, a(e.value && e.value.loading), 1),
                        o(D, {
                          color: "#241e6d",
                          indeterminate: "",
                          rounded: "",
                          height: "6",
                        }),
                      ]))
                    : y("", !0),
                  x.value
                    ? y("", !0)
                    : (i(),
                      v("section", Ct, [
                        l.showRightVersionText
                          ? (i(),
                            v(
                              "div",
                              $t,
                              [
                                t(
                                  "span",
                                  St,
                                  a(
                                    e.value &&
                                      e.value.what_version_is_right_for_you
                                  ),
                                  1
                                ),
                              ],
                              512
                            ))
                          : y("", !0),
                        P.value > 768
                          ? (i(),
                            v("div", jt, [
                              Vt,
                              g.value === 1 || g.value === 0
                                ? (i(),
                                  v("div", Pt, [
                                    It,
                                    g.value === 0
                                      ? (i(),
                                        v(
                                          "button",
                                          {
                                            key: 0,
                                            class:
                                              "mt-[2px] checkout-button inline-block bg-blue-500 w-full text-white py-2 px-4 rounded-lg hover:bg-blue-600 bg-[#4169E1] transition transform duration-300 hover:shadow-lg active:scale-95",
                                            onClick: U,
                                          },
                                          a(e.value && e.value.select),
                                          1
                                        ))
                                      : y("", !0),
                                  ]))
                                : y("", !0),
                              t(
                                "div",
                                {
                                  style: T({
                                    width: K.value ? "22.5%" : "15%",
                                  }),
                                },
                                [
                                  t("div", zt, [
                                    t(
                                      "div",
                                      {
                                        style: T({
                                          fontSize: w.value ? "1rem" : "",
                                          lineHeight: w.value ? "1.05" : "",
                                        }),
                                        class: "text-black text-xl font-bold",
                                      },
                                      a(e.value && e.value.gold_package),
                                      5
                                    ),
                                    t("div", Ft, [
                                      t(
                                        "div",
                                        {
                                          style: T({
                                            fontSize: w.value ? "1.2rem" : "",
                                            lineHeight: w.value ? "1.05" : "",
                                          }),
                                          class:
                                            "text-2xl self-center mt-[-30px]",
                                        },
                                        " $ ",
                                        4
                                      ),
                                      t(
                                        "div",
                                        {
                                          style: T({
                                            fontSize: w.value ? "50px" : "",
                                          }),
                                          class: "text-[70px] leading-[0.9]",
                                        },
                                        a(F(V.value.gold_advertised_price)),
                                        5
                                      ),
                                    ]),
                                    t(
                                      "div",
                                      {
                                        style: T({
                                          fontSize: w.value ? "0.9rem" : "",
                                          lineHeight: w.value ? "1.05" : "",
                                        }),
                                        class:
                                          "text-lg font-semibold capitalize",
                                      },
                                      a(e.value && e.value.per_month),
                                      5
                                    ),
                                    m.showGoldSelect &&
                                    g.value !== 2 &&
                                    g.value !== 3
                                      ? (i(),
                                        v(
                                          "button",
                                          {
                                            key: 0,
                                            onClick: H,
                                            class:
                                              "checkout-button inline-block bg-blue-500 w-full text-white py-2 px-4 rounded-lg hover:bg-blue-600 bg-[#4169E1] transition transform duration-300 hover:shadow-lg active:scale-95 mt-auto",
                                          },
                                          a(e.value && e.value.select),
                                          1
                                        ))
                                      : y("", !0),
                                  ]),
                                ],
                                4
                              ),
                              t(
                                "div",
                                {
                                  style: T({
                                    width: K.value ? "22.5%" : "15%",
                                  }),
                                },
                                [
                                  t("div", Et, [
                                    t(
                                      "div",
                                      {
                                        style: T({
                                          fontSize: w.value ? "1rem" : "",
                                          lineHeight: w.value ? "1.05" : "",
                                        }),
                                        class: "text-black text-xl font-bold",
                                      },
                                      a(e.value && e.value.platinum_package),
                                      5
                                    ),
                                    t("div", Bt, [
                                      t(
                                        "div",
                                        {
                                          style: T({
                                            fontSize: w.value ? "1.2rem" : "",
                                            lineHeight: w.value ? "1.05" : "",
                                          }),
                                          class:
                                            "text-2xl self-center mt-[-30px]",
                                        },
                                        " $ ",
                                        4
                                      ),
                                      t(
                                        "div",
                                        {
                                          style: T({
                                            fontSize: w.value ? "50px" : "",
                                          }),
                                          class: "text-[70px] t leading-[0.9]",
                                        },
                                        a(F(V.value.platinum_advertised_price)),
                                        5
                                      ),
                                    ]),
                                    t(
                                      "div",
                                      {
                                        style: T({
                                          fontSize: w.value ? "0.9rem" : "",
                                          lineHeight: w.value ? "1.05" : "",
                                        }),
                                        class:
                                          "text-lg font-semibold capitalize",
                                      },
                                      a(e.value && e.value.per_month),
                                      5
                                    ),
                                    t(
                                      "button",
                                      {
                                        onClick: L,
                                        class:
                                          "checkout-button inline-block bg-blue-500 w-full text-white py-2 px-4 rounded-lg hover:bg-blue-600 bg-[#4169E1] transition transform duration-300 hover:shadow-lg active:scale-95 mt-auto",
                                      },
                                      a(e.value && e.value.select),
                                      1
                                    ),
                                  ]),
                                ],
                                4
                              ),
                            ]))
                          : (i(),
                            v(
                              "div",
                              {
                                key: 2,
                                class: I([
                                  "grid gap-x-1 versions-head",
                                  g.value !== 1 ? "grid-cols-2" : "grid-cols-3",
                                ]),
                                ref_key: "headerRef",
                                ref: X,
                              },
                              [
                                g.value === 1 || g.value === 0
                                  ? (i(),
                                    v("div", At, [
                                      Dt,
                                      g.value === 0
                                        ? (i(),
                                          v(
                                            "button",
                                            {
                                              key: 0,
                                              onClick: U,
                                              class:
                                                "mt-[2px] checkout-button inline-block bg-blue-500 w-full text-white py-2 px-4 rounded-lg hover:bg-blue-600 bg-[#4169E1] transition transform duration-300 hover:shadow-lg active:scale-95",
                                            },
                                            a(e.value && e.value.select),
                                            1
                                          ))
                                        : y("", !0),
                                    ]))
                                  : y("", !0),
                                t("div", null, [
                                  t("div", Wt, [
                                    t("div", Rt, a(e.value && e.value.gold), 1),
                                    t("div", qt, [
                                      Ut,
                                      t(
                                        "div",
                                        Ht,
                                        a(F(V.value.gold_advertised_price)),
                                        1
                                      ),
                                    ]),
                                    t(
                                      "div",
                                      Lt,
                                      a(e.value && e.value.per_month),
                                      1
                                    ),
                                    m.showGoldSelect &&
                                    g.value !== 2 &&
                                    g.value !== 3
                                      ? (i(),
                                        v(
                                          "button",
                                          {
                                            key: 0,
                                            onClick: H,
                                            class:
                                              "checkout-button inline-block bg-blue-500 w-full text-white py-2 px-4 rounded-lg hover:bg-blue-600 bg-[#4169E1] transition transform duration-300 hover:shadow-lg active:scale-95 mt-auto",
                                          },
                                          a(e.value && e.value.select),
                                          1
                                        ))
                                      : y("", !0),
                                  ]),
                                ]),
                                t("div", null, [
                                  t("div", Gt, [
                                    t(
                                      "div",
                                      Mt,
                                      a(e.value && e.value.platinum),
                                      1
                                    ),
                                    t("div", Qt, [
                                      Yt,
                                      t(
                                        "div",
                                        Kt,
                                        a(F(V.value.platinum_advertised_price)),
                                        1
                                      ),
                                    ]),
                                    t(
                                      "div",
                                      Xt,
                                      a(e.value && e.value.per_month),
                                      1
                                    ),
                                    t(
                                      "button",
                                      {
                                        onClick: L,
                                        class:
                                          "checkout-button inline-block bg-blue-500 w-full text-white py-2 px-4 rounded-lg hover:bg-blue-600 bg-[#4169E1] transition transform duration-300 hover:shadow-lg active:scale-95 mt-auto",
                                      },
                                      a(e.value && e.value.select),
                                      1
                                    ),
                                  ]),
                                ]),
                              ],
                              2
                            )),
                        t("div", Jt, [
                          t("div", Ot, [
                            t(
                              "span",
                              Zt,
                              a(e.value && e.value.news_feed) + ": ",
                              1
                            ),
                          ]),
                          t("div", el, [
                            o(
                              f,
                              {
                                pageName: l.pageName,
                                bgColor: "#f4f8ff",
                                featureText:
                                  e.value &&
                                  e.value
                                    .view_all_postings_and_shared_information,
                                freeText: 1,
                                goldText: 1,
                                platinumText: 1,
                              },
                              null,
                              8,
                              ["pageName", "featureText"]
                            ),
                            o(
                              f,
                              {
                                pageName: l.pageName,
                                bgColor: "#f4f8ff",
                                featureText:
                                  e.value &&
                                  e.value
                                    .view_all_postings_by_trade_or_location,
                                freeText: 1,
                                goldText: 1,
                                platinumText: 1,
                              },
                              null,
                              8,
                              ["pageName", "featureText"]
                            ),
                          ]),
                          t("div", tl, [
                            t(
                              "span",
                              ll,
                              a(e.value && e.value.news_feed_postings),
                              1
                            ),
                          ]),
                          t("div", al, [
                            o(
                              f,
                              {
                                pageName: l.pageName,
                                bgColor: "#f4f8ff",
                                featureText:
                                  e.value && e.value.postings_per_month,
                                freeText: r.value.nf_ppm,
                                goldText: _.value.nf_ppm,
                                platinumText: s.value.nf_ppm,
                              },
                              null,
                              8,
                              [
                                "pageName",
                                "featureText",
                                "freeText",
                                "goldText",
                                "platinumText",
                              ]
                            ),
                            o(
                              f,
                              {
                                pageName: l.pageName,
                                bgColor: "#f4f8ff",
                                featureText:
                                  e.value && e.value.images_inside_posting,
                                freeText: r.value.nf_ipp,
                                goldText: _.value.nf_ipp,
                                platinumText: s.value.nf_ipp,
                              },
                              null,
                              8,
                              [
                                "pageName",
                                "featureText",
                                "freeText",
                                "goldText",
                                "platinumText",
                              ]
                            ),
                            o(
                              f,
                              {
                                pageName: l.pageName,
                                bgColor: "#f4f8ff",
                                featureText:
                                  e.value &&
                                  e.value
                                    .improve_post_visibility_by_adding_title,
                                freeText: r.value.nf_title,
                                goldText: _.value.nf_title,
                                platinumText: s.value.nf_title,
                              },
                              null,
                              8,
                              [
                                "pageName",
                                "featureText",
                                "freeText",
                                "goldText",
                                "platinumText",
                              ]
                            ),
                            o(
                              f,
                              {
                                pageName: l.pageName,
                                bgColor: "#f4f8ff",
                                featureText:
                                  e.value &&
                                  e.value
                                    .improve_post_visibility_by_adding_closing_text,
                                freeText: r.value.nf_bottom,
                                goldText: _.value.nf_bottom,
                                platinumText: s.value.nf_bottom,
                              },
                              null,
                              8,
                              [
                                "pageName",
                                "featureText",
                                "freeText",
                                "goldText",
                                "platinumText",
                              ]
                            ),
                            o(
                              f,
                              {
                                pageName: l.pageName,
                                bgColor: "#f4f8ff",
                                featureText:
                                  e.value && e.value.make_comments_on_postings,
                                freeText: r.value.nf_comments,
                                goldText: _.value.nf_comments,
                                platinumText: s.value.nf_comments,
                              },
                              null,
                              8,
                              [
                                "pageName",
                                "featureText",
                                "freeText",
                                "goldText",
                                "platinumText",
                              ]
                            ),
                            o(
                              f,
                              {
                                pageName: l.pageName,
                                bgColor: "#f4f8ff",
                                featureText: e.value && e.value.repost_posting,
                                freeText: r.value.nf_repost,
                                goldText: _.value.nf_repost,
                                platinumText: s.value.nf_repost,
                              },
                              null,
                              8,
                              [
                                "pageName",
                                "featureText",
                                "freeText",
                                "goldText",
                                "platinumText",
                              ]
                            ),
                          ]),
                          t("div", ol, [
                            t(
                              "span",
                              sl,
                              a(e.value && e.value.sub_finder) + ": ",
                              1
                            ),
                          ]),
                          t("div", nl, [
                            o(
                              f,
                              {
                                pageName: l.pageName,
                                bgColor: "#f4f8ff",
                                featureText:
                                  e.value &&
                                  e.value
                                    .searches_for_contractors_and_subcontractors,
                                freeText: 1,
                                goldText: 1,
                                platinumText: 1,
                              },
                              null,
                              8,
                              ["pageName", "featureText"]
                            ),
                            o(
                              f,
                              {
                                pageName: l.pageName,
                                bgColor: "#f4f8ff",
                                featureText:
                                  e.value &&
                                  e.value.no_of_contractor_searches_per_month,
                                freeText: r.value.sf_search,
                                goldText: _.value.sf_search,
                                platinumText: s.value.sf_search,
                              },
                              null,
                              8,
                              [
                                "pageName",
                                "featureText",
                                "freeText",
                                "goldText",
                                "platinumText",
                              ]
                            ),
                            o(
                              f,
                              {
                                pageName: l.pageName,
                                bgColor: "#f4f8ff",
                                featureText:
                                  e.value &&
                                  e.value.track_contractors_and_subcontractors,
                                freeText: r.value.sf_tracking,
                                goldText: _.value.sf_tracking,
                                platinumText: s.value.sf_tracking,
                              },
                              null,
                              8,
                              [
                                "pageName",
                                "featureText",
                                "freeText",
                                "goldText",
                                "platinumText",
                              ]
                            ),
                            o(
                              f,
                              {
                                pageName: l.pageName,
                                bgColor: "#f4f8ff",
                                featureText:
                                  e.value &&
                                  e.value.create_personal_notes_on_contractors,
                                freeText: r.value.sf_notes,
                                goldText: _.value.sf_notes,
                                platinumText: s.value.sf_notes,
                              },
                              null,
                              8,
                              [
                                "pageName",
                                "featureText",
                                "freeText",
                                "goldText",
                                "platinumText",
                              ]
                            ),
                            o(
                              f,
                              {
                                pageName: l.pageName,
                                bgColor: "#f4f8ff",
                                featureText:
                                  e.value &&
                                  e.value.access_to_contractor_info_pages,
                                freeText: r.value.sf_info,
                                goldText: _.value.sf_info,
                                platinumText: s.value.sf_info,
                              },
                              null,
                              8,
                              [
                                "pageName",
                                "featureText",
                                "freeText",
                                "goldText",
                                "platinumText",
                              ]
                            ),
                          ]),
                          t("div", il, [
                            t(
                              "span",
                              ul,
                              a(e.value && e.value.trade_groups) + ": ",
                              1
                            ),
                          ]),
                          t("div", rl, [
                            o(
                              f,
                              {
                                pageName: l.pageName,
                                bgColor: "#f4f8ff",
                                featureText:
                                  e.value && e.value.membership_in_trade_groups,
                                freeText: r.value.tg_members,
                                goldText: _.value.tg_members,
                                platinumText: s.value.tg_members,
                              },
                              null,
                              8,
                              [
                                "pageName",
                                "featureText",
                                "freeText",
                                "goldText",
                                "platinumText",
                              ]
                            ),
                            o(
                              f,
                              {
                                pageName: l.pageName,
                                bgColor: "#f4f8ff",
                                featureText:
                                  e.value &&
                                  e.value.post_in_member_trade_groups,
                                freeText: r.value.tg_post,
                                goldText: _.value.tg_post,
                                platinumText: s.value.tg_post,
                              },
                              null,
                              8,
                              [
                                "pageName",
                                "featureText",
                                "freeText",
                                "goldText",
                                "platinumText",
                              ]
                            ),
                            o(
                              f,
                              {
                                pageName: l.pageName,
                                bgColor: "#f4f8ff",
                                featureText:
                                  e.value &&
                                  e.value.view_all_trade_group_postings,
                                freeText: r.value.tg_view_all,
                                goldText: _.value.tg_view_all,
                                platinumText: s.value.tg_view_all,
                              },
                              null,
                              8,
                              [
                                "pageName",
                                "featureText",
                                "freeText",
                                "goldText",
                                "platinumText",
                              ]
                            ),
                          ]),
                          t("div", cl, [
                            t(
                              "span",
                              _l,
                              a(e.value && e.value.view_red_flags) + ": ",
                              1
                            ),
                          ]),
                          t("div", dl, [
                            o(
                              f,
                              {
                                pageName: l.pageName,
                                bgColor: "#f4f8ff",
                                featureText:
                                  e.value && e.value.search_red_flags,
                                freeText: r.value.rf_access,
                                goldText: _.value.rf_access,
                                platinumText: s.value.rf_access,
                              },
                              null,
                              8,
                              [
                                "pageName",
                                "featureText",
                                "freeText",
                                "goldText",
                                "platinumText",
                              ]
                            ),
                            o(
                              f,
                              {
                                pageName: l.pageName,
                                bgColor: "#f4f8ff",
                                featureText:
                                  e.value && e.value.flagged_customers,
                                freeText: r.value.rf_customers,
                                goldText: _.value.rf_customers,
                                platinumText: s.value.rf_customers,
                              },
                              null,
                              8,
                              [
                                "pageName",
                                "featureText",
                                "freeText",
                                "goldText",
                                "platinumText",
                              ]
                            ),
                            o(
                              f,
                              {
                                pageName: l.pageName,
                                bgColor: "#f4f8ff",
                                featureText:
                                  e.value && e.value.flagged_sales_reps,
                                freeText: r.value.rf_sales,
                                goldText: _.value.rf_sales,
                                platinumText: s.value.rf_sales,
                              },
                              null,
                              8,
                              [
                                "pageName",
                                "featureText",
                                "freeText",
                                "goldText",
                                "platinumText",
                              ]
                            ),
                            o(
                              f,
                              {
                                pageName: l.pageName,
                                bgColor: "#f4f8ff",
                                featureText:
                                  e.value && e.value.flagged_contractors,
                                freeText: r.value.rf_contractor,
                                goldText: _.value.rf_contractor,
                                platinumText: s.value.rf_contractor,
                              },
                              null,
                              8,
                              [
                                "pageName",
                                "featureText",
                                "freeText",
                                "goldText",
                                "platinumText",
                              ]
                            ),
                          ]),
                          t("div", vl, [
                            t(
                              "span",
                              fl,
                              a(e.value && e.value.real_contractor_reviews) +
                                ": ",
                              1
                            ),
                          ]),
                          t("div", gl, [
                            o(
                              f,
                              {
                                pageName: l.pageName,
                                bgColor: "#f4f8ff",
                                featureText: e.value && e.value.give_a_review,
                                freeText: r.value.re_reviews,
                                goldText: _.value.re_reviews,
                                platinumText: s.value.re_reviews,
                              },
                              null,
                              8,
                              [
                                "pageName",
                                "featureText",
                                "freeText",
                                "goldText",
                                "platinumText",
                              ]
                            ),
                            o(
                              f,
                              {
                                pageName: l.pageName,
                                bgColor: "#f4f8ff",
                                featureText:
                                  e.value && e.value.provide_feedback_on_review,
                                freeText: r.value.re_feedback,
                                goldText: _.value.re_feedback,
                                platinumText: s.value.re_feedback,
                              },
                              null,
                              8,
                              [
                                "pageName",
                                "featureText",
                                "freeText",
                                "goldText",
                                "platinumText",
                              ]
                            ),
                            o(
                              f,
                              {
                                pageName: l.pageName,
                                bgColor: "#f4f8ff",
                                featureText: e.value && e.value.appeal_review,
                                freeText: r.value.re_appeal,
                                goldText: _.value.re_appeal,
                                platinumText: s.value.re_appeal,
                              },
                              null,
                              8,
                              [
                                "pageName",
                                "featureText",
                                "freeText",
                                "goldText",
                                "platinumText",
                              ]
                            ),
                          ]),
                          t("div", pl, [
                            t(
                              "span",
                              xl,
                              a(e.value && e.value.contractor_page) + ": ",
                              1
                            ),
                          ]),
                          t("div", ml, [
                            o(
                              f,
                              {
                                pageName: l.pageName,
                                bgColor: "#f4f8ff",
                                featureText:
                                  e.value && e.value.no_of_free_page_templates,
                                freeText:
                                  (ee = r.value.cp_template) == null
                                    ? void 0
                                    : ee.toString(),
                                goldText:
                                  (te = _.value.cp_template) == null
                                    ? void 0
                                    : te.toString(),
                                platinumText:
                                  (le = s.value.cp_template) == null
                                    ? void 0
                                    : le.toString(),
                              },
                              null,
                              8,
                              [
                                "pageName",
                                "featureText",
                                "freeText",
                                "goldText",
                                "platinumText",
                              ]
                            ),
                            o(
                              f,
                              {
                                pageName: l.pageName,
                                bgColor: "#f4f8ff",
                                featureText:
                                  e.value && e.value.no_of_color_schemes,
                                freeText:
                                  (ae = r.value.cp_color) == null
                                    ? void 0
                                    : ae.toString(),
                                goldText:
                                  (oe = _.value.cp_color) == null
                                    ? void 0
                                    : oe.toString(),
                                platinumText:
                                  (se = s.value.cp_color) == null
                                    ? void 0
                                    : se.toString(),
                              },
                              null,
                              8,
                              [
                                "pageName",
                                "featureText",
                                "freeText",
                                "goldText",
                                "platinumText",
                              ]
                            ),
                            o(
                              f,
                              {
                                pageName: l.pageName,
                                bgColor: "#f4f8ff",
                                featureText:
                                  e.value &&
                                  e.value
                                    .share_your_contractor_page_with_others,
                                freeText: r.value.cp_share,
                                goldText: _.value.cp_share,
                                platinumText: s.value.cp_share,
                              },
                              null,
                              8,
                              [
                                "pageName",
                                "featureText",
                                "freeText",
                                "goldText",
                                "platinumText",
                              ]
                            ),
                          ]),
                        ]),
                      ])),
                ],
                2
              ),
              t(
                "div",
                { loadingclass: "faqs", ref_key: "faqsRef", ref: q },
                [o(gt)],
                512
              ),
              R.value && P.value < 768
                ? (i(),
                  v(
                    "div",
                    {
                      key: 0,
                      style: T({
                        top:
                          l.pageName !== "pricing" && P.value >= 640
                            ? "64px"
                            : l.pageName !== "pricing" && P.value < 640
                            ? "56px"
                            : "0",
                      }),
                      class: I([
                        "grid gap-x-1 versions-head sticky",
                        g.value !== 1 ? "grid-cols-2" : "grid-cols-3",
                      ]),
                    },
                    [
                      g.value === 1 || g.value === 0
                        ? (i(),
                          v("div", hl, [
                            bl,
                            g.value === 0
                              ? (i(),
                                v(
                                  "button",
                                  {
                                    key: 0,
                                    onClick: U,
                                    class:
                                      "mt-[2px] checkout-button inline-block bg-blue-500 w-full text-white py-2 px-4 rounded-lg hover:bg-blue-600 bg-[#4169E1] transition transform duration-300 hover:shadow-lg active:scale-95",
                                  },
                                  a(e.value && e.value.select),
                                  1
                                ))
                              : y("", !0),
                          ]))
                        : y("", !0),
                      t("div", null, [
                        t("div", Tl, [
                          t("div", yl, a(e.value && e.value.gold), 1),
                          t("div", wl, [
                            kl,
                            t(
                              "div",
                              Nl,
                              a(F(V.value.gold_advertised_price)),
                              1
                            ),
                          ]),
                          t("div", Cl, a(e.value && e.value.per_month), 1),
                          m.showGoldSelect && g.value !== 2 && g.value !== 3
                            ? (i(),
                              v(
                                "button",
                                {
                                  key: 0,
                                  onClick: H,
                                  class:
                                    "checkout-button inline-block bg-blue-500 w-full text-white py-2 px-4 rounded-lg hover:bg-blue-600 bg-[#4169E1] transition transform duration-300 hover:shadow-lg active:scale-95 mt-auto",
                                },
                                a(e.value && e.value.select),
                                1
                              ))
                            : y("", !0),
                        ]),
                      ]),
                      t("div", null, [
                        t("div", $l, [
                          t("div", Sl, a(e.value && e.value.platinum), 1),
                          t("div", jl, [
                            Vl,
                            t(
                              "div",
                              Pl,
                              a(F(V.value.platinum_advertised_price)),
                              1
                            ),
                          ]),
                          t("div", Il, a(e.value && e.value.per_month), 1),
                          t(
                            "button",
                            {
                              onClick: L,
                              class:
                                "checkout-button inline-block bg-blue-500 w-full text-white py-2 px-4 rounded-lg hover:bg-blue-600 bg-[#4169E1] transition transform duration-300 hover:shadow-lg active:scale-95 mt-auto",
                            },
                            a(e.value && e.value.select),
                            1
                          ),
                        ]),
                      ]),
                    ],
                    6
                  ))
                : y("", !0),
            ],
            64
          )
        );
      };
    },
  },
  Wl = _e(zl, [["__scopeId", "data-v-8f0f7b40"]]);
export { Wl as P };
