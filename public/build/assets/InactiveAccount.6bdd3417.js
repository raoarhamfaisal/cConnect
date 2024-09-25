import { _ as m } from "./SignUpLayout.9eb7bf4e.js";
import { _ as p, a as f } from "./WelcomeFooter.ba3aa8d4.js";
import {
  u as v,
  c as h,
  o as b,
  e as i,
  h as a,
  s as n,
  F as x,
  d as c,
  i as u,
  H as g,
  f as t,
  L as _,
  g as s,
  t as o,
  y as w,
  M as y,
  N as k,
} from "./app.907bb242.js";
import "./spanish.afd7e950.js";
import "./cConnectWord.60dc90ac.js";
import "./_plugin-vue_export-helper.cdc0426e.js";
import "./ResponsiveNavLink.04cb55a4.js";
import "./iconify.99e09ef6.js";
import "./DialogUpgradeToGoldPlatinum.8daf4ac5.js";
import "./CustomDialog.f5ff7c4f.js";
import "./cConnectWhite.08eee911.js";
const j = { class: "mb-3 sm:mb-6" },
  N = { key: 0 },
  S = { class: "text-3xl font-bold mb-6" },
  B = { class: "mb-4" },
  C = { class: "mb-4" },
  I = t(
    "a",
    {
      href: "mailto:support@cConnect.com",
      class: "text-blue-500 hover:underline",
    },
    "support@cConnect.com",
    -1
  ),
  U = { class: "flex gap-2 mt-3" },
  V = { key: 1 },
  F = { class: "text-3xl font-bold mb-6" },
  L = { class: "mb-4" },
  P = t(
    "a",
    {
      href: "mailto:support@cConnect.com",
      class: "text-blue-500 hover:underline",
    },
    "support@cConnect.com",
    -1
  ),
  $ = { key: 2 },
  D = { class: "text-3xl font-bold mb-6" },
  H = { class: "mb-4" },
  M = t(
    "a",
    {
      href: "mailto:support@cConnect.com",
      class: "text-blue-500 hover:underline",
    },
    "support@cConnect.com",
    -1
  ),
  T = { class: "flex gap-2 mt-3" },
  Z = {
    __name: "InactiveAccount",
    props: { showit: Boolean, profile: Object },
    setup(r) {
      const l = v(),
        e = h(() => l.getters.translations);
      b(() => {
        localStorage.setItem("prevUrlPricingPlan", "inactive-account");
      });
      function d() {
        y(),
          l.commit("setUserVersion", 0),
          l.commit("profile/setProfile", {}),
          l.commit("setUserDetails", {}),
          k.Inertia.post("/logout");
      }
      return (q, z) => (
        c(),
        i(
          x,
          null,
          [
            a(m, null, {
              default: n(() => [
                a(
                  u(g),
                  { title: e.value && e.value.account_inactive },
                  null,
                  8,
                  ["title"]
                ),
                a(
                  f,
                  { showNewsFeed: !1, showit: r.showit, showSignUp: !1 },
                  null,
                  8,
                  ["showit"]
                ),
                t("div", j, [
                  a(
                    u(_),
                    { href: "/", class: "text-blue-500 hover:underline" },
                    {
                      default: n(() => [
                        s(
                          "\u2190 " + o(e.value && e.value.back_to_main_page),
                          1
                        ),
                      ]),
                      _: 1,
                    }
                  ),
                ]),
                r.profile.active_user === 1 &&
                r.profile.is_payment_verified === 0
                  ? (c(),
                    i("div", N, [
                      t("div", S, o(e.value && e.value.account_inactive), 1),
                      t(
                        "p",
                        B,
                        o(
                          e.value &&
                            e.value
                              .we_noticed_your_account_is_inactive_due_to_billing_issues
                        ) + ". ",
                        1
                      ),
                      t("p", C, [
                        s(
                          o(
                            e.value &&
                              e.value
                                .to_regain_access_please_update_your_billing_information
                          ) + " ",
                          1
                        ),
                        I,
                        s(". "),
                      ]),
                      t("div", U, [
                        a(
                          u(_),
                          {
                            href: "/pricing-plan",
                            style: w({
                              backgroundImage:
                                "linear-gradient( 111.4deg,rgba(7, 7, 9, 1) 6.5%, rgba(27, 24, 113, 1) 93.2% )",
                            }),
                            class:
                              "block w-full sm:w-40 flex items-center justify-center text-white font-semibold text-xl py-2 px-4 rounded transition transform duration-300 hover:shadow-lg active:scale-95 cursor-pointer",
                          },
                          {
                            default: n(() => [
                              s(o(e.value && e.value.billing), 1),
                            ]),
                            _: 1,
                          },
                          8,
                          ["style"]
                        ),
                        t(
                          "button",
                          {
                            onClick: d,
                            class:
                              "border-2 border-blue-rgba w-full sm:w-40 flex justify-center items-center text-blue-rgba font-bold text-xl py-2 px-4 uppercase rounded cursor-pointer transition transform duration-300 hover:shadow-lg active:scale-95",
                          },
                          o(e.value && e.value.close),
                          1
                        ),
                      ]),
                    ]))
                  : r.profile.active_user === 0 &&
                    r.profile.is_payment_verified === 1
                  ? (c(),
                    i("div", V, [
                      t(
                        "div",
                        F,
                        o(e.value && e.value.your_account_has_been_deactivated),
                        1
                      ),
                      t("p", L, [
                        s(o(e.value && e.value.close) + " ", 1),
                        P,
                        s(". "),
                      ]),
                      t(
                        "button",
                        {
                          onClick: d,
                          class:
                            "border-2 border-blue-rgba w-full sm:w-40 flex justify-center items-center text-blue-rgba font-bold text-xl py-2 px-4 uppercase rounded cursor-pointer transition transform duration-300 hover:shadow-lg active:scale-95",
                        },
                        o(e.value && e.value.close),
                        1
                      ),
                    ]))
                  : (c(),
                    i("div", $, [
                      t(
                        "div",
                        D,
                        o(
                          e.value &&
                            e.value
                              .it_appears_you_have_not_completed_the_registration_process
                        ),
                        1
                      ),
                      t("p", H, [
                        s(
                          o(
                            e.value &&
                              e.value
                                .if_you_have_any_questions_please_contact_our_support_team
                          ) + " ",
                          1
                        ),
                        M,
                        s(". "),
                      ]),
                      t("div", T, [
                        a(
                          u(_),
                          {
                            href: "/profile-setup",
                            class:
                              "block w-full sm:w-40 flex items-center justify-center text-white font-semibold text-xl py-2 px-4 rounded transition transform duration-300 hover:shadow-lg active:scale-95 cursor-pointer bg-[#16a34a]",
                          },
                          {
                            default: n(() => [
                              s(o(e.value && e.value.continue), 1),
                            ]),
                            _: 1,
                          }
                        ),
                        t(
                          "button",
                          {
                            onClick: d,
                            class:
                              "border-2 border-teal-green w-full sm:w-40 flex justify-center items-center text-teal-green font-bold text-xl py-2 px-4 uppercase rounded cursor-pointer transition transform duration-300 hover:shadow-lg active:scale-95",
                          },
                          o(e.value && e.value.close),
                          1
                        ),
                      ]),
                    ])),
              ]),
              _: 1,
            }),
            a(p, { showit: r.showit }, null, 8, ["showit"]),
          ],
          64
        )
      );
    },
  };
export { Z as default };
