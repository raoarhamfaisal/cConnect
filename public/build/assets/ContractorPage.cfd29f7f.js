import {
  r as n,
  D as fe,
  u as P,
  c as w,
  o as ue,
  I as O,
  d as l,
  e as s,
  f as o,
  h as r,
  i as C,
  t as c,
  l as i,
  n as A,
  K as E,
  s as _,
  J as W,
  g as ee,
  F as D,
  N as Y,
  U as ie,
  V as ce,
  p as ge,
  y as U,
  j as X,
  ae as ve,
  q as $e,
  v as de,
  w as Ce,
  X as we,
  B as ke,
  b as We,
  T as Te,
  H as je,
  af as Ue,
} from "./app.907bb242.js";
import { _ as Ne } from "./DialogUpgradeToGoldPlatinum.8daf4ac5.js";
import { L as Le } from "./Loader.9dfd413c.js";
import { M as De } from "./MoveToTop.8193f768.js";
import "./ContractorInfo.6f4506f5.js";
import "./StarRating.345caaaf.js";
/* empty css                                                             */ import { I as N } from "./iconify.99e09ef6.js";
import {
  _ as xe,
  C as Ie,
} from "./ImageTextSection.vue_vue_type_style_index_0_scoped_a4e46067_lang.cc0ca6e2.js";
import "./SelectProfile.a00d96e3.js";
/* empty css                                                                   */ import { C as Q } from "./CustomDialog.f5ff7c4f.js";
import { A as he } from "./Avatar.72f6a2c8.js";
import { B as _e } from "./Badge.c427ce3e.js";
import "./filepond-plugin-file-poster.b4b2d2f1.js";
import { C as le } from "./Card.0c51827f.js";
import { S as pe, _ as be } from "./PostDisplayEnlarged.adbff492.js";
import { _ as te } from "./_plugin-vue_export-helper.cdc0426e.js";
import { _ as ye } from "./HeadingCard.ac3646cb.js";
import { o as ae } from "./selectListsHelpters.6d73b684.js";
import "./cConnectWord.60dc90ac.js";
import "./ResponsiveNavLink.04cb55a4.js";
import "./InputLabel.c691f6db.js";
import "./InputError.a485c9eb.js";
import "./ContractorRating.3006b2c1.js";
import "./Review.a038e96e.js";
import "./EditResponseModal.84ffd735.js";
import "./DeleteResponseModal.4a25af00.js";
import "./ButtonRatings.029b3347.js";
import "./PrimaryButton.d6b2dece.js";
import "./Button.f68cd005.js";
/* empty css                                                               */ import "./Tooltip.df5bf8e9.js";
import "./EditRatingModal.2e8212da.js";
import "./StarRatingEditable.6da32187.js";
import "./DeleteRatingModal.d3c2927a.js";
import "./QualifyingQuestions.944a7f65.js";
const H = ["#e5e7eb", "#ffffff", "#000000", "#241e6d", "#1864ab"],
  Re = (e) => (ie("data-v-13ed17a4"), (e = e()), ce(), e),
  Ae = { key: 0, class: "bg-[#2d2c2b]" },
  Ve = {
    class:
      "relative gap-2 mb-1 bg-[] max-w-[1400px] px-3 sm:px-10 py-4 sm:py-8 mx-auto w-full",
  },
  Pe = { key: 0, class: "sm:hidden flex gap-2 mb-2" },
  He = { class: "flex gap-2 items-center justify-between w-full" },
  Be = { key: 0, class: "sm:flex gap-2 hidden" },
  Oe = { class: "flex gap-1" },
  Ee = {
    class: A(
      " px-4 py-1 text-xs hover:bg-[#c78b22] sm:text-sm font-bold rounded-full border-[#c78b22] border-[1px] text-white cursor-pointer hover:shadow-lg active:scale-95 w-full"
    ),
    style: { background: "#c78b22", borderColor: "#c78b22" },
  },
  Fe = { class: "max-w-[1400px] shadow-lg rounded mx-auto w-full" },
  Me = ["src"],
  Ge = {
    key: 1,
    class:
      "w-full text-[#2d2c2b] bg-[#f8f8f8] text-3xl flex justify-center items-center font-bold h-[400px]",
  },
  ze = {
    key: 1,
    class: "bg-[#f8f2e8] py-10 overflow-hidden",
    style: { color: "#2d2c2b" },
  },
  qe = {
    class: "max-w-[1400px] px-3 sm:px-10 mx-auto flex justify-between w-full",
  },
  Ye = { class: "text-left" },
  Je = { class: "" },
  Ke = { class: "flex text-lg sm:text-xl font-semibold mt-1 flex-col" },
  Xe = { key: 0, class: "text-base md:text-xl" },
  Qe = { class: "flex max-md:flex-col" },
  Ze = { key: 0, class: "mx-2 flex translate-y-[-1px]" },
  et = { class: "flex items-center gap-1" },
  tt = Re(() =>
    o(
      "div",
      { class: "" },
      [
        o("img", {
          src: "/images/icons/pre-diamond.png",
          width: "20",
          height: "30",
        }),
      ],
      -1
    )
  ),
  ot = { class: "flex flex-col justify-center items-center" },
  lt = { class: "" },
  st = { class: "font-light text-xs overflow-hidden tracking-tighter" },
  at = { class: "flex gap-2 sm:gap-3 translate-x-[-2px]" },
  rt = {
    class:
      "xs:text-md w-[28px] h-[28px] xs:w-[35px] xs:h-[35px] font-semibold flex items-center justify-center",
  },
  nt = { class: "mb-4 sm:mb-0 mt-4" },
  it = {
    __name: "ProfileHeader",
    props: {
      profile: Object,
      loggedInUserId: [String, Number],
      screenWidth: Number,
      averageRating: { type: Number, default: 0 },
      total_reviews: { type: Number, default: 0 },
    },
    setup(e) {
      var Z, j;
      const t = e;
      n("#4169E1");
      const f = n(!1),
        d = n();
      let x = fe().props.value;
      (Z = x == null ? void 0 : x.auth) == null || Z.user;
      const u = (j = x == null ? void 0 : x.profile) == null ? void 0 : j.id,
        h = n(""),
        m = n(!0),
        v = n(""),
        y = P(),
        I = w(() => y.getters.translations),
        a = w(() => y.getters.userVersion);
      ue(() => {
        const L = localStorage.getItem("showGoBack");
        L === "false" && (m.value = !1),
          console.log(L),
          localStorage.removeItem("showGoBack");
      });
      const g = async () => {
          if (
            (console.log("onLoad"),
            t.profile.company_logo || t.profile.user_avatar)
          ) {
            const L = new Image();
            (L.src = "/" + t.profile.company_logo || t.profile.user_avatar),
              await new Promise((B) => (L.onload = B)),
              console.log(L.naturalHeight, L.naturalWidth, "height,width"),
              L.naturalWidth <= L.naturalHeight
                ? (v.value = "rounded-full object-contain h-[400px]")
                : (v.value = "");
          }
        },
        p = () => {
          d.value.closeDialog();
        },
        $ = () => {
          d.value.openDialog();
        };
      console.log(x, "usepage");
      const S = n(),
        b = n(),
        k = () => {
          if (a.value !== 3) {
            y.commit("setIsUpgradeToGoldPlatinumDialogOpen", !0);
            return;
          }
          z(window.location.href) && (f.value = !0);
        };
      function z(L) {
        const B = document.createElement("textarea");
        (B.value = L), document.body.appendChild(B), B.select();
        let q;
        try {
          q = document.execCommand("copy");
        } catch (se) {
          console.error("Failed to copy text: ", se), (q = !1);
        }
        return document.body.removeChild(B), q;
      }
      const V = () => {
        const L = localStorage.getItem("prevUrl");
        console.log(L),
          L === "/post"
            ? Y.Inertia.visit(L)
            : L === "/edit"
            ? Y.Inertia.visit(`/contractor/${t.loggedInUserId}/edit`)
            : L === "/settings"
            ? Y.Inertia.visit("/settings")
            : Y.Inertia.visit("/sub-finder");
      };
      n("#241e6d");
      const G = n(t.profile.first_name),
        T = n(t.profile.last_name);
      n(t.profile.user_avatar);
      const J = n(t.profile.company_name),
        R = n(t.profile.city),
        M = n(t.profile.state);
      w(() => y.state.contractor.selectedColorScheme || H);
      const K = w(() => G.value + " " + T.value),
        re = w(() => {
          if (
            (console.log("here in teh trunctated", t.screenWidth),
            t.screenWidth < 600)
          ) {
            const L = t.screenWidth < 400 ? 30 : 34;
            return K.value.length > L
              ? K.value.substring(0, L) + "..."
              : K.value;
          } else return G.value + " " + T.value;
        }),
        ne = () => {
          u ? S.value.openDialog() : ((h.value = "ratings"), $());
        },
        oe = () => {
          u ? b.value.openPostDialog() : ((h.value = "posts"), $());
        };
      return (L, B) => {
        const q = O("Link"),
          se = O("v-snackbar"),
          F = O("v-tooltip");
        return (
          l(),
          s(
            D,
            null,
            [
              e.profile
                ? (l(),
                  s("div", Ae, [
                    o("div", Ve, [
                      m.value
                        ? (l(),
                          s("div", Pe, [
                            o("div", { onClick: V, class: "cursor-pointer" }, [
                              r(C(N), {
                                class: "w-6 h-6",
                                icon: "ion:arrow-back",
                                color: "#c78b22",
                              }),
                            ]),
                            o(
                              "div",
                              {
                                onClick: V,
                                class:
                                  "font-bold cursor-pointer translate-y-[1px] flex justify-center items-center text-xl leading-tight",
                                style: { color: "#c78b22" },
                              },
                              c(I.value && I.value.go_back),
                              1
                            ),
                          ]))
                        : i("", !0),
                      o("div", He, [
                        m.value
                          ? (l(),
                            s("div", Be, [
                              o(
                                "div",
                                { onClick: V, class: "cursor-pointer" },
                                [
                                  r(C(N), {
                                    class: "w-6 h-6",
                                    icon: "ion:arrow-back",
                                    color: "#fff",
                                  }),
                                ]
                              ),
                              o(
                                "div",
                                {
                                  onClick: V,
                                  class:
                                    "font-bold cursor-pointer translate-y-[1px] flex justify-center items-center text-xl leading-tight",
                                  style: { color: "#fff" },
                                },
                                c(I.value && I.value.go_back),
                                1
                              ),
                            ]))
                          : i("", !0),
                        J.value
                          ? (l(),
                            s(
                              "div",
                              {
                                key: 1,
                                class: A(
                                  `text-2xl ${
                                    m.value ? "sm:absolute company-center" : ""
                                  } text-center xs:text-3xl font-bold uppercase`
                                ),
                                style: { color: "#fff" },
                              },
                              c(J.value),
                              3
                            ))
                          : i("", !0),
                        o("div", Oe, [
                          e.profile.user_id === e.loggedInUserId
                            ? (l(),
                              E(
                                q,
                                {
                                  key: 0,
                                  class: "rounded-full",
                                  href: `/contractor/${e.profile.user_id}/edit`,
                                },
                                {
                                  default: _(() => [
                                    o(
                                      "button",
                                      Ee,
                                      c(I.value && I.value.edit),
                                      1
                                    ),
                                  ]),
                                  _: 1,
                                },
                                8,
                                ["href"]
                              ))
                            : i("", !0),
                          o(
                            "button",
                            W(t, {
                              onClick: k,
                              style: {
                                color: "#c78b22",
                                borderColor: "#c78b22",
                              },
                              class:
                                "bg-white px-4 py-1 text-xs hover:bg-[#f8f9fa] sm:text-sm font-bold rounded-full border-[1px] bg-white cursor-pointer hover:shadow-lg active:scale-95",
                            }),
                            c(I.value && I.value.share),
                            17
                          ),
                          r(
                            se,
                            {
                              location: "top",
                              modelValue: f.value,
                              "onUpdate:modelValue":
                                B[0] || (B[0] = (me) => (f.value = me)),
                              "content-class": "mt-6",
                              color: "success",
                              timeout: 2e3,
                            },
                            {
                              default: _(() => [
                                ee(
                                  c(
                                    I.value && I.value.link_copied_to_clipboard
                                  ),
                                  1
                                ),
                              ]),
                              _: 1,
                            },
                            8,
                            ["modelValue"]
                          ),
                        ]),
                      ]),
                    ]),
                  ]))
                : i("", !0),
              o("div", null, [
                o("div", Fe, [
                  e.profile.company_logo || e.profile.user_avatar
                    ? (l(),
                      s(
                        "img",
                        {
                          key: 0,
                          class: A(["w-full", v.value]),
                          ref: "imgRef",
                          onLoad: g,
                          src: `/${
                            e.profile.company_logo || e.profile.user_avatar
                          }`,
                          alt: "",
                        },
                        null,
                        42,
                        Me
                      ))
                    : (l(),
                      s(
                        "div",
                        Ge,
                        c(I.value && I.value.no_company_logo_or_user_avatar),
                        1
                      )),
                ]),
              ]),
              e.profile.bottom_text
                ? (l(),
                  s("div", ze, [
                    o("div", qe, [
                      o("div", Ye, [
                        o("div", Je, [
                          r(
                            F,
                            {
                              "open-on-click": !0,
                              "open-on-focus": !0,
                              text: K.value,
                              location: "bottom",
                            },
                            {
                              activator: _(({ props: me }) => [
                                o(
                                  "h2",
                                  W(
                                    {
                                      class:
                                        "text-xl xs:text-2xl font-medium font-bold",
                                    },
                                    me
                                  ),
                                  c(re.value),
                                  17
                                ),
                              ]),
                              _: 1,
                            },
                            8,
                            ["text"]
                          ),
                        ]),
                        o("div", Ke, [
                          R.value || M.value
                            ? (l(),
                              s("div", Xe, c(R.value + ", " + M.value), 1))
                            : i("", !0),
                          o("div", Qe, [
                            o(
                              "div",
                              null,
                              c(e.profile.phone_office || e.profile.phone_cell),
                              1
                            ),
                            e.screenWidth > 768
                              ? (l(), s("div", Ze, " | "))
                              : i("", !0),
                            o("div", null, c(e.profile.email), 1),
                          ]),
                        ]),
                      ]),
                      o("div", et, [
                        tt,
                        o("div", ot, [
                          r(
                            pe,
                            {
                              onClick: ne,
                              starWidth: e.screenWidth > 768 ? 18 : 15,
                              class: A("h-4 cursor-pointer "),
                              indicatorClasses: "text-small h-4 ",
                              starHeight: e.screenWidth > 768 ? 18 : 15,
                              rating: Number(
                                parseFloat(
                                  e.averageRating ? e.averageRating : 0
                                ).toFixed(1)
                              ),
                              isIndicatorActive: !1,
                            },
                            null,
                            8,
                            ["starWidth", "starHeight", "rating"]
                          ),
                          o("div", lt, [o("h2", st, c(e.total_reviews), 1)]),
                        ]),
                        o("div", at, [
                          r(
                            F,
                            {
                              text: I.value && I.value.see_user_posts,
                              location: "left",
                            },
                            {
                              activator: _(({ props: me }) => [
                                o(
                                  "div",
                                  {
                                    onClick: oe,
                                    class:
                                      "active:scale-95 hover:bg-[#f8f9fa] hover:rounded-md",
                                  },
                                  [
                                    o("button", rt, [
                                      o(
                                        "img",
                                        W(
                                          { src: "/images/icons/post_b.png" },
                                          me,
                                          { width: "28", height: "28" }
                                        ),
                                        null,
                                        16
                                      ),
                                    ]),
                                  ]
                                ),
                              ]),
                              _: 1,
                            },
                            8,
                            ["text"]
                          ),
                        ]),
                      ]),
                    ]),
                  ]))
                : i("", !0),
              r(
                be,
                {
                  ref_key: "ratingDialogRef",
                  ref: S,
                  loggedInUserId: C(u),
                  userId: e.profile.user_id,
                },
                null,
                8,
                ["loggedInUserId", "userId"]
              ),
              r(
                xe,
                {
                  ref_key: "postDialogRef",
                  ref: b,
                  contractorId: e.profile.user_id,
                },
                null,
                8,
                ["contractorId"]
              ),
              r(
                Q,
                {
                  submitText: I.value && I.value.okay,
                  onSubmit: p,
                  showCancel: !1,
                  disableOutSideClick: !1,
                  ref_key: "notLoggedDialogRef",
                  ref: d,
                  errorIcon: "",
                  title: I.value && I.value.log_in_error,
                },
                {
                  default: _(() => [
                    o(
                      "div",
                      nt,
                      c(I.value && I.value.you_must_be_logged_in) +
                        " " +
                        c(h.value),
                      1
                    ),
                  ]),
                  _: 1,
                },
                8,
                ["submitText", "title"]
              ),
            ],
            64
          )
        );
      };
    },
  },
  ct = te(it, [["__scopeId", "data-v-13ed17a4"]]),
  dt = (e) => (ie("data-v-be33129d"), (e = e()), ce(), e),
  ut = {
    class:
      "flex justify-center items-center md:justify-between max-md:gap-4 max-md:mb-2",
  },
  mt = { class: "mb-3 max-md:text-center" },
  ft = { class: "flex items-center" },
  gt = dt(() =>
    o(
      "div",
      { class: "font-bold text-sm xs:text-base sm:text-lg ml-1 xs:ml-2" },
      " Region : ",
      -1
    )
  ),
  vt = { class: "text-xs xs:text-sm sm:text-base translate-y-[0px] ml-2" },
  xt = {
    __name: "RegionTradeSection",
    props: { profile: Object, region_name: String, screenWidth: Number },
    setup(e) {
      var m;
      const t = e,
        f = P(),
        d = n((m = t.region_name) != null ? m : "");
      n("#241e6d");
      const x = ge({
          trade1: t.profile.trade1,
          trade2: t.profile.trade2,
          trade3: t.profile.trade3,
          trade4: t.profile.trade4,
          trade5: t.profile.trade5,
          trade6: t.profile.trade6,
          trade7: t.profile.trade7,
          trade8: t.profile.trade8,
          trade9: t.profile.trade9,
          trade10: t.profile.trade10,
          trade11: t.profile.trade11,
          trade12: t.profile.trade12,
          trade13: t.profile.trade13,
          trade14: t.profile.trade14,
          trade15: t.profile.trade15,
          trade16: t.profile.trade16,
          trade17: t.profile.trade17,
          trade18: t.profile.trade18,
          trade19: t.profile.trade19,
          trade20: t.profile.trade20,
          trade21: t.profile.trade21,
          trade22: t.profile.trade22,
          trade23: t.profile.trade23,
          trade24: t.profile.trade24,
          trade25: t.profile.trade25,
          trade26: t.profile.trade26,
          trade27: t.profile.trade27,
          trade28: t.profile.trade28,
          trade29: t.profile.trade29,
          trade30: t.profile.trade30,
        }),
        u = w(() => f.state.contractor.selectedColorScheme || H);
      w(() => ae.filter((v) => x[v.id] === 1));
      const h = w(() => f.getters.translations);
      return (v, y) => {
        const I = O("v-tooltip");
        return (
          l(),
          s(
            D,
            null,
            [
              o("div", ut, [
                r(
                  ye,
                  {
                    class: "text",
                    style: U({
                      marginBottom: e.screenWidth > 768 ? "0px" : "0",
                      fontWeight: 800,
                      fontSize: e.screenWidth > 640 ? "24px" : "20px",
                      color: u.value[3],
                    }),
                    heading: h.value && h.value.trade_groups,
                  },
                  null,
                  8,
                  ["style", "heading"]
                ),
              ]),
              o("div", mt, [
                (l(!0),
                s(
                  D,
                  null,
                  X(
                    C(ae),
                    (a, g) => (
                      l(),
                      s(
                        D,
                        { key: a.name },
                        [
                          x[a.id] === 1
                            ? (l(),
                              E(
                                _e,
                                {
                                  key: 0,
                                  class: "my-1 mx-1 space-x-1 flex",
                                  style: U({
                                    backgroundColor:
                                      g % 2 === 0
                                        ? u.value[4]
                                        : C(ve)(u.value[4], 30),
                                    fontSize: "10px",
                                    paddingTop: "6px",
                                    paddingBottom: "6px",
                                  }),
                                },
                                { default: _(() => [ee(c(a.name), 1)]), _: 2 },
                                1032,
                                ["style"]
                              ))
                            : i("", !0),
                        ],
                        64
                      )
                    )
                  ),
                  128
                )),
              ]),
              d.value
                ? (l(),
                  s(
                    "div",
                    {
                      key: 0,
                      class:
                        "flex items-center justify-center md:justify-between w-full gap-2 xs:gap-4 mt-2 sm:mt-0",
                      style: U({ color: u.value[2] }),
                    },
                    [
                      o("div", ft, [
                        r(
                          I,
                          { text: "Region", location: "top" },
                          {
                            activator: _(({ props: a }) => [
                              r(
                                C(N),
                                W(a, {
                                  class: "w-6 h-6 sm:w-8 sm:h-8",
                                  icon: "mdi:location",
                                  color: u.value[3],
                                }),
                                null,
                                16,
                                ["color"]
                              ),
                            ]),
                            _: 1,
                          }
                        ),
                        gt,
                        o("div", vt, c(d.value), 1),
                      ]),
                    ],
                    4
                  ))
                : i("", !0),
            ],
            64
          )
        );
      };
    },
  },
  ht = te(xt, [["__scopeId", "data-v-be33129d"]]),
  _t = { key: 0, class: "flex justify-center mb-3" },
  pt = { key: 1, class: "text-xl sm:text-2xl font-medium font-extrabold" },
  bt = { key: 2, class: "text-lg sm:text-xl font-medium font-bold" },
  yt = { key: 3, class: "text-base sm:text-lg font-semibold" },
  wt = { key: 0 },
  kt = { key: 1 },
  $t = { key: 2 },
  It = { key: 3 },
  Ct = { key: 4 },
  St = {
    class:
      "flex flex-col gap-1 mt-3 md:mt-6 max-md:items-center text-sm md:text-base",
  },
  Wt = ["href"],
  Tt = ["href"],
  jt = ["href"],
  Ut = ["href"],
  Nt = ["href"],
  Lt = {
    __name: "AdditionalInfoSection",
    props: { profile: Object, screenWidth: Number },
    setup(e) {
      const t = e;
      n("#241e6d");
      const f = P(),
        d = n(t.profile.company_name);
      n(t.profile.company_logo);
      const x = n(t.profile.phone_cell),
        u = n(t.profile.phone_office),
        h = n(t.profile.address_1),
        m = n(t.profile.address_2),
        v = n(t.profile.city),
        y = n(t.profile.state);
      n(t.profile.county);
      const I = n(t.profile.zipcode),
        a = w(() => f.state.contractor.selectedColorScheme || H),
        g = w(() => f.getters.translations),
        p = ($) =>
          $
            ? $.startsWith("http://") || $.startsWith("https://")
              ? $
              : `http://${$}`
            : "";
      return ($, S) => {
        const b = O("v-tooltip");
        return (
          l(),
          s(
            D,
            null,
            [
              o(
                "div",
                {
                  style: U({ color: a.value[2] }),
                  class: "flex flex-col justify-center text-center",
                },
                [
                  e.profile.user_avatar
                    ? (l(),
                      s("div", _t, [
                        r(
                          he,
                          { imageSrc: `/${e.profile.user_avatar}` },
                          null,
                          8,
                          ["imageSrc"]
                        ),
                      ]))
                    : i("", !0),
                  d.value ? (l(), s("h2", pt, c(d.value), 1)) : i("", !0),
                  h.value || m.value
                    ? (l(), s("div", bt, c(h.value || m.value), 1))
                    : i("", !0),
                  v.value || y.value || I.value
                    ? (l(),
                      s(
                        "span",
                        yt,
                        c(v.value + ", " + y.value + " " + I.value),
                        1
                      ))
                    : i("", !0),
                ],
                4
              ),
              o(
                "div",
                {
                  class:
                    "flex flex-col justify-start mt-3 md:mt-6 text-base md:text-lg max-md:items-center font-semibold emailPhoneSection",
                  style: U({ color: a.value[2] }),
                },
                [
                  m.value
                    ? (l(),
                      s("div", wt, [
                        r(
                          b,
                          { text: "Alternative Address", location: "top" },
                          {
                            activator: _(({ props: k }) => [
                              r(
                                C(N),
                                W(k, {
                                  color: a.value[3],
                                  icon: "entypo:address",
                                  class: "w-5 h-5",
                                }),
                                null,
                                16,
                                ["color"]
                              ),
                            ]),
                            _: 1,
                          }
                        ),
                        o("div", null, c(m.value), 1),
                      ]))
                    : i("", !0),
                  u.value
                    ? (l(),
                      s("div", kt, [
                        r(
                          b,
                          { text: "Phone Office", location: "top" },
                          {
                            activator: _(({ props: k }) => [
                              r(
                                C(N),
                                W(k, {
                                  color: a.value[3],
                                  icon: "wpf:phone-office",
                                  class: "w-5 h-5",
                                }),
                                null,
                                16,
                                ["color"]
                              ),
                            ]),
                            _: 1,
                          }
                        ),
                        o("div", null, c(u.value), 1),
                      ]))
                    : x.value
                    ? (l(),
                      s("div", $t, [
                        r(
                          b,
                          { text: "Phone Cell", location: "top" },
                          {
                            activator: _(({ props: k }) => [
                              r(
                                C(N),
                                W(k, {
                                  color: a.value[3],
                                  icon: "ic:baseline-phone",
                                  class: "w-5 h-5",
                                }),
                                null,
                                16,
                                ["color"]
                              ),
                            ]),
                            _: 1,
                          }
                        ),
                        o("div", null, c(x.value), 1),
                      ]))
                    : i("", !0),
                  e.profile.email
                    ? (l(),
                      s("div", It, [
                        r(
                          b,
                          { text: "Email", location: "top" },
                          {
                            activator: _(({ props: k }) => [
                              r(
                                C(N),
                                W(k, {
                                  color: a.value[3],
                                  icon: "bi:envelope-fill",
                                  class: "w-5 h-5",
                                }),
                                null,
                                16,
                                ["color"]
                              ),
                            ]),
                            _: 1,
                          }
                        ),
                        o("div", null, c(e.profile.email), 1),
                      ]))
                    : i("", !0),
                  e.profile.county
                    ? (l(),
                      s("div", Ct, [
                        r(
                          b,
                          { text: "County", location: "top" },
                          {
                            activator: _(({ props: k }) => [
                              r(
                                C(N),
                                W(k, {
                                  color: a.value[3],
                                  icon: "tabler:location-filled",
                                  class: "w-5 h-5",
                                }),
                                null,
                                16,
                                ["color"]
                              ),
                            ]),
                            _: 1,
                          }
                        ),
                        o("div", null, "County: " + c(e.profile.county), 1),
                      ]))
                    : i("", !0),
                  o("div", St, [
                    e.profile.website_url
                      ? (l(),
                        s(
                          "a",
                          { key: 0, href: p(e.profile.website_url) },
                          [
                            r(
                              b,
                              { text: "Website", location: "top" },
                              {
                                activator: _(({ props: k }) => [
                                  r(
                                    C(N),
                                    W(k, {
                                      icon: "fluent-mdl2:website",
                                      color: a.value[3],
                                      class: "``",
                                    }),
                                    null,
                                    16,
                                    ["color"]
                                  ),
                                ]),
                                _: 1,
                              }
                            ),
                            o("div", null, c(e.profile.website_url), 1),
                          ],
                          8,
                          Wt
                        ))
                      : i("", !0),
                    e.profile.facebook
                      ? (l(),
                        s(
                          "a",
                          { key: 1, href: p(e.profile.facebook) },
                          [
                            r(
                              b,
                              { text: "Facebook", location: "top" },
                              {
                                activator: _(({ props: k }) => [
                                  r(
                                    C(N),
                                    W(k, { icon: "logos:facebook", class: "" }),
                                    null,
                                    16
                                  ),
                                ]),
                                _: 1,
                              }
                            ),
                            o(
                              "div",
                              null,
                              c(g.value && g.value.follow_us_on) + " Facebook",
                              1
                            ),
                          ],
                          8,
                          Tt
                        ))
                      : i("", !0),
                    e.profile.twitter
                      ? (l(),
                        s(
                          "a",
                          { key: 2, href: p(e.profile.twitter) },
                          [
                            r(
                              b,
                              { text: "Twitter", location: "top" },
                              {
                                activator: _(({ props: k }) => [
                                  r(
                                    C(N),
                                    W(k, {
                                      icon: "fa6-brands:square-x-twitter",
                                      color: "black",
                                      class: "",
                                    }),
                                    null,
                                    16
                                  ),
                                ]),
                                _: 1,
                              }
                            ),
                            o(
                              "div",
                              null,
                              c(g.value && g.value.follow_us_on) + " Twitter",
                              1
                            ),
                          ],
                          8,
                          jt
                        ))
                      : i("", !0),
                    e.profile.tiktok
                      ? (l(),
                        s(
                          "a",
                          { key: 3, href: p(e.profile.tiktok) },
                          [
                            r(
                              b,
                              { text: "TikTok", location: "top" },
                              {
                                activator: _(({ props: k }) => [
                                  r(
                                    C(N),
                                    W(k, {
                                      icon: "logos:tiktok-icon",
                                      class: "",
                                    }),
                                    null,
                                    16
                                  ),
                                ]),
                                _: 1,
                              }
                            ),
                            o(
                              "div",
                              null,
                              c(g.value && g.value.follow_us_on) + " Tiktok",
                              1
                            ),
                          ],
                          8,
                          Ut
                        ))
                      : i("", !0),
                    e.profile.instagram
                      ? (l(),
                        s(
                          "a",
                          { key: 4, href: p(e.profile.instagram) },
                          [
                            r(
                              b,
                              { text: "Instagram", location: "top" },
                              {
                                activator: _(({ props: k }) => [
                                  r(
                                    C(N),
                                    W(k, {
                                      icon: "skill-icons:instagram",
                                      class: "",
                                    }),
                                    null,
                                    16
                                  ),
                                ]),
                                _: 1,
                              }
                            ),
                            o(
                              "div",
                              null,
                              c(g.value && g.value.follow_us_on) + " Instagram",
                              1
                            ),
                          ],
                          8,
                          Nt
                        ))
                      : i("", !0),
                  ]),
                ],
                4
              ),
            ],
            64
          )
        );
      };
    },
  },
  Dt = te(Lt, [["__scopeId", "data-v-16354b07"]]),
  Rt = {
    key: 0,
    class: A(
      "mt-1 flex gap-1  flex-col rounded-lg closing w-full max-w-[1400px] px-3 sm:px-10 mx-auto"
    ),
  },
  At = ["innerHTML"],
  Vt = {
    __name: "BottomTitleText",
    props: {
      screenWidth: { type: [String, Number] },
      bottom_text: { type: String },
    },
    setup(e) {
      const d = n(
          ((m) => {
            const v = document.createElement("textarea");
            return (v.innerHTML = m), v.value;
          })(e.bottom_text)
        ),
        x = w(() => {
          const v = new DOMParser().parseFromString(d.value, "text/html");
          return (
            v.querySelectorAll("a").forEach((y) => {
              const I = y.getAttribute("href");
              !I.startsWith("http://") &&
                !I.startsWith("https://") &&
                y.setAttribute("href", "http://" + I),
                (y.target = "_blank");
            }),
            v.body.innerHTML
          );
        }),
        u = n(!1),
        h = () => {
          const m = document.getElementById("dialogContainer");
          (window.scrollY > 100 || m.scrollTop > 100) &&
            (console.log("in animation"), (u.value = !0));
        };
      return (m, v) => {
        const y = $e("intersect");
        return x.value
          ? de(
              (l(),
              s("div", Rt, [
                o(
                  "div",
                  {
                    class: A([
                      "default ck-content duration-1000 transition-all",
                      {
                        "translate-y-0": e.screenWidth > 768 && u.value,
                        "translate-y-[200px]": e.screenWidth > 768 && !u.value,
                      },
                    ]),
                    innerHTML: x.value,
                  },
                  null,
                  10,
                  At
                ),
              ])),
              [[y, { handler: h, options: { threshold: [0, 0.5, 1] } }]]
            )
          : i("", !0);
      };
    },
  },
  Pt = {
    key: 0,
    class: A(
      "mt-1 flex gap-1  flex-col rounded-lg closing w-full px-3 sm:px-10 max-w-[1400px] mx-auto"
    ),
  },
  Ht = ["innerHTML"],
  Bt = {
    __name: "ClosingTitleText",
    props: {
      screenWidth: { type: [String, Number] },
      loggedInUserId: [String, Number],
      closing_text: { type: String },
      userId: [String, Number],
    },
    setup(e) {
      const t = e,
        f = (m) => {
          const v = document.createElement("textarea");
          return (v.innerHTML = m), console.log("here"), v.value;
        },
        d = P(),
        x = n(f(t.closing_text));
      n(!1), w(() => d.state.contractor.selectedColorScheme || H);
      const u = n(!1),
        h = () => {
          const m = document.getElementById("dialogContainer");
          (window.scrollY > 100 || m.scrollTop > 100) &&
            (console.log("in animation"), (u.value = !0));
        };
      return (m, v) => {
        const y = $e("intersect");
        return x.value
          ? de(
              (l(),
              s("div", Pt, [
                o(
                  "div",
                  {
                    class: A([
                      "default duration-1000 transition-al",
                      {
                        "translate-y-0": e.screenWidth > 768 && u.value,
                        "translate-y-[200px]": e.screenWidth > 768 && !u.value,
                      },
                    ]),
                    innerHTML: x.value,
                  },
                  null,
                  10,
                  Ht
                ),
              ])),
              [[y, { handler: h, options: { threshold: [0, 0.5, 1] } }]]
            )
          : i("", !0);
      };
    },
  },
  Ot = { key: 0, class: "bg-[#f8f8f8] py-10 sm:py-20" },
  Et = {
    class:
      "w-full p-4 md:p-6 font-bold md:font-extrabold text-xl px-3 sm:px-10 md:text-3xl font-bold md:font-extrabold text-center w-full max-w-[1400px] px-3 sm:px-10 mx-auto",
  },
  Ft = { key: 1, class: "w-full h-full bg-[#2d2c2b] py-10 sm:py-20" },
  Mt = ["onClick", "src"],
  Gt = { key: 2, class: "bg-[#f8f8f8] py-10 sm:py-20 overflow-hidden" },
  zt = {
    class:
      "flex max-md:flex-col gap-2 md:gap-4 items-center max-w-[1400px] px-3 sm:px-10 mx-auto w-full",
  },
  qt = ["onClick", "src"],
  Yt = ["onClick"],
  Jt = ["src"],
  Kt = {
    class: "absolute inset-0 flex justify-center items-center",
    style: {
      background: `radial-gradient(
              ellipse at center,
              rgba(0, 0, 0, 0.5) 0%,
              rgba(0, 0, 0, 0) 55%
            )`,
    },
  },
  Xt = {
    class:
      "max-h-[400px] md:max-h-[500px] w-full flex justify-center xs:w-[400px] md:w-[600px] bg-[#222]",
  },
  Qt = ["src"],
  Zt = {
    __name: "BragSection",
    props: {
      screenWidth: { type: [String, Number] },
      brag_sections: { type: Array },
      contractorId: { type: Number },
    },
    setup(e) {
      const t = e,
        f = P(),
        d = n(t.brag_sections),
        x = n(""),
        u = n(),
        h = w(() => f.state.contractor.selectedColorScheme || H),
        m = w(() => f.getters.translations),
        v = (p) => {
          (x.value = p), u.value.openDialog();
        },
        y = n(Array(d.value.length).fill(!1)),
        I = n(Array(d.value.length).fill(!1)),
        a = (p) => {
          console.log("show animation");
          const $ = document.getElementById("dialogContainer");
          (window.scrollY > 100 || $.scrollTop > 100) &&
            (console.log("in animation for section:", p), (y.value[p] = !0));
        },
        g = (p) => {
          const $ = document.getElementById("dialogContainer");
          (window.scrollY > 100 || $.scrollTop > 100) && (I.value[p] = !0);
        };
      return (p, $) => {
        const S = $e("intersect");
        return (
          l(),
          s(
            D,
            null,
            [
              d.value && d.value.length > 0
                ? (l(),
                  s(
                    "div",
                    {
                      key: 0,
                      style: U({ color: h.value[2] }),
                      class: "flex flex-col text-[#2d2c2b]",
                    },
                    [
                      (l(!0),
                      s(
                        D,
                        null,
                        X(
                          d.value,
                          (b, k) => (
                            l(),
                            s("div", { key: b.id }, [
                              !b.section_image && b.section_text
                                ? (l(),
                                  s("div", Ot, [
                                    o("div", Et, c(b.section_text), 1),
                                  ]))
                                : i("", !0),
                              b.section_image && !b.section_text
                                ? (l(),
                                  s("div", Ft, [
                                    o(
                                      "img",
                                      {
                                        onClick: (z) => v(b.section_image),
                                        src: b.section_image,
                                        alt: "Section Image",
                                        class:
                                          "object-cover w-full max-w-[1400px] px-3 sm:px-10 mx-auto",
                                      },
                                      null,
                                      8,
                                      Mt
                                    ),
                                  ]))
                                : i("", !0),
                              b.section_image && b.section_text && k % 2 !== 0
                                ? de(
                                    (l(),
                                    s("div", Gt, [
                                      o("div", zt, [
                                        o(
                                          "div",
                                          {
                                            class: A([
                                              "w-full md:w-2/5 text-xl md:text-3xl font-bold md:font-extrabold md:w-2/5 text-xl md:text-3xl font-bold md:font-extrabold text-left text-[#2d2c2b] duration-700 transition-all",
                                              {
                                                "translate-y-0":
                                                  e.screenWidth > 768 &&
                                                  y.value[k],
                                                "translate-y-[600px]":
                                                  e.screenWidth > 768 &&
                                                  !y.value[k],
                                              },
                                            ]),
                                          },
                                          c(b.section_text),
                                          3
                                        ),
                                        o(
                                          "div",
                                          {
                                            class: A([
                                              "relative w-full md:w-3/5 h-3/5 bg-[#222] rounded-md overflow-hidden transition-all duration-1000 transitioning",
                                              { reveal: y.value[k] },
                                            ]),
                                          },
                                          [
                                            o(
                                              "img",
                                              {
                                                onClick: (z) =>
                                                  v(b.section_image),
                                                src: b.section_image,
                                                alt: "Section Image",
                                                class:
                                                  "object-cover w-full rounded-md",
                                              },
                                              null,
                                              8,
                                              qt
                                            ),
                                          ],
                                          2
                                        ),
                                      ]),
                                    ])),
                                    [
                                      [
                                        S,
                                        {
                                          handler: () => a(k),
                                          options: { threshold: [0.1] },
                                        },
                                      ],
                                    ]
                                  )
                                : i("", !0),
                              b.section_image && b.section_text && k % 2 === 0
                                ? (l(),
                                  s(
                                    "div",
                                    {
                                      key: 3,
                                      onClick: (z) => v(b.section_image),
                                      class:
                                        "bg-[#2d2c2b] py-10 sm:py-20 relative",
                                    },
                                    [
                                      o(
                                        "img",
                                        {
                                          class:
                                            "max-w-[1400px] overflow-hidden hover:scale-110 hover:cursor-pointer z-50 mx-auto w-full object-cover w-full rounded-md",
                                          src: b.section_image,
                                          alt: "Section Image",
                                        },
                                        null,
                                        8,
                                        Jt
                                      ),
                                      de(
                                        (l(),
                                        s("div", Kt, [
                                          o(
                                            "span",
                                            {
                                              style: { color: "#fff" },
                                              class: A([
                                                {
                                                  "translate-y-0":
                                                    e.screenWidth > 768 &&
                                                    I.value[k],
                                                  "translate-y-[600px]":
                                                    e.screenWidth > 768 &&
                                                    !I.value[k],
                                                },
                                                "text-center transitioning text-xl md:text-3xl font-bold md:font-extrabold text-xl md:text-3xl font-bold md:font-extrabold bg-opacity-50 p-2 rounded",
                                              ]),
                                            },
                                            c(b.section_text),
                                            3
                                          ),
                                        ])),
                                        [
                                          [
                                            S,
                                            {
                                              handler: () => g(k),
                                              options: { threshold: [0.5] },
                                            },
                                          ],
                                        ]
                                      ),
                                    ],
                                    8,
                                    Yt
                                  ))
                                : i("", !0),
                            ])
                          )
                        ),
                        128
                      )),
                    ],
                    4
                  ))
                : i("", !0),
              r(
                Q,
                {
                  dialogWidth: "widthAuto",
                  showFooter: !1,
                  ref_key: "imageIncDialogRef",
                  ref: u,
                  title: m.value && m.value.your_image,
                },
                {
                  default: _(() => [
                    o("div", Xt, [o("img", { src: x.value }, null, 8, Qt)]),
                  ]),
                  _: 1,
                },
                8,
                ["title"]
              ),
            ],
            64
          )
        );
      };
    },
  },
  eo = te(Zt, [["__scopeId", "data-v-442b462a"]]),
  to = { key: 0, class: "bg-[#f8f8f8] py-10 sm:py-20" },
  oo = {
    class:
      "w-full p-4 md:p-6 font-bold md:font-extrabold text-xl md:text-3xl font-bold md:font-extrabold text-center w-full max-w-[1400px] px-3 sm:px-10 mx-auto",
  },
  lo = { key: 1, class: "w-full h-full bg-[#2d2c2b] py-10 sm:py-20" },
  so = ["onClick", "src"],
  ao = { key: 2, class: "bg-[#f8f8f8] py-10 sm:py-20 overflow-hidden" },
  ro = {
    class:
      "flex max-md:flex-col gap-2 md:gap-4 items-center max-w-[1400px] mx-auto w-full px-3 sm:px-10",
  },
  no = ["onClick", "src"],
  io = ["onClick"],
  co = ["src"],
  uo = {
    class: "absolute inset-0 flex justify-center items-center overflow-hidden",
    style: {
      background: `radial-gradient(
              ellipse at center,
              rgba(0, 0, 0, 0.5) 0%,
              rgba(0, 0, 0, 0) 55%
            )`,
    },
  },
  mo = {
    class:
      "max-h-[400px] md:max-h-[500px] w-full flex justify-center xs:w-[400px] md:w-[600px] bg-[#222]",
  },
  fo = ["src"],
  go = {
    __name: "ImageTextSection",
    props: {
      screenWidth: { type: [String, Number] },
      image_sections: { type: Array },
      contractorId: { type: Number },
    },
    setup(e) {
      const t = e,
        f = P(),
        d = n(t.image_sections),
        x = n(""),
        u = n(),
        h = w(() => f.state.contractor.selectedColorScheme || H),
        m = w(() => f.getters.translations),
        v = n(Array(d.value.length).fill(!1)),
        y = n(Array(d.value.length).fill(!1));
      n();
      const I = (p) => {
          const $ = document.getElementById("dialogContainer");
          (window.scrollY > 100 || $.scrollTop > 100) && (v.value[p] = !0);
        },
        a = (p) => {
          const $ = document.getElementById("dialogContainer");
          (window.scrollY > 100 || $.scrollTop > 100) && (y.value[p] = !0);
        },
        g = (p) => {
          (x.value = p), console.log("infunction call"), u.value.openDialog();
        };
      return (p, $) => {
        const S = $e("intersect");
        return (
          l(),
          s(
            D,
            null,
            [
              d.value && d.value.length > 0
                ? (l(),
                  s(
                    "div",
                    {
                      key: 0,
                      style: U({ color: h.value[2] }),
                      class: "flex flex-col text-[#2d2c2b]",
                    },
                    [
                      (l(!0),
                      s(
                        D,
                        null,
                        X(
                          d.value,
                          (b, k) => (
                            l(),
                            s("div", { key: b.id }, [
                              !b.section_image && b.section_text
                                ? (l(),
                                  s("div", to, [
                                    o("div", oo, c(b.section_text), 1),
                                  ]))
                                : i("", !0),
                              b.section_image && !b.section_text
                                ? (l(),
                                  s("div", lo, [
                                    o(
                                      "img",
                                      {
                                        onClick: (z) => g(b.section_image),
                                        src: b.section_image,
                                        alt: "Section Image",
                                        class:
                                          "object-cover w-full max-w-[1400px] px-3 sm:px-10 mx-auto",
                                      },
                                      null,
                                      8,
                                      so
                                    ),
                                  ]))
                                : i("", !0),
                              b.section_image && b.section_text && k % 2 !== 0
                                ? de(
                                    (l(),
                                    s("div", ao, [
                                      o("div", ro, [
                                        o(
                                          "div",
                                          {
                                            class: A([
                                              "w-full md:w-2/5 text-xl md:text-3xl font-bold md:font-extrabold md:w-2/5 text-xl md:text-3xl font-bold md:font-extrabold text-left text-[#2d2c2b] duration-1000 transition-all",
                                              {
                                                "translate-y-0":
                                                  e.screenWidth > 768 &&
                                                  v.value[k],
                                                "translate-y-[600px]":
                                                  e.screenWidth > 768 &&
                                                  !v.value[k],
                                              },
                                            ]),
                                          },
                                          c(b.section_text),
                                          3
                                        ),
                                        o(
                                          "div",
                                          {
                                            class: A([
                                              "relative w-full md:w-3/5 h-3/5 bg-[#222] rounded-md overflow-hidden transition-all duration-1000 transitioning",
                                              { reveal: v.value[k] },
                                            ]),
                                          },
                                          [
                                            o(
                                              "img",
                                              {
                                                onClick: (z) =>
                                                  g(b.section_image),
                                                src: b.section_image,
                                                alt: "Section Image",
                                                class:
                                                  "object-cover w-full rounded-md",
                                              },
                                              null,
                                              8,
                                              no
                                            ),
                                          ],
                                          2
                                        ),
                                      ]),
                                    ])),
                                    [
                                      [
                                        S,
                                        {
                                          handler: () => I(k),
                                          options: { threshold: [0.1] },
                                        },
                                      ],
                                    ]
                                  )
                                : i("", !0),
                              b.section_image && b.section_text && k % 2 === 0
                                ? (l(),
                                  s(
                                    "div",
                                    {
                                      key: 3,
                                      onClick: (z) => g(b.section_image),
                                      class:
                                        "bg-[#2d2c2b] py-10 sm:py-20 relative",
                                    },
                                    [
                                      o(
                                        "img",
                                        {
                                          class:
                                            "max-w-[1400px] px-3 sm:px-10 overflow-hidden hover:scale-110 hover:cursor-pointer z-50 mx-auto w-full object-cover w-full rounded-md",
                                          src: b.section_image,
                                          alt: "Section Image",
                                        },
                                        null,
                                        8,
                                        co
                                      ),
                                      de(
                                        (l(),
                                        s("div", uo, [
                                          o(
                                            "span",
                                            {
                                              style: { color: "#fff" },
                                              class: A([
                                                {
                                                  "translate-y-0":
                                                    e.screenWidth > 768 &&
                                                    y.value[k],
                                                  "translate-y-[600px]":
                                                    e.screenWidth > 768 &&
                                                    !y.value[k],
                                                },
                                                "text-center text-xl transitioning md:text-3xl font-bold md:font-extrabold text-xl md:text-3xl font-bold md:font-extrabold bg-opacity-50 p-4 rounded",
                                              ]),
                                            },
                                            c(b.section_text),
                                            3
                                          ),
                                        ])),
                                        [
                                          [
                                            S,
                                            {
                                              quiet: !0,
                                              handler: () => a(k),
                                              options: { threshold: [0.5] },
                                            },
                                          ],
                                        ]
                                      ),
                                    ],
                                    8,
                                    io
                                  ))
                                : i("", !0),
                            ])
                          )
                        ),
                        128
                      )),
                    ],
                    4
                  ))
                : i("", !0),
              r(
                Q,
                {
                  dialogWidth: "widthAuto",
                  showFooter: !1,
                  ref_key: "imageIncDialogRef",
                  ref: u,
                  title: m.value && m.value.your_image,
                },
                {
                  default: _(() => [
                    o("div", mo, [o("img", { src: x.value }, null, 8, fo)]),
                  ]),
                  _: 1,
                },
                8,
                ["title"]
              ),
            ],
            64
          )
        );
      };
    },
  },
  vo = te(go, [["__scopeId", "data-v-a4e46067"]]),
  xo = { key: 0 },
  ho = { key: 0, class: "flex flex-col" },
  _o = { class: "" },
  po = { key: 0 },
  bo = {
    key: 1,
    class: "bg-[#f8f2e8] py-10 sm:py-20 overflow-hidden",
    style: { color: "#2d2c2b" },
  },
  yo = {
    class:
      "flex flex-col md:flex-row gap-2 items-stretch max-w-[1400px] px-3 sm:px-10 mx-auto w-full py-10 sm:py-20",
  },
  wo = { key: 2 },
  ko = { key: 3 },
  $o = {
    class: "flex gap-2 overflow-hidden flex-col bg-[#f8f2e8] py-10 sm:py-20",
    style: { color: "#2d2c2b" },
  },
  Io = {
    __name: "Template1",
    props: {
      profile: Object,
      loggedInUserId: [String, Number],
      region_name: String,
      total_reviews: [Number, String],
      average_rating: [Number, String],
      screenWidth: Number,
      starPercentages: { type: Array, default: [] },
    },
    setup(e) {
      const t = P(),
        f = w(() => t.state.contractor.selectedColorScheme || H);
      return (d, x) =>
        e.profile
          ? (l(),
            s("div", xo, [
              e.profile
                ? (l(),
                  s("div", ho, [
                    o("div", _o, [
                      r(
                        ct,
                        {
                          screenWidth: e.screenWidth,
                          loggedInUserId: e.loggedInUserId,
                          averageRating: e.average_rating,
                          total_reviews: e.total_reviews,
                          profile: e.profile,
                        },
                        null,
                        8,
                        [
                          "screenWidth",
                          "loggedInUserId",
                          "averageRating",
                          "total_reviews",
                          "profile",
                        ]
                      ),
                    ]),
                    e.profile.image_sections &&
                    e.profile.image_sections.length > 0
                      ? (l(),
                        s("div", po, [
                          r(
                            vo,
                            {
                              image_sections: e.profile.image_sections,
                              "contractor-id": e.profile.id,
                              "screen-width": e.screenWidth,
                            },
                            null,
                            8,
                            ["image_sections", "contractor-id", "screen-width"]
                          ),
                        ]))
                      : i("", !0),
                    e.profile.bottom_text
                      ? (l(),
                        s("div", bo, [
                          r(
                            Vt,
                            {
                              bottom_text: e.profile.bottom_text,
                              "screen-width": e.screenWidth,
                            },
                            null,
                            8,
                            ["bottom_text", "screen-width"]
                          ),
                        ]))
                      : i("", !0),
                    o("div", yo, [
                      r(
                        le,
                        {
                          shadowLevel: 2,
                          cardInnerClasses: "h-full",
                          bgColor: f.value[1],
                          isInside: !0,
                          class: "h-auto md:w-3/5",
                          padding: e.screenWidth < 640 ? "7px" : "20px",
                        },
                        {
                          default: _(() => [
                            r(
                              Dt,
                              {
                                class: "",
                                screenWidth: e.screenWidth,
                                profile: e.profile,
                              },
                              null,
                              8,
                              ["screenWidth", "profile"]
                            ),
                          ]),
                          _: 1,
                        },
                        8,
                        ["bgColor", "padding"]
                      ),
                      r(
                        le,
                        {
                          shadowLevel: 2,
                          bgColor: f.value[1],
                          cardInnerClasses: "h-full",
                          isInside: !0,
                          class: "h-auto md:w-2/5",
                          padding: e.screenWidth < 640 ? "7px" : "20px",
                        },
                        {
                          default: _(() => [
                            r(
                              ht,
                              {
                                screenWidth: e.screenWidth,
                                region_name: e.region_name,
                                profile: e.profile,
                              },
                              null,
                              8,
                              ["screenWidth", "region_name", "profile"]
                            ),
                          ]),
                          _: 1,
                        },
                        8,
                        ["bgColor", "padding"]
                      ),
                    ]),
                    e.profile.brag_sections &&
                    e.profile.brag_sections.length > 0
                      ? (l(),
                        s("div", wo, [
                          r(
                            eo,
                            {
                              brag_sections: e.profile.brag_sections,
                              "contractor-id": e.profile.id,
                              "screen-width": e.screenWidth,
                            },
                            null,
                            8,
                            ["brag_sections", "contractor-id", "screen-width"]
                          ),
                        ]))
                      : i("", !0),
                    e.profile.bottom_text || e.profile.closing_text
                      ? (l(),
                        s("div", ko, [
                          o("div", $o, [
                            r(
                              Bt,
                              {
                                userId: e.profile.user_id,
                                loggedInUserId: e.loggedInUserId,
                                closing_text: e.profile.closing_text,
                                "screen-width": e.screenWidth,
                              },
                              null,
                              8,
                              [
                                "userId",
                                "loggedInUserId",
                                "closing_text",
                                "screen-width",
                              ]
                            ),
                          ]),
                        ]))
                      : i("", !0),
                  ]))
                : i("", !0),
            ]))
          : i("", !0);
    },
  },
  Co = { key: 0, class: "flex gap-2 mb-1 items-center" },
  So = { class: "flex justify-center mb-3" },
  Wo = { class: "text-center" },
  To = { class: "flex text-xl font-semibold mt-1 flex-col justify-center" },
  jo = { key: 0, class: "self-center text-base md:text-xl" },
  Uo = { class: "flex max-md:flex-col items-center justify-center" },
  No = {
    key: 0,
    class: "mx-2 flex justify-center items-center translate-y-[-1px]",
  },
  Lo = { class: "flex flex-col md:mt-2 justify-center items-center" },
  Do = { class: "md:mt-2" },
  Ro = {
    class:
      "font-light mt-2 md:text-base text-sm overflow-hidden tracking-tighter",
  },
  Ao = { class: "flex items-center gap-1" },
  Vo = o(
    "div",
    { class: "" },
    [
      o("img", {
        src: "/images/icons/pre-diamond.png",
        width: "20",
        height: "30",
      }),
    ],
    -1
  ),
  Po = { class: "flex gap-2 sm:gap-3 translate-x-[-2px]" },
  Ho = {
    class:
      "xs:text-md w-[28px] h-[28px] xs:w-[35px] xs:h-[35px] font-semibold flex items-center justify-center",
  },
  Bo = { class: "flex flex-col gap-1" },
  Oo = { class: "mb-4 sm:mb-0 mt-4" },
  Eo = {
    __name: "ProfileHeader2",
    props: {
      profile: Object,
      loggedInUserId: [String, Number],
      screenWidth: Number,
      averageRating: { type: Number, default: 0 },
      total_reviews: { type: Number, default: 0 },
    },
    setup(e) {
      var oe, Z;
      const t = e,
        f = n(!1);
      let d = fe().props.value;
      (oe = d == null ? void 0 : d.auth) == null || oe.user;
      const x = (Z = d == null ? void 0 : d.profile) == null ? void 0 : Z.id,
        u = n(""),
        h = n(),
        m = n(!0);
      ue(() => {
        const j = localStorage.getItem("showGoBack");
        j === "false" && (m.value = !1),
          console.log(j),
          localStorage.removeItem("showGoBack");
      });
      const v = () => {
          h.value.closeDialog();
        },
        y = () => {
          h.value.openDialog();
        },
        I = n(),
        a = n(),
        g = () => {
          if (J.value !== 3) {
            S.commit("setIsUpgradeToGoldPlatinumDialogOpen", !0);
            return;
          }
          p(window.location.href) && (f.value = !0);
        };
      function p(j) {
        const L = document.createElement("textarea");
        (L.value = j), document.body.appendChild(L), L.select();
        let B;
        try {
          B = document.execCommand("copy");
        } catch (q) {
          console.error("Failed to copy text: ", q), (B = !1);
        }
        return document.body.removeChild(L), B;
      }
      const $ = () => {
          const j = localStorage.getItem("prevUrl");
          console.log(j),
            j === "/post"
              ? Y.Inertia.visit(j)
              : j === "/edit"
              ? Y.Inertia.visit(`/contractor/${t.profile.user_id}/edit`)
              : j === "/settings"
              ? Y.Inertia.visit("/settings")
              : Y.Inertia.visit("/sub-finder");
        },
        S = P();
      n("#241e6d");
      const b = n(t.profile.first_name),
        k = n(t.profile.last_name);
      n(t.profile.user_avatar);
      const z = n(t.profile.company_name),
        V = n(t.profile.city),
        G = n(t.profile.state),
        T = w(() => S.getters.translations),
        J = w(() => S.getters.userVersion),
        R = w(() => S.state.contractor.selectedColorScheme || H),
        M = w(() => b.value + " " + k.value),
        K = w(() => {
          if (
            (console.log("here in teh trunctated", t.screenWidth),
            t.screenWidth < 600)
          ) {
            const j = t.screenWidth < 400 ? 30 : 34;
            return M.value.length > j
              ? M.value.substring(0, j) + "..."
              : M.value;
          } else return b.value + " " + k.value;
        }),
        re = () => {
          x ? I.value.openDialog() : ((u.value = "ratings"), y());
        },
        ne = () => {
          x ? a.value.openDialog() : ((u.value = "posts"), y());
        };
      return (j, L) => {
        const B = O("v-tooltip"),
          q = O("Link"),
          se = O("v-snackbar");
        return (
          l(),
          s(
            D,
            null,
            [
              m.value
                ? (l(),
                  s("div", Co, [
                    o("div", { onClick: $, class: "cursor-pointer" }, [
                      r(
                        C(N),
                        {
                          class: "w-6 h-6",
                          icon: "ion:arrow-back",
                          color: R.value[3],
                        },
                        null,
                        8,
                        ["color"]
                      ),
                    ]),
                    o(
                      "div",
                      {
                        onClick: $,
                        class:
                          "font-bold cursor-pointer translate-y-[1px] flex justify-center items-center text-xl leading-tight",
                        style: U({ color: R.value[3] }),
                      },
                      c(T.value && T.value.go_back),
                      5
                    ),
                  ]))
                : i("", !0),
              o(
                "div",
                { class: "flex gap-2", style: U({ color: R.value[2] }) },
                [
                  o(
                    "div",
                    { class: A(`${e.screenWidth > 768 ? "w-3/4" : "w-4/5"}`) },
                    [
                      o("div", So, [
                        r(
                          Ie,
                          {
                            imageClass: "companyLogo",
                            imageSrc: `/${e.profile.company_logo}`,
                          },
                          null,
                          8,
                          ["imageSrc"]
                        ),
                      ]),
                      z.value
                        ? (l(),
                          s(
                            "div",
                            {
                              key: 0,
                              class:
                                "text-2xl text-center xs:text-3xl font-bold uppercase",
                              style: U({ color: R.value[3] }),
                            },
                            c(z.value),
                            5
                          ))
                        : i("", !0),
                      o("div", Wo, [
                        r(
                          B,
                          {
                            "open-on-click": !0,
                            "open-on-focus": !0,
                            text: M.value,
                            location: "bottom",
                          },
                          {
                            activator: _(({ props: F }) => [
                              o(
                                "h2",
                                W(
                                  {
                                    class:
                                      "text-xl xs:text-2xl font-medium font-bold",
                                  },
                                  F
                                ),
                                c(K.value),
                                17
                              ),
                            ]),
                            _: 1,
                          },
                          8,
                          ["text"]
                        ),
                      ]),
                      o("div", To, [
                        V.value || G.value
                          ? (l(), s("div", jo, c(V.value + ", " + G.value), 1))
                          : i("", !0),
                        o("div", Uo, [
                          o(
                            "div",
                            null,
                            c(e.profile.phone_office || e.profile.phone_cell),
                            1
                          ),
                          e.screenWidth > 768
                            ? (l(), s("div", No, " | "))
                            : i("", !0),
                          o("div", null, c(e.profile.email), 1),
                        ]),
                      ]),
                    ],
                    2
                  ),
                  o(
                    "div",
                    {
                      class: A(
                        ` ${
                          e.screenWidth > 768 ? "w-1/4" : ""
                        } flex-grow flex flex-col gap-2  flex justify-center  items-center `
                      ),
                    },
                    [
                      o("div", Lo, [
                        r(
                          pe,
                          {
                            onClick: re,
                            innerStarRadius: e.screenWidth > 768 ? 17 : 13,
                            starWidth: e.screenWidth > 768 ? 24 : 15,
                            class: A("h-4 md:h-6 cursor-pointer"),
                            indicatorClasses: "text-small h-4 md:h-6 ",
                            starHeight: e.screenWidth > 768 ? 24 : 15,
                            rating: Number(
                              parseFloat(
                                e.averageRating ? e.averageRating : 0
                              ).toFixed(1)
                            ),
                            isIndicatorActive: !1,
                          },
                          null,
                          8,
                          [
                            "innerStarRadius",
                            "starWidth",
                            "starHeight",
                            "rating",
                          ]
                        ),
                        o("div", Do, [o("h2", Ro, c(e.total_reviews), 1)]),
                      ]),
                      o("div", Ao, [
                        Vo,
                        o("div", Po, [
                          r(
                            B,
                            {
                              text: T.value && T.value.see_user_posts,
                              location: "left",
                            },
                            {
                              activator: _(({ props: F }) => [
                                o(
                                  "div",
                                  {
                                    onClick: ne,
                                    class:
                                      "active:scale-95 hover:bg-[#f8f9fa] hover:rounded-md",
                                  },
                                  [
                                    o("button", Ho, [
                                      o(
                                        "img",
                                        W(
                                          { src: "/images/icons/post_b.png" },
                                          F,
                                          { width: "28", height: "28" }
                                        ),
                                        null,
                                        16
                                      ),
                                    ]),
                                  ]
                                ),
                              ]),
                              _: 1,
                            },
                            8,
                            ["text"]
                          ),
                        ]),
                      ]),
                      o("div", Bo, [
                        e.profile.user_id === e.loggedInUserId
                          ? (l(),
                            E(
                              q,
                              {
                                key: 0,
                                class: "rounded-full",
                                href: `/contractor/${e.profile.user_id}/edit`,
                              },
                              {
                                default: _(() => [
                                  o(
                                    "button",
                                    {
                                      class: A(
                                        ` px-4 py-1 text-xs hover:bg-[#114678] sm:text-sm font-bold rounded-full border-[${R.value[4]}] border-[1px] text-white cursor-pointer hover:shadow-lg active:scale-95 w-full`
                                      ),
                                      style: U({
                                        background: R.value[4],
                                        borderColor: R.value[4],
                                      }),
                                    },
                                    " Edit ",
                                    6
                                  ),
                                ]),
                                _: 1,
                              },
                              8,
                              ["href"]
                            ))
                          : i("", !0),
                        o(
                          "button",
                          W(t, {
                            onClick: g,
                            style: {
                              color: R.value[4],
                              borderColor: R.value[4],
                            },
                            class:
                              "bg-white px-4 py-1 text-xs hover:bg-[#f8f9fa] sm:text-sm font-bold rounded-full border-[1px] bg-white cursor-pointer hover:shadow-lg active:scale-95",
                          }),
                          c(T.value && T.value.share),
                          17
                        ),
                        r(
                          se,
                          {
                            location: "top",
                            modelValue: f.value,
                            "onUpdate:modelValue":
                              L[0] || (L[0] = (F) => (f.value = F)),
                            "content-class": "mt-6",
                            color: "success",
                            timeout: 2e3,
                          },
                          {
                            default: _(() => [
                              ee(
                                c(T.value && T.value.link_copied_to_clipboard),
                                1
                              ),
                            ]),
                            _: 1,
                          },
                          8,
                          ["modelValue"]
                        ),
                      ]),
                    ],
                    2
                  ),
                ],
                4
              ),
              r(
                be,
                {
                  ref_key: "ratingDialogRef",
                  ref: I,
                  loggedInUserId: C(x),
                  userId: e.profile.user_id,
                },
                null,
                8,
                ["loggedInUserId", "userId"]
              ),
              r(
                xe,
                {
                  ref_key: "postDialogRef",
                  ref: a,
                  contractorId: e.profile.user_id,
                },
                null,
                8,
                ["contractorId"]
              ),
              r(
                Q,
                {
                  submitText: T.value && T.value.okay,
                  onSubmit: v,
                  showCancel: !1,
                  disableOutSideClick: !1,
                  ref_key: "notLoggedDialogRef",
                  ref: h,
                  errorIcon: "",
                  title: T.value && T.value.log_in_error,
                },
                {
                  default: _(() => [
                    o(
                      "div",
                      Oo,
                      c(T.value && T.value.you_must_be_logged_in) +
                        " " +
                        c(u.value),
                      1
                    ),
                  ]),
                  _: 1,
                },
                8,
                ["submitText", "title"]
              ),
            ],
            64
          )
        );
      };
    },
  };
const Fo = (e) => (ie("data-v-34d477cb"), (e = e()), ce(), e),
  Mo = { class: "flex justify-center items-center max-md:gap-4 max-md:mb-2" },
  Go = { class: "mb-3 text-center" },
  zo = { class: "flex items-center" },
  qo = Fo(() =>
    o(
      "div",
      { class: "font-bold text-sm xs:text-base sm:text-lg ml-1 xs:ml-2" },
      " Region : ",
      -1
    )
  ),
  Yo = { class: "text-xs xs:text-sm sm:text-base translate-y-[0px] ml-2" },
  Jo = {
    __name: "RegionTradeSection2",
    props: { profile: Object, region_name: String, screenWidth: Number },
    setup(e) {
      var m;
      const t = e,
        f = P(),
        d = n((m = t.region_name) != null ? m : "");
      n("#241e6d");
      const x = ge({
          trade1: t.profile.trade1,
          trade2: t.profile.trade2,
          trade3: t.profile.trade3,
          trade4: t.profile.trade4,
          trade5: t.profile.trade5,
          trade6: t.profile.trade6,
          trade7: t.profile.trade7,
          trade8: t.profile.trade8,
          trade9: t.profile.trade9,
          trade10: t.profile.trade10,
          trade11: t.profile.trade11,
          trade12: t.profile.trade12,
          trade13: t.profile.trade13,
          trade14: t.profile.trade14,
          trade15: t.profile.trade15,
          trade16: t.profile.trade16,
          trade17: t.profile.trade17,
          trade18: t.profile.trade18,
          trade19: t.profile.trade19,
          trade20: t.profile.trade20,
          trade21: t.profile.trade21,
          trade22: t.profile.trade22,
          trade23: t.profile.trade23,
          trade24: t.profile.trade24,
          trade25: t.profile.trade25,
          trade26: t.profile.trade26,
          trade27: t.profile.trade27,
          trade28: t.profile.trade28,
          trade29: t.profile.trade29,
          trade30: t.profile.trade30,
        }),
        u = w(() => f.state.contractor.selectedColorScheme || H);
      w(() => ae.filter((v) => x[v.id] === 1));
      const h = w(() => f.getters.translations);
      return (v, y) => {
        const I = O("v-tooltip");
        return (
          l(),
          s(
            D,
            null,
            [
              o("div", Mo, [
                r(
                  ye,
                  {
                    class: "text",
                    style: U({
                      marginBottom: e.screenWidth > 768 ? "0px" : "0",
                      fontWeight: 800,
                      fontSize: e.screenWidth > 640 ? "24px" : "20px",
                      color: u.value[3],
                    }),
                    heading: h.value && h.value.trade_groups,
                  },
                  null,
                  8,
                  ["style", "heading"]
                ),
              ]),
              o("div", Go, [
                (l(!0),
                s(
                  D,
                  null,
                  X(
                    C(ae),
                    (a, g) => (
                      l(),
                      s(
                        D,
                        { key: a.name },
                        [
                          x[a.id] === 1
                            ? (l(),
                              E(
                                _e,
                                {
                                  key: 0,
                                  class: "my-1 mx-1 space-x-1 flex",
                                  style: U({
                                    backgroundColor:
                                      g % 2 === 0
                                        ? u.value[4]
                                        : C(ve)(u.value[4], 30),
                                    fontSize: "10px",
                                    paddingTop: "6px",
                                    paddingBottom: "6px",
                                  }),
                                },
                                { default: _(() => [ee(c(a.name), 1)]), _: 2 },
                                1032,
                                ["style"]
                              ))
                            : i("", !0),
                        ],
                        64
                      )
                    )
                  ),
                  128
                )),
              ]),
              d.value
                ? (l(),
                  s(
                    "div",
                    {
                      key: 0,
                      class:
                        "flex items-center justify-center w-full gap-2 xs:gap-4 mt-2 sm:mt-0",
                      style: U({ color: u.value[2] }),
                    },
                    [
                      o("div", zo, [
                        r(
                          I,
                          { text: "Region", location: "top" },
                          {
                            activator: _(({ props: a }) => [
                              r(
                                C(N),
                                W(a, {
                                  class: "w-6 h-6 sm:w-8 sm:h-8",
                                  icon: "mdi:location",
                                  color: u.value[3],
                                }),
                                null,
                                16,
                                ["color"]
                              ),
                            ]),
                            _: 1,
                          }
                        ),
                        qo,
                        o("div", Yo, c(d.value), 1),
                      ]),
                    ],
                    4
                  ))
                : i("", !0),
            ],
            64
          )
        );
      };
    },
  },
  Ko = te(Jo, [["__scopeId", "data-v-34d477cb"]]);
const Xo = { key: 0, class: "flex justify-center mb-3" },
  Qo = { key: 1, class: "text-xl sm:text-2xl font-medium font-extrabold" },
  Zo = { key: 2, class: "text-lg sm:text-xl font-medium font-bold" },
  el = { key: 3, class: "text-base sm:text-lg font-semibold" },
  tl = { key: 0 },
  ol = { key: 1 },
  ll = { key: 2 },
  sl = { key: 3 },
  al = { key: 4 },
  rl = ["href"],
  nl = {
    class: "flex gap-2 mt-3 md:mt-6 max-md:items-center text-sm md:text-base",
  },
  il = ["href"],
  cl = ["href"],
  dl = ["href"],
  ul = ["href"],
  ml = {
    __name: "AdditionalInfoSection2",
    props: { profile: Object, screenWidth: Number },
    setup(e) {
      const t = e;
      n("#241e6d");
      const f = P(),
        d = n(t.profile.company_name);
      n(t.profile.company_logo);
      const x = n(t.profile.phone_cell),
        u = n(t.profile.phone_office),
        h = n(t.profile.address_1),
        m = n(t.profile.address_2),
        v = n(t.profile.city),
        y = n(t.profile.state);
      n(t.profile.county);
      const I = n(t.profile.zipcode),
        a = w(() => f.state.contractor.selectedColorScheme || H),
        g = (p) =>
          p
            ? p.startsWith("http://") || p.startsWith("https://")
              ? p
              : `http://${p}`
            : "";
      return (p, $) => {
        const S = O("v-tooltip");
        return (
          l(),
          s(
            D,
            null,
            [
              o(
                "div",
                {
                  style: U({ color: a.value[2] }),
                  class: "flex flex-col justify-center text-center",
                },
                [
                  e.profile.user_avatar
                    ? (l(),
                      s("div", Xo, [
                        r(
                          he,
                          { imageSrc: `/${e.profile.user_avatar}` },
                          null,
                          8,
                          ["imageSrc"]
                        ),
                      ]))
                    : i("", !0),
                  d.value ? (l(), s("h2", Qo, c(d.value), 1)) : i("", !0),
                  h.value || m.value
                    ? (l(), s("div", Zo, c(h.value || m.value), 1))
                    : i("", !0),
                  v.value || y.value || I.value
                    ? (l(),
                      s(
                        "span",
                        el,
                        c(v.value + ", " + y.value + " " + I.value),
                        1
                      ))
                    : i("", !0),
                ],
                4
              ),
              o(
                "div",
                {
                  class:
                    "flex flex-col justify-center mt-3 md:mt-6 text-base md:text-lg max-md:items-center items-center font-semibold emailPhoneSection",
                  style: U({ color: a.value[2] }),
                },
                [
                  m.value
                    ? (l(),
                      s("div", tl, [
                        r(
                          S,
                          { text: "Alternative Address", location: "top" },
                          {
                            activator: _(({ props: b }) => [
                              r(
                                C(N),
                                W(b, {
                                  color: a.value[3],
                                  icon: "entypo:address",
                                  class: "w-5 h-5",
                                }),
                                null,
                                16,
                                ["color"]
                              ),
                            ]),
                            _: 1,
                          }
                        ),
                        o("div", null, c(m.value), 1),
                      ]))
                    : i("", !0),
                  u.value
                    ? (l(),
                      s("div", ol, [
                        r(
                          S,
                          { text: "Phone Office", location: "top" },
                          {
                            activator: _(({ props: b }) => [
                              r(
                                C(N),
                                W(b, {
                                  color: a.value[3],
                                  icon: "wpf:phone-office",
                                  class: "w-5 h-5",
                                }),
                                null,
                                16,
                                ["color"]
                              ),
                            ]),
                            _: 1,
                          }
                        ),
                        o("div", null, c(u.value), 1),
                      ]))
                    : x.value
                    ? (l(),
                      s("div", ll, [
                        r(
                          S,
                          { text: "Phone Cell", location: "top" },
                          {
                            activator: _(({ props: b }) => [
                              r(
                                C(N),
                                W(b, {
                                  color: a.value[3],
                                  icon: "ic:baseline-phone",
                                  class: "w-5 h-5",
                                }),
                                null,
                                16,
                                ["color"]
                              ),
                            ]),
                            _: 1,
                          }
                        ),
                        o("div", null, c(x.value), 1),
                      ]))
                    : i("", !0),
                  e.profile.email
                    ? (l(),
                      s("div", sl, [
                        r(
                          S,
                          { text: "Email", location: "top" },
                          {
                            activator: _(({ props: b }) => [
                              r(
                                C(N),
                                W(b, {
                                  color: a.value[3],
                                  icon: "bi:envelope-fill",
                                  class: "w-5 h-5",
                                }),
                                null,
                                16,
                                ["color"]
                              ),
                            ]),
                            _: 1,
                          }
                        ),
                        o("div", null, c(e.profile.email), 1),
                      ]))
                    : i("", !0),
                  e.profile.county
                    ? (l(),
                      s("div", al, [
                        r(
                          S,
                          { text: "County", location: "top" },
                          {
                            activator: _(({ props: b }) => [
                              r(
                                C(N),
                                W(b, {
                                  color: a.value[3],
                                  icon: "tabler:location-filled",
                                  class: "w-5 h-5",
                                }),
                                null,
                                16,
                                ["color"]
                              ),
                            ]),
                            _: 1,
                          }
                        ),
                        o("div", null, "County: " + c(e.profile.county), 1),
                      ]))
                    : i("", !0),
                  e.profile.website_url
                    ? (l(),
                      s(
                        "a",
                        { key: 5, href: g(e.profile.website_url) },
                        [
                          r(
                            S,
                            { text: "Website", location: "top" },
                            {
                              activator: _(({ props: b }) => [
                                r(
                                  C(N),
                                  W(b, {
                                    icon: "fluent-mdl2:website",
                                    color: a.value[3],
                                    class: "``",
                                  }),
                                  null,
                                  16,
                                  ["color"]
                                ),
                              ]),
                              _: 1,
                            }
                          ),
                          o("div", null, c(e.profile.website_url), 1),
                        ],
                        8,
                        rl
                      ))
                    : i("", !0),
                  o("div", nl, [
                    e.profile.facebook
                      ? (l(),
                        s(
                          "a",
                          { key: 0, href: g(e.profile.facebook) },
                          [
                            r(
                              S,
                              { text: "Facebook", location: "top" },
                              {
                                activator: _(({ props: b }) => [
                                  r(
                                    C(N),
                                    W({ class: "w-8 h-8" }, b, {
                                      icon: "logos:facebook",
                                    }),
                                    null,
                                    16
                                  ),
                                ]),
                                _: 1,
                              }
                            ),
                          ],
                          8,
                          il
                        ))
                      : i("", !0),
                    e.profile.twitter
                      ? (l(),
                        s(
                          "a",
                          { key: 1, href: g(e.profile.twitter) },
                          [
                            r(
                              S,
                              { text: "Twitter", location: "top" },
                              {
                                activator: _(({ props: b }) => [
                                  r(
                                    C(N),
                                    W({ class: "w-8 h-8" }, b, {
                                      icon: "fa6-brands:square-x-twitter",
                                      color: "black",
                                    }),
                                    null,
                                    16
                                  ),
                                ]),
                                _: 1,
                              }
                            ),
                          ],
                          8,
                          cl
                        ))
                      : i("", !0),
                    e.profile.tiktok
                      ? (l(),
                        s(
                          "a",
                          { key: 2, href: g(e.profile.tiktok) },
                          [
                            r(
                              S,
                              { text: "TikTok", location: "top" },
                              {
                                activator: _(({ props: b }) => [
                                  r(
                                    C(N),
                                    W({ class: "w-8 h-8" }, b, {
                                      icon: "logos:tiktok-icon",
                                    }),
                                    null,
                                    16
                                  ),
                                ]),
                                _: 1,
                              }
                            ),
                          ],
                          8,
                          dl
                        ))
                      : i("", !0),
                    e.profile.instagram
                      ? (l(),
                        s(
                          "a",
                          { key: 3, href: g(e.profile.instagram) },
                          [
                            r(
                              S,
                              { text: "Instagram", location: "top" },
                              {
                                activator: _(({ props: b }) => [
                                  r(
                                    C(N),
                                    W({ class: "w-8 h-8" }, b, {
                                      icon: "skill-icons:instagram",
                                    }),
                                    null,
                                    16
                                  ),
                                ]),
                                _: 1,
                              }
                            ),
                          ],
                          8,
                          ul
                        ))
                      : i("", !0),
                  ]),
                ],
                4
              ),
            ],
            64
          )
        );
      };
    },
  },
  fl = te(ml, [["__scopeId", "data-v-f7bf9783"]]),
  gl = { key: 0, class: A("mt-1 flex gap-1 flex-col rounded-lg closing") },
  vl = ["innerHTML"],
  xl = {
    __name: "BottomTitleText2",
    props: {
      screenWidth: { type: [String, Number] },
      bottom_text: { type: String },
    },
    setup(e) {
      const t = e,
        f = (u) => {
          const h = document.createElement("textarea");
          return (h.innerHTML = u), h.value;
        },
        d = w(() => {
          const h = new DOMParser().parseFromString(x.value, "text/html");
          return (
            h.querySelectorAll("a").forEach((m) => {
              const v = m.getAttribute("href");
              !v.startsWith("http://") &&
                !v.startsWith("https://") &&
                m.setAttribute("href", "http://" + v),
                (m.target = "_blank");
            }),
            h.body.innerHTML
          );
        }),
        x = n(f(t.bottom_text));
      return (u, h) =>
        d.value
          ? (l(),
            s("div", gl, [
              o(
                "div",
                { class: "default ck-content", innerHTML: d.value },
                null,
                8,
                vl
              ),
            ]))
          : i("", !0);
    },
  },
  hl = {
    key: 0,
    class: A(
      " flex gap-1 flex-col rounded-lg closing md:border-gray-300 md:border-2 p-3"
    ),
  },
  _l = ["innerHTML"],
  pl = { class: "flex justify-end gap-1" },
  bl = {
    __name: "ClosingTitleText2",
    props: {
      screenWidth: { type: [String, Number] },
      loggedInUserId: [String, Number],
      closing_text: { type: String },
      userId: [String, Number],
    },
    setup(e) {
      const t = e,
        f = (g) => {
          const p = document.createElement("textarea");
          return (p.innerHTML = g), console.log("here"), p.value;
        },
        d = P(),
        x = n(f(t.closing_text)),
        u = n(!1),
        h = () => {
          if (v.value !== 3) {
            d.commit("setIsUpgradeToGoldPlatinumDialogOpen", !0);
            return;
          }
          a(window.location.href) && (u.value = !0);
        },
        m = w(() => d.getters.translations),
        v = w(() => d.getters.userVersion),
        y = w(() => {
          const p = new DOMParser().parseFromString(x.value, "text/html");
          return (
            p.querySelectorAll("a").forEach(($) => {
              const S = $.getAttribute("href");
              !S.startsWith("http://") &&
                !S.startsWith("https://") &&
                $.setAttribute("href", "http://" + S),
                ($.target = "_blank");
            }),
            p.body.innerHTML
          );
        }),
        I = w(() => d.state.contractor.selectedColorScheme || H);
      function a(g) {
        const p = document.createElement("textarea");
        (p.value = g), document.body.appendChild(p), p.select();
        let $;
        try {
          $ = document.execCommand("copy");
        } catch (S) {
          console.error("Failed to copy text: ", S), ($ = !1);
        }
        return document.body.removeChild(p), $;
      }
      return (g, p) => {
        const $ = O("Link"),
          S = O("v-snackbar");
        return (
          l(),
          s(
            D,
            null,
            [
              y.value
                ? (l(),
                  s("div", hl, [
                    o(
                      "div",
                      { class: "default ck-content", innerHTML: y.value },
                      null,
                      8,
                      _l
                    ),
                  ]))
                : i("", !0),
              o("div", pl, [
                e.userId === e.loggedInUserId
                  ? (l(),
                    E(
                      $,
                      {
                        key: 0,
                        class: "rounded-full",
                        href: `/contractor/${e.userId}/edit`,
                      },
                      {
                        default: _(() => [
                          o(
                            "button",
                            {
                              class: A(
                                ` px-4 py-1 text-xs hover:bg-[#114678] sm:text-sm font-bold rounded-full border-[${I.value[4]}] border-[1px] text-white cursor-pointer hover:shadow-lg active:scale-95 w-full`
                              ),
                              style: U({
                                background: I.value[4],
                                borderColor: I.value[4],
                              }),
                            },
                            " Edit ",
                            6
                          ),
                        ]),
                        _: 1,
                      },
                      8,
                      ["href"]
                    ))
                  : i("", !0),
                o(
                  "button",
                  W(t, {
                    onClick: h,
                    style: { color: I.value[4], borderColor: I.value[4] },
                    class:
                      "bg-white px-4 py-1 text-xs hover:bg-[#f8f9fa] sm:text-sm font-bold rounded-full border-[1px] bg-white cursor-pointer hover:shadow-lg active:scale-95",
                  }),
                  c(m.value && m.value.share),
                  17
                ),
                r(
                  S,
                  {
                    location: "bottom",
                    modelValue: u.value,
                    "onUpdate:modelValue":
                      p[0] || (p[0] = (b) => (u.value = b)),
                    timeout: 2e3,
                    color: "success",
                  },
                  {
                    default: _(() => [
                      ee(c(m.value && m.value.link_copied_to_clipboard), 1),
                    ]),
                    _: 1,
                  },
                  8,
                  ["modelValue"]
                ),
              ]),
            ],
            64
          )
        );
      };
    },
  },
  yl = {
    key: 0,
    class:
      "w-full p-4 md:p-6 text-xl md:text-2xl font-bold md:font-extrabold text-center",
    style: { "word-break": "break-word" },
  },
  wl = { key: 1, class: "w-full h-full bg-[#222] rounded-md" },
  kl = ["onClick", "src"],
  $l = { key: 2, class: "flex max-md:flex-col gap-2 md:gap-4 items-center" },
  Il = {
    class:
      "w-full md:w-2/5 text-xl md:text-3xl font-bold md:font-extrabold text-center",
  },
  Cl = { class: "relative w-full md:w-3/5 h-3/5 md:p-1 rounded-md" },
  Sl = ["onClick", "src"],
  Wl = {
    key: 3,
    class:
      "flex max-md:flex-col gap-2 md:gap-4 items-center max-md:flex-col-reverse",
  },
  Tl = { class: "relative w-full md:w-3/5 h-3/5 bg-[#222] rounded-md" },
  jl = ["onClick", "src"],
  Ul = {
    class:
      "w-2/5 md:w-2/5 text-xl md:text-3xl font-bold md:font-extrabold text-center",
    style: { "word-break": "break-word" },
  },
  Nl = {
    class:
      "max-h-[400px] md:max-h-[500px] w-full flex justify-center xs:w-[400px] md:w-[600px] bg-[#222]",
  },
  Ll = ["src"],
  Dl = {
    __name: "BragSection2",
    props: {
      screenWidth: { type: [String, Number] },
      brag_sections: { type: Array },
      contractorId: { type: Number },
    },
    setup(e) {
      const t = e,
        f = P(),
        d = n(t.brag_sections),
        x = n(""),
        u = n(),
        h = w(() => f.state.contractor.selectedColorScheme || H),
        m = w(() => f.getters.translations),
        v = (y) => {
          (x.value = y), u.value.openDialog();
        };
      return (y, I) => (
        l(),
        s(
          D,
          null,
          [
            d.value && d.value.length > 0
              ? (l(),
                s(
                  "div",
                  {
                    key: 0,
                    class: "flex gap-4 flex-col",
                    style: U({ color: h.value[2] }),
                  },
                  [
                    (l(!0),
                    s(
                      D,
                      null,
                      X(
                        d.value,
                        (a, g) => (
                          l(),
                          s("div", { key: a.id, class: "" }, [
                            !a.section_image && a.section_text
                              ? (l(), s("div", yl, c(a.section_text), 1))
                              : i("", !0),
                            a.section_image && !a.section_text
                              ? (l(),
                                s("div", wl, [
                                  o(
                                    "img",
                                    {
                                      onClick: (p) => v(a.section_image),
                                      src: a.section_image,
                                      alt: "Section Image",
                                      class: "object-cover w-full rounded-md",
                                    },
                                    null,
                                    8,
                                    kl
                                  ),
                                ]))
                              : i("", !0),
                            a.section_image && a.section_text && g % 2 !== 0
                              ? (l(),
                                s("div", $l, [
                                  o("div", Il, c(a.section_text), 1),
                                  o("div", Cl, [
                                    o(
                                      "img",
                                      {
                                        onClick: (p) => v(a.section_image),
                                        src: a.section_image,
                                        alt: "Section Image",
                                        class: "object-cover w-full rounded-md",
                                      },
                                      null,
                                      8,
                                      Sl
                                    ),
                                  ]),
                                ]))
                              : i("", !0),
                            a.section_image && a.section_text && g % 2 === 0
                              ? (l(),
                                s("div", Wl, [
                                  o("div", Tl, [
                                    o(
                                      "img",
                                      {
                                        onClick: (p) => v(a.section_image),
                                        src: a.section_image,
                                        alt: "Section Image",
                                        class: "object-cover rounded-md w-full",
                                      },
                                      null,
                                      8,
                                      jl
                                    ),
                                  ]),
                                  o("div", Ul, c(a.section_text), 1),
                                ]))
                              : i("", !0),
                          ])
                        )
                      ),
                      128
                    )),
                  ],
                  4
                ))
              : i("", !0),
            r(
              Q,
              {
                dialogWidth: "widthAuto",
                showFooter: !1,
                ref_key: "imageIncDialogRef",
                ref: u,
                title: m.value && m.value.your_image,
              },
              {
                default: _(() => [
                  o("div", Nl, [o("img", { src: x.value }, null, 8, Ll)]),
                ]),
                _: 1,
              },
              8,
              ["title"]
            ),
          ],
          64
        )
      );
    },
  },
  Rl = {
    key: 0,
    class:
      "w-full p-4 md:p-6 text-xl md:text-2xl font-bold md:font-extrabold text-xl md:text-3xl font-bold md:font-extrabold text-center",
  },
  Al = { key: 1, class: "w-full h-full bg-[#222] rounded-md" },
  Vl = ["onClick", "src"],
  Pl = ["onClick"],
  Hl = ["src"],
  Bl = { class: "absolute inset-0 flex justify-center items-center" },
  Ol = {
    style: { color: "#fff", backgroundColor: "#00000080" },
    class:
      "text-center text-xl md:text-3xl font-bold md:font-extrabold text-xl md:text-3xl font-bold md:font-extrabold bg-opacity-50 p-2 rounded",
  },
  El = {
    class:
      "max-h-[400px] md:max-h-[500px] w-full flex justify-center xs:w-[400px] md:w-[600px] bg-[#222]",
  },
  Fl = ["src"],
  Ml = {
    __name: "ImageTextSection2",
    props: {
      screenWidth: { type: [String, Number] },
      image_sections: { type: Array },
      contractorId: { type: Number },
    },
    setup(e) {
      const t = e,
        f = P(),
        d = n(t.image_sections),
        x = n(""),
        u = n(),
        h = w(() => f.state.contractor.selectedColorScheme || H),
        m = w(() => f.getters.translations),
        v = (y) => {
          (x.value = y), console.log("infunction call"), u.value.openDialog();
        };
      return (y, I) => (
        l(),
        s(
          D,
          null,
          [
            d.value && d.value.length > 0
              ? (l(),
                s(
                  "div",
                  {
                    key: 0,
                    style: U({ color: h.value[2] }),
                    class: "flex gap-4 flex-col",
                  },
                  [
                    (l(!0),
                    s(
                      D,
                      null,
                      X(
                        d.value,
                        (a) => (
                          l(),
                          s(
                            "div",
                            {
                              key: a.id,
                              class:
                                "rounded-md border relative border-gray-300 p-2 sm:p-2",
                            },
                            [
                              !a.section_image && a.section_text
                                ? (l(), s("div", Rl, c(a.section_text), 1))
                                : i("", !0),
                              a.section_image && !a.section_text
                                ? (l(),
                                  s("div", Al, [
                                    o(
                                      "img",
                                      {
                                        onClick: (g) => v(a.section_image),
                                        src: a.section_image,
                                        alt: "Section Image",
                                        class: "object-cover w-full rounded-md",
                                      },
                                      null,
                                      8,
                                      Vl
                                    ),
                                  ]))
                                : i("", !0),
                              a.section_image && a.section_text
                                ? (l(),
                                  s(
                                    "div",
                                    {
                                      key: 2,
                                      class: "relative",
                                      onClick: (g) => v(a.section_image),
                                    },
                                    [
                                      o(
                                        "img",
                                        {
                                          src: a.section_image,
                                          alt: "Section Image",
                                          class:
                                            "object-cover w-full rounded-md",
                                        },
                                        null,
                                        8,
                                        Hl
                                      ),
                                      o("div", Bl, [
                                        o("span", Ol, c(a.section_text), 1),
                                      ]),
                                    ],
                                    8,
                                    Pl
                                  ))
                                : i("", !0),
                            ]
                          )
                        )
                      ),
                      128
                    )),
                  ],
                  4
                ))
              : i("", !0),
            r(
              Q,
              {
                dialogWidth: "widthAuto",
                showFooter: !1,
                ref_key: "imageIncDialogRef",
                ref: u,
                title: m.value && m.value.your_image,
              },
              {
                default: _(() => [
                  o("div", El, [o("img", { src: x.value }, null, 8, Fl)]),
                ]),
                _: 1,
              },
              8,
              ["title"]
            ),
          ],
          64
        )
      );
    },
  },
  Gl = { key: 0 },
  zl = { class: "flex flex-col gap-3 sm:gap-4" },
  ql = { class: "flex flex-col mb-6 md:flex-row gap-2 items-stretch mt-6" },
  Yl = { class: "mt-6" },
  Jl = {
    __name: "Template2",
    props: {
      profile: Object,
      loggedInUserId: [String, Number],
      region_name: String,
      total_reviews: [Number, String],
      average_rating: [Number, String],
      screenWidth: Number,
      starPercentages: { type: Array, default: [] },
    },
    setup(e) {
      const t = P(),
        f = w(() => t.state.contractor.selectedColorScheme || H);
      return (d, x) =>
        e.profile
          ? (l(),
            s("div", Gl, [
              o("div", zl, [
                r(
                  le,
                  {
                    shadowLevel: 2,
                    bgColor: f.value[1],
                    padding: e.screenWidth < 640 ? "7px" : "15px",
                  },
                  {
                    default: _(() => [
                      r(
                        Eo,
                        {
                          screenWidth: e.screenWidth,
                          loggedInUserId: e.loggedInUserId,
                          averageRating: e.average_rating,
                          total_reviews: e.total_reviews,
                          profile: e.profile,
                        },
                        null,
                        8,
                        [
                          "screenWidth",
                          "loggedInUserId",
                          "averageRating",
                          "total_reviews",
                          "profile",
                        ]
                      ),
                      o("div", ql, [
                        r(
                          le,
                          {
                            shadowLevel: 2,
                            cardInnerClasses: "h-full",
                            bgColor: f.value[1],
                            isInside: !0,
                            class: "h-auto md:w-3/5",
                            padding: e.screenWidth < 640 ? "7px" : "20px",
                          },
                          {
                            default: _(() => [
                              r(
                                fl,
                                {
                                  class: "",
                                  screenWidth: e.screenWidth,
                                  profile: e.profile,
                                },
                                null,
                                8,
                                ["screenWidth", "profile"]
                              ),
                            ]),
                            _: 1,
                          },
                          8,
                          ["bgColor", "padding"]
                        ),
                        r(
                          le,
                          {
                            shadowLevel: 2,
                            bgColor: f.value[1],
                            cardInnerClasses:
                              "h-full flex flex-col justify-center",
                            isInside: !0,
                            class: "h-auto md:w-2/5",
                            padding: e.screenWidth < 640 ? "7px" : "20px",
                          },
                          {
                            default: _(() => [
                              r(
                                Ko,
                                {
                                  screenWidth: e.screenWidth,
                                  region_name: e.region_name,
                                  profile: e.profile,
                                },
                                null,
                                8,
                                ["screenWidth", "region_name", "profile"]
                              ),
                            ]),
                            _: 1,
                          },
                          8,
                          ["bgColor", "padding"]
                        ),
                      ]),
                      o("div", Yl, [
                        e.profile.image_sections &&
                        e.profile.image_sections.length > 0
                          ? (l(),
                            E(
                              Ml,
                              {
                                key: 0,
                                image_sections: e.profile.image_sections,
                                "contractor-id": e.profile.id,
                                "screen-width": e.screenWidth,
                              },
                              null,
                              8,
                              [
                                "image_sections",
                                "contractor-id",
                                "screen-width",
                              ]
                            ))
                          : i("", !0),
                      ]),
                      e.profile.bottom_text
                        ? (l(),
                          s(
                            "div",
                            {
                              key: 0,
                              class: "my-6",
                              style: U({ color: f.value[2] }),
                            },
                            [
                              r(
                                xl,
                                {
                                  class: "md:border-gray-300 md:border-2 p-3",
                                  bottom_text: e.profile.bottom_text,
                                  "screen-width": e.screenWidth,
                                },
                                null,
                                8,
                                ["bottom_text", "screen-width"]
                              ),
                            ],
                            4
                          ))
                        : i("", !0),
                      e.profile.brag_sections &&
                      e.profile.brag_sections.length > 0
                        ? (l(),
                          E(
                            Dl,
                            {
                              key: 1,
                              brag_sections: e.profile.brag_sections,
                              "contractor-id": e.profile.id,
                              "screen-width": e.screenWidth,
                            },
                            null,
                            8,
                            ["brag_sections", "contractor-id", "screen-width"]
                          ))
                        : i("", !0),
                      e.profile.bottom_text || e.profile.closing_text
                        ? (l(),
                          s(
                            "div",
                            {
                              key: 2,
                              class: "flex gap-2 flex-col mt-6",
                              style: U({ color: f.value[2] }),
                            },
                            [
                              r(
                                bl,
                                {
                                  userId: e.profile.user_id,
                                  loggedInUserId: e.loggedInUserId,
                                  closing_text: e.profile.closing_text,
                                  "screen-width": e.screenWidth,
                                },
                                null,
                                8,
                                [
                                  "userId",
                                  "loggedInUserId",
                                  "closing_text",
                                  "screen-width",
                                ]
                              ),
                            ],
                            4
                          ))
                        : i("", !0),
                    ]),
                    _: 1,
                  },
                  8,
                  ["bgColor", "padding"]
                ),
              ]),
            ]))
          : i("", !0);
    },
  },
  Kl = { key: 0, class: "flex gap-2 mb-1 items-center" },
  Xl = { key: 0, class: "mr-4 flex-none" },
  Ql = { class: "flex-grow" },
  Zl = { class: "text-xl font-semibold mt-1" },
  es = { key: 0, class: "text-base md:text-xl" },
  ts = { class: "flex flex-col md:flex-row items-start md:items-center" },
  os = {
    key: 0,
    class: "mx-2 md:flex md:justify-center md:items-center translate-y-[-1px]",
  },
  ls = { class: "flex items-center gap-1" },
  ss = o(
    "div",
    { class: "" },
    [
      o("img", {
        src: "/images/icons/pre-diamond.png",
        width: "20",
        height: "30",
      }),
    ],
    -1
  ),
  as = { class: "flex flex-col justify-center items-center" },
  rs = { class: "" },
  ns = { class: "font-light text-xs overflow-hidden tracking-tighter" },
  is = { class: "flex gap-2 sm:gap-3 translate-x-[-2px]" },
  cs = {
    class:
      "xs:text-md w-[28px] h-[28px] xs:w-[35px] xs:h-[35px] font-semibold flex items-center justify-center",
  },
  ds = { class: "flex flex-col gap-1" },
  us = { class: "mb-4 sm:mb-0 mt-4" },
  ms = {
    __name: "ProfileHeader3",
    props: {
      profile: Object,
      loggedInUserId: [String, Number],
      screenWidth: Number,
      averageRating: { type: Number, default: 0 },
      total_reviews: { type: Number, default: 0 },
    },
    setup(e) {
      var oe, Z;
      const t = e,
        f = n(!1);
      let d = fe().props.value;
      (oe = d == null ? void 0 : d.auth) == null || oe.user;
      const x = (Z = d == null ? void 0 : d.profile) == null ? void 0 : Z.id,
        u = n(""),
        h = n(),
        m = n(!0);
      ue(() => {
        const j = localStorage.getItem("showGoBack");
        j === "false" && (m.value = !1),
          console.log(j),
          localStorage.removeItem("showGoBack");
      });
      const v = () => {
          h.value.closeDialog();
        },
        y = () => {
          h.value.openDialog();
        },
        I = n(),
        a = n(),
        g = () => {
          if (J.value !== 3) {
            S.commit("setIsUpgradeToGoldPlatinumDialogOpen", !0);
            return;
          }
          p(window.location.href) && (f.value = !0);
        };
      function p(j) {
        const L = document.createElement("textarea");
        (L.value = j), document.body.appendChild(L), L.select();
        let B;
        try {
          B = document.execCommand("copy");
        } catch (q) {
          console.error("Failed to copy text: ", q), (B = !1);
        }
        return document.body.removeChild(L), B;
      }
      const $ = () => {
          const j = localStorage.getItem("prevUrl");
          console.log(j),
            j === "/post"
              ? Y.Inertia.visit(j)
              : j === "/edit"
              ? Y.Inertia.visit(`/contractor/${t.profile.user_id}/edit`)
              : j === "/settings"
              ? Y.Inertia.visit("/settings")
              : Y.Inertia.visit("/sub-finder");
        },
        S = P();
      n("#241e6d");
      const b = n(t.profile.first_name),
        k = n(t.profile.last_name);
      n(t.profile.user_avatar);
      const z = n(t.profile.company_name),
        V = n(t.profile.city),
        G = n(t.profile.state),
        T = w(() => S.getters.translations),
        J = w(() => S.getters.userVersion),
        R = w(() => S.state.contractor.selectedColorScheme || H),
        M = w(() => b.value + " " + k.value),
        K = w(() => {
          if (
            (console.log("here in teh trunctated", t.screenWidth),
            t.screenWidth < 600)
          ) {
            const j = t.screenWidth < 400 ? 30 : 34;
            return M.value.length > j
              ? M.value.substring(0, j) + "..."
              : M.value;
          } else return b.value + " " + k.value;
        }),
        re = () => {
          x ? I.value.openDialog() : ((u.value = "ratings"), y());
        },
        ne = () => {
          x ? a.value.openDialog() : ((u.value = "posts"), y());
        };
      return (j, L) => {
        const B = O("v-tooltip"),
          q = O("Link"),
          se = O("v-snackbar");
        return (
          l(),
          s(
            D,
            null,
            [
              m.value
                ? (l(),
                  s("div", Kl, [
                    o("div", { onClick: $, class: "cursor-pointer" }, [
                      r(
                        C(N),
                        {
                          class: "w-8 h-8",
                          icon: "ion:arrow-back",
                          color: R.value[3],
                        },
                        null,
                        8,
                        ["color"]
                      ),
                    ]),
                    o(
                      "div",
                      {
                        onClick: $,
                        class:
                          "font-bold cursor-pointer translate-y-[1px] flex justify-center items-center text-2xl leading-tight",
                        style: U({ color: R.value[3] }),
                      },
                      c(T.value && T.value.go_back),
                      5
                    ),
                  ]))
                : i("", !0),
              o(
                "div",
                { class: "flex gap-2 mt-4", style: U({ color: R.value[2] }) },
                [
                  o(
                    "div",
                    {
                      class: A([
                        `${e.screenWidth > 768 ? "w-3/4" : "w-4/5"}`,
                        "flex items-start",
                      ]),
                    },
                    [
                      e.profile.company_logo
                        ? (l(),
                          s("div", Xl, [
                            r(
                              Ie,
                              {
                                imageClass: "companyLogo",
                                imageSrc: `/${e.profile.company_logo}`,
                              },
                              null,
                              8,
                              ["imageSrc"]
                            ),
                          ]))
                        : i("", !0),
                      o("div", Ql, [
                        z.value
                          ? (l(),
                            s(
                              "div",
                              {
                                key: 0,
                                class:
                                  "text-2xl xs:text-3xl font-bold uppercase",
                                style: U([
                                  { "line-height": "2rem" },
                                  { color: R.value[3] },
                                ]),
                              },
                              c(z.value),
                              5
                            ))
                          : i("", !0),
                        o("div", null, [
                          r(
                            B,
                            {
                              "open-on-click": !0,
                              "open-on-focus": !0,
                              text: M.value,
                              location: "bottom",
                            },
                            {
                              activator: _(({ props: F }) => [
                                o(
                                  "h2",
                                  W(
                                    {
                                      class:
                                        "text-xl xs:text-2xl font-medium font-bold",
                                    },
                                    F,
                                    { style: { "line-height": "1.7rem" } }
                                  ),
                                  c(K.value),
                                  17
                                ),
                              ]),
                              _: 1,
                            },
                            8,
                            ["text"]
                          ),
                        ]),
                        o("div", Zl, [
                          V.value || G.value
                            ? (l(),
                              s("div", es, c(V.value + ", " + G.value), 1))
                            : i("", !0),
                          o("div", ts, [
                            o(
                              "div",
                              null,
                              c(e.profile.phone_office || e.profile.phone_cell),
                              1
                            ),
                            e.screenWidth > 768
                              ? (l(), s("div", os, " | "))
                              : i("", !0),
                            o("div", null, c(e.profile.email), 1),
                          ]),
                        ]),
                      ]),
                    ],
                    2
                  ),
                  o(
                    "div",
                    {
                      class: A(
                        ` ${
                          e.screenWidth > 768 ? "w-1/4" : ""
                        } flex-grow flex flex-col gap-2  flex justify-center  items-center `
                      ),
                    },
                    [
                      o("div", ls, [
                        ss,
                        o("div", as, [
                          r(
                            pe,
                            {
                              onClick: re,
                              starWidth: e.screenWidth > 768 ? 18 : 15,
                              class: A("h-4 cursor-pointer "),
                              indicatorClasses: "text-small h-4 ",
                              starHeight: e.screenWidth > 768 ? 18 : 15,
                              rating: Number(
                                parseFloat(
                                  e.averageRating ? e.averageRating : 0
                                ).toFixed(1)
                              ),
                              isIndicatorActive: !1,
                            },
                            null,
                            8,
                            ["starWidth", "starHeight", "rating"]
                          ),
                          o("div", rs, [o("h2", ns, c(e.total_reviews), 1)]),
                        ]),
                        o("div", is, [
                          r(
                            B,
                            {
                              text: T.value && T.value.see_user_posts,
                              location: "left",
                            },
                            {
                              activator: _(({ props: F }) => [
                                o(
                                  "div",
                                  {
                                    onClick: ne,
                                    class:
                                      "active:scale-95 hover:bg-[#f8f9fa] hover:rounded-md",
                                  },
                                  [
                                    o("button", cs, [
                                      o(
                                        "img",
                                        W(
                                          { src: "/images/icons/post_b.png" },
                                          F,
                                          { width: "28", height: "28" }
                                        ),
                                        null,
                                        16
                                      ),
                                    ]),
                                  ]
                                ),
                              ]),
                              _: 1,
                            },
                            8,
                            ["text"]
                          ),
                        ]),
                      ]),
                      o("div", ds, [
                        e.profile.user_id === e.loggedInUserId
                          ? (l(),
                            E(
                              q,
                              {
                                key: 0,
                                class: "rounded-full",
                                href: `/contractor/${e.profile.user_id}/edit`,
                              },
                              {
                                default: _(() => [
                                  o(
                                    "button",
                                    {
                                      class: A(
                                        ` px-4 py-1 text-xs hover:bg-[#114678] sm:text-sm font-bold rounded-full border-[${R.value[4]}] border-[1px] text-white cursor-pointer hover:shadow-lg active:scale-95 w-full`
                                      ),
                                      style: U({
                                        background: R.value[4],
                                        borderColor: R.value[4],
                                      }),
                                    },
                                    " Edit ",
                                    6
                                  ),
                                ]),
                                _: 1,
                              },
                              8,
                              ["href"]
                            ))
                          : i("", !0),
                        o(
                          "button",
                          W(t, {
                            onClick: g,
                            style: {
                              color: R.value[4],
                              borderColor: R.value[4],
                            },
                            class:
                              "bg-white px-4 py-1 text-xs hover:bg-[#f8f9fa] sm:text-sm font-bold rounded-full border-[1px] bg-white cursor-pointer hover:shadow-lg active:scale-95",
                          }),
                          c(T.value && T.value.share),
                          17
                        ),
                        r(
                          se,
                          {
                            location: "bottom",
                            modelValue: f.value,
                            "onUpdate:modelValue":
                              L[0] || (L[0] = (F) => (f.value = F)),
                            timeout: 2e3,
                            color: "success",
                          },
                          {
                            default: _(() => [
                              ee(
                                c(T.value && T.value.link_copied_to_clipboard),
                                1
                              ),
                            ]),
                            _: 1,
                          },
                          8,
                          ["modelValue"]
                        ),
                      ]),
                    ],
                    2
                  ),
                ],
                4
              ),
              r(
                be,
                {
                  ref_key: "ratingDialogRef",
                  ref: I,
                  loggedInUserId: C(x),
                  userId: e.profile.user_id,
                },
                null,
                8,
                ["loggedInUserId", "userId"]
              ),
              r(
                xe,
                {
                  ref_key: "postDialogRef",
                  ref: a,
                  contractorId: e.profile.user_id,
                },
                null,
                8,
                ["contractorId"]
              ),
              r(
                Q,
                {
                  submitText: T.value && T.value.okay,
                  onSubmit: v,
                  showCancel: !1,
                  disableOutSideClick: !1,
                  ref_key: "notLoggedDialogRef",
                  ref: h,
                  errorIcon: "",
                  title: T.value && T.value.log_in_error,
                },
                {
                  default: _(() => [
                    o(
                      "div",
                      us,
                      c(T.value && T.value.you_must_be_logged_in) +
                        " " +
                        c(u.value),
                      1
                    ),
                  ]),
                  _: 1,
                },
                8,
                ["submitText", "title"]
              ),
            ],
            64
          )
        );
      };
    },
  };
const fs = (e) => (ie("data-v-98b1f7d6"), (e = e()), ce(), e),
  gs = { class: "flex justify-center items-center max-md:gap-4 max-md:mb-2" },
  vs = { class: "mb-3 text-center" },
  xs = { class: "flex items-center" },
  hs = fs(() =>
    o(
      "div",
      { class: "font-bold text-sm xs:text-base sm:text-lg ml-1 xs:ml-2" },
      " Region : ",
      -1
    )
  ),
  _s = { class: "text-xs xs:text-sm sm:text-base translate-y-[0px] ml-2" },
  ps = {
    __name: "RegionTradeSection3",
    props: { profile: Object, region_name: String, screenWidth: Number },
    setup(e) {
      var m;
      const t = e,
        f = P(),
        d = n((m = t.region_name) != null ? m : "");
      n("#241e6d");
      const x = ge({
          trade1: t.profile.trade1,
          trade2: t.profile.trade2,
          trade3: t.profile.trade3,
          trade4: t.profile.trade4,
          trade5: t.profile.trade5,
          trade6: t.profile.trade6,
          trade7: t.profile.trade7,
          trade8: t.profile.trade8,
          trade9: t.profile.trade9,
          trade10: t.profile.trade10,
          trade11: t.profile.trade11,
          trade12: t.profile.trade12,
          trade13: t.profile.trade13,
          trade14: t.profile.trade14,
          trade15: t.profile.trade15,
          trade16: t.profile.trade16,
          trade17: t.profile.trade17,
          trade18: t.profile.trade18,
          trade19: t.profile.trade19,
          trade20: t.profile.trade20,
          trade21: t.profile.trade21,
          trade22: t.profile.trade22,
          trade23: t.profile.trade23,
          trade24: t.profile.trade24,
          trade25: t.profile.trade25,
          trade26: t.profile.trade26,
          trade27: t.profile.trade27,
          trade28: t.profile.trade28,
          trade29: t.profile.trade29,
          trade30: t.profile.trade30,
        }),
        u = w(() => f.state.contractor.selectedColorScheme || H);
      w(() => ae.filter((v) => x[v.id] === 1));
      const h = w(() => f.getters.translations);
      return (v, y) => {
        const I = O("v-tooltip");
        return (
          l(),
          s(
            D,
            null,
            [
              o("div", gs, [
                r(
                  ye,
                  {
                    class: "text",
                    style: U({
                      marginBottom: e.screenWidth > 768 ? "0px" : "0",
                      fontWeight: 800,
                      fontSize: e.screenWidth > 640 ? "24px" : "20px",
                      color: u.value[3],
                    }),
                    heading: h.value && h.value.trades,
                  },
                  null,
                  8,
                  ["style", "heading"]
                ),
              ]),
              o("div", vs, [
                (l(!0),
                s(
                  D,
                  null,
                  X(
                    C(ae),
                    (a, g) => (
                      l(),
                      s(
                        D,
                        { key: a.name },
                        [
                          x[a.id] === 1
                            ? (l(),
                              E(
                                _e,
                                {
                                  key: 0,
                                  class: "my-1 mx-1 space-x-1 flex",
                                  style: U({
                                    backgroundColor:
                                      g % 2 === 0
                                        ? u.value[4]
                                        : C(ve)(u.value[4], 30),
                                    fontSize: "10px",
                                    paddingTop: "6px",
                                    paddingBottom: "6px",
                                  }),
                                },
                                { default: _(() => [ee(c(a.name), 1)]), _: 2 },
                                1032,
                                ["style"]
                              ))
                            : i("", !0),
                        ],
                        64
                      )
                    )
                  ),
                  128
                )),
              ]),
              d.value
                ? (l(),
                  s(
                    "div",
                    {
                      key: 0,
                      class:
                        "flex items-center justify-center w-full gap-2 xs:gap-4 mt-2 sm:mt-0",
                      style: U({ color: u.value[2] }),
                    },
                    [
                      o("div", xs, [
                        r(
                          I,
                          { text: "Region", location: "top" },
                          {
                            activator: _(({ props: a }) => [
                              r(
                                C(N),
                                W(a, {
                                  class: "w-6 h-6 sm:w-8 sm:h-8",
                                  icon: "mdi:location",
                                  color: u.value[3],
                                }),
                                null,
                                16,
                                ["color"]
                              ),
                            ]),
                            _: 1,
                          }
                        ),
                        hs,
                        o("div", _s, c(d.value), 1),
                      ]),
                    ],
                    4
                  ))
                : i("", !0),
            ],
            64
          )
        );
      };
    },
  },
  bs = te(ps, [["__scopeId", "data-v-98b1f7d6"]]);
const ys = { key: 0, class: "flex justify-center mb-3" },
  ws = { key: 1, class: "text-xl sm:text-2xl font-medium font-extrabold" },
  ks = { key: 2, class: "text-lg sm:text-xl font-medium font-bold" },
  $s = { key: 3, class: "text-base sm:text-lg font-semibold" },
  Is = {
    __name: "AdditionalInfoSection3",
    props: { profile: Object, screenWidth: Number },
    setup(e) {
      const t = e;
      n("#241e6d");
      const f = P(),
        d = n(t.profile.company_name);
      n(t.profile.company_logo),
        n(t.profile.phone_cell),
        n(t.profile.phone_office);
      const x = n(t.profile.address_1),
        u = n(t.profile.address_2),
        h = n(t.profile.city),
        m = n(t.profile.state);
      n(t.profile.county);
      const v = n(t.profile.zipcode),
        y = w(() => f.state.contractor.selectedColorScheme || H);
      return (I, a) => (
        l(),
        s(
          "div",
          {
            style: U({ color: y.value[2] }),
            class: "flex flex-col justify-center text-center mb-4",
          },
          [
            e.profile.user_avatar
              ? (l(),
                s("div", ys, [
                  r(he, { imageSrc: `/${e.profile.user_avatar}` }, null, 8, [
                    "imageSrc",
                  ]),
                ]))
              : i("", !0),
            d.value ? (l(), s("h2", ws, c(d.value), 1)) : i("", !0),
            x.value || u.value
              ? (l(), s("div", ks, c(x.value || u.value), 1))
              : i("", !0),
            h.value || m.value || v.value
              ? (l(),
                s("span", $s, c(h.value + ", " + m.value + " " + v.value), 1))
              : i("", !0),
          ],
          4
        )
      );
    },
  },
  Cs = te(Is, [["__scopeId", "data-v-a1b128e3"]]),
  Ss = { key: 0, class: A("mt-1 flex gap-1 flex-col rounded-lg closing") },
  Ws = ["innerHTML"],
  Ts = {
    __name: "BottomTitleText3",
    props: {
      screenWidth: { type: [String, Number] },
      bottom_text: { type: String },
    },
    setup(e) {
      const t = e,
        f = (u) => {
          const h = document.createElement("textarea");
          return (h.innerHTML = u), h.value;
        },
        d = w(() => {
          const h = new DOMParser().parseFromString(x.value, "text/html");
          return (
            h.querySelectorAll("a").forEach((m) => {
              const v = m.getAttribute("href");
              !v.startsWith("http://") &&
                !v.startsWith("https://") &&
                m.setAttribute("href", "http://" + v),
                (m.target = "_blank");
            }),
            h.body.innerHTML
          );
        }),
        x = n(f(t.bottom_text));
      return (u, h) =>
        d.value
          ? (l(),
            s("div", Ss, [
              o(
                "div",
                { class: "default ck-content", innerHTML: d.value },
                null,
                8,
                Ws
              ),
            ]))
          : i("", !0);
    },
  },
  js = {
    key: 0,
    class: A(
      " flex gap-1 flex-col rounded-lg closing md:border-gray-300 md:border-2 p-3"
    ),
  },
  Us = ["innerHTML"],
  Ns = { class: "flex justify-end gap-1" },
  Ls = {
    __name: "ClosingTitleText3",
    props: {
      screenWidth: { type: [String, Number] },
      loggedInUserId: [String, Number],
      closing_text: { type: String },
      userId: [String, Number],
    },
    setup(e) {
      const t = e,
        f = (g) => {
          const p = document.createElement("textarea");
          return (p.innerHTML = g), console.log("here"), p.value;
        },
        d = P(),
        x = n(f(t.closing_text)),
        u = n(!1),
        h = () => {
          if (v.value !== 3) {
            d.commit("setIsUpgradeToGoldPlatinumDialogOpen", !0);
            return;
          }
          a(window.location.href) && (u.value = !0);
        },
        m = w(() => d.getters.translations),
        v = w(() => d.getters.userVersion),
        y = w(() => d.state.contractor.selectedColorScheme || H),
        I = w(() => {
          const p = new DOMParser().parseFromString(x.value, "text/html");
          return (
            p.querySelectorAll("a").forEach(($) => {
              const S = $.getAttribute("href");
              !S.startsWith("http://") &&
                !S.startsWith("https://") &&
                $.setAttribute("href", "http://" + S),
                ($.target = "_blank");
            }),
            p.body.innerHTML
          );
        });
      function a(g) {
        const p = document.createElement("textarea");
        (p.value = g), document.body.appendChild(p), p.select();
        let $;
        try {
          $ = document.execCommand("copy");
        } catch (S) {
          console.error("Failed to copy text: ", S), ($ = !1);
        }
        return document.body.removeChild(p), $;
      }
      return (g, p) => {
        const $ = O("Link"),
          S = O("v-snackbar");
        return (
          l(),
          s(
            D,
            null,
            [
              I.value
                ? (l(),
                  s("div", js, [
                    o(
                      "div",
                      { class: "default ck-content", innerHTML: I.value },
                      null,
                      8,
                      Us
                    ),
                  ]))
                : i("", !0),
              o("div", Ns, [
                e.userId === e.loggedInUserId
                  ? (l(),
                    E(
                      $,
                      {
                        key: 0,
                        class: "rounded-full",
                        href: `/contractor/${e.userId}/edit`,
                      },
                      {
                        default: _(() => [
                          o(
                            "button",
                            {
                              class: A(
                                ` px-4 py-1 text-xs hover:bg-[#114678] sm:text-sm font-bold rounded-full border-[${y.value[4]}] border-[1px] text-white cursor-pointer hover:shadow-lg active:scale-95 w-full`
                              ),
                              style: U({
                                background: y.value[4],
                                borderColor: y.value[4],
                              }),
                            },
                            " Edit ",
                            6
                          ),
                        ]),
                        _: 1,
                      },
                      8,
                      ["href"]
                    ))
                  : i("", !0),
                o(
                  "button",
                  W(t, {
                    onClick: h,
                    style: { color: y.value[4], borderColor: y.value[4] },
                    class:
                      "bg-white px-4 py-1 text-xs hover:bg-[#f8f9fa] sm:text-sm font-bold rounded-full border-[1px] bg-white cursor-pointer hover:shadow-lg active:scale-95",
                  }),
                  c(m.value && m.value.share),
                  17
                ),
                r(
                  S,
                  {
                    location: "bottom",
                    modelValue: u.value,
                    "onUpdate:modelValue":
                      p[0] || (p[0] = (b) => (u.value = b)),
                    timeout: 2e3,
                    color: "success",
                  },
                  {
                    default: _(() => [
                      ee(c(m.value && m.value.link_copied_to_clipboard), 1),
                    ]),
                    _: 1,
                  },
                  8,
                  ["modelValue"]
                ),
              ]),
            ],
            64
          )
        );
      };
    },
  },
  Ds = {
    key: 0,
    class:
      "w-full p-4 md:p-6 text-xl md:text-2xl font-bold md:font-extrabold text-center",
  },
  Rs = { key: 1, class: "w-full h-full bg-[#222] rounded-md" },
  As = ["onClick", "src"],
  Vs = {
    key: 2,
    class:
      "flex max-md:flex-col gap-2 md:gap-4 items-center max-md:flex-col-reverse",
  },
  Ps = { class: "relative w-full md:w-3/5 h-3/5 bg-[#222] rounded-md" },
  Hs = ["onClick", "src"],
  Bs = {
    class:
      "w-2/4 md:w-2/4 text-xl md:text-3xl font-bold md:font-extrabold text-center",
  },
  Os = {
    class:
      "max-h-[400px] md:max-h-[500px] w-full flex justify-center xs:w-[400px] md:w-[600px] bg-[#222]",
  },
  Es = ["src"],
  Fs = {
    __name: "BragSection3",
    props: {
      screenWidth: { type: [String, Number] },
      brag_sections: { type: Array },
      contractorId: { type: Number },
    },
    setup(e) {
      const t = e,
        f = P(),
        d = n(t.brag_sections),
        x = n(""),
        u = n(),
        h = w(() => f.state.contractor.selectedColorScheme || H),
        m = w(() => f.getters.translations),
        v = (y) => {
          (x.value = y), u.value.openDialog();
        };
      return (y, I) => (
        l(),
        s(
          D,
          null,
          [
            d.value && d.value.length > 0
              ? (l(),
                s(
                  "div",
                  {
                    key: 0,
                    class: "flex gap-4 flex-col",
                    style: U({ color: h.value[2] }),
                  },
                  [
                    (l(!0),
                    s(
                      D,
                      null,
                      X(
                        d.value,
                        (a) => (
                          l(),
                          s(
                            "div",
                            {
                              key: a.id,
                              class:
                                "rounded-md border relative border-gray-300 p-2 sm:p-2",
                            },
                            [
                              !a.section_image && a.section_text
                                ? (l(), s("div", Ds, c(a.section_text), 1))
                                : i("", !0),
                              a.section_image && !a.section_text
                                ? (l(),
                                  s("div", Rs, [
                                    o(
                                      "img",
                                      {
                                        onClick: (g) => v(a.section_image),
                                        src: a.section_image,
                                        alt: "Section Image",
                                        class: "object-cover w-full rounded-md",
                                      },
                                      null,
                                      8,
                                      As
                                    ),
                                  ]))
                                : i("", !0),
                              a.section_image && a.section_text
                                ? (l(),
                                  s("div", Vs, [
                                    o("div", Ps, [
                                      o(
                                        "img",
                                        {
                                          onClick: (g) => v(a.section_image),
                                          src: a.section_image,
                                          alt: "Section Image",
                                          class:
                                            "object-cover rounded-md w-full",
                                        },
                                        null,
                                        8,
                                        Hs
                                      ),
                                    ]),
                                    o("div", Bs, c(a.section_text), 1),
                                  ]))
                                : i("", !0),
                            ]
                          )
                        )
                      ),
                      128
                    )),
                  ],
                  4
                ))
              : i("", !0),
            r(
              Q,
              {
                dialogWidth: "widthAuto",
                showFooter: !1,
                ref_key: "imageIncDialogRef",
                ref: u,
                title: m.value && m.value.your_image,
              },
              {
                default: _(() => [
                  o("div", Os, [o("img", { src: x.value }, null, 8, Es)]),
                ]),
                _: 1,
              },
              8,
              ["title"]
            ),
          ],
          64
        )
      );
    },
  },
  Ms = {
    key: 0,
    class:
      "w-full p-4 md:p-6 text-xl md:text-2xl font-bold md:font-extrabold text-xl md:text-3xl font-bold md:font-extrabold text-center",
  },
  Gs = { key: 1, class: "w-full h-full bg-[#222] rounded-md" },
  zs = ["onClick", "src"],
  qs = {
    key: 2,
    class:
      "flex max-md:flex-col gap-2 md:gap-4 items-center max-md:flex-col-reverse",
  },
  Ys = { class: "relative w-full md:w-2/4 h-2/4 bg-[#222] rounded-md" },
  Js = ["onClick", "src"],
  Ks = {
    class:
      "w-2/5 md:w-2/5 text-xl md:text-3xl font-bold md:font-extrabold text-center",
  },
  Xs = {
    class:
      "max-h-[400px] md:max-h-[500px] w-full flex justify-center xs:w-[400px] md:w-[600px] bg-[#222]",
  },
  Qs = ["src"],
  Zs = {
    __name: "ImageTextSection3",
    props: {
      screenWidth: { type: [String, Number] },
      image_sections: { type: Array },
      contractorId: { type: Number },
    },
    setup(e) {
      const t = e,
        f = P(),
        d = n(t.image_sections),
        x = n(""),
        u = n(),
        h = w(() => f.state.contractor.selectedColorScheme || H),
        m = w(() => f.getters.translations),
        v = (y) => {
          (x.value = y), console.log("infunction call"), u.value.openDialog();
        };
      return (y, I) => (
        l(),
        s(
          D,
          null,
          [
            d.value && d.value.length > 0
              ? (l(),
                s(
                  "div",
                  {
                    key: 0,
                    style: U({ color: h.value[2] }),
                    class: "flex gap-4 flex-col",
                  },
                  [
                    (l(!0),
                    s(
                      D,
                      null,
                      X(
                        d.value,
                        (a) => (
                          l(),
                          s(
                            "div",
                            {
                              key: a.id,
                              class:
                                "rounded-md border relative border-gray-300 p-2 sm:p-2",
                            },
                            [
                              !a.section_image && a.section_text
                                ? (l(), s("div", Ms, c(a.section_text), 1))
                                : i("", !0),
                              a.section_image && !a.section_text
                                ? (l(),
                                  s("div", Gs, [
                                    o(
                                      "img",
                                      {
                                        onClick: (g) => v(a.section_image),
                                        src: a.section_image,
                                        alt: "Section Image",
                                        class: "object-cover w-full rounded-md",
                                      },
                                      null,
                                      8,
                                      zs
                                    ),
                                  ]))
                                : i("", !0),
                              a.section_image && a.section_text
                                ? (l(),
                                  s("div", qs, [
                                    o("div", Ys, [
                                      o(
                                        "img",
                                        {
                                          onClick: (g) => v(a.section_image),
                                          src: a.section_image,
                                          alt: "Section Image",
                                          class:
                                            "object-cover rounded-md w-full",
                                        },
                                        null,
                                        8,
                                        Js
                                      ),
                                    ]),
                                    o("div", Ks, c(a.section_text), 1),
                                  ]))
                                : i("", !0),
                            ]
                          )
                        )
                      ),
                      128
                    )),
                  ],
                  4
                ))
              : i("", !0),
            r(
              Q,
              {
                dialogWidth: "widthAuto",
                showFooter: !1,
                ref_key: "imageIncDialogRef",
                ref: u,
                title: m.value && m.value.your_image,
              },
              {
                default: _(() => [
                  o("div", Xs, [o("img", { src: x.value }, null, 8, Qs)]),
                ]),
                _: 1,
              },
              8,
              ["title"]
            ),
          ],
          64
        )
      );
    },
  };
const ea = (e) => (ie("data-v-18c3ab74"), (e = e()), ce(), e),
  ta = { key: 0 },
  oa = { key: 1 },
  la = { key: 2 },
  sa = { key: 3 },
  aa = { key: 4 },
  ra = { key: 5 },
  na = { key: 6 },
  ia = {
    class: "flex flex-col justify-between gap-3 items-center mt-3 md:mt-6",
  },
  ca = ["href"],
  da = ea(() => o("div", null, "Visit our Website", -1)),
  ua = { class: "flex gap-2 items-center text-sm md:text-base" },
  ma = ["href"],
  fa = ["href"],
  ga = ["href"],
  va = ["href"],
  xa = {
    __name: "Footer3",
    props: { profile: Object, screenWidth: Number },
    setup(e) {
      const t = e;
      n("#241e6d");
      const f = P();
      n(t.profile.company_name), n(t.profile.company_logo);
      const d = n(t.profile.phone_cell),
        x = n(t.profile.phone_office),
        u = n(t.profile.address_1),
        h = n(t.profile.address_2);
      n(t.profile.city),
        n(t.profile.state),
        n(t.profile.county),
        n(t.profile.zipcode);
      const m = w(() => f.state.contractor.selectedColorScheme || H),
        v = (y) =>
          y
            ? y.startsWith("http://") || y.startsWith("https://")
              ? y
              : `http://${y}`
            : "";
      return (y, I) => {
        const a = O("v-tooltip");
        return (
          l(),
          s(
            "div",
            { class: "p-2 mt-3", style: U({ background: m.value[0] }) },
            [
              o(
                "div",
                {
                  class:
                    "flex flex-col justify-center mt-3 md:mt-6 text-base md:text-lg max-md:items-center items-center font-semibold emailPhoneSection",
                  style: U({ color: m.value[2] }),
                },
                [
                  u.value
                    ? (l(),
                      s("div", ta, [
                        r(
                          a,
                          { text: "Address 1", location: "top" },
                          {
                            activator: _(({ props: g }) => [
                              r(
                                C(N),
                                W(g, {
                                  color: m.value[3],
                                  icon: "entypo:address",
                                  class: "w-5 h-5",
                                }),
                                null,
                                16,
                                ["color"]
                              ),
                            ]),
                            _: 1,
                          }
                        ),
                        o("div", null, c(u.value), 1),
                      ]))
                    : i("", !0),
                  h.value ? (l(), s("div", oa, "OR")) : i("", !0),
                  h.value
                    ? (l(),
                      s("div", la, [
                        r(
                          a,
                          { text: "Alternative Address", location: "top" },
                          {
                            activator: _(({ props: g }) => [
                              r(
                                C(N),
                                W(g, {
                                  color: m.value[3],
                                  icon: "entypo:address",
                                  class: "w-5 h-5",
                                }),
                                null,
                                16,
                                ["color"]
                              ),
                            ]),
                            _: 1,
                          }
                        ),
                        o("div", null, c(h.value), 1),
                      ]))
                    : i("", !0),
                  x.value
                    ? (l(),
                      s("div", sa, [
                        r(
                          a,
                          { text: "Phone Office", location: "top" },
                          {
                            activator: _(({ props: g }) => [
                              r(
                                C(N),
                                W(g, {
                                  color: m.value[3],
                                  icon: "wpf:phone-office",
                                  class: "w-5 h-5",
                                }),
                                null,
                                16,
                                ["color"]
                              ),
                            ]),
                            _: 1,
                          }
                        ),
                        o("div", null, c(x.value), 1),
                      ]))
                    : d.value
                    ? (l(),
                      s("div", aa, [
                        r(
                          a,
                          { text: "Phone Cell", location: "top" },
                          {
                            activator: _(({ props: g }) => [
                              r(
                                C(N),
                                W(g, {
                                  color: m.value[3],
                                  icon: "ic:baseline-phone",
                                  class: "w-5 h-5",
                                }),
                                null,
                                16,
                                ["color"]
                              ),
                            ]),
                            _: 1,
                          }
                        ),
                        o("div", null, c(d.value), 1),
                      ]))
                    : i("", !0),
                  e.profile.email
                    ? (l(),
                      s("div", ra, [
                        r(
                          a,
                          { text: "Email", location: "top" },
                          {
                            activator: _(({ props: g }) => [
                              r(
                                C(N),
                                W(g, {
                                  color: m.value[3],
                                  icon: "bi:envelope-fill",
                                  class: "w-5 h-5",
                                }),
                                null,
                                16,
                                ["color"]
                              ),
                            ]),
                            _: 1,
                          }
                        ),
                        o("div", null, c(e.profile.email), 1),
                      ]))
                    : i("", !0),
                  e.profile.county
                    ? (l(),
                      s("div", na, [
                        r(
                          a,
                          { text: "County", location: "top" },
                          {
                            activator: _(({ props: g }) => [
                              r(
                                C(N),
                                W(g, {
                                  color: m.value[3],
                                  icon: "tabler:location-filled",
                                  class: "w-5 h-5",
                                }),
                                null,
                                16,
                                ["color"]
                              ),
                            ]),
                            _: 1,
                          }
                        ),
                        o("div", null, "County: " + c(e.profile.county), 1),
                      ]))
                    : i("", !0),
                  o("div", ia, [
                    e.profile.website_url
                      ? (l(),
                        s(
                          "a",
                          { key: 0, href: v(e.profile.website_url) },
                          [
                            r(
                              a,
                              { text: "Website", location: "top" },
                              {
                                activator: _(({ props: g }) => [
                                  r(
                                    C(N),
                                    W(g, {
                                      icon: "fluent-mdl2:website",
                                      color: m.value[3],
                                      class: "w-8 h-8",
                                    }),
                                    null,
                                    16,
                                    ["color"]
                                  ),
                                ]),
                                _: 1,
                              }
                            ),
                            da,
                          ],
                          8,
                          ca
                        ))
                      : i("", !0),
                    o("div", ua, [
                      e.profile.facebook
                        ? (l(),
                          s(
                            "a",
                            { key: 0, href: v(e.profile.facebook) },
                            [
                              r(
                                a,
                                { text: "Facebook", location: "top" },
                                {
                                  activator: _(({ props: g }) => [
                                    r(
                                      C(N),
                                      W({ class: "w-8 h-8" }, g, {
                                        icon: "logos:facebook",
                                      }),
                                      null,
                                      16
                                    ),
                                  ]),
                                  _: 1,
                                }
                              ),
                            ],
                            8,
                            ma
                          ))
                        : i("", !0),
                      e.profile.twitter
                        ? (l(),
                          s(
                            "a",
                            { key: 1, href: v(e.profile.twitter) },
                            [
                              r(
                                a,
                                { text: "Twitter", location: "top" },
                                {
                                  activator: _(({ props: g }) => [
                                    r(
                                      C(N),
                                      W({ class: "w-8 h-8" }, g, {
                                        icon: "fa6-brands:square-x-twitter",
                                        color: "black",
                                      }),
                                      null,
                                      16
                                    ),
                                  ]),
                                  _: 1,
                                }
                              ),
                            ],
                            8,
                            fa
                          ))
                        : i("", !0),
                      e.profile.tiktok
                        ? (l(),
                          s(
                            "a",
                            { key: 2, href: v(e.profile.tiktok) },
                            [
                              r(
                                a,
                                { text: "TikTok", location: "top" },
                                {
                                  activator: _(({ props: g }) => [
                                    r(
                                      C(N),
                                      W({ class: "w-8 h-8" }, g, {
                                        icon: "logos:tiktok-icon",
                                      }),
                                      null,
                                      16
                                    ),
                                  ]),
                                  _: 1,
                                }
                              ),
                            ],
                            8,
                            ga
                          ))
                        : i("", !0),
                      e.profile.instagram
                        ? (l(),
                          s(
                            "a",
                            { key: 3, href: v(e.profile.instagram) },
                            [
                              r(
                                a,
                                { text: "Instagram", location: "top" },
                                {
                                  activator: _(({ props: g }) => [
                                    r(
                                      C(N),
                                      W({ class: "w-8 h-8" }, g, {
                                        icon: "skill-icons:instagram",
                                      }),
                                      null,
                                      16
                                    ),
                                  ]),
                                  _: 1,
                                }
                              ),
                            ],
                            8,
                            va
                          ))
                        : i("", !0),
                    ]),
                  ]),
                ],
                4
              ),
            ],
            4
          )
        );
      };
    },
  },
  ha = te(xa, [["__scopeId", "data-v-18c3ab74"]]),
  _a = { key: 0 },
  pa = { class: "flex flex-col gap-3 sm:gap-4" },
  ba = { class: "mt-6" },
  ya = { class: "flex flex-col mb-6 md:flex-row gap-2 items-stretch" },
  wa = {
    __name: "Template3",
    props: {
      profile: Object,
      loggedInUserId: [String, Number],
      region_name: String,
      total_reviews: [Number, String],
      average_rating: [Number, String],
      screenWidth: Number,
      starPercentages: { type: Array, default: [] },
    },
    setup(e) {
      const t = P(),
        f = w(() => t.state.contractor.selectedColorScheme || H);
      return (d, x) =>
        e.profile
          ? (l(),
            s("div", _a, [
              o("div", pa, [
                r(
                  le,
                  {
                    shadowLevel: 2,
                    bgColor: f.value[1],
                    padding: e.screenWidth < 640 ? "7px" : "15px",
                  },
                  {
                    default: _(() => [
                      r(
                        ms,
                        {
                          screenWidth: e.screenWidth,
                          loggedInUserId: e.loggedInUserId,
                          averageRating: e.average_rating,
                          total_reviews: e.total_reviews,
                          profile: e.profile,
                        },
                        null,
                        8,
                        [
                          "screenWidth",
                          "loggedInUserId",
                          "averageRating",
                          "total_reviews",
                          "profile",
                        ]
                      ),
                      o("div", ba, [
                        e.profile.image_sections &&
                        e.profile.image_sections.length > 0
                          ? (l(),
                            E(
                              Zs,
                              {
                                key: 0,
                                image_sections: e.profile.image_sections,
                                "contractor-id": e.profile.id,
                                "screen-width": e.screenWidth,
                              },
                              null,
                              8,
                              [
                                "image_sections",
                                "contractor-id",
                                "screen-width",
                              ]
                            ))
                          : i("", !0),
                      ]),
                      e.profile.bottom_text
                        ? (l(),
                          s(
                            "div",
                            {
                              key: 0,
                              class: "my-6",
                              style: U({ color: f.value[2] }),
                            },
                            [
                              r(
                                Ts,
                                {
                                  class: "md:border-gray-300 md:border-2 p-3",
                                  bottom_text: e.profile.bottom_text,
                                  "screen-width": e.screenWidth,
                                },
                                null,
                                8,
                                ["bottom_text", "screen-width"]
                              ),
                            ],
                            4
                          ))
                        : i("", !0),
                      o("div", ya, [
                        r(
                          le,
                          {
                            shadowLevel: 2,
                            cardInnerClasses: "h-full",
                            bgColor: f.value[1],
                            isInside: !0,
                            class: "h-auto h-full",
                            padding: e.screenWidth < 640 ? "7px" : "20px",
                          },
                          {
                            default: _(() => [
                              r(
                                Cs,
                                {
                                  class: "",
                                  screenWidth: e.screenWidth,
                                  profile: e.profile,
                                },
                                null,
                                8,
                                ["screenWidth", "profile"]
                              ),
                              r(
                                bs,
                                {
                                  screenWidth: e.screenWidth,
                                  region_name: e.region_name,
                                  profile: e.profile,
                                },
                                null,
                                8,
                                ["screenWidth", "region_name", "profile"]
                              ),
                            ]),
                            _: 1,
                          },
                          8,
                          ["bgColor", "padding"]
                        ),
                      ]),
                      e.profile.brag_sections &&
                      e.profile.brag_sections.length > 0
                        ? (l(),
                          E(
                            Fs,
                            {
                              key: 1,
                              brag_sections: e.profile.brag_sections,
                              "contractor-id": e.profile.id,
                              "screen-width": e.screenWidth,
                            },
                            null,
                            8,
                            ["brag_sections", "contractor-id", "screen-width"]
                          ))
                        : i("", !0),
                      e.profile.bottom_text || e.profile.closing_text
                        ? (l(),
                          s(
                            "div",
                            {
                              key: 2,
                              class: "flex gap-2 flex-col mt-6",
                              style: U({ color: f.value[2] }),
                            },
                            [
                              r(
                                Ls,
                                {
                                  userId: e.profile.user_id,
                                  loggedInUserId: e.loggedInUserId,
                                  closing_text: e.profile.closing_text,
                                  "screen-width": e.screenWidth,
                                },
                                null,
                                8,
                                [
                                  "userId",
                                  "loggedInUserId",
                                  "closing_text",
                                  "screen-width",
                                ]
                              ),
                            ],
                            4
                          ))
                        : i("", !0),
                      r(
                        ha,
                        { screenWidth: e.screenWidth, profile: e.profile },
                        null,
                        8,
                        ["screenWidth", "profile"]
                      ),
                    ]),
                    _: 1,
                  },
                  8,
                  ["bgColor", "padding"]
                ),
              ]),
            ]))
          : i("", !0);
    },
  },
  ka = { key: 0, class: "flex gap-2 mb-1 items-center" },
  $a = { key: 0, class: "mr-4 flex-none" },
  Ia = { class: "flex-grow" },
  Ca = { class: "text-xl font-semibold mt-1" },
  Sa = { key: 0, class: "text-base md:text-xl" },
  Wa = { class: "flex flex-col md:flex-row items-start md:items-center" },
  Ta = {
    key: 0,
    class: "mx-2 md:flex md:justify-center md:items-center translate-y-[-1px]",
  },
  ja = { class: "flex items-center gap-1" },
  Ua = o(
    "div",
    { class: "" },
    [
      o("img", {
        src: "/images/icons/pre-diamond.png",
        width: "20",
        height: "30",
      }),
    ],
    -1
  ),
  Na = { class: "flex flex-col justify-center items-center" },
  La = { class: "" },
  Da = { class: "font-light text-xs overflow-hidden tracking-tighter" },
  Ra = { class: "flex gap-2 sm:gap-3 translate-x-[-2px]" },
  Aa = {
    class:
      "xs:text-md w-[28px] h-[28px] xs:w-[35px] xs:h-[35px] font-semibold flex items-center justify-center",
  },
  Va = { class: "flex flex-col gap-1" },
  Pa = { class: "mb-4 sm:mb-0 mt-4" },
  Ha = {
    __name: "ProfileHeader4",
    props: {
      profile: Object,
      loggedInUserId: [String, Number],
      screenWidth: Number,
      averageRating: { type: Number, default: 0 },
      total_reviews: { type: Number, default: 0 },
    },
    setup(e) {
      var oe, Z;
      const t = e,
        f = n(!1),
        d = n(),
        x = n();
      let u = fe().props.value;
      (oe = u == null ? void 0 : u.auth) == null || oe.user;
      const h = (Z = u == null ? void 0 : u.profile) == null ? void 0 : Z.id,
        m = n(""),
        v = n(),
        y = n(!0);
      ue(() => {
        const j = localStorage.getItem("showGoBack");
        j === "false" && (y.value = !1),
          console.log(j),
          localStorage.removeItem("showGoBack");
      });
      const I = () => {
          v.value.closeDialog();
        },
        a = () => {
          v.value.openDialog();
        },
        g = () => {
          if (J.value !== 3) {
            S.commit("setIsUpgradeToGoldPlatinumDialogOpen", !0);
            return;
          }
          p(window.location.href) && (f.value = !0);
        };
      function p(j) {
        const L = document.createElement("textarea");
        (L.value = j), document.body.appendChild(L), L.select();
        let B;
        try {
          B = document.execCommand("copy");
        } catch (q) {
          console.error("Failed to copy text: ", q), (B = !1);
        }
        return document.body.removeChild(L), B;
      }
      const $ = () => {
          const j = localStorage.getItem("prevUrl");
          console.log(j),
            j === "/post"
              ? Y.Inertia.visit(j)
              : j === "/edit"
              ? Y.Inertia.visit(`/contractor/${t.profile.user_id}/edit`)
              : j === "/settings"
              ? Y.Inertia.visit("/settings")
              : Y.Inertia.visit("/sub-finder");
        },
        S = P();
      n("#241e6d");
      const b = n(t.profile.first_name),
        k = n(t.profile.last_name);
      n(t.profile.user_avatar);
      const z = n(t.profile.company_name),
        V = n(t.profile.city),
        G = n(t.profile.state),
        T = w(() => S.getters.translations),
        J = w(() => S.getters.userVersion),
        R = w(() => S.state.contractor.selectedColorScheme || H),
        M = w(() => b.value + " " + k.value),
        K = w(() => {
          if (
            (console.log("here in teh trunctated", t.screenWidth),
            t.screenWidth < 600)
          ) {
            const j = t.screenWidth < 400 ? 30 : 34;
            return M.value.length > j
              ? M.value.substring(0, j) + "..."
              : M.value;
          } else return b.value + " " + k.value;
        }),
        re = () => {
          h ? d.value.openDialog() : ((m.value = "ratings"), a());
        },
        ne = () => {
          h ? x.value.openDialog() : ((m.value = "posts"), a());
        };
      return (j, L) => {
        const B = O("v-tooltip"),
          q = O("Link"),
          se = O("v-snackbar");
        return (
          l(),
          s(
            D,
            null,
            [
              y.value
                ? (l(),
                  s("div", ka, [
                    o("div", { onClick: $, class: "cursor-pointer" }, [
                      r(
                        C(N),
                        {
                          class: "w-8 h-8",
                          icon: "ion:arrow-back",
                          color: R.value[3],
                        },
                        null,
                        8,
                        ["color"]
                      ),
                    ]),
                    o(
                      "div",
                      {
                        onClick: $,
                        class:
                          "font-bold cursor-pointer translate-y-[1px] flex justify-center items-center text-2xl leading-tight",
                        style: U({ color: R.value[3] }),
                      },
                      c(T.value && T.value.go_back),
                      5
                    ),
                  ]))
                : i("", !0),
              o(
                "div",
                { class: "flex gap-2 mt-4", style: U({ color: R.value[2] }) },
                [
                  o(
                    "div",
                    {
                      class: A([
                        `${e.screenWidth > 768 ? "w-3/4" : "w-4/5"}`,
                        "flex items-start",
                      ]),
                    },
                    [
                      e.profile.company_logo
                        ? (l(),
                          s("div", $a, [
                            r(
                              Ie,
                              {
                                imageClass: "companyLogo",
                                imageSrc: `/${e.profile.company_logo}`,
                              },
                              null,
                              8,
                              ["imageSrc"]
                            ),
                          ]))
                        : i("", !0),
                      o("div", Ia, [
                        z.value
                          ? (l(),
                            s(
                              "div",
                              {
                                key: 0,
                                class:
                                  "text-2xl xs:text-3xl font-bold uppercase",
                                style: U([
                                  { "line-height": "2rem" },
                                  { color: R.value[3] },
                                ]),
                              },
                              c(z.value),
                              5
                            ))
                          : i("", !0),
                        o("div", null, [
                          r(
                            B,
                            {
                              "open-on-click": !0,
                              "open-on-focus": !0,
                              text: M.value,
                              location: "bottom",
                            },
                            {
                              activator: _(({ props: F }) => [
                                o(
                                  "h2",
                                  W(
                                    {
                                      class:
                                        "text-xl xs:text-2xl font-medium font-bold",
                                    },
                                    F,
                                    { style: { "line-height": "1.7rem" } }
                                  ),
                                  c(K.value),
                                  17
                                ),
                              ]),
                              _: 1,
                            },
                            8,
                            ["text"]
                          ),
                        ]),
                        o("div", Ca, [
                          V.value || G.value
                            ? (l(),
                              s("div", Sa, c(V.value + ", " + G.value), 1))
                            : i("", !0),
                          o("div", Wa, [
                            o(
                              "div",
                              null,
                              c(e.profile.phone_office || e.profile.phone_cell),
                              1
                            ),
                            e.screenWidth > 768
                              ? (l(), s("div", Ta, " | "))
                              : i("", !0),
                            o("div", null, c(e.profile.email), 1),
                          ]),
                        ]),
                      ]),
                    ],
                    2
                  ),
                  o(
                    "div",
                    {
                      class: A(
                        ` ${
                          e.screenWidth > 768 ? "w-1/4" : ""
                        } flex-grow flex flex-col gap-2  flex justify-center  items-center `
                      ),
                    },
                    [
                      o("div", ja, [
                        Ua,
                        o("div", Na, [
                          r(
                            pe,
                            {
                              onClick: re,
                              starWidth: e.screenWidth > 768 ? 18 : 15,
                              class: A("h-4 cursor-pointer "),
                              indicatorClasses: "text-small h-4 ",
                              starHeight: e.screenWidth > 768 ? 18 : 15,
                              rating: Number(
                                parseFloat(
                                  e.averageRating ? e.averageRating : 0
                                ).toFixed(1)
                              ),
                              isIndicatorActive: !1,
                            },
                            null,
                            8,
                            ["starWidth", "starHeight", "rating"]
                          ),
                          o("div", La, [o("h2", Da, c(e.total_reviews), 1)]),
                        ]),
                        o("div", Ra, [
                          r(
                            B,
                            {
                              text: T.value && T.value.see_user_posts,
                              location: "left",
                            },
                            {
                              activator: _(({ props: F }) => [
                                o(
                                  "div",
                                  {
                                    onClick: ne,
                                    class:
                                      "active:scale-95 hover:bg-[#f8f9fa] hover:rounded-md",
                                  },
                                  [
                                    o("button", Aa, [
                                      o(
                                        "img",
                                        W(
                                          { src: "/images/icons/post_b.png" },
                                          F,
                                          { width: "28", height: "28" }
                                        ),
                                        null,
                                        16
                                      ),
                                    ]),
                                  ]
                                ),
                              ]),
                              _: 1,
                            },
                            8,
                            ["text"]
                          ),
                        ]),
                      ]),
                      o("div", Va, [
                        e.profile.user_id === e.loggedInUserId
                          ? (l(),
                            E(
                              q,
                              {
                                key: 0,
                                class: "rounded-full",
                                href: `/contractor/${e.profile.user_id}/edit`,
                              },
                              {
                                default: _(() => [
                                  o(
                                    "button",
                                    {
                                      class: A(
                                        ` px-4 py-1 text-xs hover:bg-[#114678] sm:text-sm font-bold rounded-full border-[${R.value[4]}] border-[1px] text-white cursor-pointer hover:shadow-lg active:scale-95 w-full`
                                      ),
                                      style: U({
                                        background: R.value[4],
                                        borderColor: R.value[4],
                                      }),
                                    },
                                    " Edit ",
                                    6
                                  ),
                                ]),
                                _: 1,
                              },
                              8,
                              ["href"]
                            ))
                          : i("", !0),
                        o(
                          "button",
                          W(t, {
                            onClick: g,
                            style: {
                              color: R.value[4],
                              borderColor: R.value[4],
                            },
                            class:
                              "bg-white px-4 py-1 text-xs hover:bg-[#f8f9fa] sm:text-sm font-bold rounded-full border-[1px] bg-white cursor-pointer hover:shadow-lg active:scale-95",
                          }),
                          c(T.value && T.value.share),
                          17
                        ),
                        r(
                          se,
                          {
                            location: "bottom",
                            modelValue: f.value,
                            "onUpdate:modelValue":
                              L[0] || (L[0] = (F) => (f.value = F)),
                            timeout: 2e3,
                            color: "success",
                          },
                          {
                            default: _(() => [
                              ee(
                                c(T.value && T.value.link_copied_to_clipboard),
                                1
                              ),
                            ]),
                            _: 1,
                          },
                          8,
                          ["modelValue"]
                        ),
                      ]),
                    ],
                    2
                  ),
                ],
                4
              ),
              r(
                be,
                {
                  ref_key: "ratingDialogRef",
                  ref: d,
                  loggedInUserId: C(h),
                  userId: e.profile.user_id,
                },
                null,
                8,
                ["loggedInUserId", "userId"]
              ),
              r(
                xe,
                {
                  ref_key: "postDialogRef",
                  ref: x,
                  contractorId: e.profile.user_id,
                },
                null,
                8,
                ["contractorId"]
              ),
              r(
                Q,
                {
                  submitText: T.value && T.value.okay,
                  onSubmit: I,
                  showCancel: !1,
                  disableOutSideClick: !1,
                  ref_key: "notLoggedDialogRef",
                  ref: v,
                  errorIcon: "",
                  title: T.value && T.value.log_in_error,
                },
                {
                  default: _(() => [
                    o(
                      "div",
                      Pa,
                      c(T.value && T.value.you_must_be_logged_in) +
                        " " +
                        c(m.value),
                      1
                    ),
                  ]),
                  _: 1,
                },
                8,
                ["submitText", "title"]
              ),
            ],
            64
          )
        );
      };
    },
  };
const Ba = (e) => (ie("data-v-242f4a0d"), (e = e()), ce(), e),
  Oa = {
    class:
      "flex justify-center items-center md:justify-between max-md:gap-4 max-md:mb-2",
  },
  Ea = { class: "mb-3 max-md:text-center" },
  Fa = { class: "flex items-center" },
  Ma = Ba(() =>
    o(
      "div",
      { class: "font-bold text-sm xs:text-base sm:text-lg ml-1 xs:ml-2" },
      " Region : ",
      -1
    )
  ),
  Ga = { class: "text-xs xs:text-sm sm:text-base translate-y-[0px] ml-2" },
  za = {
    __name: "RegionTradeSection4",
    props: { profile: Object, region_name: String, screenWidth: Number },
    setup(e) {
      var m;
      const t = e,
        f = P(),
        d = n((m = t.region_name) != null ? m : "");
      n("#241e6d");
      const x = ge({
          trade1: t.profile.trade1,
          trade2: t.profile.trade2,
          trade3: t.profile.trade3,
          trade4: t.profile.trade4,
          trade5: t.profile.trade5,
          trade6: t.profile.trade6,
          trade7: t.profile.trade7,
          trade8: t.profile.trade8,
          trade9: t.profile.trade9,
          trade10: t.profile.trade10,
          trade11: t.profile.trade11,
          trade12: t.profile.trade12,
          trade13: t.profile.trade13,
          trade14: t.profile.trade14,
          trade15: t.profile.trade15,
          trade16: t.profile.trade16,
          trade17: t.profile.trade17,
          trade18: t.profile.trade18,
          trade19: t.profile.trade19,
          trade20: t.profile.trade20,
          trade21: t.profile.trade21,
          trade22: t.profile.trade22,
          trade23: t.profile.trade23,
          trade24: t.profile.trade24,
          trade25: t.profile.trade25,
          trade26: t.profile.trade26,
          trade27: t.profile.trade27,
          trade28: t.profile.trade28,
          trade29: t.profile.trade29,
          trade30: t.profile.trade30,
        }),
        u = w(() => f.state.contractor.selectedColorScheme || H);
      w(() => ae.filter((v) => x[v.id] === 1));
      const h = w(() => f.getters.translations);
      return (v, y) => {
        const I = O("v-tooltip");
        return (
          l(),
          s(
            D,
            null,
            [
              o("div", Oa, [
                r(
                  ye,
                  {
                    class: "text",
                    style: U({
                      marginBottom: e.screenWidth > 768 ? "0px" : "0",
                      fontWeight: 800,
                      fontSize: e.screenWidth > 640 ? "24px" : "20px",
                      color: u.value[3],
                    }),
                    heading: h.value && h.value.trades,
                  },
                  null,
                  8,
                  ["style", "heading"]
                ),
              ]),
              o("div", Ea, [
                (l(!0),
                s(
                  D,
                  null,
                  X(
                    C(ae),
                    (a, g) => (
                      l(),
                      s(
                        D,
                        { key: a.name },
                        [
                          x[a.id] === 1
                            ? (l(),
                              E(
                                _e,
                                {
                                  key: 0,
                                  class: "my-1 mx-1 space-x-1 flex",
                                  style: U({
                                    backgroundColor:
                                      g % 2 === 0
                                        ? u.value[4]
                                        : C(ve)(u.value[4], 30),
                                    fontSize: "10px",
                                    paddingTop: "6px",
                                    paddingBottom: "6px",
                                  }),
                                },
                                { default: _(() => [ee(c(a.name), 1)]), _: 2 },
                                1032,
                                ["style"]
                              ))
                            : i("", !0),
                        ],
                        64
                      )
                    )
                  ),
                  128
                )),
              ]),
              d.value
                ? (l(),
                  s(
                    "div",
                    {
                      key: 0,
                      class:
                        "flex items-center justify-center md:justify-between w-full gap-2 xs:gap-4 mt-2 sm:mt-0",
                      style: U({ color: u.value[2] }),
                    },
                    [
                      o("div", Fa, [
                        r(
                          I,
                          { text: "Region", location: "top" },
                          {
                            activator: _(({ props: a }) => [
                              r(
                                C(N),
                                W(a, {
                                  class: "w-6 h-6 sm:w-8 sm:h-8",
                                  icon: "mdi:location",
                                  color: u.value[3],
                                }),
                                null,
                                16,
                                ["color"]
                              ),
                            ]),
                            _: 1,
                          }
                        ),
                        Ma,
                        o("div", Ga, c(d.value), 1),
                      ]),
                    ],
                    4
                  ))
                : i("", !0),
            ],
            64
          )
        );
      };
    },
  },
  qa = te(za, [["__scopeId", "data-v-242f4a0d"]]);
const Ya = { key: 0, class: "flex mb-3" },
  Ja = { class: "flex flex-col" },
  Ka = { key: 0, class: "text-xl sm:text-2xl font-medium font-extrabold" },
  Xa = { key: 1, class: "text-lg sm:text-xl font-medium font-bold" },
  Qa = { key: 2, class: "text-base sm:text-lg font-semibold" },
  Za = { key: 0 },
  er = { key: 1 },
  tr = { key: 2 },
  or = { key: 3 },
  lr = { key: 4 },
  sr = {
    class:
      "flex flex-col gap-1 mt-3 md:mt-6 max-md:items-center text-sm md:text-base",
  },
  ar = ["href"],
  rr = ["href"],
  nr = ["href"],
  ir = ["href"],
  cr = ["href"],
  dr = {
    __name: "AdditionalInfoSection4",
    props: { profile: Object, screenWidth: Number },
    setup(e) {
      const t = e;
      n("#241e6d");
      const f = P(),
        d = n(t.profile.company_name);
      n(t.profile.company_logo);
      const x = n(t.profile.phone_cell),
        u = n(t.profile.phone_office),
        h = n(t.profile.address_1),
        m = n(t.profile.address_2),
        v = n(t.profile.city),
        y = n(t.profile.state);
      n(t.profile.county);
      const I = n(t.profile.zipcode),
        a = w(() => f.state.contractor.selectedColorScheme || H),
        g = w(() => f.getters.translations),
        p = ($) =>
          $
            ? $.startsWith("http://") || $.startsWith("https://")
              ? $
              : `http://${$}`
            : "";
      return ($, S) => {
        const b = O("v-tooltip");
        return (
          l(),
          s(
            D,
            null,
            [
              o(
                "div",
                { style: U({ color: a.value[2] }), class: "flex gap-2" },
                [
                  e.profile.user_avatar
                    ? (l(),
                      s("div", Ya, [
                        r(
                          he,
                          { imageSrc: `/${e.profile.user_avatar}` },
                          null,
                          8,
                          ["imageSrc"]
                        ),
                      ]))
                    : i("", !0),
                  o("div", Ja, [
                    d.value ? (l(), s("h2", Ka, c(d.value), 1)) : i("", !0),
                    h.value || m.value
                      ? (l(), s("div", Xa, c(h.value || m.value), 1))
                      : i("", !0),
                    v.value || y.value || I.value
                      ? (l(),
                        s(
                          "span",
                          Qa,
                          c(v.value + ", " + y.value + " " + I.value),
                          1
                        ))
                      : i("", !0),
                  ]),
                ],
                4
              ),
              o(
                "div",
                {
                  class:
                    "flex flex-col justify-start mt-3 md:mt-6 text-base md:text-lg max-md:items-center font-semibold emailPhoneSection",
                  style: U({ color: a.value[2] }),
                },
                [
                  m.value
                    ? (l(),
                      s("div", Za, [
                        r(
                          b,
                          { text: "Alternative Address", location: "top" },
                          {
                            activator: _(({ props: k }) => [
                              r(
                                C(N),
                                W(k, {
                                  color: a.value[3],
                                  icon: "entypo:address",
                                  class: "w-5 h-5",
                                }),
                                null,
                                16,
                                ["color"]
                              ),
                            ]),
                            _: 1,
                          }
                        ),
                        o("div", null, c(m.value), 1),
                      ]))
                    : i("", !0),
                  u.value
                    ? (l(),
                      s("div", er, [
                        r(
                          b,
                          { text: "Phone Office", location: "top" },
                          {
                            activator: _(({ props: k }) => [
                              r(
                                C(N),
                                W(k, {
                                  color: a.value[3],
                                  icon: "wpf:phone-office",
                                  class: "w-5 h-5",
                                }),
                                null,
                                16,
                                ["color"]
                              ),
                            ]),
                            _: 1,
                          }
                        ),
                        o("div", null, c(u.value), 1),
                      ]))
                    : x.value
                    ? (l(),
                      s("div", tr, [
                        r(
                          b,
                          { text: "Phone Cell", location: "top" },
                          {
                            activator: _(({ props: k }) => [
                              r(
                                C(N),
                                W(k, {
                                  color: a.value[3],
                                  icon: "ic:baseline-phone",
                                  class: "w-5 h-5",
                                }),
                                null,
                                16,
                                ["color"]
                              ),
                            ]),
                            _: 1,
                          }
                        ),
                        o("div", null, c(x.value), 1),
                      ]))
                    : i("", !0),
                  e.profile.email
                    ? (l(),
                      s("div", or, [
                        r(
                          b,
                          { text: "Email", location: "top" },
                          {
                            activator: _(({ props: k }) => [
                              r(
                                C(N),
                                W(k, {
                                  color: a.value[3],
                                  icon: "bi:envelope-fill",
                                  class: "w-5 h-5",
                                }),
                                null,
                                16,
                                ["color"]
                              ),
                            ]),
                            _: 1,
                          }
                        ),
                        o("div", null, c(e.profile.email), 1),
                      ]))
                    : i("", !0),
                  e.profile.county
                    ? (l(),
                      s("div", lr, [
                        r(
                          b,
                          { text: "County", location: "top" },
                          {
                            activator: _(({ props: k }) => [
                              r(
                                C(N),
                                W(k, {
                                  color: a.value[3],
                                  icon: "tabler:location-filled",
                                  class: "w-5 h-5",
                                }),
                                null,
                                16,
                                ["color"]
                              ),
                            ]),
                            _: 1,
                          }
                        ),
                        o("div", null, "County: " + c(e.profile.county), 1),
                      ]))
                    : i("", !0),
                  o("div", sr, [
                    e.profile.website_url
                      ? (l(),
                        s(
                          "a",
                          { key: 0, href: p(e.profile.website_url) },
                          [
                            r(
                              b,
                              { text: "Website", location: "top" },
                              {
                                activator: _(({ props: k }) => [
                                  r(
                                    C(N),
                                    W(k, {
                                      icon: "fluent-mdl2:website",
                                      color: a.value[3],
                                      class: "``",
                                    }),
                                    null,
                                    16,
                                    ["color"]
                                  ),
                                ]),
                                _: 1,
                              }
                            ),
                            o("div", null, c(e.profile.website_url), 1),
                          ],
                          8,
                          ar
                        ))
                      : i("", !0),
                    e.profile.facebook
                      ? (l(),
                        s(
                          "a",
                          { key: 1, href: p(e.profile.facebook) },
                          [
                            r(
                              b,
                              { text: "Facebook", location: "top" },
                              {
                                activator: _(({ props: k }) => [
                                  r(
                                    C(N),
                                    W(k, { icon: "logos:facebook", class: "" }),
                                    null,
                                    16
                                  ),
                                ]),
                                _: 1,
                              }
                            ),
                            o(
                              "div",
                              null,
                              c(g.value && g.value.follow_us_on) + " Facebook",
                              1
                            ),
                          ],
                          8,
                          rr
                        ))
                      : i("", !0),
                    e.profile.twitter
                      ? (l(),
                        s(
                          "a",
                          { key: 2, href: p(e.profile.twitter) },
                          [
                            r(
                              b,
                              { text: "Twitter", location: "top" },
                              {
                                activator: _(({ props: k }) => [
                                  r(
                                    C(N),
                                    W(k, {
                                      icon: "fa6-brands:square-x-twitter",
                                      color: "black",
                                      class: "",
                                    }),
                                    null,
                                    16
                                  ),
                                ]),
                                _: 1,
                              }
                            ),
                            o(
                              "div",
                              null,
                              c(g.value && g.value.follow_us_on) + " Twitter",
                              1
                            ),
                          ],
                          8,
                          nr
                        ))
                      : i("", !0),
                    e.profile.tiktok
                      ? (l(),
                        s(
                          "a",
                          { key: 3, href: p(e.profile.tiktok) },
                          [
                            r(
                              b,
                              { text: "TikTok", location: "top" },
                              {
                                activator: _(({ props: k }) => [
                                  r(
                                    C(N),
                                    W(k, {
                                      icon: "logos:tiktok-icon",
                                      class: "",
                                    }),
                                    null,
                                    16
                                  ),
                                ]),
                                _: 1,
                              }
                            ),
                            o(
                              "div",
                              null,
                              c(g.value && g.value.follow_us_on) + " Tiktok",
                              1
                            ),
                          ],
                          8,
                          ir
                        ))
                      : i("", !0),
                    e.profile.instagram
                      ? (l(),
                        s(
                          "a",
                          { key: 4, href: p(e.profile.instagram) },
                          [
                            r(
                              b,
                              { text: "Instagram", location: "top" },
                              {
                                activator: _(({ props: k }) => [
                                  r(
                                    C(N),
                                    W(k, {
                                      icon: "skill-icons:instagram",
                                      class: "",
                                    }),
                                    null,
                                    16
                                  ),
                                ]),
                                _: 1,
                              }
                            ),
                            o(
                              "div",
                              null,
                              c(g.value && g.value.follow_us_on) + " Instagram",
                              1
                            ),
                          ],
                          8,
                          cr
                        ))
                      : i("", !0),
                  ]),
                ],
                4
              ),
            ],
            64
          )
        );
      };
    },
  },
  ur = te(dr, [["__scopeId", "data-v-cc1fe9b3"]]),
  mr = { key: 0, class: A("mt-1 flex gap-1 flex-col rounded-lg closing") },
  fr = ["innerHTML"],
  gr = {
    __name: "BottomTitleText4",
    props: {
      screenWidth: { type: [String, Number] },
      bottom_text: { type: String },
    },
    setup(e) {
      const t = e,
        f = (u) => {
          const h = document.createElement("textarea");
          return (h.innerHTML = u), h.value;
        },
        d = w(() => {
          const h = new DOMParser().parseFromString(x.value, "text/html");
          return (
            h.querySelectorAll("a").forEach((m) => {
              const v = m.getAttribute("href");
              !v.startsWith("http://") &&
                !v.startsWith("https://") &&
                m.setAttribute("href", "http://" + v),
                (m.target = "_blank");
            }),
            h.body.innerHTML
          );
        }),
        x = n(f(t.bottom_text));
      return (u, h) =>
        d.value
          ? (l(),
            s("div", mr, [
              o(
                "div",
                { class: "default ck-content", innerHTML: d.value },
                null,
                8,
                fr
              ),
            ]))
          : i("", !0);
    },
  },
  vr = {
    key: 0,
    class: A(
      " flex gap-1 flex-col rounded-lg closing md:border-gray-300 md:border-2 p-3"
    ),
  },
  xr = ["innerHTML"],
  hr = { class: "flex justify-end gap-1" },
  _r = {
    __name: "ClosingTitleText4",
    props: {
      screenWidth: { type: [String, Number] },
      loggedInUserId: [String, Number],
      closing_text: { type: String },
      userId: [String, Number],
    },
    setup(e) {
      const t = e,
        f = (g) => {
          const p = document.createElement("textarea");
          return (p.innerHTML = g), console.log("here"), p.value;
        },
        d = P(),
        x = n(f(t.closing_text)),
        u = n(!1),
        h = () => {
          if (v.value !== 3) {
            d.commit("setIsUpgradeToGoldPlatinumDialogOpen", !0);
            return;
          }
          I(window.location.href) && (u.value = !0);
        },
        m = w(() => d.getters.translations),
        v = w(() => d.getters.userVersion),
        y = w(() => d.state.contractor.selectedColorScheme || H);
      function I(g) {
        const p = document.createElement("textarea");
        (p.value = g), document.body.appendChild(p), p.select();
        let $;
        try {
          $ = document.execCommand("copy");
        } catch (S) {
          console.error("Failed to copy text: ", S), ($ = !1);
        }
        return document.body.removeChild(p), $;
      }
      const a = w(() => {
        const p = new DOMParser().parseFromString(x.value, "text/html");
        return (
          p.querySelectorAll("a").forEach(($) => {
            const S = $.getAttribute("href");
            !S.startsWith("http://") &&
              !S.startsWith("https://") &&
              $.setAttribute("href", "http://" + S),
              ($.target = "_blank");
          }),
          p.body.innerHTML
        );
      });
      return (g, p) => {
        const $ = O("Link"),
          S = O("v-snackbar");
        return (
          l(),
          s(
            D,
            null,
            [
              a.value
                ? (l(),
                  s("div", vr, [
                    o(
                      "div",
                      { class: "default ck-content", innerHTML: a.value },
                      null,
                      8,
                      xr
                    ),
                  ]))
                : i("", !0),
              o("div", hr, [
                e.userId === e.loggedInUserId
                  ? (l(),
                    E(
                      $,
                      {
                        key: 0,
                        class: "rounded-full",
                        href: `/contractor/${e.userId}/edit`,
                      },
                      {
                        default: _(() => [
                          o(
                            "button",
                            {
                              class: A(
                                ` px-4 py-1 text-xs hover:bg-[#114678] sm:text-sm font-bold rounded-full border-[${y.value[4]}] border-[1px] text-white cursor-pointer hover:shadow-lg active:scale-95 w-full`
                              ),
                              style: U({
                                background: y.value[4],
                                borderColor: y.value[4],
                              }),
                            },
                            " Edit ",
                            6
                          ),
                        ]),
                        _: 1,
                      },
                      8,
                      ["href"]
                    ))
                  : i("", !0),
                o(
                  "button",
                  W(t, {
                    onClick: h,
                    style: { color: y.value[4], borderColor: y.value[4] },
                    class:
                      "bg-white px-4 py-1 text-xs hover:bg-[#f8f9fa] sm:text-sm font-bold rounded-full border-[1px] bg-white cursor-pointer hover:shadow-lg active:scale-95",
                  }),
                  c(m.value && m.value.share),
                  17
                ),
                r(
                  S,
                  {
                    location: "bottom",
                    modelValue: u.value,
                    "onUpdate:modelValue":
                      p[0] || (p[0] = (b) => (u.value = b)),
                    timeout: 2e3,
                    color: "success",
                  },
                  {
                    default: _(() => [
                      ee(c(m.value && m.value.link_copied_to_clipboard), 1),
                    ]),
                    _: 1,
                  },
                  8,
                  ["modelValue"]
                ),
              ]),
            ],
            64
          )
        );
      };
    },
  },
  pr = {
    key: 0,
    class:
      "w-full p-4 md:p-6 text-xl md:text-2xl font-bold md:font-extrabold text-center",
  },
  br = { key: 1, class: "w-full h-full bg-[#222] rounded-md" },
  yr = ["onClick", "src"],
  wr = { key: 2, class: "flex max-md:flex-col gap-2 md:gap-4 items-center" },
  kr = {
    class:
      "w-full md:w-2/5 text-xl md:text-3xl font-bold md:font-extrabold text-center",
  },
  $r = { class: "relative w-full md:w-3/5 h-3/5 md:p-1 rounded-md" },
  Ir = ["onClick", "src"],
  Cr = {
    key: 3,
    class:
      "flex max-md:flex-col gap-2 md:gap-4 items-center max-md:flex-col-reverse",
  },
  Sr = { class: "relative w-full md:w-3/5 h-3/5 bg-[#222] rounded-md" },
  Wr = ["onClick", "src"],
  Tr = {
    class:
      "w-2/5 md:w-2/5 text-xl md:text-3xl font-bold md:font-extrabold text-center",
  },
  jr = {
    class:
      "max-h-[400px] md:max-h-[500px] w-full flex justify-center xs:w-[400px] md:w-[600px] bg-[#222]",
  },
  Ur = ["src"],
  Nr = {
    __name: "BragSection4",
    props: {
      screenWidth: { type: [String, Number] },
      brag_sections: { type: Array },
      contractorId: { type: Number },
    },
    setup(e) {
      const t = e,
        f = P(),
        d = n(t.brag_sections),
        x = n(""),
        u = n(),
        h = w(() => f.state.contractor.selectedColorScheme || H),
        m = w(() => f.getters.translations),
        v = (y) => {
          (x.value = y), u.value.openDialog();
        };
      return (y, I) => (
        l(),
        s(
          D,
          null,
          [
            d.value && d.value.length > 0
              ? (l(),
                s(
                  "div",
                  {
                    key: 0,
                    class: "flex gap-4 flex-col",
                    style: U({ color: h.value[2] }),
                  },
                  [
                    (l(!0),
                    s(
                      D,
                      null,
                      X(
                        d.value,
                        (a, g) => (
                          l(),
                          s(
                            "div",
                            {
                              key: a.id,
                              class:
                                "rounded-md border relative border-gray-300 p-2 sm:p-2",
                            },
                            [
                              !a.section_image && a.section_text
                                ? (l(), s("div", pr, c(a.section_text), 1))
                                : i("", !0),
                              a.section_image && !a.section_text
                                ? (l(),
                                  s("div", br, [
                                    o(
                                      "img",
                                      {
                                        onClick: (p) => v(a.section_image),
                                        src: a.section_image,
                                        alt: "Section Image",
                                        class: "object-cover w-full rounded-md",
                                      },
                                      null,
                                      8,
                                      yr
                                    ),
                                  ]))
                                : i("", !0),
                              a.section_image && a.section_text && g % 2 !== 0
                                ? (l(),
                                  s("div", wr, [
                                    o("div", kr, c(a.section_text), 1),
                                    o("div", $r, [
                                      o(
                                        "img",
                                        {
                                          onClick: (p) => v(a.section_image),
                                          src: a.section_image,
                                          alt: "Section Image",
                                          class:
                                            "object-cover w-full rounded-md",
                                        },
                                        null,
                                        8,
                                        Ir
                                      ),
                                    ]),
                                  ]))
                                : i("", !0),
                              a.section_image && a.section_text && g % 2 === 0
                                ? (l(),
                                  s("div", Cr, [
                                    o("div", Sr, [
                                      o(
                                        "img",
                                        {
                                          onClick: (p) => v(a.section_image),
                                          src: a.section_image,
                                          alt: "Section Image",
                                          class:
                                            "object-cover rounded-md w-full",
                                        },
                                        null,
                                        8,
                                        Wr
                                      ),
                                    ]),
                                    o("div", Tr, c(a.section_text), 1),
                                  ]))
                                : i("", !0),
                            ]
                          )
                        )
                      ),
                      128
                    )),
                  ],
                  4
                ))
              : i("", !0),
            r(
              Q,
              {
                dialogWidth: "widthAuto",
                showFooter: !1,
                ref_key: "imageIncDialogRef",
                ref: u,
                title: m.value && m.value.your_image,
              },
              {
                default: _(() => [
                  o("div", jr, [o("img", { src: x.value }, null, 8, Ur)]),
                ]),
                _: 1,
              },
              8,
              ["title"]
            ),
          ],
          64
        )
      );
    },
  },
  Lr = {
    key: 0,
    class:
      "w-full p-4 md:p-6 text-xl md:text-2xl font-bold md:font-extrabold text-xl md:text-3xl font-bold md:font-extrabold text-center",
  },
  Dr = { key: 1, class: "w-full h-full bg-[#222] rounded-md" },
  Rr = ["onClick", "src"],
  Ar = { key: 2, class: "flex max-md:flex-col gap-2 md:gap-4 items-center" },
  Vr = {
    class:
      "w-full md:w-2/5 text-xl md:text-3xl font-bold md:font-extrabold md:w-2/5 text-xl md:text-3xl font-bold md:font-extrabold text-center",
  },
  Pr = { class: "relative w-full md:w-3/5 h-3/5 rounded-md" },
  Hr = ["onClick", "src"],
  Br = {
    key: 3,
    class:
      "flex max-md:flex-col gap-2 md:gap-4 items-center max-md:flex-col-reverse",
  },
  Or = { class: "relative w-full md:w-3/5 h-3/5 bg-[#222] rounded-md" },
  Er = ["onClick", "src"],
  Fr = {
    class:
      "w-2/5 md:w-2/5 text-xl md:text-3xl font-bold md:font-extrabold text-center",
  },
  Mr = {
    class:
      "max-h-[400px] md:max-h-[500px] w-full flex justify-center xs:w-[400px] md:w-[600px] bg-[#222]",
  },
  Gr = ["src"],
  zr = {
    __name: "ImageTextSection4",
    props: {
      screenWidth: { type: [String, Number] },
      image_sections: { type: Array },
      contractorId: { type: Number },
    },
    setup(e) {
      const t = e,
        f = P(),
        d = n(t.image_sections),
        x = n(""),
        u = n(),
        h = w(() => f.state.contractor.selectedColorScheme || H),
        m = w(() => f.getters.translations),
        v = (y) => {
          (x.value = y), console.log("infunction call"), u.value.openDialog();
        };
      return (y, I) => (
        l(),
        s(
          D,
          null,
          [
            d.value && d.value.length > 0
              ? (l(),
                s(
                  "div",
                  {
                    key: 0,
                    style: U({ color: h.value[2] }),
                    class: "flex gap-4 flex-col",
                  },
                  [
                    (l(!0),
                    s(
                      D,
                      null,
                      X(
                        d.value,
                        (a, g) => (
                          l(),
                          s(
                            "div",
                            {
                              key: a.id,
                              class:
                                "rounded-md border relative border-gray-300 p-2 sm:p-2",
                            },
                            [
                              !a.section_image && a.section_text
                                ? (l(), s("div", Lr, c(a.section_text), 1))
                                : i("", !0),
                              a.section_image && !a.section_text
                                ? (l(),
                                  s("div", Dr, [
                                    o(
                                      "img",
                                      {
                                        onClick: (p) => v(a.section_image),
                                        src: a.section_image,
                                        alt: "Section Image",
                                        class: "object-cover w-full rounded-md",
                                      },
                                      null,
                                      8,
                                      Rr
                                    ),
                                  ]))
                                : i("", !0),
                              a.section_image && a.section_text && g % 2 !== 0
                                ? (l(),
                                  s("div", Ar, [
                                    o("div", Vr, c(a.section_text), 1),
                                    o("div", Pr, [
                                      o(
                                        "img",
                                        {
                                          onClick: (p) => v(a.section_image),
                                          src: a.section_image,
                                          alt: "Section Image",
                                          class:
                                            "object-cover w-full rounded-md",
                                        },
                                        null,
                                        8,
                                        Hr
                                      ),
                                    ]),
                                  ]))
                                : i("", !0),
                              a.section_image && a.section_text && g % 2 === 0
                                ? (l(),
                                  s("div", Br, [
                                    o("div", Or, [
                                      o(
                                        "img",
                                        {
                                          onClick: (p) => v(a.section_image),
                                          src: a.section_image,
                                          alt: "Section Image",
                                          class:
                                            "object-cover rounded-md w-full",
                                        },
                                        null,
                                        8,
                                        Er
                                      ),
                                    ]),
                                    o("div", Fr, c(a.section_text), 1),
                                  ]))
                                : i("", !0),
                            ]
                          )
                        )
                      ),
                      128
                    )),
                  ],
                  4
                ))
              : i("", !0),
            r(
              Q,
              {
                dialogWidth: "widthAuto",
                showFooter: !1,
                ref_key: "imageIncDialogRef",
                ref: u,
                title: m.value && m.value.your_image,
              },
              {
                default: _(() => [
                  o("div", Mr, [o("img", { src: x.value }, null, 8, Gr)]),
                ]),
                _: 1,
              },
              8,
              ["title"]
            ),
          ],
          64
        )
      );
    },
  },
  qr = { key: 0 },
  Yr = { class: "flex flex-col gap-3 sm:gap-4" },
  Jr = { class: "mt-6" },
  Kr = { class: "flex flex-col mb-6 md:flex-row gap-2 items-stretch" },
  Xr = {
    __name: "Template4",
    props: {
      profile: Object,
      loggedInUserId: [String, Number],
      region_name: String,
      total_reviews: [Number, String],
      average_rating: [Number, String],
      screenWidth: Number,
      starPercentages: { type: Array, default: [] },
    },
    setup(e) {
      const t = P(),
        f = w(() => t.state.contractor.selectedColorScheme || H);
      return (d, x) =>
        e.profile
          ? (l(),
            s("div", qr, [
              o("div", Yr, [
                r(
                  le,
                  {
                    shadowLevel: 2,
                    bgColor: f.value[1],
                    padding: e.screenWidth < 640 ? "7px" : "15px",
                  },
                  {
                    default: _(() => [
                      r(
                        Ha,
                        {
                          screenWidth: e.screenWidth,
                          loggedInUserId: e.loggedInUserId,
                          averageRating: e.average_rating,
                          total_reviews: e.total_reviews,
                          profile: e.profile,
                        },
                        null,
                        8,
                        [
                          "screenWidth",
                          "loggedInUserId",
                          "averageRating",
                          "total_reviews",
                          "profile",
                        ]
                      ),
                      o("div", Jr, [
                        e.profile.image_sections &&
                        e.profile.image_sections.length > 0
                          ? (l(),
                            E(
                              zr,
                              {
                                key: 0,
                                image_sections: e.profile.image_sections,
                                "contractor-id": e.profile.id,
                                "screen-width": e.screenWidth,
                              },
                              null,
                              8,
                              [
                                "image_sections",
                                "contractor-id",
                                "screen-width",
                              ]
                            ))
                          : i("", !0),
                      ]),
                      e.profile.bottom_text
                        ? (l(),
                          s(
                            "div",
                            {
                              key: 0,
                              class: "my-6",
                              style: U({ color: f.value[2] }),
                            },
                            [
                              r(
                                gr,
                                {
                                  class: "md:border-gray-300 md:border-2 p-3",
                                  bottom_text: e.profile.bottom_text,
                                  "screen-width": e.screenWidth,
                                },
                                null,
                                8,
                                ["bottom_text", "screen-width"]
                              ),
                            ],
                            4
                          ))
                        : i("", !0),
                      o("div", Kr, [
                        r(
                          le,
                          {
                            shadowLevel: 2,
                            cardInnerClasses: "h-full",
                            bgColor: f.value[1],
                            isInside: !0,
                            class: "h-auto md:w-3/5",
                            padding: e.screenWidth < 640 ? "7px" : "20px",
                          },
                          {
                            default: _(() => [
                              r(
                                ur,
                                {
                                  class: "",
                                  screenWidth: e.screenWidth,
                                  profile: e.profile,
                                },
                                null,
                                8,
                                ["screenWidth", "profile"]
                              ),
                            ]),
                            _: 1,
                          },
                          8,
                          ["bgColor", "padding"]
                        ),
                        r(
                          le,
                          {
                            shadowLevel: 2,
                            bgColor: f.value[1],
                            cardInnerClasses: "h-full",
                            isInside: !0,
                            class: "h-auto md:w-2/5",
                            padding: e.screenWidth < 640 ? "7px" : "20px",
                          },
                          {
                            default: _(() => [
                              r(
                                qa,
                                {
                                  screenWidth: e.screenWidth,
                                  region_name: e.region_name,
                                  profile: e.profile,
                                },
                                null,
                                8,
                                ["screenWidth", "region_name", "profile"]
                              ),
                            ]),
                            _: 1,
                          },
                          8,
                          ["bgColor", "padding"]
                        ),
                      ]),
                      e.profile.brag_sections &&
                      e.profile.brag_sections.length > 0
                        ? (l(),
                          E(
                            Nr,
                            {
                              key: 1,
                              brag_sections: e.profile.brag_sections,
                              "contractor-id": e.profile.id,
                              "screen-width": e.screenWidth,
                            },
                            null,
                            8,
                            ["brag_sections", "contractor-id", "screen-width"]
                          ))
                        : i("", !0),
                      e.profile.bottom_text || e.profile.closing_text
                        ? (l(),
                          s(
                            "div",
                            {
                              key: 2,
                              class: "flex gap-2 flex-col mt-6",
                              style: U({ color: f.value[2] }),
                            },
                            [
                              r(
                                _r,
                                {
                                  userId: e.profile.user_id,
                                  loggedInUserId: e.loggedInUserId,
                                  closing_text: e.profile.closing_text,
                                  "screen-width": e.screenWidth,
                                },
                                null,
                                8,
                                [
                                  "userId",
                                  "loggedInUserId",
                                  "closing_text",
                                  "screen-width",
                                ]
                              ),
                            ],
                            4
                          ))
                        : i("", !0),
                    ]),
                    _: 1,
                  },
                  8,
                  ["bgColor", "padding"]
                ),
              ]),
            ]))
          : i("", !0);
    },
  },
  Qr = { key: 0, class: "flex gap-2 mb-1 items-center" },
  Zr = { key: 0, class: "mr-4 flex-none" },
  en = { class: "flex-grow" },
  tn = { class: "text-xl font-semibold mt-1" },
  on = { key: 0, class: "text-base md:text-xl" },
  ln = { class: "flex flex-col md:flex-row items-start md:items-center" },
  sn = {
    key: 0,
    class: "mx-2 md:flex md:justify-center md:items-center translate-y-[-1px]",
  },
  an = { class: "flex items-center gap-1" },
  rn = o(
    "div",
    { class: "" },
    [
      o("img", {
        src: "/images/icons/pre-diamond.png",
        width: "20",
        height: "30",
      }),
    ],
    -1
  ),
  nn = { class: "flex flex-col justify-center items-center" },
  cn = { class: "" },
  dn = { class: "font-light text-xs overflow-hidden tracking-tighter" },
  un = { class: "flex gap-2 sm:gap-3 translate-x-[-2px]" },
  mn = {
    class:
      "xs:text-md w-[28px] h-[28px] xs:w-[35px] xs:h-[35px] font-semibold flex items-center justify-center",
  },
  fn = { class: "flex flex-col gap-1" },
  gn = { class: "mb-4 sm:mb-0 mt-4" },
  vn = {
    __name: "ProfileHeader5",
    props: {
      profile: Object,
      loggedInUserId: [String, Number],
      screenWidth: Number,
      averageRating: { type: Number, default: 0 },
      total_reviews: { type: Number, default: 0 },
    },
    setup(e) {
      var oe, Z;
      const t = e,
        f = n(!1),
        d = n(),
        x = n();
      let u = fe().props.value;
      (oe = u == null ? void 0 : u.auth) == null || oe.user;
      const h = (Z = u == null ? void 0 : u.profile) == null ? void 0 : Z.id,
        m = n(""),
        v = n(),
        y = n(!0);
      ue(() => {
        const j = localStorage.getItem("showGoBack");
        j === "false" && (y.value = !1),
          console.log(j),
          localStorage.removeItem("showGoBack");
      });
      const I = () => {
          v.value.closeDialog();
        },
        a = () => {
          v.value.openDialog();
        },
        g = () => {
          if (J.value !== 3) {
            S.commit("setIsUpgradeToGoldPlatinumDialogOpen", !0);
            return;
          }
          p(window.location.href) && (f.value = !0);
        };
      function p(j) {
        const L = document.createElement("textarea");
        (L.value = j), document.body.appendChild(L), L.select();
        let B;
        try {
          B = document.execCommand("copy");
        } catch (q) {
          console.error("Failed to copy text: ", q), (B = !1);
        }
        return document.body.removeChild(L), B;
      }
      const $ = () => {
          const j = localStorage.getItem("prevUrl");
          console.log(j),
            j === "/post"
              ? Y.Inertia.visit(j)
              : j === "/edit"
              ? Y.Inertia.visit(`/contractor/${t.profile.user_id}/edit`)
              : j === "/settings"
              ? Y.Inertia.visit("/settings")
              : Y.Inertia.visit("/sub-finder");
        },
        S = P();
      n("#241e6d");
      const b = n(t.profile.first_name),
        k = n(t.profile.last_name);
      n(t.profile.user_avatar);
      const z = n(t.profile.company_name),
        V = n(t.profile.city),
        G = n(t.profile.state),
        T = w(() => S.getters.translations),
        J = w(() => S.getters.userVersion),
        R = w(() => S.state.contractor.selectedColorScheme || H),
        M = w(() => b.value + " " + k.value),
        K = w(() => {
          if (
            (console.log("here in teh trunctated", t.screenWidth),
            t.screenWidth < 600)
          ) {
            const j = t.screenWidth < 400 ? 30 : 34;
            return M.value.length > j
              ? M.value.substring(0, j) + "..."
              : M.value;
          } else return b.value + " " + k.value;
        }),
        re = () => {
          h ? d.value.openDialog() : ((m.value = "ratings"), a());
        },
        ne = () => {
          h ? x.value.openDialog() : ((m.value = "posts"), a());
        };
      return (j, L) => {
        const B = O("v-tooltip"),
          q = O("Link"),
          se = O("v-snackbar");
        return (
          l(),
          s(
            D,
            null,
            [
              y.value
                ? (l(),
                  s("div", Qr, [
                    o("div", { onClick: $, class: "cursor-pointer" }, [
                      r(
                        C(N),
                        {
                          class: "w-8 h-8",
                          icon: "ion:arrow-back",
                          color: R.value[3],
                        },
                        null,
                        8,
                        ["color"]
                      ),
                    ]),
                    o(
                      "div",
                      {
                        onClick: $,
                        class:
                          "font-bold cursor-pointer translate-y-[1px] flex justify-center items-center text-2xl leading-tight",
                        style: U({ color: R.value[3] }),
                      },
                      c(T.value && T.value.go_back),
                      5
                    ),
                  ]))
                : i("", !0),
              o(
                "div",
                { class: "flex gap-2 mt-4", style: U({ color: R.value[2] }) },
                [
                  o(
                    "div",
                    {
                      class: A([
                        `${e.screenWidth > 768 ? "w-3/4" : "w-4/5"}`,
                        "flex items-start",
                      ]),
                    },
                    [
                      e.profile.company_logo
                        ? (l(),
                          s("div", Zr, [
                            r(
                              Ie,
                              {
                                imageClass: "companyLogo",
                                imageSrc: `/${e.profile.company_logo}`,
                              },
                              null,
                              8,
                              ["imageSrc"]
                            ),
                          ]))
                        : i("", !0),
                      o("div", en, [
                        z.value
                          ? (l(),
                            s(
                              "div",
                              {
                                key: 0,
                                class:
                                  "text-2xl xs:text-3xl font-bold uppercase",
                                style: U([
                                  { "line-height": "2rem" },
                                  { color: R.value[3] },
                                ]),
                              },
                              c(z.value),
                              5
                            ))
                          : i("", !0),
                        o("div", null, [
                          r(
                            B,
                            {
                              "open-on-click": !0,
                              "open-on-focus": !0,
                              text: M.value,
                              location: "bottom",
                            },
                            {
                              activator: _(({ props: F }) => [
                                o(
                                  "h2",
                                  W(
                                    {
                                      class:
                                        "text-xl xs:text-2xl font-medium font-bold",
                                    },
                                    F,
                                    { style: { "line-height": "1.7rem" } }
                                  ),
                                  c(K.value),
                                  17
                                ),
                              ]),
                              _: 1,
                            },
                            8,
                            ["text"]
                          ),
                        ]),
                        o("div", tn, [
                          V.value || G.value
                            ? (l(),
                              s("div", on, c(V.value + ", " + G.value), 1))
                            : i("", !0),
                          o("div", ln, [
                            o(
                              "div",
                              null,
                              c(e.profile.phone_office || e.profile.phone_cell),
                              1
                            ),
                            e.screenWidth > 768
                              ? (l(), s("div", sn, " | "))
                              : i("", !0),
                            o("div", null, c(e.profile.email), 1),
                          ]),
                        ]),
                      ]),
                    ],
                    2
                  ),
                  o(
                    "div",
                    {
                      class: A(
                        ` ${
                          e.screenWidth > 768 ? "w-1/4" : ""
                        } flex-grow flex flex-col gap-2  flex justify-center  items-center `
                      ),
                    },
                    [
                      o("div", an, [
                        rn,
                        o("div", nn, [
                          r(
                            pe,
                            {
                              onClick: re,
                              starWidth: e.screenWidth > 768 ? 18 : 15,
                              class: A("h-6 cursor-pointer"),
                              indicatorClasses: "text-small h-6 ",
                              starHeight: e.screenWidth > 768 ? 18 : 15,
                              rating: Number(
                                parseFloat(
                                  e.averageRating ? e.averageRating : 0
                                ).toFixed(1)
                              ),
                              isIndicatorActive: !1,
                            },
                            null,
                            8,
                            ["starWidth", "starHeight", "rating"]
                          ),
                          o("div", cn, [o("h2", dn, c(e.total_reviews), 1)]),
                        ]),
                        o("div", un, [
                          r(
                            B,
                            {
                              text: T.value && T.value.see_user_posts,
                              location: "left",
                            },
                            {
                              activator: _(({ props: F }) => [
                                o(
                                  "div",
                                  {
                                    onClick: ne,
                                    class:
                                      "active:scale-95 hover:bg-[#f8f9fa] hover:rounded-md",
                                  },
                                  [
                                    o("button", mn, [
                                      o(
                                        "img",
                                        W(
                                          { src: "/images/icons/post_b.png" },
                                          F,
                                          { width: "28", height: "28" }
                                        ),
                                        null,
                                        16
                                      ),
                                    ]),
                                  ]
                                ),
                              ]),
                              _: 1,
                            },
                            8,
                            ["text"]
                          ),
                        ]),
                      ]),
                      o("div", fn, [
                        e.profile.user_id === e.loggedInUserId
                          ? (l(),
                            E(
                              q,
                              {
                                key: 0,
                                class: "rounded-full",
                                href: `/contractor/${e.profile.user_id}/edit`,
                              },
                              {
                                default: _(() => [
                                  o(
                                    "button",
                                    {
                                      class: A(
                                        ` px-4 py-1 text-xs hover:bg-[#114678] sm:text-sm font-bold rounded-full border-[${R.value[4]}] border-[1px] text-white cursor-pointer hover:shadow-lg active:scale-95 w-full`
                                      ),
                                      style: U({
                                        background: R.value[4],
                                        borderColor: R.value[4],
                                      }),
                                    },
                                    " Edit ",
                                    6
                                  ),
                                ]),
                                _: 1,
                              },
                              8,
                              ["href"]
                            ))
                          : i("", !0),
                        o(
                          "button",
                          W(t, {
                            onClick: g,
                            style: {
                              color: R.value[4],
                              borderColor: R.value[4],
                            },
                            class:
                              "bg-white px-4 py-1 text-xs hover:bg-[#f8f9fa] sm:text-sm font-bold rounded-full border-[1px] bg-white cursor-pointer hover:shadow-lg active:scale-95",
                          }),
                          c(T.value && T.value.share),
                          17
                        ),
                        r(
                          se,
                          {
                            location: "top",
                            modelValue: f.value,
                            "onUpdate:modelValue":
                              L[0] || (L[0] = (F) => (f.value = F)),
                            "content-class": "mt-6",
                            color: "success",
                            timeout: 2e3,
                          },
                          {
                            default: _(() => [
                              ee(
                                c(T.value && T.value.link_copied_to_clipboard),
                                1
                              ),
                            ]),
                            _: 1,
                          },
                          8,
                          ["modelValue"]
                        ),
                      ]),
                    ],
                    2
                  ),
                ],
                4
              ),
              r(
                be,
                {
                  ref_key: "ratingDialogRef",
                  ref: d,
                  loggedInUserId: C(h),
                  userId: e.profile.user_id,
                },
                null,
                8,
                ["loggedInUserId", "userId"]
              ),
              r(
                xe,
                {
                  ref_key: "postDialogRef",
                  ref: x,
                  contractorId: e.profile.user_id,
                },
                null,
                8,
                ["contractorId"]
              ),
              r(
                Q,
                {
                  submitText: T.value && T.value.okay,
                  onSubmit: I,
                  showCancel: !1,
                  disableOutSideClick: !1,
                  ref_key: "notLoggedDialogRef",
                  ref: v,
                  errorIcon: "",
                  title: T.value && T.value.log_in_error,
                },
                {
                  default: _(() => [
                    o(
                      "div",
                      gn,
                      c(T.value && T.value.you_must_be_logged_in) +
                        " " +
                        c(m.value),
                      1
                    ),
                  ]),
                  _: 1,
                },
                8,
                ["submitText", "title"]
              ),
            ],
            64
          )
        );
      };
    },
  };
const xn = (e) => (ie("data-v-ec68a20f"), (e = e()), ce(), e),
  hn = {
    class:
      "flex justify-center items-center md:justify-between max-md:gap-4 max-md:mb-2",
  },
  _n = { class: "mb-3 max-md:text-center" },
  pn = { class: "flex items-center" },
  bn = xn(() =>
    o(
      "div",
      { class: "font-bold text-sm xs:text-base sm:text-lg ml-1 xs:ml-2" },
      " Region : ",
      -1
    )
  ),
  yn = { class: "text-xs xs:text-sm sm:text-base translate-y-[0px] ml-2" },
  wn = {
    __name: "RegionTradeSection5",
    props: { profile: Object, region_name: String, screenWidth: Number },
    setup(e) {
      var m;
      const t = e,
        f = P(),
        d = n((m = t.region_name) != null ? m : "");
      n("#241e6d");
      const x = ge({
          trade1: t.profile.trade1,
          trade2: t.profile.trade2,
          trade3: t.profile.trade3,
          trade4: t.profile.trade4,
          trade5: t.profile.trade5,
          trade6: t.profile.trade6,
          trade7: t.profile.trade7,
          trade8: t.profile.trade8,
          trade9: t.profile.trade9,
          trade10: t.profile.trade10,
          trade11: t.profile.trade11,
          trade12: t.profile.trade12,
          trade13: t.profile.trade13,
          trade14: t.profile.trade14,
          trade15: t.profile.trade15,
          trade16: t.profile.trade16,
          trade17: t.profile.trade17,
          trade18: t.profile.trade18,
          trade19: t.profile.trade19,
          trade20: t.profile.trade20,
          trade21: t.profile.trade21,
          trade22: t.profile.trade22,
          trade23: t.profile.trade23,
          trade24: t.profile.trade24,
          trade25: t.profile.trade25,
          trade26: t.profile.trade26,
          trade27: t.profile.trade27,
          trade28: t.profile.trade28,
          trade29: t.profile.trade29,
          trade30: t.profile.trade30,
        }),
        u = w(() => f.state.contractor.selectedColorScheme || H);
      w(() => ae.filter((v) => x[v.id] === 1));
      const h = w(() => f.getters.translations);
      return (v, y) => {
        const I = O("v-tooltip");
        return (
          l(),
          s(
            D,
            null,
            [
              o("div", hn, [
                r(
                  ye,
                  {
                    class: "text",
                    style: U({
                      marginBottom: e.screenWidth > 768 ? "0px" : "0",
                      fontWeight: 800,
                      fontSize: e.screenWidth > 640 ? "24px" : "20px",
                      color: u.value[3],
                    }),
                    heading: h.value && h.value.trades,
                  },
                  null,
                  8,
                  ["style", "heading"]
                ),
              ]),
              o("div", _n, [
                (l(!0),
                s(
                  D,
                  null,
                  X(
                    C(ae),
                    (a, g) => (
                      l(),
                      s(
                        D,
                        { key: a.name },
                        [
                          x[a.id] === 1
                            ? (l(),
                              E(
                                _e,
                                {
                                  key: 0,
                                  class: "my-1 mx-1 space-x-1 flex",
                                  style: U({
                                    backgroundColor:
                                      g % 2 === 0
                                        ? u.value[4]
                                        : C(ve)(u.value[4], 30),
                                    fontSize: "10px",
                                    paddingTop: "6px",
                                    paddingBottom: "6px",
                                  }),
                                },
                                { default: _(() => [ee(c(a.name), 1)]), _: 2 },
                                1032,
                                ["style"]
                              ))
                            : i("", !0),
                        ],
                        64
                      )
                    )
                  ),
                  128
                )),
              ]),
              d.value
                ? (l(),
                  s(
                    "div",
                    {
                      key: 0,
                      class:
                        "flex items-center justify-center md:justify-between w-full gap-2 xs:gap-4 mt-2 sm:mt-0",
                      style: U({ color: u.value[2] }),
                    },
                    [
                      o("div", pn, [
                        r(
                          I,
                          { text: "Region", location: "top" },
                          {
                            activator: _(({ props: a }) => [
                              r(
                                C(N),
                                W(a, {
                                  class: "w-6 h-6 sm:w-8 sm:h-8",
                                  icon: "mdi:location",
                                  color: u.value[3],
                                }),
                                null,
                                16,
                                ["color"]
                              ),
                            ]),
                            _: 1,
                          }
                        ),
                        bn,
                        o("div", yn, c(d.value), 1),
                      ]),
                    ],
                    4
                  ))
                : i("", !0),
            ],
            64
          )
        );
      };
    },
  },
  kn = te(wn, [["__scopeId", "data-v-ec68a20f"]]);
const $n = { key: 0, class: "flex mb-3" },
  In = { class: "flex flex-col" },
  Cn = { key: 0, class: "text-xl sm:text-2xl font-medium font-extrabold" },
  Sn = { key: 1, class: "text-lg sm:text-xl font-medium font-bold" },
  Wn = { key: 2, class: "text-base sm:text-lg font-semibold" },
  Tn = { key: 0 },
  jn = { key: 1 },
  Un = { key: 2 },
  Nn = { key: 3 },
  Ln = { key: 4 },
  Dn = {
    class:
      "flex flex-col gap-1 mt-3 md:mt-6 max-md:items-center text-sm md:text-base",
  },
  Rn = ["href"],
  An = ["href"],
  Vn = ["href"],
  Pn = ["href"],
  Hn = ["href"],
  Bn = {
    __name: "AdditionalInfoSection5",
    props: { profile: Object, screenWidth: Number },
    setup(e) {
      const t = e;
      n("#241e6d");
      const f = P(),
        d = n(t.profile.company_name);
      n(t.profile.company_logo);
      const x = n(t.profile.phone_cell),
        u = n(t.profile.phone_office),
        h = n(t.profile.address_1),
        m = n(t.profile.address_2),
        v = n(t.profile.city),
        y = n(t.profile.state);
      n(t.profile.county);
      const I = n(t.profile.zipcode),
        a = w(() => f.state.contractor.selectedColorScheme || H),
        g = w(() => f.getters.translations),
        p = ($) =>
          $
            ? $.startsWith("http://") || $.startsWith("https://")
              ? $
              : `http://${$}`
            : "";
      return ($, S) => {
        const b = O("v-tooltip");
        return (
          l(),
          s(
            D,
            null,
            [
              o(
                "div",
                { style: U({ color: a.value[2] }), class: "flex gap-2" },
                [
                  e.profile.user_avatar
                    ? (l(),
                      s("div", $n, [
                        r(
                          he,
                          { imageSrc: `/${e.profile.user_avatar}` },
                          null,
                          8,
                          ["imageSrc"]
                        ),
                      ]))
                    : i("", !0),
                  o("div", In, [
                    d.value ? (l(), s("h2", Cn, c(d.value), 1)) : i("", !0),
                    h.value || m.value
                      ? (l(), s("div", Sn, c(h.value || m.value), 1))
                      : i("", !0),
                    v.value || y.value || I.value
                      ? (l(),
                        s(
                          "span",
                          Wn,
                          c(v.value + ", " + y.value + " " + I.value),
                          1
                        ))
                      : i("", !0),
                  ]),
                ],
                4
              ),
              o(
                "div",
                {
                  class:
                    "flex flex-col justify-start mt-3 md:mt-6 text-base md:text-lg max-md:items-center font-semibold emailPhoneSection",
                  style: U({ color: a.value[2] }),
                },
                [
                  m.value
                    ? (l(),
                      s("div", Tn, [
                        r(
                          b,
                          { text: "Alternative Address", location: "top" },
                          {
                            activator: _(({ props: k }) => [
                              r(
                                C(N),
                                W(k, {
                                  color: a.value[3],
                                  icon: "entypo:address",
                                  class: "w-5 h-5",
                                }),
                                null,
                                16,
                                ["color"]
                              ),
                            ]),
                            _: 1,
                          }
                        ),
                        o("div", null, c(m.value), 1),
                      ]))
                    : i("", !0),
                  u.value
                    ? (l(),
                      s("div", jn, [
                        r(
                          b,
                          { text: "Phone Office", location: "top" },
                          {
                            activator: _(({ props: k }) => [
                              r(
                                C(N),
                                W(k, {
                                  color: a.value[3],
                                  icon: "wpf:phone-office",
                                  class: "w-5 h-5",
                                }),
                                null,
                                16,
                                ["color"]
                              ),
                            ]),
                            _: 1,
                          }
                        ),
                        o("div", null, c(u.value), 1),
                      ]))
                    : x.value
                    ? (l(),
                      s("div", Un, [
                        r(
                          b,
                          { text: "Phone Cell", location: "top" },
                          {
                            activator: _(({ props: k }) => [
                              r(
                                C(N),
                                W(k, {
                                  color: a.value[3],
                                  icon: "ic:baseline-phone",
                                  class: "w-5 h-5",
                                }),
                                null,
                                16,
                                ["color"]
                              ),
                            ]),
                            _: 1,
                          }
                        ),
                        o("div", null, c(x.value), 1),
                      ]))
                    : i("", !0),
                  e.profile.email
                    ? (l(),
                      s("div", Nn, [
                        r(
                          b,
                          { text: "Email", location: "top" },
                          {
                            activator: _(({ props: k }) => [
                              r(
                                C(N),
                                W(k, {
                                  color: a.value[3],
                                  icon: "bi:envelope-fill",
                                  class: "w-5 h-5",
                                }),
                                null,
                                16,
                                ["color"]
                              ),
                            ]),
                            _: 1,
                          }
                        ),
                        o("div", null, c(e.profile.email), 1),
                      ]))
                    : i("", !0),
                  e.profile.county
                    ? (l(),
                      s("div", Ln, [
                        r(
                          b,
                          { text: "County", location: "top" },
                          {
                            activator: _(({ props: k }) => [
                              r(
                                C(N),
                                W(k, {
                                  color: a.value[3],
                                  icon: "tabler:location-filled",
                                  class: "w-5 h-5",
                                }),
                                null,
                                16,
                                ["color"]
                              ),
                            ]),
                            _: 1,
                          }
                        ),
                        o("div", null, "County: " + c(e.profile.county), 1),
                      ]))
                    : i("", !0),
                  o("div", Dn, [
                    e.profile.website_url
                      ? (l(),
                        s(
                          "a",
                          { key: 0, href: p(e.profile.website_url) },
                          [
                            r(
                              b,
                              { text: "Website", location: "top" },
                              {
                                activator: _(({ props: k }) => [
                                  r(
                                    C(N),
                                    W(k, {
                                      icon: "fluent-mdl2:website",
                                      color: a.value[3],
                                      class: "``",
                                    }),
                                    null,
                                    16,
                                    ["color"]
                                  ),
                                ]),
                                _: 1,
                              }
                            ),
                            o("div", null, c(e.profile.website_url), 1),
                          ],
                          8,
                          Rn
                        ))
                      : i("", !0),
                    e.profile.facebook
                      ? (l(),
                        s(
                          "a",
                          { key: 1, href: p(e.profile.facebook) },
                          [
                            r(
                              b,
                              { text: "Facebook", location: "top" },
                              {
                                activator: _(({ props: k }) => [
                                  r(
                                    C(N),
                                    W(k, { icon: "logos:facebook", class: "" }),
                                    null,
                                    16
                                  ),
                                ]),
                                _: 1,
                              }
                            ),
                            o(
                              "div",
                              null,
                              c(g.value && g.value.follow_us_on) + " Facebook",
                              1
                            ),
                          ],
                          8,
                          An
                        ))
                      : i("", !0),
                    e.profile.twitter
                      ? (l(),
                        s(
                          "a",
                          { key: 2, href: p(e.profile.twitter) },
                          [
                            r(
                              b,
                              { text: "Twitter", location: "top" },
                              {
                                activator: _(({ props: k }) => [
                                  r(
                                    C(N),
                                    W(k, {
                                      icon: "fa6-brands:square-x-twitter",
                                      color: "black",
                                      class: "",
                                    }),
                                    null,
                                    16
                                  ),
                                ]),
                                _: 1,
                              }
                            ),
                            o(
                              "div",
                              null,
                              c(g.value && g.value.follow_us_on) + " Twitter",
                              1
                            ),
                          ],
                          8,
                          Vn
                        ))
                      : i("", !0),
                    e.profile.tiktok
                      ? (l(),
                        s(
                          "a",
                          { key: 3, href: p(e.profile.tiktok) },
                          [
                            r(
                              b,
                              { text: "TikTok", location: "top" },
                              {
                                activator: _(({ props: k }) => [
                                  r(
                                    C(N),
                                    W(k, {
                                      icon: "logos:tiktok-icon",
                                      class: "",
                                    }),
                                    null,
                                    16
                                  ),
                                ]),
                                _: 1,
                              }
                            ),
                            o(
                              "div",
                              null,
                              c(g.value && g.value.follow_us_on) + " Tiktok",
                              1
                            ),
                          ],
                          8,
                          Pn
                        ))
                      : i("", !0),
                    e.profile.instagram
                      ? (l(),
                        s(
                          "a",
                          { key: 4, href: p(e.profile.instagram) },
                          [
                            r(
                              b,
                              { text: "Instagram", location: "top" },
                              {
                                activator: _(({ props: k }) => [
                                  r(
                                    C(N),
                                    W(k, {
                                      icon: "skill-icons:instagram",
                                      class: "",
                                    }),
                                    null,
                                    16
                                  ),
                                ]),
                                _: 1,
                              }
                            ),
                            o(
                              "div",
                              null,
                              c(g.value && g.value.follow_us_on) + " Instagram",
                              1
                            ),
                          ],
                          8,
                          Hn
                        ))
                      : i("", !0),
                  ]),
                ],
                4
              ),
            ],
            64
          )
        );
      };
    },
  },
  On = te(Bn, [["__scopeId", "data-v-cfb328db"]]),
  En = { key: 0, class: A("mt-1 flex gap-1 flex-col rounded-lg closing") },
  Fn = ["innerHTML"],
  Mn = {
    __name: "BottomTitleText5",
    props: {
      screenWidth: { type: [String, Number] },
      bottom_text: { type: String },
    },
    setup(e) {
      const t = e,
        f = (u) => {
          const h = document.createElement("textarea");
          return (h.innerHTML = u), h.value;
        },
        d = w(() => {
          const h = new DOMParser().parseFromString(x.value, "text/html");
          return (
            h.querySelectorAll("a").forEach((m) => {
              const v = m.getAttribute("href");
              !v.startsWith("http://") &&
                !v.startsWith("https://") &&
                m.setAttribute("href", "http://" + v),
                (m.target = "_blank");
            }),
            h.body.innerHTML
          );
        }),
        x = n(f(t.bottom_text));
      return (u, h) =>
        d.value
          ? (l(),
            s("div", En, [
              o(
                "div",
                { class: "default ck-content", innerHTML: d.value },
                null,
                8,
                Fn
              ),
            ]))
          : i("", !0);
    },
  },
  Gn = {
    key: 0,
    class: A(
      " flex gap-1 flex-col rounded-lg closing md:border-gray-300 md:border-2 p-3"
    ),
  },
  zn = ["innerHTML"],
  qn = { class: "flex justify-end gap-1" },
  Yn = {
    __name: "ClosingTitleText5",
    props: {
      screenWidth: { type: [String, Number] },
      loggedInUserId: [String, Number],
      closing_text: { type: String },
      userId: [String, Number],
    },
    setup(e) {
      const t = e,
        f = (g) => {
          const p = document.createElement("textarea");
          return (p.innerHTML = g), console.log("here"), p.value;
        },
        d = P(),
        x = n(f(t.closing_text)),
        u = n(!1),
        h = () => {
          if (v.value !== 3) {
            d.commit("setIsUpgradeToGoldPlatinumDialogOpen", !0);
            return;
          }
          I(window.location.href) && (u.value = !0);
        },
        m = w(() => d.getters.translations),
        v = w(() => d.getters.userVersion),
        y = w(() => d.state.contractor.selectedColorScheme || H);
      function I(g) {
        const p = document.createElement("textarea");
        (p.value = g), document.body.appendChild(p), p.select();
        let $;
        try {
          $ = document.execCommand("copy");
        } catch (S) {
          console.error("Failed to copy text: ", S), ($ = !1);
        }
        return document.body.removeChild(p), $;
      }
      const a = w(() => {
        const p = new DOMParser().parseFromString(x.value, "text/html");
        return (
          p.querySelectorAll("a").forEach(($) => {
            const S = $.getAttribute("href");
            !S.startsWith("http://") &&
              !S.startsWith("https://") &&
              $.setAttribute("href", "http://" + S),
              ($.target = "_blank");
          }),
          p.body.innerHTML
        );
      });
      return (g, p) => {
        const $ = O("Link"),
          S = O("v-snackbar");
        return (
          l(),
          s(
            D,
            null,
            [
              a.value
                ? (l(),
                  s("div", Gn, [
                    o(
                      "div",
                      { class: "default ck-content", innerHTML: a.value },
                      null,
                      8,
                      zn
                    ),
                  ]))
                : i("", !0),
              o("div", qn, [
                e.userId === e.loggedInUserId
                  ? (l(),
                    E(
                      $,
                      {
                        key: 0,
                        class: "rounded-full",
                        href: `/contractor/${e.userId}/edit`,
                      },
                      {
                        default: _(() => [
                          o(
                            "button",
                            {
                              class: A(
                                ` px-4 py-1 text-xs hover:bg-[#114678] sm:text-sm font-bold rounded-full border-[${y.value[4]}] border-[1px] text-white cursor-pointer hover:shadow-lg active:scale-95 w-full`
                              ),
                              style: U({
                                background: y.value[4],
                                borderColor: y.value[4],
                              }),
                            },
                            " Edit ",
                            6
                          ),
                        ]),
                        _: 1,
                      },
                      8,
                      ["href"]
                    ))
                  : i("", !0),
                o(
                  "button",
                  W(t, {
                    onClick: h,
                    style: { color: y.value[4], borderColor: y.value[4] },
                    class:
                      "bg-white px-4 py-1 text-xs hover:bg-[#f8f9fa] sm:text-sm font-bold rounded-full border-[1px] bg-white cursor-pointer hover:shadow-lg active:scale-95",
                  }),
                  c(m.value && m.value.share),
                  17
                ),
                r(
                  S,
                  {
                    location: "bottom",
                    modelValue: u.value,
                    "onUpdate:modelValue":
                      p[0] || (p[0] = (b) => (u.value = b)),
                    timeout: 2e3,
                    color: "success",
                  },
                  {
                    default: _(() => [
                      ee(c(m.value && m.value.link_copied_to_clipboard), 1),
                    ]),
                    _: 1,
                  },
                  8,
                  ["modelValue"]
                ),
              ]),
            ],
            64
          )
        );
      };
    },
  },
  Jn = {
    key: 0,
    class:
      "w-full p-4 md:p-6 text-xl md:text-2xl font-bold md:font-extrabold text-center",
  },
  Kn = { key: 1, class: "w-full h-full bg-[#222] rounded-md" },
  Xn = ["onClick", "src"],
  Qn = {
    key: 2,
    class: "flex flex-col gap-2 md:gap-4 items-center flex-col-reverse",
  },
  Zn = { class: "relative w-full bg-[#222] rounded-md" },
  ei = ["onClick", "src"],
  ti = {
    class:
      "sm:w-4/5 text-xl md:text-3xl pt-2 font-bold md:font-extrabold text-center",
  },
  oi = {
    class:
      "max-h-[400px] md:max-h-[500px] w-full flex justify-center xs:w-[400px] md:w-[600px] bg-[#222]",
  },
  li = ["src"],
  si = {
    __name: "BragSection5",
    props: {
      screenWidth: { type: [String, Number] },
      brag_sections: { type: Array },
      contractorId: { type: Number },
    },
    setup(e) {
      const t = e,
        f = P(),
        d = n(t.brag_sections),
        x = n(""),
        u = n(),
        h = w(() => f.state.contractor.selectedColorScheme || H),
        m = w(() => f.getters.translations),
        v = (y) => {
          (x.value = y), u.value.openDialog();
        };
      return (y, I) => (
        l(),
        s(
          D,
          null,
          [
            d.value && d.value.length > 0
              ? (l(),
                s(
                  "div",
                  {
                    key: 0,
                    class: "flex gap-4 flex-col",
                    style: U({ color: h.value[2] }),
                  },
                  [
                    (l(!0),
                    s(
                      D,
                      null,
                      X(
                        d.value,
                        (a) => (
                          l(),
                          s(
                            "div",
                            {
                              key: a.id,
                              class:
                                "rounded-md border relative border-gray-300 p-2 sm:p-2",
                            },
                            [
                              !a.section_image && a.section_text
                                ? (l(), s("div", Jn, c(a.section_text), 1))
                                : i("", !0),
                              a.section_image && !a.section_text
                                ? (l(),
                                  s("div", Kn, [
                                    o(
                                      "img",
                                      {
                                        onClick: (g) => v(a.section_image),
                                        src: a.section_image,
                                        alt: "Section Image",
                                        class: "object-cover w-full rounded-md",
                                      },
                                      null,
                                      8,
                                      Xn
                                    ),
                                  ]))
                                : i("", !0),
                              a.section_image && a.section_text
                                ? (l(),
                                  s("div", Qn, [
                                    o("div", Zn, [
                                      o(
                                        "img",
                                        {
                                          onClick: (g) => v(a.section_image),
                                          src: a.section_image,
                                          alt: "Section Image",
                                          class:
                                            "object-cover rounded-md w-full",
                                        },
                                        null,
                                        8,
                                        ei
                                      ),
                                    ]),
                                    o("div", ti, c(a.section_text), 1),
                                  ]))
                                : i("", !0),
                            ]
                          )
                        )
                      ),
                      128
                    )),
                  ],
                  4
                ))
              : i("", !0),
            r(
              Q,
              {
                dialogWidth: "widthAuto",
                showFooter: !1,
                ref_key: "imageIncDialogRef",
                ref: u,
                title: m.value && m.value.your_image,
              },
              {
                default: _(() => [
                  o("div", oi, [o("img", { src: x.value }, null, 8, li)]),
                ]),
                _: 1,
              },
              8,
              ["title"]
            ),
          ],
          64
        )
      );
    },
  },
  ai = {
    key: 0,
    class:
      "w-full p-4 md:p-6 text-xl md:text-2xl font-bold md:font-extrabold text-xl md:text-3xl font-bold md:font-extrabold text-center",
  },
  ri = { key: 1, class: "w-full h-full bg-[#222] rounded-md" },
  ni = ["onClick", "src"],
  ii = {
    key: 2,
    class: "flex flex-col gap-2 md:gap-4 items-center flex-col-reverse",
  },
  ci = { class: "relative w-full bg-[#222] rounded-md" },
  di = ["onClick", "src"],
  ui = {
    class:
      "sm:w-3/5 text-xl md:text-3xl pt-2 font-bold md:font-extrabold text-center",
  },
  mi = {
    class:
      "max-h-[400px] md:max-h-[500px] w-full flex justify-center xs:w-[400px] md:w-[600px] bg-[#222]",
  },
  fi = ["src"],
  gi = {
    __name: "ImageTextSection5",
    props: {
      screenWidth: { type: [String, Number] },
      image_sections: { type: Array },
      contractorId: { type: Number },
    },
    setup(e) {
      const t = e,
        f = P(),
        d = n(t.image_sections),
        x = n(""),
        u = n(),
        h = w(() => f.state.contractor.selectedColorScheme || H),
        m = w(() => f.getters.translations),
        v = (y) => {
          (x.value = y), console.log("infunction call"), u.value.openDialog();
        };
      return (y, I) => (
        l(),
        s(
          D,
          null,
          [
            d.value && d.value.length > 0
              ? (l(),
                s(
                  "div",
                  {
                    key: 0,
                    style: U({ color: h.value[2] }),
                    class: "flex gap-4 flex-col",
                  },
                  [
                    (l(!0),
                    s(
                      D,
                      null,
                      X(
                        d.value,
                        (a) => (
                          l(),
                          s(
                            "div",
                            {
                              key: a.id,
                              class:
                                "rounded-md border relative border-gray-300 p-2 sm:p-2",
                            },
                            [
                              !a.section_image && a.section_text
                                ? (l(), s("div", ai, c(a.section_text), 1))
                                : i("", !0),
                              a.section_image && !a.section_text
                                ? (l(),
                                  s("div", ri, [
                                    o(
                                      "img",
                                      {
                                        onClick: (g) => v(a.section_image),
                                        src: a.section_image,
                                        alt: "Section Image",
                                        class: "object-cover w-full rounded-md",
                                      },
                                      null,
                                      8,
                                      ni
                                    ),
                                  ]))
                                : i("", !0),
                              a.section_image && a.section_text
                                ? (l(),
                                  s("div", ii, [
                                    o("div", ci, [
                                      o(
                                        "img",
                                        {
                                          onClick: (g) => v(a.section_image),
                                          src: a.section_image,
                                          alt: "Section Image",
                                          class:
                                            "object-cover rounded-md w-full",
                                        },
                                        null,
                                        8,
                                        di
                                      ),
                                    ]),
                                    o("div", ui, c(a.section_text), 1),
                                  ]))
                                : i("", !0),
                            ]
                          )
                        )
                      ),
                      128
                    )),
                  ],
                  4
                ))
              : i("", !0),
            r(
              Q,
              {
                dialogWidth: "widthAuto",
                showFooter: !1,
                ref_key: "imageIncDialogRef",
                ref: u,
                title: m.value && m.value.your_image,
              },
              {
                default: _(() => [
                  o("div", mi, [o("img", { src: x.value }, null, 8, fi)]),
                ]),
                _: 1,
              },
              8,
              ["title"]
            ),
          ],
          64
        )
      );
    },
  },
  vi = { key: 0 },
  xi = { class: "flex flex-col gap-3 sm:gap-4" },
  hi = { class: "mt-6" },
  _i = { class: "flex flex-col mb-6 md:flex-row gap-2 items-stretch" },
  pi = {
    __name: "Template5",
    props: {
      profile: Object,
      loggedInUserId: [String, Number],
      region_name: String,
      total_reviews: [Number, String],
      average_rating: [Number, String],
      screenWidth: Number,
      starPercentages: { type: Array, default: [] },
    },
    setup(e) {
      const t = P(),
        f = w(() => t.state.contractor.selectedColorScheme || H);
      return (d, x) =>
        e.profile
          ? (l(),
            s("div", vi, [
              o("div", xi, [
                r(
                  le,
                  {
                    shadowLevel: 2,
                    bgColor: f.value[1],
                    padding: e.screenWidth < 640 ? "7px" : "15px",
                  },
                  {
                    default: _(() => [
                      r(
                        vn,
                        {
                          screenWidth: e.screenWidth,
                          loggedInUserId: e.loggedInUserId,
                          averageRating: e.average_rating,
                          total_reviews: e.total_reviews,
                          profile: e.profile,
                        },
                        null,
                        8,
                        [
                          "screenWidth",
                          "loggedInUserId",
                          "averageRating",
                          "total_reviews",
                          "profile",
                        ]
                      ),
                      o("div", hi, [
                        e.profile.image_sections &&
                        e.profile.image_sections.length > 0
                          ? (l(),
                            E(
                              gi,
                              {
                                key: 0,
                                image_sections: e.profile.image_sections,
                                "contractor-id": e.profile.id,
                                "screen-width": e.screenWidth,
                              },
                              null,
                              8,
                              [
                                "image_sections",
                                "contractor-id",
                                "screen-width",
                              ]
                            ))
                          : i("", !0),
                      ]),
                      e.profile.bottom_text
                        ? (l(),
                          s(
                            "div",
                            {
                              key: 0,
                              class: "my-6",
                              style: U({ color: f.value[2] }),
                            },
                            [
                              r(
                                Mn,
                                {
                                  class: "md:border-gray-300 md:border-2 p-3",
                                  bottom_text: e.profile.bottom_text,
                                  "screen-width": e.screenWidth,
                                },
                                null,
                                8,
                                ["bottom_text", "screen-width"]
                              ),
                            ],
                            4
                          ))
                        : i("", !0),
                      o("div", _i, [
                        r(
                          le,
                          {
                            shadowLevel: 2,
                            cardInnerClasses: "h-full",
                            bgColor: f.value[1],
                            isInside: !0,
                            class: "h-auto md:w-3/5",
                            padding: e.screenWidth < 640 ? "7px" : "20px",
                          },
                          {
                            default: _(() => [
                              r(
                                On,
                                {
                                  class: "",
                                  screenWidth: e.screenWidth,
                                  profile: e.profile,
                                },
                                null,
                                8,
                                ["screenWidth", "profile"]
                              ),
                            ]),
                            _: 1,
                          },
                          8,
                          ["bgColor", "padding"]
                        ),
                        r(
                          le,
                          {
                            shadowLevel: 2,
                            bgColor: f.value[1],
                            cardInnerClasses: "h-full",
                            isInside: !0,
                            class: "h-auto md:w-2/5",
                            padding: e.screenWidth < 640 ? "7px" : "20px",
                          },
                          {
                            default: _(() => [
                              r(
                                kn,
                                {
                                  screenWidth: e.screenWidth,
                                  region_name: e.region_name,
                                  profile: e.profile,
                                },
                                null,
                                8,
                                ["screenWidth", "region_name", "profile"]
                              ),
                            ]),
                            _: 1,
                          },
                          8,
                          ["bgColor", "padding"]
                        ),
                      ]),
                      e.profile.brag_sections &&
                      e.profile.brag_sections.length > 0
                        ? (l(),
                          E(
                            si,
                            {
                              key: 1,
                              brag_sections: e.profile.brag_sections,
                              "contractor-id": e.profile.id,
                              "screen-width": e.screenWidth,
                            },
                            null,
                            8,
                            ["brag_sections", "contractor-id", "screen-width"]
                          ))
                        : i("", !0),
                      e.profile.bottom_text || e.profile.closing_text
                        ? (l(),
                          s(
                            "div",
                            {
                              key: 2,
                              class: "flex gap-2 flex-col mt-6",
                              style: U({ color: f.value[2] }),
                            },
                            [
                              r(
                                Yn,
                                {
                                  userId: e.profile.user_id,
                                  loggedInUserId: e.loggedInUserId,
                                  closing_text: e.profile.closing_text,
                                  "screen-width": e.screenWidth,
                                },
                                null,
                                8,
                                [
                                  "userId",
                                  "loggedInUserId",
                                  "closing_text",
                                  "screen-width",
                                ]
                              ),
                            ],
                            4
                          ))
                        : i("", !0),
                    ]),
                    _: 1,
                  },
                  8,
                  ["bgColor", "padding"]
                ),
              ]),
            ]))
          : i("", !0);
    },
  },
  Se = {
    __name: "ContractorLayout",
    props: {
      profile: Object,
      loggedInUserId: [String, Number],
      templateList: Array,
      region_name: String,
      total_reviews: [Number, String],
      average_rating: [Number, String],
      starPercentages: { type: Array, default: [] },
    },
    setup(e) {
      const t = P(),
        f = w(() => t.getters.screenWidth),
        d = w(() => t.state.contractor.selectedTemplate),
        x = w(() => t.state.contractor.selectedColorScheme || H);
      return (u, h) => (
        l(),
        s(
          D,
          null,
          [
            d.value === 1
              ? (l(),
                E(
                  Io,
                  {
                    key: 0,
                    profile: e.profile,
                    screenWidth: f.value,
                    loggedInUserId: e.loggedInUserId,
                    average_rating: e.average_rating,
                    starPercentages: e.starPercentages,
                    total_reviews: e.total_reviews,
                    region_name: e.region_name,
                  },
                  null,
                  8,
                  [
                    "profile",
                    "screenWidth",
                    "loggedInUserId",
                    "average_rating",
                    "starPercentages",
                    "total_reviews",
                    "region_name",
                  ]
                ))
              : i("", !0),
            d.value === 2
              ? (l(),
                E(
                  Jl,
                  {
                    key: 1,
                    profile: e.profile,
                    screenWidth: f.value,
                    loggedInUserId: e.loggedInUserId,
                    average_rating: e.average_rating,
                    starPercentages: e.starPercentages,
                    total_reviews: e.total_reviews,
                    region_name: e.region_name,
                  },
                  null,
                  8,
                  [
                    "profile",
                    "screenWidth",
                    "loggedInUserId",
                    "average_rating",
                    "starPercentages",
                    "total_reviews",
                    "region_name",
                  ]
                ))
              : i("", !0),
            d.value === 3
              ? (l(),
                E(
                  wa,
                  {
                    key: 2,
                    profile: e.profile,
                    screenWidth: f.value,
                    loggedInUserId: e.loggedInUserId,
                    average_rating: e.average_rating,
                    starPercentages: e.starPercentages,
                    total_reviews: e.total_reviews,
                    region_name: e.region_name,
                  },
                  null,
                  8,
                  [
                    "profile",
                    "screenWidth",
                    "loggedInUserId",
                    "average_rating",
                    "starPercentages",
                    "total_reviews",
                    "region_name",
                  ]
                ))
              : i("", !0),
            d.value === 4
              ? (l(),
                E(
                  Xr,
                  {
                    key: 3,
                    profile: e.profile,
                    screenWidth: f.value,
                    loggedInUserId: e.loggedInUserId,
                    average_rating: e.average_rating,
                    starPercentages: e.starPercentages,
                    total_reviews: e.total_reviews,
                    region_name: e.region_name,
                  },
                  null,
                  8,
                  [
                    "profile",
                    "screenWidth",
                    "loggedInUserId",
                    "average_rating",
                    "starPercentages",
                    "total_reviews",
                    "region_name",
                  ]
                ))
              : i("", !0),
            d.value === 5
              ? (l(),
                E(
                  pi,
                  {
                    key: 4,
                    profile: e.profile,
                    screenWidth: f.value,
                    loggedInUserId: e.loggedInUserId,
                    average_rating: e.average_rating,
                    starPercentages: e.starPercentages,
                    total_reviews: e.total_reviews,
                    region_name: e.region_name,
                  },
                  null,
                  8,
                  [
                    "profile",
                    "screenWidth",
                    "loggedInUserId",
                    "average_rating",
                    "starPercentages",
                    "total_reviews",
                    "region_name",
                  ]
                ))
              : i("", !0),
            r(
              De,
              {
                scrollableContainer: "scrollableContainer",
                selectedColor: x.value[3],
              },
              null,
              8,
              ["selectedColor"]
            ),
          ],
          64
        )
      );
    },
  },
  lc = {
    __name: "ContractorPage",
    props: {
      profile: Object,
      contractor_id: [String, Number],
      region_name: String,
    },
    setup(e) {
      const { profile: t, contractor_id: f } = e,
        d = n(!1),
        x = n([]),
        u = P(),
        h = n(!0),
        m = n([]),
        v = n(null),
        y = n({}),
        I = n(null),
        a = n(0);
      ue(() => {
        b();
      });
      const g = w(() => u.state.contractor.selectedTemplate),
        p = w(() => u.getters.isUpgradeToGoldPlatinumDialogOpen),
        $ = w(() => u.state.contractor.selectedColorScheme || H),
        S = w(() => u.state.ratings.shouldFetchPostsOnClose);
      Ce(
        () => p.value,
        (V, G) => {
          V && I.value.openDialog();
        }
      ),
        Ce(S, async () => {
          if (S)
            try {
              const V = await axios.get(
                `/api/contractor/get-contractor-info/${f}`,
                we()
              );
              V.data &&
                ((v.value = V.data.average_rating),
                (a.value = V.data.total_reviews));
            } catch {
              ke();
            }
        });
      const b = async () => {
          d.value = !0;
          try {
            const V = await axios.get(
              `/api/contractor/get-contractor-info/${f}`,
              we()
            );
            if (V.data) {
              (y.value = V.data.contractorProfile),
                u.commit("contractor/setSelectedTemplate", y.value.template_id),
                (v.value = V.data.average_rating),
                (a.value = V.data.total_reviews);
              const {
                  five_stars_count: G,
                  four_stars_count: T,
                  three_stars_count: J,
                  two_stars_count: R,
                  one_star_count: M,
                } = V.data,
                K = G + T + J + R + M;
              m.value = [
                (G / K) * 100,
                (T / K) * 100,
                (J / K) * 100,
                (R / K) * 100,
                (M / K) * 100,
              ];
            }
          } catch {
            ke();
          } finally {
            d.value = !1;
          }
        },
        k = async () => {
          try {
            const V = await axios.get(
              "/api/contractor/all-color-schemes",
              we()
            );
            if (V.data) {
              const G = [...V.data.allColorSchemes];
              u.commit("contractor/setColorSchemeList", G);
              const T = G.find((R) => R.id === y.value.color_scheme_id),
                J = Ue(T);
              console.log(J, T, "optionSelected"),
                u.commit("contractor/setSelectedColorScheme", J);
            }
          } catch {
            ke();
          }
        },
        z = async () => {
          try {
            const V = await axios.get("/api/contractor/all-templates", we());
            V.data && (x.value = V.data.allTemplates);
          } catch {
            ke();
          }
        };
      return (
        We(async () => {
          h.value &&
            (console.log("watchEffect"),
            (d.value = !0),
            await z(),
            await k(),
            (d.value = !1),
            (h.value = !1));
        }),
        (V, G) => {
          var T, J;
          return (
            l(),
            s(
              D,
              null,
              [
                r(
                  C(je),
                  { title: V.translations && V.translations.contractor_page },
                  null,
                  8,
                  ["title"]
                ),
                !d.value && g.value === 1
                  ? (l(),
                    s(
                      "div",
                      {
                        key: 0,
                        class: "",
                        style: U({
                          backgroundColor: $.value[0] ? "#fff" : "#e5e7eb",
                        }),
                      },
                      [
                        r(
                          Se,
                          {
                            profile: y.value,
                            loggedInUserId:
                              (T = e.profile) == null ? void 0 : T.user_id,
                            templateList: x.value,
                            average_rating: v.value,
                            starPercentages: m.value,
                            total_reviews: a.value,
                            region_name: e.region_name,
                          },
                          null,
                          8,
                          [
                            "profile",
                            "loggedInUserId",
                            "templateList",
                            "average_rating",
                            "starPercentages",
                            "total_reviews",
                            "region_name",
                          ]
                        ),
                      ],
                      4
                    ))
                  : i("", !0),
                !d.value && g.value !== 1
                  ? (l(),
                    s(
                      "div",
                      {
                        key: 1,
                        class:
                          "pt-2 sm:pt-8 sm:pt-8 max-w-[1400px] mx-auto w-full",
                        style: U({
                          backgroundColor: $.value[0] ? $.value[0] : "#e5e7eb",
                        }),
                      },
                      [
                        r(
                          Se,
                          {
                            profile: y.value,
                            loggedInUserId:
                              (J = e.profile) == null ? void 0 : J.user_id,
                            templateList: x.value,
                            average_rating: v.value,
                            starPercentages: m.value,
                            total_reviews: a.value,
                            region_name: e.region_name,
                          },
                          null,
                          8,
                          [
                            "profile",
                            "loggedInUserId",
                            "templateList",
                            "average_rating",
                            "starPercentages",
                            "total_reviews",
                            "region_name",
                          ]
                        ),
                      ],
                      4
                    ))
                  : i("", !0),
                r(
                  Le,
                  {
                    loading: d.value,
                    background: "transparent",
                    height: "70vh",
                  },
                  null,
                  8,
                  ["loading"]
                ),
                (l(),
                E(Te, { to: "body" }, [
                  r(
                    Ne,
                    { ref_key: "upgradeToGoldPlatinumDialogRef", ref: I },
                    null,
                    512
                  ),
                ])),
              ],
              64
            )
          );
        }
      );
    },
  };
export { lc as default };
