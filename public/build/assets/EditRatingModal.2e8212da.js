import {
  u as H,
  r as c,
  p as K,
  a2 as M,
  c as p,
  w as b,
  K as f,
  s as $,
  a7 as z,
  d,
  f as o,
  t as v,
  h as y,
  l as S,
  v as J,
  x as W,
  e as x,
  j as Q,
  n as q,
  F as X,
  m as R,
} from "./app.907bb242.js";
import { _ as k } from "./InputError.a485c9eb.js";
import { S as Y, C as Z } from "./StarRatingEditable.6da32187.js";
import { C as tt } from "./CustomDialog.f5ff7c4f.js";
import "./iconify.99e09ef6.js";
import "./_plugin-vue_export-helper.cdc0426e.js";
const et = { class: "text-md font-bold mb-3 text-gray-600" },
  at = { class: "mb-4" },
  st = { class: "text-md font-bold text-gray-600 mt-3 mb-2" },
  ot = ["placeholder"],
  nt = { class: "text-md font-bold text-gray-600 mt-3 mb-2" },
  it = ["onClick"],
  ht = {
    __name: "EditRatingModal",
    props: {
      review: { type: Object },
      fromAdmin: { type: Boolean, default: !1 },
      questionsSwitch: { type: Array },
      contractorId: { type: Number },
      profileId: { type: Number },
    },
    setup(C, { expose: A }) {
      const {
          review: a,
          questionsSwitch: D,
          profileId: E,
          fromAdmin: V,
          contractorId: B,
        } = C,
        i = H(),
        r = c(""),
        l = c(""),
        s = K({
          rating: Number(parseFloat(a.rating).toFixed(1)),
          questionsSwitch: D,
          how_did_you_meet_this_contractor:
            a == null ? void 0 : a.how_did_you_meet_this_contractor,
          rating_text: a == null ? void 0 : a.rating_text,
        }),
        e = M(s),
        g = c(),
        F = [
          "cConnect Referral",
          "Friend Referral",
          "Other Contractor",
          "Job Site",
          "Store/Gas Station",
          "Other",
        ],
        _ = c(a.how_did_you_meet_this_contractor),
        I = p(() => i.state.ratings.loadingSending),
        N = p(() => i.state.ratings.disabledSending);
      b(
        () => e.rating.value,
        () => {
          r.value = "";
        }
      ),
        b(
          () => e.rating_text.value,
          () => {
            l.value = "";
          }
        );
      function O(t) {
        e.rating.value = t;
      }
      const T = (t) => {
          _.value = t;
        },
        j = (t) => {
          console.log(e.questionsSwitch.value[t].questionAnswer),
            (e.questionsSwitch.value[t].questionAnswer =
              e.questionsSwitch.value[t].questionAnswer === 1 ? 0 : 1);
        },
        G = () => {
          let t = !0;
          return (
            (r.value = ""),
            (l.value = ""),
            (e.rating.value <= 0 || e.rating.value > 5) &&
              ((r.value = "Rating should be greater than 0."), (t = !1)),
            (!e.rating_text.value || e.rating_text.value.trim() === "") &&
              ((l.value = "Rating reason should not be empty."), (t = !1)),
            t
          );
        },
        L = async () => {
          if ((console.log(g.value, "value1"), G())) {
            const t = {
              rating_text: z(e.rating_text),
              hired_by_contractor:
                e.questionsSwitch.value[0].questionAnswer === 1,
              paid_on_time: e.questionsSwitch.value[1].questionAnswer === 1,
              hired_contractor: e.questionsSwitch.value[2].questionAnswer === 1,
              give_full_payment:
                e.questionsSwitch.value[3].questionAnswer === 1,
              how_did_you_meet_this_contractor: _.value,
              rating: e.rating.value,
              reviewer_id: E,
              contractor_id: B,
            };
            await i.dispatch("ratings/updateReview", {
              reviewId: a.id,
              fromAdmin: V,
              review: t,
            }),
              g.value.closeDialog(),
              console.log("this executed1"),
              i.commit("ratings/setShouldLoadPosts", !1),
              i.commit("ratings/setShouldFetchPostsOnClose", !0);
          }
        };
      A({ openDialogEdit: () => g.value.openDialog() });
      const m = c(),
        P = (t) => {
          if (t.key === "Tab") {
            t.preventDefault();
            const u = t.target.selectionStart,
              n = t.target.selectionEnd;
            (s.rating_text =
              s.rating_text.substring(0, u) +
              "      " +
              s.rating_text.substring(n)),
              R(() => {
                t.target.selectionStart = t.target.selectionEnd = u + 6;
              });
          }
        },
        h = () => {
          console.log("here"),
            R(() => {
              (m.value.style.height = "auto"),
                (m.value.style.height = m.value.scrollHeight + "px");
            });
        },
        U = () => {
          h();
        };
      return (t, u) => (
        d(),
        f(
          tt,
          {
            submitText: "Save Changes",
            onSubmit: L,
            loading: I.value,
            onOpened: U,
            disabled: N.value,
            ref_key: "editDialogRef",
            ref: g,
            title: "Edit Rating",
          },
          {
            default: $(() => [
              o(
                "div",
                et,
                v(t.translations && t.translations.select_your_rating),
                1
              ),
              y(Y, { ratingGlobal: s.rating, "onUpdate:rating": O }, null, 8, [
                "ratingGlobal",
              ]),
              r.value
                ? (d(),
                  f(k, { key: 0, class: "mt-2", message: r.value }, null, 8, [
                    "message",
                  ]))
                : S("", !0),
              o("div", at, [
                o(
                  "div",
                  st,
                  v(t.translations && t.translations.review_text),
                  1
                ),
                J(
                  o(
                    "textarea",
                    {
                      id: "rating_text",
                      type: "text",
                      rows: 5,
                      class:
                        "mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm overflow-hidden",
                      required: "",
                      "onUpdate:modelValue":
                        u[0] || (u[0] = (n) => (s.rating_text = n)),
                      ref_key: "textRef",
                      ref: m,
                      onKeydown: P,
                      onInput: h,
                      onPaste: h,
                      placeholder:
                        t.translations &&
                        t.translations.type_reason_for_your_rating,
                    },
                    null,
                    40,
                    ot
                  ),
                  [[W, s.rating_text]]
                ),
                l.value
                  ? (d(),
                    f(k, { key: 0, class: "mt-2", message: l.value }, null, 8, [
                      "message",
                    ]))
                  : S("", !0),
              ]),
              (d(!0),
              x(
                X,
                null,
                Q(
                  s.questionsSwitch,
                  (n, w) => (
                    d(),
                    x(
                      "div",
                      {
                        key: w,
                        class: "flex items-center justify-between sm:w-96 mb-5",
                      },
                      [
                        o("div", nt, v(n.question), 1),
                        o(
                          "div",
                          { class: "switch", onClick: (lt) => j(w) },
                          [
                            o(
                              "div",
                              {
                                class: q([
                                  n.questionAnswer === 1
                                    ? "switch-bg-on"
                                    : "switch-bg-off",
                                ]),
                              },
                              [
                                o(
                                  "div",
                                  {
                                    class: q([
                                      n.questionAnswer === 1
                                        ? "switch-knob-on"
                                        : "switch-knob-off",
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
                          it
                        ),
                      ]
                    )
                  )
                ),
                128
              )),
              y(
                Z,
                {
                  options: F,
                  modelValue: _.value,
                  "onUpdate:modelValue": T,
                  label:
                    "{{translations && translations.how_did_you_meet_this_contractor}}",
                },
                null,
                8,
                ["modelValue"]
              ),
            ]),
            _: 1,
          },
          8,
          ["loading", "disabled"]
        )
      );
    },
  };
export { ht as default };
