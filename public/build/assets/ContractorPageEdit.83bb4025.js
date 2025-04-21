import { H as tt } from "./Header.8b20dfa0.js";
import { L as Ae } from "./Loader.9dfd413c.js";
import { I as J } from "./iconify.99e09ef6.js";
import { _ as be } from "./_plugin-vue_export-helper.cdc0426e.js";
import {
  c as N,
  d as c,
  e as S,
  h as e,
  i as M,
  r as o,
  p as ne,
  u as oe,
  I as de,
  s as B,
  f as s,
  K as q,
  l as I,
  J as ke,
  t as A,
  F as Z,
  X as ce,
  A as le,
  B as Y,
  _ as ue,
  w as Se,
  o as ge,
  y as me,
  j as pe,
  g as _e,
  n as X,
  a as Te,
  b as xe,
  k as Fe,
  L as lt,
  af as Me,
  G as at,
  q as ot,
  v as $e,
  al as st,
  x as Be,
  am as nt,
  D as it,
  N as rt,
} from "./app.907bb242.js";
import { A as ct } from "./ContractorInfo.6f4506f5.js";
import { _ as he } from "./HeadingCard.ac3646cb.js";
import { C as fe } from "./Card.0c51827f.js";
import {
  _ as ut,
  C as dt,
  D as qe,
} from "./ImageTextSection.vue_vue_type_style_index_0_scoped_a4e46067_lang.cc0ca6e2.js";
import { S as Ce } from "./SelectProfile.a00d96e3.js";
import Oe from "./UserAvatar.e643b2f7.js";
import { _ as K } from "./InputError.a485c9eb.js";
import { _ as O } from "./InputLabel.c691f6db.js";
import { _ as se } from "./TextInput.a3698496.js";
import { S as mt } from "./StarRating.345caaaf.js";
import { s as Ne, o as Pe } from "./selectListsHelpters.6d73b684.js";
import { C as ae } from "./CustomDialog.f5ff7c4f.js";
import { A as vt } from "./Avatar.72f6a2c8.js";
import { B as ft } from "./Badge.c427ce3e.js";
import { _ as ye } from "./InputIcon.1f121658.js";
import { _ as Ue } from "./GoogleAddressAutoComplete.36d7109e.js";
import {
  V as He,
  p as Ge,
  b as Xe,
  c as Ke,
  d as Je,
  e as Ye,
  f as Ze,
  g as Qe,
} from "./filepond-plugin-file-poster.b4b2d2f1.js";
/* empty css                                                             */ import "./PostDisplayEnlarged.adbff492.js";
/* empty css                                                               */ import "./Tooltip.df5bf8e9.js";
import "./StarRatingEditable.6da32187.js";
import "./Review.a038e96e.js";
import "./spanish.afd7e950.js";
import "./cConnectWord.60dc90ac.js";
import "./DialogProfileTabs.3ff770e3.js";
import "./Trades.1aa0dbd9.js";
import "./Views.82daefe6.js";
import "./DialogUpgradeToGoldPlatinum.8daf4ac5.js";
import "./ResponsiveNavLink.04cb55a4.js";
/* empty css                                                                   */ import "./ContractorRating.3006b2c1.js";
import "./Button.f68cd005.js";
import "./PrimaryButton.d6b2dece.js";
import "./EditResponseModal.84ffd735.js";
import "./DeleteResponseModal.4a25af00.js";
import "./ButtonRatings.029b3347.js";
import "./EditRatingModal.2e8212da.js";
import "./DeleteRatingModal.d3c2927a.js";
import "./QualifyingQuestions.944a7f65.js";
const pt = {
    class:
      "xs:text-md hover:bg-[#f8f9fa] hover:rounded-md w-[28px] h-[28px] xs:w-[35px] xs:h-[35px] font-semibold flex items-center justify-center active:scale-95",
  },
  gt = {
    __name: "IconButton",
    props: {
      icon: { type: String, required: !0 },
      color: { type: String, default: "#1864ab" },
    },
    setup(a) {
      return (
        N(() => ({
          boxShadow:
            "0px 0px 3px rgba(0, 0, 0, 0.12), 0px 0px 2px rgba(0, 0, 0, 0.12)",
        })),
        (l, C) => (
          c(),
          S("button", pt, [
            e(
              M(J),
              {
                class:
                  "w-[24px] h-[24px] xs:w-[28px] xs:h-[28px] focus:outline-none",
                icon: a.icon,
                color: a.color,
              },
              null,
              8,
              ["icon", "color"]
            ),
          ])
        )
      );
    },
  },
  ie = be(gt, [["__scopeId", "data-v-83a7ce6b"]]),
  _t = { class: "flex space-x-2 justify-between" },
  ht = { class: "flex justify-center items-center space-x-2" },
  bt = { class: "flex flex-col justify-center" },
  yt = { key: 0, class: "text-sm xs:text-lg" },
  xt = { key: 1, class: "text-xs xs:text-lg" },
  wt = {
    class:
      "self-start flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3",
  },
  kt = { class: "flex items-center justify-center gap-2" },
  $t = { class: "flex justify-center" },
  St = {
    class: "mt-6 space-y-6 sm:space-y-0 w-full sm:grid sm:grid-cols-2 sm:gap-4",
  },
  Tt = {
    __name: "ProfileHeaderEdit",
    props: {
      profile: Object,
      screenWidth: Number,
      averageRating: { type: Number, default: 0 },
    },
    setup(a) {
      var Q, ee, U, $, L;
      const l = a,
        C = o(l.profile.first_name),
        r = o(l.profile.last_name),
        t = o(l.profile.user_avatar),
        h = o(l.profile.company_name),
        W = o(!1),
        R = o(l.profile.city),
        k = o(l.profile.state),
        u = ne({
          first_name: (Q = C.value) != null ? Q : "",
          last_name: (ee = r.value) != null ? ee : "",
          city: (U = R.value) != null ? U : "",
          state: ($ = k.value) != null ? $ : "",
          company_name: (L = h.value) != null ? L : "",
        }),
        V = o(!1),
        v = o(!1),
        _ = o(),
        w = ne({
          first_name: "",
          last_name: "",
          company_name: "",
          city: "",
          state: "",
        }),
        b = oe(),
        p = N(() => b.getters.translations),
        i = N(() => C.value + " " + r.value),
        d = N(() => {
          if (
            (console.log("here in teh trunctated", l.screenWidth),
            l.screenWidth < 600)
          ) {
            const z = l.screenWidth < 400 ? 18 : 24;
            return i.value.length > z
              ? i.value.substring(0, z) + "..."
              : i.value;
          } else return C.value + " " + r.value;
        }),
        E = () => {
          _.value.openDialog();
        },
        f = () => {
          let z = !0;
          for (let y in w) w[y] = "";
          return (
            console.log(u, "form"),
            u.first_name.trim() ||
              ((w.first_name = p.value && p.value.first_name_is_required),
              (z = !1)),
            u.last_name.trim() ||
              ((w.last_name = p.value && p.value.last_name_is_required),
              (z = !1)),
            u.company_name.trim() ||
              ((w.company_name = "Company name is required"), (z = !1)),
            u.city.trim() ||
              ((w.city = p.value && p.value.city_is_required), (z = !1)),
            u.state.trim() ||
              ((w.state = p.value && p.value.state_is_required), (z = !1)),
            z
          );
        },
        g = async () => {
          if (f()) {
            (V.value = !0), (v.value = !0);
            try {
              const z = await axios.patch(
                "/api/contractor/general-profile",
                u,
                ce()
              );
              z.data &&
                (le(z.data.message || "Genral information successfully saved"),
                (C.value = u.first_name),
                (r.value = u.last_name),
                (R.value = u.city),
                (k.value = u.state),
                (h.value = u.company_name),
                _.value.closeDialog());
            } catch {
              Y();
            } finally {
              (V.value = !1), (v.value = !1);
            }
          }
        },
        n = async (z) => {
          W.value = !0;
          const y = new FormData();
          y.append("user_avatar", z),
            axios
              .post("/api/contractor/user-avatar", y, ue())
              .then((m) => {
                (t.value = m.data.user_avatar), (W.value = !1);
              })
              .catch((m) => {
                Y("Error uploading avatar"), (W.value = !1);
              });
        },
        j = (z) => {
          u[z].trim() && (w[z] = "");
        };
      return (z, y) => {
        const m = de("v-skeleton-loader"),
          T = de("v-tooltip");
        return (
          c(),
          S(
            Z,
            null,
            [
              e(
                fe,
                {
                  shadowLevel: 2,
                  bgColor: "white",
                  padding: a.screenWidth < 640 ? "7px" : "20px",
                },
                {
                  default: B(() => [
                    s("div", _t, [
                      s("div", ht, [
                        s("div", null, [
                          W.value
                            ? (c(),
                              q(m, {
                                key: 0,
                                style: { "border-radius": "9999px" },
                                class:
                                  "overflow-hidden w-14 h-14 sm:h-20 sm:w-20",
                                type: "image",
                              }))
                            : I("", !0),
                          W.value
                            ? I("", !0)
                            : (c(),
                              q(
                                vt,
                                { key: 1, imageSrc: `/${t.value}` },
                                null,
                                8,
                                ["imageSrc"]
                              )),
                        ]),
                        s("div", bt, [
                          s("div", null, [
                            e(
                              T,
                              {
                                "open-on-click": !0,
                                "open-on-focus": !0,
                                text: i.value,
                                location: "bottom",
                              },
                              {
                                activator: B(({ props: x }) => [
                                  s(
                                    "h2",
                                    ke(
                                      {
                                        class:
                                          "text-md xs:text-xl font-medium font-bold text-gray-900",
                                      },
                                      x
                                    ),
                                    A(d.value),
                                    17
                                  ),
                                ]),
                                _: 1,
                              },
                              8,
                              ["text"]
                            ),
                          ]),
                          h.value
                            ? (c(), S("div", yt, A(h.value), 1))
                            : I("", !0),
                          R.value || k.value
                            ? (c(),
                              S("span", xt, A(R.value + " " + k.value), 1))
                            : I("", !0),
                        ]),
                      ]),
                      s("div", wt, [
                        s("div", null, [
                          a.averageRating
                            ? (c(),
                              q(
                                mt,
                                {
                                  key: 0,
                                  rating: Number(a.averageRating.toFixed(1)),
                                  isIndicatorActive: !1,
                                },
                                null,
                                8,
                                ["rating"]
                              ))
                            : I("", !0),
                        ]),
                        s("div", kt, [
                          e(ie, {
                            class: "self-end sm:self-center",
                            onClick: E,
                            icon: "nimbus:edit",
                            color: "#1864ab",
                          }),
                        ]),
                      ]),
                    ]),
                  ]),
                  _: 1,
                },
                8,
                ["padding"]
              ),
              e(
                ae,
                {
                  submitText: p.value && p.value.save,
                  onSubmit: g,
                  loading: V.value,
                  disabled: v.value,
                  ref_key: "dialogRef",
                  ref: _,
                  title: p.value && p.value.edit_your_general_information,
                },
                {
                  default: B(() => [
                    s("div", $t, [
                      W.value
                        ? (c(),
                          q(m, {
                            key: 0,
                            style: { "border-radius": "9999px" },
                            class: "overflow-hidden w-36 h-36",
                            type: "image",
                          }))
                        : I("", !0),
                      W.value
                        ? I("", !0)
                        : (c(),
                          q(
                            Oe,
                            {
                              key: 1,
                              imageSrc: `/${t.value}`,
                              onUpdateImage: n,
                            },
                            null,
                            8,
                            ["imageSrc"]
                          )),
                    ]),
                    s("div", St, [
                      s("div", null, [
                        e(
                          O,
                          {
                            class: "font-bold",
                            for: "first_name",
                            value: p.value && p.value.first_name + "*",
                          },
                          null,
                          8,
                          ["value"]
                        ),
                        e(
                          se,
                          {
                            id: "first_name",
                            type: "text",
                            onInput: y[0] || (y[0] = (x) => j("first_name")),
                            class: "mt-1 block w-full",
                            required: "",
                            modelValue: u.first_name,
                            "onUpdate:modelValue":
                              y[1] || (y[1] = (x) => (u.first_name = x)),
                            placeholder:
                              p.value && p.value.type_your_first_name,
                            autocomplete: "given-name",
                          },
                          null,
                          8,
                          ["modelValue", "placeholder"]
                        ),
                        e(
                          K,
                          { class: "mt-2", message: w.first_name },
                          null,
                          8,
                          ["message"]
                        ),
                      ]),
                      s("div", null, [
                        e(
                          O,
                          {
                            class: "font-bold",
                            for: "last_name",
                            value: p.value && p.value.last_name + "*",
                          },
                          null,
                          8,
                          ["value"]
                        ),
                        e(
                          se,
                          {
                            id: "last_name",
                            type: "text",
                            class: "mt-1 block w-full",
                            onInput: y[2] || (y[2] = (x) => j("last_name")),
                            modelValue: u.last_name,
                            "onUpdate:modelValue":
                              y[3] || (y[3] = (x) => (u.last_name = x)),
                            required: "",
                            placeholder: p.value && p.value.type_your_last_name,
                            autocomplete: "family-name",
                          },
                          null,
                          8,
                          ["modelValue", "placeholder"]
                        ),
                        e(K, { class: "mt-2", message: w.last_name }, null, 8, [
                          "message",
                        ]),
                      ]),
                      s("div", null, [
                        e(
                          O,
                          {
                            class: "font-bold",
                            for: "company_name",
                            value: p.value && p.value.company_name + "*",
                          },
                          null,
                          8,
                          ["value"]
                        ),
                        e(
                          se,
                          {
                            id: "company_name",
                            type: "text",
                            class: "mt-1 block w-full",
                            placeholder:
                              p.value && p.value.type_your_company_name,
                            onInput: y[4] || (y[4] = (x) => j("company_name")),
                            modelValue: u.company_name,
                            "onUpdate:modelValue":
                              y[5] || (y[5] = (x) => (u.company_name = x)),
                            required: "",
                            autocomplete: "company_name",
                          },
                          null,
                          8,
                          ["placeholder", "modelValue"]
                        ),
                        e(
                          K,
                          { class: "mt-2", message: w.company_name },
                          null,
                          8,
                          ["message"]
                        ),
                      ]),
                      s("div", null, [
                        e(
                          O,
                          {
                            class: "font-bold",
                            for: "city",
                            value: p.value && p.value.city + "*",
                          },
                          null,
                          8,
                          ["value"]
                        ),
                        e(
                          se,
                          {
                            id: "city",
                            type: "text",
                            class: "mt-1 block w-full",
                            modelValue: u.city,
                            "onUpdate:modelValue":
                              y[6] || (y[6] = (x) => (u.city = x)),
                            onInput: y[7] || (y[7] = (x) => j("city")),
                            placeholder: p.value && p.value.type_your_city,
                            autocomplete: "city",
                          },
                          null,
                          8,
                          ["modelValue", "placeholder"]
                        ),
                        e(K, { class: "mt-2", message: w.city }, null, 8, [
                          "message",
                        ]),
                      ]),
                      s("div", null, [
                        e(
                          O,
                          {
                            class: "font-bold mb-1",
                            for: "state",
                            value: p.value && p.value.state + "*",
                          },
                          null,
                          8,
                          ["value"]
                        ),
                        e(
                          Ce,
                          {
                            options: M(Ne),
                            modelValue: u.state,
                            "onUpdate:modelValue":
                              y[8] ||
                              (y[8] = (x) => {
                                (u.state = x), j("state");
                              }),
                          },
                          null,
                          8,
                          ["options", "modelValue"]
                        ),
                        e(K, { class: "mt-2", message: w.state }, null, 8, [
                          "message",
                        ]),
                      ]),
                    ]),
                  ]),
                  _: 1,
                },
                8,
                ["submitText", "loading", "disabled", "title"]
              ),
            ],
            64
          )
        );
      };
    },
  },
  Ct = { class: "flex justify-between" },
  Vt = { class: "flex gap-2 sm:gap-3" },
  It = {
    class:
      "xs:text-md w-[28px] h-[28px] xs:w-[35px] xs:h-[35px] font-semibold flex items-center justify-center",
  },
  Dt = { class: "mb-3" },
  Wt = {
    key: 0,
    class:
      "flex items-center justify-between w-full gap-2 xs:gap-4 mt-2 sm:mt-0",
  },
  Rt = { class: "flex items-center" },
  Et = { class: "font-bold text-sm xs:text-base sm:text-lg ml-1 xs:ml-2" },
  Lt = { class: "text-xs xs:text-sm sm:text-base translate-y-[0px] ml-2" },
  zt = { key: 0, class: "mb-4 sm:mb-0" },
  jt = { class: "mb-4 sm:mb-0 mt-4" },
  Pt = { key: 0, class: "flex items-center gap-4 mt-2 mb-5" },
  Ut = { for: "select_all", class: "mr-4 text-gray-800 font-bold" },
  At = { class: "grid grid-cols-2 gap-x-14 gap-y-3" },
  Ft = ["for"],
  Mt = ["onClick"],
  Bt = {
    __name: "RegionTradeSectionEdit",
    props: { profile: Object, region_name: String, screenWidth: Number },
    setup(a) {
      var U;
      const l = a,
        C = oe(),
        r = o([]),
        t = o((U = l.region_name) != null ? U : ""),
        h = o(t.value),
        W = o(),
        R = o(!1),
        k = o(),
        u = o(!1),
        V = ne({ region_id: "" }),
        v = o(!1),
        _ = ne({
          trade1: l.profile.trade1,
          trade2: l.profile.trade2,
          trade3: l.profile.trade3,
          trade4: l.profile.trade4,
          trade5: l.profile.trade5,
          trade6: l.profile.trade6,
          trade7: l.profile.trade7,
          trade8: l.profile.trade8,
          trade9: l.profile.trade9,
          trade10: l.profile.trade10,
          trade11: l.profile.trade11,
          trade12: l.profile.trade12,
          trade13: l.profile.trade13,
          trade14: l.profile.trade14,
          trade15: l.profile.trade15,
          trade16: l.profile.trade16,
          trade17: l.profile.trade17,
          trade18: l.profile.trade18,
          trade19: l.profile.trade19,
          trade20: l.profile.trade20,
          trade21: l.profile.trade21,
          trade22: l.profile.trade22,
          trade23: l.profile.trade23,
          trade24: l.profile.trade24,
          trade25: l.profile.trade25,
          trade26: 1,
          trade27: 1,
          trade28: 1,
          trade29: 1,
          trade30: 1,
        }),
        w = ne({
          trade1: l.profile.trade1,
          trade2: l.profile.trade2,
          trade3: l.profile.trade3,
          trade4: l.profile.trade4,
          trade5: l.profile.trade5,
          trade6: l.profile.trade6,
          trade7: l.profile.trade7,
          trade8: l.profile.trade8,
          trade9: l.profile.trade9,
          trade10: l.profile.trade10,
          trade11: l.profile.trade11,
          trade12: l.profile.trade12,
          trade13: l.profile.trade13,
          trade14: l.profile.trade14,
          trade15: l.profile.trade15,
          trade16: l.profile.trade16,
          trade17: l.profile.trade17,
          trade18: l.profile.trade18,
          trade19: l.profile.trade19,
          trade20: l.profile.trade20,
          trade21: l.profile.trade21,
          trade22: l.profile.trade22,
          trade23: l.profile.trade23,
          trade24: l.profile.trade24,
          trade25: l.profile.trade25,
          trade26: 1,
          trade27: 1,
          trade28: 1,
          trade29: 1,
          trade30: 1,
        }),
        b = N(() => C.state.ratings.loading),
        p = N(() => C.state.ratings.allRegions),
        i = N(() => C.getters.translations),
        d = N(() => C.getters.userVersion);
      Se(p, ($) => {
        $.length > 0 &&
          (console.log(p, "regions"), (r.value = p.value.map((L) => L.name)));
      }),
        ge(() => {
          C.dispatch("ratings/getRegions"),
            Object.values(w).every((L) => L === 1) && (v.value = !0);
        });
      const E = ($) => {
          if (
            d.value === 1 &&
            w[$] !== 1 &&
            Object.values(w).reduce((y, m) => y + (m === 1 ? 1 : 0), 0) >= 8
          ) {
            C.commit("setIsUpgradeToGoldPlatinumDialogOpen", !0);
            return;
          }
          if ($ === "trade1") {
            const z = w[$] === 1 ? 0 : 1;
            if (d.value !== 1) for (let y = 1; y <= 24; y++) w[`trade${y}`] = z;
            else w[`trade${1}`] = z;
          } else w[$] = w[$] === 1 ? 0 : 1;
          Object.values(w).every((z) => z === 1)
            ? (v.value = !0)
            : (v.value = !1);
        },
        f = () => {
          W.value.openDialog();
        },
        g = ($) => {
          (h.value = $), n("region_id");
        },
        n = ($) => {
          h.value && (V[$] = "");
        },
        j = async () => {
          let $ = null;
          p.value.forEach((y) => {
            if (y.name === h.value) {
              ($ = y.id),
                console.log(h.value, y.name === h.value, y.id),
                console.log($);
              return;
            }
          });
          const L = [];
          for (const y in w)
            if (w[y] === 1) {
              const m = parseInt(y.replace("trade", ""));
              L.push(m);
            }
          if (!$) {
            V.region_id = "Region is Required";
            return;
          }
          const z = { region_id: $, trades: L };
          (R.value = !0), (u.value = !0);
          try {
            const y = await axios.patch(
              "/api/contractor/region-trades",
              z,
              ce()
            );
            if (y.data) {
              le(y.data.message || "Region and Trades successfully saved");
              for (const m in w) _[m] = w[m];
              (t.value = h.value), W.value.closeDialog();
            }
          } catch {
            Y();
          } finally {
            (R.value = !1), (u.value = !1);
          }
        },
        Q = () => {
          if (v.value) for (let $ in w) w[$] = 0;
          else for (let $ in w) w[$] = 1;
          v.value = !v.value;
        },
        ee = () => {
          k.value.openPostDialog();
        };
      return ($, L) => {
        const z = de("v-tooltip");
        return (
          c(),
          S(
            Z,
            null,
            [
              s("div", Ct, [
                e(
                  he,
                  {
                    class: "mb-2",
                    style: me({
                      marginBottom: "8px",
                      fontWeight: 800,
                      fontSize: a.screenWidth > 640 ? "24px" : "20px",
                    }),
                    heading: i.value && i.value.trade_groups,
                  },
                  null,
                  8,
                  ["style", "heading"]
                ),
                s("div", Vt, [
                  e(
                    z,
                    {
                      text: i.value && i.value.see_user_posts,
                      location: "left",
                    },
                    {
                      activator: B(({ props: y }) => [
                        s(
                          "div",
                          {
                            onClick: ee,
                            class:
                              "active:scale-95 hover:bg-[#f8f9fa] hover:rounded-md",
                          },
                          [
                            s("button", It, [
                              s(
                                "img",
                                ke({ src: "/images/icons/post_b.png" }, y, {
                                  width: "28",
                                  height: "28",
                                }),
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
                  e(ie, { onClick: f, icon: "nimbus:edit", color: "#1864ab" }),
                ]),
              ]),
              s("div", Dt, [
                (c(!0),
                S(
                  Z,
                  null,
                  pe(
                    M(Pe),
                    (y, m) => (
                      c(),
                      S(
                        Z,
                        { key: y.name },
                        [
                          _[y.id] === 1
                            ? (c(),
                              q(
                                ft,
                                {
                                  key: 0,
                                  class: "my-1 mx-1 space-x-1 flex",
                                  style: me({
                                    backgroundColor:
                                      m % 2 === 0 ? "#5f3dc4" : "#364fc7",
                                    fontSize: "10px",
                                    paddingTop: "6px",
                                    paddingBottom: "6px",
                                  }),
                                },
                                { default: B(() => [_e(A(y.name), 1)]), _: 2 },
                                1032,
                                ["style"]
                              ))
                            : I("", !0),
                        ],
                        64
                      )
                    )
                  ),
                  128
                )),
              ]),
              t.value
                ? (c(),
                  S("div", Wt, [
                    s("div", Rt, [
                      e(
                        z,
                        { text: i.value && i.value.region, location: "top" },
                        {
                          activator: B(({ props: y }) => [
                            e(
                              M(J),
                              ke(y, {
                                class: "w-6 h-6 sm:w-8 sm:h-8",
                                icon: "mdi:location",
                                color: "#241e6d",
                              }),
                              null,
                              16
                            ),
                          ]),
                          _: 1,
                        },
                        8,
                        ["text"]
                      ),
                      s("div", Et, A(i.value && i.value.region) + " : ", 1),
                      s("div", Lt, A(t.value), 1),
                    ]),
                  ]))
                : I("", !0),
              e(
                ae,
                {
                  submitText: i.value && i.value.save,
                  onSubmit: j,
                  loading: R.value,
                  disabled: u.value,
                  ref_key: "editDialogRef",
                  ref: W,
                  title:
                    i.value && i.value.edit_your_trades_and_region_information,
                },
                {
                  default: B(() => [
                    e(
                      Ae,
                      { loading: b.value, background: "", height: "60vh" },
                      null,
                      8,
                      ["loading"]
                    ),
                    p.value
                      ? (c(),
                        S("div", zt, [
                          e(
                            O,
                            {
                              class: "font-bold mb-1",
                              value: i.value && i.value.region,
                            },
                            null,
                            8,
                            ["value"]
                          ),
                          e(
                            Ce,
                            {
                              options: r.value,
                              modelValue: h.value,
                              "onUpdate:modelValue": g,
                            },
                            null,
                            8,
                            ["options", "modelValue"]
                          ),
                          e(
                            K,
                            { class: "mt-2", message: V.region_id },
                            null,
                            8,
                            ["message"]
                          ),
                        ]))
                      : I("", !0),
                    s("div", jt, [
                      e(
                        O,
                        {
                          class: "font-bold mb-3",
                          value: i.value && i.value.trades,
                        },
                        null,
                        8,
                        ["value"]
                      ),
                      d.value !== 1
                        ? (c(),
                          S("div", Pt, [
                            s("div", { class: "switch-trades", onClick: Q }, [
                              s(
                                "div",
                                {
                                  class: X([
                                    v.value
                                      ? "switch-bg-on-trades"
                                      : "switch-bg-off-trades",
                                  ]),
                                },
                                [
                                  s(
                                    "div",
                                    {
                                      class: X([
                                        v.value
                                          ? "switch-knob-on-trades"
                                          : "switch-knob-off-trades",
                                      ]),
                                    },
                                    null,
                                    2
                                  ),
                                ],
                                2
                              ),
                            ]),
                            s("label", Ut, A(i.value && i.value.select_all), 1),
                          ]))
                        : I("", !0),
                      s("div", At, [
                        (c(!0),
                        S(
                          Z,
                          null,
                          pe(
                            M(Pe),
                            (y, m) => (
                              c(),
                              S(
                                "div",
                                {
                                  key: m,
                                  class: "flex items-center justify-between",
                                },
                                [
                                  s(
                                    "label",
                                    {
                                      for: y.id,
                                      class: "mr-2 text-xs font-bold",
                                    },
                                    A(y.name),
                                    9,
                                    Ft
                                  ),
                                  s(
                                    "div",
                                    {
                                      class: "switch-post",
                                      onClick: (T) => E(y.id),
                                    },
                                    [
                                      s(
                                        "div",
                                        {
                                          class: X([
                                            w[y.id]
                                              ? "switch-bg-on-post"
                                              : "switch-bg-off-post",
                                          ]),
                                        },
                                        [
                                          s(
                                            "div",
                                            {
                                              class: X([
                                                w[y.id]
                                                  ? "switch-knob-on-post"
                                                  : "switch-knob-off-post",
                                              ]),
                                            },
                                            null,
                                            2
                                          ),
                                        ],
                                        2
                                      ),
                                    ],
                                    8,
                                    Mt
                                  ),
                                ]
                              )
                            )
                          ),
                          128
                        )),
                      ]),
                    ]),
                  ]),
                  _: 1,
                },
                8,
                ["submitText", "loading", "disabled", "title"]
              ),
              e(
                ut,
                {
                  ref_key: "postDialogRef",
                  ref: k,
                  contractorId: a.profile.user_id,
                },
                null,
                8,
                ["contractorId"]
              ),
            ],
            64
          )
        );
      };
    },
  },
  qt = be(Bt, [["__scopeId", "data-v-9c9b556e"]]),
  Ot = { class: "relative grid items-center" },
  Nt = { class: "text-md font-bold text-gray-600 block" },
  Ht = ["onClick"],
  Gt = {
    __name: "TemplateSelect",
    props: {
      options: { type: Array, required: !0 },
      modelValue: { type: String, default: "" },
      label: { type: String, default: "" },
    },
    emits: ["update:modelValue"],
    setup(a, { emit: l }) {
      const C = o(!1),
        r = o(null),
        t = o(null),
        h = o(""),
        W = () => {
          C.value = !C.value;
        },
        R = (u) => {
          l("update:modelValue", u), (C.value = !1);
        },
        k = (u) => {
          r.value &&
            !(r.value === u.target || r.value.contains(u.target)) &&
            (C.value = !1);
        };
      return (
        ge(() => {
          document.addEventListener("mousedown", k);
        }),
        Te(() => {
          document.removeEventListener("mousedown", k);
        }),
        xe(() => {
          if (C.value && r.value && t.value) {
            const u = r.value.getBoundingClientRect(),
              V = t.value.clientHeight;
            u.bottom + V > window.innerHeight && u.top > V
              ? (h.value = "dropdown-above")
              : (h.value = "dropdown-below");
          }
        }),
        (u, V) => (
          c(),
          S("div", Ot, [
            s("label", Nt, A(a.label), 1),
            s(
              "div",
              {
                ref_key: "dropdownContainer",
                ref: r,
                class:
                  "relative w-auto border border-gray-300 rounded-md cursor-pointer p-2 pr-8",
                onClick: W,
              },
              [
                _e(
                  A(
                    a.modelValue ||
                      (u.translations && u.translations.select_any_option)
                  ) + " ",
                  1
                ),
                e(M(J), {
                  icon: "gridicons:dropdown",
                  class:
                    "absolute top-1/2 transform -translate-y-1/2 right-2 text-gray-500",
                }),
                C.value
                  ? (c(),
                    S(
                      "ul",
                      {
                        key: 0,
                        ref_key: "dropdownMenu",
                        ref: t,
                        class: X([
                          h.value,
                          "absolute left-0 w-full mt-2 border border-gray-300 rounded-md bg-white shadow-lg z-10 p-0",
                        ]),
                      },
                      [
                        (c(!0),
                        S(
                          Z,
                          null,
                          pe(
                            a.options,
                            (v) => (
                              c(),
                              S(
                                "li",
                                {
                                  key: v.id,
                                  class: X([
                                    "p-2 cursor-pointer",
                                    v.name === a.modelValue
                                      ? "bg-[#364fc7] text-white"
                                      : "",
                                    "hover:bg-[#364fc7] hover:text-white",
                                  ]),
                                  onClick: Fe((_) => R(v), ["stop"]),
                                },
                                A(v.name),
                                11,
                                Ht
                              )
                            )
                          ),
                          128
                        )),
                      ],
                      2
                    ))
                  : I("", !0),
              ],
              512
            ),
          ])
        )
      );
    },
  },
  Xt = be(Gt, [["__scopeId", "data-v-b68561aa"]]),
  Kt = { class: "relative grid items-center" },
  Jt = ["onClick"],
  Yt = { class: "" },
  Zt = { class: "flex gap-2" },
  Qt = {
    __name: "ColorSelect",
    props: {
      options: { type: Array, required: !0 },
      modelValue: { type: [Object, String], default: "" },
    },
    emits: ["update:modelValue"],
    setup(a, { emit: l }) {
      const C = o(!1),
        r = o(null),
        t = o(null),
        h = o(""),
        W = () => {
          C.value = !C.value;
        },
        R = (V) => {
          let v = {};
          for (const [_, w] of Object.entries(V))
            _.startsWith("color") && (v[_] = w);
          return v;
        },
        k = (V) => {
          l("update:modelValue", V), (C.value = !1);
        },
        u = (V) => {
          r.value &&
            !(r.value === V.target || r.value.contains(V.target)) &&
            (C.value = !1);
        };
      return (
        ge(() => {
          document.addEventListener("mousedown", u);
        }),
        Te(() => {
          document.removeEventListener("mousedown", u);
        }),
        xe(() => {
          if (C.value && r.value && t.value) {
            const V = r.value.getBoundingClientRect(),
              v = t.value.clientHeight;
            V.bottom + v > window.innerHeight && V.top > v
              ? (h.value = "dropdown-above")
              : (h.value = "dropdown-below");
          }
        }),
        (V, v) => (
          c(),
          S("div", Kt, [
            s(
              "div",
              {
                ref_key: "dropdownContainer",
                ref: r,
                class:
                  "relative w-auto border border-gray-300 rounded-md cursor-pointer p-2 pr-8",
                onClick: W,
              },
              [
                _e(
                  A(
                    a.modelValue ||
                      (V.translations && V.translations.select_any_option)
                  ) + " ",
                  1
                ),
                e(M(J), {
                  icon: "gridicons:dropdown",
                  class:
                    "absolute top-1/2 transform -translate-y-1/2 right-2 text-gray-500",
                }),
                C.value
                  ? (c(),
                    S(
                      "ul",
                      {
                        key: 0,
                        ref_key: "dropdownMenu",
                        ref: t,
                        class: X([
                          ["dropdown-menu", h.value],
                          "absolute left-0 pl-0 w-full mt-2 border border-gray-300 rounded-md bg-white shadow-lg z-10",
                        ]),
                      },
                      [
                        (c(!0),
                        S(
                          Z,
                          null,
                          pe(
                            a.options,
                            (_) => (
                              c(),
                              S(
                                "li",
                                {
                                  key: _,
                                  class: X([
                                    "p-2 cursor-pointer  flex gap-2 justify-between items-center",
                                    _.name === a.modelValue
                                      ? "bg-[#364fc7] text-white"
                                      : "",
                                    "hover:bg-[#364fc7] hover:text-white",
                                  ]),
                                  onClick: Fe((w) => k(_), ["stop"]),
                                },
                                [
                                  s("div", Yt, A(_.name), 1),
                                  s("div", Zt, [
                                    (c(!0),
                                    S(
                                      Z,
                                      null,
                                      pe(
                                        R(_),
                                        (w, b) => (
                                          c(),
                                          S(
                                            "div",
                                            {
                                              key: b,
                                              style: me({ backgroundColor: w }),
                                              class:
                                                "w-8 h-8 rounded-full border-2 border-[#eee]",
                                            },
                                            null,
                                            4
                                          )
                                        )
                                      ),
                                      128
                                    )),
                                  ]),
                                ],
                                10,
                                Jt
                              )
                            )
                          ),
                          128
                        )),
                      ],
                      2
                    ))
                  : I("", !0),
              ],
              512
            ),
          ])
        )
      );
    },
  },
  el = be(Qt, [["__scopeId", "data-v-1cff908f"]]),
  tl = { class: "flex justify-between" },
  ll = {
    class:
      "bg-white px-4 py-1 uppercase text-xs hover:bg-[#f8f9fa] sm:text-sm font-bold rounded-full border-[#1864ab] border-2 sm:border-[3px] bg-white text-[#1864ab] cursor-pointer hover:shadow-lg active:scale-95",
  },
  al = {
    class: "mt-6 space-y-6 sm:space-y-0 w-full sm:grid sm:grid-cols-2 sm:gap-4",
  },
  ol = {
    __name: "Templates",
    props: { templateList: Array, profile: Object, screenWidth: Number },
    setup(a) {
      const l = a,
        C = oe(),
        r = ne({
          selectedTemplate:
            l.templateList && l.templateList.length > 0
              ? l.templateList.find((k) => l.profile.template_id === k.id).name
              : "",
          selectedColorScheme: "",
        }),
        t = N(() => C.state.contractor.colorSchemeList),
        h = N(() => C.getters.translations);
      Se(l.templateList, () => {
        l.profile &&
          l.templateList.value.length > 0 &&
          (r.selectedTemplate = l.templateList.value.find(
            (k) => l.profile.template_id === k.id
          ).name);
      }),
        Se(t, () => {
          l.profile &&
            t.value.length > 0 &&
            (r.selectedColorScheme = t.value.find(
              (k) => l.profile.color_scheme_id === k.id
            ).name);
        });
      const W = (k) => {
          console.log(k, "value"),
            (r.selectedTemplate = k.name),
            C.dispatch("contractor/updatedSelctedTemplate", k.id);
        },
        R = (k) => {
          console.log(k), (r.selectedColorScheme = k.name);
          const u = Me(k);
          console.log(u),
            C.dispatch("contractor/updatedSelectedColorScheme", k.id),
            C.commit("contractor/setSelectedColorScheme", u),
            console.log(k, "value");
        };
      return (
        ge(() => {
          console.log("watch called", t),
            l.profile &&
              t.value.length > 0 &&
              (r.selectedColorScheme = t.value.find(
                (k) => l.profile.color_scheme_id === k.id
              ).name);
        }),
        (k, u) => (
          c(),
          q(
            fe,
            {
              shadowLevel: 2,
              bgColor: "white",
              padding: a.screenWidth < 640 ? "7px" : "20px",
            },
            {
              default: B(() => [
                s("div", tl, [
                  e(
                    he,
                    {
                      class: "mb-2",
                      style: me({
                        marginBottom: "8px",
                        fontWeight: 800,
                        fontSize: a.screenWidth > 640 ? "24px" : "20px",
                      }),
                      heading: "Template",
                    },
                    null,
                    8,
                    ["style"]
                  ),
                  e(
                    M(lt),
                    {
                      class: "rounded-full",
                      href: `/contractor/${a.profile.user_id}`,
                    },
                    {
                      default: B(() => [
                        s("button", ll, A(h.value && h.value.see_live_view), 1),
                      ]),
                      _: 1,
                    },
                    8,
                    ["href"]
                  ),
                ]),
                s("div", al, [
                  s("div", null, [
                    e(O, {
                      class: "font-bold mb-1",
                      for: "state",
                      value: "Template",
                    }),
                    e(
                      Xt,
                      {
                        options: a.templateList,
                        modelValue: r.selectedTemplate,
                        "onUpdate:modelValue": W,
                      },
                      null,
                      8,
                      ["options", "modelValue"]
                    ),
                  ]),
                  s("div", null, [
                    e(
                      O,
                      {
                        class: "font-bold mb-1",
                        for: "state",
                        value: h.value && h.value.color_scheme,
                      },
                      null,
                      8,
                      ["value"]
                    ),
                    e(
                      el,
                      {
                        options: t.value,
                        modelValue: r.selectedColorScheme,
                        "onUpdate:modelValue": R,
                      },
                      null,
                      8,
                      ["options", "modelValue"]
                    ),
                  ]),
                ]),
              ]),
              _: 1,
            },
            8,
            ["padding"]
          )
        )
      );
    },
  },
  sl = { key: 0, class: "flex items-center w-full xs:w-1/2 gap-2 xs:gap-4" },
  nl = ["src"],
  il = {
    __name: "InfoWithIcon",
    props: {
      icon: { type: String, required: !1 },
      imgPath: { type: String, required: !1 },
      iconColor: { type: String, default: "#241e6d" },
      iconClasses: { type: String, default: "" },
      imgClasses: { type: String, default: "" },
      textClasses: { type: String, default: "" },
      tooltipText: { type: String, required: !0 },
      text: { type: [String, Number, null], required: !0 },
    },
    setup(a) {
      return (l, C) => {
        const r = de("v-tooltip");
        return a.text
          ? (c(),
            S("div", sl, [
              e(
                r,
                { text: a.tooltipText, location: "top" },
                {
                  activator: B(({ props: t }) => [
                    a.icon
                      ? (c(),
                        q(
                          M(J),
                          ke({ key: 0 }, t, {
                            icon: a.icon,
                            color: a.iconColor,
                            class: `${a.iconClasses}`,
                          }),
                          null,
                          16,
                          ["icon", "color", "class"]
                        ))
                      : a.imgPath
                      ? (c(),
                        S(
                          "img",
                          {
                            key: 1,
                            src: a.imgPath,
                            class: X(`${a.imgClasses}`),
                          },
                          null,
                          10,
                          nl
                        ))
                      : I("", !0),
                  ]),
                  _: 1,
                },
                8,
                ["text"]
              ),
              s("div", { class: X(` ${a.textClasses}`) }, A(a.text), 3),
            ]))
          : I("", !0);
      };
    },
  },
  te = be(il, [["__scopeId", "data-v-0b1ff9a0"]]),
  rl = { class: "flex justify-between" },
  cl = {
    class:
      "flex flex-col sm:flex-row flex-wrap gap-y-3 mt-2 sm:mt-4 ml-1 mb-1 sm:mb-0 sm:ml-0",
  },
  ul = {
    class: "mt-6 space-y-6 sm:space-y-0 w-full sm:grid sm:grid-cols-2 sm:gap-4",
  },
  dl = {
    __name: "SocialLinksSectionEdit",
    props: { profile: Object, screenWidth: Number },
    setup(a) {
      var g, n, j, Q, ee;
      const l = a,
        C = ["website_url", "facebook", "twitter", "tiktok", "instagram"],
        r = o(),
        t = o(l.profile.website_url),
        h = o(l.profile.facebook),
        W = o(l.profile.twitter),
        R = o(l.profile.tiktok),
        k = o(l.profile.instagram),
        u = o(!1),
        V = o(!1),
        v = ne({
          website_url: "",
          facebook: "",
          twitter: "",
          tiktok: "",
          instagram: "",
        }),
        _ = ne({
          website_url: (g = t.value) != null ? g : "",
          facebook: (n = h.value) != null ? n : "",
          twitter: (j = W.value) != null ? j : "",
          tiktok: (Q = R.value) != null ? Q : "",
          instagram: (ee = k.value) != null ? ee : "",
        }),
        w = oe(),
        b = N(() => w.getters.translations),
        p = () => {
          let U = !0;
          for (let $ in v) v[$] = "";
          return (
            _.website_url &&
              !i(_.website_url) &&
              ((v.website_url = "Invalid website URL"), (U = !1)),
            _.facebook &&
              !i(_.facebook) &&
              ((v.facebook = "Invalid Facebook URL"), (U = !1)),
            _.twitter &&
              !i(_.twitter) &&
              ((v.twitter = "Invalid Twitter URL"), (U = !1)),
            _.tiktok &&
              !i(_.tiktok) &&
              ((v.tiktok = "Invalid TikTok URL"), (U = !1)),
            _.instagram &&
              !i(_.instagram) &&
              ((v.instagram = "Invalid Instagram URL"), (U = !1)),
            U
          );
        },
        i = (U) => {
          var $ = new RegExp(
            "^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,6}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$",
            "i"
          );
          return !!$.test(U);
        },
        d = (U) => {
          _[U].trim() && (v[U] = "");
        },
        E = async () => {
          if (p()) {
            C.forEach((U) => {
              _[U] &&
                typeof _[U] == "string" &&
                (_[U] = _[U].replace(/^https?:\/\//, ""));
            }),
              (u.value = !0),
              (V.value = !0);
            try {
              const U = await axios.patch(
                "/api/contractor/social-links",
                _,
                ce()
              );
              U.data &&
                (le(U.data.message || "Social profiles successfully saved"),
                (t.value = _.website_url),
                (h.value = _.facebook),
                (W.value = _.twitter),
                (R.value = _.tiktok),
                (k.value = _.instagram),
                r.value.closeDialog());
            } catch {
              Y();
            } finally {
              (u.value = !1), (V.value = !1);
            }
          }
        },
        f = () => {
          r.value.openDialog();
        };
      return (U, $) => (
        c(),
        S(
          Z,
          null,
          [
            e(
              fe,
              {
                shadowLevel: 2,
                bgColor: "white",
                padding: a.screenWidth < 640 ? "7px" : "20px",
              },
              {
                default: B(() => [
                  s("div", rl, [
                    e(
                      he,
                      {
                        class: "mb-2",
                        style: me({
                          fontWeight: 800,
                          marginBottom: "8px",
                          fontSize: a.screenWidth > 640 ? "24px" : "20px",
                        }),
                        heading: b.value && b.value.social_links,
                      },
                      null,
                      8,
                      ["style", "heading"]
                    ),
                    e(ie, {
                      onClick: f,
                      icon: "nimbus:edit",
                      color: "#1864ab",
                    }),
                  ]),
                  s("div", cl, [
                    t.value
                      ? (c(),
                        q(
                          te,
                          {
                            key: 0,
                            icon: "fluent-mdl2:website",
                            iconClasses: "w-6 h-6",
                            textClasses: "text-md",
                            tooltipText: "Website",
                            text: t.value,
                          },
                          null,
                          8,
                          ["text"]
                        ))
                      : I("", !0),
                    h.value
                      ? (c(),
                        q(
                          te,
                          {
                            key: 1,
                            icon: "logos:facebook",
                            iconClasses: "w-6 h-6",
                            textClasses: "text-md",
                            tooltipText: "Facebook",
                            text: h.value,
                          },
                          null,
                          8,
                          ["text"]
                        ))
                      : I("", !0),
                    W.value
                      ? (c(),
                        q(
                          te,
                          {
                            key: 2,
                            icon: "fa6-brands:square-x-twitter",
                            iconColor: "black",
                            iconClasses: "w-6 h-6",
                            textClasses: "text-md",
                            tooltipText: "Twitter",
                            text: W.value,
                          },
                          null,
                          8,
                          ["text"]
                        ))
                      : I("", !0),
                    R.value
                      ? (c(),
                        q(
                          te,
                          {
                            key: 3,
                            icon: "logos:tiktok-icon",
                            iconClasses: "w-6 h-6",
                            textClasses: "text-md",
                            tooltipText: "TikTok",
                            text: R.value,
                          },
                          null,
                          8,
                          ["text"]
                        ))
                      : I("", !0),
                    k.value
                      ? (c(),
                        q(
                          te,
                          {
                            key: 4,
                            icon: "skill-icons:instagram",
                            iconClasses: "w-6 h-6",
                            textClasses: "text-md",
                            tooltipText: "Instagram",
                            text: k.value,
                          },
                          null,
                          8,
                          ["text"]
                        ))
                      : I("", !0),
                    s(
                      "div",
                      {
                        class: X(
                          `flex justify-center gap-2 w-full ${
                            t.value || h.value || W.value || R.value || k.value
                              ? "mt-3"
                              : ""
                          }`
                        ),
                      },
                      [
                        t.value
                          ? I("", !0)
                          : (c(),
                            q(M(J), {
                              key: 0,
                              icon: "fluent-mdl2:website",
                              class: X("w-8 h-8"),
                            })),
                        h.value
                          ? I("", !0)
                          : (c(),
                            q(M(J), {
                              key: 1,
                              icon: "logos:facebook",
                              class: X("w-8 h-8"),
                            })),
                        W.value
                          ? I("", !0)
                          : (c(),
                            q(M(J), {
                              key: 2,
                              icon: "fa6-brands:square-x-twitter",
                              class: X("w-8 h-8"),
                            })),
                        R.value
                          ? I("", !0)
                          : (c(),
                            q(M(J), {
                              key: 3,
                              icon: "logos:tiktok-icon",
                              class: X("w-8 h-8"),
                            })),
                        k.value
                          ? I("", !0)
                          : (c(),
                            q(M(J), {
                              key: 4,
                              icon: "skill-icons:instagram",
                              class: X("w-8 h-8"),
                            })),
                      ],
                      2
                    ),
                  ]),
                ]),
                _: 1,
              },
              8,
              ["padding"]
            ),
            e(
              ae,
              {
                submitText: b.value && b.value.save,
                onSubmit: E,
                loading: u.value,
                disabled: V.value,
                ref_key: "dialogRef",
                ref: r,
                title: `${
                  !t.value && !h.value && !W.value && !R.value && !k.value
                    ? b.value && b.value.add
                    : b.value && b.value.edit
                } ${b.value && b.value.your} ${
                  b.value && b.value.social_links
                } `,
              },
              {
                default: B(() => [
                  s("div", ul, [
                    s("div", null, [
                      e(
                        O,
                        {
                          class: "font-bold",
                          for: "website_url",
                          value: b.value && b.value.personal_company_website,
                        },
                        null,
                        8,
                        ["value"]
                      ),
                      e(
                        ye,
                        {
                          id: "website_url",
                          type: "url",
                          icon: "fluent-mdl2:website",
                          color: "#241e6d",
                          onInput: $[0] || ($[0] = (L) => d("website_url")),
                          modelValue: _.website_url,
                          "onUpdate:modelValue":
                            $[1] || ($[1] = (L) => (_.website_url = L)),
                          placeholder: b.value && b.value.type_your_website_url,
                        },
                        null,
                        8,
                        ["modelValue", "placeholder"]
                      ),
                      e(K, { class: "mt-2", message: v.website_url }, null, 8, [
                        "message",
                      ]),
                    ]),
                    s("div", null, [
                      e(O, {
                        class: "font-bold",
                        for: "facebook",
                        value: "Facebook",
                      }),
                      e(
                        ye,
                        {
                          id: "facebook",
                          type: "url",
                          icon: "logos:facebook",
                          onInput: $[2] || ($[2] = (L) => d("facebook")),
                          modelValue: _.facebook,
                          "onUpdate:modelValue":
                            $[3] || ($[3] = (L) => (_.facebook = L)),
                          placeholder: "Type your Facebook link",
                        },
                        null,
                        8,
                        ["modelValue"]
                      ),
                      e(K, { class: "mt-2", message: v.facebook }, null, 8, [
                        "message",
                      ]),
                    ]),
                    s("div", null, [
                      e(O, {
                        class: "font-bold",
                        for: "twitter",
                        value: "Twitter",
                      }),
                      e(
                        ye,
                        {
                          id: "twitter",
                          color: "black",
                          type: "url",
                          icon: "fa6-brands:square-x-twitter",
                          class: "mt-1 block w-full",
                          modelValue: _.twitter,
                          "onUpdate:modelValue":
                            $[4] || ($[4] = (L) => (_.twitter = L)),
                          onInput: $[5] || ($[5] = (L) => d("twitter")),
                          placeholder: "Type your Twitter link",
                        },
                        null,
                        8,
                        ["modelValue"]
                      ),
                      e(K, { class: "mt-2", message: v.twitter }, null, 8, [
                        "message",
                      ]),
                    ]),
                    s("div", null, [
                      e(O, {
                        class: "font-bold",
                        for: "tiktok",
                        value: "TikTok",
                      }),
                      e(
                        ye,
                        {
                          id: "tiktok",
                          type: "url",
                          class: "mt-1 block w-full",
                          icon: "logos:tiktok-icon",
                          modelValue: _.tiktok,
                          "onUpdate:modelValue":
                            $[6] || ($[6] = (L) => (_.tiktok = L)),
                          onInput: $[7] || ($[7] = (L) => d("tiktok")),
                          placeholder: "Type your TikTok link",
                        },
                        null,
                        8,
                        ["modelValue"]
                      ),
                      e(K, { class: "mt-2", message: v.tiktok }, null, 8, [
                        "message",
                      ]),
                    ]),
                    s("div", null, [
                      e(O, {
                        class: "font-bold",
                        for: "instagram",
                        value: "Instagram",
                      }),
                      e(
                        ye,
                        {
                          id: "instagram",
                          type: "url",
                          icon: "skill-icons:instagram",
                          class: "mt-1 block w-full",
                          onInput: $[8] || ($[8] = (L) => d("instagram")),
                          modelValue: _.instagram,
                          "onUpdate:modelValue":
                            $[9] || ($[9] = (L) => (_.instagram = L)),
                          placeholder: "Type your Instagram link",
                        },
                        null,
                        8,
                        ["modelValue"]
                      ),
                      e(K, { class: "mt-2", message: v.instagram }, null, 8, [
                        "message",
                      ]),
                    ]),
                  ]),
                ]),
                _: 1,
              },
              8,
              ["submitText", "loading", "disabled", "title"]
            ),
          ],
          64
        )
      );
    },
  },
  ml = { class: "flex justify-between" },
  vl = { class: "flex space-x-2 justify-between" },
  fl = { class: "flex justify-center items-center space-x-2" },
  pl = { class: "flex flex-col justify-center" },
  gl = {
    key: 0,
    class: "text-md xs:text-xl font-medium font-bold text-gray-900",
  },
  _l = { key: 1, class: "text-xs xs:text-lg" },
  hl = {
    class:
      "flex flex-col sm:flex-row flex-wrap gap-y-2 mt-2 sm:mt-4 ml-1 mb-1 sm:mb-0 sm:ml-0",
  },
  bl = { class: "flex justify-center" },
  yl = {
    class: "mt-6 space-y-6 sm:space-y-0 w-full sm:grid sm:grid-cols-2 sm:gap-4",
  },
  xl = {
    __name: "AdditionalInfoSectionEdit",
    props: { profile: Object, screenWidth: Number },
    setup(a) {
      var y, m, T, x, H, re, we, Ve, Ie, De;
      const l = a,
        C = "AIzaSyDFRU-q1alik7S8dAqi4XamhsYr9B_MSXU",
        r = o(l.profile.company_name),
        t = o(l.profile.company_logo),
        h = o(l.profile.phone_cell),
        W = o(l.profile.phone_office),
        R = o(l.profile.address_1),
        k = o(l.profile.address_2),
        u = o(l.profile.city),
        V = o(l.profile.state),
        v = o(!1),
        _ = o(l.profile.county),
        w = o(l.profile.zipcode),
        b = o(!1),
        p = o(!0),
        i = o(!1),
        d = ne({
          company_name: (y = r.value) != null ? y : "",
          company_logo: (m = t.value) != null ? m : "",
          phone_cell: (T = h.value) != null ? T : "",
          phone_office: (x = W.value) != null ? x : "",
          address_1: (H = R.value) != null ? H : "",
          address_2: (re = k.value) != null ? re : "",
          city: (we = u.value) != null ? we : "",
          state: (Ve = V.value) != null ? Ve : "",
          county: (Ie = _.value) != null ? Ie : "",
          zipcode: (De = w.value) != null ? De : "",
        }),
        E = ne({
          phone_cell: "",
          company_name: "",
          phone_office: "",
          address_1: "",
          city: "",
          state: "",
          zipcode: "",
          county: "",
        }),
        f = o(),
        g = oe(),
        n = N(() => g.getters.translations),
        j = () => {
          f.value.openDialog();
        },
        Q = () =>
          new Promise((P, D) => {
            if (
              window.google &&
              window.google.maps &&
              window.google.maps.places
            )
              P();
            else {
              const G = document.createElement("script");
              (G.src = `https://maps.googleapis.com/maps/api/js?key=${C}&libraries=places&callback=initMap`),
                (window.initMap = () => {
                  P();
                }),
                (G.onerror = (ve) => {
                  D(ve);
                }),
                document.head.appendChild(G);
            }
          });
      at(() => {
        window.initMap && delete window.initMap;
      }),
        ge(async () => {
          try {
            (p.value = !0), await Q(), (p.value = !1);
          } catch (P) {
            console.error("Failed to load Google Maps API", P);
          }
        });
      const ee = () => {
          var D, G, ve, F, We, Re, Ee, Le, ze, je;
          let P = !0;
          for (let et in E) E[et] = "";
          return (
            ((D = d.phone_cell) != null && D.trim()) ||
              ((E.phone_cell = n.value && n.value.phone_number_is_required),
              (P = !1)),
            ((G = d.phone_cell) == null ? void 0 : G.trim().length) > 13 &&
              ((E.phone_cell =
                n.value &&
                n.value.phone_number_must_not_be_greater_than_13_numbers),
              (P = !1)),
            ((ve = d.phone_office) == null ? void 0 : ve.trim().length) > 13 &&
              ((E.phone_office =
                n.value &&
                n.value.phone_office_must_not_be_greater_than_13_numbers),
              (P = !1)),
            ((F = d.address_1) != null && F.trim()) ||
              ((E.address_1 = n.value && n.value.address_1_is_required),
              (P = !1)),
            ((We = d.company_name) != null && We.trim()) ||
              ((E.company_name = n.value && n.value.company_name_is_required),
              (P = !1)),
            ((Re = d.city) != null && Re.trim()) ||
              ((E.city = n.value && n.value.city_is_required), (P = !1)),
            ((Ee = d.state) != null && Ee.trim()) ||
              ((E.state = n.value && n.value.state_is_required), (P = !1)),
            ((Le = d.zipcode) != null && Le.trim()) ||
              ((E.zipcode = n.value && n.value.zipcode_is_required), (P = !1)),
            ((ze = d.zipcode) != null && ze.trim()) ||
              ((E.zipcode = n.value && n.value.zipcode_is_required), (P = !1)),
            ((je = d.county) != null && je.trim()) ||
              ((E.county = n.value && n.value.county_is_required), (P = !1)),
            P
          );
        },
        U = async () => {
          if (ee()) {
            (b.value = !0), (i.value = !0);
            try {
              const P = await axios.patch(
                "/api/contractor/additional-information",
                d,
                ce()
              );
              P.data &&
                (le(
                  P.data.message || "Additional information successfully saved"
                ),
                (r.value = d.company_name),
                (t.value = d.company_logo),
                (h.value = d.phone_cell),
                (W.value = d.phone_office),
                (R.value = d.address_1),
                (k.value = d.address_2),
                (u.value = d.city),
                (V.value = d.state),
                (_.value = d.county),
                (w.value = d.zipcode),
                f.value.closeDialog());
            } catch {
              Y();
            } finally {
              (b.value = !1), (i.value = !1);
            }
          }
        },
        $ = async (P) => {
          v.value = !0;
          const D = new FormData();
          D.append("company_logo", P),
            axios
              .post("/api/contractor/company-logo", D, ue())
              .then((G) => {
                (t.value = G.data.company_logo), (v.value = !1);
              })
              .catch((G) => {
                (v.value = !1), Y("Error uploading avatar");
              });
        },
        L = (P) => {
          var D, G;
          if (
            (console.log("Clear errors", P),
            P === "phone_cell" || P === "phone_office")
          ) {
            ((D = d[P]) == null ? void 0 : D.trim().length) <= 13 &&
              (E[P] = "");
            return;
          }
          (G = d[P]) != null && G.trim() && (E[P] = "");
        },
        z = (P) => {
          console.log(P, "place");
          for (const D of P.address_components) {
            const G = D.types[0];
            G == "locality" && (d.city = D.long_name),
              G == "administrative_area_level_2" && (d.county = D.long_name),
              G == "administrative_area_level_1" && (d.state = D.long_name),
              G == "postal_code" && (d.zipcode = D.long_name);
          }
        };
      return (P, D) => {
        const G = de("v-skeleton-loader"),
          ve = ot("mask");
        return (
          c(),
          S(
            Z,
            null,
            [
              p.value
                ? I("", !0)
                : (c(),
                  q(
                    fe,
                    {
                      key: 0,
                      shadowLevel: 2,
                      bgColor: "white",
                      padding: a.screenWidth < 640 ? "7px" : "20px",
                    },
                    {
                      default: B(() => [
                        s("div", ml, [
                          e(
                            he,
                            {
                              class: "mb-2",
                              style: me({
                                marginBottom: "8px",
                                fontWeight: 800,
                                fontSize: a.screenWidth > 640 ? "24px" : "20px",
                              }),
                              heading: n.value && n.value.contact_info,
                            },
                            null,
                            8,
                            ["style", "heading"]
                          ),
                          e(ie, {
                            onClick: j,
                            icon: "nimbus:edit",
                            color: "#1864ab",
                          }),
                        ]),
                        s("div", vl, [
                          s("div", fl, [
                            s("div", null, [
                              v.value
                                ? (c(),
                                  q(G, {
                                    key: 0,
                                    style: { "border-radius": "9999px" },
                                    class:
                                      "overflow-hidden w-14 h-14 sm:h-20 sm:w-20",
                                    type: "image",
                                  }))
                                : I("", !0),
                              v.value
                                ? I("", !0)
                                : (c(),
                                  q(
                                    dt,
                                    {
                                      key: 1,
                                      imageClass: "companyLogo",
                                      imageSrc: `/${t.value}`,
                                    },
                                    null,
                                    8,
                                    ["imageSrc"]
                                  )),
                            ]),
                            s("div", pl, [
                              r.value
                                ? (c(), S("h2", gl, A(r.value), 1))
                                : I("", !0),
                              u.value || V.value
                                ? (c(),
                                  S("span", _l, A(u.value + " " + V.value), 1))
                                : I("", !0),
                            ]),
                          ]),
                        ]),
                        s("div", hl, [
                          e(
                            te,
                            {
                              icon: "ic:baseline-phone",
                              tooltipText: "Phone Cell",
                              text: h.value,
                            },
                            null,
                            8,
                            ["text"]
                          ),
                          e(
                            te,
                            {
                              icon: "wpf:phone-office",
                              tooltipText: "Phone Office",
                              text: W.value,
                            },
                            null,
                            8,
                            ["text"]
                          ),
                          e(
                            te,
                            {
                              icon: "entypo:address",
                              tooltipText: `${n.value && n.value.address} 1`,
                              text: R.value,
                            },
                            null,
                            8,
                            ["tooltipText", "text"]
                          ),
                          e(
                            te,
                            {
                              icon: "entypo:address",
                              tooltipText: `${n.value && n.value.address} 2`,
                              text: k.value,
                            },
                            null,
                            8,
                            ["tooltipText", "text"]
                          ),
                          e(
                            te,
                            {
                              icon: "mdi:city",
                              tooltipText: "City",
                              text: u.value,
                            },
                            null,
                            8,
                            ["text"]
                          ),
                          e(
                            te,
                            {
                              icon: "entypo:location",
                              tooltipText: "Province",
                              text: V.value,
                            },
                            null,
                            8,
                            ["text"]
                          ),
                          e(
                            te,
                            {
                              icon: "map:post-box",
                              tooltipText: "Postal Code",
                              text: w.value,
                            },
                            null,
                            8,
                            ["text"]
                          ),
                          e(
                            te,
                            {
                              icon: "tabler:location-filled",
                              tooltipText: "District",
                              text: _.value,
                            },
                            null,
                            8,
                            ["text"]
                          ),
                        ]),
                      ]),
                      _: 1,
                    },
                    8,
                    ["padding"]
                  )),
              e(
                ae,
                {
                  submitText: n.value && n.value.save,
                  onSubmit: U,
                  loading: b.value,
                  disabled: i.value,
                  ref_key: "dialogRef",
                  ref: f,
                  title: n.value && n.value.edit_your_contact_information,
                },
                {
                  default: B(() => [
                    s("div", bl, [
                      v.value
                        ? (c(),
                          q(G, {
                            key: 0,
                            style: { "border-radius": "9999px" },
                            class: "overflow-hidden w-36 h-36",
                            type: "image",
                          }))
                        : I("", !0),
                      v.value
                        ? I("", !0)
                        : (c(),
                          q(
                            Oe,
                            {
                              key: 1,
                              cover: !1,
                              rounded: !1,
                              imageSrc: `/${
                                t.value ? t.value : a.profile.user_avatar
                              }`,
                              onUpdateImage: $,
                            },
                            null,
                            8,
                            ["imageSrc"]
                          )),
                    ]),
                    s("div", yl, [
                      s("div", null, [
                        e(
                          O,
                          {
                            class: "font-bold",
                            for: "company_name",
                            value: n.value && n.value.company_name + "*",
                          },
                          null,
                          8,
                          ["value"]
                        ),
                        e(
                          se,
                          {
                            id: "company_name",
                            type: "text",
                            class: "mt-1 block w-full",
                            placeholder:
                              n.value && n.value.type_your_company_name,
                            onInput: D[0] || (D[0] = (F) => L("company_name")),
                            modelValue: d.company_name,
                            "onUpdate:modelValue":
                              D[1] || (D[1] = (F) => (d.company_name = F)),
                            required: "",
                            autocomplete: "company_name",
                          },
                          null,
                          8,
                          ["placeholder", "modelValue"]
                        ),
                        e(
                          K,
                          { class: "mt-2", message: E.company_name },
                          null,
                          8,
                          ["message"]
                        ),
                      ]),
                      s("div", null, [
                        e(
                          O,
                          {
                            class: "font-bold",
                            for: "phone_cell",
                            value: n.value && n.value.phone_cell + "*",
                          },
                          null,
                          8,
                          ["value"]
                        ),
                        $e(
                          e(
                            se,
                            {
                              id: "phone_cell",
                              type: "tel",
                              class: "mt-1 block w-full",
                              modelValue: d.phone_cell,
                              "onUpdate:modelValue":
                                D[2] || (D[2] = (F) => (d.phone_cell = F)),
                              placeholder:
                                n.value && n.value.type_your_phone_cell,
                              onInput: D[3] || (D[3] = (F) => L("phone_cell")),
                              autocomplete: "tel",
                            },
                            null,
                            8,
                            ["modelValue", "placeholder"]
                          ),
                          [[ve, "###-###-#####"]]
                        ),
                        e(
                          K,
                          { class: "mt-2", message: E.phone_cell },
                          null,
                          8,
                          ["message"]
                        ),
                      ]),
                      s("div", null, [
                        e(
                          O,
                          {
                            class: "font-bold",
                            for: "phone_office",
                            value: n.value && n.value.phone_office,
                          },
                          null,
                          8,
                          ["value"]
                        ),
                        $e(
                          e(
                            se,
                            {
                              id: "phone_office",
                              type: "tel",
                              class: "mt-1 block w-full",
                              onInput:
                                D[4] || (D[4] = (F) => L("phone_office")),
                              modelValue: d.phone_office,
                              "onUpdate:modelValue":
                                D[5] || (D[5] = (F) => (d.phone_office = F)),
                              placeholder:
                                n.value && n.value.type_your_phone_office,
                            },
                            null,
                            8,
                            ["modelValue", "placeholder"]
                          ),
                          [[ve, "###-###-#####"]]
                        ),
                        e(
                          K,
                          { class: "mt-2", message: E.phone_office },
                          null,
                          8,
                          ["message"]
                        ),
                      ]),
                      s("div", null, [
                        e(
                          O,
                          {
                            class: "font-bold",
                            for: "address_1",
                            value: `${n.value && n.value.address} 1*`,
                          },
                          null,
                          8,
                          ["value"]
                        ),
                        e(
                          Ue,
                          {
                            id: "address_1",
                            modelValue: d.address_1,
                            "onUpdate:modelValue":
                              D[6] || (D[6] = (F) => (d.address_1 = F)),
                            onInput: D[7] || (D[7] = (F) => L("address_1")),
                            onCallback: z,
                            class:
                              "mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
                            placeholder:
                              n.value && n.value.type_your_address + 1,
                          },
                          null,
                          8,
                          ["modelValue", "placeholder"]
                        ),
                        e(K, { class: "mt-2", message: E.address_1 }, null, 8, [
                          "message",
                        ]),
                      ]),
                      s("div", null, [
                        e(
                          O,
                          {
                            class: "font-bold",
                            for: "address_2",
                            value: `${n.value && n.value.address} 2*`,
                          },
                          null,
                          8,
                          ["value"]
                        ),
                        e(
                          Ue,
                          {
                            id: "address_2",
                            modelValue: d.address_2,
                            "onUpdate:modelValue":
                              D[8] || (D[8] = (F) => (d.address_2 = F)),
                            class:
                              "mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
                            placeholder:
                              n.value && n.value.type_your_address + 2,
                          },
                          null,
                          8,
                          ["modelValue", "placeholder"]
                        ),
                      ]),
                      s("div", null, [
                        e(
                          O,
                          {
                            class: "font-bold",
                            for: "city",
                            value: n.value && n.value.city + "*",
                          },
                          null,
                          8,
                          ["value"]
                        ),
                        e(
                          se,
                          {
                            id: "city",
                            type: "text",
                            class: "mt-1 block w-full",
                            onInput: D[9] || (D[9] = (F) => L("city")),
                            modelValue: d.city,
                            "onUpdate:modelValue":
                              D[10] || (D[10] = (F) => (d.city = F)),
                            placeholder: n.value && n.value.type_your_city,
                            autocomplete: "city",
                          },
                          null,
                          8,
                          ["modelValue", "placeholder"]
                        ),
                        e(K, { class: "mt-2", message: E.city }, null, 8, [
                          "message",
                        ]),
                      ]),
                      s("div", null, [
                        e(
                          O,
                          {
                            class: "font-bold mb-1",
                            for: "state",
                            value: n.value && n.value.state + "*",
                          },
                          null,
                          8,
                          ["value"]
                        ),
                        e(
                          Ce,
                          {
                            options: M(Ne),
                            modelValue: d.state,
                            "onUpdate:modelValue":
                              D[11] ||
                              (D[11] = (F) => {
                                (d.state = F), L("state");
                              }),
                          },
                          null,
                          8,
                          ["options", "modelValue"]
                        ),
                        e(K, { class: "mt-2", message: E.state }, null, 8, [
                          "message",
                        ]),
                      ]),
                      s("div", null, [
                        e(
                          O,
                          {
                            class: "font-bold",
                            for: "zipcode",
                            value: n.value && n.value.zip_code + "*",
                          },
                          null,
                          8,
                          ["value"]
                        ),
                        e(
                          se,
                          {
                            id: "zipcode",
                            type: "text",
                            class: "mt-1 block w-full",
                            onInput: D[12] || (D[12] = (F) => L("zipcode")),
                            modelValue: d.zipcode,
                            "onUpdate:modelValue":
                              D[13] || (D[13] = (F) => (d.zipcode = F)),
                            placeholder: n.value && n.value.type_your_zip_code,
                          },
                          null,
                          8,
                          ["modelValue", "placeholder"]
                        ),
                        e(K, { class: "mt-2", message: E.zipcode }, null, 8, [
                          "message",
                        ]),
                      ]),
                      s("div", null, [
                        e(
                          O,
                          {
                            class: "font-bold",
                            for: "county",
                            value: n.value && n.value.county + "*",
                          },
                          null,
                          8,
                          ["value"]
                        ),
                        e(
                          se,
                          {
                            id: "county",
                            type: "text",
                            onInput: D[14] || (D[14] = (F) => L("county")),
                            class: "mt-1 block w-full",
                            modelValue: d.county,
                            "onUpdate:modelValue":
                              D[15] || (D[15] = (F) => (d.county = F)),
                            placeholder: "Type your District",
                          },
                          null,
                          8,
                          ["modelValue"]
                        ),
                        e(K, { class: "mt-2", message: E.county }, null, 8, [
                          "message",
                        ]),
                      ]),
                    ]),
                  ]),
                  _: 1,
                },
                8,
                ["submitText", "loading", "disabled", "title"]
              ),
            ],
            64
          )
        );
      };
    },
  },
  wl = { class: "closing" },
  kl = {
    key: 0,
    class: X("flex gap-1 flex-col border-gray-300 border-2 p-3  rounded-lg"),
  },
  $l = { class: "flex justify-between" },
  Sl = { class: "flex text-blue-rgba items-center font-extrabold text-2xl" },
  Tl = ["innerHTML"],
  Cl = {
    __name: "ClosingTitleTextEdit",
    props: {
      screenWidth: { type: [String, Number] },
      closing_text: { type: String },
    },
    setup(a) {
      const l = a,
        C = (f) => {
          const g = document.createElement("textarea");
          return (g.innerHTML = f), g.value;
        },
        r = o(),
        t = o(C(l.closing_text)),
        h = o(t.value),
        W = o(!1),
        R = o(!1),
        k = o(!1),
        u = qe,
        V = o(h.value),
        v = o(st),
        _ = (f) => {
          f.ui
            .getEditableElement()
            .parentElement.insertBefore(
              f.ui.view.toolbar.element,
              f.ui.getEditableElement()
            );
        },
        w = oe(),
        b = N(() => w.getters.translations),
        p = N(() => {
          const g = new DOMParser().parseFromString(t.value, "text/html");
          return (
            g.querySelectorAll("a").forEach((n) => {
              const j = n.getAttribute("href");
              !j.startsWith("http://") &&
                !j.startsWith("https://") &&
                n.setAttribute("href", "http://" + j),
                (n.target = "_blank");
            }),
            g.body.innerHTML
          );
        }),
        i = () => {
          r.value.openDialog();
        },
        d = async () => {
          (k.value = !0), (W.value = !0), (R.value = !0), (h.value = V.value);
          try {
            (
              await axios.patch(
                "/api/contractor/bottom-closing-text",
                { closing_text: h.value },
                ce()
              )
            ).data &&
              (le("Closing Text successfully saved"),
              (t.value = h.value),
              r.value.closeDialog());
          } catch {
            Y();
          } finally {
            (W.value = !1), (R.value = !1);
          }
        },
        E = () => {
          console.log("here"), (k.value = !1);
        };
      return (f, g) => {
        const n = de("ckeditor");
        return (
          c(),
          S("div", wl, [
            p.value
              ? (c(),
                S("div", kl, [
                  s("div", $l, [
                    s("div", Sl, A(b.value && b.value.closing_text), 1),
                    e(ie, {
                      onClick: i,
                      icon: "nimbus:edit",
                      color: "#1864ab",
                    }),
                  ]),
                  s(
                    "div",
                    { class: "default ck-content", innerHTML: p.value },
                    null,
                    8,
                    Tl
                  ),
                ]))
              : I("", !0),
            p.value
              ? I("", !0)
              : (c(),
                S(
                  "button",
                  {
                    key: 1,
                    onClick: i,
                    class:
                      "w-full flex gap-2 items-center justify-center h-[42px] rounded bg-[#087f5b] text-white active:scale-[0.99] transition transform duration-300 hover:shadow-lg",
                  },
                  [
                    e(M(J), { icon: "mdi:plus-thick" }),
                    _e(" " + A(b.value && b.value.add_closing_text), 1),
                  ]
                )),
            e(
              ae,
              {
                submitText: b.value && b.value.save,
                loading: W.value,
                disabled: R.value,
                overflowAllowed: !0,
                onSubmit: d,
                onClosed: E,
                ref_key: "dialogRef",
                ref: r,
                title: b.value && b.value.add_closing_text,
              },
              {
                default: B(() => [
                  e(
                    n,
                    {
                      class: "default",
                      onReady: _,
                      editor: M(u),
                      modelValue: V.value,
                      "onUpdate:modelValue":
                        g[0] || (g[0] = (j) => (V.value = j)),
                      config: v.value,
                    },
                    null,
                    8,
                    ["editor", "modelValue", "config"]
                  ),
                ]),
                _: 1,
              },
              8,
              ["submitText", "loading", "disabled", "title"]
            ),
          ])
        );
      };
    },
  },
  Vl = { key: 0, class: "flex gap-4 flex-col" },
  Il = {
    class:
      "z-10 flex gap-2 justify-end items-end sm:absolute top-2 right-2 mb-2",
  },
  Dl = {
    class:
      "flex gap-4 relative flex-col justify-center items-center sm:flex-row",
  },
  Wl = {
    key: 0,
    class:
      "relative w-full flex justify-center object-cover sm:w-[280px] sm:h-[190px] md:w-[350px] md:h-[215px] rounded-md border-2 border-gray-300 bg-[#222]",
  },
  Rl = ["src"],
  El = { key: 0, class: "bg-[#222]" },
  Ll = ["src"],
  zl = { for: "text_section", class: "font-bold" },
  jl = ["rows", "placeholder"],
  Pl = { key: 1, class: "text-red-500 mt-2" },
  Ul = ["src"],
  Al = { class: "mb-4" },
  Fl = {
    class: "section_text-lg font-bold pl-6 section_text-gray-800 mt-3 mb-2",
  },
  Ml = {
    __name: "ImageTextSectionEdit",
    props: {
      screenWidth: { type: [String, Number] },
      image_sections: { type: Array },
      contractorId: { type: Number },
    },
    setup(a) {
      const l = a,
        C = He(Qe, Ze, Ye, Je, Ke, Xe, Ge),
        r = o(l.image_sections),
        t = o({ section_text: "", imageTitle: null, section_image: null }),
        h = o(),
        W = o(),
        R = o(!1),
        k = o(""),
        u = o(null),
        V = o(),
        v = o(null),
        _ = o(""),
        w = o(""),
        b = o(!1),
        p = o(!1),
        i = o([]),
        d = o(),
        E = oe(),
        f = N(() => E.getters.translations),
        g = N(
          () =>
            !(t.value.section_image instanceof File) && t.value.section_image
        );
      xe(() => {
        var m, T;
        t.value.section_image && (_.value = ""),
          (T = (m = t.value) == null ? void 0 : m.section_text) != null &&
            T.trim() &&
            (w.value = "");
      });
      const n = (m = null) => {
          if (m) {
            i.value.length > 0 && (i.value = []), (R.value = !0);
            const T = r.value.find((x) => x.id === m);
            T && ((t.value = { ...T }), (v.value = m));
          } else
            (R.value = !1),
              (t.value = {
                section_text: "",
                imageTitle: null,
                section_image: null,
              }),
              (v.value = null);
          h.value.openDialog();
        },
        j = (m) => {
          (u.value = m), W.value.openDialog();
        },
        Q = async () => {
          var m, T;
          if (
            !(
              (T =
                (m = t == null ? void 0 : t.value) == null
                  ? void 0
                  : m.section_text) != null && T.trim()
            ) &&
            !t.value.section_image
          ) {
            w.value = "Please enter the title text or  image!";
            return;
          }
          if (t.value.section_image || t.value.section_text) {
            (b.value = !0), (p.value = !0);
            const x = new FormData();
            if (v.value) {
              t.value.section_image &&
                t.value.section_image instanceof File &&
                x.append("section_image", t.value.section_image),
                x.append(
                  "section_text",
                  t.value.section_text ? t.value.section_text : ""
                );
              for (const [H, re] of x.entries())
                console.log(`${H}: ${re}`, "key value");
              try {
                const H = await axios.post(
                  `/api/contractor/image-section/${v.value}`,
                  x,
                  ue()
                );
                if (H.data) {
                  le(
                    H.data.message || "Title/Image section successfully saved"
                  );
                  const re = r.value.findIndex((we) => we.id === v.value);
                  re !== -1 &&
                    (r.value[re] = { id: v.value, ...H.data.imageSection });
                }
              } catch (H) {
                console.log(H), Y();
              }
            } else {
              t.value.section_image &&
                t.value.section_image instanceof File &&
                x.append("section_image", t.value.section_image),
                t.value.section_text &&
                  x.append("section_text", t.value.section_text);
              for (const [H, re] of x.entries())
                console.log(`${H}: ${re}`, "key value");
              try {
                const H = await axios.post(
                  `/api/contractor/${l.contractorId}/image-section`,
                  x,
                  ue()
                );
                H.data &&
                  (le(
                    H.data.message || "Title/Image section successfully saved"
                  ),
                  r.value.push({ id: Date.now(), ...H.data.imageSection }));
              } catch (H) {
                console.log(H), Y();
              }
            }
            (b.value = !1),
              (p.value = !1),
              (t.value = {
                section_text: "",
                imageTitle: null,
                section_image: null,
              }),
              (v.value = null);
          }
          i.value.length > 0 && (i.value = []), h.value.closeDialog();
        },
        ee = async () => {
          if (u.value !== null) {
            (b.value = !0), (p.value = !0);
            try {
              const m = await axios.delete(
                `/api/contractor/image-section/${u.value}`,
                ue()
              );
              if (m.data) {
                le(
                  m.data.message || "Title/Image section successfully deleted"
                );
                const T = r.value.findIndex((x) => x.id === u.value);
                T !== -1 && r.value.splice(T, 1), (u.value = null);
              }
            } catch (m) {
              console.log(m), Y();
            }
            (b.value = !1), (p.value = !1), W.value.closeDialog();
          }
        },
        U = (m) => {
          (k.value = m), V.value.openDialog();
        },
        $ = (m) => {
          d.value = m;
        },
        L = (m) => {
          (i.value = m.map((T) => T.file)),
            i.value[0] &&
              ((t.value.imageTitle = i.value[0].name),
              (t.value.section_image = i.value[0]));
        },
        z = () => {
          p.value = !0;
        },
        y = () => {
          p.value = !1;
        };
      return (m, T) => (
        c(),
        S(
          Z,
          null,
          [
            r.value && r.value.length > 0
              ? (c(),
                S("div", Vl, [
                  (c(!0),
                  S(
                    Z,
                    null,
                    pe(
                      r.value,
                      (x) => (
                        c(),
                        S(
                          "div",
                          {
                            key: x.id,
                            class:
                              "rounded-md border relative border-gray-300 p-2",
                          },
                          [
                            s("div", Il, [
                              e(
                                ie,
                                {
                                  onClick: () => n(x.id),
                                  icon: "nimbus:edit",
                                  color: "#1864ab",
                                  class: "bg-white",
                                },
                                null,
                                8,
                                ["onClick"]
                              ),
                              e(
                                ie,
                                {
                                  onClick: () => j(x.id),
                                  icon: "ic:baseline-delete",
                                  color: "#e03131",
                                  class: "bg-white",
                                },
                                null,
                                8,
                                ["onClick"]
                              ),
                            ]),
                            s("div", Dl, [
                              x.section_image
                                ? (c(),
                                  S("div", Wl, [
                                    s(
                                      "img",
                                      {
                                        src: x.section_image,
                                        alt: "Section Image",
                                        class: "object-cover h-full w-full",
                                      },
                                      null,
                                      8,
                                      Rl
                                    ),
                                    e(
                                      M(J),
                                      {
                                        icon: "fa-solid:expand",
                                        class:
                                          "absolute top-0 right-0 m-2 section_text-white cursor-pointer bg-[#555] p-1 rounded w-8 h-8",
                                        color: "white",
                                        onClick: (H) => U(x.section_image),
                                      },
                                      null,
                                      8,
                                      ["onClick"]
                                    ),
                                  ]))
                                : I("", !0),
                              x.section_text
                                ? (c(),
                                  S(
                                    "div",
                                    {
                                      key: 1,
                                      class: X(
                                        `flex-1 flex text-md sm:text-xl font-bold sm:items-center ${
                                          x.section_image
                                            ? ""
                                            : "sm:p-4 justify-center"
                                        }`
                                      ),
                                      style: { "word-break": "break-word" },
                                    },
                                    A(x.section_text),
                                    3
                                  ))
                                : I("", !0),
                            ]),
                          ]
                        )
                      )
                    ),
                    128
                  )),
                ]))
              : I("", !0),
            r.value.length < 30
              ? (c(),
                S(
                  "button",
                  {
                    key: 1,
                    onClick: T[0] || (T[0] = () => n()),
                    class:
                      "w-full flex gap-2 items-center justify-center h-[42px] rounded bg-[#087f5b] text-white active:scale-[0.99] transition transform duration-300 hover:shadow-lg",
                  },
                  [
                    e(M(J), { icon: "mdi:plus-thick" }),
                    _e(" " + A(f.value && f.value.add_title_image_section), 1),
                  ]
                ))
              : I("", !0),
            e(
              ae,
              {
                submitText: f.value && f.value.save,
                loading: b.value,
                disabled: p.value,
                onSubmit: Q,
                ref_key: "dialogRef",
                ref: h,
                title: `${
                  R.value ? f.value && f.value.edit : f.value && f.value.add
                } ${f.value && f.value.title_image_section}`,
              },
              {
                default: B(() => [
                  g.value
                    ? (c(),
                      S("div", El, [
                        s(
                          "img",
                          {
                            src: t.value.section_image,
                            alt: "Section Image",
                            onerror: "",
                            class: "object-cover h-40 mb-2 mx-auto",
                          },
                          null,
                          8,
                          Ll
                        ),
                      ]))
                    : I("", !0),
                  e(
                    M(C),
                    {
                      name: "section_image",
                      "accepted-file-types":
                        "image/jpeg, image/png, image/gif, image/webp",
                      files: i.value,
                      allowFileSizeValidation: "true",
                      maxFileSize: "5MB",
                      labelMaxTotalFileSizeExceeded: "Maximum Size Is 5MB",
                      allowImageResize: "true",
                      credits: "false",
                      imageResizeMode: "contain",
                      imageResizeTargetWidth: "1000",
                      imageResizeTargetHeight: "2000",
                      imageResizeUpscale: "true",
                      "allow-multiple": !1,
                      onInit: $,
                      onUpdatefiles: L,
                      onAddfilestart: z,
                      onAddfile: y,
                      onError: y,
                      labelIdle: `${f.value && f.value.drag_and_drop} ${
                        R.value ? f.value && f.value.to_replace : ""
                      } ${
                        f.value && f.value.your_image_or
                      } <span class='filepond--label-action'> ${
                        f.value && f.value.browse
                      } </span>`,
                    },
                    null,
                    8,
                    ["files", "labelIdle"]
                  ),
                  s(
                    "label",
                    zl,
                    A(f.value && f.value.title) +
                      "(" +
                      A(f.value && f.value.max) +
                      " 70char)",
                    1
                  ),
                  $e(
                    s(
                      "textarea",
                      {
                        "onUpdate:modelValue":
                          T[1] || (T[1] = (x) => (t.value.section_text = x)),
                        id: "text_section",
                        maxlength: "70",
                        type: "text",
                        rows: a.screenWidth > 760 ? 1 : 2,
                        class:
                          "mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
                        placeholder: f.value && f.value.type_your_description,
                      },
                      null,
                      8,
                      jl
                    ),
                    [[Be, t.value.section_text]]
                  ),
                  w.value ? (c(), S("div", Pl, A(w.value), 1)) : I("", !0),
                ]),
                _: 1,
              },
              8,
              ["submitText", "loading", "disabled", "title"]
            ),
            e(
              ae,
              {
                dialogWidth: "widthAuto",
                showFooter: !1,
                ref_key: "imageIncDialogRef",
                ref: V,
                title: f.value && f.value.your_image,
              },
              {
                default: B(() => [s("img", { src: k.value }, null, 8, Ul)]),
                _: 1,
              },
              8,
              ["title"]
            ),
            e(
              ae,
              {
                submitText: f.value && f.value.delete,
                onSubmit: ee,
                ref_key: "deleteDialogRef",
                ref: W,
                loading: b.value,
                disabled: p.value,
                errorIcon: "",
                dialogWidth: "max-h-[70vh] width50",
                title: f.value && f.value.are_you_sure,
              },
              {
                default: B(() => [
                  s("div", Al, [
                    s(
                      "div",
                      Fl,
                      A(f.value && f.value.do_you_want_to_delete_this_section),
                      1
                    ),
                  ]),
                ]),
                _: 1,
              },
              8,
              ["submitText", "loading", "disabled", "title"]
            ),
          ],
          64
        )
      );
    },
  },
  Bl = { key: 0, class: "flex gap-4 flex-col" },
  ql = {
    class:
      "z-10 flex gap-2 justify-end items-end sm:absolute top-2 right-2 mb-2",
  },
  Ol = {
    class:
      "flex gap-4 relative flex-col justify-center items-center sm:flex-row",
  },
  Nl = {
    key: 0,
    class:
      "relative w-full flex justify-center object-cover sm:w-[280px] sm:h-[190px] md:w-[350px] md:h-[215px] rounded-md border-2 border-gray-300 bg-[#222]",
  },
  Hl = ["src"],
  Gl = { key: 0, class: "bg-[#222]" },
  Xl = ["src"],
  Kl = { for: "text_section", class: "font-bold" },
  Jl = ["rows", "placeholder"],
  Yl = { key: 1, class: "text-red-500 mt-2" },
  Zl = ["src"],
  Ql = { class: "mb-4" },
  ea = {
    class: "section_text-lg font-bold pl-6 section_text-gray-800 mt-3 mb-2",
  },
  ta = {
    __name: "BragSectionEdit",
    props: {
      screenWidth: { type: [String, Number] },
      brag_sections: { type: Array },
      contractorId: { type: Number },
    },
    setup(a) {
      const l = a,
        C = He(Qe, Ze, Ye, Je, Ke, Xe, Ge),
        r = o(l.brag_sections),
        t = o({ section_text: "", imageTitle: null, section_image: null }),
        h = o(),
        W = o(),
        R = o(!1),
        k = o(""),
        u = o(null),
        V = o(),
        v = o(null),
        _ = o(""),
        w = o(""),
        b = o(!1),
        p = o(!1),
        i = o([]),
        d = o(),
        E = oe(),
        f = N(
          () =>
            !(t.value.section_image instanceof File) && t.value.section_image
        ),
        g = N(() => E.getters.translations);
      xe(() => {
        var m, T;
        t.value.section_image && (_.value = ""),
          (T =
            (m = t == null ? void 0 : t.value) == null
              ? void 0
              : m.section_text) != null &&
            T.trim() &&
            (w.value = "");
      });
      const n = (m = null) => {
          if (m) {
            i.value.length > 0 && (i.value = []), (R.value = !0);
            const T = r.value.find((x) => x.id === m);
            T && ((t.value = { ...T }), (v.value = m));
          } else
            (R.value = !1),
              (t.value = {
                section_text: "",
                imageTitle: null,
                section_image: null,
              }),
              (v.value = null);
          h.value.openDialog();
        },
        j = (m) => {
          (u.value = m), W.value.openDialog();
        },
        Q = async () => {
          if (
            (!t.value.section_text ||
              (t.value.section_text && !t.value.section_text.trim())) &&
            !t.value.section_image
          ) {
            w.value = "Please enter the title text or  image!";
            return;
          }
          if (t.value.section_image || t.value.section_text) {
            (b.value = !0), (p.value = !0);
            const m = new FormData();
            if (v.value) {
              t.value.section_image &&
                t.value.section_image instanceof File &&
                m.append("section_image", t.value.section_image),
                m.append("section_text", t.value.section_text);
              try {
                const T = await axios.post(
                  `/api/contractor/brag-section/${v.value}`,
                  m,
                  ue()
                );
                if (T.data) {
                  le(T.data.message || "Brag section successfully saved");
                  const x = r.value.findIndex((H) => H.id === v.value);
                  x !== -1 &&
                    (r.value[x] = { id: v.value, ...T.data.imageSection });
                }
              } catch (T) {
                console.log(T), Y();
              }
            } else {
              t.value.section_image &&
                t.value.section_image instanceof File &&
                m.append("section_image", t.value.section_image),
                t.value.section_text &&
                  m.append("section_text", t.value.section_text),
                console.log("inelse", t.value, m);
              for (const [T, x] of m.entries())
                console.log(`${T}: ${x}`, "key value");
              try {
                const T = await axios.post(
                  `/api/contractor/${l.contractorId}/brag-section`,
                  m,
                  ue()
                );
                T.data &&
                  (le(T.data.message || "Brag section successfully saved"),
                  r.value.push({ id: Date.now(), ...T.data.imageSection }));
              } catch (T) {
                console.log(T), Y();
              }
            }
            (b.value = !1),
              (p.value = !1),
              (t.value = {
                section_text: "",
                imageTitle: null,
                section_image: null,
              }),
              (v.value = null);
          }
          i.value.length > 0 && (i.value = []), h.value.closeDialog();
        },
        ee = async () => {
          if (u.value !== null) {
            (b.value = !0), (p.value = !0);
            try {
              const m = await axios.delete(
                `/api/contractor/brag-section/${u.value}`,
                ue()
              );
              if (m.data) {
                le(m.data.message || "Brag section successfully deleted");
                const T = r.value.findIndex((x) => x.id === u.value);
                T !== -1 && r.value.splice(T, 1), (u.value = null);
              }
            } catch (m) {
              console.log(m), Y();
            }
            (b.value = !1), (p.value = !1), W.value.closeDialog();
          }
        },
        U = (m) => {
          (k.value = m), V.value.openDialog();
        },
        $ = (m) => {
          d.value = m;
        },
        L = (m) => {
          (i.value = m.map((T) => T.file)),
            i.value[0] &&
              ((t.value.imageTitle = i.value[0].name),
              (t.value.section_image = i.value[0]));
        },
        z = () => {
          p.value = !0;
        },
        y = () => {
          p.value = !1;
        };
      return (m, T) => (
        c(),
        S(
          Z,
          null,
          [
            r.value && r.value.length > 0
              ? (c(),
                S("div", Bl, [
                  (c(!0),
                  S(
                    Z,
                    null,
                    pe(
                      r.value,
                      (x) => (
                        c(),
                        S(
                          "div",
                          {
                            key: x.id,
                            class:
                              "rounded-md border relative border-gray-300 p-2",
                          },
                          [
                            s("div", ql, [
                              e(
                                ie,
                                {
                                  onClick: () => n(x.id),
                                  icon: "nimbus:edit",
                                  color: "#1864ab",
                                  class: "bg-white",
                                },
                                null,
                                8,
                                ["onClick"]
                              ),
                              e(
                                ie,
                                {
                                  onClick: () => j(x.id),
                                  icon: "ic:baseline-delete",
                                  color: "#e03131",
                                  class: "bg-white",
                                },
                                null,
                                8,
                                ["onClick"]
                              ),
                            ]),
                            s("div", Ol, [
                              x.section_image
                                ? (c(),
                                  S("div", Nl, [
                                    s(
                                      "img",
                                      {
                                        src: x.section_image,
                                        alt: "Section Image",
                                        class: "object-cover h-full w-full",
                                      },
                                      null,
                                      8,
                                      Hl
                                    ),
                                    e(
                                      M(J),
                                      {
                                        icon: "fa-solid:expand",
                                        class:
                                          "absolute top-0 right-0 m-2 section_text-white cursor-pointer bg-[#555] p-1 rounded w-8 h-8",
                                        color: "white",
                                        onClick: (H) => U(x.section_image),
                                      },
                                      null,
                                      8,
                                      ["onClick"]
                                    ),
                                  ]))
                                : I("", !0),
                              x.section_text
                                ? (c(),
                                  S(
                                    "div",
                                    {
                                      key: 1,
                                      class: X(
                                        `flex-1 flex text-md sm:text-xl font-bold sm:items-center ${
                                          x.section_image
                                            ? ""
                                            : "sm:p-4 justify-center"
                                        }`
                                      ),
                                      style: { "word-break": "break-word" },
                                    },
                                    A(x.section_text),
                                    3
                                  ))
                                : I("", !0),
                            ]),
                          ]
                        )
                      )
                    ),
                    128
                  )),
                ]))
              : I("", !0),
            r.value.length < 15
              ? (c(),
                S(
                  "button",
                  {
                    key: 1,
                    onClick: T[0] || (T[0] = () => n()),
                    class:
                      "w-full flex gap-2 items-center justify-center h-[42px] rounded bg-[#087f5b] text-white active:scale-[0.99] transition transform duration-300 hover:shadow-lg",
                  },
                  [
                    e(M(J), { icon: "mdi:plus-thick" }),
                    _e(" " + A(g.value && g.value.add_brag_section), 1),
                  ]
                ))
              : I("", !0),
            e(
              ae,
              {
                submitText: g.value && g.value.save,
                loading: b.value,
                disabled: p.value,
                onSubmit: Q,
                ref_key: "dialogRef",
                ref: h,
                title: `${
                  R.value ? g.value && g.value.edit : g.value && g.value.add
                } ${g.value && g.value.brag_section}`,
              },
              {
                default: B(() => [
                  f.value
                    ? (c(),
                      S("div", Gl, [
                        s(
                          "img",
                          {
                            src: t.value.section_image,
                            alt: "Section Image",
                            onerror: "",
                            class: "object-cover h-40 mb-2 mx-auto",
                          },
                          null,
                          8,
                          Xl
                        ),
                      ]))
                    : I("", !0),
                  e(
                    M(C),
                    {
                      name: "section_image",
                      "accepted-file-types":
                        "image/jpeg, image/png, image/gif, image/webp",
                      files: i.value,
                      allowFileSizeValidation: "true",
                      maxFileSize: "5MB",
                      labelMaxTotalFileSizeExceeded: "Maximum Size Is 5MB",
                      allowImageResize: "true",
                      credits: "false",
                      imageResizeMode: "contain",
                      imageResizeTargetWidth: "1000",
                      imageResizeTargetHeight: "2000",
                      imageResizeUpscale: "true",
                      "allow-multiple": !1,
                      onInit: $,
                      onUpdatefiles: L,
                      onAddfilestart: z,
                      onAddfile: y,
                      onError: y,
                      labelIdle: `${g.value && g.value.drag_and_drop} ${
                        R.value ? g.value && g.value.to_replace : ""
                      } ${
                        g.value && g.value.your_image_or
                      } <span class='filepond--label-action'> ${
                        g.value && g.value.browse
                      } </span>`,
                    },
                    null,
                    8,
                    ["files", "labelIdle"]
                  ),
                  s(
                    "label",
                    Kl,
                    A(g.value && g.value.title) +
                      "(" +
                      A(g.value && g.value.max) +
                      " 150char)",
                    1
                  ),
                  $e(
                    s(
                      "textarea",
                      {
                        "onUpdate:modelValue":
                          T[1] || (T[1] = (x) => (t.value.section_text = x)),
                        id: "text_section",
                        maxlength: "150",
                        type: "text",
                        rows: a.screenWidth > 760 ? 2 : 3,
                        class:
                          "mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
                        placeholder: g.value && g.value.type_your_description,
                      },
                      null,
                      8,
                      Jl
                    ),
                    [[Be, t.value.section_text]]
                  ),
                  w.value ? (c(), S("div", Yl, A(w.value), 1)) : I("", !0),
                ]),
                _: 1,
              },
              8,
              ["submitText", "loading", "disabled", "title"]
            ),
            e(
              ae,
              {
                dialogWidth: "widthAuto",
                showFooter: !1,
                ref_key: "imageIncDialogRef",
                ref: V,
                title: g.value && g.value.your_image,
              },
              {
                default: B(() => [s("img", { src: k.value }, null, 8, Zl)]),
                _: 1,
              },
              8,
              ["title"]
            ),
            e(
              ae,
              {
                submitText: g.value && g.value.delete,
                onSubmit: ee,
                ref_key: "deleteDialogRef",
                ref: W,
                loading: b.value,
                disabled: p.value,
                errorIcon: "",
                dialogWidth: "max-h-[70vh] width50",
                title: g.value && g.value.are_you_sure,
              },
              {
                default: B(() => [
                  s("div", Ql, [
                    s(
                      "div",
                      ea,
                      A(g.value && g.value.do_you_want_to_delete_this_section),
                      1
                    ),
                  ]),
                ]),
                _: 1,
              },
              8,
              ["submitText", "loading", "disabled", "title"]
            ),
          ],
          64
        )
      );
    },
  },
  la = { key: 0 },
  aa = { class: "flex flex-col gap-3 sm:gap-4" },
  oa = { class: "flex gap-2 flex-col" },
  sa = {
    key: 0,
    class: X(
      "mt-1 flex gap-1 flex-col border-gray-300 border-2 p-3   rounded-lg closing"
    ),
  },
  na = { class: "flex justify-between" },
  ia = { class: "flex text-blue-rgba items-center font-extrabold text-2xl" },
  ra = ["innerHTML"],
  ca = { class: "closing default" },
  ua = {
    __name: "EditMode",
    props: {
      profile: Object,
      region_name: String,
      templateList: Array,
      colorSchemeList: Array,
      screenWidth: Number,
      total_reviews: [Number, String],
      average_rating: [Number, String],
      starPercentages: { type: Array, default: [] },
    },
    setup(a) {
      const l = a,
        C = (f) => {
          const g = document.createElement("textarea");
          return (g.innerHTML = f), g.value;
        },
        r = o(),
        t = o(C(l.profile.bottom_text)),
        h = o(!1),
        W = o(!1),
        R = o(t.value),
        k = o(!1),
        u = qe,
        V = o(R.value),
        v = o(nt),
        _ = (f) => {
          f.ui
            .getEditableElement()
            .parentElement.insertBefore(
              f.ui.view.toolbar.element,
              f.ui.getEditableElement()
            );
        },
        w = oe(),
        b = N(() => w.getters.translations),
        p = N(() => {
          const g = new DOMParser().parseFromString(t.value, "text/html");
          return (
            g.querySelectorAll("a").forEach((n) => {
              const j = n.getAttribute("href");
              !j.startsWith("http://") &&
                !j.startsWith("https://") &&
                n.setAttribute("href", "http://" + j),
                (n.target = "_blank");
            }),
            g.body.innerHTML
          );
        }),
        i = () => {
          r.value.openDialog();
        },
        d = async () => {
          (k.value = !0), (h.value = !0), (W.value = !0), (R.value = V.value);
          try {
            (
              await axios.patch(
                "/api/contractor/bottom-closing-text",
                { bottom_text: R.value },
                ce()
              )
            ).data &&
              (le("Bottom Text successfully saved"),
              (t.value = R.value),
              r.value.closeDialog());
          } catch {
            Y();
          } finally {
            (h.value = !1), (W.value = !1);
          }
        },
        E = () => {
          console.log("here"), (k.value = !1);
        };
      return (f, g) => {
        const n = de("ckeditor");
        return a.profile
          ? (c(),
            S("div", la, [
              s("div", aa, [
                e(
                  Tt,
                  {
                    screenWidth: a.screenWidth,
                    averageRating: a.average_rating,
                    profile: a.profile,
                  },
                  null,
                  8,
                  ["screenWidth", "averageRating", "profile"]
                ),
                e(
                  ol,
                  {
                    templateList: a.templateList,
                    colorSchemeList: a.colorSchemeList,
                    screenWidth: a.screenWidth,
                    profile: a.profile,
                  },
                  null,
                  8,
                  ["templateList", "colorSchemeList", "screenWidth", "profile"]
                ),
                e(
                  fe,
                  {
                    shadowLevel: 2,
                    bgColor: "white",
                    padding: a.screenWidth < 640 ? "7px" : "20px",
                  },
                  {
                    default: B(() => [
                      e(
                        qt,
                        {
                          screenWidth: a.screenWidth,
                          region_name: a.region_name,
                          profile: a.profile,
                        },
                        null,
                        8,
                        ["screenWidth", "region_name", "profile"]
                      ),
                      t.value
                        ? I("", !0)
                        : (c(),
                          S(
                            "button",
                            {
                              key: 0,
                              onClick: i,
                              class:
                                "w-full flex gap-2 mt-3 items-center justify-center h-[42px] rounded bg-[#087f5b] text-white active:scale-[0.99] transition transform duration-300 hover:shadow-lg",
                            },
                            [
                              e(M(J), { icon: "mdi:plus-thick" }),
                              _e(
                                " " +
                                  A(
                                    b.value &&
                                      b.value
                                        .about_us_why_you_should_work_for_or_hire_us
                                  ),
                                1
                              ),
                            ]
                          )),
                    ]),
                    _: 1,
                  },
                  8,
                  ["padding"]
                ),
                e(
                  xl,
                  { screenWidth: a.screenWidth, profile: a.profile },
                  null,
                  8,
                  ["screenWidth", "profile"]
                ),
                a.average_rating && a.starPercentages
                  ? (c(),
                    q(
                      fe,
                      {
                        key: 0,
                        shadowLevel: 2,
                        bgColor: "white",
                        padding: a.screenWidth < 640 ? "7px" : "20px",
                      },
                      {
                        default: B(() => [
                          e(
                            ct,
                            {
                              averageRating: a.average_rating,
                              starPercentages: a.starPercentages,
                              length: a.total_reviews,
                              class: "mb-6",
                              contractorId: a.profile.id,
                            },
                            null,
                            8,
                            [
                              "averageRating",
                              "starPercentages",
                              "length",
                              "contractorId",
                            ]
                          ),
                        ]),
                        _: 1,
                      },
                      8,
                      ["padding"]
                    ))
                  : I("", !0),
                e(
                  dl,
                  { screenWidth: a.screenWidth, profile: a.profile },
                  null,
                  8,
                  ["screenWidth", "profile"]
                ),
                e(
                  fe,
                  {
                    shadowLevel: 2,
                    bgColor: "white",
                    padding: a.screenWidth < 640 ? "7px" : "20px",
                  },
                  {
                    default: B(() => [
                      s("div", oa, [
                        e(
                          he,
                          {
                            class: "mb-2",
                            style: me({
                              marginBottom: "8px",
                              fontWeight: 800,
                              fontSize: a.screenWidth > 640 ? "24px" : "20px",
                            }),
                            heading: b.value && b.value.title_image_section,
                          },
                          null,
                          8,
                          ["style", "heading"]
                        ),
                        e(
                          Ml,
                          {
                            image_sections: a.profile.image_sections,
                            "contractor-id": a.profile.id,
                            "screen-width": a.screenWidth,
                          },
                          null,
                          8,
                          ["image_sections", "contractor-id", "screen-width"]
                        ),
                        t.value
                          ? (c(),
                            S("div", sa, [
                              s("div", na, [
                                s(
                                  "div",
                                  ia,
                                  A(
                                    b.value &&
                                      b.value
                                        .about_us_why_you_should_work_for_or_hire_us
                                  ),
                                  1
                                ),
                                e(ie, {
                                  onClick: i,
                                  icon: "nimbus:edit",
                                  color: "#1864ab",
                                }),
                              ]),
                              s(
                                "div",
                                {
                                  class: "default ck-content",
                                  innerHTML: p.value,
                                },
                                null,
                                8,
                                ra
                              ),
                            ]))
                          : I("", !0),
                        e(
                          he,
                          {
                            class: "mb-2 mt-4",
                            style: me({
                              marginBottom: "8px",
                              fontWeight: 800,
                              fontSize: a.screenWidth > 640 ? "24px" : "20px",
                            }),
                            ":heading": b.value && b.value.brag_sections,
                          },
                          null,
                          8,
                          ["style", ":heading"]
                        ),
                        e(
                          ta,
                          {
                            brag_sections: a.profile.brag_sections,
                            "contractor-id": a.profile.id,
                            "screen-width": a.screenWidth,
                          },
                          null,
                          8,
                          ["brag_sections", "contractor-id", "screen-width"]
                        ),
                        e(
                          Cl,
                          {
                            closing_text: a.profile.closing_text,
                            "screen-width": a.screenWidth,
                          },
                          null,
                          8,
                          ["closing_text", "screen-width"]
                        ),
                        e(
                          ae,
                          {
                            submitText: b.value && b.value.save,
                            loading: h.value,
                            disabled: W.value,
                            overflowAllowed: !0,
                            onSubmit: d,
                            onClosed: E,
                            ref_key: "dialogRef",
                            ref: r,
                            title: b.value && b.value.add_bottom_text,
                          },
                          {
                            default: B(() => [
                              s("div", ca, [
                                e(
                                  n,
                                  {
                                    editor: M(u),
                                    onReady: _,
                                    modelValue: V.value,
                                    "onUpdate:modelValue":
                                      g[0] || (g[0] = (j) => (V.value = j)),
                                    config: v.value,
                                  },
                                  null,
                                  8,
                                  ["editor", "modelValue", "config"]
                                ),
                              ]),
                            ]),
                            _: 1,
                          },
                          8,
                          ["submitText", "loading", "disabled", "title"]
                        ),
                      ]),
                    ]),
                    _: 1,
                  },
                  8,
                  ["padding"]
                ),
              ]),
            ]))
          : I("", !0);
      };
    },
  };
const da = {
    __name: "MoveToTopEdit",
    props: {
      scrollableContainer: {
        type: String,
        required: !1,
        default: "scrollable",
      },
    },
    setup(a) {
      const l = a,
        C = () => {
          const t = document.getElementById(l.scrollableContainer);
          t && t.scrollTo({ top: 0, behavior: "smooth" });
        };
      ge(() => {
        const t = document.getElementById(l.scrollableContainer);
        console.log(t, t.scrollTop, "scroll"),
          t && t.addEventListener("scroll", r);
      }),
        Te(() => {
          const t = document.getElementById(l.scrollableContainer);
          t && t.removeEventListener("scroll", r);
        });
      const r = () => {
        const t = document.getElementById(l.scrollableContainer),
          h = document.querySelector(".scroll-to-top");
        t && h && (h.style.display = t.scrollTop > 100 ? "block" : "none");
      };
      return (t, h) => (
        c(),
        S("button", { onClick: C, class: "scroll-to-top" }, [
          e(M(J), {
            icon: "icon-park-solid:up-two",
            color: "#3a357c",
            class: "w-6 h-6 sm:w-8 sm:h-8",
          }),
        ])
      );
    },
  },
  ma = be(da, [["__scopeId", "data-v-050d0fad"]]),
  va = {
    __name: "ContractorLayoutEdit",
    props: {
      profile: Object,
      templateList: Array,
      region_name: String,
      total_reviews: [Number, String],
      average_rating: [Number, String],
      starPercentages: { type: Array, default: [] },
    },
    setup(a) {
      const l = oe(),
        C = N(() => l.getters.screenWidth);
      return (r, t) => (
        c(),
        S(
          Z,
          null,
          [
            e(
              ua,
              {
                screenWidth: C.value,
                templateList: a.templateList,
                profile: a.profile,
                average_rating: a.average_rating,
                starPercentages: a.starPercentages,
                total_reviews: a.total_reviews,
                region_name: a.region_name,
              },
              null,
              8,
              [
                "screenWidth",
                "templateList",
                "profile",
                "average_rating",
                "starPercentages",
                "total_reviews",
                "region_name",
              ]
            ),
            e(ma),
          ],
          64
        )
      );
    },
  },
  fa = { key: 0, class: "pt-8 sm:pt-8" },
  no = {
    __name: "ContractorPageEdit",
    props: {
      profile: Object,
      region_name: String,
      showit: Boolean,
      contractor_id: [String, Number],
      mode: String,
      postSearchFilters: { type: Object, default: () => ({ postSearch: "" }) },
    },
    setup(a) {
      const { profile: l, contractor_id: C } = a,
        r = o(!1),
        t = o([]),
        h = oe(),
        W = o(!0),
        R = o([]),
        k = o(null),
        u = o({}),
        V = o(0),
        v = N(() => h.getters.userVersion),
        _ = N(() => h.getters.translations);
      ge(() => {
        console.log("onMounted"), localStorage.setItem("prevUrl", "/edit"), w();
        const i = it().url.value;
        let d;
        console.log(i, "url");
        const E = i.match(/\/contractor\/(\d+)\/edit/);
        E && (d = parseInt(E[1], 10)),
          d !== l.user_id && rt.Inertia.visit(`/contractor/${l.user_id}/edit`);
      });
      const w = async () => {
          r.value = !0;
          try {
            const i = await axios.get(
              `/api/contractor/get-contractor-info/${C}`,
              ce()
            );
            if (i.data) {
              (u.value = i.data.contractorProfile),
                h.commit("contractor/setSelectedTemplate", u.value.template_id),
                (k.value = i.data.average_rating),
                (V.value = i.data.total_reviews);
              const {
                  five_stars_count: d,
                  four_stars_count: E,
                  three_stars_count: f,
                  two_stars_count: g,
                  one_star_count: n,
                } = i.data,
                j = d + E + f + g + n;
              R.value = [
                (d / j) * 100,
                (E / j) * 100,
                (f / j) * 100,
                (g / j) * 100,
                (n / j) * 100,
              ];
            }
          } catch {
            Y();
          } finally {
            r.value = !1;
          }
        },
        b = async () => {
          try {
            const i = await axios.get(
              "/api/contractor/all-color-schemes",
              ce()
            );
            if (i.data) {
              const E = [
                ...(v.value === 1
                  ? i.data.allColorSchemes.slice(0, 1)
                  : v.value === 2
                  ? i.data.allColorSchemes.slice(0, 3)
                  : i.data.allColorSchemes),
              ];
              h.commit("contractor/setColorSchemeList", E);
              const f = E.find((n) => n.id === u.value.color_scheme_id),
                g = Me(f);
              console.log(g, f, "optionSelected"),
                h.commit("contractor/setSelectedColorScheme", g);
            }
          } catch {
            Y();
          }
        },
        p = async () => {
          try {
            const i = await axios.get("/api/contractor/all-templates", ce());
            i.data &&
              (t.value =
                v.value === 1
                  ? i.data.allTemplates.slice(0, 1)
                  : v.value === 2
                  ? i.data.allTemplates.slice(0, 3)
                  : i.data.allTemplates);
          } catch {
            Y();
          }
        };
      return (
        xe(async () => {
          W.value &&
            (console.log("watchEffect"),
            (r.value = !0),
            await p(),
            await b(),
            (r.value = !1),
            (W.value = !1));
        }),
        (i, d) => {
          const E = de("Head");
          return (
            c(),
            S(
              Z,
              null,
              [
                e(
                  E,
                  {
                    title:
                      _.value &&
                      _.value.edit + " " + _.value &&
                      _.value.contractor_page,
                  },
                  null,
                  8,
                  ["title"]
                ),
                e(
                  tt,
                  {
                    profile: a.profile,
                    "post-search-filters": a.postSearchFilters,
                    showit: a.showit,
                    "show-post-buttons": !0,
                    color: "rgb(229 231 235 / var(--tw-bg-opacity))",
                  },
                  {
                    default: B(() => [
                      r.value
                        ? I("", !0)
                        : (c(),
                          S("div", fa, [
                            e(
                              va,
                              {
                                profile: u.value,
                                templateList: t.value,
                                average_rating: k.value,
                                starPercentages: R.value,
                                total_reviews: V.value,
                                region_name: a.region_name,
                              },
                              null,
                              8,
                              [
                                "profile",
                                "templateList",
                                "average_rating",
                                "starPercentages",
                                "total_reviews",
                                "region_name",
                              ]
                            ),
                          ])),
                      e(
                        Ae,
                        {
                          loading: r.value,
                          background: "transparent",
                          height: "70vh",
                        },
                        null,
                        8,
                        ["loading"]
                      ),
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
        }
      );
    },
  };
export { no as default };
