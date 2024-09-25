import { _ } from "./SignUpLayout.9eb7bf4e.js";
import { _ as u, a as r } from "./WelcomeFooter.ba3aa8d4.js";
import {
  u as m,
  c as v,
  e as d,
  h as o,
  s as i,
  F as h,
  d as b,
  i as c,
  H as p,
  f as t,
  L as f,
  g as l,
  t as e,
} from "./app.907bb242.js";
import "./spanish.afd7e950.js";
import "./cConnectWord.60dc90ac.js";
import "./_plugin-vue_export-helper.cdc0426e.js";
import "./ResponsiveNavLink.04cb55a4.js";
import "./iconify.99e09ef6.js";
import "./DialogUpgradeToGoldPlatinum.8daf4ac5.js";
import "./CustomDialog.f5ff7c4f.js";
import "./tContractorWhite.08eee911.js";
const g = { class: "mb-3 sm:mb-6" },
  x = { class: "text-3xl font-bold mb-6" },
  w = { class: "mb-4" },
  y = { class: "mb-6 closing" },
  k = { class: "text-xl font-semibold mb-2" },
  B = { class: "mb-2" },
  N = { class: "mb-6 closing" },
  S = { class: "text-xl font-semibold mb-2" },
  F = { class: "mb-2" },
  V = { class: "mb-6 closing" },
  $ = { class: "text-xl font-semibold mb-2" },
  q = { class: "mb-2" },
  H = { class: "mb-6 closing" },
  L = { class: "text-xl font-semibold mb-2" },
  T = { class: "mb-2" },
  A = { href: "/privacy-policy", class: "text-blue-rgba font-bold" },
  C = { class: "mb-6 closing" },
  D = { class: "text-xl font-semibold mb-2" },
  E = { class: "mb-2" },
  U = { class: "mb-6 closing" },
  j = { class: "text-xl font-semibold mb-2" },
  z = { class: "mb-2" },
  G = { class: "mb-6 closing" },
  I = { class: "text-xl font-semibold mb-2" },
  J = { class: "mb-2" },
  K = { class: "mb-6 closing" },
  M = { class: "text-xl font-semibold mb-2" },
  O = { class: "mb-2" },
  P = { class: "mb-6 closing" },
  Q = { class: "text-xl font-semibold mb-2" },
  R = { class: "mb-2" },
  W = t(
    "a",
    { href: "mailto:cConnect@gmail.com", class: "text-blue-rgba font-bold" },
    "cConnect@gmail.com",
    -1
  ),
  us = {
    __name: "TermsAndServices",
    props: { showit: Boolean },
    setup(a) {
      const n = m(),
        s = v(() => n.getters.translations);
      return (X, Y) => (
        b(),
        d(
          h,
          null,
          [
            o(_, null, {
              default: i(() => [
                o(
                  c(p),
                  { title: s.value && s.value.terms_of_service },
                  null,
                  8,
                  ["title"]
                ),
                o(
                  r,
                  { showNewsFeed: !0, showit: a.showit, showSignUp: !0 },
                  null,
                  8,
                  ["showit"]
                ),
                t("div", g, [
                  o(
                    c(f),
                    { href: "/", class: "text-blue-500 hover:underline" },
                    {
                      default: i(() => [
                        l(
                          "\u2190 " + e(s.value && s.value.back_to_main_page),
                          1
                        ),
                      ]),
                      _: 1,
                    }
                  ),
                ]),
                t("div", x, e(s.value && s.value.terms_of_service), 1),
                t("p", w, e(s.value && s.value.tos_agreement), 1),
                t("section", y, [
                  t("h2", k, e(s.value && s.value.description_of_service), 1),
                  t(
                    "p",
                    B,
                    e(s.value && s.value.tcontractor_platform_description),
                    1
                  ),
                ]),
                t("section", N, [
                  t(
                    "h2",
                    S,
                    e(s.value && s.value.registration_and_account_security),
                    1
                  ),
                  t(
                    "p",
                    F,
                    e(s.value && s.value.user_registration_requirements),
                    1
                  ),
                ]),
                t("section", V, [
                  t("h2", $, e(s.value && s.value.user_conduct), 1),
                  t("p", q, [
                    l(e(s.value && s.value.site_usage_restrictions) + " ", 1),
                    t("ul", null, [
                      t(
                        "li",
                        null,
                        e(s.value && s.value.post_upload_distribute),
                        1
                      ),
                      t(
                        "li",
                        null,
                        e(s.value && s.value.violate_legal_rights),
                        1
                      ),
                      t(
                        "li",
                        null,
                        e(s.value && s.value.exploit_harm_minors),
                        1
                      ),
                      t(
                        "li",
                        null,
                        e(s.value && s.value.transmit_viruses_malware),
                        1
                      ),
                      t(
                        "li",
                        null,
                        e(s.value && s.value.engage_in_disruptive_activities),
                        1
                      ),
                    ]),
                  ]),
                ]),
                t("section", H, [
                  t("h2", L, e(s.value && s.value.privacy), 1),
                  t("p", T, [
                    l(e(s.value && s.value.privacy_policy_governed), 1),
                    t("a", A, e(s.value && s.value.this_page), 1),
                    l("."),
                  ]),
                ]),
                t("section", C, [
                  t("h2", D, e(s.value && s.value.payment), 1),
                  t("p", E, e(s.value && s.value.financial_transactions), 1),
                ]),
                t("section", U, [
                  t("h2", j, e(s.value && s.value.termination), 1),
                  t("p", z, e(s.value && s.value.account_termination), 1),
                ]),
                t("section", G, [
                  t("h2", I, e(s.value && s.value.disclaimers), 1),
                  t("p", J, e(s.value && s.value.no_guarantee_reliability), 1),
                ]),
                t("section", K, [
                  t("h2", M, e(s.value && s.value.limitation_of_liability), 1),
                  t("p", O, e(s.value && s.value.liability_limitation), 1),
                ]),
                t("section", P, [
                  t("h2", Q, e(s.value && s.value.contact_us), 1),
                  t("p", R, [
                    l(e(s.value && s.value.tos_questions_contact) + " ", 1),
                    W,
                  ]),
                ]),
              ]),
              _: 1,
            }),
            o(u, { showit: a.showit }, null, 8, ["showit"]),
          ],
          64
        )
      );
    },
  };
export { us as default };
