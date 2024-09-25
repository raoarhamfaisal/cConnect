import {
  ac as E,
  r as I,
  u as Z,
  p as D,
  c as H,
  e as _,
  h as t,
  s as h,
  F as L,
  d as f,
  i as n,
  H as O,
  f as r,
  t as u,
  l as M,
  g as b,
  k as P,
  L as W,
  n as K,
  v as R,
  z as T,
  B as G,
} from "./app.907bb242.js";
import { _ as J } from "./SignUpLayout.9eb7bf4e.js";
import { _ as d } from "./InputError.a485c9eb.js";
import { _ as p } from "./InputLabel.c691f6db.js";
import { _ as Q, a as X } from "./WelcomeFooter.ba3aa8d4.js";
import { _ as Y } from "./PrimaryButton.d6b2dece.js";
import "./iconify.99e09ef6.js";
import { _ as g } from "./TextInput.a3698496.js";
import { _ as U } from "./InputIcon.1f121658.js";
import "./spanish.afd7e950.js";
import "./cConnectWord.60dc90ac.js";
import "./_plugin-vue_export-helper.cdc0426e.js";
import "./ResponsiveNavLink.04cb55a4.js";
import "./DialogUpgradeToGoldPlatinum.8daf4ac5.js";
import "./CustomDialog.f5ff7c4f.js";
import "./cConnectWhite.08eee911.js";
const ee = { class: "text-3xl font-bold mb-6" },
  se = ["onSubmit"],
  ae = { class: "mt-4" },
  oe = { class: "mt-4" },
  te = { class: "mt-4" },
  le = { class: "mt-4" },
  ne = { key: 0, class: "text-red-500 text-sm mt-1" },
  ie = { class: "text-xs text-gray-500 mt-1" },
  re = { class: "mt-4" },
  me = { key: 0 },
  de = { key: 0, class: "text-green-500" },
  ue = r("i", { class: "mdi mdi-check-circle-outline" }, null, -1),
  ce = { key: 1, class: "text-red-500" },
  pe = r("i", { class: "mdi mdi-close-circle-outline" }, null, -1),
  _e = { class: "flex items-center justify-end mt-4" },
  fe = { class: "flex items-center justify-center" },
  ve = { src: "/images/avatars/Spinner.gif", alt: "spinner", width: "30" },
  we = { class: "flex items-center justify-end" },
  je = {
    __name: "Register",
    props: { showit: Boolean, user: Object, profile: Object },
    setup(y) {
      var x, $, q, S, C;
      const { user: m, profile: V } = y,
        s = E({
          first_name: (x = m == null ? void 0 : m.first_name) != null ? x : "",
          last_name: ($ = m == null ? void 0 : m.last_name) != null ? $ : "",
          email: (q = m == null ? void 0 : m.email) != null ? q : "",
          company_name:
            (S = V == null ? void 0 : V.company_name) != null ? S : "",
          password: "",
          password_confirmation: "",
          id: (C = m == null ? void 0 : m.id) != null ? C : "",
        }),
        v = I(!1),
        B = Z(),
        w = I(!1),
        o = D({
          first_name: "",
          last_name: "",
          company_name: "",
          email: "",
          password: "",
          passwordValidationMessage: "",
          password_confirmation: "",
        }),
        e = H(() => B.getters.translations),
        j = () => {
          let l = !0;
          for (let a in o) o[a] = "";
          return (
            s.first_name.trim() ||
              ((o.first_name = e.value && e.value.first_name_is_required),
              (l = !1)),
            s.last_name.trim() ||
              ((o.last_name = e.value && e.value.last_name_is_required),
              (l = !1)),
            s.company_name.trim() ||
              ((o.company_name = e.value && e.value.company_name_is_required),
              (l = !1)),
            s.email.trim()
              ? (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(
                  s.email
                ) ||
                  !s.email.includes(".")) &&
                ((o.email = e.value && e.value.invalid_email_format), (l = !1))
              : ((o.email = e.value && e.value.email_is_required), (l = !1)),
            s.password.trim()
              ? (s.password.trim().length < 8 &&
                  ((o.password =
                    e.value && e.value.password_must_be_at_least_8_characters),
                  (l = !1)),
                /[A-Z]/.test(s.password) ||
                  ((o.password = e.value && e.value.passwords_dont_match),
                  (l = !1)),
                /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(s.password) ||
                  ((o.password =
                    e.value && e.value.password_must_contain_special_character),
                  (l = !1)))
              : ((o.password = e.value && e.value.password_is_required),
                (l = !1)),
            s.password.trim() !== s.password_confirmation.trim() &&
              ((o.password_confirmation =
                e.value && e.value.last_name_is_required),
              (l = !1)),
            l
          );
        },
        c = (l) => {
          s[l].trim() && (o[l] = "");
        },
        z = (l) => {
          o[l] = "";
        },
        k = () => {
          j() &&
            (s.id || delete s.id,
            s.post(route("signup"), {
              onSuccess: async () => {
                try {
                  const l = await axios.post("/tokens/create");
                  l.data &&
                    (console.log("here to store"),
                    localStorage.setItem("token", l.data.token),
                    s.reset("password", "password_confirmation"));
                } catch {
                  console.log("here to store2"), G("wrong intoken");
                }
              },
            }));
        },
        A = () => {
          w.value = !w.value;
        },
        N = () => {
          v.value = !v.value;
        },
        F = () => {
          (o.passwordValidationMessage = ""),
            s.password.trim().length < 8
              ? (o.passwordValidationMessage =
                  e.value && e.value.password_must_be_at_least_8_characters)
              : /[A-Z]/.test(s.password)
              ? /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(s.password) ||
                (o.passwordValidationMessage =
                  e.value && e.value.password_must_contain_special_character)
              : (o.passwordValidationMessage =
                  e.value && e.value.password_must_contain_uppercase_letter);
        };
      return (l, a) => (
        f(),
        _(
          L,
          null,
          [
            t(J, null, {
              default: h(() => [
                t(n(O), { title: e.value && e.value.sign_up }, null, 8, [
                  "title",
                ]),
                t(X, { showit: y.showit, showSignUp: !1 }, null, 8, ["showit"]),
                r("div", ee, u(e.value && e.value.create_your_account), 1),
                r(
                  "form",
                  {
                    onSubmit: P(k, ["prevent"]),
                    autocomplete: "off",
                    class:
                      "mt-6 sm:space-y-0 w-full sm:grid sm:grid-cols-2 sm:gap-6",
                  },
                  [
                    r("div", null, [
                      t(
                        p,
                        {
                          for: "name",
                          class: "font-bold",
                          value: e.value && e.value.first_name + "*",
                        },
                        null,
                        8,
                        ["value"]
                      ),
                      t(
                        g,
                        {
                          id: "name",
                          type: "text",
                          class: "mt-1 block w-full",
                          modelValue: n(s).first_name,
                          "onUpdate:modelValue":
                            a[0] || (a[0] = (i) => (n(s).first_name = i)),
                          required: "",
                          autofocus: "",
                          onInput: a[1] || (a[1] = (i) => c("first_name")),
                          autocomplete: "first_name",
                        },
                        null,
                        8,
                        ["modelValue"]
                      ),
                      t(d, { class: "mt-1", message: o.first_name }, null, 8, [
                        "message",
                      ]),
                    ]),
                    r("div", ae, [
                      t(
                        p,
                        {
                          for: "last_name",
                          class: "font-bold",
                          value: e.value && e.value.last_name + "*",
                        },
                        null,
                        8,
                        ["value"]
                      ),
                      t(
                        g,
                        {
                          id: "last_name",
                          type: "text",
                          class: "mt-1 block w-full",
                          modelValue: n(s).last_name,
                          "onUpdate:modelValue":
                            a[2] || (a[2] = (i) => (n(s).last_name = i)),
                          onInput: a[3] || (a[3] = (i) => c("last_name")),
                          required: "",
                          name: "lastName",
                        },
                        null,
                        8,
                        ["modelValue"]
                      ),
                      t(d, { class: "mt-1", message: o.last_name }, null, 8, [
                        "message",
                      ]),
                    ]),
                    r("div", oe, [
                      t(
                        p,
                        {
                          for: "company_name",
                          class: "font-bold",
                          value: e.value && e.value.company_name + "*",
                        },
                        null,
                        8,
                        ["value"]
                      ),
                      t(
                        g,
                        {
                          id: "company_name",
                          type: "text",
                          class: "mt-1 block w-full",
                          modelValue: n(s).company_name,
                          "onUpdate:modelValue":
                            a[4] || (a[4] = (i) => (n(s).company_name = i)),
                          onInput: a[5] || (a[5] = (i) => c("company_name")),
                          required: "",
                          autocomplete: "organization",
                          name: "organization",
                        },
                        null,
                        8,
                        ["modelValue"]
                      ),
                      t(
                        d,
                        { class: "mt-1", message: o.company_name },
                        null,
                        8,
                        ["message"]
                      ),
                    ]),
                    r("div", te, [
                      t(p, {
                        for: "email",
                        class: "font-bold",
                        value: "Email*",
                      }),
                      t(
                        g,
                        {
                          id: "email",
                          type: "email",
                          class: "mt-1 block w-full",
                          modelValue: n(s).email,
                          "onUpdate:modelValue":
                            a[6] || (a[6] = (i) => (n(s).email = i)),
                          onInput: a[7] || (a[7] = (i) => c("email")),
                          required: "",
                          readonly: "",
                          onfocus: "this.removeAttribute('readonly');",
                          autocomplete: "off",
                        },
                        null,
                        8,
                        ["modelValue"]
                      ),
                      t(d, { class: "mt-1", message: o.email }, null, 8, [
                        "message",
                      ]),
                      t(
                        d,
                        { class: "mt-1", message: n(s).errors.email },
                        null,
                        8,
                        ["message"]
                      ),
                    ]),
                    r("div", le, [
                      t(p, {
                        for: "password",
                        class: "font-bold",
                        value: "Password*",
                      }),
                      t(
                        U,
                        {
                          icon: w.value ? "mdi:hide" : "mdi:show",
                          color: "#241e6d",
                          cursor: !0,
                          id: "password",
                          type: w.value ? "text" : "password",
                          onIconClick: A,
                          class: "mt-1 block w-full",
                          readonly: "",
                          onfocus: "this.removeAttribute('readonly');",
                          autocomplete: "off",
                          modelValue: n(s).password,
                          "onUpdate:modelValue":
                            a[8] || (a[8] = (i) => (n(s).password = i)),
                          onInput: a[9] || (a[9] = (i) => c("password")),
                          onKeyup:
                            a[10] ||
                            (a[10] = (i) => z("passwordValidationMessage")),
                          onBlur: F,
                          required: "",
                        },
                        null,
                        8,
                        ["icon", "type", "modelValue"]
                      ),
                      o.passwordValidationMessage
                        ? (f(), _("div", ne, u(o.passwordValidationMessage), 1))
                        : M("", !0),
                      t(d, { class: "mt-1", message: o.password }, null, 8, [
                        "message",
                      ]),
                      r(
                        "div",
                        ie,
                        u(e.value && e.value.password_requirements),
                        1
                      ),
                    ]),
                    r("div", re, [
                      t(
                        p,
                        {
                          for: "password_confirmation",
                          class: "font-bold",
                          value: e.value && e.value.confirm_password + "*",
                        },
                        null,
                        8,
                        ["value"]
                      ),
                      t(
                        U,
                        {
                          icon: v.value ? "mdi:hide" : "mdi:show",
                          cursor: !0,
                          color: "#241e6d",
                          id: "password_confirmation",
                          type: v.value ? "text" : "password",
                          onIconClick: N,
                          class: "mt-1 block w-full",
                          modelValue: n(s).password_confirmation,
                          "onUpdate:modelValue":
                            a[11] ||
                            (a[11] = (i) => (n(s).password_confirmation = i)),
                          onInput:
                            a[12] ||
                            (a[12] = (i) => c("password_confirmation")),
                          required: "",
                          autocomplete: "new-password",
                        },
                        null,
                        8,
                        ["icon", "type", "modelValue"]
                      ),
                      n(s).password_confirmation.length >= 1
                        ? (f(),
                          _("div", me, [
                            n(s).password_confirmation === n(s).password
                              ? (f(),
                                _("span", de, [
                                  ue,
                                  b(" " + u(e.value && e.value.matched), 1),
                                ]))
                              : (f(),
                                _("span", ce, [
                                  pe,
                                  b(" " + u(e.value && e.value.unmatched), 1),
                                ])),
                          ]))
                        : M("", !0),
                      t(
                        d,
                        { class: "mt-2", message: o.password_confirmation },
                        null,
                        8,
                        ["message"]
                      ),
                    ]),
                  ],
                  40,
                  se
                ),
                r("div", _e, [
                  t(
                    n(W),
                    {
                      href: l.route("login"),
                      class:
                        "underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                    },
                    {
                      default: h(() => [
                        b(u(e.value && e.value.already_a_user), 1),
                      ]),
                      _: 1,
                    },
                    8,
                    ["href"]
                  ),
                  t(
                    Y,
                    {
                      class: K(["ml-4", { "opacity-25": n(s).processing }]),
                      disabled: n(s).processing,
                      style: {
                        "background-image": `linear-gradient(
            111.4deg,
            rgba(27, 24, 113, 1) 6.5%,
            rgba(7, 7, 9, 0.5) 97.2%
          )`,
                      },
                      onClick: P(k, ["prevent"]),
                    },
                    {
                      default: h(() => [
                        r("div", fe, u(e.value && e.value.signup), 1),
                        R(r("img", ve, null, 512), [[T, n(s).processing]]),
                      ]),
                      _: 1,
                    },
                    8,
                    ["class", "disabled", "onClick"]
                  ),
                ]),
                r("div", we, [
                  t(
                    d,
                    { class: "mt-1", message: n(s).errors.general },
                    null,
                    8,
                    ["message"]
                  ),
                ]),
              ]),
              _: 1,
            }),
            t(Q, { showit: y.showit }, null, 8, ["showit"]),
          ],
          64
        )
      );
    },
  };
export { je as default };
