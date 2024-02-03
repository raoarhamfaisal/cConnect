import {
  Z as f,
  c as m,
  f as a,
  k as g,
  l as s,
  i as o,
  j as e,
  H as _,
  h as p,
  m as y,
  n as i,
  p as r,
  z as h,
  L as k,
  D as x,
} from "./app.9755ce2a.js";
import { _ as v } from "./GuestLayout.e831f7ad.js";
import { _ as b } from "./PrimaryButton.bb59afa8.js";
const w = i(
    "div",
    { class: "mb-4 text-sm text-gray-600 " },
    " Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another. ",
    -1
  ),
  V = {
    key: 0,
    class: "mb-4 font-medium text-sm text-green-600 ",
  },
  B = ["onSubmit"],
  E = { class: "mt-4 flex items-center justify-between" },
  C = {
    __name: "VerifyEmail",
    props: { status: String },
    setup(n) {
      const c = n,
        t = f(),
        d = () => {
          t.post(route("verification.send"));
        },
        l = m(() => c.status === "verification-link-sent");
      return (u, L) => (
        a(),
        g(v, null, {
          default: s(() => [
            o(e(_), { title: "Email Verification" }),
            w,
            l.value
              ? (a(),
                p(
                  "div",
                  V,
                  " A new verification link has been sent to the email address you provided during registration. "
                ))
              : y("", !0),
            i(
              "form",
              { onSubmit: x(d, ["prevent"]) },
              [
                i("div", E, [
                  o(
                    b,
                    {
                      class: h({ "opacity-25": e(t).processing }),
                      disabled: e(t).processing,
                    },
                    {
                      default: s(() => [r(" Resend Verification Email ")]),
                      _: 1,
                    },
                    8,
                    ["class", "disabled"]
                  ),
                  o(
                    e(k),
                    {
                      href: u.route("logout"),
                      method: "post",
                      as: "button",
                      class:
                        "underline text-sm text-gray-600  hover:text-gray-900  rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ",
                    },
                    { default: s(() => [r("Log Out")]), _: 1 },
                    8,
                    ["href"]
                  ),
                ]),
              ],
              40,
              B
            ),
          ]),
          _: 1,
        })
      );
    },
  };
export { C as default };
