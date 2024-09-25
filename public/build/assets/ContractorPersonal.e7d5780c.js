import {
  u as te,
  r,
  o as ae,
  c as h,
  w as T,
  Z as se,
  X as oe,
  B as le,
  e as w,
  h as l,
  i as re,
  s as c,
  F as z,
  d as n,
  H as ie,
  K as M,
  l as p,
  f as g,
  g as C,
  t as f,
  j as ne,
  v as K,
  z as X,
} from "./app.907bb242.js";
import { H as ue } from "./Header.8b20dfa0.js";
import { P as de } from "./PageTitle.f25bd43b.js";
import { _ as ve, A as ce } from "./ContractorInfo.6f4506f5.js";
import pe from "./QuestionsReview.085f58ac.js";
import { B as S } from "./Button.f68cd005.js";
import { _ as D } from "./HeadingCard.ac3646cb.js";
import { C as ge } from "./Card.0c51827f.js";
import { L as Z } from "./Loader.9dfd413c.js";
import { _ as fe } from "./_plugin-vue_export-helper.cdc0426e.js";
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
/* empty css                                                                  */ import "./StarRating.345caaaf.js";
import "./PrimaryButton.d6b2dece.js";
import "./Review.a038e96e.js";
import "./EditResponseModal.84ffd735.js";
import "./DeleteResponseModal.4a25af00.js";
import "./ButtonRatings.029b3347.js";
import "./Tooltip.df5bf8e9.js";
import "./EditRatingModal.2e8212da.js";
import "./StarRatingEditable.6da32187.js";
import "./DeleteRatingModal.d3c2927a.js";
import "./QualifyingQuestions.944a7f65.js";
/* empty css                                                             */ /* empty css                                                               */ const me =
    { key: 0, class: "bg-gray-200 mt-10" },
  _e = { key: 1 },
  he = { class: "border-t-2 border-gray-300" },
  we = { class: "mb-6" },
  xe = { class: "flex gap-3 flex-wrap" },
  ye = { class: "mb-4 mt-6 mt-7 border-t-2 border-gray-300" },
  be = { key: 0, class: "flex gap-8 flex-col" },
  Ie = { key: 1 },
  ke = {
    class:
      "p-2 text-xl text-grey-600 font-bold h-60 flex items-center justify-center",
  },
  Re = {
    __name: "ContractorPersonal",
    props: {
      contractorDetails: Object,
      profile: Object,
      showit: Boolean,
      postSearchFilters: { type: Object, default: () => ({ postSearch: "" }) },
    },
    setup(x) {
      const { profile: Ce, contractorDetails: F } = x,
        m = te(),
        u = r(1),
        o = r([]),
        v = r(!1),
        B = r([]),
        O = r(null),
        y = r({}),
        i = r("latest"),
        P = r(0),
        b = r(15),
        $ = r(!1),
        L = r();
      ae(async () => {
        (v.value = !0),
          await k(),
          (v.value = !1),
          (y.value = F),
          setTimeout(() => {
            const a = (t) => {
              t.forEach((d) => {
                d.isIntersecting && V();
              });
            };
            new IntersectionObserver(a, {
              rootMargin: "0px 0px 0px 0px",
              threshold: 0,
            }).observe(L.value);
          }, 1e3);
      });
      const q = h(() => m.state.ratings.updatedReview),
        G = h(() => m.state.ratings.updatedResponse),
        J = h(() => m.getters.screenWidth),
        Q = h(() => m.state.ratings.reviewId),
        Y = h(() => m.state.ratings.responseId),
        s = h(() => m.getters.translations);
      T(q, (a) => {
        if (a && a.id) {
          const e = o.value.findIndex((t) => t.id === a.id);
          e !== -1 && Object.assign(o.value[e], a), k(b.value, u.value, !1, !0);
        }
      }),
        T(G, (a) => {
          if (a && a.id) {
            const e = o.value.find((t) => t.id === a.review_id);
            if (e) {
              e.review_response = a;
              const t = o.value.findIndex((d) => d.id === a.review_id);
              t !== -1 && (o.value = o.value.map((d, j) => (j === t ? e : d)));
            }
          }
        }),
        T(Q, (a) => {
          if (a) {
            const e = o.value.findIndex((t) => t.id === a);
            e !== -1 && o.value.splice(e, 1), k(b.value, u.value, !1, !0);
          }
        }),
        T(Y, (a) => {
          if (a) {
            const e = o.value.findIndex((t) => t.review_response.id === a);
            e !== -1 && delete o.value[e].review_response;
          }
        });
      const V = async () => {
          v.value ||
            (($.value = !0),
            (u.value = u.value + 1),
            console.log("inloadMoreReviews"),
            await k(b.value, u.value),
            ($.value = !1));
        },
        I = (a, e) => {
          a && (i.value = e), ee();
        },
        ee = async (a = !1) => {
          (v.value = !0), await k(b.value, u.value, !1, a), (v.value = !1);
        },
        k = async (a = b.value, e = 1, t = !0, d = !1) => {
          let j = "",
            N = "";
          i.value === "latest" || i.value === "oldest"
            ? (j = i.value)
            : (N = i.value);
          try {
            const _ = await se.get(
              `/api/reviews/${F.id}?per_page=${a}&page=${e}&sort_by_date=${j}&sort_by_rating=${N}`,
              oe()
            );
            t
              ? (o.value = [...o.value, ..._.data.reviews])
              : d || (o.value = [..._.data.reviews]),
              (P.value = _.data.pagination),
              (O.value = _.data.average_rating);
            const {
                five_stars_count: W,
                four_stars_count: A,
                three_stars_count: H,
                two_stars_count: U,
                one_star_count: E,
              } = _.data,
              R = W + A + H + U + E;
            B.value = [
              (W / R) * 100,
              (A / R) * 100,
              (H / R) * 100,
              (U / R) * 100,
              (E / R) * 100,
            ];
          } catch {
            le();
          }
        };
      return (a, e) => (
        n(),
        w(
          z,
          null,
          [
            l(re(ie), { title: s.value && s.value.my_ratings }, null, 8, [
              "title",
            ]),
            l(
              ue,
              {
                profile: x.profile,
                "post-search-filters": x.postSearchFilters,
                showit: x.showit,
                "show-post-buttons": !0,
                color: "rgb(229 231 235 / var(--tw-bg-opacity))",
              },
              {
                default: c(() => [
                  y.value
                    ? (n(),
                      w("div", me, [
                        l(
                          ge,
                          {
                            shadowLevel: 2,
                            bgColor: "white",
                            padding: J.value < 640 ? "7px" : "20px",
                          },
                          {
                            default: c(() => [
                              l(
                                de,
                                {
                                  linkUrl: "/post",
                                  pageTitle: s.value && s.value.my_ratings,
                                },
                                null,
                                8,
                                ["pageTitle"]
                              ),
                              Object.keys(y.value).length > 0
                                ? (n(),
                                  M(
                                    ve,
                                    { key: 0, contractor: y.value },
                                    null,
                                    8,
                                    ["contractor"]
                                  ))
                                : p("", !0),
                              l(
                                Z,
                                {
                                  loading: v.value,
                                  background: "",
                                  height: "60vh",
                                },
                                null,
                                8,
                                ["loading"]
                              ),
                              v.value
                                ? p("", !0)
                                : (n(),
                                  w("div", _e, [
                                    O.value && B.value
                                      ? (n(),
                                        M(D, {
                                          key: 0,
                                          heading: "Average Ratings",
                                          class: "mb-6",
                                        }))
                                      : p("", !0),
                                    O.value && B.value
                                      ? (n(),
                                        M(
                                          ce,
                                          {
                                            key: 1,
                                            averageRating: O.value,
                                            starPercentages: B.value,
                                            length: P.value.total,
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
                                      : p("", !0),
                                    g("div", he, [
                                      l(
                                        D,
                                        {
                                          class: "mt-4",
                                          heading:
                                            s.value && s.value.order_reviews_by,
                                        },
                                        null,
                                        8,
                                        ["heading"]
                                      ),
                                      g("div", we, [
                                        g("div", xe, [
                                          l(
                                            S,
                                            {
                                              selected: i.value === "latest",
                                              onOnSelect:
                                                e[0] ||
                                                (e[0] = (t) => I(t, "latest")),
                                            },
                                            {
                                              default: c(() => [
                                                C(
                                                  f(s.value && s.value.latest),
                                                  1
                                                ),
                                              ]),
                                              _: 1,
                                            },
                                            8,
                                            ["selected"]
                                          ),
                                          l(
                                            S,
                                            {
                                              selected: i.value === "oldest",
                                              onOnSelect:
                                                e[1] ||
                                                (e[1] = (t) => I(t, "oldest")),
                                            },
                                            {
                                              default: c(() => [
                                                C(
                                                  f(s.value && s.value.oldest),
                                                  1
                                                ),
                                              ]),
                                              _: 1,
                                            },
                                            8,
                                            ["selected"]
                                          ),
                                          l(
                                            S,
                                            {
                                              selected: i.value === "highest",
                                              onOnSelect:
                                                e[2] ||
                                                (e[2] = (t) => I(t, "highest")),
                                            },
                                            {
                                              default: c(() => [
                                                C(
                                                  f(
                                                    s.value &&
                                                      s.value.highest_rated
                                                  ),
                                                  1
                                                ),
                                              ]),
                                              _: 1,
                                            },
                                            8,
                                            ["selected"]
                                          ),
                                          l(
                                            S,
                                            {
                                              selected: i.value === "middle",
                                              onOnSelect:
                                                e[3] ||
                                                (e[3] = (t) => I(t, "middle")),
                                            },
                                            {
                                              default: c(() => [
                                                C(
                                                  f(
                                                    s.value &&
                                                      s.value.middle_rated
                                                  ),
                                                  1
                                                ),
                                              ]),
                                              _: 1,
                                            },
                                            8,
                                            ["selected"]
                                          ),
                                          l(
                                            S,
                                            {
                                              selected: i.value === "lowest",
                                              onOnSelect:
                                                e[4] ||
                                                (e[4] = (t) => I(t, "lowest")),
                                            },
                                            {
                                              default: c(() => [
                                                C(
                                                  f(
                                                    s.value && s.value.low_rated
                                                  ),
                                                  1
                                                ),
                                              ]),
                                              _: 1,
                                            },
                                            8,
                                            ["selected"]
                                          ),
                                        ]),
                                      ]),
                                    ]),
                                    g("div", ye, [
                                      l(
                                        D,
                                        {
                                          heading: s.value && s.value.reviews,
                                          class: "mt-4 mb-6",
                                        },
                                        null,
                                        8,
                                        ["heading"]
                                      ),
                                      o.value.length > 0
                                        ? (n(),
                                          w("div", be, [
                                            (n(!0),
                                            w(
                                              z,
                                              null,
                                              ne(
                                                o.value,
                                                (t, d) => (
                                                  n(),
                                                  M(
                                                    pe,
                                                    {
                                                      key: d,
                                                      review: t,
                                                      contractorId: y.value.id,
                                                      profileId: x.profile.id,
                                                    },
                                                    null,
                                                    8,
                                                    [
                                                      "review",
                                                      "contractorId",
                                                      "profileId",
                                                    ]
                                                  )
                                                )
                                              ),
                                              128
                                            )),
                                          ]))
                                        : p("", !0),
                                      o.value.length === 0
                                        ? (n(),
                                          w("div", Ie, [
                                            g(
                                              "div",
                                              ke,
                                              f(
                                                s.value &&
                                                  s.value
                                                    .no_reviews_available_for_this_contractor
                                              ),
                                              1
                                            ),
                                          ]))
                                        : p("", !0),
                                    ]),
                                  ])),
                              K(
                                g(
                                  "div",
                                  {
                                    ref_key: "loadMoreIntersect",
                                    ref: L,
                                    style: { width: "5px", height: "5px" },
                                  },
                                  null,
                                  512
                                ),
                                [[X, +u.value != +P.value.last_page]]
                              ),
                              K(
                                g(
                                  "div",
                                  { class: "text-center font-bold" },
                                  f(s.value && s.value.no_more_reviews_to_load),
                                  513
                                ),
                                [
                                  [
                                    X,
                                    u.value > 1 &&
                                      !$.value &&
                                      +u.value == +P.value.last_page,
                                  ],
                                ]
                              ),
                              l(
                                Z,
                                {
                                  classes: "flex gap-2",
                                  loading: $.value,
                                  circleClasses: "small-circle",
                                  textClasses: "small-text",
                                  background: "",
                                  height: "70px",
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
                      ]))
                    : p("", !0),
                ]),
                _: 1,
              },
              8,
              ["profile", "post-search-filters", "showit"]
            ),
          ],
          64
        )
      );
    },
  },
  ct = fe(Re, [["__scopeId", "data-v-e3fde137"]]);
export { ct as default };
