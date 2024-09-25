import { H as X } from "./Header.8b20dfa0.js";
import {
  u as Z,
  D as q,
  r as v,
  o as G,
  S as J,
  N as Q,
  c as R,
  w as U,
  Z as Y,
  X as ee,
  B as te,
  I as se,
  e as $,
  h as l,
  i as ae,
  K as h,
  s as m,
  l as _,
  F as M,
  d as c,
  H as oe,
  f as a,
  n as O,
  g as w,
  j as le,
  U as ie,
  V as ne,
} from "./app.907bb242.js";
import { B as b } from "./Button.f68cd005.js";
import de from "./ReviewResponseAdmin.27bcb44a.js";
import { _ as A } from "./HeadingCard.ac3646cb.js";
import { C as H } from "./Card.0c51827f.js";
import { L as T } from "./Loader.9dfd413c.js";
import { _ as re } from "./SearchInput.af7e43a6.js";
import { P as pe } from "./PageTitle.f25bd43b.js";
import { _ as ce } from "./_plugin-vue_export-helper.cdc0426e.js";
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
/* empty css                                                               */ import "./ReviewAdmin.d009177d.js";
import "./EditRatingModal.2e8212da.js";
import "./StarRatingEditable.6da32187.js";
import "./Appeal.1c9232a0.js";
import "./DecisionNotes.5034a79b.js";
import "./StarRating.345caaaf.js";
import "./ButtonRatings.029b3347.js";
import "./QualifyingQuestionsAdmin.20d9d8ea.js";
import "./Tooltip.df5bf8e9.js";
import "./ResponseAdmin.1e10ea9a.js";
/* empty css                                                             */ /* empty css                                                                  */ const I =
    (n) => (ie("data-v-579b6e0c"), (n = n()), ne(), n),
  ue = { class: "bg-gray-200 mt-10 flex flex-col" },
  ve = { class: "flex justify-between" },
  me = { class: "border-gray-300" },
  fe = { class: "mb-4 mt-2" },
  ge = { class: "flex gap-3" },
  _e = I(() =>
    a("div", { class: "flex items-center justify-center" }, "Open Appeals", -1)
  ),
  he = [_e],
  xe = I(() =>
    a(
      "div",
      { class: "flex items-center justify-center" },
      " On Hold Appeals ",
      -1
    )
  ),
  ye = [xe],
  we = I(() =>
    a(
      "div",
      { class: "flex items-center justify-center" },
      " Approved Appeals ",
      -1
    )
  ),
  be = [we],
  Ae = I(() =>
    a(
      "div",
      { class: "flex items-center justify-center" },
      " Denied Appeals ",
      -1
    )
  ),
  ke = [Ae],
  Se = { class: "border-gray-300 border-t-2" },
  Ce = { class: "mb-4 mt-2" },
  Re = { class: "flex gap-3 flex-wrap" },
  $e = { class: "flex flex-col gap-4" },
  Oe = { class: "border-gray-300" },
  Ie = { class: "flex gap-8 flex-col" },
  Be = { key: 1, class: "text-center font-bold mt-4" },
  Ne = { class: "mb-6 border-gray-300" },
  je = {
    key: 0,
    class:
      "p-2 text-xl text-grey-600 font-bold h-60 flex items-center justify-center",
  },
  Le = {
    __name: "AppealedReviews",
    props: {
      profile: Object,
      region_id: [String, Number],
      region_name: [String, Number],
      showit: Boolean,
      postSearchFilters: { type: Object, default: () => ({ postSearch: "" }) },
    },
    setup(n) {
      const { region_id: W } = n,
        k = Z(),
        D = q().props.value.auth.user.appeals_privileges === 1,
        f = v(1),
        o = v([]),
        g = v(!1),
        d = v("latest"),
        B = v(15),
        F = v(""),
        i = v("open"),
        S = v(0),
        x = v(!1);
      G(async () => {
        (g.value = !0), await j(), (g.value = !1);
      }),
        J(() => {
          !D &&
            window.location.pathname !== "/post" &&
            Q.Inertia.visit("/post");
        });
      const z = R(() => k.state.ratings.updatedReview),
        N = R(() => k.getters.screenWidth),
        P = R(() => k.getters.translations),
        V = R(() => k.state.ratings.updatedResponse);
      U(V, (t) => {
        if (t && t.id) {
          const e = o.value.find((r) => r.id === t.review_id);
          if (e) {
            e.review_response = t;
            const r = o.value.findIndex((u) => u.id === t.review_id);
            r !== -1 && (o.value = o.value.map((u, s) => (s === r ? e : u)));
          }
        }
      }),
        U(z, async (t) => {
          if (t && t.id) {
            const e = o.value.findIndex((r) => r.id === t.id);
            e !== -1 && Object.assign(o.value[e], t);
          }
        });
      const E = async () => {
          x.value = !0;
          let t = f.value + 1;
          await j(B.value, t), (x.value = !1), (f.value = t);
        },
        y = async (t, e) => {
          t && (d.value = e), (o.value = []), await L(!1);
        },
        j = async (t = B.value, e = 1, r = !0) => {
          let u = "",
            s = "";
          d.value === "latest" || d.value === "oldest"
            ? (u = d.value)
            : (s = d.value);
          try {
            const p = await Y.get(
              `/api/admin/reviews/${W}/by-appeal-status?appeal_id=${F.value}&appeal_status=${i.value}&per_page=${t}&page=${e}&sort_by_date=${u}&sort_by_rating=${s}`,
              ee()
            );
            r
              ? (o.value = [...o.value, ...p.data.reviews])
              : (o.value = [...p.data.reviews]),
              (S.value = p.data.pagination);
          } catch {
            te();
          }
        },
        L = async (t = !0) => {
          (g.value = !0), await j(B.value, 1, t), (g.value = !1);
        },
        C = async (t) => {
          (i.value = t), (o.value = []), (f.value = 1), await L(!1);
        },
        K = async (t) => {
          (F.value = t), await L(!1);
        };
      return (t, e) => {
        const r = se("v-lazy");
        return (
          c(),
          $(
            M,
            null,
            [
              l(ae(oe), { title: "Appealed Reviews" }),
              D
                ? (c(),
                  h(
                    X,
                    {
                      key: 0,
                      profile: n.profile,
                      "post-search-filters": n.postSearchFilters,
                      showit: n.showit,
                      "show-post-buttons": !0,
                      color: "rgb(229 231 235 / var(--tw-bg-opacity))",
                    },
                    {
                      default: m(() => {
                        var u;
                        return [
                          a("div", ue, [
                            l(
                              H,
                              {
                                shadowLevel: 2,
                                bgColor: "white",
                                padding: N.value < 640 ? "7px" : "20px",
                                class: "mb-6",
                              },
                              {
                                default: m(() => [
                                  a("div", ve, [
                                    l(pe, {
                                      linkUrl: "/admin/regions/appealed",
                                      pageTitle: "Appealed Reviews",
                                    }),
                                    l(re, {
                                      class: "mb-8 w-72",
                                      barWidth: 100,
                                      icon: "iconamoon:search",
                                      placeholder: "Search by Appeal Id...",
                                      onSearchClicked: K,
                                    }),
                                  ]),
                                  l(
                                    A,
                                    {
                                      class: "mt-2",
                                      style: {
                                        "font-weight": "800",
                                        "margin-bottom": "8px",
                                        "font-size": "24px",
                                      },
                                      heading: `Region ${n.region_id} : ${n.region_name}`,
                                    },
                                    null,
                                    8,
                                    ["heading"]
                                  ),
                                  a("div", me, [
                                    l(A, {
                                      class: "",
                                      heading: "View Appeals",
                                    }),
                                    a("div", fe, [
                                      a("div", ge, [
                                        a(
                                          "button",
                                          {
                                            class: O([
                                              "rounded px-2 py-1 xs:px-4 xs:py-2 xs:text-md text-sm flex gap-2",
                                              { selected: i.value === "open" },
                                            ]),
                                            onClick:
                                              e[0] || (e[0] = (s) => C("open")),
                                          },
                                          he,
                                          2
                                        ),
                                        a(
                                          "button",
                                          {
                                            class: O([
                                              "rounded px-2 py-1 xs:px-4 xs:py-2 xs:text-md text-sm flex gap-2",
                                              {
                                                selected: i.value === "on_hold",
                                              },
                                            ]),
                                            onClick:
                                              e[1] ||
                                              (e[1] = (s) => C("on_hold")),
                                          },
                                          ye,
                                          2
                                        ),
                                        a(
                                          "button",
                                          {
                                            class: O([
                                              "rounded px-2 py-1 xs:px-4 xs:py-2 xs:text-md text-sm flex gap-2",
                                              {
                                                selected:
                                                  i.value === "approved",
                                              },
                                            ]),
                                            onClick:
                                              e[2] ||
                                              (e[2] = (s) => C("approved")),
                                          },
                                          be,
                                          2
                                        ),
                                        a(
                                          "button",
                                          {
                                            class: O([
                                              "rounded px-2 py-1 xs:px-4 xs:py-2 xs:text-md text-sm flex gap-2",
                                              {
                                                selected: i.value === "denied",
                                              },
                                            ]),
                                            onClick:
                                              e[3] ||
                                              (e[3] = (s) => C("denied")),
                                          },
                                          ke,
                                          2
                                        ),
                                      ]),
                                    ]),
                                  ]),
                                  a("div", Se, [
                                    l(
                                      A,
                                      {
                                        class: "mt-3",
                                        heading:
                                          P.value && P.value.order_reviews_by,
                                      },
                                      null,
                                      8,
                                      ["heading"]
                                    ),
                                    a("div", Ce, [
                                      a("div", Re, [
                                        l(
                                          b,
                                          {
                                            selected: d.value === "latest",
                                            onOnSelect:
                                              e[4] ||
                                              (e[4] = (s) => y(s, "latest")),
                                          },
                                          {
                                            default: m(() => [w("Latest")]),
                                            _: 1,
                                          },
                                          8,
                                          ["selected"]
                                        ),
                                        l(
                                          b,
                                          {
                                            selected: d.value === "oldest",
                                            onOnSelect:
                                              e[5] ||
                                              (e[5] = (s) => y(s, "oldest")),
                                          },
                                          {
                                            default: m(() => [w("Oldest")]),
                                            _: 1,
                                          },
                                          8,
                                          ["selected"]
                                        ),
                                        l(
                                          b,
                                          {
                                            selected: d.value === "highest",
                                            onOnSelect:
                                              e[6] ||
                                              (e[6] = (s) => y(s, "highest")),
                                          },
                                          {
                                            default: m(() => [
                                              w("Highest rated"),
                                            ]),
                                            _: 1,
                                          },
                                          8,
                                          ["selected"]
                                        ),
                                        l(
                                          b,
                                          {
                                            selected: d.value === "middle",
                                            onOnSelect:
                                              e[7] ||
                                              (e[7] = (s) => y(s, "middle")),
                                          },
                                          {
                                            default: m(() => [
                                              w("Middle Rated"),
                                            ]),
                                            _: 1,
                                          },
                                          8,
                                          ["selected"]
                                        ),
                                        l(
                                          b,
                                          {
                                            selected: d.value === "lowest",
                                            onOnSelect:
                                              e[8] ||
                                              (e[8] = (s) => y(s, "lowest")),
                                          },
                                          {
                                            default: m(() => [w("Low Rated")]),
                                            _: 1,
                                          },
                                          8,
                                          ["selected"]
                                        ),
                                      ]),
                                    ]),
                                  ]),
                                ]),
                                _: 1,
                              },
                              8,
                              ["padding"]
                            ),
                            a("div", $e, [
                              (c(!0),
                              $(
                                M,
                                null,
                                le(
                                  o.value,
                                  (s, p) => (
                                    c(),
                                    h(
                                      H,
                                      {
                                        shadowLevel: 2,
                                        bgColor: "#fff",
                                        padding: N.value < 640 ? "7px" : "20px",
                                        key: p,
                                      },
                                      {
                                        default: m(() => [
                                          a("div", Oe, [
                                            p === 0
                                              ? (c(),
                                                h(
                                                  A,
                                                  {
                                                    key: 0,
                                                    heading: `View : ${
                                                      i.value === "open"
                                                        ? "Open Appeals"
                                                        : i.value === "on_hold"
                                                        ? "On Hold Appeals"
                                                        : i.value === "approved"
                                                        ? "Approved Appeals"
                                                        : "Denied Appeals"
                                                    }`,
                                                    class: "mt-4 mb-6",
                                                  },
                                                  null,
                                                  8,
                                                  ["heading"]
                                                ))
                                              : _("", !0),
                                            l(
                                              T,
                                              {
                                                loading: g.value,
                                                background: "",
                                                height: "50vh",
                                              },
                                              null,
                                              8,
                                              ["loading"]
                                            ),
                                            a("div", Ie, [
                                              l(
                                                de,
                                                {
                                                  review: s,
                                                  contractorId: s.contractor_id,
                                                  profileId: n.profile.id,
                                                  showNotes: !0,
                                                  showContactDetails: !0,
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
                                          +f.value != +S.value.last_page &&
                                          p === o.value.length - 1
                                            ? (c(),
                                              h(r, {
                                                key: 0,
                                                "min-height": 5,
                                                options: { threshold: 0.5 },
                                                "onUpdate:modelValue": E,
                                                transition: "fade-transition",
                                              }))
                                            : _("", !0),
                                          f.value > 1 &&
                                          !x.value &&
                                          +f.value == +S.value.last_page &&
                                          p === o.value.length - 1
                                            ? (c(),
                                              $(
                                                "div",
                                                Be,
                                                " No More Reviews to Load "
                                              ))
                                            : _("", !0),
                                          +f.value != +S.value.last_page &&
                                          p === o.value.length - 1
                                            ? (c(),
                                              h(
                                                T,
                                                {
                                                  key: 2,
                                                  classes: "flex gap-2 mt-4",
                                                  loading: x.value,
                                                  circleClasses: "small-circle",
                                                  textClasses: "small-text",
                                                  background: "",
                                                  height: "70px",
                                                },
                                                null,
                                                8,
                                                ["loading"]
                                              ))
                                            : _("", !0),
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
                            ((u = o.value) == null ? void 0 : u.length) === 0 &&
                            !x.value
                              ? (c(),
                                h(
                                  H,
                                  {
                                    key: 0,
                                    shadowLevel: 2,
                                    bgColor: "#fff",
                                    padding: N.value < 640 ? "7px" : "20px",
                                    class: "mb-6",
                                  },
                                  {
                                    default: m(() => {
                                      var s;
                                      return [
                                        a("div", Ne, [
                                          l(
                                            A,
                                            {
                                              heading: `View : ${
                                                i.value === "open"
                                                  ? "Open Appeals"
                                                  : i.value === "on_hold"
                                                  ? "On Hold Appeals"
                                                  : i.value === "approved"
                                                  ? "Approved Appeals"
                                                  : "Denied Appeals"
                                              }`,
                                              class: "mt-4 mb-6",
                                            },
                                            null,
                                            8,
                                            ["heading"]
                                          ),
                                          l(
                                            T,
                                            {
                                              loading: g.value,
                                              background: "",
                                              height: "30vh",
                                            },
                                            null,
                                            8,
                                            ["loading"]
                                          ),
                                          a("div", null, [
                                            ((s = o.value) == null
                                              ? void 0
                                              : s.length) === 0 && !g.value
                                              ? (c(),
                                                $(
                                                  "div",
                                                  je,
                                                  " No reviews Available "
                                                ))
                                              : _("", !0),
                                          ]),
                                        ]),
                                      ];
                                    }),
                                    _: 1,
                                  },
                                  8,
                                  ["padding"]
                                ))
                              : _("", !0),
                          ]),
                        ];
                      }),
                      _: 1,
                    },
                    8,
                    ["profile", "post-search-filters", "showit"]
                  ))
                : _("", !0),
            ],
            64
          )
        );
      };
    },
  },
  xt = ce(Le, [["__scopeId", "data-v-579b6e0c"]]);
export { xt as default };
