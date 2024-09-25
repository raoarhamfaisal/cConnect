import {
  r as f,
  u as H,
  c as B,
  w as z,
  o as A,
  a as L,
  b as O,
  d as x,
  e as k,
  f as n,
  g as P,
  t as p,
  h as o,
  i as I,
  n as j,
  F as R,
  j as M,
  k as N,
  l as W,
  m as E,
  p as F,
  q as K,
  s as U,
  H as Z,
  L as G,
  v as V,
  x as J,
  y as Q,
  z as D,
  A as X,
  B as Y,
} from "./app.907bb242.js";
import { _ as ee } from "./SignUpLayout.9eb7bf4e.js";
import { _ as le, a as te } from "./WelcomeFooter.ba3aa8d4.js";
import { _ as ae } from "./PrimaryButton.d6b2dece.js";
import { I as se } from "./iconify.99e09ef6.js";
import { _ as oe } from "./_plugin-vue_export-helper.cdc0426e.js";
import { c as ne } from "./selectListsHelpters.6d73b684.js";
import { _ as w } from "./InputError.a485c9eb.js";
import { _ as y } from "./InputLabel.c691f6db.js";
import { _ as q } from "./TextInput.a3698496.js";
import "./spanish.afd7e950.js";
import "./cConnectWord.60dc90ac.js";
import "./ResponsiveNavLink.04cb55a4.js";
import "./DialogUpgradeToGoldPlatinum.8daf4ac5.js";
import "./CustomDialog.f5ff7c4f.js";
import "./tContractorWhite.08eee911.js";
const re = { class: "relative grid items-center" },
  ue = ["onClick"],
  ie = {
    __name: "SelectInput",
    props: {
      options: { type: Array, required: !0 },
      optionsPropForText: { type: String, default: "" },
      modelValue: { type: Object, default: {} },
    },
    emits: ["update:modelValue"],
    setup(_, { emit: S }) {
      var T;
      const i = _,
        d = f(!1),
        l = f(null),
        s = f(null),
        e = f(""),
        C = H(),
        h = f((T = i.modelValue) != null ? T : 0),
        b = i.options.find((r) => r.id == h.value),
        m = f(b && Object.keys(b).length > 0 ? b : {}),
        $ = B(() => C.getters.translations);
      z(
        () => i.modelValue,
        () => {
          var v;
          h.value = (v = i.modelValue) != null ? v : 0;
          const r = i.options.find((g) => g.id == h.value);
          m.value = r && Object.keys(r).length > 0 ? r : {};
        }
      );
      const t = (r) => {
          console.log(r, "option"),
            (m.value = { ...r }),
            S("update:modelValue", r.id),
            (d.value = !1);
        },
        a = (r) => {
          l.value &&
            !(l.value === r.target || l.value.contains(r.target)) &&
            (d.value = !1);
        };
      A(() => {
        document.addEventListener("mousedown", a);
      }),
        L(() => {
          document.removeEventListener("mousedown", a);
        }),
        O(() => {
          if (d.value && l.value && s.value) {
            const r = l.value.getBoundingClientRect(),
              v = s.value.clientHeight;
            r.bottom + v > window.innerHeight && r.top > v
              ? (e.value = "dropdown-above")
              : (e.value = "dropdown-below");
          }
        });
      const c = f([]);
      O(() => {
        c.value = c.value.slice(0, i.options.length);
      });
      const u = () => {
        (d.value = !d.value),
          d.value &&
            E(() => {
              const r = i.options.indexOf(i.modelValue.name),
                v = c.value[r];
              v && s.value && (s.value.scrollTop = v.offsetTop);
            });
      };
      return (r, v) => (
        x(),
        k("div", re, [
          n(
            "div",
            {
              ref_key: "dropdownContainer",
              ref: l,
              class:
                "relative w-auto border border-gray-300 rounded-md cursor-pointer p-2 pr-8",
              onClick: u,
            },
            [
              P(
                p(
                  _.optionsPropForText &&
                    m.value &&
                    Object.keys(m.value).length > 0
                    ? m.value.name
                    : (m.value && Object.keys(m.value).length > 0) ||
                        ($.value && $.value.select_any_option)
                ) + " ",
                1
              ),
              o(I(se), {
                icon: "gridicons:dropdown",
                class:
                  "absolute top-1/2 transform -translate-y-1/2 right-2 text-gray-500",
              }),
              d.value
                ? (x(),
                  k(
                    "ul",
                    {
                      key: 0,
                      ref_key: "dropdownMenu",
                      ref: s,
                      class: j([
                        ["dropdown-menu", e.value],
                        "absolute left-0 w-full mt-2 border border-gray-300 rounded-md bg-white shadow-lg z-10",
                      ]),
                    },
                    [
                      (x(!0),
                      k(
                        R,
                        null,
                        M(
                          _.options,
                          (g) => (
                            x(),
                            k(
                              "li",
                              {
                                ref_for: !0,
                                ref_key: "optionRefs",
                                ref: c,
                                key: g,
                                class: j([
                                  "p-2 cursor-pointer",
                                  g.name === m.value.name
                                    ? "bg-[#364fc7] text-white"
                                    : "",
                                  "hover:bg-[#364fc7] hover:text-white",
                                ]),
                                onClick: N((ke) => t(g), ["stop"]),
                              },
                              p(_.optionsPropForText ? g.name : g),
                              11,
                              ue
                            )
                          )
                        ),
                        128
                      )),
                    ],
                    2
                  ))
                : W("", !0),
            ],
            512
          ),
        ])
      );
    },
  },
  de = oe(ie, [["__scopeId", "data-v-d40ad21c"]]),
  me = { class: "container mx-auto p-1 sx:p-2 sm:p-4" },
  ce = { class: "mb-3 sm:mb-6" },
  pe = { id: "aboutUs", class: "mb-8" },
  ve = { class: "text-2xl font-bold mb-4" },
  fe = { class: "text-lg mb-4" },
  _e = { class: "text-lg mb-4" },
  ge = { class: "text-lg" },
  he = { id: "contactUs", class: "mb-8" },
  be = { class: "text-2xl font-bold mb-4" },
  we = { class: "text-lg mb-4" },
  ye = {
    class: "mt-6 space-y-6 sm:space-y-0 w-full sm:grid sm:grid-cols-2 sm:gap-6",
  },
  xe = ["placeholder"],
  Re = {
    __name: "AboutUs",
    props: { showit: Boolean },
    setup(_) {
      const S = H(),
        i = f(!1),
        d = f(null),
        l = F({
          email: "",
          name: "",
          phone_cell: "",
          departmentId: 0,
          message: "",
        }),
        s = F({
          email: "",
          name: "",
          phone_cell: "",
          department: "",
          message: "",
        }),
        e = B(() => S.getters.translations),
        C = () => {
          var a, c;
          let t = !0;
          for (let u in s) s[u] = "";
          return (
            l.name.trim() ||
              ((s.name =
                e.value && e.value.name + " " + e.value && e.value.is_required),
              (t = !1)),
            l.departmentId ||
              ((s.department = `${e.value && e.value.department} ${
                e.value && e.value.is_required
              }`),
              (t = !1)),
            l.message.trim() ||
              ((s.message = `${e.value && e.value.message}  ${
                e.value && e.value.is_required
              }`),
              (t = !1)),
            l.email.trim()
              ? (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(
                  l.email
                ) ||
                  !l.email.includes(".")) &&
                ((s.email = e.value && e.value.invalid_email_format), (t = !1))
              : ((s.email = e.value && e.value.email_is_required), (t = !1)),
            ((a = l.phone_cell) != null && a.trim()) ||
              ((s.phone_cell = e.value && e.value.phone_number_is_required),
              (t = !1)),
            ((c = l.phone_cell) == null ? void 0 : c.trim().length) > 13 &&
              ((s.phone_cell =
                e.value &&
                e.value.phone_number_must_not_be_greater_than_13_numbers),
              (t = !1)),
            t
          );
        },
        h = () => {
          console.log("here"),
            E(() => {
              (d.value.style.height = "auto"),
                (d.value.style.height = d.value.scrollHeight + "px");
            });
        },
        b = (t) => {
          if (t.key === "Tab") {
            t.preventDefault();
            const a = t.target.selectionStart,
              c = t.target.selectionEnd;
            (l.message =
              l.message.substring(0, a) + "      " + l.message.substring(c)),
              E(() => {
                t.target.selectionStart = t.target.selectionEnd = a + 6;
              });
          }
        },
        m = (t) => {
          l[t].trim() && (s[t] = "");
        },
        $ = async () => {
          if (C())
            try {
              (await axios.post("/tokens/create", l, getAxiosConfig())).data &&
                (X(e.value && e.value.sent_succssfully),
                (l = {
                  email: "",
                  name: "",
                  phone_cell: "",
                  departmentId: 0,
                  message: "",
                }));
            } catch (t) {
              console.log(t), Y();
            }
        };
      return (t, a) => {
        const c = K("mask");
        return (
          x(),
          k(
            R,
            null,
            [
              o(ee, null, {
                default: U(() => [
                  o(I(Z), { title: e.value && e.value.about_us }, null, 8, [
                    "title",
                  ]),
                  o(
                    te,
                    { showNewsFeed: !0, showit: _.showit, showSignUp: !0 },
                    null,
                    8,
                    ["showit"]
                  ),
                  n("div", me, [
                    n("div", ce, [
                      o(
                        I(G),
                        { href: "/", class: "text-blue-500 hover:underline" },
                        {
                          default: U(() => [
                            P(
                              "\u2190 " +
                                p(e.value && e.value.back_to_main_page),
                              1
                            ),
                          ]),
                          _: 1,
                        }
                      ),
                    ]),
                    n("section", pe, [
                      n("h2", ve, p(e.value && e.value.about_us), 1),
                      n("p", fe, p(e.value && e.value.building_community), 1),
                      n(
                        "p",
                        _e,
                        p(e.value && e.value.mission_empower_contractors),
                        1
                      ),
                      n("p", ge, p(e.value && e.value.power_of_community), 1),
                    ]),
                    n("section", he, [
                      n("h2", be, p(e.value && e.value.contact_us), 1),
                      n("p", we, p(e.value && e.value.always_here_to_help), 1),
                      n("div", ye, [
                        n("div", null, [
                          o(
                            y,
                            {
                              class: "font-bold",
                              for: "name",
                              value:
                                e.value &&
                                e.value.your + e.value &&
                                e.value.name + "*",
                            },
                            null,
                            8,
                            ["value"]
                          ),
                          o(
                            q,
                            {
                              class: "mt-1 block w-full",
                              id: "name",
                              type: "text",
                              modelValue: l.name,
                              "onUpdate:modelValue":
                                a[0] || (a[0] = (u) => (l.name = u)),
                              required: "",
                              placeholder: `${e.value && e.value.type_your} ${
                                e.value && e.value.name
                              }`,
                              onInput: a[1] || (a[1] = (u) => m("name")),
                              autocomplete: "name",
                            },
                            null,
                            8,
                            ["modelValue", "placeholder"]
                          ),
                          o(w, { class: "mt-2", message: s.name }, null, 8, [
                            "message",
                          ]),
                        ]),
                        n("div", null, [
                          o(y, {
                            class: "font-bold",
                            for: "email",
                            value: "Email*",
                          }),
                          o(
                            q,
                            {
                              id: "email",
                              type: "tel",
                              class: "mt-1 block w-full",
                              modelValue: l.email,
                              "onUpdate:modelValue":
                                a[2] || (a[2] = (u) => (l.email = u)),
                              onInput:
                                a[3] || (a[3] = (u) => t.clearErrors("email")),
                              placeholder:
                                e.value && e.value.type_your + " Email",
                              required: "",
                              autocomplete: "email",
                            },
                            null,
                            8,
                            ["modelValue", "placeholder"]
                          ),
                          o(w, { class: "mt-2", message: s.email }, null, 8, [
                            "message",
                          ]),
                        ]),
                        n("div", null, [
                          o(
                            y,
                            {
                              class: "font-bold",
                              for: "phone_cell",
                              value: e.value && e.value.phone_cell + "*",
                            },
                            null,
                            8,
                            ["value"]
                          ),
                          V(
                            o(
                              q,
                              {
                                class: "mt-1 block w-full",
                                id: "phone_cell",
                                type: "tel",
                                modelValue: l.phone_cell,
                                "onUpdate:modelValue":
                                  a[4] || (a[4] = (u) => (l.phone_cell = u)),
                                required: "",
                                onInput:
                                  a[5] || (a[5] = (u) => m("phone_cell")),
                                autocomplete: "phone_cell",
                                placeholder:
                                  e.value && e.value.type_your_phone_number,
                              },
                              null,
                              8,
                              ["modelValue", "placeholder"]
                            ),
                            [[c, "###-###-#####"]]
                          ),
                          o(
                            w,
                            { class: "mt-2", message: s.phone_cell },
                            null,
                            8,
                            ["message"]
                          ),
                        ]),
                        n("div", null, [
                          o(
                            y,
                            {
                              class: "font-bold mb-1",
                              for: "department",
                              value: `${e.value && e.value.department}*`,
                            },
                            null,
                            8,
                            ["value"]
                          ),
                          o(
                            de,
                            {
                              options: I(ne),
                              optionsPropForText: "name",
                              modelValue: l.departmentId,
                              "onUpdate:modelValue":
                                a[6] ||
                                (a[6] = (u) => {
                                  (l.departmentId = u), m("department");
                                }),
                            },
                            null,
                            8,
                            ["options", "modelValue"]
                          ),
                          o(
                            w,
                            { class: "mt-2", message: s.department },
                            null,
                            8,
                            ["message"]
                          ),
                        ]),
                      ]),
                      n("div", null, [
                        o(
                          y,
                          {
                            class: "font-bold mt-4 mb-1",
                            for: "message",
                            value: `${e.value && e.value.your}  ${
                              e.value && e.value.message
                            }*`,
                          },
                          null,
                          8,
                          ["value"]
                        ),
                        V(
                          n(
                            "textarea",
                            {
                              id: "rating_text",
                              type: "text",
                              rows: 5,
                              class:
                                "mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm overflow-hidden",
                              required: "",
                              "onUpdate:modelValue":
                                a[7] || (a[7] = (u) => (l.message = u)),
                              ref_key: "textRef",
                              ref: d,
                              onKeydown: b,
                              onInput: h,
                              onPaste: h,
                              placeholder: `${e.value && e.value.type_your} ${
                                e.value && e.value.message
                              }`,
                            },
                            null,
                            40,
                            xe
                          ),
                          [[J, l.message]]
                        ),
                        o(w, { class: "mt-2", message: s.message }, null, 8, [
                          "message",
                        ]),
                      ]),
                      o(
                        ae,
                        {
                          onClick: $,
                          disabled: i.value,
                          style: Q({
                            backgroundImage:
                              "linear-gradient( 111.4deg,rgba(7, 7, 9, 1) 6.5%, rgba(27, 24, 113, 1) 93.2% )",
                            opacity: i.value ? "0.4" : "1.0",
                          }),
                          class: "mt-3 w-full flex justify-center",
                        },
                        {
                          default: U(() => [
                            V(
                              n(
                                "div",
                                { class: "flex items-center justify-center" },
                                p(e.value && e.value.send),
                                513
                              ),
                              [[D, !i.value]]
                            ),
                            V(
                              n(
                                "div",
                                null,
                                p(e.value && e.value.sending) + "... ",
                                513
                              ),
                              [[D, i.value]]
                            ),
                          ]),
                          _: 1,
                        },
                        8,
                        ["disabled", "style"]
                      ),
                    ]),
                  ]),
                ]),
                _: 1,
              }),
              o(le, { showit: _.showit }, null, 8, ["showit"]),
            ],
            64
          )
        );
      };
    },
  };
export { Re as default };
