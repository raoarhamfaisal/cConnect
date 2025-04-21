import {
  u as le,
  D as ie,
  r as i,
  o as re,
  S as ne,
  N as de,
  c as O,
  w as J,
  Z as ce,
  X as ue,
  B as ve,
  I as pe,
  e as x,
  h as l,
  i as ge,
  K as _,
  s as p,
  l as u,
  F as Q,
  d as r,
  H as fe,
  f as s,
  n as Y,
  v as V,
  z as ee,
  g as R,
  j as me,
  U as _e,
  V as he,
} from "./app.907bb242.js";
import { H as ye } from "./Header.8b20dfa0.js";
import { B as S } from "./Button.f68cd005.js";
import { _ as xe, A as we } from "./ContractorInfo.6f4506f5.js";
import be from "./HistoryReviewResponse.cb69e51e.js";
import { _ as I } from "./HeadingCard.ac3646cb.js";
import { C as A } from "./Card.0c51827f.js";
import { L as F } from "./Loader.9dfd413c.js";
import { P as ke } from "./PageTitle.f25bd43b.js";
import { _ as Ce } from "./_plugin-vue_export-helper.cdc0426e.js";
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
/* empty css                                                               */ import "./StarRating.345caaaf.js";
import "./ReviewAdmin.d009177d.js";
import "./EditRatingModal.2e8212da.js";
import "./StarRatingEditable.6da32187.js";
import "./Appeal.1c9232a0.js";
/* empty css                                                             */ import "./DecisionNotes.5034a79b.js";
import "./ButtonRatings.029b3347.js";
import "./QualifyingQuestionsAdmin.20d9d8ea.js";
import "./Tooltip.df5bf8e9.js";
import "./ResponseAdmin.1e10ea9a.js";
/* empty css                                                                  */ const te =
    (v) => (_e("data-v-28e2ca41"), (v = v()), he(), v),
  Re = { class: "bg-gray-200 mt-10 flex flex-col gap-6" },
  Se = { key: 0, class: "bg-gray-200" },
  Ie = { class: "border-gray-300" },
  Be = { class: "mb-6" },
  $e = { class: "flex gap-3" },
  He = ["disabled"],
  Le = te(() =>
    s("div", { class: "flex items-center justify-center" }, "Reviews", -1)
  ),
  Oe = { src: "/images/avatars/Spinner.gif", alt: "spinner", width: "20" },
  Pe = ["disabled"],
  je = te(() =>
    s("div", { class: "flex items-center justify-center" }, "Responses", -1)
  ),
  Ne = { src: "/images/avatars/Spinner.gif", alt: "spinner", width: "20" },
  Te = { key: 0 },
  Ue = { class: "border-gray-300" },
  Ae = { class: "flex gap-3 flex-wrap" },
  Fe = { class: "flex flex-col gap-4" },
  De = { class: "border-gray-300" },
  Me = { class: "flex gap-8 flex-col" },
  ze = { key: 1, class: "text-center font-bold mt-4" },
  We = { class: "mb-6 border-gray-300" },
  Ee = {
    key: 0,
    class:
      "p-2 text-xl text-grey-600 font-bold h-60 flex items-center justify-center",
  },
  Ke = {
    __name: "ContractorHistory",
    props: {
      profile: Object,
      contractorDetails: Object,
      showit: Boolean,
      postSearchFilters: { type: Object, default: () => ({ postSearch: "" }) },
    },
    setup(v) {
      const { contractorDetails: D } = v,
        B = le(),
        M = ie().props.value.auth.user.appeals_privileges === 1,
        m = i(1),
        z = i(null),
        o = i([]),
        n = i(!1),
        $ = i(!1),
        P = i([]),
        j = i(null),
        H = i({}),
        h = i("reviews"),
        d = i("latest"),
        w = i(0),
        L = i(15),
        b = i(!1);
      re(async () => {
        (z.value = D.id), (H.value = D), await T(!1);
      }),
        ne(() => {
          !M &&
            window.location.pathname !== "/post" &&
            de.Inertia.visit("/post");
        });
      const ae = O(() => B.state.ratings.updatedReview),
        N = O(() => B.getters.screenWidth),
        se = O(() => B.state.ratings.updatedResponse),
        W = O(() => B.getters.translations);
      J(se, (t) => {
        if (t && t.id) {
          const e = o.value.find((c) => c.id === t.review_id);
          if (e) {
            e.review_response = t;
            const c = o.value.findIndex((g) => g.id === t.review_id);
            c !== -1 && (o.value = o.value.map((g, a) => (a === c ? e : g)));
          }
        }
      }),
        J(ae, async (t) => {
          if (t && t.id) {
            const e = o.value.findIndex((c) => c.id === t.id);
            e !== -1 && Object.assign(o.value[e], t),
              (n.value = !0),
              await U(L.value, m.value, !1, !0),
              (n.value = !1);
          }
        });
      const k = async (t, e) => {
          t && (d.value = e), (o.value = []), await T(!1);
        },
        E = async (t) => {
          (h.value = t), (o.value = []), await T(!1);
        },
        oe = async () => {
          b.value = !0;
          let t = m.value + 1;
          await U(L.value, t), (b.value = !1), (m.value = t);
        },
        T = async (t = !0) => {
          (n.value = !0), await U(L.value, 1, t), (n.value = !1);
        },
        U = async (t = L.value, e = 1, c = !0, g = !1) => {
          let a = "",
            f = "";
          d.value === "latest" || d.value === "oldest"
            ? (a = d.value)
            : (f = d.value);
          try {
            $.value = !0;
            const y = await ce.get(
              `/api/admin/${h.value}/${z.value}/history?per_page=${t}&page=${e}&sort_by_date=${a}&sort_by_rating=${f}`,
              ue()
            );
            c
              ? (o.value = [...o.value, ...y.data.reviews])
              : g || (o.value = [...y.data.reviews]),
              (w.value = y.data.pagination),
              (j.value = y.data.average_rating);
            const {
                five_stars_count: K,
                four_stars_count: X,
                three_stars_count: Z,
                two_stars_count: q,
                one_star_count: G,
              } = y.data,
              C = K + X + Z + q + G;
            P.value = [
              (K / C) * 100,
              (X / C) * 100,
              (Z / C) * 100,
              (q / C) * 100,
              (G / C) * 100,
            ];
          } catch {
            ve();
          } finally {
            $.value = !1;
          }
        };
      return (t, e) => {
        const c = pe("v-lazy");
        return (
          r(),
          x(
            Q,
            null,
            [
              l(ge(fe), { title: "Contractor History" }),
              M
                ? (r(),
                  _(
                    ye,
                    {
                      key: 0,
                      profile: v.profile,
                      "post-search-filters": v.postSearchFilters,
                      showit: v.showit,
                      "show-post-buttons": !0,
                      color: "rgb(229 231 235 / var(--tw-bg-opacity))",
                    },
                    {
                      default: p(() => {
                        var g;
                        return [
                          s("div", Re, [
                            H.value
                              ? (r(),
                                x("div", Se, [
                                  l(
                                    A,
                                    {
                                      shadowLevel: 2,
                                      bgColor: "white",
                                      padding: N.value < 640 ? "7px" : "20px",
                                    },
                                    {
                                      default: p(() => [
                                        l(
                                          ke,
                                          {
                                            linkUrl: `/admin/regions/${H.value.region_id}/appealed`,
                                            pageTitle: "Contractor History",
                                          },
                                          null,
                                          8,
                                          ["linkUrl"]
                                        ),
                                        l(
                                          xe,
                                          { contractor: H.value },
                                          null,
                                          8,
                                          ["contractor"]
                                        ),
                                        s("div", Ie, [
                                          l(I, {
                                            class: "mt-6",
                                            heading: "Check Contractor",
                                          }),
                                          s("div", Be, [
                                            s("div", $e, [
                                              s(
                                                "button",
                                                {
                                                  class: Y([
                                                    "rounded px-2 py-1 xs:px-4 xs:py-2 xs:text-md text-sm flex gap-2",
                                                    {
                                                      selected:
                                                        h.value === "reviews",
                                                    },
                                                  ]),
                                                  disabled: $.value,
                                                  onClick:
                                                    e[0] ||
                                                    (e[0] = (a) =>
                                                      E("reviews")),
                                                },
                                                [
                                                  Le,
                                                  V(s("img", Oe, null, 512), [
                                                    [
                                                      ee,
                                                      n.value &&
                                                        h.value === "reviews",
                                                    ],
                                                  ]),
                                                ],
                                                10,
                                                He
                                              ),
                                              s(
                                                "button",
                                                {
                                                  class: Y([
                                                    "rounded px-2 py-1 xs:px-4 xs:py-2 xs:text-md text-sm flex gap-2",
                                                    {
                                                      selected:
                                                        h.value === "responses",
                                                    },
                                                  ]),
                                                  disabled: $.value,
                                                  onClick:
                                                    e[1] ||
                                                    (e[1] = (a) =>
                                                      E("responses")),
                                                },
                                                [
                                                  je,
                                                  V(s("img", Ne, null, 512), [
                                                    [
                                                      ee,
                                                      n.value &&
                                                        h.value === "responses",
                                                    ],
                                                  ]),
                                                ],
                                                10,
                                                Pe
                                              ),
                                            ]),
                                          ]),
                                        ]),
                                        n.value
                                          ? u("", !0)
                                          : (r(),
                                            x("div", Te, [
                                              l(I, {
                                                heading: "Average Ratings",
                                                class: "mb-6",
                                              }),
                                              j.value && P.value
                                                ? (r(),
                                                  _(
                                                    we,
                                                    {
                                                      key: 0,
                                                      averageRating: j.value,
                                                      starPercentages: P.value,
                                                      length: w.value.total,
                                                      class: "mb-6",
                                                    },
                                                    null,
                                                    8,
                                                    [
                                                      "averageRating",
                                                      "starPercentages",
                                                      "length",
                                                    ]
                                                  ))
                                                : u("", !0),
                                              s("div", Ue, [
                                                l(
                                                  I,
                                                  {
                                                    class: "mt-6",
                                                    heading:
                                                      W.value &&
                                                      W.value.order_reviews_by,
                                                  },
                                                  null,
                                                  8,
                                                  ["heading"]
                                                ),
                                                s("div", null, [
                                                  s("div", Ae, [
                                                    l(
                                                      S,
                                                      {
                                                        selected:
                                                          d.value === "latest",
                                                        onOnSelect:
                                                          e[2] ||
                                                          (e[2] = (a) =>
                                                            k(a, "latest")),
                                                      },
                                                      {
                                                        default: p(() => [
                                                          R("Latest"),
                                                        ]),
                                                        _: 1,
                                                      },
                                                      8,
                                                      ["selected"]
                                                    ),
                                                    l(
                                                      S,
                                                      {
                                                        selected:
                                                          d.value === "oldest",
                                                        onOnSelect:
                                                          e[3] ||
                                                          (e[3] = (a) =>
                                                            k(a, "oldest")),
                                                      },
                                                      {
                                                        default: p(() => [
                                                          R("Oldest"),
                                                        ]),
                                                        _: 1,
                                                      },
                                                      8,
                                                      ["selected"]
                                                    ),
                                                    l(
                                                      S,
                                                      {
                                                        selected:
                                                          d.value === "highest",
                                                        onOnSelect:
                                                          e[4] ||
                                                          (e[4] = (a) =>
                                                            k(a, "highest")),
                                                      },
                                                      {
                                                        default: p(() => [
                                                          R("Highest rated"),
                                                        ]),
                                                        _: 1,
                                                      },
                                                      8,
                                                      ["selected"]
                                                    ),
                                                    l(
                                                      S,
                                                      {
                                                        selected:
                                                          d.value === "middle",
                                                        onOnSelect:
                                                          e[5] ||
                                                          (e[5] = (a) =>
                                                            k(a, "middle")),
                                                      },
                                                      {
                                                        default: p(() => [
                                                          R("Middle Rated"),
                                                        ]),
                                                        _: 1,
                                                      },
                                                      8,
                                                      ["selected"]
                                                    ),
                                                    l(
                                                      S,
                                                      {
                                                        selected:
                                                          d.value === "lowest",
                                                        onOnSelect:
                                                          e[6] ||
                                                          (e[6] = (a) =>
                                                            k(a, "lowest")),
                                                      },
                                                      {
                                                        default: p(() => [
                                                          R("Low Rated"),
                                                        ]),
                                                        _: 1,
                                                      },
                                                      8,
                                                      ["selected"]
                                                    ),
                                                  ]),
                                                ]),
                                              ]),
                                            ])),
                                      ]),
                                      _: 1,
                                    },
                                    8,
                                    ["padding"]
                                  ),
                                ]))
                              : u("", !0),
                            s("div", Fe, [
                              (r(!0),
                              x(
                                Q,
                                null,
                                me(
                                  o.value,
                                  (a, f) => (
                                    r(),
                                    _(
                                      A,
                                      {
                                        shadowLevel: 2,
                                        bgColor: "#fff",
                                        padding: N.value < 640 ? "7px" : "20px",
                                        key: f,
                                      },
                                      {
                                        default: p(() => [
                                          s("div", De, [
                                            f === 0
                                              ? (r(),
                                                _(I, {
                                                  key: 0,
                                                  heading: "Reviews",
                                                  class: "mt-4 mb-6",
                                                }))
                                              : u("", !0),
                                            l(
                                              F,
                                              {
                                                loading: n.value,
                                                background: "",
                                                height: "50vh",
                                              },
                                              null,
                                              8,
                                              ["loading"]
                                            ),
                                            s("div", Me, [
                                              l(
                                                be,
                                                {
                                                  review: a,
                                                  contractorId: a.contractor_id,
                                                  profileId: v.profile.id,
                                                },
                                                null,
                                                8,
                                                [
                                                  "review",
                                                  "contractorId",
                                                  "profileId",
                                                ]
                                              ),
                                            ]),
                                          ]),
                                          +m.value != +w.value.last_page &&
                                          f === o.value.length - 1
                                            ? (r(),
                                              _(c, {
                                                key: 0,
                                                "min-height": 5,
                                                options: { threshold: 0.5 },
                                                "onUpdate:modelValue": oe,
                                                transition: "fade-transition",
                                              }))
                                            : u("", !0),
                                          m.value > 1 &&
                                          !b.value &&
                                          +m.value == +w.value.last_page &&
                                          f === o.value.length - 1
                                            ? (r(),
                                              x(
                                                "div",
                                                ze,
                                                " No More Reviews to Load "
                                              ))
                                            : u("", !0),
                                          +m.value != +w.value.last_page &&
                                          f === o.value.length - 1
                                            ? (r(),
                                              _(
                                                F,
                                                {
                                                  key: 2,
                                                  classes: "flex gap-2 mt-4",
                                                  loading: b.value,
                                                  circleClasses: "small-circle",
                                                  textClasses: "small-text",
                                                  background: "",
                                                  height: "70px",
                                                },
                                                null,
                                                8,
                                                ["loading"]
                                              ))
                                            : u("", !0),
                                        ]),
                                        _: 2,
                                      },
                                      1032,
                                      ["padding"]
                                    )
                                  )
                                ),
                                128
                              )),
                            ]),
                            ((g = o.value) == null ? void 0 : g.length) === 0 &&
                            !b.value
                              ? (r(),
                                _(
                                  A,
                                  {
                                    key: 1,
                                    shadowLevel: 2,
                                    bgColor: "#fff",
                                    padding: N.value < 640 ? "7px" : "20px",
                                    class: "mb-6",
                                  },
                                  {
                                    default: p(() => {
                                      var a;
                                      return [
                                        s("div", We, [
                                          l(I, {
                                            heading: "Reviews",
                                            class: "mt-4 mb-6",
                                          }),
                                          l(
                                            F,
                                            {
                                              loading: n.value,
                                              background: "",
                                              height: "30vh",
                                            },
                                            null,
                                            8,
                                            ["loading"]
                                          ),
                                          s("div", null, [
                                            ((a = o.value) == null
                                              ? void 0
                                              : a.length) === 0 && !n.value
                                              ? (r(),
                                                x(
                                                  "div",
                                                  Ee,
                                                  " No reviews Available "
                                                ))
                                              : u("", !0),
                                          ]),
                                        ]),
                                      ];
                                    }),
                                    _: 1,
                                  },
                                  8,
                                  ["padding"]
                                ))
                              : u("", !0),
                          ]),
                        ];
                      }),
                      _: 1,
                    },
                    8,
                    ["profile", "post-search-filters", "showit"]
                  ))
                : u("", !0),
            ],
            64
          )
        );
      };
    },
  },
  Ht = Ce(Ke, [["__scopeId", "data-v-28e2ca41"]]);
export { Ht as default };
