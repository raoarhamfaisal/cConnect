import {
  Z as d,
  f as l,
  k as u,
  l as m,
  i as a,
  j as s,
  H as c,
  h as _,
  B as f,
  m as p,
  n as t,
  p as w,
  z as g,
  D as k,
} from "./app.9755ce2a.js";
import { _ as x } from "./GuestLayout.e831f7ad.js";
import { _ as y } from "./InputError.ec8a5011.js";
import { _ as b } from "./InputLabel.aa21d361.js";
import { _ as h } from "./PrimaryButton.bb59afa8.js";
import { _ as V } from "./TextInput.0d7f8fae.js";
const v = t(
    "div",
    { class: "mb-4 text-sm text-gray-600 " },
    " Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one. ",
    -1
  ),
  B = {
    key: 0,
    class: "mb-4 font-medium text-sm text-green-600 ",
  },
  N = ["onSubmit"],
  $ = { class: "flex items-center justify-end mt-4" },
  D = {
    __name: "ForgotPassword",
    props: { status: String },
    setup(o) {
      const e = d({ email: "" }),
        i = () => {
          e.post(route("password.email"));
        };
      return (F, r) => (
        l(),
        u(x, null, {
          default: m(() => [
            a(s(c), { title: "Forgot Password" }),
            v,
            o.status ? (l(), _("div", B, f(o.status), 1)) : p("", !0),
            t(
              "form",
              { onSubmit: k(i, ["prevent"]) },
              [
                t("div", null, [
                  a(b, { for: "email", value: "Email" }),
                  a(
                    V,
                    {
                      id: "email",
                      type: "email",
                      class: "mt-1 block w-full",
                      modelValue: s(e).email,
                      "onUpdate:modelValue":
                        r[0] || (r[0] = (n) => (s(e).email = n)),
                      required: "",
                      autofocus: "",
                      autocomplete: "username",
                    },
                    null,
                    8,
                    ["modelValue"]
                  ),
                  a(y, { class: "mt-2", message: s(e).errors.email }, null, 8, [
                    "message",
                  ]),
                ]),
                t("div", $, [
                  a(
                    h,
                    {
                      class: g({ "opacity-25": s(e).processing }),
                      disabled: s(e).processing,
                    },
                    {
                      default: m(() => [w(" Email Password Reset Link ")]),
                      _: 1,
                    },
                    8,
                    ["class", "disabled"]
                  ),
                ]),
              ],
              40,
              N
            ),
          ]),
          _: 1,
        })
      );
    },
  };
export { D as default };
