import { a as r, _ as c } from "./WelcomeFooter.ba3aa8d4.js";
import { P as u } from "./PricingVersions.c166986b.js";
import {
  u as m,
  c as d,
  e as a,
  h as s,
  i as n,
  f as t,
  s as x,
  t as o,
  l as v,
  F as h,
  n as p,
  d as _,
  H as b,
  g as f,
  L as g,
} from "./app.907bb242.js";
import { M as w } from "./MoveToTop.8193f768.js";
import "./spanish.afd7e950.js";
import "./cConnectWord.60dc90ac.js";
import "./_plugin-vue_export-helper.cdc0426e.js";
import "./ResponsiveNavLink.04cb55a4.js";
import "./iconify.99e09ef6.js";
import "./DialogUpgradeToGoldPlatinum.8daf4ac5.js";
import "./CustomDialog.f5ff7c4f.js";
import "./cConnectWhite.08eee911.js";
import "./freebox.8421bda3.js";
const k = {
    key: 0,
    class: p(
      "pt-20 sm:pt-28 pb-2  flex sm:justify-center items-center bg-white   bg-gray-100 "
    ),
  },
  y = {
    class:
      "container max-w-7xl max-sm:px-1 sm:px-6 py-2 mx-auto overflow-hidden sm:rounded-lg",
  },
  N = { class: "mb-2 sm:mb-2" },
  j = {
    class:
      "xl:container bg-white md:mx-auto px-2 py-4 sm:p-6 shadow-md rounded-lg",
  },
  V = { id: "powerfull tool", class: "" },
  B = { class: "flex justify-center" },
  C = {
    class:
      "text-3xl font-bold mb-4 text-center text-blue-rgba border-b-2 border-black",
  },
  P = {
    class:
      "flex max-md:flex-col max-md:flex-row-reverse gap-2 sm:gap-4 sm:mt-4",
  },
  F = { class: "md:w-[50%] max-md:mb-4" },
  S = {
    class: "text-xl sm:text-2xl font-semibold tracking-tighter list-disc pl-8",
  },
  T = { class: "md:w-[50%] text-center" },
  H = { class: "text-3xl font-bold text-blue-rgba mb-1" },
  L = { class: "text-2xl font-bold mb-1 text-orange-accent" },
  M = { class: "text-xl mb-1 text-blue-rgba font-bold" },
  $ = { class: "text-sm mb-1 text-xl" },
  z = { class: "text-xl text-blue-rgba font-bold" },
  A = { class: "mx-auto text-3xl font-bold text-red-600 max-w-[418px]" },
  D = { class: "text-xl" },
  E = { class: "mx-auto text-xl font-bold text-orange-accent w-[17rem] text" },
  oe = {
    __name: "PricingPage",
    props: { showit: Boolean },
    setup(l) {
      const i = m(),
        e = d(() => i.getters.translations);
      return (O, U) => (
        _(),
        a(
          h,
          null,
          [
            s(n(b), { title: e.value && e.value.pricing }, null, 8, ["title"]),
            e.value && Object.keys(e.value).length > 0
              ? (_(),
                a("div", k, [
                  t("div", y, [
                    s(
                      r,
                      { showNewsFeed: !0, showit: l.showit, showSignUp: !0 },
                      null,
                      8,
                      ["showit"]
                    ),
                    t("div", N, [
                      s(
                        n(g),
                        { href: "/", class: "text-blue-500 hover:underline" },
                        {
                          default: x(() => [
                            f(
                              "\u2190 " +
                                o(e.value && e.value.back_to_main_page),
                              1
                            ),
                          ]),
                          _: 1,
                        }
                      ),
                    ]),
                    t("div", j, [
                      t("section", V, [
                        t("div", B, [
                          t(
                            "span",
                            C,
                            o(
                              e.value &&
                                e.value.the_most_powerful_tool_in_the_toolbox
                            ),
                            1
                          ),
                        ]),
                        t("div", P, [
                          t("div", F, [
                            t("ul", S, [
                              t(
                                "li",
                                null,
                                o(
                                  e.value &&
                                    e.value.find_local_or_statewide_subs
                                ) + "! ",
                                1
                              ),
                              t(
                                "li",
                                null,
                                o(
                                  e.value && e.value.hire_someone_you_can_trust
                                ),
                                1
                              ),
                              t(
                                "li",
                                null,
                                o(
                                  e.value &&
                                    e.value.looking_for_work_check_news_feed
                                ),
                                1
                              ),
                              t(
                                "li",
                                null,
                                o(
                                  e.value &&
                                    e.value.advertise_your_business_for_free
                                ),
                                1
                              ),
                              t(
                                "li",
                                null,
                                o(e.value && e.value.got_a_job_to_be_done),
                                1
                              ),
                              t(
                                "li",
                                null,
                                o(e.value && e.value.got_a_job_to_be_done),
                                1
                              ),
                              t(
                                "li",
                                null,
                                o(
                                  e.value &&
                                    e.value.want_to_know_whats_happening
                                ),
                                1
                              ),
                              t(
                                "li",
                                null,
                                o(
                                  e.value &&
                                    e.value.new_customer_can_you_trust_them
                                ),
                                1
                              ),
                            ]),
                          ]),
                          t("div", T, [
                            t(
                              "h1",
                              H,
                              o(e.value && e.value.its_a_game_changer),
                              1
                            ),
                            t(
                              "h2",
                              L,
                              o(
                                e.value &&
                                  e.value
                                    .for_contractors_and_subcontractors_only
                              ),
                              1
                            ),
                            t(
                              "p",
                              M,
                              o(e.value && e.value.no_brainer_pricing),
                              1
                            ),
                            t(
                              "p",
                              $,
                              o(e.value && e.value.contractors_trying_to_sell),
                              1
                            ),
                            t(
                              "p",
                              z,
                              o(e.value && e.value.not_here_at_cConnect),
                              1
                            ),
                            t(
                              "h3",
                              A,
                              o(e.value && e.value.important_tool_for_free),
                              1
                            ),
                            t(
                              "p",
                              D,
                              o(e.value && e.value.for_basic_services),
                              1
                            ),
                            t(
                              "p",
                              E,
                              " And, " +
                                o(e.value && e.value.few_bucks_more_benefits),
                              1
                            ),
                          ]),
                        ]),
                      ]),
                    ]),
                    s(u, { pageName: "pricing" }),
                  ]),
                ]))
              : v("", !0),
            s(c, { showit: l.showit }, null, 8, ["showit"]),
            s(w, { scrollableContainer: "app" }),
          ],
          64
        )
      );
    },
  };
export { oe as default };
