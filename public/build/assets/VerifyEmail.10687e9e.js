import {
  r as v,
  p as g,
  u as $,
  c as B,
  e as y,
  h as a,
  s as _,
  F as D,
  d as h,
  i as N,
  H as E,
  f as o,
  g as b,
  t,
  l as z,
  y as w,
  v as d,
  z as m,
  X as C,
  B as F,
  N as H,
} from "./app.907bb242.js";
import { _ as I } from "./GuestLayout.f76fa7df.js";
import { _ as x } from "./PrimaryButton.d6b2dece.js";
import { _ as U, a as W } from "./WelcomeFooter.ba3aa8d4.js";
import { _ as q } from "./TextInput.a3698496.js";
import { _ as A } from "./InputError.a485c9eb.js";
import { _ as L } from "./InputLabel.c691f6db.js";
import "./spanish.afd7e950.js";
import "./cConnectWord.60dc90ac.js";
import "./_plugin-vue_export-helper.cdc0426e.js";
import "./ResponsiveNavLink.04cb55a4.js";
import "./iconify.99e09ef6.js";
import "./DialogUpgradeToGoldPlatinum.8daf4ac5.js";
import "./CustomDialog.f5ff7c4f.js";
import "./tContractorWhite.08eee911.js";
const O = { class: "mb-4 text-sm text-gray-600" },
  P = ["href"],
  T = { class: "mt-3" },
  X = { key: 0, class: "mt-2 font-medium text-base text-green-600" },
  G = ["href"],
  ne = {
    __name: "VerifyEmail",
    props: { status: String, showit: Boolean, user: Object },
    setup(u) {
      const k = u,
        i = v(!1),
        r = v(!1),
        p = v(!1),
        c = g({ verifyCode: "" }),
        f = g({ verifyCode: "" }),
        V = $(),
        e = B(() => V.getters.translations),
        j = async (n = !0) => {
          const l = { email: k.user.email };
          i.value = !0;
          try {
            (await axios.post("/api/user/resend-code", l, C())).data &&
              (p.value = !0);
          } catch (s) {
            console.log(s.response), F(s.response.data.message);
          } finally {
            i.value = !1;
          }
        },
        S = async () => {
          var l;
          if (((l = c.verifyCode) == null ? void 0 : l.trim().length) < 6) {
            f.verifyCode = e.value && e.value.the_token_must_be_of_6_characters;
            return;
          }
          const n = { token: c.verifyCode };
          r.value = !0;
          try {
            (await axios.post("/api/user/verify-email", n, C())).data &&
              H.Inertia.visit("/profile-setup");
          } catch (s) {
            f.verifyCode = s.response.data.message;
          } finally {
            r.value = !1;
          }
        };
      return (n, l) => (
        h(),
        y(
          D,
          null,
          [
            a(
              I,
              { verifyEmailPage: "" },
              {
                default: _(() => [
                  a(
                    N(E),
                    { title: e.value && e.value.email_verification },
                    null,
                    8,
                    ["title"]
                  ),
                  a(W, { showit: u.showit, showSignUp: !1 }, null, 8, [
                    "showit",
                  ]),
                  o("div", O, [
                    b(
                      t(e.value && e.value.please_enter_the_one_time_password) +
                        " ",
                      1
                    ),
                    o(
                      "a",
                      {
                        href: n.route("signup"),
                        style: {
                          color: "rgb(36 30 109)",
                          "font-weight": "bold",
                        },
                      },
                      t(u.user.email),
                      9,
                      P
                    ),
                    b(
                      ", " +
                        t(
                          e.value &&
                            e.value.please_check_your_email_junk_spam_folders
                        ),
                      1
                    ),
                  ]),
                  o("div", T, [
                    a(
                      L,
                      {
                        class: "font-bold",
                        for: "email",
                        value: e.value && e.value.enter_code,
                      },
                      null,
                      8,
                      ["value"]
                    ),
                    a(
                      q,
                      {
                        id: "email",
                        type: "text",
                        class: "mt-1 block w-full md:",
                        maxLength: "6",
                        modelValue: c.verifyCode,
                        "onUpdate:modelValue":
                          l[0] || (l[0] = (s) => (c.verifyCode = s)),
                        required: "",
                        autocomplete: "email",
                      },
                      null,
                      8,
                      ["modelValue"]
                    ),
                    a(A, { class: "mt-2", message: f.verifyCode }, null, 8, [
                      "message",
                    ]),
                  ]),
                  p.value
                    ? (h(),
                      y(
                        "div",
                        X,
                        t(
                          e.value &&
                            e.value.a_new_verification_code_has_been_sent
                        ),
                        1
                      ))
                    : z("", !0),
                  a(
                    x,
                    {
                      onClick: S,
                      disabled: r.value,
                      style: w({
                        backgroundImage:
                          "linear-gradient( 111.4deg,rgba(7, 7, 9, 1) 6.5%, rgba(27, 24, 113, 1) 93.2% )",
                        opacity: r.value ? "0.4" : "1.0",
                      }),
                      class: "mt-3 w-full flex justify-center",
                    },
                    {
                      default: _(() => [
                        d(
                          o(
                            "div",
                            { class: "flex items-center justify-center" },
                            t(e.value && e.value.send),
                            513
                          ),
                          [[m, !r.value]]
                        ),
                        d(
                          o(
                            "div",
                            null,
                            t(e.value && e.value.sending) + "... ",
                            513
                          ),
                          [[m, r.value]]
                        ),
                      ]),
                      _: 1,
                    },
                    8,
                    ["disabled", "style"]
                  ),
                  a(
                    x,
                    {
                      onClick: j,
                      disabled: i.value,
                      style: w({
                        backgroundColor: "#099268",
                        opacity: i.value ? "0.4" : "1.0",
                      }),
                      class: "w-full mt-2 flex justify-center",
                    },
                    {
                      default: _(() => [
                        d(
                          o(
                            "div",
                            { class: "flex items-center justify-center" },
                            t(e.value && e.value.resend_verification_code),
                            513
                          ),
                          [[m, !i.value]]
                        ),
                        d(
                          o(
                            "div",
                            null,
                            t(e.value && e.value.sending) + "... ",
                            513
                          ),
                          [[m, i.value]]
                        ),
                      ]),
                      _: 1,
                    },
                    8,
                    ["disabled", "style"]
                  ),
                  o(
                    "a",
                    {
                      href: n.route("signup"),
                      class:
                        "border-2 border-blue-rgba w-full mt-2 flex justify-center items-center text-blue-rgba font-bold py-2 uppercase px-4 rounded cursor-pointer transition transform duration-300 hover:shadow-lg active:scale-95",
                    },
                    t(e.value && e.value.change_email),
                    9,
                    G
                  ),
                ]),
                _: 1,
              }
            ),
            a(U, { showit: u.showit }, null, 8, ["showit"]),
          ],
          64
        )
      );
    },
  };
export { ne as default };
