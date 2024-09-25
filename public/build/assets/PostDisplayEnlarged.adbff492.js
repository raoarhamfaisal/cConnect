import {
  d as a,
  e as d,
  F as M,
  j as G,
  y as q,
  f as o,
  n as C,
  t as g,
  l as I,
  r as v,
  w as j,
  h as r,
  i as W,
  v as X,
  z as me,
  u as ue,
  c as K,
  I as S,
  K as L,
  s as E,
  k as Re,
  x as se,
  T as re,
  a7 as Ce,
  m as te,
  D as De,
  o as fe,
  g as pe,
  a4 as gt,
  a5 as pt,
  J as Ve,
  aj as ht,
  X as H,
  A as de,
  B as F,
  ak as Ae,
  Z as le,
  R as vt,
  a as _t,
  U as ze,
  V as qe,
  Y as ie,
  _ as jt,
  L as yt,
  a0 as we,
  ag as Ne,
  q as Ut,
} from "./app.907bb242.js";
import { A as Ge } from "./Avatar.72f6a2c8.js";
import { t as xt } from "./cConnectWord.60dc90ac.js";
import { L as $e } from "./Loader.9dfd413c.js";
import { I as V } from "./iconify.99e09ef6.js";
import {
  a as Ht,
  V as Ft,
  p as Lt,
  b as Mt,
  c as Bt,
  d as Nt,
  e as Wt,
  f as Vt,
  g as zt,
  h as qt,
  M as Gt,
  B as Kt,
  _ as Xt,
} from "./filepond-plugin-file-poster.b4b2d2f1.js";
import { _ as Jt } from "./InputLabel.c691f6db.js";
import { _ as Ie } from "./InputError.a485c9eb.js";
import { _ as ce } from "./_plugin-vue_export-helper.cdc0426e.js";
import { S as Yt } from "./SelectProfile.a00d96e3.js";
import { C as ne } from "./CustomDialog.f5ff7c4f.js";
import { B as Zt } from "./Badge.c427ce3e.js";
import { o as Qt } from "./selectListsHelpters.6d73b684.js";
import { C as je } from "./Card.0c51827f.js";
import { _ as es } from "./ContractorRating.3006b2c1.js";
const iu = {
  props: { showSpinText: Boolean },
  template: `
        <div class="flex justify-around mt-4 mt-2 max-w-2xl">
            <div class="loader"></div>
            <div v-if="showSpinText">
                <slot />
            </div>
        </div>
    `,
};
const ts = {
    name: "stars-rating",
    components: {},
    props: {
      rating: { type: Number, default: 4.7 },
      starWidth: { type: Number, default: 24 },
      innerStarRadius: { type: Number, default: 13 },
      starHeight: { type: Number, default: 24 },
      starStyle: { type: Object },
      isIndicatorActive: { type: Boolean, default: !0 },
      indicatorClasses: { type: String, default: "" },
    },
    data: function () {
      return {
        stars: [],
        emptyStar: 0,
        fullStar: 1,
        totalStars: 5,
        styleEmptyStarColor: "#737373",
        styleFullStarColor: "#ed8a19",
      };
    },
    directives: {},
    computed: {
      styleStarWidth() {
        return this.starWidth;
      },
      styleStarHeight() {
        return this.starHeight;
      },
      getStarPoints() {
        let e = this.styleStarWidth / 2,
          t = this.styleStarWidth / 2,
          s = 5,
          n = this.styleStarWidth / s,
          i = n * 2.5;
        return this.calcStarPoints(e, t, s, n, i);
      },
    },
    watch: {
      rating(e) {
        this.initStars(), this.setStars();
      },
    },
    methods: {
      calcStarPoints(e, t, s, n, l) {
        let i = Math.PI / s,
          m = 60,
          f = s * 2,
          w = "";
        for (let p = 0; p < f; p++) {
          let u = p % 2 == 0 ? l : n,
            b = e + Math.cos(p * i + m) * u,
            _ = t + Math.sin(p * i + m) * u;
          w += b + "," + _ + " ";
        }
        return w;
      },
      initStars() {
        this.stars = [];
        let e = this.innerStarRadius,
          t = 20,
          s = 20,
          n = 20;
        for (let l = 0; l < this.totalStars; l++) {
          let i = l * 72 * (Math.PI / 180),
            m = t + e * Math.cos(i),
            f = s + e * Math.sin(i),
            w = l * 72 + n;
          this.stars.push({
            raw: this.emptyStar,
            percent: this.emptyStar + "%",
            x: m,
            y: f,
            rotation: w,
          });
        }
      },
      setStars() {
        let e = Math.floor(this.rating);
        for (let t = 0; t < this.stars.length; t++)
          if (e !== 0)
            (this.stars[t].raw = this.fullStar),
              (this.stars[t].percent = this.calcStarFullness(this.stars[t])),
              e--;
          else {
            let s = Math.round((this.rating % 1) * 10) / 10;
            s === 0.1 && (s = s + 0.15),
              s === 0.2 && (s = s + 0.1),
              s === 0.3 && (s = s + 0.05),
              s === 0.9 && (s = s - 0.15),
              s === 0.8 && (s = s - 0.1),
              s === 0.7 && (s = s - 0.05);
            let n = Math.round(s * 10) / 10;
            return (
              (this.stars[t].raw = n),
              (this.stars[t].percent = this.calcStarFullness(this.stars[t]))
            );
          }
      },
      getFullFillColor(e) {
        return e.raw !== this.emptyStar
          ? this.styleFullStarColor
          : this.styleEmptyStarColor;
      },
      calcStarFullness(e) {
        return e.raw * 100 + "%";
      },
      setNestedConfigStyles(e) {
        if (typeof e == "object")
          for (let t in e) {
            let s =
              "style" + t.charAt(0).toUpperCase() + t.substring(1, t.length);
            this[s] = e[t];
          }
      },
    },
    created() {
      this.setNestedConfigStyles(this.starStyle),
        this.initStars(),
        this.setStars();
    },
  },
  ss = ["aria-label"],
  os = ["width", "height"],
  ls = ["points"],
  is = ["id"],
  ns = ["offset", "stop-color"],
  as = ["offset", "stop-color"],
  rs = ["offset", "stop-color"],
  ds = ["stop-color"];
function us(e, t, s, n, l, i) {
  return (
    a(),
    d(
      "div",
      {
        class: "star-rating",
        "aria-label": s.rating + " of 5",
        style: { transform: "rotate(55deg)" },
      },
      [
        (a(!0),
        d(
          M,
          null,
          G(
            e.stars,
            (m, f) => (
              a(),
              d(
                "div",
                {
                  key: f,
                  class: "star-container",
                  style: q({
                    left: m.x + "px",
                    top: m.y + "px",
                    transform: `translate(-50%, -50%) rotate(${m.rotation}deg)`,
                  }),
                },
                [
                  (a(),
                  d(
                    "svg",
                    {
                      class: "star-svg",
                      width: i.styleStarWidth,
                      height: i.styleStarHeight,
                      style: q([{ fill: `url(#gradient${m.raw})` }]),
                      "aria-hidden": "true",
                    },
                    [
                      o(
                        "polygon",
                        {
                          points: i.getStarPoints,
                          style: { "fill-rule": "nonzero" },
                        },
                        null,
                        8,
                        ls
                      ),
                      o("defs", null, [
                        o(
                          "linearGradient",
                          { id: `gradient${m.raw}` },
                          [
                            o(
                              "stop",
                              {
                                id: "stop1",
                                offset: m.percent,
                                "stop-opacity": "1",
                                "stop-color": i.getFullFillColor(m),
                              },
                              null,
                              8,
                              ns
                            ),
                            o(
                              "stop",
                              {
                                id: "stop2",
                                offset: m.percent,
                                "stop-opacity": "0",
                                "stop-color": i.getFullFillColor(m),
                              },
                              null,
                              8,
                              as
                            ),
                            o(
                              "stop",
                              {
                                id: "stop3",
                                offset: m.percent,
                                "stop-opacity": "1",
                                "stop-color": e.styleEmptyStarColor,
                              },
                              null,
                              8,
                              rs
                            ),
                            o(
                              "stop",
                              {
                                id: "stop4",
                                offset: "100%",
                                "stop-opacity": "1",
                                "stop-color": e.styleEmptyStarColor,
                              },
                              null,
                              8,
                              ds
                            ),
                          ],
                          8,
                          is
                        ),
                      ]),
                    ],
                    12,
                    os
                  )),
                ],
                4
              )
            )
          ),
          128
        )),
        s.isIndicatorActive
          ? (a(),
            d(
              "div",
              {
                key: 0,
                class: C(
                  `indicator font-mono font-semibold flex justify-center items-center ${s.indicatorClasses} text-xl `
                ),
                style: q({ transform: "translateY(2px)" }),
              },
              g(s.rating),
              7
            ))
          : I("", !0),
      ],
      8,
      ss
    )
  );
}
const bt = ce(ts, [
  ["render", us],
  ["__scopeId", "data-v-11e03e18"],
]);
const cs = ["src"],
  ms = {
    key: 1,
    class:
      "object-contain w-full h-full rounded-full flex items-center justify-center bg-gray-400",
  },
  fs = { class: "overlay-icon" },
  gs = { class: "flex flex-row justify-between items-center" },
  ps = { class: "" },
  hs = {
    __name: "AvatarWithIcon",
    props: {
      imageSrc: { type: String },
      imageClass: { type: String, default: "" },
      icon: { type: String, default: "" },
      iconRotate: { type: Number },
      iconColorClass: { type: String },
    },
    setup(e) {
      const t = e,
        s = v(!1),
        n = () => {
          s.value = !0;
        };
      return (
        j(
          () => t.imageSrc,
          (l) => {
            l && (s.value = !1);
          }
        ),
        (l, i) => (
          a(),
          d(
            "div",
            {
              class: C(
                `relative flex justify-center items-center ${
                  e.imageClass ? e.imageClass : "w-14 h-14 sm:h-20 sm:w-20"
                } inline-block  `
              ),
            },
            [
              e.imageSrc && !s.value
                ? (a(),
                  d(
                    "img",
                    {
                      key: 0,
                      class: C(
                        "object-contain w-full border-2 border-gray-300  h-full rounded-full"
                      ),
                      src: e.imageSrc,
                      alt: "avatar",
                      onError: n,
                    },
                    null,
                    40,
                    cs
                  ))
                : (a(),
                  d("div", ms, [
                    r(W(V), {
                      icon: "fluent-mdl2:contact",
                      color: "white",
                      width: "24",
                    }),
                  ])),
              X(
                o(
                  "div",
                  fs,
                  [
                    o("div", gs, [
                      o("div", ps, [
                        r(
                          W(V),
                          {
                            icon: e.icon,
                            class: C(e.iconColorClass),
                            rotate: e.iconRotate,
                            width: "25",
                          },
                          null,
                          8,
                          ["icon", "class", "rotate"]
                        ),
                      ]),
                    ]),
                  ],
                  512
                ),
                [[me, e.icon]]
              ),
            ],
            2
          )
        )
      );
    },
  },
  vs = ce(hs, [["__scopeId", "data-v-e9a3a3a9"]]),
  _s = {
    class: "cursor-pointer flex justify-start items-start flex-none w=16",
  },
  ys = { class: "block" },
  xs = { class: "flex flex-col justify-center ml-1" },
  bs = {
    class: "font-bold text-lg sm:text-xl",
    style: { "line-height": "1.5rem" },
  },
  ks = { class: "" },
  We = {
    __name: "LikedUser",
    props: { user: Object, liked: { default: !1, type: Boolean } },
    setup(e) {
      const t = ue(),
        s = K(() => t.getters.screenWidth);
      return (n, l) => {
        const i = S("Link");
        return (
          a(),
          L(
            i,
            {
              href: `/contractor/${e.user.user_id}`,
              class: "flex flex-row gap-2 justify-start items-center",
            },
            {
              default: E(() => [
                o("div", _s, [
                  o("div", ys, [
                    r(
                      vs,
                      {
                        icon: "emojione-monotone:up-arrow",
                        style: q({
                          width: s.value >= 640 ? "4.5rem" : "3.7rem",
                          height: s.value >= 640 ? "4.5rem" : "3.7rem",
                        }),
                        imageSrc: e.user.user_avatar || e.user.company_logo,
                        iconRotate: e.liked ? 0 : 2,
                        iconColorClass: e.liked
                          ? "text-[#16a34a]"
                          : "text-[#c40516]",
                      },
                      null,
                      8,
                      ["style", "imageSrc", "iconRotate", "iconColorClass"]
                    ),
                  ]),
                ]),
                o("div", xs, [
                  o("h2", bs, g(e.user.first_name + " " + e.user.last_name), 1),
                  o("div", ks, g(e.user.company_name), 1),
                ]),
              ]),
              _: 1,
            },
            8,
            ["href"]
          )
        );
      };
    },
  },
  ws = ["onSubmit"],
  Cs = { class: "mb-4" },
  Is = ["placeholder"],
  Ts = { class: "text-white" },
  kt = {
    __name: "EditCommentModal",
    props: {
      commentText: String,
      commentId: [String, Number],
      isReply: { default: !1, type: Boolean },
    },
    setup(e, { expose: t }) {
      const { commentText: s, commentId: n, isReply: l } = e,
        i = ue(),
        m = v(s),
        f = v(),
        w = v(!1),
        p = v(""),
        k = K(() => i.state.ratings.loadingSending),
        u = K(() => i.state.ratings.disabledSending),
        b = K(() => i.state.ratings.loadingComment),
        _ = K(() => i.state.ratings.translations);
      j(
        () => m.value,
        () => {
          p.value = "";
        }
      ),
        j(
          () => s,
          () => {
            m.value = s;
          }
        ),
        j(
          () => k.value,
          (O) => {
            O || (console.log(O, "commentloadig sending"), (w.value = !1));
          }
        );
      const x = () => {
          let O = !0;
          return (
            (p.value = ""),
            (!m.value || m.value.trim() === "") &&
              ((p.value = `${
                l ? _ && _.reply_first_cap : "Comment"
              } should not be empty.`),
              (O = !1)),
            O
          );
        },
        h = async () => {
          if (x()) {
            i.commit("ratings/setLoadingComment", !0);
            let O;
            (O = { body: Ce(m), commentId: n, isReply: l }),
              i.dispatch("ratings/updateComment", { updatedComment: O }),
              f.value.closeDialog();
          }
        };
      t({ openDialogEdit: () => f.value.openDialog() });
      const y = v(),
        $ = (O) => {
          if (O.key === "Tab") {
            O.preventDefault();
            const U = O.target.selectionStart,
              J = O.target.selectionEnd;
            (m.value =
              m.value.substring(0, U) + "      " + m.value.substring(J)),
              te(() => {
                O.target.selectionStart = O.target.selectionEnd = U + 6;
              });
          }
        },
        c = () => {
          console.log("here"),
            te(() => {
              (y.value.style.height = "auto"),
                (y.value.style.height = y.value.scrollHeight + "px");
            });
        },
        D = () => {
          (w.value = !0), console.log("dialog opened"), c();
        };
      return (O, U) => {
        const J = S("v-progress-linear"),
          Y = S("v-dialog");
        return (
          a(),
          d(
            M,
            null,
            [
              (a(),
              L(re, { to: "body" }, [
                r(
                  ne,
                  {
                    submitText: _.value && _.value.update,
                    onSubmit: h,
                    ref_key: "dialogRef",
                    ref: f,
                    onOpened: D,
                    loading: k.value,
                    disabled: u.value,
                    title: `${_.value && _.value.edit} ${
                      e.isReply
                        ? _.value && _.value.reply_first_cap
                        : _.value && _.value.comment
                    }`,
                  },
                  {
                    default: E(() => [
                      o(
                        "form",
                        { onSubmit: Re(h, ["prevent"]) },
                        [
                          o("div", Cs, [
                            X(
                              o(
                                "textarea",
                                {
                                  id: "commentText",
                                  type: "text",
                                  rows: 1,
                                  class:
                                    "mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm overflow-hidden",
                                  required: "",
                                  "onUpdate:modelValue":
                                    U[0] || (U[0] = (Z) => (m.value = Z)),
                                  ref_key: "textRef",
                                  ref: y,
                                  onKeydown: $,
                                  onInput: c,
                                  onPaste: c,
                                  placeholder:
                                    _.value && _.value.type_your_response_text,
                                },
                                null,
                                40,
                                Is
                              ),
                              [[se, m.value]]
                            ),
                            p.value
                              ? (a(),
                                L(
                                  Ie,
                                  { key: 0, class: "mt-2", message: p.value },
                                  null,
                                  8,
                                  ["message"]
                                ))
                              : I("", !0),
                          ]),
                        ],
                        40,
                        ws
                      ),
                    ]),
                    _: 1,
                  },
                  8,
                  ["submitText", "loading", "disabled", "title"]
                ),
              ])),
              w.value
                ? (a(),
                  L(
                    Y,
                    {
                      key: 0,
                      class: "dialog-modal",
                      modelValue: b.value,
                      "onUpdate:modelValue":
                        U[1] || (U[1] = (Z) => (b.value = Z)),
                      scrim: "transparent",
                      persistent: "",
                      width: "auto",
                    },
                    {
                      default: E(() => [
                        r(
                          je,
                          {
                            shadowLevel: 2,
                            bgColor: "#364fc7",
                            padding: O.screenWidth < 640 ? "7px" : "10px",
                          },
                          {
                            default: E(() => [
                              o(
                                "div",
                                Ts,
                                g(_.value && _.value.updating) +
                                  " " +
                                  g(
                                    e.isReply
                                      ? _.value && _.value.reply_first_cap
                                      : _.value && _.value.comment
                                  ) +
                                  "... ",
                                1
                              ),
                              r(J, {
                                indeterminate: "",
                                color: "#fff",
                                class: "mb-0",
                              }),
                            ]),
                            _: 1,
                          },
                          8,
                          ["padding"]
                        ),
                      ]),
                      _: 1,
                    },
                    8,
                    ["modelValue"]
                  ))
                : I("", !0),
            ],
            64
          )
        );
      };
    },
  };
const Ss = {
    class:
      "flex flex-row gap-1 sm:gap-2 justify-start items-start transition-all duration-1000 transitioning",
  },
  Es = { class: "block" },
  Ps = { class: "flex flex-col justify-center sm:ml-1" },
  Os = { class: "flex gap-1 sm:gap-2" },
  Rs = { class: "bg-[#f0f2f5] rounded-[18px] px-3 py-2" },
  $s = { class: "text-sm", style: { "white-space": "pre-wrap" } },
  Ds = {
    key: 0,
    class:
      "hover:opacity-100 hover:pointer-events-auto cursor-pointer self-center",
  },
  As = {
    class:
      "text-xs flex gap-2 x350:gap-3 xs:gap-4 items-center mt-[3px] ml-3 text-[#65676B]",
  },
  js = {
    class:
      "font-medium text-xs text-blue-800 flex flex-row justify-between items-center cursor-pointer",
  },
  Us = {
    class: "translate-y-[0.5px] md:translate-y-[1px]",
    style: { "font-size": "12px" },
  },
  Hs = {
    class:
      "font-medium flex flex-row justify-between items-center text-xs text-blue-800 cursor-pointer",
  },
  Fs = {
    style: { "font-size": "12px" },
    class: "translate-y-[0.5px] md:translate-y-[1px]",
  },
  Ls = { class: "font-bold text-sm cursor-pointer" },
  Ms = { class: "" },
  Bs = {
    class: "section_text-lg font-bold sm:pl-6 section_text-gray-800 mt-3 mb-2",
  },
  Ns = {
    __name: "Reply",
    props: { reply: Object },
    emits: ["openDislikedUserModal", "openlikedUserModal"],
    setup(e, { emit: t }) {
      var oe, ge, A, xe, he, ve;
      const s = e,
        n = ue(),
        l = v(!1),
        i = v(),
        m = v(
          (ge = (oe = s.reply) == null ? void 0 : oe.likes_count) != null
            ? ge
            : 0
        ),
        f = v(
          (xe = (A = s.reply) == null ? void 0 : A.dislikes_count) != null
            ? xe
            : 0
        ),
        w = v(!1);
      v(!1);
      const p = v(!1),
        k = v(
          (ve = (he = s.reply) == null ? void 0 : he.user_reaction) != null
            ? ve
            : ""
        ),
        u = v(),
        b = v(!1),
        _ = v(!1),
        h = De().props.value.profile.user_id,
        R = K(() => n.getters.screenWidth),
        y = K(() => n.getters.translations),
        $ = () => {
          u.value.openDialogEdit();
        },
        c = () => {
          i.value.openDialog();
        };
      j(
        () => p.value,
        (T) => {
          T && (b.value = !1);
        }
      ),
        j(
          () => {
            var T;
            return (T = s.reply) == null ? void 0 : T.likes_count;
          },
          (T) => {
            T !== void 0 && (m.value = T);
          }
        ),
        j(
          () => {
            var T;
            return (T = s.reply) == null ? void 0 : T.dislikes_count;
          },
          (T) => {
            T !== void 0 && (f.value = T);
          }
        ),
        j(
          () => {
            var T;
            return (T = s.reply) == null ? void 0 : T.user_reaction;
          },
          (T) => {
            console.log(T, "user_reaction"), T !== void 0 && (k.value = T);
          }
        ),
        j(
          () => m.value,
          (T) => {
            let B;
            (B = {
              ...s.reply,
              likes_count: m.value,
              dislikes_count: f.value,
              user_reaction: k.value,
            }),
              n.commit("profile/setPostReply", B);
          }
        ),
        j(
          () => f.value,
          (T) => {
            let B;
            (B = {
              ...s.reply,
              likes_count: m.value,
              dislikes_count: f.value,
              user_reaction: k.value,
            }),
              n.commit("profile/setPostReply", B);
          }
        ),
        j(
          () => k.value,
          (T) => {
            let B;
            (B = {
              ...s.reply,
              likes_count: m.value,
              dislikes_count: f.value,
              user_reaction: k.value,
            }),
              n.commit("profile/setPostReply", B);
          }
        ),
        fe(() => {
          l.value = !0;
        });
      const D = async () => {
          w.value = !0;
          try {
            const T = await axios.delete(`/api/comments/${s.reply.id}`, H());
            T.data &&
              (de(T.data.message || "Comment successfully deleted"),
              n.commit("profile/setReplyId", s.reply.id));
          } catch (T) {
            console.log(T), F(T.response.data.message, "inherit");
          } finally {
            (w.value = !1), i.value.closeDialog();
          }
        },
        O = async () => {
          if (!k.value || k.value === "dislike") {
            (m.value = m.value + 1),
              k.value === "dislike" && (f.value = f.value - 1),
              (k.value = "like");
            try {
              (await axios.post(`/api/comments/${s.reply.id}/like`, {}, H()))
                .data;
            } catch {
              F();
            }
          } else if (k.value === "like") {
            (m.value = m.value - 1), (k.value = null);
            try {
              (await axios.delete(`/api/comments/${s.reply.id}/like`, H()))
                .data;
            } catch {
              F();
            }
          }
        },
        U = async () => {
          if (!k.value || k.value === "like") {
            (f.value = f.value + 1),
              k.value === "like" && (m.value = m.value - 1),
              (k.value = "dislike");
            try {
              (await axios.post(`/api/comments/${s.reply.id}/dislike`, {}, H()))
                .data;
            } catch {
              F();
            }
          } else if (k.value === "dislike") {
            (f.value = f.value - 1), (k.value = null);
            try {
              (await axios.delete(`/api/comments/${s.reply.id}/dislike`, H()))
                .data;
            } catch {
              F();
            }
          }
        },
        J = () => {
          _.value = !0;
        },
        Y = () => {
          t("openLikedUserModal", !0, s.reply.id);
        },
        Z = () => {
          t("openDislikedUserModal", !0, s.reply.id);
        };
      return (T, B) => {
        var Se, Le, Me, Ee, Pe;
        const Q = S("Link"),
          _e = S("v-tooltip"),
          ae = S("v-list-item-title"),
          He = S("v-list-item"),
          Te = S("v-list"),
          Fe = S("v-menu");
        return (
          a(),
          d(
            M,
            null,
            [
              o("div", Ss, [
                r(
                  Q,
                  {
                    href: `/contractor/${e.reply.user_id}`,
                    class:
                      "cursor-pointer flex justify-start items-start flex-none w=16 mt-[2px]",
                  },
                  {
                    default: E(() => [
                      o("div", Es, [
                        r(
                          Ge,
                          {
                            style: q({
                              width: R.value >= 640 ? "1.9rem" : "1.8rem",
                              height: R.value >= 640 ? "1.9rem" : "1.8rem",
                            }),
                            imageSrc:
                              e.reply.user_avatar || e.reply.company_logo,
                          },
                          null,
                          8,
                          ["style", "imageSrc"]
                        ),
                      ]),
                    ]),
                    _: 1,
                  },
                  8,
                  ["href"]
                ),
                o("div", Ps, [
                  o("div", Os, [
                    o("div", Rs, [
                      r(
                        Q,
                        {
                          class: "font-bold text-sm",
                          href: `/contractor/${e.reply.user_id}`,
                        },
                        {
                          default: E(() => [
                            pe(
                              g(
                                e.reply.first_name + " " + e.reply.last_name ||
                                  e.reply.company_name
                              ),
                              1
                            ),
                          ]),
                          _: 1,
                        },
                        8,
                        ["href"]
                      ),
                      o("div", $s, g(e.reply.body), 1),
                    ]),
                    W(h) === e.reply.user_id
                      ? (a(),
                        d("div", Ds, [
                          r(
                            Fe,
                            {
                              modelValue: p.value,
                              "onUpdate:modelValue":
                                B[1] || (B[1] = (be) => (p.value = be)),
                            },
                            {
                              activator: E((be) => [
                                r(
                                  _e,
                                  {
                                    "open-on-click": !1,
                                    "open-on-focus": !0,
                                    modelValue: b.value,
                                    "onUpdate:modelValue":
                                      B[0] || (B[0] = (ke) => (b.value = ke)),
                                    "max-width": "300px",
                                    text: "Edit or Delete the reply",
                                    location: "top",
                                  },
                                  {
                                    activator: E(({ props: ke }) => [
                                      o(
                                        "div",
                                        gt(pt(ke)),
                                        [
                                          o(
                                            "button",
                                            Ve(
                                              {
                                                class:
                                                  "bg-[#f0f2f5] px-2 sm:px-3 py-1 sm:py-2 rounded-[18px] flex items-center",
                                              },
                                              be.props
                                            ),
                                            [
                                              r(W(V), {
                                                icon: "pepicons-pencil:dots-x",
                                              }),
                                            ],
                                            16
                                          ),
                                        ],
                                        16
                                      ),
                                    ]),
                                    _: 2,
                                  },
                                  1032,
                                  ["modelValue"]
                                ),
                              ]),
                              default: E(() => [
                                r(Te, null, {
                                  default: E(() => [
                                    r(
                                      He,
                                      {
                                        class: "hover:bg-gray-200",
                                        onClick: $,
                                      },
                                      {
                                        default: E(() => [
                                          r(
                                            ae,
                                            { class: "cursor-pointer" },
                                            {
                                              default: E(() => [pe("Edit")]),
                                              _: 1,
                                            }
                                          ),
                                        ]),
                                        _: 1,
                                      }
                                    ),
                                    r(
                                      He,
                                      {
                                        class: "hover:bg-gray-200",
                                        onClick: c,
                                      },
                                      {
                                        default: E(() => [
                                          r(
                                            ae,
                                            { class: "cursor-pointer" },
                                            {
                                              default: E(() => [
                                                pe(
                                                  g(y.value && y.value.delete),
                                                  1
                                                ),
                                              ]),
                                              _: 1,
                                            }
                                          ),
                                        ]),
                                        _: 1,
                                      }
                                    ),
                                  ]),
                                  _: 1,
                                }),
                              ]),
                              _: 1,
                            },
                            8,
                            ["modelValue"]
                          ),
                        ]))
                      : I("", !0),
                  ]),
                  o("div", As, [
                    o("div", null, g(W(ht)(e.reply.updated_at)), 1),
                    o(
                      "div",
                      {
                        onClick: O,
                        class: C([
                          "font-bold hover:underline hover:text-[#16a34a] cursor-pointer",
                          `${k.value === "like" ? "text-[#16a34a]" : ""}`,
                        ]),
                      },
                      g(y.value && y.value.like),
                      3
                    ),
                    o(
                      "div",
                      {
                        onClick: U,
                        class: C([
                          "font-bold hover:underline cursor-pointer hover:text-[#c40516]",
                          `${k.value === "dislike" ? "text-[#c40516]" : ""}`,
                        ]),
                      },
                      g(y.value && y.value.dislike),
                      3
                    ),
                    o(
                      "div",
                      {
                        class:
                          "flex gap-1 justify-center items-center cursor-pointer",
                        onClick: Y,
                      },
                      [
                        o("div", js, [
                          r(W(V), {
                            icon: "emojione-monotone:up-arrow",
                            class: C("  text-[#16a34a]"),
                            width: "14",
                          }),
                        ]),
                        o("div", Us, g(m.value), 1),
                      ]
                    ),
                    o(
                      "div",
                      {
                        class:
                          "flex gap-1 justify-center items-center cursor-pointer",
                        onClick: Z,
                      },
                      [
                        o("div", Hs, [
                          r(W(V), {
                            icon: "emojione-monotone:up-arrow",
                            class: C("  text-[#c40516]"),
                            width: "14",
                            rotate: 2,
                          }),
                        ]),
                        o("div", Fs, g(f.value), 1),
                      ]
                    ),
                  ]),
                ]),
              ]),
              ((Se = e.reply.replies) == null ? void 0 : Se.length) > 0 &&
              !_.value
                ? (a(),
                  d(
                    "div",
                    {
                      key: 0,
                      onClick: J,
                      class:
                        "ml-[54px] hover:underline sm:ml-[65px] text-gray-600 mt-2 flex gap-2",
                    },
                    [
                      r(W(V), { icon: "bi:arrow-return-right" }),
                      o(
                        "div",
                        Ls,
                        g(y.value && y.value.view) +
                          " " +
                          g(
                            ((Le = e.reply.replies) == null
                              ? void 0
                              : Le.length) === 1
                              ? ((Me = e.reply.replies) == null
                                  ? void 0
                                  : Me.length) + " reply"
                              : ((Ee = e.reply.replies) == null
                                  ? void 0
                                  : Ee.length) + " replies"
                          ),
                        1
                      ),
                    ]
                  ))
                : I("", !0),
              (a(),
              L(re, { to: "body" }, [
                r(
                  ne,
                  {
                    submitText: y.value && y.value.delete,
                    disableOutSideClick: !1,
                    onSubmit: D,
                    ref_key: "deleteDialogRef",
                    ref: i,
                    loading: w.value,
                    disabled: w.value,
                    errorIcon: "",
                    dialogWidth: "max-h-[70vh] width50",
                    title: y.value && y.value.are_you_sure,
                  },
                  {
                    default: E(() => [
                      o("div", Ms, [
                        o(
                          "div",
                          Bs,
                          g(
                            y.value && y.value.do_you_want_to_delete_this_reply
                          ),
                          1
                        ),
                      ]),
                    ]),
                    _: 1,
                  },
                  8,
                  ["submitText", "loading", "disabled", "title"]
                ),
              ])),
              r(
                kt,
                {
                  ref_key: "editRef",
                  ref: u,
                  isReply: "",
                  commentText: (Pe = e.reply) == null ? void 0 : Pe.body,
                  commentId: e.reply.id,
                },
                null,
                8,
                ["commentText", "commentId"]
              ),
            ],
            64
          )
        );
      };
    },
  };
const Ws = {
    class:
      "flex flex-row gap-1 sm:gap-2 justify-start items-start transition-all duration-1000 transitioning",
  },
  Vs = { class: "block" },
  zs = { class: "flex flex-col justify-center" },
  qs = { class: "flex gap-1 sm:gap-2" },
  Gs = { class: "bg-[#f0f2f5] rounded-[18px] px-3 py-2" },
  Ks = { class: "text-xs x350:text-sm", style: { "white-space": "pre-wrap" } },
  Xs = {
    key: 0,
    class:
      "hover:opacity-100 hover:pointer-events-auto cursor-pointer self-center",
  },
  Js = {
    class:
      "text-[10px] x350:text-[12px] flex gap-2 x350:gap-3 xs:gap-4 items-center mt-[3px] ml-2 text-[#65676B]",
  },
  Ys = {
    class:
      "font-medium text-xs text-blue-800 flex flex-row justify-between items-center cursor-pointer",
  },
  Zs = {
    class:
      "text-[10px] x350:text-[12px] translate-y-[0.5px] md:translate-y-[1px]",
  },
  Qs = {
    class:
      "font-medium flex flex-row justify-between items-center text-xs text-blue-800 cursor-pointer",
  },
  eo = {
    class:
      "text-[10px] x350:text-[12px] translate-y-[0.5px] md:translate-y-[1px]",
  },
  to = {
    key: 0,
    class:
      "flex gap-2 w-full items-start overflow-auto mt-2 pl-[48px] sm:pl-[57px]",
  },
  so = ["placeholder"],
  oo = { class: "font-bold text-sm cursor-pointer" },
  lo = {
    key: 2,
    class: "flex flex-col gap-1 sm:gap-2 mt-2 ml-[40px] sm:ml-[57px]",
    ref: "commentList",
  },
  io = { class: "" },
  no = {
    class: "section_text-lg font-bold sm:pl-6 section_text-gray-800 mt-3 mb-2",
  },
  ao = { key: 0 },
  ro = { key: 1, class: "flex flex-col gap-2" },
  uo = { key: 2, class: "h-full" },
  co = {
    class:
      "p-2 text-xl text-grey-600 font-bold h-full flex items-center justify-center",
  },
  mo = { key: 0 },
  fo = { key: 1, class: "flex flex-col gap-2" },
  go = { key: 2, class: "h-full" },
  po = {
    class:
      "p-2 text-xl text-grey-600 font-bold h-full flex items-center justify-center",
  },
  ho = { class: "text-white" },
  Je = {
    __name: "Comment",
    props: { comment: Object },
    setup(e) {
      var Ee, Pe, be, ke, Qe, et;
      const t = e,
        s = ue(),
        n = v(!1),
        l = v(),
        i = v(
          (Pe = (Ee = t.comment) == null ? void 0 : Ee.likes_count) != null
            ? Pe
            : 0
        ),
        m = v(
          (ke = (be = t.comment) == null ? void 0 : be.dislikes_count) != null
            ? ke
            : 0
        ),
        f = v(!1),
        w = v(!1),
        p = v(
          (et = (Qe = t.comment) == null ? void 0 : Qe.user_reaction) != null
            ? et
            : ""
        ),
        k = v(),
        u = v(!1),
        b = v(!1),
        x = De().props.value.profile.user_id,
        h = v(!1),
        R = v(!1),
        y = v(""),
        $ = v(),
        c = v(null),
        D = v(null),
        O = v([]),
        U = v([]),
        J = v(!1),
        Y = v(!1),
        Z = v(!1),
        oe = v(0),
        ge = K(() => s.getters.screenWidth),
        A = K(() => s.getters.translations),
        xe = () => {
          k.value.openDialogEdit();
        },
        he = () => {
          l.value.openDialog();
        };
      j(
        () => w.value,
        (P) => {
          P && (u.value = !1);
        }
      ),
        j(
          () => {
            var P;
            return (P = t.comment) == null ? void 0 : P.likes_count;
          },
          (P) => {
            P !== void 0 && (i.value = P);
          }
        ),
        j(
          () => {
            var P;
            return (P = t.comment) == null ? void 0 : P.dislikes_count;
          },
          (P) => {
            P !== void 0 && (m.value = P);
          }
        ),
        j(
          () => {
            var P;
            return (P = t.comment) == null ? void 0 : P.user_reaction;
          },
          (P) => {
            console.log(P, "user_reaction"), P !== void 0 && (p.value = P);
          }
        ),
        j(
          () => i.value,
          (P) => {
            let N;
            (N = {
              ...t.comment,
              likes_count: i.value,
              dislikes_count: m.value,
              user_reaction: p.value,
            }),
              s.commit("profile/setPostComment", N);
          }
        ),
        j(
          () => m.value,
          (P) => {
            let N;
            (N = {
              ...t.comment,
              likes_count: i.value,
              dislikes_count: m.value,
              user_reaction: p.value,
            }),
              s.commit("profile/setPostComment", N);
          }
        ),
        j(
          () => p.value,
          (P) => {
            let N;
            (N = {
              ...t.comment,
              likes_count: i.value,
              dislikes_count: m.value,
              user_reaction: p.value,
            }),
              s.commit("profile/setPostComment", N);
          }
        ),
        fe(() => {
          n.value = !0;
        });
      const ve = async () => {
          f.value = !0;
          try {
            const P = await le.delete(`/api/comments/${t.comment.id}`, H());
            P.data &&
              (de(P.data.message || "Comment successfully deleted"),
              s.commit("profile/setCommentId", t.comment.id));
          } catch (P) {
            F(P.response.data.message, "inherit");
          } finally {
            (f.value = !1), l.value.closeDialog();
          }
        },
        T = async () => {
          if (!p.value || p.value === "dislike") {
            (i.value = i.value + 1),
              p.value === "dislike" && (m.value = m.value - 1),
              (p.value = "like");
            try {
              (await le.post(`/api/comments/${t.comment.id}/like`, {}, H()))
                .data;
            } catch {
              F();
            }
          } else if (p.value === "like") {
            (i.value = i.value - 1), (p.value = null);
            try {
              (await le.delete(`/api/comments/${t.comment.id}/like`, H())).data;
            } catch {
              F();
            }
          }
        },
        B = async () => {
          if (!p.value || p.value === "like") {
            (m.value = m.value + 1),
              p.value === "like" && (i.value = i.value - 1),
              (p.value = "dislike");
            try {
              (await le.post(`/api/comments/${t.comment.id}/dislike`, {}, H()))
                .data;
            } catch {
              F();
            }
          } else if (p.value === "dislike") {
            (m.value = m.value - 1), (p.value = null);
            try {
              (await le.delete(`/api/comments/${t.comment.id}/dislike`, H()))
                .data;
            } catch {
              F();
            }
          }
        },
        Q = () => {
          b.value = !0;
        },
        _e = () => {
          h.value = !h.value;
        },
        ae = (P) => {
          if (P.key === "Tab") {
            P.preventDefault();
            const N = P.target.selectionStart,
              Be = P.target.selectionEnd;
            (y.value =
              y.value.substring(0, N) + "      " + y.value.substring(Be)),
              te(() => {
                P.target.selectionStart = P.target.selectionEnd = N + 60;
              });
          }
        },
        He = async () => {
          if (
            (console.log("loading comment"),
            (R.value = !0),
            !y.value && y.value / trim() === "")
          )
            return;
          const P = { body: Ce(y) };
          try {
            const N = await le.post(
              `/api/comments/${t.comment.id}/reply`,
              P,
              H()
            );
            N.data &&
              ((y.value = ""),
              Te(),
              s.commit("profile/setReply", {
                reply: N.data,
                commentId: t.comment.id,
              }),
              s.commit("profile/setIsCommentAdded", !0),
              s.commit("profile/setIsCommentAddedEnlarged", !0),
              de(
                A.value &&
                  A.value.reply_first_cap + " " + A.value &&
                  A.value.successfully_added,
                300,
                1500
              ),
              (h.value = !1));
          } catch {
            F();
          } finally {
            R.value = !1;
          }
        },
        Te = () => {
          te(() => {
            ($.value.style.height = "auto"),
              ($.value.style.height = $.value.scrollHeight + "px");
          });
        },
        Fe = (P = !1, N = 0) => {
          (Z.value = P),
            console.log("onOpenListofLikedUsersModel", Z.value),
            (oe.value = N),
            c.value.openDialog();
        },
        Se = (P = !1, N = 0) => {
          (Z.value = P), (oe.value = N), D.value.openDialog();
        },
        Le = async () => {
          J.value = !0;
          try {
            const P = await le.get(
              `/api/comments/${Z.value ? oe.value : t.comment.id}/likes`,
              H()
            );
            P.data && (O.value = P.data);
          } catch {
            F();
          } finally {
            J.value = !1;
          }
        },
        Me = async () => {
          Y.value = !0;
          try {
            const P = await le.get(
              `/api/comments/${Z.value ? oe.value : t.comment.id}/dislikes`,
              H()
            );
            P.data && (U.value = P.data);
          } catch {
            F();
          } finally {
            Y.value = !1;
          }
        };
      return (P, N) => {
        var lt, it, nt, at;
        const Be = S("Link"),
          Ot = S("v-tooltip"),
          tt = S("v-list-item-title"),
          st = S("v-list-item"),
          Rt = S("v-list"),
          $t = S("v-menu"),
          ot = S("v-skeleton-loader"),
          Dt = S("v-progress-linear"),
          At = S("v-dialog");
        return (
          a(),
          d(
            M,
            null,
            [
              o("div", Ws, [
                r(
                  Be,
                  {
                    href: `/contractor/${e.comment.user_id}`,
                    class:
                      "cursor-pointer flex justify-start items-start flex-none w=16 mt-[2px]",
                  },
                  {
                    default: E(() => [
                      o("div", Vs, [
                        r(
                          Ge,
                          {
                            style: q({
                              width: ge.value >= 640 ? "2.5rem" : "2.0rem",
                              height: ge.value >= 640 ? "2.5rem" : "2.0rem",
                            }),
                            imageSrc:
                              e.comment.user_avatar || e.comment.company_logo,
                          },
                          null,
                          8,
                          ["style", "imageSrc"]
                        ),
                      ]),
                    ]),
                    _: 1,
                  },
                  8,
                  ["href"]
                ),
                o("div", zs, [
                  o("div", qs, [
                    o("div", Gs, [
                      r(
                        Be,
                        {
                          class: "font-bold text-xs x350:text-sm",
                          href: `/contractor/${e.comment.user_id}`,
                        },
                        {
                          default: E(() => [
                            pe(
                              g(
                                e.comment.first_name +
                                  " " +
                                  e.comment.last_name || e.comment.company_name
                              ),
                              1
                            ),
                          ]),
                          _: 1,
                        },
                        8,
                        ["href"]
                      ),
                      o("div", Ks, g(e.comment.body), 1),
                    ]),
                    W(x) === e.comment.user_id
                      ? (a(),
                        d("div", Xs, [
                          r(
                            $t,
                            {
                              modelValue: w.value,
                              "onUpdate:modelValue":
                                N[1] || (N[1] = (ee) => (w.value = ee)),
                            },
                            {
                              activator: E((ee) => [
                                r(
                                  Ot,
                                  {
                                    "open-on-click": !1,
                                    "open-on-focus": !0,
                                    modelValue: u.value,
                                    "onUpdate:modelValue":
                                      N[0] || (N[0] = (ye) => (u.value = ye)),
                                    "max-width": "300px",
                                    text:
                                      A.value && A.value.edit_or_delete_comment,
                                    location: "top",
                                  },
                                  {
                                    activator: E(({ props: ye }) => [
                                      o(
                                        "div",
                                        gt(pt(ye)),
                                        [
                                          o(
                                            "button",
                                            Ve(
                                              {
                                                class:
                                                  "bg-[#f0f2f5] px-2 sm:px-3 py-1 sm:py-2 rounded-[18px] flex items-center",
                                              },
                                              ee.props
                                            ),
                                            [
                                              r(W(V), {
                                                icon: "pepicons-pencil:dots-x",
                                              }),
                                            ],
                                            16
                                          ),
                                        ],
                                        16
                                      ),
                                    ]),
                                    _: 2,
                                  },
                                  1032,
                                  ["modelValue", "text"]
                                ),
                              ]),
                              default: E(() => [
                                r(Rt, null, {
                                  default: E(() => [
                                    r(
                                      st,
                                      {
                                        class: "hover:bg-gray-200",
                                        onClick: xe,
                                      },
                                      {
                                        default: E(() => [
                                          r(
                                            tt,
                                            { class: "cursor-pointer" },
                                            {
                                              default: E(() => [
                                                pe(
                                                  g(A.value && A.value.edit),
                                                  1
                                                ),
                                              ]),
                                              _: 1,
                                            }
                                          ),
                                        ]),
                                        _: 1,
                                      }
                                    ),
                                    r(
                                      st,
                                      {
                                        class: "hover:bg-gray-200",
                                        onClick: he,
                                      },
                                      {
                                        default: E(() => [
                                          r(
                                            tt,
                                            { class: "cursor-pointer" },
                                            {
                                              default: E(() => [
                                                pe(
                                                  g(A.value && A.value.delete),
                                                  1
                                                ),
                                              ]),
                                              _: 1,
                                            }
                                          ),
                                        ]),
                                        _: 1,
                                      }
                                    ),
                                  ]),
                                  _: 1,
                                }),
                              ]),
                              _: 1,
                            },
                            8,
                            ["modelValue"]
                          ),
                        ]))
                      : I("", !0),
                  ]),
                  o("div", Js, [
                    o("div", null, g(W(ht)(e.comment.updated_at)), 1),
                    o(
                      "div",
                      {
                        onClick: T,
                        class: C([
                          "text-[10px] x350:text-[12px] font-bold hover:underline hover:text-[#16a34a] cursor-pointer",
                          `${p.value === "like" ? "text-[#16a34a]" : ""}`,
                        ]),
                      },
                      g(A.value && A.value.like),
                      3
                    ),
                    o(
                      "div",
                      {
                        onClick: B,
                        class: C([
                          "text-[10px] x350:text-[12px] font-bold hover:underline cursor-pointer hover:text-[#c40516]",
                          `${p.value === "dislike" ? "text-[#c40516]" : ""}`,
                        ]),
                      },
                      g(A.value && A.value.dislike),
                      3
                    ),
                    o(
                      "div",
                      {
                        class:
                          "text-[10px] x350:text-[12px] font-bold hover:underline cursor-pointer",
                        onClick: _e,
                      },
                      g(A.value && A.value.reply_first_cap),
                      1
                    ),
                    o(
                      "div",
                      {
                        class:
                          "flex gap-1 justify-center items-center cursor-pointer",
                        onClick: N[2] || (N[2] = () => Fe()),
                      },
                      [
                        o("div", Ys, [
                          r(W(V), {
                            icon: "emojione-monotone:up-arrow",
                            class: C("  w-[12px] x350:w-[14px] text-[#16a34a]"),
                          }),
                        ]),
                        o("div", Zs, g(i.value), 1),
                      ]
                    ),
                    o(
                      "div",
                      {
                        class:
                          "flex gap-1 justify-center items-center cursor-pointer",
                        onClick: N[3] || (N[3] = () => Se()),
                      },
                      [
                        o("div", Qs, [
                          r(W(V), {
                            icon: "emojione-monotone:up-arrow",
                            class: C("w-[12px] x350:w-[14px] text-[#c40516]"),
                            rotate: 2,
                          }),
                        ]),
                        o("div", eo, g(m.value), 1),
                      ]
                    ),
                  ]),
                ]),
              ]),
              h.value
                ? (a(),
                  d("div", to, [
                    X(
                      o(
                        "textarea",
                        {
                          id: "comment",
                          "onUpdate:modelValue":
                            N[4] || (N[4] = (ee) => (y.value = ee)),
                          onPaste: Te,
                          ref_key: "commentAreaRef",
                          ref: $,
                          onKeydown: ae,
                          onInput: Te,
                          rows: 1,
                          placeholder: A.value && A.value.write_your_reply,
                          class:
                            "text-base w-full py-1 min-h-[30px] overflow-hidden px-3 focus:shadow-none focus:ring-gray-600 focus:rounded bg-[#f9fafb] border-gray-400 text-grey-600 resize-none rounded focus-within:ring-gray-600 focus:border-gray-600",
                        },
                        null,
                        40,
                        so
                      ),
                      [[se, y.value]]
                    ),
                    r(
                      W(V),
                      {
                        type: "button",
                        disabled: R.value,
                        onClick: He,
                        class: C(
                          `w-8 h-8 cursor-pointer text-gray-500 apply-stroke ${
                            R.value ? "opacity-40" : "opacity-100"
                          }`
                        ),
                        icon: "carbon:send-filled",
                      },
                      null,
                      8,
                      ["disabled", "class"]
                    ),
                  ]))
                : I("", !0),
              ((lt = e.comment.replies) == null ? void 0 : lt.length) > 0 &&
              !b.value
                ? (a(),
                  d(
                    "div",
                    {
                      key: 1,
                      onClick: Q,
                      class:
                        "ml-[44px] hover:underline sm:ml-[60px] text-gray-600 mt-2 flex gap-2",
                    },
                    [
                      r(W(V), { icon: "bi:arrow-return-right" }),
                      o(
                        "div",
                        oo,
                        g(A.value && A.value.view) +
                          " " +
                          g(
                            ((it = e.comment.replies) == null
                              ? void 0
                              : it.length) > 1
                              ? e.comment.replies.length
                              : ""
                          ) +
                          " " +
                          g(
                            ((nt = e.comment.replies) == null
                              ? void 0
                              : nt.length) === 1
                              ? A.value && A.value.reply
                              : A.value && A.value.replies
                          ),
                        1
                      ),
                    ]
                  ))
                : I("", !0),
              e.comment &&
              e.comment.replies &&
              e.comment.replies.length > 0 &&
              b.value
                ? (a(),
                  d(
                    "div",
                    lo,
                    [
                      r(
                        Ae,
                        {
                          name: "comment-transition",
                          tag: "div",
                          class: "flex flex-col gap-1 sm:gap-2",
                        },
                        {
                          default: E(() => [
                            (a(!0),
                            d(
                              M,
                              null,
                              G(
                                e.comment.replies,
                                (ee) => (
                                  a(),
                                  d("div", { key: ee.id }, [
                                    r(
                                      Ns,
                                      {
                                        reply: ee,
                                        onOpenLikedUserModal: Fe,
                                        onOpenDislikedUserModal: Se,
                                      },
                                      null,
                                      8,
                                      ["reply"]
                                    ),
                                  ])
                                )
                              ),
                              128
                            )),
                          ]),
                          _: 1,
                        }
                      ),
                    ],
                    512
                  ))
                : I("", !0),
              (a(),
              L(re, { to: "body" }, [
                r(
                  ne,
                  {
                    submitText: A.value && A.value.delete,
                    disableOutSideClick: !1,
                    onSubmit: ve,
                    ref_key: "deleteDialogRef",
                    ref: l,
                    loading: f.value,
                    disabled: f.value,
                    errorIcon: "",
                    dialogWidth: "max-h-[70vh] width50",
                    title: A.value && A.value.are_you_sure,
                  },
                  {
                    default: E(() => [
                      o("div", io, [
                        o(
                          "div",
                          no,
                          g(
                            A.value &&
                              A.value.do_you_want_to_delete_this_comment
                          ),
                          1
                        ),
                      ]),
                    ]),
                    _: 1,
                  },
                  8,
                  ["submitText", "loading", "disabled", "title"]
                ),
              ])),
              r(
                kt,
                {
                  ref_key: "editRef",
                  ref: k,
                  commentText: (at = e.comment) == null ? void 0 : at.body,
                  commentId: e.comment.id,
                },
                null,
                8,
                ["commentText", "commentId"]
              ),
              (a(),
              L(re, { to: "body" }, [
                r(
                  ne,
                  {
                    ref_key: "likeDialogRef",
                    ref: c,
                    dialogWidth: "w-full h-full sm:h-5/6",
                    onOpened: Le,
                    showFooter: !1,
                    title: Z.value
                      ? A.value && A.value.people_who_liked_the_reply
                      : A.value && A.value.people_who_liked_the_comment,
                  },
                  {
                    default: E(() => [
                      J.value
                        ? (a(),
                          d("div", ao, [
                            (a(),
                            d(
                              M,
                              null,
                              G(5, (ee) =>
                                r(ot, { key: ee, type: "list-item-avatar" })
                              ),
                              64
                            )),
                          ]))
                        : !J.value && O.value && O.value.length > 0
                        ? (a(),
                          d("div", ro, [
                            (a(!0),
                            d(
                              M,
                              null,
                              G(
                                O.value,
                                (ee, ye) => (
                                  a(),
                                  L(
                                    We,
                                    { liked: "", key: ye, user: ee },
                                    null,
                                    8,
                                    ["user"]
                                  )
                                )
                              ),
                              128
                            )),
                          ]))
                        : (a(),
                          d("div", uo, [
                            o(
                              "div",
                              co,
                              g(A.value && A.value.no_contractor_found),
                              1
                            ),
                          ])),
                    ]),
                    _: 1,
                  },
                  8,
                  ["title"]
                ),
              ])),
              (a(),
              L(re, { to: "body" }, [
                r(
                  ne,
                  {
                    ref_key: "dislikeDialogRef",
                    ref: D,
                    dialogWidth: "w-full h-full sm:h-5/6",
                    onOpened: Me,
                    showFooter: !1,
                    title: Z.value
                      ? A.value && A.value.people_who_disliked_the_reply
                      : A.value && A.value.people_who_disliked_the_comment,
                  },
                  {
                    default: E(() => [
                      Y.value
                        ? (a(),
                          d("div", mo, [
                            (a(),
                            d(
                              M,
                              null,
                              G(3, (ee) =>
                                r(ot, { key: ee, type: "list-item-avatar" })
                              ),
                              64
                            )),
                          ]))
                        : !Y.value && U.value && U.value.length > 0
                        ? (a(),
                          d("div", fo, [
                            (a(!0),
                            d(
                              M,
                              null,
                              G(
                                U.value,
                                (ee, ye) => (
                                  a(),
                                  L(We, { key: ye, user: ee }, null, 8, [
                                    "user",
                                  ])
                                )
                              ),
                              128
                            )),
                          ]))
                        : (a(),
                          d("div", go, [
                            o(
                              "div",
                              po,
                              g(A.value && A.value.no_contractor_found),
                              1
                            ),
                          ])),
                    ]),
                    _: 1,
                  },
                  8,
                  ["title"]
                ),
              ])),
              R.value
                ? (a(),
                  L(
                    At,
                    {
                      key: 3,
                      class: "dialog-modal",
                      modelValue: R.value,
                      "onUpdate:modelValue":
                        N[5] || (N[5] = (ee) => (R.value = ee)),
                      scrim: "transparent",
                      persistent: "",
                      width: "auto",
                    },
                    {
                      default: E(() => [
                        r(
                          je,
                          {
                            shadowLevel: 2,
                            bgColor: "#364fc7",
                            padding: ge.value < 640 ? "7px" : "10px",
                          },
                          {
                            default: E(() => [
                              o(
                                "div",
                                ho,
                                g(A.value && A.value.uploading) +
                                  " " +
                                  g(A.value && A.value.reply_first_cap) +
                                  "... ",
                                1
                              ),
                              r(Dt, {
                                indeterminate: "",
                                color: "#fff",
                                class: "mb-0",
                              }),
                            ]),
                            _: 1,
                          },
                          8,
                          ["padding"]
                        ),
                      ]),
                      _: 1,
                    },
                    8,
                    ["modelValue"]
                  ))
                : I("", !0),
            ],
            64
          )
        );
      };
    },
  };
const vo = {
    key: 0,
    class:
      "flex justify-between rounded-b-none max-md:rounded-none rounded-lg text-white items-center p-2 xs:p-4 bg-[#241e6d]",
  },
  _o = { class: "flex items-center gap-2" },
  yo = { class: "text-lg sx:text-xl font-bold" },
  xo = {
    key: 1,
    class:
      "p-2 text-xl text-grey-600 font-bold h-full flex items-center justify-center",
  },
  bo = { class: "flex gap-2 w-full items-start overflow-auto max-h-[165px]" },
  ko = ["placeholder"],
  wo = {
    __name: "DialogAllComments",
    props: {
      modelValue: { type: Array },
      postId: { type: [Number, String] },
      pagination: { type: Object },
      addedNumber: { type: Number },
      dontAllowCancel: { type: Boolean, default: !1 },
      contentClasses: { type: String, default: "" },
      showCancel: { type: Boolean, default: !0 },
      showFooter: { type: Boolean, default: !0 },
      showHeader: { type: Boolean, default: !0 },
      overflowAllowed: { type: Boolean, default: !0 },
      disableOutSideClick: { type: Boolean, default: !0 },
    },
    emits: [
      "unshiftIntoComments",
      "update:modelValue",
      "update:addedNumber",
      "submit",
      "closed",
      "opened",
    ],
    setup(e, { expose: t, emit: s }) {
      var ve;
      const n = e,
        l = ue(),
        i = v(null),
        m = v(!1),
        f = v(),
        w = v(),
        p = v(""),
        k = v(70),
        u = v(25),
        b = v(!1),
        _ = v((ve = n.modelValue) != null ? ve : []),
        x = v(n.pagination),
        h = v(1),
        R = v(10),
        y = v(!1),
        $ = v(),
        c = v(n.addedNumber),
        D = v(!1),
        O = K(() => l.getters.screenWidth),
        U = K(() => l.getters.translations),
        J = K(() => l.state.profile.commentId);
      fe(() => {
        O.value > 640
          ? ((k.value = 70), (u.value = 25))
          : ((k.value = 60), (u.value = 17));
      }),
        j(
          () => O,
          (T) => {
            T > 640
              ? ((k.value = 70), (u.value = 25))
              : ((k.value = 60), (u.value = 17));
          }
        ),
        j(
          () => n.modelValue,
          (T) => {
            T && (_.value = T);
          }
        ),
        j(
          () => n.addedNumber,
          (T) => {
            T && (c.value = T);
          }
        ),
        j(
          () => n.pagination,
          (T) => {
            T && (x.value = T);
          }
        ),
        j(
          () => _.value,
          (T) => {
            s("update:modelValue", _.value);
          }
        ),
        j(
          () => c.value,
          (T) => {
            s("update:addedNumber", c.value);
          }
        ),
        j(
          () => J.value,
          async (T) => {
            T > 0 &&
              ((h.value = 1),
              (D.value = !0),
              await he(R.value, h.value, !1, !0),
              (D.value = !1));
          }
        );
      const Y = () => {
          m.value = !1;
        },
        Z = async () => {
          (m.value = !0),
            _.value.length > 0 &&
              setTimeout(() => {
                const T = (Q) => {
                  Q.forEach((_e) => {
                    _e.isIntersecting && xe();
                  });
                };
                new IntersectionObserver(T, {
                  rootMargin: "0px 0px 0px 0px",
                  threshold: 0,
                }).observe($.value);
              }, 100),
            s("opened");
        },
        oe = () => {
          te(() => {
            (f.value.style.height = "auto"),
              (f.value.style.height = f.value.scrollHeight + "px"),
              f.value.scrollHeight < 165 &&
              f.value.scrollHeight + u.value > k.value
                ? (w.value.style.minHeight =
                    f.value.scrollHeight + u.value + "px")
                : f.value.scrollHeight + u.value < k.value &&
                  (w.value.style.minHeight = k.value + "px");
          });
        },
        ge = (T) => {
          if (T.key === "Tab") {
            T.preventDefault();
            const B = T.target.selectionStart,
              Q = T.target.selectionEnd;
            (p.value =
              p.value.substring(0, B) + "      " + p.value.substring(Q)),
              te(() => {
                T.target.selectionStart = T.target.selectionEnd = B + 60;
              });
          }
        },
        A = async () => {
          if (((b.value = !0), !p.value && p.value / trim() === "")) return;
          const T = { body: Ce(p) };
          try {
            const B = await axios.post(
              `/api/posts/${n.postId}/comments`,
              T,
              H()
            );
            B.data &&
              ((p.value = ""),
              oe(),
              s("unshiftIntoComments", B.data),
              te(() => {
                var Q;
                (Q = i.value) == null ||
                  Q.scrollIntoView({ behavior: "smooth" });
              }));
          } catch {
            F();
          } finally {
            b.value = !1;
          }
        },
        xe = async () => {
          (y.value = !0),
            (h.value = h.value + 1),
            await he(R.value, h.value),
            (y.value = !1);
        },
        he = async (T = R.value, B = 1, Q = !0, _e = !1) => {
          try {
            const ae = await axios.get(
              `/api/posts/${n.postId}/comments?per_page=${T}&page=${B}`,
              H()
            );
            c.value > 0
              ? ((_.value = [..._.value, ...ae.data.comments.slice(c.value)]),
                (c.value = 0))
              : Q
              ? (_.value = [..._.value, ...ae.data.comments])
              : _e || ((h.value = 1), (_.value = [...ae.data.comments])),
              (x.value = ae.data.pagination);
          } catch {
            F();
          }
        };
      return (
        t({ openDialog: Z, closeDialog: Y }),
        (T, B) =>
          m.value
            ? (a(),
              d(
                "div",
                {
                  key: 0,
                  class:
                    "fixed m-0 inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70",
                  style: { "--tw-space-x-reverse": "inherit" },
                  type: "button",
                  onClick:
                    B[2] ||
                    (B[2] = () => {
                      e.disableOutSideClick || Y();
                    }),
                },
                [
                  r(
                    vt,
                    { name: "fade" },
                    {
                      default: E(() => [
                        o(
                          "div",
                          {
                            class:
                              "bg-white md:w-2/3 w-full h-full sm:h-5/6 rounded-xl max-sm:rounded-none shadow-xl flex flex-col z-10",
                            type: "button",
                            onClick: B[1] || (B[1] = Re(() => {}, ["stop"])),
                          },
                          [
                            e.showHeader
                              ? (a(),
                                d("div", vo, [
                                  o("div", _o, [
                                    e.dontAllowCancel
                                      ? I("", !0)
                                      : (a(),
                                        L(W(V), {
                                          key: 0,
                                          type: "button",
                                          onClick: Y,
                                          class:
                                            "w-8 h-8 sx:w-10 sx:h-10 cursor-pointer",
                                          icon: "icon-park:back",
                                          color: "red",
                                        })),
                                    o(
                                      "h3",
                                      yo,
                                      g(
                                        U.value.translations.comments_first_cap
                                      ),
                                      1
                                    ),
                                  ]),
                                  e.dontAllowCancel
                                    ? I("", !0)
                                    : (a(),
                                      d(
                                        "button",
                                        {
                                          key: 0,
                                          type: "button",
                                          onClick: Y,
                                          class:
                                            "p-2 hover:bg-[#6741d9] w-10 h-10 flex justify-center items-center rounded-full",
                                        },
                                        " X "
                                      )),
                                ]))
                              : I("", !0),
                            o(
                              "div",
                              {
                                class: C(
                                  `flex-1 ${
                                    e.overflowAllowed ? "overflow-y-auto" : ""
                                  } p-2 sm:p-4 padding-none ${e.contentClasses}`
                                ),
                              },
                              [
                                r(
                                  $e,
                                  {
                                    loading: D.value,
                                    background: "",
                                    height: "60vh",
                                  },
                                  null,
                                  8,
                                  ["loading"]
                                ),
                                _.value && _.value.length > 0 && !D.value
                                  ? (a(),
                                    d(
                                      "div",
                                      {
                                        key: 0,
                                        class: "flex flex-col gap-1 sm:gap-2",
                                        ref_key: "commentList",
                                        ref: i,
                                      },
                                      [
                                        r(
                                          Ae,
                                          {
                                            name: "comment-transition",
                                            tag: "div",
                                            class:
                                              "flex flex-col gap-1 sm:gap-2",
                                          },
                                          {
                                            default: E(() => [
                                              (a(!0),
                                              d(
                                                M,
                                                null,
                                                G(
                                                  _.value,
                                                  (Q) => (
                                                    a(),
                                                    d("div", { key: Q.id }, [
                                                      r(
                                                        Je,
                                                        { comment: Q },
                                                        null,
                                                        8,
                                                        ["comment"]
                                                      ),
                                                    ])
                                                  )
                                                ),
                                                128
                                              )),
                                            ]),
                                            _: 1,
                                          }
                                        ),
                                      ],
                                      512
                                    ))
                                  : I("", !0),
                                _.value && _.value.length === 0
                                  ? (a(),
                                    d(
                                      "div",
                                      xo,
                                      g(U.value && U.value.no_comments_yet),
                                      1
                                    ))
                                  : I("", !0),
                                +h.value != +x.value.last_page
                                  ? (a(),
                                    d(
                                      "div",
                                      {
                                        key: 2,
                                        ref_key: "loadMoreIntersect",
                                        ref: $,
                                        style: { width: "5px", height: "5px" },
                                      },
                                      null,
                                      512
                                    ))
                                  : I("", !0),
                                X(
                                  o(
                                    "div",
                                    { class: "text-center font-bold mt-4" },
                                    g(U.value && U.value.no_comments_yet),
                                    513
                                  ),
                                  [
                                    [
                                      me,
                                      h.value > 1 &&
                                        !y.value &&
                                        +h.value == +x.value.last_page,
                                    ],
                                  ]
                                ),
                                r(
                                  $e,
                                  {
                                    classes: "flex gap-2",
                                    loading: y.value,
                                    circleClasses: "small-circle",
                                    textClasses: "small-text",
                                    background: "",
                                    height: "70px",
                                  },
                                  null,
                                  8,
                                  ["loading"]
                                ),
                              ],
                              2
                            ),
                            e.showFooter
                              ? (a(),
                                d(
                                  "div",
                                  {
                                    key: 1,
                                    class: C(
                                      `flex ${
                                        e.showCancel
                                          ? "justify-between"
                                          : "justify-end"
                                      } p-2 sm:p-3 shadow-lg  overflow-hidden  border-t-[1px] border-gray-400 min-h-[60px] sm:min-h-[70px]`
                                    ),
                                    ref_key: "container",
                                    ref: w,
                                  },
                                  [
                                    o("div", bo, [
                                      X(
                                        o(
                                          "textarea",
                                          {
                                            id: "comment",
                                            "onUpdate:modelValue":
                                              B[0] ||
                                              (B[0] = (Q) => (p.value = Q)),
                                            onPaste: oe,
                                            ref_key: "commentAreaRef",
                                            ref: f,
                                            onKeydown: ge,
                                            onInput: oe,
                                            rows: 1,
                                            placeholder:
                                              U.value &&
                                              U.value.write_a_comment,
                                            class:
                                              "text-xl w-full py-1 min-h-[40px] overflow-hidden px-3 focus:shadow-none focus:ring-gray-600 focus:rounded bg-[#f9fafb] border-gray-400 text-grey-600 resize-none rounded focus-within:ring-gray-600 focus:border-gray-600",
                                          },
                                          null,
                                          40,
                                          ko
                                        ),
                                        [[se, p.value]]
                                      ),
                                      r(
                                        W(V),
                                        {
                                          type: "button",
                                          disabled: b.value,
                                          onClick: A,
                                          class: C(
                                            `w-8 h-8 sx:w-10 sx:h-10 cursor-pointer text-gray-500 apply-stroke ${
                                              b.value
                                                ? "opacity-40"
                                                : "opacity-100"
                                            }`
                                          ),
                                          icon: "carbon:send-filled",
                                        },
                                        null,
                                        8,
                                        ["disabled", "class"]
                                      ),
                                    ]),
                                  ],
                                  2
                                ))
                              : I("", !0),
                          ]
                        ),
                      ]),
                      _: 1,
                    }
                  ),
                ]
              ))
            : I("", !0)
      );
    },
  };
const Co = (e) => (ze("data-v-818c81d2"), (e = e()), qe(), e),
  Io = { class: "relative bgColorDropdownRelateive" },
  To = {
    key: 0,
    class:
      "absolute w-full flex flex-col items-center flex-wrap w-40 mt-2 bg-white border border-gray-200 p-2 rounded z-10",
  },
  So = Co(() =>
    o(
      "div",
      { class: "text-sm font-semibold translate-y-[1px]" },
      "Remove Color",
      -1
    )
  ),
  Eo = {
    key: 1,
    class: "grid grid-cols-4 items-center justify-items-center gap-2",
  },
  Po = ["onClick"],
  Oo = {
    __name: "BackgroundColorDropdownEdit",
    props: { modelValue: [String, Object], backgroundColorId: Number },
    emits: ["update:modelValue"],
    setup(e, { emit: t }) {
      const s = e,
        n = v(!1),
        l = v(s.modelValue),
        i = v([]),
        m = v(!0);
      j(l, (u) => {
        t("update:modelValue", u);
      });
      const f = (u) => {
          l.value = { ...u };
        },
        w = () => {
          (l.value.color = "inherit"), (l.value.id = null);
        },
        p = (u) => {
          u.target.closest(".bgColorDropdownRelateive") || (n.value = !1);
        };
      fe(async () => {
        document.addEventListener("click", p),
          await k(),
          i.value.forEach((u) => {
            u.id == s.backgroundColorId && (l.value = u);
          });
      }),
        _t(() => {
          document.removeEventListener("click", p);
        });
      const k = async () => {
        m.value = !0;
        try {
          const u = await axios.get("/api/post/background-colors", H());
          u.data && (i.value = u.data.backgroundColors);
        } catch {
          F();
        } finally {
          m.value = !1;
        }
      };
      return (u, b) => {
        const _ = S("v-tooltip"),
          x = S("v-progress-circular");
        return (
          a(),
          d("div", Io, [
            r(
              _,
              { text: "Background Color", location: "top" },
              {
                activator: E(({ props: h }) => [
                  o(
                    "button",
                    Ve(
                      {
                        type: "button",
                        onClick: b[0] || (b[0] = (R) => (n.value = !n.value)),
                      },
                      h,
                      {
                        class: [
                          "rounded border border-transparent flex items-center",
                          { "bg-gray-100 border-2 border-gray-400": n.value },
                        ],
                      }
                    ),
                    [
                      r(W(V), {
                        icon: "ic:round-color-lens",
                        class: "w-6 h-6",
                      }),
                      r(W(V), { icon: "gridicons:dropdown" }),
                    ],
                    16
                  ),
                ]),
                _: 1,
              }
            ),
            n.value
              ? (a(),
                d("div", To, [
                  o(
                    "button",
                    {
                      type: "button",
                      onClick: w,
                      class:
                        "mb-2 flex gap-2 items-center border-2 border-gray-200 px-2 py-1 rounded",
                    },
                    [r(W(V), { icon: "ph:eraser-fill", class: "w-5 h-5" }), So]
                  ),
                  m.value
                    ? (a(),
                      L(x, {
                        key: 0,
                        class: "self-center",
                        style: { height: "80px" },
                        indeterminate: "",
                        color: "primary",
                      }))
                    : (a(),
                      d("div", Eo, [
                        (a(!0),
                        d(
                          M,
                          null,
                          G(
                            i.value,
                            (h, R) => (
                              a(),
                              d(
                                "div",
                                {
                                  key: R,
                                  style: q({ backgroundColor: h.color }),
                                  onClick: (y) => f(h),
                                  class: C([
                                    {
                                      "ring-2 ring-blue-500":
                                        h.color === l.value.color,
                                    },
                                    "w-6 h-6 border-2 border-gray-200 rounded cursor-pointer",
                                  ]),
                                },
                                null,
                                14,
                                Po
                              )
                            )
                          ),
                          128
                        )),
                      ])),
                ]))
              : I("", !0),
          ])
        );
      };
    },
  },
  wt = ce(Oo, [["__scopeId", "data-v-818c81d2"]]);
const Ro = (e) => (ze("data-v-4e610c2f"), (e = e()), qe(), e),
  $o = { class: "relative fontColorDropdownRelateive" },
  Do = {
    key: 0,
    class:
      "absolute w-full flex items-center flex-col flex-wrap w-40 mt-2 bg-white border border-gray-200 p-2 rounded z-10",
  },
  Ao = Ro(() =>
    o(
      "div",
      { class: "text-sm font-semibold translate-y-[1px]" },
      "Remove Color",
      -1
    )
  ),
  jo = {
    key: 1,
    class: "grid grid-cols-4 items-center justify-items-center gap-2",
  },
  Uo = ["onClick"],
  Ho = {
    __name: "FontColorDropdownEdit",
    props: { modelValue: [String, Object], textColorId: Number },
    emits: ["update:modelValue"],
    setup(e, { emit: t }) {
      const s = e,
        n = v(!1),
        l = v(s.modelValue),
        i = v([]),
        m = v(!0);
      j(l, (u) => {
        t("update:modelValue", u);
      }),
        j(
          () => s.textColorId,
          (u, b) => {
            console.log("inWatcher"),
              u != b &&
                i.value.forEach((_) => {
                  if (i.id === u) {
                    l.value = _;
                    return;
                  }
                });
          }
        );
      const f = (u) => {
          l.value = { ...u };
        },
        w = () => {
          (l.value.color = "inherit"), (l.value.id = null);
        },
        p = (u) => {
          u.target.closest(".fontColorDropdownRelateive") || (n.value = !1);
        };
      fe(async () => {
        document.addEventListener("click", p),
          await k(),
          i.value.forEach((u) => {
            u.id == s.textColorId && (l.value = u);
          });
      }),
        _t(() => {
          document.removeEventListener("click", p);
        });
      const k = async () => {
        m.value = !0;
        try {
          const u = await axios.get("/api/post/text-colors", H());
          u.data && (i.value = u.data.textColors);
        } catch {
          F();
        } finally {
          m.value = !1;
        }
      };
      return (u, b) => {
        const _ = S("v-tooltip"),
          x = S("v-progress-circular");
        return (
          a(),
          d("div", $o, [
            r(
              _,
              { text: "Font Color", location: "top" },
              {
                activator: E(({ props: h }) => [
                  o(
                    "button",
                    Ve(
                      {
                        type: "button",
                        onClick: b[0] || (b[0] = (R) => (n.value = !n.value)),
                      },
                      h,
                      {
                        class: [
                          { "bg-gray-100 border-gray-400": n.value },
                          "rounded border border-transparent flex items-center",
                        ],
                      }
                    ),
                    [
                      r(W(V), { icon: "ri:font-color", class: "w-6 h-6" }),
                      r(W(V), { icon: "gridicons:dropdown" }),
                    ],
                    16
                  ),
                ]),
                _: 1,
              }
            ),
            n.value
              ? (a(),
                d("div", Do, [
                  o(
                    "button",
                    {
                      type: "button",
                      onClick: w,
                      class:
                        "mb-2 flex gap-2 items-center border-2 broder-gray-200 px-2 py-1 rounded",
                    },
                    [r(W(V), { icon: "ph:eraser-fill", class: "w-5 h-5" }), Ao]
                  ),
                  m.value
                    ? (a(),
                      L(x, {
                        key: 0,
                        class: "self-center",
                        style: { height: "80px" },
                        indeterminate: "",
                        color: "primary",
                      }))
                    : (a(),
                      d("div", jo, [
                        (a(!0),
                        d(
                          M,
                          null,
                          G(
                            i.value,
                            (h, R) => (
                              a(),
                              d(
                                "div",
                                {
                                  key: R,
                                  style: q({ backgroundColor: h.color }),
                                  onClick: (y) => f(h),
                                  class: C([
                                    {
                                      "ring-2 ring-blue-500":
                                        h.color === l.value.color,
                                    },
                                    "w-6 h-6 rounded cursor-pointer border-2 border-gray-20",
                                  ]),
                                },
                                null,
                                14,
                                Uo
                              )
                            )
                          ),
                          128
                        )),
                      ])),
                ]))
              : I("", !0),
          ])
        );
      };
    },
  },
  Ct = ce(Ho, [["__scopeId", "data-v-4e610c2f"]]);
const Fo = { class: "toolbar bg-gray-100 p-2 border-b flex items-center" },
  Lo = {
    __name: "TextEditorTopTextEdit",
    props: {
      modelValue: String,
      fontSize: [Number, String],
      textColorId: [String, Number],
      backgroundColorId: [String, Number],
      isBold: [Boolean, Number],
      textAlignment: [String, Number],
    },
    emits: [
      "update:modelValue",
      "update:fontSize",
      "update:textColorId",
      "update:backgroundColorId",
      "update:isBold",
      "update:textAlignment",
    ],
    setup(e, { emit: t }) {
      var R, y, $;
      const s = e,
        n = v((R = s.isBold) != null ? R : !1),
        l = v((y = s.textAlignment) != null ? y : ""),
        i = v(($ = s.modelValue) != null ? $ : ""),
        m = v(null),
        f = v(+s.fontSize),
        w = v({ color: "inherit" }),
        p = v({ color: "inherit" });
      fe(() => {
        var D;
        let c = (D = s.modelValue) != null ? D : "";
        (c = c.replace(
          /<br\s*\/?>/gi,
          `
`
        )),
          (c = c.replace(/<[^>]*>/g, "")),
          (i.value = c);
      });
      const k = () => `<span  class="truncate-text">${i.value}</span>`;
      j([i, l, n, f, w, p], (c) => {
        b();
        const D = k();
        t("update:modelValue", D);
      }),
        j(p, (c) => {
          (p.value.color === "inherit" || p.value.color === "#ffffff") &&
            ((l.value = "left"),
            w.value.color === "#ffffff" && (w.value.color = "inherit")),
            t("update:backgroundColorId", c.id);
        }),
        j(f, (c) => t("update:fontSize", c.toString())),
        j(w, (c) => {
          t("update:textColorId", c.id);
        }),
        j(n, (c) => t("update:isBold", c)),
        j(l, (c) => t("update:textAlignment", c));
      const u = () => {
          n.value = !n.value;
        },
        b = () => {
          te(() => {
            (m.value.style.height = "auto"),
              (m.value.style.height = m.value.scrollHeight + "px");
          });
        },
        _ = (c) => {
          b(), (l.value = c);
        },
        x = () => {
          b();
        },
        h = (c) => {
          if (c.key === "Tab") {
            c.preventDefault();
            const D = c.target.selectionStart,
              O = c.target.selectionEnd;
            i.value === null && (i.value = ""),
              (i.value =
                i.value.substring(0, D) + "      " + i.value.substring(O)),
              te(() => {
                c.target.selectionStart = c.target.selectionEnd = D + 6;
              });
          }
        };
      return (c, D) => (
        a(),
        d("div", null, [
          o("div", Fo, [
            r(
              Ht,
              {
                modelValue: f.value,
                "onUpdate:modelValue": D[0] || (D[0] = (O) => (f.value = O)),
              },
              null,
              8,
              ["modelValue"]
            ),
            r(
              Ct,
              {
                modelValue: w.value,
                "onUpdate:modelValue": D[1] || (D[1] = (O) => (w.value = O)),
                textColorId: e.textColorId,
              },
              null,
              8,
              ["modelValue", "textColorId"]
            ),
            r(
              wt,
              {
                modelValue: p.value,
                "onUpdate:modelValue": D[2] || (D[2] = (O) => (p.value = O)),
                backgroundColorId: e.backgroundColorId,
              },
              null,
              8,
              ["modelValue", "backgroundColorId"]
            ),
            o(
              "button",
              {
                type: "button",
                onClick: u,
                class: C([{ "bg-gray-300": n.value }, "p-1 rounded mr-2"]),
              },
              [r(W(V), { icon: "fa-solid:bold", class: "w-5 h-5" })],
              2
            ),
            o(
              "button",
              {
                type: "button",
                onClick: D[3] || (D[3] = (O) => _("left")),
                class: C([
                  { "bg-gray-300": l.value === "left" },
                  "p-1 rounded mr-2",
                ]),
              },
              [r(W(V), { icon: "fa-solid:align-left", class: "w-5 h-5" })],
              2
            ),
            o(
              "button",
              {
                type: "button",
                onClick: D[4] || (D[4] = (O) => _("center")),
                class: C([
                  { "bg-gray-300": l.value === "center" },
                  "p-1 rounded mr-2",
                ]),
              },
              [r(W(V), { icon: "fa-solid:align-center", class: "w-5 h-5" })],
              2
            ),
            o(
              "button",
              {
                type: "button",
                onClick: D[5] || (D[5] = (O) => _("right")),
                class: C([
                  { "bg-gray-300": l.value === "right" },
                  "p-1 rounded mr-2",
                ]),
              },
              [r(W(V), { icon: "fa-solid:align-right", class: "w-5 h-5" })],
              2
            ),
          ]),
          X(
            o(
              "textarea",
              {
                ref_key: "editor",
                ref: m,
                class: C([
                  "overflow-y-hidden resize-none min-h-[200px] rounded focus:border-gray-700 focus:border-2 focus:outline-none focus:ring-gray-700 border-gray-600 mt-2 py-2 px-3 border w-full resize-none",
                  {
                    "font-bold": n.value,
                    "justify-start text-left": l.value === "left",
                    "justify-center text-center": l.value === "center",
                    "justify-end text-right": l.value === "right",
                    "items-center py-[87px]":
                      p.value.color !== "inherit" &&
                      p.value.color !== "#ffffff",
                  },
                ]),
                style: q({
                  fontSize: 16 + f.value + "px",
                  height:
                    p.value.color !== "inherit" && p.value.color !== "#ffffff"
                      ? 87 + 87 + 10 + f.value + 10 + "px"
                      : "44px",
                  color: w.value.color,
                  backgroundColor: p.value.color,
                }),
                onPaste: x,
                onInput: x,
                onKeydown: h,
                "onUpdate:modelValue": D[6] || (D[6] = (O) => (i.value = O)),
              },
              null,
              38
            ),
            [[se, i.value]]
          ),
        ])
      );
    },
  },
  Mo = ce(Lo, [["__scopeId", "data-v-62c9d521"]]),
  Bo = { class: "toolbar bg-gray-100 p-2 border-b flex items-center" },
  No = {
    __name: "TextEditorTitleEdit",
    props: {
      modelValue: String,
      textColorId: [String, Number],
      backgroundColorId: [String, Number],
      textAlignment: String,
    },
    emits: [
      "update:modelValue",
      "update:textColorId",
      "update:backgroundColorId",
      "update:textAlignment",
    ],
    setup(e, { emit: t }) {
      var u, b;
      const s = e,
        n = v((u = s.textAlignment) != null ? u : ""),
        l = v((b = s.modelValue) != null ? b : ""),
        i = v(null),
        m = v({ color: "inherit" }),
        f = v({ color: "inherit" });
      fe(() => {
        var x;
        let _ = (x = s.modelValue) != null ? x : "";
        (_ = _.replace(
          /<br\s*\/?>/gi,
          `
`
        )),
          (_ = _.replace(/<[^>]*>/g, "")),
          (l.value = _);
      });
      const w = () => `<span>${l.value}</span>`;
      j([l, n, m, f], (_) => {
        const x = w();
        t("update:modelValue", x);
      }),
        j(f, (_) => {
          (f.value.color === "inherit" || f.value.color === "#ffffff") &&
            ((n.value = "left"),
            m.value.color === "#ffffff" && (m.value.color = "inherit")),
            t("update:backgroundColorId", _.id);
        }),
        j(m, (_) => {
          t("update:textColorId", _.id);
        }),
        j(n, (_) => t("update:textAlignment", _));
      const p = (_) => {
          n.value = _;
        },
        k = (_) => {
          let x = _.target.value.replace(/[\r\n]/g, "");
          (x = x.substring(0, 35)), (l.value = x), t("update:modelValue", x);
        };
      return (_, x) => (
        a(),
        d("div", null, [
          o("div", Bo, [
            r(
              Ct,
              {
                modelValue: m.value,
                "onUpdate:modelValue": x[0] || (x[0] = (h) => (m.value = h)),
                textColorId: e.textColorId,
              },
              null,
              8,
              ["modelValue", "textColorId"]
            ),
            r(
              wt,
              {
                modelValue: f.value,
                "onUpdate:modelValue": x[1] || (x[1] = (h) => (f.value = h)),
                backgroundColorId: e.backgroundColorId,
              },
              null,
              8,
              ["modelValue", "backgroundColorId"]
            ),
            o(
              "button",
              {
                type: "button",
                onClick: x[2] || (x[2] = (h) => p("left")),
                class: C([
                  { "bg-gray-300": n.value === "left" },
                  "p-1 rounded mr-2",
                ]),
              },
              [r(W(V), { icon: "fa-solid:align-left", class: "w-5 h-5" })],
              2
            ),
            o(
              "button",
              {
                type: "button",
                onClick: x[3] || (x[3] = (h) => p("center")),
                class: C([
                  { "bg-gray-300": n.value === "center" },
                  "p-1 rounded mr-2",
                ]),
              },
              [r(W(V), { icon: "fa-solid:align-center", class: "w-5 h-5" })],
              2
            ),
            o(
              "button",
              {
                type: "button",
                onClick: x[4] || (x[4] = (h) => p("right")),
                class: C([
                  { "bg-gray-300": n.value === "right" },
                  "p-1 rounded mr-2",
                ]),
              },
              [r(W(V), { icon: "fa-solid:align-right", class: "w-5 h-5" })],
              2
            ),
          ]),
          X(
            o(
              "textarea",
              {
                ref_key: "editor",
                ref: i,
                class: C([
                  "overflow-y-hidden resize-none rounded focus:border-gray-700 focus:border-2 focus:outline-none focus:ring-gray-700 border-gray-600 mt-2 py-2 px-3 border w-full",
                  {
                    "font-bold": !0,
                    "justify-start text-left": n.value === "left",
                    "justify-center text-center": n.value === "center",
                    "justify-end text-right": n.value === "right",
                    "items-center py-[20px]":
                      f.value.color !== "inherit" &&
                      f.value.color !== "#ffffff",
                  },
                ]),
                onInput: k,
                style: q({
                  height:
                    f.value.color !== "inherit" && f.value.color !== "#ffffff"
                      ? 69 + "px"
                      : "44px",
                  color: m.value.color,
                  backgroundColor: f.value.color,
                }),
                "onUpdate:modelValue": x[5] || (x[5] = (h) => (l.value = h)),
              },
              null,
              38
            ),
            [[se, l.value]]
          ),
        ])
      );
    },
  },
  Ye = "/uploads/posts/";
const Wo = Ft(zt, Vt, Wt, Nt, Bt, Mt, Lt),
  Vo = {
    components: {
      FilePond: Wo,
      Loader: $e,
      TradesWithDialog: qt,
      InputLabel: Jt,
      InputError: Ie,
      TextEditorTopTextEdit: Mo,
      TextEditorTitleEdit: No,
      SelectProfile: Yt,
      CustomDialog: ne,
      Icon: V,
      Badge: Zt,
      MultiSelect: Gt,
    },
    props: ["form", "isOpen", "id", "success", "imageArray", "loadingUpdate"],
    data() {
      return {
        myFiles: v([]),
        options: Qt,
        playVideo: !1,
        previousImages: this.imageArray,
        isUploading: !1,
        referenceList: v([]),
        selectedReferal: v(""),
        original: "",
        selectedItems: null,
        selectAll: !1,
        isModalOpened: this.isOpen,
        postTrades: [],
        loadingPostTrades: !1,
        tradesPost: {
          trade1: !1,
          trade2: !1,
          trade3: !1,
          trade4: !1,
          trade5: !1,
          trade6: !1,
          trade7: !1,
          trade8: !1,
          trade9: !1,
          trade10: !1,
          trade11: !1,
          trade12: !1,
          trade13: !1,
          trade14: !1,
          trade15: !1,
          trade16: !1,
          trade17: !1,
          trade18: !1,
          trade19: !1,
          trade20: !1,
          trade21: !1,
          trade22: !1,
          trade23: !1,
          trade24: !1,
          trade25: !1,
          trade26: !0,
          trade27: !0,
          trade28: !0,
          trade29: !0,
          trade30: !0,
        },
      };
    },
    async mounted() {
      this.$refs.pond.removeFiles(),
        (this.myFiles = []),
        (this.form.image = ""),
        await this.fetchPostTrades(),
        this.$store.dispatch("ratings/getRegions");
    },
    computed: {
      ...ie("ratings", ["regions", "loading", "trades"]),
      ...ie(["translations", "userVersion"]),
      maxImages() {
        if (this.userVersion === 1) return 3;
        if (this.userVersion === 2) return 15;
        if (this.userVersion === 3) return 20;
      },
      upgradeImageText() {
        if (this.userVersion === 1)
          return (
            this.translations &&
            this.translations.upgrade_to_gold_version_for_15_images
          );
        if (this.userVersion === 2)
          return (
            this.translations &&
            this.translations.upgrade_to_platinum_version_for_20_images
          );
        if (this.userVersion === 3) return "";
      },
    },
    emits: ["formsave", "formclose"],
    watch: {
      isModalOpened(e) {
        console.log(e, "isOpen is called", this.myFiles),
          e && (this.myFiles = []);
      },
      regions(e) {
        if (e.length > 0) {
          this.referenceList = this.regions.map((n) => n.name);
          const t = this.regions.find((n) => n.id === +this.form.region_id),
            s = t ? t.name : void 0;
          this.selectedReferal = s;
        }
      },
      success(e) {
        e && (this.myFiles = []);
      },
      tradesPost: {
        handler(e) {
          this.postTrades = Object.entries(e)
            .filter(([t, s]) => s)
            .map(([t]) => parseInt(t.replace(/^trade/, ""), 10));
        },
        deep: !0,
      },
      selectedItems(e) {
        this.form.trades = this.selectedItems
          .map((t) => {
            const s = t.id.match(/\d+$/);
            return s ? parseInt(s[0], 10) : null;
          })
          .filter(Number.isInteger);
      },
    },
    methods: {
      toggleSwitch(e) {
        if (
          this.userVersion === 1 &&
          !this.tradesPost[e] &&
          Object.values(this.tradesPost).reduce((s, n) => s + !!n, 0) >= 8
        ) {
          this.$store.commit("setIsUpgradeToGoldPlatinumDialogOpen", !0);
          return;
        }
        if (e === "trade1") {
          const t = !this.tradesPost.trade1;
          if (this.userVersion !== 1)
            for (let s = 1; s <= 24; s++) this.tradesPost["trade" + s] = t;
          else this.tradesPost["trade" + 1] = t;
        } else this.tradesPost[e] = !this.tradesPost[e];
        allSelected ? (this.selectAll = !0) : (this.selectAll = !1);
      },
      insertTabBody2(e) {
        if (e.key === "Tab") {
          e.preventDefault();
          const t = e.target.selectionStart,
            s = e.target.selectionEnd;
          this.form.body2 === null && (this.form.body2 = ""),
            (this.form.body2 =
              this.form.body2.substring(0, t) +
              "      " +
              this.form.body2.substring(s));
        }
        te(() => {
          e.target.selectionStart = e.target.selectionEnd = start + 6;
        });
      },
      handleFilePondProcessStart(e) {
        this.isUploading = !0;
      },
      async handleFileReorder() {
        let e = this.form.image.split("|"),
          t = this.$refs.pond.getFiles(),
          s = new FormData();
        e.forEach((n, l) => {
          s.append(`images[${l}]`, n);
        }),
          t.forEach((n, l) => {
            n.file && s.append(`imageFiles[${l}]`, n.file);
          }),
          le
            .post("/api/re-order", s, jt())
            .then((n) => {
              this.form.image = this.reverseAndJoinString(n.data);
            })
            .catch((n) => {
              console.error("Error uploading images", n);
            });
      },
      async checkAllFilesProcessed() {
        this.$refs.pond.getFiles().every((t) => t.status === 5) &&
          (await this.handleFileReorder()),
          (this.isUploading = !1);
      },
      sortFiles(e, t) {
        return e.file && t.file
          ? e.fileSize < t.fileSize
            ? -1
            : e.fileSize > t.fileSize
            ? 1
            : 0
          : 0;
      },
      handleFilePondProcessEnd(e, t) {},
      handleFilePondError(e) {
        this.isUploading = !1;
      },
      handleFilePondInit() {
        this.myFiles = [];
        let e = this.form.image ? this.form.image.split("|") : [];
        for (let t = 0; t < e.length; t++)
          e[t].startsWith("uploads/posts") &&
            (console.log("here in the init", e[t]),
            this.myFiles.push({
              source: "/" + e[t],
              options: { type: "local", metadata: { poster: "/" + e[t] } },
            }));
      },
      reverseAndJoinString(e) {
        let t = e.split("|");
        return (t = t.reverse()), t.join("|");
      },
      addFormImage(e) {
        let t = this.form.image ? this.form.image.split("|") : [];
        t.push(e),
          (this.form.image = t.join("|")),
          (this.original = t.join("|"));
      },
      removeFormImage(e) {
        let t = this.form.image ? this.form.image.split("|") : [];
        t.remove(e), (this.form.image = t.join("|"));
      },
      handleFilePondLoad(e) {
        return this.addFormImage(e), e;
      },
      handleFilePondRemove(e, t, s) {
        this.removeFormImage(e.replace(/^\//, "")), t();
      },
      handleFilePondRevert(e, t, s) {
        this.removeFormImage(e),
          le.post("/upload-post-revert", { image: e }),
          t();
      },
      async handleFilePondRevertedEnd() {
        (this.isUploading = !0),
          await this.handleFileReorder(),
          (this.isUploading = !1);
      },
      openDialog() {
        this.$refs.tradeDialogRef.openDialog();
      },
      handleSubmit() {
        this.$refs.tradeDialogRef.closeDialog();
      },
      updateFiles(e) {},
      selectAllTrades() {
        if (this.selectAll) {
          this.selectAll = !this.selectAll;
          for (let e in this.tradesPost) this.tradesPost[e] = 0;
        } else {
          this.selectAll = !this.selectAll;
          for (let e in this.tradesPost) this.tradesPost[e] = 1;
        }
      },
      image_path(e) {
        return Ye + e;
      },
      isVideo(e) {
        let t = e.split(".").pop();
        return (
          (t == "mp4") | (t == "mov")
            ? (this.playVideo = !0)
            : (this.playVideo = !1),
          this.playVideo
        );
      },
      removeImage(e) {
        this.previousImages.splice(e, 1);
      },
      onUpdate() {
        let e;
        (e = this.previousImages.join("|")),
          (this.form.image = this.form.image
            ? this.reverseAndJoinString(this.form.image)
            : this.form.image),
          this.form.image && e
            ? (this.form.image = e + "|" + this.form.image)
            : !this.form.image && e && (this.form.image = e),
          (this.form.trades = this.postTrades);
        let t = { ...this.form };
        this.$emit("formsave", t);
      },
      reverseAndJoinString(e) {
        let t = e.split("|");
        return (t = t.reverse()), t.join("|");
      },
      async fetchPostTrades() {
        this.loadingPostTrades = !0;
        try {
          const e = await le.get(`/api/posts/${this.form.id}/trades`, H());
          e.data &&
            ((this.postTrades = e.data.trade_ids),
            this.postTrades.forEach((s) => {
              this.tradesPost[`trade${s}`] = !0;
            }),
            Object.values(this.tradesPost).every((s) => s === 1 || s === !0) &&
              (this.selectAll = !0));
        } catch {
          F();
        } finally {
          this.loadingPostTrades = !1;
        }
      },
    },
  };
Array.prototype.remove = function () {
  for (var e, t = arguments, s = t.length, n; s && this.length; )
    for (e = t[--s]; (n = this.indexOf(e)) !== -1; ) this.splice(n, 1);
  return this;
};
const It = (e) => (ze("data-v-1b4f20b2"), (e = e()), qe(), e),
  zo = { class: "w-full" },
  qo = { class: "mt-1 text-base" },
  Go = { class: "mb-4 sm:mb-0 mt-4" },
  Ko = { key: 0, class: "flex items-center gap-4 mt-4 mb-5" },
  Xo = { for: "select_all", class: "mr-4 text-gray-800 font-bold" },
  Jo = { class: "grid mt-8 gap-3" },
  Yo = ["for"],
  Zo = ["onClick"],
  Qo = {
    class:
      "fixed z-40 inset-0 overflow-y-auto ease-out duration-400 overscroll-contain",
  },
  el = {
    key: 0,
    class:
      "flex items-start justify-start min-h-screen mt-5 pt-4 px-1 pb-20 text-center sm:block sm:p-0",
  },
  tl = It(() =>
    o("div", { class: "absolute inset-0 bg-gray-500 opacity-70" }, null, -1)
  ),
  sl = [tl],
  ol = {
    class:
      "inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-full mx-2 sm:my-8 sm:align-middle sm:w-full md:max-w-2xl",
    role: "dialog",
    "aria-modal": "true",
    "aria-labelledby": "modal-headline",
  },
  ll = { class: "bg-white px-4 pt-5 pb-4 sm:p-6" },
  il = { key: 0, class: "" },
  nl = {
    class:
      "flex justify-start items-center pb-2 space-x-2 text-blue-rgba font-bold text-xl md:text-3xl",
  },
  al = It(() =>
    o(
      "img",
      { src: "/images/icons/post_b.png", width: "25", height: "25" },
      null,
      -1
    )
  ),
  rl = { class: "" },
  dl = { key: 0, class: "mb-2" },
  ul = {
    for: "formPostTitle",
    class: "block text-gray-700 text-sm font-bold mb-1",
  },
  cl = { key: 0, class: "text-red-500" },
  ml = { class: "mb-2 closing" },
  fl = {
    for: "formPostbody1",
    class: "block text-gray-700 text-sm font-bold mb-1",
  },
  gl = { key: 0, class: "text-red-500" },
  pl = { class: "mb-4" },
  hl = {
    for: "formPostImage",
    class: "block text-gray-700 text-sm font-bold mb-2",
  },
  vl = { class: "italic lowercase font-normal text-xs" },
  _l = { key: 0, class: "w-full flex flex-col gap-2 mb-2" },
  yl = {
    key: 0,
    class: "w-full h-full rounded-lg object-cover",
    controls: "",
    autoplay: "",
    loop: "",
    muted: "",
  },
  xl = ["src"],
  bl = { key: 1, class: "bg-[#222] p-2 rounded-md" },
  kl = ["src"],
  wl = { key: 1, class: "mb-4" },
  Cl = {
    for: "formPostbody2",
    class: "block text-gray-700 text-sm font-bold mb-2",
  },
  Il = ["placeholder"],
  Tl = { key: 0, class: "text-red-500" },
  Sl = { class: "mb-4 sm:mb-0" },
  El = { class: "text-lg" },
  Pl = { class: "mb-4 sm:mb-0 mt-1" },
  Ol = { class: "flex justify-between mb-2" },
  Rl = { class: "text-lg font-bold text-[#241e6d]" },
  $l = { class: "bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" },
  Dl = { class: "flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto" },
  Al = ["disabled"],
  jl = { class: "mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto" },
  Ul = ["disabled"];
function Hl(e, t, s, n, l, i) {
  const m = S("InputError"),
    f = S("CustomDialog"),
    w = S("Loader"),
    p = S("TextEditorTitleEdit"),
    k = S("TextEditorTopTextEdit"),
    u = S("Icon"),
    b = S("file-pond"),
    _ = S("InputLabel"),
    x = S("TradesWithDialog");
  return (
    a(),
    d(
      M,
      null,
      [
        r(
          f,
          {
            submitText: e.translations && e.translations.okay,
            shouldFetchPost: !1,
            onSubmit: i.handleSubmit,
            showCancel: !1,
            ref: "tradeDialogRef",
            title: e.translations && e.translations.edit_trade_groups,
          },
          {
            default: E(() => [
              o("div", zo, [
                o("span", qo, [
                  o(
                    "strong",
                    null,
                    g(e.translations && e.translations.hint),
                    1
                  ),
                  pe(
                    " " +
                      g(
                        e.translations &&
                          e.translations.select_the_trade_groups_for_your_post
                      ),
                    1
                  ),
                ]),
              ]),
              o("div", Go, [
                e.userVersion !== 1
                  ? (a(),
                    d("div", Ko, [
                      o(
                        "div",
                        {
                          class: "switch-trades",
                          onClick:
                            t[0] ||
                            (t[0] = (...h) =>
                              i.selectAllTrades && i.selectAllTrades(...h)),
                        },
                        [
                          o(
                            "div",
                            {
                              class: C([
                                l.selectAll
                                  ? "switch-bg-on-trades"
                                  : "switch-bg-off-trades",
                              ]),
                            },
                            [
                              o(
                                "div",
                                {
                                  class: C([
                                    l.selectAll
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
                        ]
                      ),
                      o(
                        "label",
                        Xo,
                        g(e.translations && e.translations.select_all),
                        1
                      ),
                    ]))
                  : I("", !0),
                o("div", Jo, [
                  (a(!0),
                  d(
                    M,
                    null,
                    G(
                      l.options,
                      (h, R) => (
                        a(),
                        d(
                          "div",
                          {
                            key: R,
                            class:
                              "flex items-center justify-between sm:w-96 sm:ml-3 mb-5",
                          },
                          [
                            o(
                              "label",
                              {
                                for: h.id,
                                class: "mr-4 max-sm:text-sm font-bold",
                              },
                              g(h.name),
                              9,
                              Yo
                            ),
                            o(
                              "div",
                              {
                                class: "switch",
                                onClick: (y) => i.toggleSwitch(h.id),
                              },
                              [
                                o(
                                  "div",
                                  {
                                    class: C([
                                      l.tradesPost[h.id]
                                        ? "switch-bg-on"
                                        : "switch-bg-off",
                                    ]),
                                  },
                                  [
                                    o(
                                      "div",
                                      {
                                        class: C([
                                          l.tradesPost[h.id]
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
                              Zo
                            ),
                          ]
                        )
                      )
                    ),
                    128
                  )),
                ]),
                r(
                  m,
                  { class: "mt-2", message: e.$page.props.errors.trades },
                  null,
                  8,
                  ["message"]
                ),
              ]),
            ]),
            _: 1,
          },
          8,
          ["submitText", "onSubmit", "title"]
        ),
        o("div", Qo, [
          s.isOpen
            ? (a(),
              d("div", el, [
                o(
                  "div",
                  {
                    class: "fixed inset-0 transition-opacity",
                    onClick: t[1] || (t[1] = (h) => e.$emit("formclose")),
                  },
                  sl
                ),
                o("div", ol, [
                  o("form", null, [
                    o("div", ll, [
                      r(
                        w,
                        {
                          loading: e.loading || l.loadingPostTrades,
                          background: "",
                          height: "30vh",
                        },
                        null,
                        8,
                        ["loading"]
                      ),
                      !e.loading && !l.loadingPostTrades
                        ? (a(),
                          d("div", il, [
                            o("div", nl, [
                              al,
                              o(
                                "p",
                                rl,
                                g(e.translations && e.translations.edit_post),
                                1
                              ),
                            ]),
                            e.userVersion !== 1
                              ? (a(),
                                d("div", dl, [
                                  o(
                                    "label",
                                    ul,
                                    g(
                                      e.translations &&
                                        e.translations.post_title_max_35char
                                    ),
                                    1
                                  ),
                                  r(
                                    p,
                                    {
                                      modelValue: s.form.title,
                                      "onUpdate:modelValue":
                                        t[2] ||
                                        (t[2] = (h) => (s.form.title = h)),
                                      textColorId: s.form.title_text_color_id,
                                      "onUpdate:textColorId":
                                        t[3] ||
                                        (t[3] = (h) =>
                                          (s.form.title_text_color_id = h)),
                                      backgroundColorId:
                                        s.form.title_background_color_id,
                                      "onUpdate:backgroundColorId":
                                        t[4] ||
                                        (t[4] = (h) =>
                                          (s.form.title_background_color_id =
                                            h)),
                                      textAlignment:
                                        s.form.title_text_alignment,
                                      "onUpdate:textAlignment":
                                        t[5] ||
                                        (t[5] = (h) =>
                                          (s.form.title_text_alignment = h)),
                                    },
                                    null,
                                    8,
                                    [
                                      "modelValue",
                                      "textColorId",
                                      "backgroundColorId",
                                      "textAlignment",
                                    ]
                                  ),
                                  e.$page.props.errors.title
                                    ? (a(),
                                      d(
                                        "div",
                                        cl,
                                        g(e.$page.props.errors.title),
                                        1
                                      ))
                                    : I("", !0),
                                ]))
                              : I("", !0),
                            o("div", ml, [
                              o(
                                "label",
                                fl,
                                g(
                                  e.translations &&
                                    e.translations.top_text_required
                                ),
                                1
                              ),
                              r(
                                k,
                                {
                                  modelValue: s.form.body1,
                                  "onUpdate:modelValue":
                                    t[6] || (t[6] = (h) => (s.form.body1 = h)),
                                  fontSize: s.form.font_size,
                                  "onUpdate:fontSize":
                                    t[7] ||
                                    (t[7] = (h) => (s.form.font_size = h)),
                                  textColorId: s.form.post_text_color_id,
                                  "onUpdate:textColorId":
                                    t[8] ||
                                    (t[8] = (h) =>
                                      (s.form.post_text_color_id = h)),
                                  backgroundColorId:
                                    s.form.post_background_color_id,
                                  "onUpdate:backgroundColorId":
                                    t[9] ||
                                    (t[9] = (h) =>
                                      (s.form.post_background_color_id = h)),
                                  isBold: s.form.is_body_bold,
                                  "onUpdate:isBold":
                                    t[10] ||
                                    (t[10] = (h) => (s.form.is_body_bold = h)),
                                  textAlignment: s.form.text_alignment,
                                  "onUpdate:textAlignment":
                                    t[11] ||
                                    (t[11] = (h) =>
                                      (s.form.text_alignment = h)),
                                },
                                null,
                                8,
                                [
                                  "modelValue",
                                  "fontSize",
                                  "textColorId",
                                  "backgroundColorId",
                                  "isBold",
                                  "textAlignment",
                                ]
                              ),
                              e.$page.props.errors.body1
                                ? (a(),
                                  d(
                                    "div",
                                    gl,
                                    g(e.$page.props.errors.body1),
                                    1
                                  ))
                                : I("", !0),
                            ]),
                            o("div", pl, [
                              o("label", hl, [
                                pe(
                                  g(e.translations && e.translations.image) +
                                    " (" +
                                    g(e.translations && e.translations.max) +
                                    " " +
                                    g(i.maxImages) +
                                    ") ",
                                  1
                                ),
                                o("span", vl, g(i.upgradeImageText) + ": ", 1),
                              ]),
                              l.previousImages && l.previousImages.length > 0
                                ? (a(),
                                  d("div", _l, [
                                    r(
                                      Ae,
                                      {
                                        name: "comment-transition",
                                        tag: "div",
                                        class: "flex flex-col gap-1 sm:gap-2",
                                      },
                                      {
                                        default: E(() => [
                                          (a(!0),
                                          d(
                                            M,
                                            null,
                                            G(
                                              l.previousImages,
                                              (h, R) => (
                                                a(),
                                                d(
                                                  "div",
                                                  { key: R, class: "relative" },
                                                  [
                                                    r(
                                                      u,
                                                      {
                                                        icon: "charm:circle-cross",
                                                        width: "25",
                                                        class:
                                                          "absolute top-0 right-0 m-2 cursor-pointer text-white rounded-full ctive:scale-95 hover:bg-white hover:text-inherit transition transform duration-300",
                                                        onClick: (y) =>
                                                          i.removeImage(R),
                                                      },
                                                      null,
                                                      8,
                                                      ["onClick"]
                                                    ),
                                                    i.isVideo(h)
                                                      ? (a(),
                                                        d("video", yl, [
                                                          o(
                                                            "source",
                                                            {
                                                              src: i.image_path(
                                                                h
                                                              ),
                                                              type: "video/mp4",
                                                            },
                                                            null,
                                                            8,
                                                            xl
                                                          ),
                                                        ]))
                                                      : h
                                                      ? (a(),
                                                        d("div", bl, [
                                                          o(
                                                            "img",
                                                            {
                                                              ref_for: !0,
                                                              ref: "imageRef",
                                                              class: C(
                                                                "w-full object-contain object-center rounded-lg"
                                                              ),
                                                              style: {
                                                                maxHeight:
                                                                  256 + "px",
                                                              },
                                                              src: i.image_path(
                                                                h
                                                              ),
                                                              alt: "",
                                                            },
                                                            null,
                                                            8,
                                                            kl
                                                          ),
                                                        ]))
                                                      : I("", !0),
                                                  ]
                                                )
                                              )
                                            ),
                                            128
                                          )),
                                        ]),
                                        _: 1,
                                      }
                                    ),
                                  ]))
                                : I("", !0),
                              r(
                                b,
                                {
                                  name: "imageFilepond",
                                  ref: "pond",
                                  allowImageExifOrientation: "true",
                                  "allow-multiple": !0,
                                  "accepted-file-types": `image/png,
                                            image/jpeg,
                                            image/gif,
                                            image/bmp,
                                            image/svg,
                                            video/mp4,
                                            video/mov`,
                                  allowFileSizeValidation: "true",
                                  "item-insert-location": "before",
                                  "allow-reorder": !0,
                                  maxFileSize: "25MB",
                                  labelMaxTotalFileSizeExceeded:
                                    "Maximum Size Is 25MB",
                                  allowImageResize: "true",
                                  imageResizeMode: "contain",
                                  imageResizeTargetWidth: "1000",
                                  imageResizeTargetHeight: "2000",
                                  imageResizeUpscale: "true",
                                  maxFiles: i.maxImages,
                                  credits: "false",
                                  server: {
                                    url: "",
                                    timeout: 7e3,
                                    process: {
                                      url: "/upload-post",
                                      method: "POST",
                                      headers: {
                                        "X-CSRF-TOKEN":
                                          e.$page.props.csrf_token,
                                      },
                                      withCredentials: !1,
                                      onload: i.handleFilePondLoad,
                                      onerror: i.handleFilePondError,
                                    },
                                    remove: i.handleFilePondRemove,
                                    revert: i.handleFilePondRevert,
                                  },
                                  files: l.myFiles,
                                  onInit: i.handleFilePondInit,
                                  onSort: i.sortFiles,
                                  onProcessfiles: i.checkAllFilesProcessed,
                                  onError:
                                    t[12] ||
                                    (t[12] = () => {
                                      l.isUploading = !1;
                                    }),
                                  onAddfilestart: i.handleFilePondProcessStart,
                                  onProcessfilestart: () => {},
                                  onAddfile: i.handleFilePondProcessEnd,
                                  onProcessfileabort: i.handleFilePondError,
                                  onUpdatefiles: i.updateFiles,
                                  onRemovefile: i.handleFilePondProcessEnd,
                                  onReorderfiles: i.handleFileReorder,
                                  onProcessfilerevert:
                                    i.handleFilePondRevertedEnd,
                                  labelIdle: `${
                                    e.translations &&
                                    e.translations.drag_and_drop_files_or
                                  } <span class='filepond--label-action'> ${
                                    e.translations && e.translations.browse
                                  } </span>`,
                                },
                                null,
                                8,
                                [
                                  "maxFiles",
                                  "server",
                                  "files",
                                  "onInit",
                                  "onSort",
                                  "onProcessfiles",
                                  "onAddfilestart",
                                  "onAddfile",
                                  "onProcessfileabort",
                                  "onUpdatefiles",
                                  "onRemovefile",
                                  "onReorderfiles",
                                  "onProcessfilerevert",
                                  "labelIdle",
                                ]
                              ),
                            ]),
                            e.userVersion !== 1 && e.userVersion !== 2
                              ? (a(),
                                d("div", wl, [
                                  o(
                                    "label",
                                    Cl,
                                    g(
                                      e.translations &&
                                        e.translations.bottom_text_not_required
                                    ),
                                    1
                                  ),
                                  X(
                                    o(
                                      "textarea",
                                      {
                                        "onUpdate:modelValue":
                                          t[13] ||
                                          (t[13] = (h) => (s.form.body2 = h)),
                                        onKeydown:
                                          t[14] ||
                                          (t[14] = (...h) =>
                                            i.insertTabBody2 &&
                                            i.insertTabBody2(...h)),
                                        class:
                                          "w-full py-2 px-3 shadow appearance-none text-gray-900 font-semibold border rounded border-gray-600 leading-tight focus:outline-none focus:shadow-outline placeholder:italic placeholder:text-slate-500",
                                        rows: "3",
                                        id: "formPostbody2",
                                        placeholder:
                                          e.translations &&
                                          e.translations.bottom_text,
                                      },
                                      `
                `,
                                      40,
                                      Il
                                    ),
                                    [[se, s.form.body2]]
                                  ),
                                  e.$page.props.errors.body2
                                    ? (a(),
                                      d(
                                        "div",
                                        Tl,
                                        g(e.$page.props.errors.body2),
                                        1
                                      ))
                                    : I("", !0),
                                ]))
                              : I("", !0),
                            o("div", Sl, [
                              r(
                                _,
                                {
                                  class: "font-bold mb-1 mt-1",
                                  value:
                                    e.translations && e.translations.region,
                                },
                                null,
                                8,
                                ["value"]
                              ),
                              o("div", El, g(l.selectedReferal), 1),
                              r(
                                m,
                                {
                                  class: "mt-2",
                                  message: e.$page.props.errors.region_id,
                                },
                                null,
                                8,
                                ["message"]
                              ),
                            ]),
                            o("div", Pl, [
                              o("div", Ol, [
                                o(
                                  "div",
                                  Rl,
                                  g(
                                    e.translations &&
                                      e.translations.display_in_trades_group
                                  ),
                                  1
                                ),
                                o(
                                  "div",
                                  {
                                    onClick:
                                      t[15] ||
                                      (t[15] = (...h) =>
                                        i.openDialog && i.openDialog(...h)),
                                    class:
                                      "cursor-pointer text-base font-bold self-center text-[#241e6d]",
                                  },
                                  g(e.translations && e.translations.edit),
                                  1
                                ),
                              ]),
                              r(
                                x,
                                {
                                  modelValue: l.tradesPost,
                                  "onUpdate:modelValue":
                                    t[16] ||
                                    (t[16] = (h) => (l.tradesPost = h)),
                                },
                                null,
                                8,
                                ["modelValue"]
                              ),
                            ]),
                          ]))
                        : I("", !0),
                    ]),
                    o("div", $l, [
                      o("span", Dl, [
                        o(
                          "button",
                          {
                            type: "button",
                            onClick:
                              t[17] ||
                              (t[17] = (...h) =>
                                i.onUpdate && i.onUpdate(...h)),
                            disabled: l.isUploading || s.loadingUpdate,
                            class: C(
                              `inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5 ${
                                l.isUploading || s.loadingUpdate
                                  ? "disabled"
                                  : ""
                              }`
                            ),
                          },
                          g(
                            s.loadingUpdate
                              ? e.translations && e.translations.updating
                              : e.translations && e.translations.update
                          ) +
                            " " +
                            g(e.translations && e.translations.post),
                          11,
                          Al
                        ),
                      ]),
                      o("span", jl, [
                        o(
                          "button",
                          {
                            type: "button",
                            disabled: l.isUploading,
                            onClick:
                              t[18] || (t[18] = (h) => e.$emit("formclose")),
                            class:
                              "inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5",
                          },
                          g(e.translations && e.translations.edit) +
                            " " +
                            g(e.translations && e.translations.cancel),
                          9,
                          Ul
                        ),
                      ]),
                    ]),
                  ]),
                ]),
              ]))
            : I("", !0),
        ]),
      ],
      64
    )
  );
}
const Fl = ce(Vo, [
    ["render", Hl],
    ["__scopeId", "data-v-1b4f20b2"],
  ]),
  Ll = {
    class: "sm:p-4 p-3 bg-blue-100 border border-blue-200 rounded-lg mb-2",
  },
  Ml = { class: "text-lg font-semibold" },
  Bl = { class: "mt-1 sm:mt-2 text-blue-700" },
  Nl = { class: "" },
  Wl = ["placeholder"],
  Vl = { class: "text-white" },
  zl = {
    __name: "ReportPost",
    props: { postId: [String, Number] },
    setup(e, { expose: t }) {
      const { postId: s } = e,
        n = v(""),
        l = v(),
        i = v(!1),
        m = v(""),
        f = v(!1),
        w = ue(),
        p = K(() => w.getters.translations);
      j(
        () => n.value,
        () => {
          m.value = "";
        }
      );
      const k = () => {
          let y = !0;
          return (
            (m.value = ""),
            (!n.value || n.value.trim() === "") &&
              ((m.value = "Report text should not be empty."), (y = !1)),
            y
          );
        },
        u = async () => {
          if (k()) {
            f.value = !0;
            let y;
            y = { report_text: Ce(n) };
            try {
              const $ = await axios.post(`/api/posts/${s}/report`, y, H());
              $.data && de($.data.message || "Post is Reported.");
            } catch ($) {
              F($.response.data.message, "inherit");
            } finally {
              (f.value = !1), l.value.closeDialog();
            }
          }
        };
      t({ openDialog: () => l.value.openDialog() });
      const _ = v(),
        x = (y) => {
          if (y.key === "Tab") {
            y.preventDefault();
            const $ = y.target.selectionStart,
              c = y.target.selectionEnd;
            (n.value =
              n.value.substring(0, $) + "      " + n.value.substring(c)),
              te(() => {
                y.target.selectionStart = y.target.selectionEnd = $ + 6;
              });
          }
        },
        h = () => {
          te(() => {
            (_.value.style.height = "auto"),
              (_.value.style.height = _.value.scrollHeight + "px");
          });
        },
        R = () => {
          (i.value = !0), h();
        };
      return (y, $) => {
        const c = S("v-progress-linear"),
          D = S("v-dialog");
        return (
          a(),
          d(
            M,
            null,
            [
              (a(),
              L(re, { to: "body" }, [
                r(
                  ne,
                  {
                    submitText: p.value && p.value.report_now,
                    onSubmit: u,
                    ref_key: "dialogRef",
                    ref: l,
                    onOpened: R,
                    loading: f.value,
                    disabled: y.disabledSending,
                    title: p.value && p.value.report_post,
                  },
                  {
                    default: E(() => [
                      o("form", null, [
                        o("div", Ll, [
                          o("h3", Ml, g(p.value && p.value.note) + ": ", 1),
                          o(
                            "p",
                            Bl,
                            g(p.value && p.value.confidential_report_to_admin),
                            1
                          ),
                        ]),
                        o("div", Nl, [
                          X(
                            o(
                              "textarea",
                              {
                                id: "reportText",
                                type: "text",
                                rows: 4,
                                class:
                                  "block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm overflow-hidden",
                                required: "",
                                "onUpdate:modelValue":
                                  $[0] || ($[0] = (O) => (n.value = O)),
                                ref_key: "textRef",
                                ref: _,
                                onKeydown: x,
                                onInput: h,
                                onPaste: h,
                                placeholder:
                                  p.value &&
                                  p.value.describe_objectionable_content,
                              },
                              null,
                              40,
                              Wl
                            ),
                            [[se, n.value]]
                          ),
                          m.value
                            ? (a(),
                              L(
                                Ie,
                                { key: 0, class: "mt-2", message: m.value },
                                null,
                                8,
                                ["message"]
                              ))
                            : I("", !0),
                        ]),
                      ]),
                    ]),
                    _: 1,
                  },
                  8,
                  ["submitText", "loading", "disabled", "title"]
                ),
              ])),
              i.value
                ? (a(),
                  L(
                    D,
                    {
                      key: 0,
                      class: "dialog-modal",
                      modelValue: y.loadingComment,
                      "onUpdate:modelValue":
                        $[1] || ($[1] = (O) => (y.loadingComment = O)),
                      scrim: "transparent",
                      persistent: "",
                      width: "auto",
                    },
                    {
                      default: E(() => [
                        r(
                          je,
                          {
                            shadowLevel: 2,
                            bgColor: "#364fc7",
                            padding: y.screenWidth < 640 ? "7px" : "10px",
                          },
                          {
                            default: E(() => [
                              o(
                                "div",
                                Vl,
                                g(p.value && p.value.post_reporting),
                                1
                              ),
                              r(c, {
                                indeterminate: "",
                                color: "#fff",
                                class: "mb-0",
                              }),
                            ]),
                            _: 1,
                          },
                          8,
                          ["padding"]
                        ),
                      ]),
                      _: 1,
                    },
                    8,
                    ["modelValue"]
                  ))
                : I("", !0),
            ],
            64
          )
        );
      };
    },
  },
  ql = {
    components: {
      Link: yt,
      CustomDialog: ne,
      ReportPost: zl,
      InputError: Ie,
      PostFormEdit: Fl,
    },
    props: {
      showingPostingActionMenu: Boolean,
      postID: Number,
      postUserId: Number,
      post: Object,
      currentUserId: Number,
      imageArray: Array,
    },
    data() {
      let e = De().props.value;
      return {
        isFormOpen: !1,
        loadingUpdate: !1,
        loadingDelete: !1,
        success: !1,
        postToEdit: { ...this.post },
        profileId: e.profile.id,
        loadingBlockContact: !1,
        loadingEditRepost: !1,
        commentText: "",
        commentTextError: "",
      };
    },
    emits: ["repostEdited"],
    computed: { ...ie(["translations"]) },
    mounted() {
      this.postToEdit.image = "";
    },
    methods: {
      openEditForm(e) {
        this.post.repost_comment
          ? ((this.commentText = this.post.repost_comment),
            this.$refs.editRepostCommentDialogRef.openDialog())
          : ((this.postToEdit = { ...this.post }),
            (this.showingNavigationDropdown = !1),
            (this.isFormOpen = !0));
      },
      closeEditModal() {
        this.isFormOpen = !1;
      },
      validate() {
        let e = !0;
        return (
          (this.commentTextError = ""),
          (!this.commentText || this.commentText.trim() === "") &&
            ((this.commentTextError =
              this.translations &&
              this.translations.repost_should_not_be_empty),
            (e = !1)),
          e
        );
      },
      async onEditRepost() {
        if (this.validate()) {
          this.loadingEditRepost = !0;
          const e = { repost_comment: we(this.commentText) };
          try {
            (
              await axios.patch(
                `/api/posts/${this.post.id}/edit-repost`,
                e,
                H()
              )
            ).data &&
              (this.$emit("repostEdited", this.commentText, this.post.id),
              de(
                this.translations &&
                  this.translations.changes_successfully_saved
              ));
          } catch (t) {
            F(t.response.data.message, "inherit");
          } finally {
            (this.loadingEditRepost = !1),
              this.$refs.editRepostCommentDialogRef.closeDialog();
          }
        }
      },
      async handleSubmitDelete() {
        this.loadingDelete = !0;
        let e = "/post/" + this.post.id;
        this.$inertia.delete(e, {
          onFinish: () => {
            this.loadingDelete = !1;
          },
          onSuccess: () => {
            (this.loadingDelete = !1),
              de("Post Successfully Deleted"),
              this.$store.commit("profile/setDeletedPost", this.post),
              this.$refs.deleteDialogRef.closeDialog();
          },
        });
      },
      openDeletedPostDialog() {
        this.$refs.deleteDialogRef.openDialog();
      },
      openPostReportDialog() {
        this.$refs.repostPostDialogRef.openDialog();
      },
      openBlockContactDialog() {
        this.$refs.blockDialogRef.openDialog();
      },
      async handleSubmitBlock() {
        this.loadingBlockContact = !0;
        try {
          const e = await axios.post(
            `/api/user/${this.post.user_id}/block`,
            {},
            H()
          );
          e.data &&
            (de(e.data.message || "User Successfully Blocked"),
            this.$store.commit("profile/setDeletedPost", this.post));
        } catch (e) {
          F(e.response.data.message, "inherit");
        } finally {
          (this.loadingBlockContact = !1),
            this.$refs.blockDialogRef.closeDialog();
        }
      },
      async saveItem(e) {
        (this.success = !1),
          (this.loadingUpdate = !0),
          (e.is_body_bold = e.is_body_bold ? 1 : 0),
          (e.title = e.title ? await we(e.title) : e.title),
          (e.body1 = e.body1 ? await we(e.body1) : e.body1),
          (e.body2 = e.body2 ? await we(e.body2) : e.body2);
        let t = "/post";
        if ((e.id && ((t = "/post/" + e.id), (e._method = "PATCH")), e.image)) {
          const n = e.image
            .split("|")
            .map((l) =>
              l.startsWith("uploads/posts/") ? l : "uploads/posts/" + l
            );
          e.image = n.join("|");
        }
        this.$inertia.patch(t, e, {
          onError: () => {
            this.loadingUpdate = !1;
          },
          onFinish: () => {
            this.loadingUpdate = !1;
          },
          onSuccess: () => {
            this.closeEditModal(),
              (this.success = !0),
              (this.loadingUpdate = !1),
              this.$store.commit("profile/setUpdatedPostId", e.id),
              de("Post Successfully updated");
          },
        });
      },
    },
  },
  Gl = { id: "", class: "z-50 fixed top-4 right-2 left-4 included" },
  Kl = { class: "" },
  Xl = ["id"],
  Jl = { key: 0 },
  Yl = o(
    "img",
    { src: "/images/icons/edit.png", width: "20", height: "20" },
    null,
    -1
  ),
  Zl = { class: "mx-4 font-medium" },
  Ql = o(
    "img",
    { src: "/images/icons/delete.png", width: "20", height: "20" },
    null,
    -1
  ),
  ei = { class: "mx-4 font-medium" },
  ti = { key: 1 },
  si = o(
    "img",
    { src: "/images/icons/Icon-report.png", width: "20", height: "20" },
    null,
    -1
  ),
  oi = { class: "mx-4 font-medium" },
  li = o(
    "img",
    { src: "/images/icons/Icon-blocked-red.png", width: "20", height: "20" },
    null,
    -1
  ),
  ii = { class: "mx-4 font-medium" },
  ni = o(
    "img",
    { src: "/images/icons/Icon-person-blue.png", width: "20", height: "20" },
    null,
    -1
  ),
  ai = { class: "mx-4 font-medium" },
  ri = o(
    "img",
    { src: "/images/icons/icon-unfollow.png", width: "20", height: "20" },
    null,
    -1
  ),
  di = { class: "mx-4 font-medium" },
  ui = { class: "" },
  ci = {
    class: "section_text-lg font-bold sm:pl-6 section_text-gray-800 mt-3 mb-2",
  },
  mi = { class: "" },
  fi = {
    class: "section_text-lg font-bold sm:pl-6 section_text-gray-800 mt-3 mb-2",
  },
  gi = ["placeholder"];
function pi(e, t, s, n, l, i) {
  const m = S("Link"),
    f = S("ReportPost"),
    w = S("CustomDialog"),
    p = S("InputError"),
    k = S("PostFormEdit");
  return (
    a(),
    d("div", Gl, [
      o(
        "div",
        {
          class: C([
            {
              block: s.showingPostingActionMenu,
              hidden: !s.showingPostingActionMenu,
            },
            "absolute flex top-11 right-0 sm:right-0 px-3 text-left border-b border-gray-400 rounded-xl bg-gray-100",
          ]),
        },
        [
          o("div", Kl, [
            o(
              "div",
              {
                id: "postID" + s.postID,
                class: "PostActionMenu pt-1 pb-3 space-y-2",
              },
              [
                s.currentUserId == s.postUserId
                  ? (a(),
                    d("div", Jl, [
                      o(
                        "button",
                        {
                          onClick:
                            t[0] ||
                            (t[0] = (...u) =>
                              i.openEditForm && i.openEditForm(...u)),
                          class:
                            "flex items-center px-4 py-1 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 hover:text-gray-700",
                        },
                        [
                          Yl,
                          o(
                            "span",
                            Zl,
                            g(e.translations && e.translations.edit_post),
                            1
                          ),
                        ]
                      ),
                      o(
                        "button",
                        {
                          onClick:
                            t[1] ||
                            (t[1] = (...u) =>
                              i.openDeletedPostDialog &&
                              i.openDeletedPostDialog(...u)),
                          class:
                            "flex items-center px-4 py-1 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 hover:text-gray-700",
                        },
                        [
                          Ql,
                          o(
                            "span",
                            ei,
                            g(e.translations && e.translations.delete_post),
                            1
                          ),
                        ]
                      ),
                    ]))
                  : (a(),
                    d("div", ti, [
                      o(
                        "button",
                        {
                          onClick:
                            t[2] ||
                            (t[2] = (...u) =>
                              i.openPostReportDialog &&
                              i.openPostReportDialog(...u)),
                          class:
                            "flex items-center px-4 py-1 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 hover:text-gray-700",
                        },
                        [
                          si,
                          o(
                            "span",
                            oi,
                            g(e.translations && e.translations.report_post),
                            1
                          ),
                        ]
                      ),
                      o(
                        "button",
                        {
                          onClick:
                            t[3] ||
                            (t[3] = (...u) =>
                              i.openBlockContactDialog &&
                              i.openBlockContactDialog(...u)),
                          class:
                            "flex items-center px-4 py-1 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 hover:text-gray-700",
                        },
                        [
                          li,
                          o(
                            "span",
                            ii,
                            g(
                              e.translations &&
                                e.translations.block_this_contact
                            ),
                            1
                          ),
                        ]
                      ),
                      r(
                        m,
                        {
                          href: e.route("post"),
                          class:
                            "flex items-center px-4 py-1 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 hover:text-gray-700",
                        },
                        {
                          default: E(() => [
                            ni,
                            o(
                              "span",
                              ai,
                              g(
                                e.translations && e.translations.follow_contact
                              ),
                              1
                            ),
                          ]),
                          _: 1,
                        },
                        8,
                        ["href"]
                      ),
                      r(
                        m,
                        {
                          href: e.route("post"),
                          class:
                            "flex items-center px-4 py-1 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-300 hover:text-gray-700",
                        },
                        {
                          default: E(() => [
                            ri,
                            o(
                              "span",
                              di,
                              g(
                                e.translations &&
                                  e.translations.un_follow_contact
                              ),
                              1
                            ),
                          ]),
                          _: 1,
                        },
                        8,
                        ["href"]
                      ),
                    ])),
              ],
              8,
              Xl
            ),
          ]),
        ],
        2
      ),
      r(f, { ref: "repostPostDialogRef", postId: s.postID }, null, 8, [
        "postId",
      ]),
      (a(),
      L(re, { to: "body" }, [
        r(
          w,
          {
            submitText: e.translations && e.translations.block_now,
            disableOutSideClick: !0,
            onSubmit: i.handleSubmitBlock,
            ref: "blockDialogRef",
            loading: l.loadingBlockContact,
            disabled: l.loadingBlockContact,
            errorIcon: "",
            dialogWidth: "max-h-[70vh] width50",
            title:
              e.translations &&
              e.translations.are_you_sure_about_blocking_this_contact,
          },
          {
            default: E(() => [
              o("div", ui, [
                o(
                  "div",
                  ci,
                  g(e.translations && e.translations.activate_hide_posts),
                  1
                ),
              ]),
            ]),
            _: 1,
          },
          8,
          ["submitText", "onSubmit", "loading", "disabled", "title"]
        ),
      ])),
      (a(),
      L(re, { to: "body" }, [
        r(
          w,
          {
            submitText: e.translations && e.translations.delete,
            disableOutSideClick: !0,
            onSubmit: i.handleSubmitDelete,
            ref: "deleteDialogRef",
            loading: l.loadingDelete,
            disabled: l.loadingDelete,
            errorIcon: "",
            dialogWidth: "max-h-[70vh] width50",
            title: e.translations && e.translations.are_you_sure,
          },
          {
            default: E(() => [
              o("div", mi, [
                o(
                  "div",
                  fi,
                  g(e.translations && e.translations.please_confirm_deletion),
                  1
                ),
              ]),
            ]),
            _: 1,
          },
          8,
          ["submitText", "onSubmit", "loading", "disabled", "title"]
        ),
      ])),
      (a(),
      L(re, { to: "body" }, [
        r(
          w,
          {
            ref: "editRepostCommentDialogRef",
            onSubmit: i.onEditRepost,
            loading: l.loadingEditRepost,
            disabled: l.loadingEditRepost,
            shouldFetchPost: !1,
            submitText: e.translations && e.translations.save,
            title:
              e.translations &&
              e.translations.edit + e.translations &&
              e.translations.repost_text,
          },
          {
            default: E(() => [
              X(
                o(
                  "textarea",
                  {
                    id: "responseText",
                    type: "text",
                    rows: 5,
                    class:
                      "mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm overflow-hidden",
                    required: "",
                    "onUpdate:modelValue":
                      t[4] || (t[4] = (u) => (l.commentText = u)),
                    ref: "textRef",
                    onKeydown:
                      t[5] ||
                      (t[5] = (...u) => e.insertTab && e.insertTab(...u)),
                    onInput:
                      t[6] ||
                      (t[6] = (...u) => e.adjustHeight && e.adjustHeight(...u)),
                    onPaste:
                      t[7] ||
                      (t[7] = (...u) => e.adjustHeight && e.adjustHeight(...u)),
                    placeholder:
                      e.translations &&
                      e.translations.say_something_about_the_post,
                  },
                  null,
                  40,
                  gi
                ),
                [[se, l.commentText]]
              ),
              l.commentTextError
                ? (a(),
                  L(
                    p,
                    { key: 0, class: "mt-2", message: l.commentTextError },
                    null,
                    8,
                    ["message"]
                  ))
                : I("", !0),
            ]),
            _: 1,
          },
          8,
          ["onSubmit", "loading", "disabled", "submitText", "title"]
        ),
      ])),
      (a(),
      L(re, { to: "body" }, [
        l.isFormOpen
          ? (a(),
            L(
              k,
              {
                key: 0,
                isOpen: l.isFormOpen,
                id: l.profileId,
                loadingUpdate: l.loadingUpdate,
                form: l.postToEdit,
                success: l.success,
                imageArray: s.imageArray,
                onFormsave: i.saveItem,
                onFormclose: i.closeEditModal,
              },
              null,
              8,
              [
                "isOpen",
                "id",
                "loadingUpdate",
                "form",
                "success",
                "imageArray",
                "onFormsave",
                "onFormclose",
              ]
            ))
          : I("", !0),
      ])),
    ])
  );
}
const hi = ce(ql, [["render", pi]]);
const vi = {
    key: 0,
    class: "w-full h-full rounded-lg",
    controls: "",
    autoplay: "",
    loop: "",
    muted: "",
  },
  _i = ["src"],
  yi = ["src"],
  xi = {
    class:
      "absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-[#1a1a1a] bg-opacity-50 backdrop-blur rounded-lg text-white font-extrabold text-4xl cursor-pointer",
  },
  bi = { key: 2 },
  ki = ["src"],
  wi = ["src"],
  Ci = ["src"],
  Ii = ["src"],
  Ti = {
    __name: "PostShowTheImage",
    props: {
      image: String,
      numberOfImages: Number,
      allPortraits: { type: Boolean, default: !1 },
      firstTwoImages: { type: Boolean, default: !1 },
      smallestHeight: { type: [String, Number], default: 1e3 },
      smallestHeightFirstTwo: { type: [String, Number], default: 1e3 },
      plusImageNumber: { type: [String, Number], default: 0 },
      cropImage: Boolean,
    },
    emits: ["updateHeight"],
    setup(e, { emit: t }) {
      const s = e,
        n = v(!1),
        l = v(null);
      v([]);
      const i = v({});
      function m(k) {
        return Ye + k;
      }
      function f(k) {
        let u = k == null ? void 0 : k.split(".").pop();
        return (
          (u == "mp4") | (u == "mov") ? (n.value = !0) : (n.value = !1), n.value
        );
      }
      const w = async (k) => {
        if (!k) return {};
        const u = new Image();
        return (
          (u.src = m(k)),
          await new Promise((b) => (u.onload = b)),
          {
            nHeight: u.naturalHeight,
            nWidth: u.naturalWidth,
            nAspect: u.naturalWidth / u.naturalHeight,
            nPortrait: !(u.naturalWidth > u.naturalHeight),
          }
        );
      };
      j(
        () => s.image,
        async () => {
          (i.value = await w(s.image)), p();
        },
        { immediate: !0 }
      );
      const p = () => {
        l.value &&
          setTimeout(() => {
            let k = l.value.height;
            t("updateHeight", {
              height: k,
              imageLength: s.numberOfImages,
              firstTwoImages: s.firstTwoImages,
            });
          }, 0);
      };
      return (k, u) => (
        a(),
        d("div", null, [
          f(s.image)
            ? (a(),
              d("video", vi, [
                o(
                  "source",
                  { src: m(s.image), type: "video/mp4" },
                  null,
                  8,
                  _i
                ),
              ]))
            : e.plusImageNumber && e.allPortraits
            ? (a(),
              d(
                "div",
                {
                  key: 1,
                  style: q({ height: e.smallestHeight + "px" }),
                  class: "relative",
                },
                [
                  o(
                    "img",
                    {
                      ref_key: "imageRef",
                      ref: l,
                      class: C("w-full  object-cover object-center rounded-lg"),
                      style: q({ height: e.smallestHeight + "px" }),
                      src: m(s.image),
                      alt: "",
                    },
                    null,
                    12,
                    yi
                  ),
                  o("div", xi, " +" + g(e.plusImageNumber), 1),
                ],
                4
              ))
            : (a(),
              d("div", bi, [
                e.firstTwoImages && e.allPortraits
                  ? (a(),
                    d(
                      "img",
                      {
                        key: 0,
                        ref_key: "imageRef",
                        ref: l,
                        style: q({ height: e.smallestHeightFirstTwo + "px" }),
                        class: C(
                          "w-full hello  object-cover object-center rounded-lg"
                        ),
                        src: m(s.image),
                        alt: "",
                      },
                      null,
                      12,
                      ki
                    ))
                  : e.allPortraits
                  ? (a(),
                    d(
                      "img",
                      {
                        key: 1,
                        style: q({ height: e.smallestHeight + "px" }),
                        ref_key: "imageRef",
                        ref: l,
                        class: C(
                          "w-full  object-cover object-center rounded-lg"
                        ),
                        src: m(s.image),
                        alt: "",
                      },
                      null,
                      12,
                      wi
                    ))
                  : e.cropImage
                  ? (a(),
                    d(
                      "img",
                      {
                        key: 2,
                        class:
                          "max-h-[200px] x350:max-h-[250px] xs:max-h-[300px] md:max-h-[350px] lg:max-h-[546px] w-full object-cover object-center rounded-lg",
                        src: m(s.image),
                        alt: "",
                      },
                      null,
                      8,
                      Ci
                    ))
                  : (a(),
                    d(
                      "img",
                      {
                        key: 3,
                        class:
                          "w-full h-full object-fill object-center rounded-lg",
                        src: m(s.image),
                        alt: "",
                      },
                      null,
                      8,
                      Ii
                    )),
              ])),
        ])
      );
    },
  },
  z = ce(Ti, [["__scopeId", "data-v-3e603f52"]]),
  Si = { class: "w-full" },
  Ei = { key: 0, class: "flex flex-col flex-nowrap w-full gap-1 pb-1" },
  Pi = { key: 1, class: "flex flex-col flex-nowrap w-full gap-1 pb-1" },
  Oi = { key: 2, class: "flex flex-nowrap w-full gap-1 pb-1" },
  Ri = { key: 3 },
  $i = { class: "flex flex-col flex-nowrap w-full gap-1 pb-1" },
  Di = { class: "grid grid-rows-1 grid-cols-2 w-full h-full gap-1 pb-1" },
  Ai = { key: 4 },
  ji = { key: 0, class: "flex flex-col flex-nowrap w-full gap-1 pb-1" },
  Ui = { key: 1, class: "flex flex-nowrap w-full gap-1 pb-1" },
  Hi = { class: "grid grid-rows-1 grid-cols-2 w-full h-full gap-1 pb-1" },
  Fi = { key: 5 },
  Li = { key: 0, class: "flex flex-col flex-nowrap w-full gap-1 pb-1" },
  Mi = { key: 1, class: "flex flex-nowrap w-full gap-1 pb-1" },
  Bi = { class: "grid grid-rows-1 grid-cols-3 w-full h-full gap-1 pb-1" },
  Ni = { key: 6 },
  Wi = { key: 0, class: "flex flex-col flex-nowrap w-full gap-1 pb-1" },
  Vi = { key: 1, class: "flex flex-nowrap w-full gap-1 pb-1" },
  zi = {
    __name: "PostImageDisplay",
    props: { imageArray: Array, numberOfImages: { type: Number, default: 0 } },
    setup(e) {
      const t = e,
        s = v(null),
        n = v([]),
        l = v(null),
        i = v([]),
        m = K(() => {
          const b = t.imageArray.length - 2,
            _ = [];
          let x = 2;
          switch (b) {
            case 4:
              _.push(
                { cols: 2, start: x, end: x + 2 },
                { cols: 2, start: x + 2, end: x + 4 }
              );
              break;
            default:
              _.push(
                { cols: 2, start: x, end: x + 2 },
                { cols: 3, start: x + 2, end: x + 5 }
              );
              break;
          }
          return _;
        }),
        f = v(!1);
      function w(b) {
        return Ye + b;
      }
      const p = async (b) => {
          if (!b) return !1;
          const _ = new Image();
          return (
            (_.src = b),
            await new Promise((x) => (_.onload = x)),
            _.naturalWidth < _.naturalHeight
          );
        },
        k = async (b) => {
          if (!b || b.length === 0) {
            f.value = !1;
            return;
          }
          const _ = await Promise.all(b.map((x) => p(w(x))));
          f.value = _.every((x) => x);
        };
      j(
        () => t.imageArray,
        async (b) => {
          b.length === 2 && (await k(t.imageArray)),
            b.length > 3 && (await k(t.imageArray.slice(0, 2)));
        },
        { immediate: !0 }
      );
      const u = ({ height: b, imageLength: _, firstTwoImages: x }) => {
        x
          ? (n.value.push(b),
            n.value.length === 2 &&
              ((l.value = Math.min(...n.value)), (n.value = [])))
          : x ||
            (i.value.push(b),
            (i.value.length === _ || i.value.length === 5) &&
              (s.value = Math.min(...i.value)));
      };
      return (b, _) => (
        a(),
        d("div", Si, [
          e.numberOfImages == 1
            ? (a(),
              d("div", Ei, [
                r(
                  z,
                  {
                    image: e.imageArray[0],
                    numberOfImages: e.numberOfImages,
                    cropImage: !0,
                    plusImages: !1,
                  },
                  null,
                  8,
                  ["image", "numberOfImages"]
                ),
              ]))
            : I("", !0),
          e.numberOfImages == 2 && !f.value
            ? (a(),
              d("div", Pi, [
                r(
                  z,
                  {
                    image: e.imageArray[0],
                    numberOfImages: e.numberOfImages,
                    cropImage: !0,
                    plusImages: !1,
                  },
                  null,
                  8,
                  ["image", "numberOfImages"]
                ),
                r(
                  z,
                  {
                    image: e.imageArray[1],
                    numberOfImages: e.numberOfImages,
                    cropImage: !0,
                    plusImages: !1,
                  },
                  null,
                  8,
                  ["image", "numberOfImages"]
                ),
              ]))
            : I("", !0),
          e.numberOfImages == 2 && f.value
            ? (a(),
              d("div", Oi, [
                r(
                  z,
                  {
                    class: "w-1/2",
                    allPortraits: f.value,
                    onUpdateHeight: u,
                    smallestHeight: s.value,
                    image: e.imageArray[0],
                    numberOfImages: e.numberOfImages,
                    cropImage: !0,
                    plusImages: !1,
                  },
                  null,
                  8,
                  ["allPortraits", "smallestHeight", "image", "numberOfImages"]
                ),
                r(
                  z,
                  {
                    class: "w-1/2",
                    allPortraits: f.value,
                    onUpdateHeight: u,
                    smallestHeight: s.value,
                    image: e.imageArray[1],
                    numberOfImages: e.numberOfImages,
                    cropImage: !0,
                    plusImages: !1,
                  },
                  null,
                  8,
                  ["allPortraits", "smallestHeight", "image", "numberOfImages"]
                ),
              ]))
            : I("", !0),
          e.numberOfImages == 3
            ? (a(),
              d("div", Ri, [
                o("div", $i, [
                  r(
                    z,
                    {
                      image: e.imageArray[0],
                      numberOfImages: e.numberOfImages,
                      cropImage: !0,
                      plusImages: !1,
                    },
                    null,
                    8,
                    ["image", "numberOfImages"]
                  ),
                ]),
                o("div", Di, [
                  r(
                    z,
                    {
                      image: e.imageArray[1],
                      onUpdateHeight: u,
                      allPortraits: !0,
                      smallestHeight: s.value,
                      numberOfImages: e.numberOfImages - 1,
                      cropImage: !0,
                      plusImages: !1,
                    },
                    null,
                    8,
                    ["image", "smallestHeight", "numberOfImages"]
                  ),
                  r(
                    z,
                    {
                      image: e.imageArray[2],
                      onUpdateHeight: u,
                      allPortraits: !0,
                      smallestHeight: s.value,
                      numberOfImages: e.numberOfImages - 1,
                      cropImage: !0,
                      plusImages: !1,
                    },
                    null,
                    8,
                    ["image", "smallestHeight", "numberOfImages"]
                  ),
                ]),
              ]))
            : I("", !0),
          e.numberOfImages == 4
            ? (a(),
              d("div", Ai, [
                f.value
                  ? I("", !0)
                  : (a(),
                    d("div", ji, [
                      o("div", null, [
                        r(
                          z,
                          {
                            image: e.imageArray[0],
                            numberOfImages: e.numberOfImages,
                            cropImage: !0,
                            plusImages: !1,
                          },
                          null,
                          8,
                          ["image", "numberOfImages"]
                        ),
                      ]),
                      o("div", null, [
                        r(
                          z,
                          {
                            image: e.imageArray[1],
                            numberOfImages: e.numberOfImages,
                            cropImage: !0,
                            plusImages: !1,
                          },
                          null,
                          8,
                          ["image", "numberOfImages"]
                        ),
                      ]),
                    ])),
                f.value
                  ? (a(),
                    d("div", Ui, [
                      r(
                        z,
                        {
                          class: "w-1/2",
                          numberOfImages: 2,
                          allPortraits: f.value,
                          onUpdateHeight: u,
                          smallestHeightFirstTwo: l.value,
                          image: e.imageArray[0],
                          firstTwoImages: !0,
                          cropImage: !0,
                          plusImages: !1,
                        },
                        null,
                        8,
                        ["allPortraits", "smallestHeightFirstTwo", "image"]
                      ),
                      r(
                        z,
                        {
                          class: "w-1/2",
                          allPortraits: f.value,
                          firstTwoImages: !0,
                          onUpdateHeight: u,
                          smallestHeightFirstTwo: l.value,
                          image: e.imageArray[1],
                          numberOfImages: 2,
                          cropImage: !0,
                          plusImages: !1,
                        },
                        null,
                        8,
                        ["allPortraits", "smallestHeightFirstTwo", "image"]
                      ),
                    ]))
                  : I("", !0),
                o("div", Hi, [
                  o("div", null, [
                    r(
                      z,
                      {
                        image: e.imageArray[2],
                        numberOfImages: 2,
                        onUpdateHeight: u,
                        allPortraits: !0,
                        smallestHeight: s.value,
                        cropImage: !0,
                        plusImages: !1,
                      },
                      null,
                      8,
                      ["image", "smallestHeight"]
                    ),
                  ]),
                  o("div", null, [
                    r(
                      z,
                      {
                        image: e.imageArray[3],
                        numberOfImages: 2,
                        onUpdateHeight: u,
                        allPortraits: !0,
                        smallestHeight: s.value,
                        cropImage: !0,
                        plusImages: !1,
                      },
                      null,
                      8,
                      ["image", "smallestHeight"]
                    ),
                  ]),
                ]),
              ]))
            : I("", !0),
          e.numberOfImages == 5
            ? (a(),
              d("div", Fi, [
                f.value
                  ? I("", !0)
                  : (a(),
                    d("div", Li, [
                      o("div", null, [
                        r(
                          z,
                          {
                            image: e.imageArray[0],
                            numberOfImages: e.numberOfImages,
                            cropImage: !0,
                            plusImages: !1,
                          },
                          null,
                          8,
                          ["image", "numberOfImages"]
                        ),
                      ]),
                      o("div", null, [
                        r(
                          z,
                          {
                            image: e.imageArray[1],
                            numberOfImages: e.numberOfImages,
                            cropImage: !0,
                            plusImages: !1,
                          },
                          null,
                          8,
                          ["image", "numberOfImages"]
                        ),
                      ]),
                    ])),
                f.value
                  ? (a(),
                    d("div", Mi, [
                      r(
                        z,
                        {
                          class: "w-1/2",
                          numberOfImages: 2,
                          allPortraits: f.value,
                          onUpdateHeight: u,
                          smallestHeightFirstTwo: l.value,
                          image: e.imageArray[0],
                          firstTwoImages: !0,
                          cropImage: !0,
                          plusImages: !1,
                        },
                        null,
                        8,
                        ["allPortraits", "smallestHeightFirstTwo", "image"]
                      ),
                      r(
                        z,
                        {
                          class: "w-1/2",
                          allPortraits: f.value,
                          firstTwoImages: !0,
                          onUpdateHeight: u,
                          smallestHeightFirstTwo: l.value,
                          image: e.imageArray[1],
                          numberOfImages: 2,
                          cropImage: !0,
                          plusImages: !1,
                        },
                        null,
                        8,
                        ["allPortraits", "smallestHeightFirstTwo", "image"]
                      ),
                    ]))
                  : I("", !0),
                o("div", Bi, [
                  o("div", null, [
                    r(
                      z,
                      {
                        image: e.imageArray[2],
                        numberOfImages: 3,
                        onUpdateHeight: u,
                        allPortraits: !0,
                        smallestHeight: s.value,
                        cropImage: !0,
                        plusImages: !1,
                      },
                      null,
                      8,
                      ["image", "smallestHeight"]
                    ),
                  ]),
                  o("div", null, [
                    r(
                      z,
                      {
                        image: e.imageArray[3],
                        numberOfImages: 3,
                        onUpdateHeight: u,
                        allPortraits: !0,
                        smallestHeight: s.value,
                        cropImage: !0,
                        plusImages: !1,
                      },
                      null,
                      8,
                      ["image", "smallestHeight"]
                    ),
                  ]),
                  o("div", null, [
                    r(
                      z,
                      {
                        image: e.imageArray[4],
                        numberOfImages: 3,
                        onUpdateHeight: u,
                        allPortraits: !0,
                        smallestHeight: s.value,
                        cropImage: !0,
                        plusImages: !1,
                      },
                      null,
                      8,
                      ["image", "smallestHeight"]
                    ),
                  ]),
                ]),
              ]))
            : I("", !0),
          e.numberOfImages >= 6
            ? (a(),
              d("div", Ni, [
                f.value
                  ? I("", !0)
                  : (a(),
                    d("div", Wi, [
                      o("div", null, [
                        r(
                          z,
                          {
                            image: e.imageArray[0],
                            numberOfImages: e.numberOfImages,
                            cropImage: !0,
                            plusImages: !1,
                          },
                          null,
                          8,
                          ["image", "numberOfImages"]
                        ),
                      ]),
                      o("div", null, [
                        r(
                          z,
                          {
                            image: e.imageArray[1],
                            numberOfImages: e.numberOfImages,
                            cropImage: !0,
                            plusImages: !1,
                          },
                          null,
                          8,
                          ["image", "numberOfImages"]
                        ),
                      ]),
                    ])),
                f.value
                  ? (a(),
                    d("div", Vi, [
                      r(
                        z,
                        {
                          class: "w-1/2",
                          numberOfImages: 2,
                          allPortraits: f.value,
                          onUpdateHeight: u,
                          smallestHeightFirstTwo: l.value,
                          image: e.imageArray[0],
                          firstTwoImages: !0,
                          cropImage: !0,
                          plusImages: !1,
                        },
                        null,
                        8,
                        ["allPortraits", "smallestHeightFirstTwo", "image"]
                      ),
                      r(
                        z,
                        {
                          class: "w-1/2",
                          allPortraits: f.value,
                          firstTwoImages: !0,
                          onUpdateHeight: u,
                          smallestHeightFirstTwo: l.value,
                          image: e.imageArray[1],
                          numberOfImages: 2,
                          cropImage: !0,
                          plusImages: !1,
                        },
                        null,
                        8,
                        ["allPortraits", "smallestHeightFirstTwo", "image"]
                      ),
                    ]))
                  : I("", !0),
                (a(!0),
                d(
                  M,
                  null,
                  G(
                    m.value,
                    (x, h) => (
                      a(),
                      d(
                        "div",
                        {
                          key: h,
                          class: C(`grid grid-cols-${x.cols} gap-1 pb-1`),
                        },
                        [
                          (a(!0),
                          d(
                            M,
                            null,
                            G(
                              e.imageArray.slice(x.start, x.end),
                              (R, y) => (
                                a(),
                                d("div", { key: y }, [
                                  y === 2 && e.numberOfImages > 7
                                    ? (a(),
                                      L(
                                        z,
                                        {
                                          key: 0,
                                          onUpdateHeight: u,
                                          allPortraits: !0,
                                          cropImage: !0,
                                          smallestHeight: s.value,
                                          image: R,
                                          numberOfImages: e.numberOfImages - 2,
                                          plusImageNumber:
                                            e.imageArray.length - x.end + 1,
                                        },
                                        null,
                                        8,
                                        [
                                          "smallestHeight",
                                          "image",
                                          "numberOfImages",
                                          "plusImageNumber",
                                        ]
                                      ))
                                    : (a(),
                                      L(
                                        z,
                                        {
                                          key: 1,
                                          numberOfImages: e.numberOfImages - 2,
                                          onUpdateHeight: u,
                                          allPortraits: !0,
                                          smallestHeight: s.value,
                                          image: R,
                                          cropImage: !0,
                                          plusImages: !1,
                                        },
                                        null,
                                        8,
                                        [
                                          "numberOfImages",
                                          "smallestHeight",
                                          "image",
                                        ]
                                      )),
                                ])
                              )
                            ),
                            128
                          )),
                        ],
                        2
                      )
                    )
                  ),
                  128
                )),
              ]))
            : I("", !0),
        ])
      );
    },
  };
function qi(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var Ze = qi,
  Gi = typeof Ne == "object" && Ne && Ne.Object === Object && Ne,
  Ki = Gi,
  Xi = Ki,
  Ji = typeof self == "object" && self && self.Object === Object && self,
  Yi = Xi || Ji || Function("return this")(),
  Tt = Yi,
  Zi = Tt,
  Qi = function () {
    return Zi.Date.now();
  },
  en = Qi,
  tn = /\s/;
function sn(e) {
  for (var t = e.length; t-- && tn.test(e.charAt(t)); );
  return t;
}
var on = sn,
  ln = on,
  nn = /^\s+/;
function an(e) {
  return e && e.slice(0, ln(e) + 1).replace(nn, "");
}
var rn = an,
  dn = Tt,
  un = dn.Symbol,
  St = un,
  rt = St,
  Et = Object.prototype,
  cn = Et.hasOwnProperty,
  mn = Et.toString,
  Oe = rt ? rt.toStringTag : void 0;
function fn(e) {
  var t = cn.call(e, Oe),
    s = e[Oe];
  try {
    e[Oe] = void 0;
    var n = !0;
  } catch {}
  var l = mn.call(e);
  return n && (t ? (e[Oe] = s) : delete e[Oe]), l;
}
var gn = fn,
  pn = Object.prototype,
  hn = pn.toString;
function vn(e) {
  return hn.call(e);
}
var _n = vn,
  dt = St,
  yn = gn,
  xn = _n,
  bn = "[object Null]",
  kn = "[object Undefined]",
  ut = dt ? dt.toStringTag : void 0;
function wn(e) {
  return e == null
    ? e === void 0
      ? kn
      : bn
    : ut && ut in Object(e)
    ? yn(e)
    : xn(e);
}
var Cn = wn;
function In(e) {
  return e != null && typeof e == "object";
}
var Tn = In,
  Sn = Cn,
  En = Tn,
  Pn = "[object Symbol]";
function On(e) {
  return typeof e == "symbol" || (En(e) && Sn(e) == Pn);
}
var Rn = On,
  $n = rn,
  ct = Ze,
  Dn = Rn,
  mt = 0 / 0,
  An = /^[-+]0x[0-9a-f]+$/i,
  jn = /^0b[01]+$/i,
  Un = /^0o[0-7]+$/i,
  Hn = parseInt;
function Fn(e) {
  if (typeof e == "number") return e;
  if (Dn(e)) return mt;
  if (ct(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = ct(t) ? t + "" : t;
  }
  if (typeof e != "string") return e === 0 ? e : +e;
  e = $n(e);
  var s = jn.test(e);
  return s || Un.test(e) ? Hn(e.slice(2), s ? 2 : 8) : An.test(e) ? mt : +e;
}
var Ln = Fn,
  Mn = Ze,
  Ke = en,
  ft = Ln,
  Bn = "Expected a function",
  Nn = Math.max,
  Wn = Math.min;
function Vn(e, t, s) {
  var n,
    l,
    i,
    m,
    f,
    w,
    p = 0,
    k = !1,
    u = !1,
    b = !0;
  if (typeof e != "function") throw new TypeError(Bn);
  (t = ft(t) || 0),
    Mn(s) &&
      ((k = !!s.leading),
      (u = "maxWait" in s),
      (i = u ? Nn(ft(s.maxWait) || 0, t) : i),
      (b = "trailing" in s ? !!s.trailing : b));
  function _(U) {
    var J = n,
      Y = l;
    return (n = l = void 0), (p = U), (m = e.apply(Y, J)), m;
  }
  function x(U) {
    return (p = U), (f = setTimeout(y, t)), k ? _(U) : m;
  }
  function h(U) {
    var J = U - w,
      Y = U - p,
      Z = t - J;
    return u ? Wn(Z, i - Y) : Z;
  }
  function R(U) {
    var J = U - w,
      Y = U - p;
    return w === void 0 || J >= t || J < 0 || (u && Y >= i);
  }
  function y() {
    var U = Ke();
    if (R(U)) return $(U);
    f = setTimeout(y, h(U));
  }
  function $(U) {
    return (f = void 0), b && n ? _(U) : ((n = l = void 0), m);
  }
  function c() {
    f !== void 0 && clearTimeout(f), (p = 0), (n = w = l = f = void 0);
  }
  function D() {
    return f === void 0 ? m : $(Ke());
  }
  function O() {
    var U = Ke(),
      J = R(U);
    if (((n = arguments), (l = this), (w = U), J)) {
      if (f === void 0) return x(w);
      if (u) return clearTimeout(f), (f = setTimeout(y, t)), _(w);
    }
    return f === void 0 && (f = setTimeout(y, t)), m;
  }
  return (O.cancel = c), (O.flush = D), O;
}
var zn = Vn,
  qn = zn,
  Gn = Ze,
  Kn = "Expected a function";
function Xn(e, t, s) {
  var n = !0,
    l = !0;
  if (typeof e != "function") throw new TypeError(Kn);
  return (
    Gn(s) &&
      ((n = "leading" in s ? !!s.leading : n),
      (l = "trailing" in s ? !!s.trailing : l)),
    qn(e, t, { leading: n, maxWait: t, trailing: l })
  );
}
var Xe = Xn;
const Pt = {
    __name: "DialogContractorRating",
    props: { userId: [String, Number], loggedInUserId: [String, Number] },
    setup(e, { expose: t }) {
      const { userId: s } = e,
        n = ue(),
        l = v(),
        i = K(() => n.state.ratings.loading),
        m = K(() => n.getters.translations),
        f = K(() => n.state.ratings.contractorDetails);
      return (
        t({
          openDialog: () => (
            console.log(s, "userId"),
            n.dispatch("ratings/getContractorInfo", s),
            l.value.openDialog()
          ),
        }),
        (p, k) => (
          a(),
          L(
            ne,
            {
              ref_key: "dialogRef",
              ref: l,
              showFooter: !1,
              dialogWidth: "width-75 contractorDialog",
              title: m.value && m.value.contractor_ratings,
            },
            {
              default: E(() => [
                r(
                  $e,
                  { loading: i.value, background: "white", height: "70vh" },
                  null,
                  8,
                  ["loading"]
                ),
                !i.value && f.value && Object.keys(f.value).length > 0
                  ? (a(),
                    L(
                      es,
                      {
                        key: 0,
                        contractorDetails: f.value,
                        profileId: e.loggedInUserId,
                      },
                      null,
                      8,
                      ["contractorDetails", "profileId"]
                    ))
                  : I("", !0),
              ]),
              _: 1,
            },
            8,
            ["title"]
          )
        )
      );
    },
  },
  Jn = { key: 1 },
  Yn = { key: 2, class: "flex flex-col gap-1 sm:gap-2", ref: "commentList" },
  Zn = { key: 3, class: "flex gap-2 w-full items-start overflow-auto" },
  Qn = ["placeholder"],
  ea = { class: "text-white" },
  ta = {
    __name: "TwoVisibleComments",
    props: {
      comments: { type: Array },
      loadingComments: { default: !1, type: Boolean },
      length: { type: Number },
      postId: { type: [Number, String] },
    },
    emits: ["openAllComments", "unshiftIntoComments"],
    setup(e, { emit: t }) {
      const s = e,
        n = v(!1),
        l = v(""),
        i = v(),
        m = ue(),
        f = (b) => {
          if (b.key === "Tab") {
            b.preventDefault();
            const _ = b.target.selectionStart,
              x = b.target.selectionEnd;
            (l.value =
              l.value.substring(0, _) + "      " + l.value.substring(x)),
              te(() => {
                b.target.selectionStart = b.target.selectionEnd = _ + 60;
              });
          }
        },
        w = async () => {
          if (((n.value = !0), !l.value && l.value / trim() === "")) return;
          const b = { body: Ce(l) };
          try {
            const _ = await axios.post(
              `/api/posts/${s.postId}/comments`,
              b,
              H()
            );
            _.data && ((l.value = ""), p(), t("unshiftIntoComments", _.data));
          } catch {
            F();
          } finally {
            n.value = !1;
          }
        },
        p = () => {
          te(() => {
            (i.value.style.height = "auto"),
              (i.value.style.height = i.value.scrollHeight + "px");
          });
        },
        k = K(() => m.getters.screenWidth),
        u = K(() => m.getters.translations);
      return (b, _) => {
        const x = S("v-skeleton-loader"),
          h = S("v-progress-linear"),
          R = S("v-dialog");
        return (
          a(),
          d(
            M,
            null,
            [
              e.length > 2
                ? (a(),
                  d(
                    "div",
                    {
                      key: 0,
                      onClick: _[0] || (_[0] = (y) => t("openAllComments")),
                      class:
                        "cursor-pointer hover:underline font-bold text-gray-600 text-sm w-fit",
                    },
                    g(u.value && u.value.view_all_comments),
                    1
                  ))
                : I("", !0),
              e.loadingComments
                ? (a(),
                  d("div", Jn, [
                    (a(),
                    d(
                      M,
                      null,
                      G(2, (y) =>
                        r(x, {
                          key: y,
                          color: "#e5e7eb",
                          type: "list-item-avatar-two-line",
                        })
                      ),
                      64
                    )),
                  ]))
                : I("", !0),
              e.comments && e.comments.length > 0
                ? (a(),
                  d(
                    "div",
                    Yn,
                    [
                      r(
                        Ae,
                        {
                          name: "comment-transition",
                          tag: "div",
                          class: "flex flex-col gap-1 sm:gap-2",
                        },
                        {
                          default: E(() => [
                            (a(!0),
                            d(
                              M,
                              null,
                              G(
                                e.comments,
                                (y) => (
                                  a(),
                                  d("div", { key: y.id }, [
                                    r(Je, { comment: y }, null, 8, ["comment"]),
                                  ])
                                )
                              ),
                              128
                            )),
                          ]),
                          _: 1,
                        }
                      ),
                    ],
                    512
                  ))
                : I("", !0),
              e.length > 0
                ? (a(),
                  d("div", Zn, [
                    X(
                      o(
                        "textarea",
                        {
                          id: "comment",
                          "onUpdate:modelValue":
                            _[1] || (_[1] = (y) => (l.value = y)),
                          onPaste: p,
                          ref_key: "commentAreaRef",
                          ref: i,
                          onKeydown: f,
                          onInput: p,
                          rows: 1,
                          placeholder: u.value && u.value.write_a_comment,
                          class:
                            "text-xl w-full py-1 min-h-[40px] overflow-hidden px-3 focus:shadow-none focus:ring-gray-600 focus:rounded bg-[#f9fafb] border-gray-400 text-grey-600 resize-none rounded focus-within:ring-gray-600 focus:border-gray-600",
                        },
                        null,
                        40,
                        Qn
                      ),
                      [[se, l.value]]
                    ),
                    r(
                      W(V),
                      {
                        type: "button",
                        disabled: n.value,
                        onClick: w,
                        class: C(
                          `w-8 h-8 sx:w-10 sx:h-10 cursor-pointer text-gray-500 apply-stroke ${
                            n.value ? "opacity-40" : "opacity-100"
                          }`
                        ),
                        icon: "carbon:send-filled",
                      },
                      null,
                      8,
                      ["disabled", "class"]
                    ),
                  ]))
                : I("", !0),
              e.comments && e.comments.length > 0
                ? (a(),
                  L(
                    R,
                    {
                      key: 4,
                      class: "dialog-modal",
                      modelValue: n.value,
                      "onUpdate:modelValue":
                        _[2] || (_[2] = (y) => (n.value = y)),
                      scrim: "transparent",
                      persistent: "",
                      width: "auto",
                    },
                    {
                      default: E(() => [
                        r(
                          je,
                          {
                            shadowLevel: 2,
                            bgColor: "#364fc7",
                            padding: k.value < 640 ? "7px" : "10px",
                          },
                          {
                            default: E(() => [
                              o(
                                "div",
                                ea,
                                g(u.value && u.value.uploading) +
                                  " " +
                                  g(u.value && u.value.comment) +
                                  "... ",
                                1
                              ),
                              r(h, {
                                indeterminate: "",
                                color: "#fff",
                                class: "mb-0",
                              }),
                            ]),
                            _: 1,
                          },
                          8,
                          ["padding"]
                        ),
                      ]),
                      _: 1,
                    },
                    8,
                    ["modelValue"]
                  ))
                : I("", !0),
            ],
            64
          )
        );
      };
    },
  };
const sa = {
    components: {
      TwoVisibleComments: ta,
      cConnectWord: xt,
      ButtonPost: Kt,
      ButtonRefresh: Xt,
      StarRounded: bt,
      Icon: V,
      PostingActionMenu: hi,
      InputError: Ie,
      CustomDialog: ne,
      LikedUser: We,
      DialogAllComments: wo,
      Avatar: Ge,
      PostImageDisplay: zi,
      Link: yt,
      ref: v,
      throttle: Xe,
      DialogContractorRating: Pt,
      Icon: V,
    },
    mounted() {
      this.fetchAllComments(),
        this.$nextTick(() => {
          this.checkContentHeight(), this.checkContentHeightBody2();
        }),
        window.addEventListener("scroll", Xe(this.HidePostingActionMenu, 500));
    },
    unmounted() {
      window.removeEventListener("scroll", Xe(this.HidePostingActionMenu, 500));
    },
    props: {
      showit: Boolean,
      index: Number,
      profile: { type: Object, required: !0 },
      addedCommentInEnlarge: { type: Object, default: {} },
      post: { type: Object, required: !0 },
      textColors: { type: Array, required: !0 },
      backgroundColors: { type: Array, required: !0 },
      body1Colors: { type: Array, required: !0 },
    },
    data() {
      let e = De().props.value;
      return {
        commentTextError: "",
        commentText: "",
        showingPostingActionMenu: v(!1),
        contractorRatingDialogRef: v(),
        customBgColor: "",
        isPostVisible: !1,
        text_alignment: "left",
        text_color: "",
        title_text_alignment: "",
        titleCustomBgColor: "left",
        title_text_color: "",
        isContentOverflow: !1,
        isContentOverflowBody2: !1,
        lineHeight: 0,
        lineHeightBody2: 0,
        showFullTextBody1: !1,
        showFullTextBody2: !1,
        your_reaction: this.post.your_reaction,
        user: e.auth.user,
        likes_count: this.post.likes_count,
        profileId: e.profile.id,
        dislikes_count: this.post.dislikes_count,
        repost_count: this.post.repost,
        loadingLiked: !1,
        loadingUnliked: !1,
        loadingRepost: !1,
        likedUsers: [],
        unLikedUsers: [],
        allComments: [],
        loadingComments: !1,
        pagination: {},
        addedNumber: 0,
        total_number_of_comments_with_replies: 0,
      };
    },
    emits: ["onRepost", "enlarge-post", "repostEdited"],
    computed: {
      ...ie(["screenWidth"]),
      ...ie("profile", [
        "commentId",
        "postComment",
        "replyId",
        "reply",
        "postReply",
        "pusherComment",
        "pusherCommentToDelete",
        "pusherCommentPosted",
        "isCommentAdded",
      ]),
      ...ie("ratings", ["comment"]),
      ...ie(["translations", "userVersion"]),
      firstTwoComments() {
        return this.allComments.slice(0, 2);
      },
      toggleClass() {
        return `cursor-pointer ${
          this.customBgColor.startsWith("#") ? "text-sky-400" : "text-sky-700"
        }`;
      },
      toggleClassBody2() {
        return `cursor-pointer text-sky-700 "
      }`;
      },
      textStyle() {
        return this.showFullTextBody1
          ? {
              maxHeight: "none",
              overflow: "hidden",
              lineHeight:
                +this.post.font_size > 3 && this.post.font_size < 10
                  ? "1.7rem"
                  : this.post.font_size >= 10
                  ? "2rem"
                  : "inherit",
              display: "inline",
              fontSize: `${16 + +this.post.font_size}px`,
              color: this.text_color,
            }
          : {
              maxHeight: this.lineHeight * 4 + "px",
              fontSize: `${16 + +this.post.font_size}px`,
              overflow: "hidden",
              lineHeight:
                +this.post.font_size > 3 && +this.post.font_size < 10
                  ? "1.7rem"
                  : +this.post.font_size >= 10
                  ? "2rem"
                  : "inherit",
              display: "block",
              color: this.text_color,
            };
      },
      textStyleBody2() {
        return this.showFullTextBody2
          ? { maxHeight: "none", overflow: "hidden", display: "inline" }
          : {
              maxHeight: this.lineHeightBody2 * 4 + "px",
              overflow: "hidden",
              display: "block",
            };
      },
      titleTextStyle() {
        return { color: this.title_text_color };
      },
      numberOfImages: {
        get: function () {
          return this.post && this.post.image && this.post.image.length > 0
            ? this.post.image.split("|").length
            : 0;
        },
      },
      body1Class: function () {
        let e, t;
        return (
          this.post.is_body_bold && (e = "font-bold"),
          this.post.text_alignment &&
            (this.text_alignment =
              this.post.text_alignment === "left"
                ? " text-left"
                : this.post.text_alignment === "center"
                ? " text-center"
                : " text-right"),
          this.post.post_text_color_id &&
            this.textColors.forEach((s) => {
              s.id === this.post.post_text_color_id &&
                (this.text_color = s.color);
            }),
          this.post.post_background_color_id &&
            this.backgroundColors.forEach((s) => {
              s.id === this.post.post_background_color_id &&
                (this.customBgColor = s.color);
            }),
          e + " " + t
        );
      },
      titleClass: function () {
        let e, t;
        return (
          this.post.title_text_alignment &&
            (this.title_text_alignment =
              this.post.title_text_alignment === "left"
                ? " text-left"
                : this.post.title_text_alignment === "center"
                ? " text-center"
                : " text-right"),
          this.post.title_text_color_id &&
            this.textColors.forEach((s) => {
              s.id === this.post.title_text_color_id &&
                (this.title_text_color = s.color);
            }),
          this.post.title_background_color_id &&
            this.backgroundColors.forEach((s) => {
              s.id === this.post.title_background_color_id &&
                (this.titleCustomBgColor = s.color);
            }),
          e + " " + t
        );
      },
      displayedBody1() {
        let e = this.post.body1;
        return e && (e = e.replace(/\/n/g, "<br>")), this.processUrls(e);
      },
      displayedBody2() {
        let e = this.post.body2;
        return e && (e = e.replace(/\/n/g, "<br>")), this.processUrls(e);
      },
      processedBody1() {
        return this.processUrls(this.post.body1);
      },
      processedBody2() {
        return this.processUrls(this.post.body2);
      },
      imageArray: {
        get: function () {
          return this.post && this.post.image && this.post.image.length > 0
            ? this.post.image.split("|")
            : [];
        },
      },
    },
    watch: {
      commentText(e) {
        e && (this.commentTextError = "");
      },
      isCommentAdded(e) {
        console.log("commentAdded"),
          e &&
            ((this.total_number_of_comments_with_replies =
              this.total_number_of_comments_with_replies + 1),
            this.$store.commit("profile/setIsCommentAdded", !1));
      },
      post: {
        handler(e, t) {
          e &&
            Object.keys(e).length > 0 &&
            ((this.repost_count = this.post.repost),
            (this.likes_count = this.post.likes_count),
            (this.dislikes_count = this.post.dislikes_count),
            (this.your_reaction = this.post.your_reaction));
        },
        deep: !0,
      },
      showFullTextBody1: "checkContentHeight",
      showFullTextBody2: "checkContentHeightBody2",
      addedCommentInEnlarge(e) {
        e &&
          Object.keys(e).length > 0 &&
          this.post.id === e.post_id &&
          (this.allComments.unshift(e),
          (this.total_number_of_comments_with_replies =
            this.total_number_of_comments_with_replies + 1));
      },
      pusherCommentPosted: {
        handler(e, t) {
          e &&
            e.id &&
            e != t &&
            this.post.id === e.post_id &&
            this.allComments.findIndex((n) => n.id === e.id) === -1 &&
            (this.allComments.unshift(e),
            (this.total_number_of_comments_with_replies =
              this.total_number_of_comments_with_replies + 1));
        },
        deep: !0,
      },
      commentId(e) {
        if (e) {
          const t = this.allComments.findIndex((s) => s.id === e);
          t !== -1 &&
            (this.allComments.splice(t, 1),
            (this.total_number_of_comments_with_replies =
              this.total_number_of_comments_with_replies - 1));
        }
      },
      pusherCommentToDelete: {
        handler(e, t) {
          if (e && e.id && e != t && this.post.id === e.post_id) {
            const s = e.parent_id ? e.parent_id : e.id,
              n = this.allComments.findIndex((l) => l.id === s);
            if (s === e.id)
              n !== -1 &&
                (this.allComments.splice(n, 1),
                (this.total_number_of_comments_with_replies =
                  this.total_number_of_comments_with_replies - 1));
            else {
              const l = this.allComments[n].replies.findIndex(
                (i) => i.id === e.id
              );
              this.allComments[n].replies.splice(l, 1);
            }
          }
        },
        deep: !0,
      },
      replyId(e) {
        if (e)
          for (let t = 0; t < this.allComments.length; t++) {
            const s = this.allComments[t];
            if (s.replies) {
              const n = s.replies.findIndex((l) => l.id === e);
              if (n !== -1) {
                s.replies.splice(n, 1);
                break;
              }
            }
          }
      },
      reply(e, t) {
        if (e && e.reply) {
          const s = this.allComments.findIndex((n) => n.id === e.commentId);
          if (s !== -1) {
            this.allComments[s].replies || (this.allComments[s].replies = []);
            const n = this.allComments[s].replies.length;
            n > 0 && this.allComments[s].replies[n - 1].id !== e.reply.id
              ? this.allComments[s].replies.push(e.reply)
              : n === 0 && this.allComments[s].replies.push(e.reply);
          }
        }
      },
      postComment: {
        handler(e, t) {
          if (e && e.id && e != t) {
            const s = this.allComments.findIndex((n) => n.id === e.id);
            s !== -1 && (this.allComments[s] = e);
          }
        },
        deep: !0,
      },
      pusherComment: {
        handler(e, t) {
          if (e && e.id && e != t && this.post.id === e.post_id) {
            const s = this.allComments.findIndex((n) => n.id === e.id);
            s !== -1 && (this.allComments[s] = e);
          }
        },
        deep: !0,
      },
      postReply: {
        handler(e, t) {
          e &&
            e.id &&
            this.allComments.forEach((s, n) => {
              if (s.replies) {
                const l = s.replies.findIndex((i) => i.id === e.id);
                l !== -1 && (this.allComments[n].replies[l] = e);
              }
            });
        },
        deep: !0,
      },
      comment: {
        handler(e, t) {
          if (e && e.commentId) {
            if (e.isReply) {
              const s = this.allComments.findIndex((n) =>
                n.replies ? n.replies.some((l) => l.id === e.commentId) : !1
              );
              if (s !== -1 && this.allComments[s].replies) {
                const n = this.allComments[s].replies.findIndex(
                  (l) => l.id === e.commentId
                );
                n !== -1 && (this.allComments[s].replies[n].body = e.body);
              }
            } else {
              const s = this.allComments.findIndex((n) => n.id === e.commentId);
              s !== -1 && (this.allComments[s].body = e.body);
            }
            setTimeout(() => {
              this.$store.commit("ratings/setLoadingComment", !1);
            }, 300);
          }
        },
        deep: !0,
      },
    },
    methods: {
      timeAgo(e) {
        const t = new Date(e),
          s = new Date(),
          n = Math.floor((s - t) / 1e3),
          l = Math.floor(n / 60),
          i = Math.floor(l / 60),
          m = Math.floor(i / 24),
          f = Math.floor(m / 7),
          w = Math.floor(f / 52);
        return w > 0
          ? `${w}y`
          : f > 0
          ? `${f}w`
          : m > 0
          ? `${m}d`
          : i > 0
          ? `${i}h`
          : l > 0
          ? `${l}m`
          : "just now";
      },
      validate() {
        let e = !0;
        return (
          (this.commentTextError = ""),
          (!this.commentText || this.commentText.trim() === "") &&
            ((this.commentTextError =
              this.translations &&
              this.translations.repost_should_not_be_empty),
            (e = !1)),
          e
        );
      },
      insertTab(e) {
        if (e.key === "Tab") {
          e.preventDefault();
          const t = e.target.selectionStart,
            s = e.target.selectionEnd;
          (this.commentText =
            this.commentText.substring(0, t) +
            "      " +
            this.commentText.substring(s)),
            this.$nextTick(() => {
              e.target.selectionStart = e.target.selectionEnd = t + 6;
            });
        }
      },
      adjustHeight(e) {
        this.$nextTick(() => {
          const t = e.target;
          (t.style.height = "auto"), (t.style.height = `${t.scrollHeight}px`);
        });
      },
      onClickOutside() {
        this.showingPostingActionMenu = !1;
      },
      include() {
        return [document.querySelector(".included")];
      },
      NavPostingActionMenu(e) {
        this.showingPostingActionMenu = !this.showingPostingActionMenu;
      },
      checkContentHeight() {
        const e = this.$refs.textElement;
        if (!e) return;
        this.lineHeight = parseInt(window.getComputedStyle(e).lineHeight);
        const t = this.lineHeight * 4;
        this.isContentOverflow = e.offsetHeight || e.scrollHeight > t;
      },
      checkContentHeightBody2() {
        const e = this.$refs.textElementBody2;
        if (!e) return;
        this.lineHeightBody2 = parseInt(window.getComputedStyle(e).lineHeight);
        const t = this.lineHeightBody2 * 4;
        this.isContentOverflowBody2 = e.offsetHeight || e.scrollHeight > t;
      },
      HidePostingActionMenu(e) {
        this.showingPostingActionMenu = !1;
      },
      openDialog() {
        this.$refs.contractorRatingDialogRef.openDialog(),
          this.$store.commit("ratings/setIndex", this.index);
      },
      processUrls(e) {
        const t = /(https?:\/\/[^<\s]+|www\.[^<\s]+)/g;
        return e == null
          ? void 0
          : e.replace(t, function (s) {
              return `<a @click.self.stop="()=>{}" href="${
                s.startsWith("http") ? s : "http://" + s
              }" target="_blank">${s}</a>`;
            });
      },
      toggleText() {
        this.showFullTextBody1 = !this.showFullTextBody1;
      },
      toggleTextBody2() {
        this.showFullTextBody2 = !this.showFullTextBody2;
      },
      async onLike() {
        if (!this.your_reaction || this.your_reaction === "dislike") {
          (this.likes_count = this.likes_count + 1),
            this.your_reaction === "dislike" &&
              (this.dislikes_count = this.dislikes_count - 1),
            (this.your_reaction = "like");
          try {
            (await axios.post(`/api/posts/${this.post.id}/like`, {}, H())).data;
          } catch {
            F();
          }
        } else if (this.your_reaction === "like") {
          (this.likes_count = this.likes_count - 1),
            (this.your_reaction = null);
          try {
            (await axios.delete(`/api/posts/${this.post.id}/like`, H())).data;
          } catch {
            F();
          }
        }
      },
      async onDislike() {
        if (!this.your_reaction || this.your_reaction === "like") {
          (this.dislikes_count = this.dislikes_count + 1),
            this.your_reaction === "like" &&
              (this.likes_count = this.likes_count - 1),
            (this.your_reaction = "dislike");
          try {
            (await axios.post(`/api/posts/${this.post.id}/dislike`, {}, H()))
              .data;
          } catch {
            F();
          }
        } else if (this.your_reaction === "dislike") {
          (this.dislikes_count = this.dislikes_count - 1),
            (this.your_reaction = null);
          try {
            (await axios.delete(`/api/posts/${this.post.id}/dislike`, H()))
              .data;
          } catch {
            F();
          }
        }
      },
      onOpenListofLikedUsersModel() {
        this.$refs.likeDialogRef.openDialog();
      },
      async onLikeModalOpen() {
        this.loadingLiked = !0;
        try {
          const e = await axios.get(`/api/posts/${this.post.id}/likes`, H());
          e.data && (this.likedUsers = e.data);
        } catch {
          F();
        } finally {
          this.loadingLiked = !1;
        }
      },
      onOpenListofDislikedUsersModel() {
        this.$refs.dislikeDialogRef.openDialog();
      },
      async onDislikeModalOpen() {
        this.loadingUnliked = !0;
        try {
          const e = await axios.get(`/api/posts/${this.post.id}/dislikes`, H());
          e.data && (this.unLikedUsers = e.data);
        } catch {
          F();
        } finally {
          this.loadingUnliked = !1;
        }
      },
      onOpenRepostAssuranceModel() {
        this.userVersion !== 1
          ? this.$refs.repostDialogRef.openDialog()
          : this.$store.commit("setIsUpgradeToGoldPlatinumDialogOpen", !0);
      },
      async onRepost() {
        if (this.validate()) {
          this.loadingRepost = !0;
          const e = { repost_comment: we(this.commentText) };
          try {
            (await axios.post(`/api/posts/${this.post.id}/repost`, e, H()))
              .data &&
              ((this.repost_count = this.repost_count + 1),
              console.log(this.repost_count, "repost count"),
              this.$emit("onRepost"),
              de(this.translations && this.translations.repost_successfully));
          } catch (t) {
            F(t.response.data.message, "inherit");
          } finally {
            (this.loadingRepost = !1), this.$refs.repostDialogRef.closeDialog();
          }
        }
      },
      async fetchAllComments() {
        var e, t, s;
        this.loadingComments = !0;
        try {
          const n = await axios.get(
            `/api/posts/${this.post.id}/comments?per_page=10`,
            H()
          );
          n.data &&
            ((this.allComments = (e = n.data) == null ? void 0 : e.comments),
            (this.pagination = (t = n.data) == null ? void 0 : t.pagination),
            (this.total_number_of_comments_with_replies =
              (s = n.data) == null
                ? void 0
                : s.total_number_of_comments_with_replies));
        } catch {
          F();
        } finally {
          this.loadingComments = !1;
        }
      },
      onOpenCommentsModal() {
        this.$emit("enlarge-post", this.post);
      },
      onAddingComment(e) {
        this.allComments.unshift(e),
          (this.total_number_of_comments_with_replies =
            this.total_number_of_comments_with_replies + 1),
          (this.addedNumber = this.addedNumber + 1);
      },
      onRepostEdit(e, t) {
        this.$emit("repostEdited", e, t);
      },
    },
  },
  oa = { key: 0 },
  la = { key: 1, class: "flex flex-col gap-2" },
  ia = { key: 2, class: "h-full" },
  na = {
    class:
      "p-2 text-xl text-grey-600 font-bold h-full flex items-center justify-center",
  },
  aa = { key: 0 },
  ra = { key: 1, class: "flex flex-col gap-2" },
  da = { key: 2, class: "h-full" },
  ua = {
    class:
      "p-2 text-xl text-grey-600 font-bold h-full flex items-center justify-center",
  },
  ca = { class: "mb-4" },
  ma = { class: "section_text-lg font-bold section_text-gray-800 mt-3 mb-2" },
  fa = { class: "text-md font-bold text-gray-600 mt-3 mb-2" },
  ga = ["placeholder"],
  pa = {
    key: 0,
    class:
      "z-48 flex flex-col items-center justify-start my-2 py-1 lg:py-1 px-2 bg-gray-200 border-2 border-gray-300 rounded-lg drop-shadow-lg transition-all duration-1000 transitioning reveal",
  },
  ha = { class: "flex flex-row justify-between items-center w-full mt-2" },
  va = {
    class: "cursor-pointer flex justify-start items-start flex-none w=16",
  },
  _a = { class: "block" },
  ya = { class: "flex flex-col justify-center ml-1" },
  xa = {
    class: "font-bold text-lg sm:text-xl",
    style: { "line-height": "1.5rem" },
  },
  ba = { class: "" },
  ka = { class: "" },
  wa = { class: "font-light text-sm overflow-hidden" },
  Ca = {
    class: "flex flex-row justify-end items-center self-start flex-none w-28",
  },
  Ia = { class: "flex flex-row flex-none justify-end items-center px-2" },
  Ta = { class: "flex flex-col md:mt-2 justify-center items-center" },
  Sa = { class: "md:mt-2" },
  Ea = {
    class: "font-light text-xs md:text-sm overflow-hidden tracking-tighter",
  },
  Pa = {
    class:
      "flex flex-col flex-initial flex-nowrap justify-center items-center mr-3",
  },
  Oa = { class: "-mr-2 flex items-center" },
  Ra = {
    class: "h-6 w-6",
    stroke: "currentColor",
    fill: "none",
    viewBox: "0 0 24 24",
  },
  $a = { class: "" },
  Da = { class: "flex flex-nowrap font-light text-xs tracking-tighter italic" },
  Aa = {
    key: 0,
    class: "flex gap-2 self-start sm:mt-[-4px] md:mt-[-6px] ml-[3px]",
  },
  ja = { key: 0, class: "text-sm flex gap-1 items-center" },
  Ua = o(
    "img",
    { src: "/images/icons/share_icon.png", width: "15", height: "15" },
    null,
    -1
  ),
  Ha = { class: "" },
  Fa = { class: "font-bold cursor-pointer" },
  La = { key: 1, class: "self-start", style: { "white-space": "pre-wrap" } },
  Ma = ["innerHTML"],
  Ba = ["innerHTML"],
  Na = { class: "flex flex-row justify-center w-full mb-1 mt-1" },
  Wa = ["innerHTML"],
  Va = { class: "pb-2 flex justify-between items-center w-full" },
  za = { class: "flex items-center gap-2" },
  qa = { class: "font-medium text-blue-800 cursor-pointer" },
  Ga = {
    class:
      "text-[13px] sx:text-[15px] sm:text-[17px] flex items-center justify-center leading-3 self-center",
  },
  Ka = { class: "font-medium text-blue-800 cursor-pointer" },
  Xa = {
    class:
      "text-[13px] sx:text-[15px] sm:text-[17px] flex items-center justify-center leading-3",
  },
  Ja = {
    class:
      "text-gray-900 text-[11px] x350:text-[13px] sx:text-[15px] sm:text-[17px] flex items-center self-center gap-[2px]",
  },
  Ya = {
    class:
      "text-[11px] x350:text-[13px] sx:text-[15px] flex items-center justify-center sm:text-[17px] leading-3",
  },
  Za = o(
    "div",
    { class: C("mb-2 border-[1px] w-full border-gray-300 rounded") },
    null,
    -1
  ),
  Qa = {
    class:
      "flex flex-row max-sm:gap-1 justify-between items-center w-full mb-2",
  },
  er = {
    class:
      "font-medium text-[10px] x350:text-xs sm:text-sm text-blue-800 cursor-pointer",
  },
  tr = { class: "flex flex-row justify-between items-center" },
  sr = { class: "hovered" },
  or = { class: "pl-1 icon-text text-[#16a34a]" },
  lr = {
    class:
      "font-medium text-[10px] x350:text-xs sm:text-sm text-blue-800 cursor-pointer",
  },
  ir = { class: "flex flex-row justify-between items-center" },
  nr = { class: "" },
  ar = { class: "pl-1 icon-text text-[#c40516]" },
  rr = {
    class: "font-medium text-[10px] x350:text-xs sm:text-sm text-blue-800",
  },
  dr = { class: "flex flex-row justify-between items-center" },
  ur = o(
    "div",
    { class: "" },
    [
      o("img", {
        src: "/images/icons/comment_icon.png",
        class:
          "w-[17px] x350:w-[20px] sm:w-[25px] h-[17px] x350:h-[20px] sm:h-[25px]",
      }),
    ],
    -1
  ),
  cr = { class: "pl-1 icon-text" },
  mr = {
    class: "font-medium text-[10px] x350:text-xs sm:text-sm text-blue-800",
  },
  fr = { class: "flex flex-row justify-between items-center" },
  gr = o(
    "div",
    { class: "" },
    [
      o("img", {
        src: "/images/icons/share_icon.png",
        class:
          "w-[17px] x350:w-[20px] sm:w-[25px] h-[17px] x350:h-[20px] sm:h-[25px]",
      }),
    ],
    -1
  ),
  pr = { class: "pl-1 icon-text" },
  hr = o(
    "div",
    { class: C("mb-2 border-[1px] w-full border-gray-300 rounded") },
    null,
    -1
  ),
  vr = { class: "flex flex-col gap-1 sm:gap-2 w-full" };
function _r(e, t, s, n, l, i) {
  const m = S("DialogContractorRating"),
    f = S("v-skeleton-loader"),
    w = S("LikedUser"),
    p = S("CustomDialog"),
    k = S("InputError"),
    u = S("Avatar"),
    b = S("Link"),
    _ = S("StarRounded"),
    x = S("Icon"),
    h = S("PostImageDisplay"),
    R = S("TwoVisibleComments"),
    y = S("PostingActionMenu"),
    $ = Ut("click-outside");
  return (
    a(),
    d(
      M,
      null,
      [
        r(
          m,
          {
            ref: "contractorRatingDialogRef",
            loggedInUserId: l.profileId,
            userId: s.post.user_id,
          },
          null,
          8,
          ["loggedInUserId", "userId"]
        ),
        r(
          p,
          {
            ref: "likeDialogRef",
            dialogWidth: "w-full h-full sm:h-5/6",
            onOpened: i.onLikeModalOpen,
            showFooter: !1,
            title: e.translations && e.translations.people_who_liked_the_post,
          },
          {
            default: E(() => [
              l.loadingLiked
                ? (a(),
                  d("div", oa, [
                    (a(),
                    d(
                      M,
                      null,
                      G(5, (c) => r(f, { key: c, type: "list-item-avatar" })),
                      64
                    )),
                  ]))
                : !l.loadingLiked && l.likedUsers && l.likedUsers.length > 0
                ? (a(),
                  d("div", la, [
                    (a(!0),
                    d(
                      M,
                      null,
                      G(
                        l.likedUsers,
                        (c, D) => (
                          a(),
                          L(w, { liked: "", key: D, user: c }, null, 8, [
                            "user",
                          ])
                        )
                      ),
                      128
                    )),
                  ]))
                : (a(),
                  d("div", ia, [
                    o(
                      "div",
                      na,
                      g(e.translations && e.translations.no_contractor_found),
                      1
                    ),
                  ])),
            ]),
            _: 1,
          },
          8,
          ["onOpened", "title"]
        ),
        r(
          p,
          {
            ref: "dislikeDialogRef",
            dialogWidth: "w-full h-full sm:h-5/6",
            onOpened: i.onDislikeModalOpen,
            showFooter: !1,
            title:
              e.translations && e.translations.people_who_disliked_the_post,
          },
          {
            default: E(() => [
              l.loadingUnliked
                ? (a(),
                  d("div", aa, [
                    (a(),
                    d(
                      M,
                      null,
                      G(3, (c) => r(f, { key: c, type: "list-item-avatar" })),
                      64
                    )),
                  ]))
                : !l.loadingUnliked &&
                  l.unLikedUsers &&
                  l.unLikedUsers.length > 0
                ? (a(),
                  d("div", ra, [
                    (a(!0),
                    d(
                      M,
                      null,
                      G(
                        l.unLikedUsers,
                        (c, D) => (
                          a(), L(w, { key: D, user: c }, null, 8, ["user"])
                        )
                      ),
                      128
                    )),
                  ]))
                : (a(),
                  d("div", da, [
                    o(
                      "div",
                      ua,
                      g(e.translations && e.translations.no_contractor_found),
                      1
                    ),
                  ])),
            ]),
            _: 1,
          },
          8,
          ["onOpened", "title"]
        ),
        r(
          p,
          {
            ref: "repostDialogRef",
            onSubmit: i.onRepost,
            loading: l.loadingRepost,
            disabled: l.loadingRepost,
            shouldFetchPost: !1,
            submitText: e.translations && e.translations.repost_now,
            title:
              e.translations && e.translations.do_you_wish_to_share_this_post,
          },
          {
            default: E(() => [
              o("div", ca, [
                o(
                  "div",
                  ma,
                  g(
                    e.translations &&
                      e.translations.reposting_allows_you_to_share
                  ),
                  1
                ),
                o(
                  "div",
                  fa,
                  g(e.translations && e.translations.repost_text),
                  1
                ),
                X(
                  o(
                    "textarea",
                    {
                      id: "responseText",
                      type: "text",
                      rows: 5,
                      class:
                        "mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm overflow-hidden",
                      required: "",
                      "onUpdate:modelValue":
                        t[0] || (t[0] = (c) => (l.commentText = c)),
                      ref: "textRef",
                      onKeydown:
                        t[1] ||
                        (t[1] = (...c) => i.insertTab && i.insertTab(...c)),
                      onInput:
                        t[2] ||
                        (t[2] = (...c) =>
                          i.adjustHeight && i.adjustHeight(...c)),
                      onPaste:
                        t[3] ||
                        (t[3] = (...c) =>
                          i.adjustHeight && i.adjustHeight(...c)),
                      placeholder:
                        e.translations &&
                        e.translations.say_something_about_the_post,
                    },
                    null,
                    40,
                    ga
                  ),
                  [[se, l.commentText]]
                ),
                l.commentTextError
                  ? (a(),
                    L(
                      k,
                      { key: 0, class: "mt-2", message: l.commentTextError },
                      null,
                      8,
                      ["message"]
                    ))
                  : I("", !0),
              ]),
            ]),
            _: 1,
          },
          8,
          ["onSubmit", "loading", "disabled", "submitText", "title"]
        ),
        s.post && Object.keys(s.post).length > 0
          ? (a(),
            d("div", pa, [
              o("div", ha, [
                r(
                  b,
                  {
                    href: `/contractor/${s.post.user_id}`,
                    class: "flex flex-row gap-2 justify-start items-start",
                  },
                  {
                    default: E(() => [
                      o("div", va, [
                        o("div", _a, [
                          r(
                            u,
                            {
                              style: q({
                                width:
                                  e.screenWidth >= 640 ? "4.5rem" : "3.7rem",
                                height:
                                  e.screenWidth >= 640 ? "4.5rem" : "3.7rem",
                              }),
                              imageSrc: s.post.user_avatar,
                            },
                            null,
                            8,
                            ["style", "imageSrc"]
                          ),
                        ]),
                      ]),
                      o("div", ya, [
                        o(
                          "h2",
                          xa,
                          g(s.post.id) +
                            ": " +
                            g(s.post.first_name + " " + s.post.last_name),
                          1
                        ),
                        o("div", ba, g(s.post.company_name), 1),
                        o("div", ka, [
                          o(
                            "h2",
                            wa,
                            g(s.post.city) + " " + g(s.post.state),
                            1
                          ),
                        ]),
                      ]),
                    ]),
                    _: 1,
                  },
                  8,
                  ["href"]
                ),
                o("div", Ca, [
                  o("div", Ia, [
                    o("div", Ta, [
                      r(
                        _,
                        {
                          onClick: i.openDialog,
                          innerStarRadius: e.screenWidth > 768 ? 17 : 13,
                          starWidth: e.screenWidth > 768 ? 24 : 15,
                          class: C("h-4 md:h-6 cursor-pointer"),
                          indicatorClasses: "text-small h-4 md:h-6 ",
                          starHeight: e.screenWidth > 768 ? 24 : 15,
                          rating: Number(
                            parseFloat(
                              s.post.average_rating ? s.post.average_rating : 0
                            ).toFixed(1)
                          ),
                          isIndicatorActive: !1,
                        },
                        null,
                        8,
                        [
                          "onClick",
                          "innerStarRadius",
                          "starWidth",
                          "starHeight",
                          "rating",
                        ]
                      ),
                      o("div", Sa, [o("h2", Ea, g(s.post.total_reviews), 1)]),
                    ]),
                  ]),
                  o("div", Pa, [
                    X(
                      (a(),
                      d("div", Oa, [
                        o(
                          "button",
                          {
                            onClick:
                              t[4] ||
                              (t[4] = (...c) =>
                                i.NavPostingActionMenu &&
                                i.NavPostingActionMenu(...c)),
                            class:
                              "inline-flex items-center justify-center p-2 rounded-md text-black hover:text-gray-500 hover:bg-gray-100 dfocus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out",
                          },
                          [
                            (a(),
                            d("svg", Ra, [
                              o(
                                "path",
                                {
                                  class: C({
                                    hidden: l.showingPostingActionMenu,
                                    "inline-flex": !l.showingPostingActionMenu,
                                  }),
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M4 6h16M4 12h16M4 18h16",
                                },
                                null,
                                2
                              ),
                              o(
                                "path",
                                {
                                  class: C({
                                    hidden: !l.showingPostingActionMenu,
                                    "inline-flex": l.showingPostingActionMenu,
                                  }),
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M6 18L18 6M6 6l12 12",
                                },
                                null,
                                2
                              ),
                            ])),
                          ]
                        ),
                      ])),
                      [[$, { handler: i.onClickOutside, include: i.include }]]
                    ),
                    o("div", $a, [
                      o("h2", Da, g(i.timeAgo(s.post.updated_at)), 1),
                    ]),
                  ]),
                ]),
              ]),
              s.post.original_user_first_name && s.post.original_user_last_name
                ? (a(),
                  d("div", Aa, [
                    o(
                      "div",
                      {
                        style: q({
                          width: e.screenWidth >= 640 ? "4.5rem" : "3.7rem",
                        }),
                      },
                      null,
                      4
                    ),
                    r(
                      b,
                      {
                        class: "self-start",
                        href: `/contractor/${s.post.original_user_id}`,
                      },
                      {
                        default: E(() => [
                          s.post.original_user_first_name &&
                          s.post.original_user_last_name
                            ? (a(),
                              d("div", ja, [
                                Ua,
                                o(
                                  "div",
                                  Ha,
                                  g(
                                    e.translations &&
                                      e.translations.reposted_from
                                  ),
                                  1
                                ),
                                r(x, {
                                  class: "translate-y-[-1px]",
                                  icon: "ion:caret-forward",
                                  width: "15",
                                }),
                                o(
                                  "div",
                                  Fa,
                                  g(
                                    s.post.original_user_first_name +
                                      " " +
                                      s.post.original_user_last_name
                                  ),
                                  1
                                ),
                              ]))
                            : I("", !0),
                        ]),
                        _: 1,
                      },
                      8,
                      ["href"]
                    ),
                  ]))
                : I("", !0),
              s.post.repost_comment
                ? (a(), d("div", La, g(s.post.repost_comment), 1))
                : I("", !0),
              o(
                "div",
                {
                  class: C([
                    `${l.title_text_alignment} ${
                      l.titleCustomBgColor.startsWith("#")
                        ? " flex-col w-full items-center  px-2 py-2 rounded-md shadow-lg border-2"
                        : "w-full"
                    } `,
                    "font-bold text-xl sm:text-2xl md:tex-3xl mb-1 mt-1",
                  ]),
                  onClick:
                    t[5] || (t[5] = (c) => e.$emit("enlarge-post", s.post)),
                  style: q({ backgroundColor: l.titleCustomBgColor }),
                },
                [
                  X(
                    o(
                      "span",
                      {
                        innerHTML: s.post.title,
                        style: q([
                          { "white-space": "pre-wrap" },
                          i.titleTextStyle,
                        ]),
                        class: C(
                          `${i.titleClass} w-full processed-body inline`
                        ),
                        ref: "titleElement",
                      },
                      null,
                      14,
                      Ma
                    ),
                    [[me, s.post.title]]
                  ),
                ],
                6
              ),
              o(
                "div",
                {
                  class: C([
                    `${l.text_alignment} ${
                      l.customBgColor.startsWith("#")
                        ? " flex-col w-full items-center  px-2 py-[87px] rounded-md shadow-lg border-2"
                        : "w-full"
                    } `,
                    "",
                  ]),
                  onClick:
                    t[7] || (t[7] = (c) => e.$emit("enlarge-post", s.post)),
                  style: q({ backgroundColor: l.customBgColor }),
                },
                [
                  X(
                    o(
                      "span",
                      {
                        innerHTML: i.displayedBody1,
                        style: q([{ "white-space": "pre-wrap" }, i.textStyle]),
                        class: C(
                          `${i.body1Class} w-full processed-body inline`
                        ),
                        ref: "textElement",
                      },
                      null,
                      14,
                      Ba
                    ),
                    [[me, s.post.body1]]
                  ),
                  l.isContentOverflow
                    ? (a(),
                      d(
                        "span",
                        {
                          key: 0,
                          onClick:
                            t[6] ||
                            (t[6] = Re(
                              (...c) => i.toggleText && i.toggleText(...c),
                              ["self", "stop"]
                            )),
                          class: C(
                            `${i.toggleClass} ${
                              (l.showFullTextBody1, "inline")
                            } `
                          ),
                        },
                        g(l.showFullTextBody1 ? "...less" : "...more"),
                        3
                      ))
                    : I("", !0),
                ],
                6
              ),
              o("div", Na, [
                s.post.image
                  ? (a(),
                    d(
                      "div",
                      {
                        key: 0,
                        class: "w-full",
                        onClick:
                          t[8] ||
                          (t[8] = (c) => e.$emit("enlarge-post", s.post)),
                      },
                      [
                        r(
                          h,
                          {
                            imageArray: i.imageArray,
                            numberOfImages: i.numberOfImages,
                          },
                          null,
                          8,
                          ["imageArray", "numberOfImages"]
                        ),
                      ]
                    ))
                  : I("", !0),
              ]),
              o(
                "div",
                {
                  class: C(["'w-full'", ""]),
                  onClick:
                    t[10] || (t[10] = (c) => e.$emit("enlarge-post", s.post)),
                },
                [
                  X(
                    o(
                      "span",
                      {
                        innerHTML: i.displayedBody2,
                        style: q([
                          { "white-space": "pre-wrap" },
                          i.textStyleBody2,
                        ]),
                        class: C("w-full processed-body inline"),
                        ref: "textElementBody2",
                      },
                      null,
                      12,
                      Wa
                    ),
                    [[me, s.post.body2]]
                  ),
                  l.isContentOverflowBody2
                    ? (a(),
                      d(
                        "span",
                        {
                          key: 0,
                          onClick:
                            t[9] ||
                            (t[9] = Re(
                              (...c) =>
                                i.toggleTextBody2 && i.toggleTextBody2(...c),
                              ["self", "stop"]
                            )),
                          class: C(
                            `${i.toggleClassBody2} ${
                              (l.showFullTextBody2, "inline")
                            } `
                          ),
                        },
                        g(l.showFullTextBody2 ? "...less" : "...more"),
                        3
                      ))
                    : I("", !0),
                ]
              ),
              o(
                "div",
                {
                  class: C(
                    `mb-2 ${
                      s.post.body2 ? "mt-3" : ""
                    } border-[1px] w-1/3 border-gray-800 rounded`
                  ),
                },
                null,
                2
              ),
              o("div", Va, [
                o("div", za, [
                  o(
                    "div",
                    {
                      class:
                        "flex gap-1 justify-center items-center cursor-pointer",
                      onClick:
                        t[11] ||
                        (t[11] = (...c) =>
                          i.onOpenListofLikedUsersModel &&
                          i.onOpenListofLikedUsersModel(...c)),
                    },
                    [
                      o("div", qa, [
                        r(x, {
                          icon: "emojione-monotone:up-arrow",
                          class: C(
                            "text-[17px] xs:text-[25px]  text-[#16a34a]"
                          ),
                        }),
                      ]),
                      o("div", Ga, g(l.likes_count), 1),
                    ]
                  ),
                  o(
                    "div",
                    {
                      class:
                        "flex gap-1 justify-center items-center cursor-pointer",
                      onClick:
                        t[12] ||
                        (t[12] = (...c) =>
                          i.onOpenListofDislikedUsersModel &&
                          i.onOpenListofDislikedUsersModel(...c)),
                    },
                    [
                      o("div", Ka, [
                        r(x, {
                          icon: "emojione-monotone:up-arrow",
                          class: C("text-[17px] xs:text-[25px] text-[#c40516]"),
                          rotate: 2,
                        }),
                      ]),
                      o("div", Xa, g(l.dislikes_count), 1),
                    ]
                  ),
                ]),
                o("div", Ja, [
                  o(
                    "span",
                    {
                      class: "cursor-pointer hover:underline leading-3",
                      onClick:
                        t[13] ||
                        (t[13] = (c) => e.$emit("enlarge-post", s.post)),
                    },
                    g(l.total_number_of_comments_with_replies) +
                      " " +
                      g(e.translations && e.translations.comments),
                    1
                  ),
                  r(x, { icon: "octicon:dot-fill-16", width: "11" }),
                  o(
                    "span",
                    Ya,
                    g(l.repost_count) +
                      " " +
                      g(e.translations && e.translations.reposts),
                    1
                  ),
                ]),
              ]),
              Za,
              o("div", Qa, [
                o(
                  "div",
                  {
                    class: "hovered",
                    onClick:
                      t[14] || (t[14] = (...c) => i.onLike && i.onLike(...c)),
                  },
                  [
                    o("div", er, [
                      o("div", tr, [
                        o("div", sr, [
                          r(
                            x,
                            {
                              icon: "emojione-monotone:up-arrow",
                              class: C([
                                "text-[17px] x350:text-[20px] sm:text-[25px] icon-like text-transparent stroke-[2px] stroke-green-600",
                                `${l.your_reaction === "like" ? "liked" : ""}`,
                              ]),
                            },
                            null,
                            8,
                            ["class"]
                          ),
                        ]),
                        o(
                          "div",
                          or,
                          g(e.translations && e.translations.like),
                          1
                        ),
                      ]),
                    ]),
                  ]
                ),
                o(
                  "div",
                  {
                    class: "hovered",
                    onClick:
                      t[15] ||
                      (t[15] = (...c) => i.onDislike && i.onDislike(...c)),
                  },
                  [
                    o("a", lr, [
                      o("div", ir, [
                        o("div", nr, [
                          r(
                            x,
                            {
                              icon: "emojione-monotone:up-arrow",
                              rotate: 2,
                              class: C([
                                `${
                                  l.your_reaction === "dislike"
                                    ? "disliked"
                                    : ""
                                }`,
                                "text-[17px] x350:text-[20px] sm:text-[25px] icon-dislike text-transparent stroke-[2px] stroke-[#c40516]",
                              ]),
                            },
                            null,
                            8,
                            ["class"]
                          ),
                        ]),
                        o(
                          "div",
                          ar,
                          g(e.translations && e.translations.dislike),
                          1
                        ),
                      ]),
                    ]),
                  ]
                ),
                o(
                  "div",
                  {
                    class: "hovered cursor-pointer",
                    onClick:
                      t[16] || (t[16] = (c) => e.$emit("enlarge-post", s.post)),
                  },
                  [
                    o("div", rr, [
                      o("div", dr, [
                        ur,
                        o(
                          "div",
                          cr,
                          g(e.translations && e.translations.comment),
                          1
                        ),
                      ]),
                    ]),
                  ]
                ),
                o(
                  "div",
                  {
                    class: "hovered cursor-pointer",
                    onClick:
                      t[17] ||
                      (t[17] = (...c) =>
                        i.onOpenRepostAssuranceModel &&
                        i.onOpenRepostAssuranceModel(...c)),
                  },
                  [
                    o("div", mr, [
                      o("div", fr, [
                        gr,
                        o(
                          "div",
                          pr,
                          g(e.translations && e.translations.repost),
                          1
                        ),
                      ]),
                    ]),
                  ]
                ),
              ]),
              hr,
              o("div", vr, [
                r(
                  R,
                  {
                    loadingComments: l.loadingComments,
                    onOpenAllComments: i.onOpenCommentsModal,
                    onUnshiftIntoComments: i.onAddingComment,
                    comments: i.firstTwoComments,
                    length: l.allComments.length,
                    postId: s.post.id,
                  },
                  null,
                  8,
                  [
                    "loadingComments",
                    "onOpenAllComments",
                    "onUnshiftIntoComments",
                    "comments",
                    "length",
                    "postId",
                  ]
                ),
              ]),
              r(
                y,
                {
                  showingPostingActionMenu: l.showingPostingActionMenu,
                  postID: s.post.id,
                  post: s.post,
                  postUserId: s.post.user_id,
                  imageArray: i.imageArray,
                  currentUserId: s.profile.user_id,
                  onNavPostingActionMenu: i.NavPostingActionMenu,
                  onRepostEdited: i.onRepostEdit,
                },
                null,
                8,
                [
                  "showingPostingActionMenu",
                  "postID",
                  "post",
                  "postUserId",
                  "imageArray",
                  "currentUserId",
                  "onNavPostingActionMenu",
                  "onRepostEdited",
                ]
              ),
            ]))
          : I("", !0),
      ],
      64
    )
  );
}
const nu = ce(sa, [["render", _r]]);
const yr = { class: "mb-2" },
  xr = { key: 0 },
  br = {
    __name: "AllComments",
    props: {
      modelValue: { type: Array },
      addedNumber: { type: Number },
      postId: { type: [Number, String] },
      added: { default: !1, type: Boolean },
      loadingComments: { default: !1, type: Boolean },
      pagination: { type: Object },
    },
    emits: ["update:modelValue", "update:addedNumber"],
    setup(e, { emit: t }) {
      var y;
      const s = e,
        n = ue(),
        l = v(null),
        i = v((y = s.modelValue) != null ? y : []),
        m = v(s.pagination),
        f = v(1),
        w = v(10),
        p = v(!1),
        k = v(),
        u = v(s.addedNumber),
        b = v(!1),
        _ = K(() => n.state.profile.commentId),
        x = K(() => n.state.profile.translations);
      j(
        () => s.modelValue,
        ($) => {
          $ && (i.value = $);
        }
      ),
        j(
          () => s.addedNumber,
          ($) => {
            $ && (u.value = $);
          }
        ),
        j(
          () => s.pagination,
          ($) => {
            $ && (m.value = $);
          }
        ),
        j(
          () => i.value,
          ($) => {
            t("update:modelValue", i.value);
          }
        ),
        j(
          () => u.value,
          ($) => {
            t("update:addedNumber", u.value);
          }
        ),
        j(
          () => _.value,
          async ($) => {
            $ > 0 &&
              ((f.value = 1),
              (b.value = !0),
              await R(w.value, f.value, !1, !0),
              (b.value = !1));
          }
        ),
        j(
          () => s.added,
          ($) => {
            var c;
            $ &&
              ((c = l.value) == null ||
                c.scrollIntoView({ behavior: "smooth" }));
          }
        ),
        fe(async () => {
          i.value.length > 0 &&
            setTimeout(() => {
              const $ = (D) => {
                D.forEach((O) => {
                  O.isIntersecting && h();
                });
              };
              new IntersectionObserver($, {
                rootMargin: "0px 0px 0px 0px",
                threshold: 0,
              }).observe(k.value);
            }, 100);
        });
      const h = async () => {
          (p.value = !0),
            (f.value = f.value + 1),
            await R(w.value, f.value),
            (p.value = !1);
        },
        R = async ($ = w.value, c = 1, D = !0, O = !1) => {
          try {
            const U = await axios.get(
              `/api/posts/${s.postId}/comments?per_page=${$}&page=${c}`,
              H()
            );
            u.value > 0
              ? ((i.value = [...i.value, ...U.data.comments.slice(u.value)]),
                (u.value = 0))
              : D
              ? (i.value = [...i.value, ...U.data.comments])
              : O || ((f.value = 1), (i.value = [...U.data.comments])),
              (m.value = U.data.pagination);
          } catch {
            F();
          }
        };
      return ($, c) => {
        const D = S("v-skeleton-loader");
        return (
          a(),
          L(
            vt,
            { name: "fade" },
            {
              default: E(() => [
                o("div", yr, [
                  e.loadingComments || b.value
                    ? (a(),
                      d("div", xr, [
                        (a(),
                        d(
                          M,
                          null,
                          G(5, (O) =>
                            r(D, {
                              key: O,
                              color: "#e5e7eb",
                              type: "list-item-avatar-two-line",
                            })
                          ),
                          64
                        )),
                      ]))
                    : I("", !0),
                  i.value && i.value.length > 0 && !b.value
                    ? (a(),
                      d(
                        "div",
                        {
                          key: 1,
                          class: "flex flex-col gap-1 sm:gap-2",
                          ref_key: "commentList",
                          ref: l,
                        },
                        [
                          r(
                            Ae,
                            {
                              name: "comment-transition",
                              tag: "div",
                              class: "flex flex-col gap-1 sm:gap-2",
                            },
                            {
                              default: E(() => [
                                (a(!0),
                                d(
                                  M,
                                  null,
                                  G(
                                    i.value,
                                    (O) => (
                                      a(),
                                      d("div", { key: O.id }, [
                                        r(Je, { comment: O }, null, 8, [
                                          "comment",
                                        ]),
                                      ])
                                    )
                                  ),
                                  128
                                )),
                              ]),
                              _: 1,
                            }
                          ),
                        ],
                        512
                      ))
                    : I("", !0),
                  +f.value != +m.value.last_page
                    ? (a(),
                      d(
                        "div",
                        {
                          key: 2,
                          ref_key: "loadMoreIntersect",
                          ref: k,
                          style: { width: "5px", height: "5px" },
                        },
                        null,
                        512
                      ))
                    : I("", !0),
                  X(
                    o(
                      "div",
                      { class: "text-center font-bold mt-4" },
                      g(x.value && x.value.no_comments_yet),
                      513
                    ),
                    [
                      [
                        me,
                        f.value > 1 &&
                          !p.value &&
                          +f.value == +m.value.last_page,
                      ],
                    ]
                  ),
                  r(
                    $e,
                    {
                      classes: "flex gap-2",
                      loading: p.value,
                      circleClasses: "small-circle",
                      textClasses: "small-text",
                      background: "",
                      height: "70px",
                    },
                    null,
                    8,
                    ["loading"]
                  ),
                ]),
              ]),
              _: 1,
            }
          )
        );
      };
    },
  };
const kr = {
    class: "flex gap-2 w-full items-start overflow-auto max-h-[165px]",
  },
  wr = ["placeholder"],
  Cr = { class: "text-white" },
  Ir = {
    __name: "WriteCommentFooter",
    props: {
      postId: { type: [Number, String] },
      showCancel: { type: Boolean, default: !0 },
      showFooter: { type: Boolean, default: !0 },
    },
    emits: ["unshiftIntoComments"],
    setup(e, { emit: t }) {
      const s = e,
        n = ue(),
        l = v(),
        i = v(),
        m = v(""),
        f = v(70),
        w = v(25),
        p = v(!1),
        k = K(() => n.getters.screenWidth),
        u = K(() => n.getters.translations);
      fe(() => {
        k.value > 640
          ? ((f.value = 70), (w.value = 25))
          : ((f.value = 60), (w.value = 17));
      }),
        j(
          () => k,
          (h) => {
            console.log("here"),
              h > 640
                ? ((f.value = 70), (w.value = 25))
                : ((f.value = 60), (w.value = 17));
          }
        );
      const b = () => {
          te(() => {
            (l.value.style.height = "auto"),
              (l.value.style.height = l.value.scrollHeight + "px"),
              l.value.scrollHeight < 165 &&
              l.value.scrollHeight + w.value > f.value
                ? (i.value.style.minHeight =
                    l.value.scrollHeight + w.value + "px")
                : l.value.scrollHeight + w.value < f.value &&
                  (i.value.style.minHeight = f.value + "px");
          });
        },
        _ = (h) => {
          if (h.key === "Tab") {
            h.preventDefault();
            const R = h.target.selectionStart,
              y = h.target.selectionEnd;
            (m.value =
              m.value.substring(0, R) + "      " + m.value.substring(y)),
              te(() => {
                h.target.selectionStart = h.target.selectionEnd = R + 60;
              });
          }
        },
        x = async (h) => {
          if (
            (h.preventDefault(),
            (p.value = !0),
            !m.value && m.value / trim() === "")
          )
            return;
          const R = { body: Ce(m) };
          try {
            const y = await axios.post(
              `/api/posts/${s.postId}/comments`,
              R,
              H()
            );
            y.data && ((m.value = ""), b(), t("unshiftIntoComments", y.data));
          } catch {
            F();
          } finally {
            p.value = !1;
          }
        };
      return (h, R) => {
        const y = S("v-progress-linear"),
          $ = S("v-dialog");
        return (
          a(),
          d(
            M,
            null,
            [
              e.showFooter
                ? (a(),
                  d(
                    "div",
                    {
                      key: 0,
                      class: C(
                        `flex ${
                          e.showCancel ? "justify-between" : "justify-end"
                        } p-2 pb-0 sm:p-3 shadow-lg  overflow-hidden  border-t-[1px] border-gray-400 min-h-[60px] sm:min-h-[70px]`
                      ),
                      ref_key: "container",
                      ref: i,
                    },
                    [
                      o("div", kr, [
                        X(
                          o(
                            "textarea",
                            {
                              id: "comment",
                              "onUpdate:modelValue":
                                R[0] || (R[0] = (c) => (m.value = c)),
                              onPaste: b,
                              ref_key: "commentAreaRef",
                              ref: l,
                              onKeydown: _,
                              onInput: b,
                              rows: 1,
                              placeholder: u.value && u.value.write_a_comment,
                              class:
                                "text-xl w-full py-1 min-h-[40px] overflow-hidden px-3 focus:shadow-none focus:ring-gray-600 focus:rounded bg-[#f9fafb] border-gray-400 text-grey-600 resize-none rounded focus-within:ring-gray-600 focus:border-gray-600",
                            },
                            null,
                            40,
                            wr
                          ),
                          [[se, m.value]]
                        ),
                        r(
                          W(V),
                          {
                            type: "button",
                            disabled: p.value,
                            onClick: x,
                            class: C(
                              `w-8 h-8 sx:w-10 sx:h-10 cursor-pointer text-gray-500 apply-stroke ${
                                p.value ? "opacity-40" : "opacity-100"
                              }`
                            ),
                            icon: "carbon:send-filled",
                          },
                          null,
                          8,
                          ["disabled", "class"]
                        ),
                      ]),
                    ],
                    2
                  ))
                : I("", !0),
              e.showFooter
                ? (a(),
                  L(
                    $,
                    {
                      key: 1,
                      class: "dialog-modal",
                      modelValue: p.value,
                      "onUpdate:modelValue":
                        R[1] || (R[1] = (c) => (p.value = c)),
                      scrim: "transparent",
                      persistent: "",
                      width: "auto",
                    },
                    {
                      default: E(() => [
                        r(
                          je,
                          {
                            shadowLevel: 2,
                            bgColor: "#364fc7",
                            padding: k.value < 640 ? "7px" : "10px",
                          },
                          {
                            default: E(() => [
                              o(
                                "div",
                                Cr,
                                g(u.value && u.value.uploading) +
                                  " Comment... ",
                                1
                              ),
                              r(y, {
                                indeterminate: "",
                                color: "#fff",
                                class: "mb-0",
                              }),
                            ]),
                            _: 1,
                          },
                          8,
                          ["padding"]
                        ),
                      ]),
                      _: 1,
                    },
                    8,
                    ["modelValue"]
                  ))
                : I("", !0),
            ],
            64
          )
        );
      };
    },
  };
const Tr = {
    components: {
      PostShowTheImage: z,
      cConnectWord: xt,
      StarRounded: bt,
      WriteCommentFooter: Ir,
      AllComments: br,
      InputError: Ie,
      LikedUser: We,
      CustomDialog: ne,
      DialogContractorRating: Pt,
      Avatar: Ge,
      Icon: V,
    },
    props: {
      profile: { type: Object, required: !0 },
      postEnlarged: { type: Object, required: !0 },
      body1Colors: { type: Array, required: !0 },
      textColors: { type: Array, required: !0 },
      backgroundColors: { type: Array, required: !0 },
    },
    data() {
      let e = De().props.value;
      return {
        commentTextError: "",
        commentText: "",
        repostDialogRef: null,
        customBgColor: "",
        postToEnlarge: this.postEnlarged,
        added: !1,
        text_alignment: "left",
        text_color: "",
        lineHeight: 0,
        lineHeightBody2: 0,
        title_text_alignment: "",
        titleCustomBgColor: "left",
        title_text_color: "",
        your_reaction: this.postEnlarged.your_reaction,
        user: e.auth.user,
        likes_count: this.postEnlarged.likes_count,
        profileId: e.profile.id,
        dislikes_count: this.postEnlarged.dislikes_count,
        repost_count: this.postEnlarged.repost,
        loadingLiked: !1,
        loadingUnliked: !1,
        loadingRepost: !1,
        likedUsers: [],
        unLikedUsers: [],
        allComments: [],
        loadingComments: !1,
        pagination: {},
        addedNumber: 0,
        total_number_of_comments_with_replies: 0,
      };
    },
    mounted() {
      this.fetchAllComments();
    },
    computed: {
      ...ie(["screenWidth"]),
      ...ie("profile", [
        "commentId",
        "postComment",
        "replyId",
        "reply",
        "postReply",
        "pusherComment",
        "pusherCommentToDelete",
        "pusherCommentPosted",
        "isCommentAddedEnlarged",
      ]),
      ...ie(["translations", "userVersion"]),
      ...ie("ratings", ["comment"]),
      imageArray: {
        get: function () {
          return this.postToEnlarge &&
            this.postToEnlarge.image &&
            this.postToEnlarge.image.length > 0
            ? this.postToEnlarge.image.split("|")
            : [];
        },
      },
      textStyle() {
        return {
          fontSize: `${16 + +this.postToEnlarge.font_size}px`,
          lineHeight:
            +this.postToEnlarge.font_size > 3 &&
            +this.postToEnlarge.font_size < 10
              ? "1.7rem"
              : +this.postToEnlarge.font_size >= 10
              ? "2rem"
              : "inherit",
          display: "block",
          color: this.text_color,
        };
      },
      textStyleBody2() {
        return { overflow: "hidden", display: "block" };
      },
      titleTextStyle() {
        return { color: this.title_text_color };
      },
      titleClass: function () {
        let e, t;
        return (
          this.postToEnlarge.title_text_alignment &&
            (this.title_text_alignment =
              this.postToEnlarge.title_text_alignment === "left"
                ? " text-left"
                : this.postToEnlarge.title_text_alignment === "center"
                ? " text-center"
                : " text-right"),
          this.postToEnlarge.title_text_color_id &&
            this.textColors.forEach((s) => {
              s.id === this.postToEnlarge.title_text_color_id &&
                (this.title_text_color = s.color);
            }),
          this.postToEnlarge.title_background_color_id &&
            this.backgroundColors.forEach((s) => {
              s.id === this.postToEnlarge.title_background_color_id &&
                (this.titleCustomBgColor = s.color);
            }),
          e + " " + t
        );
      },
      body1Class: function () {
        let e, t;
        return (
          this.postToEnlarge.is_body_bold && (e = "font-bold"),
          this.postToEnlarge.text_alignment &&
            (this.text_alignment =
              this.postToEnlarge.text_alignment === "left"
                ? " text-left"
                : this.postToEnlarge.text_alignment === "center"
                ? " text-center"
                : " text-right"),
          this.postToEnlarge.post_text_color_id &&
            this.textColors.forEach((s) => {
              s.id === this.postToEnlarge.post_text_color_id &&
                (this.text_color = s.color);
            }),
          this.postToEnlarge.post_background_color_id &&
            this.backgroundColors.forEach((s) => {
              s.id === this.postToEnlarge.post_background_color_id &&
                (this.customBgColor = s.color);
            }),
          e + " " + t
        );
      },
      displayedBody1() {
        let e = this.postToEnlarge.body1;
        return e && (e = e.replace(/\/n/g, "<br>")), this.processUrls(e);
      },
      displayedBody2() {
        let e = this.postToEnlarge.body2;
        return e && (e = e.replace(/\/n/g, "<br>")), this.processUrls(e);
      },
    },
    emits: ["close-enlarged", "onAddingEnlargeComment"],
    watch: {
      isCommentAddedEnlarged(e) {
        console.log("comment added"),
          e &&
            ((this.total_number_of_comments_with_replies =
              this.total_number_of_comments_with_replies + 1),
            this.$store.commit("profile/setIsCommentAddedEnlarged", !1));
      },
      commentText(e) {
        e && (this.commentTextError = "");
      },
      postEnlarged: {
        handler(e, t) {
          e &&
            Object.keys(e).length > 0 &&
            ((this.repost_count = this.postEnlarged.repost),
            (this.likes_count = this.postEnlarged.likes_count),
            (this.dislikes_count = this.postEnlarged.dislikes_count),
            (this.your_reaction = this.postEnlarged.your_reaction));
        },
        deep: !0,
      },
      pusherCommentPosted: {
        handler(e, t) {
          e &&
            e.id &&
            e != t &&
            this.postToEnlarge.id === e.post_id &&
            this.allComments.findIndex((n) => n.id === e.id) === -1 &&
            (this.allComments.unshift(e),
            (this.total_number_of_comments_with_replies =
              this.total_number_of_comments_with_replies + 1));
        },
        deep: !0,
      },
      commentId(e) {
        if (e) {
          const t = this.allComments.findIndex((s) => s.id === e);
          t !== -1 &&
            (this.allComments.splice(t, 1),
            (this.total_number_of_comments_with_replies =
              this.total_number_of_comments_with_replies - 1));
        }
      },
      pusherCommentToDelete: {
        handler(e, t) {
          if (e && e.id && e != t && this.postToEnlarge.id === e.post_id) {
            const s = e.parent_id ? e.parent_id : e.id,
              n = this.allComments.findIndex((l) => l.id === s);
            if (s === e.id)
              n !== -1 &&
                (this.allComments.splice(n, 1),
                (this.total_number_of_comments_with_replies =
                  this.total_number_of_comments_with_replies - 1));
            else {
              const l = this.allComments[n].replies.findIndex(
                (i) => i.id === e.id
              );
              this.allComments[n].replies.splice(l, 1);
            }
          }
        },
        deep: !0,
      },
      replyId(e) {
        if (e)
          for (let t = 0; t < this.allComments.length; t++) {
            const s = this.allComments[t];
            if (s.replies) {
              const n = s.replies.findIndex((l) => l.id === e);
              if (n !== -1) {
                s.replies.splice(n, 1);
                break;
              }
            }
          }
      },
      reply(e, t) {
        var s;
        if (e && e.reply) {
          const n = this.allComments.findIndex((l) => l.id === e.commentId);
          if (n !== -1) {
            this.allComments[n].replies || (this.allComments[n].replies = []);
            const l = this.allComments[n].replies.length;
            l > 0 &&
            ((s = this.allComments[n].replies[l - 1]) == null
              ? void 0
              : s.id) !== e.reply.id
              ? this.allComments[n].replies.push(e.reply)
              : l === 0 && this.allComments[n].replies.push(e.reply);
          }
        }
      },
      postComment: {
        handler(e, t) {
          if (e && e.id && e != t) {
            const s = this.allComments.findIndex((n) => n.id === e.id);
            s !== -1 && (this.allComments[s] = e);
          }
        },
        deep: !0,
      },
      pusherComment: {
        handler(e, t) {
          if (e && e.id && e != t && this.postEnlarged.id === e.post_id) {
            const s = this.allComments.findIndex((n) => n.id === e.id);
            s !== -1 && (this.allComments[s] = e);
          }
        },
        deep: !0,
      },
      postReply: {
        handler(e, t) {
          e &&
            e.id &&
            this.allComments.forEach((s, n) => {
              if (s.replies) {
                const l = s.replies.findIndex((i) => i.id === e.id);
                l !== -1 && (this.allComments[n].replies[l] = e);
              }
            });
        },
        deep: !0,
      },
      comment: {
        handler(e, t) {
          if (e && e.commentId) {
            if (e.isReply) {
              const s = this.allComments.findIndex((n) =>
                n.replies ? n.replies.some((l) => l.id === e.commentId) : !1
              );
              if (s !== -1 && this.allComments[s].replies) {
                const n = this.allComments[s].replies.findIndex(
                  (l) => l.id === e.commentId
                );
                n !== -1 && (this.allComments[s].replies[n].body = e.body);
              }
            } else {
              const s = this.allComments.findIndex((n) => n.id === e.commentId);
              s !== -1 && (this.allComments[s].body = e.body);
            }
            setTimeout(() => {
              this.$store.commit("ratings/setLoadingComment", !1);
            }, 300);
          }
        },
        deep: !0,
      },
    },
    methods: {
      validate() {
        let e = !0;
        return (
          (this.commentTextError = ""),
          (!this.commentText || this.commentText.trim() === "") &&
            ((this.commentTextError =
              this.translations &&
              this.translations.repost_should_not_be_empty),
            (e = !1)),
          e
        );
      },
      insertTab(e) {
        if (e.key === "Tab") {
          e.preventDefault();
          const t = e.target.selectionStart,
            s = e.target.selectionEnd;
          (this.commentText =
            this.commentText.substring(0, t) +
            "      " +
            this.commentText.substring(s)),
            this.$nextTick(() => {
              e.target.selectionStart = e.target.selectionEnd = t + 6;
            });
        }
      },
      adjustHeight(e) {
        this.$nextTick(() => {
          const t = e.target;
          (t.style.height = "auto"), (t.style.height = `${t.scrollHeight}px`);
        });
      },
      openDialog() {
        this.$refs.repostDialogRef.openDialog();
      },
      processUrls(e) {
        const t = /(https?:\/\/[^<\s]+|www\.[^<\s]+)/g;
        return e == null
          ? void 0
          : e.replace(t, function (s) {
              return `<a @click.self.stop="()=>{}" href="${
                s.startsWith("http") ? s : "http://" + s
              }" target="_blank">${s}</a>`;
            });
      },
      emit() {
        this.$emit("close-enlarged");
      },
      async onLike() {
        if (!this.your_reaction || this.your_reaction === "dislike") {
          (this.likes_count = this.likes_count + 1),
            this.your_reaction === "dislike" &&
              (this.dislikes_count = this.dislikes_count - 1),
            (this.your_reaction = "like");
          try {
            (
              await axios.post(
                `/api/posts/${this.postToEnlarge.id}/like`,
                {},
                H()
              )
            ).data;
          } catch {
            F();
          }
        } else if (this.your_reaction === "like") {
          (this.likes_count = this.likes_count - 1),
            (this.your_reaction = null);
          try {
            (
              await axios.delete(
                `/api/posts/${this.postToEnlarge.id}/like`,
                H()
              )
            ).data;
          } catch {
            F();
          }
        }
      },
      async onDislike() {
        if (!this.your_reaction || this.your_reaction === "like") {
          (this.dislikes_count = this.dislikes_count + 1),
            this.your_reaction === "like" &&
              (this.likes_count = this.likes_count - 1),
            (this.your_reaction = "dislike");
          try {
            (
              await axios.post(
                `/api/posts/${this.postToEnlarge.id}/dislike`,
                {},
                H()
              )
            ).data;
          } catch {
            F();
          }
        } else if (this.your_reaction === "dislike") {
          (this.dislikes_count = this.dislikes_count - 1),
            (this.your_reaction = null);
          try {
            (
              await axios.delete(
                `/api/posts/${this.postToEnlarge.id}/dislike`,
                H()
              )
            ).data;
          } catch {
            F();
          }
        }
      },
      onOpenListofLikedUsersModel() {
        this.$refs.likeDialogRef.openDialog();
      },
      async onLikeModalOpen() {
        this.loadingLiked = !0;
        try {
          const e = await axios.get(
            `/api/posts/${this.postToEnlarge.id}/likes`,
            H()
          );
          e.data && (this.likedUsers = e.data);
        } catch {
          F();
        } finally {
          this.loadingLiked = !1;
        }
      },
      onOpenListofDislikedUsersModel() {
        this.$refs.dislikeDialogRef.openDialog();
      },
      async onDislikeModalOpen() {
        this.loadingUnliked = !0;
        try {
          const e = await axios.get(
            `/api/posts/${this.postToEnlarge.id}/dislikes`,
            H()
          );
          e.data && (this.unLikedUsers = e.data);
        } catch {
          F();
        } finally {
          this.loadingUnliked = !1;
        }
      },
      onOpenRepostAssuranceModel() {
        this.userVersion !== 1
          ? this.$refs.repostDialogRef.openDialog()
          : this.$store.commit("setIsUpgradeToGoldPlatinumDialogOpen", !0);
      },
      async onRepost() {
        if (this.validate()) {
          this.loadingRepost = !0;
          const e = { repost_comment: we(this.commentText) };
          try {
            (
              await axios.post(
                `/api/posts/${this.postToEnlarge.id}/repost`,
                e,
                H()
              )
            ).data &&
              ((this.repost_count = this.repost_count + 1),
              this.$emit("onRepost"),
              de(this.translations && this.translations.repost_successfully));
          } catch (t) {
            F(t.response.data.message, "inherit");
          } finally {
            (this.loadingRepost = !1), this.$refs.repostDialogRef.closeDialog();
          }
        }
      },
      async fetchAllComments() {
        var e, t, s;
        this.loadingComments = !0;
        try {
          const n = await axios.get(
            `/api/posts/${this.postToEnlarge.id}/comments?per_page=10`,
            H()
          );
          n.data &&
            ((this.allComments = (e = n.data) == null ? void 0 : e.comments),
            (this.pagination = (t = n.data) == null ? void 0 : t.pagination),
            (this.total_number_of_comments_with_replies =
              (s = n.data) == null
                ? void 0
                : s.total_number_of_comments_with_replies));
        } catch {
          F();
        } finally {
          this.loadingComments = !1;
        }
      },
      onOpenCommentsModal() {
        this.$refs.commentDialogRef.openDialog();
      },
      onAddingComment(e) {
        (this.added = !0),
          this.allComments.unshift(e),
          (this.total_number_of_comments_with_replies =
            this.total_number_of_comments_with_replies + 1),
          this.pagination.current_page !== this.pagination.last_page &&
            (this.addedNumber = this.addedNumber + 1),
          this.$emit("onAddingEnlargeComment", e);
      },
    },
  },
  Ue = (e) => (ze("data-v-391118a4"), (e = e()), qe(), e),
  Sr = { key: 0 },
  Er = { key: 1, class: "flex flex-col gap-2" },
  Pr = { key: 2 },
  Or = {
    class:
      "p-2 text-xl text-grey-600 font-bold h-72 flex items-center justify-center",
  },
  Rr = { key: 0 },
  $r = { key: 1, class: "flex flex-col gap-2" },
  Dr = { key: 2 },
  Ar = {
    class:
      "p-2 text-xl text-grey-600 font-bold h-72 flex items-center justify-center",
  },
  jr = { class: "mb-4" },
  Ur = { class: "section_text-lg font-bold section_text-gray-800 mt-3 mb-2" },
  Hr = { class: "text-md font-bold text-gray-600 mt-3 mb-2" },
  Fr = ["placeholder"],
  Lr = {
    class:
      "flex justify-between rounded-b-none max-md:rounded-none rounded-lg items-center",
  },
  Mr = { class: "bg-slate-200 px-2 p-0 border-b-2 border-b-gray-400 w-full" },
  Br = { class: "flex flex-row items-center justify-between w-full pt-1 pb-1" },
  Nr = { class: "flex items-center justify-start gap-2" },
  Wr = { class: "text-lg font-bold" },
  Vr = { class: "text-lg font-bold tracking-wide text-center" },
  zr = {
    class:
      "flex-1 flex flex-col overflow-y-auto px-2 sm:px-4 overflow-x-hidden padding-none",
  },
  qr = { class: "flex flex-row justify-between items-center w-full mb-1 mt-3" },
  Gr = { class: "flex flex-row gap-2 justify-start items-center" },
  Kr = { class: "block" },
  Xr = { class: "flex flex-col justify-center ml-1" },
  Jr = {
    class: "font-bold text-lg sm:text-xl",
    style: { "line-height": "1.5rem" },
  },
  Yr = { class: "" },
  Zr = { class: "" },
  Qr = { class: "font-light text-sm overflow-hidden" },
  ed = {
    class: "flex flex-row justify-end items-center self-start flex-none w-28",
  },
  td = { class: "flex flex-row flex-none justify-end items-center" },
  sd = { class: "flex flex-col justify-center items-center" },
  od = { class: "" },
  ld = { class: "font-light text-xs overflow-hidden tracking-tighter" },
  id = {
    key: 0,
    class: "self-start flex gap-2 sm:mt-[-4px] md:mt-[-6px] ml-[3px]",
  },
  nd = { key: 0, class: "text-sm flex gap-1 items-center" },
  ad = Ue(() =>
    o(
      "img",
      { src: "/images/icons/share_icon.png", width: "15", height: "15" },
      null,
      -1
    )
  ),
  rd = { class: "" },
  dd = { class: "font-bold cursor-pointer" },
  ud = { key: 1, class: "self-start", style: { "white-space": "pre-wrap" } },
  cd = ["innerHTML"],
  md = ["innerHTML"],
  fd = { class: "flex flex-row justify-center items-center w-full mb-1 mt-1" },
  gd = { key: 0, class: "w-full" },
  pd = ["innerHTML"],
  hd = { class: "pb-2 flex justify-between w-full" },
  vd = { class: "flex gap-2" },
  _d = { class: "font-medium text-blue-800 cursor-pointer" },
  yd = {
    class:
      "text-[13px] sx:text-[15px] sm:text-[17px] flex items-center justify-center self-center",
  },
  xd = { class: "font-medium text-blue-800 cursor-pointer" },
  bd = {
    class:
      "text-[13px] sx:text-[15px] sm:text-[17px] flex items-center justify-center",
  },
  kd = {
    class:
      "text-gray-900 text-[11px] x350:text-[13px] sx:text-[15px] sm:text-[17px] flex items-center self-center gap-[2px]",
  },
  wd = {
    class:
      "text-[11px] x350:text-[13px] sx:text-[15px] flex items-center justify-center sm:text-[17px] leading-3",
  },
  Cd = Ue(() =>
    o(
      "div",
      { class: C("mb-2 border-[1px] w-full border-gray-300 rounded") },
      null,
      -1
    )
  ),
  Id = {
    class:
      "flex flex-row max-sm:gap-1 justify-between items-center w-full mb-2",
  },
  Td = {
    class:
      "font-medium text-[10px] x350:text-xs sm:text-sm text-blue-800 cursor-pointer",
  },
  Sd = { class: "flex flex-row justify-between items-center" },
  Ed = { class: "hovered" },
  Pd = { class: "pl-1 icon-text text-[#16a34a]" },
  Od = {
    class:
      "font-medium text-[10px] x350:text-xs sm:text-sm text-blue-800 cursor-pointer",
  },
  Rd = { class: "flex flex-row justify-between items-center" },
  $d = { class: "" },
  Dd = { class: "pl-1 icon-text text-[#c40516]" },
  Ad = {
    class: "font-medium text-[10px] x350:text-xs sm:text-sm text-blue-800",
  },
  jd = { class: "flex flex-row justify-between items-center" },
  Ud = Ue(() =>
    o(
      "div",
      { class: "" },
      [
        o("img", {
          src: "/images/icons/comment_icon.png",
          class:
            "w-[17px] x350:w-[20px] sm:w-[25px] h-[17px] x350:h-[20px] sm:h-[25px]",
        }),
      ],
      -1
    )
  ),
  Hd = { class: "pl-1 icon-text" },
  Fd = {
    class: "font-medium text-[10px] x350:text-xs sm:text-sm text-blue-800",
  },
  Ld = { class: "flex flex-row justify-between items-center" },
  Md = Ue(() =>
    o(
      "div",
      { class: "" },
      [
        o("img", {
          src: "/images/icons/share_icon.png",
          class:
            "w-[17px] x350:w-[20px] sm:w-[25px] h-[17px] x350:h-[20px] sm:h-[25px]",
        }),
      ],
      -1
    )
  ),
  Bd = { class: "pl-1 icon-text" },
  Nd = Ue(() =>
    o(
      "div",
      { class: C("mb-2 border-[1px] w-full border-gray-300 rounded") },
      null,
      -1
    )
  );
function Wd(e, t, s, n, l, i) {
  const m = S("DialogContractorRating"),
    f = S("v-skeleton-loader"),
    w = S("LikedUser"),
    p = S("CustomDialog"),
    k = S("InputError"),
    u = S("Icon"),
    b = S("cConnectWord"),
    _ = S("Avatar"),
    x = S("StarRounded"),
    h = S("Link"),
    R = S("PostShowTheImage"),
    y = S("AllComments"),
    $ = S("WriteCommentFooter");
  return (
    a(),
    d(
      M,
      null,
      [
        r(
          m,
          {
            ref: "repostDialogRef",
            userId: s.profile.id,
            contractorId: l.postToEnlarge.id,
          },
          null,
          8,
          ["userId", "contractorId"]
        ),
        r(
          p,
          {
            ref: "likeDialogRef",
            dialogWidth: "w-full h-full sm:h-5/6",
            onOpened: i.onLikeModalOpen,
            showFooter: !1,
            title: e.translations && e.translations.people_who_liked_the_post,
          },
          {
            default: E(() => [
              l.loadingLiked
                ? (a(),
                  d("div", Sr, [
                    (a(),
                    d(
                      M,
                      null,
                      G(5, (c) => r(f, { key: c, type: "list-item-avatar" })),
                      64
                    )),
                  ]))
                : !l.loadingLiked && l.likedUsers && l.likedUsers.length > 0
                ? (a(),
                  d("div", Er, [
                    (a(!0),
                    d(
                      M,
                      null,
                      G(
                        l.likedUsers,
                        (c, D) => (
                          a(),
                          L(w, { liked: "", key: D, user: c }, null, 8, [
                            "user",
                          ])
                        )
                      ),
                      128
                    )),
                  ]))
                : (a(),
                  d("div", Pr, [
                    o(
                      "div",
                      Or,
                      g(e.translations && e.translations.no_contractor_found),
                      1
                    ),
                  ])),
            ]),
            _: 1,
          },
          8,
          ["onOpened", "title"]
        ),
        r(
          p,
          {
            ref: "dislikeDialogRef",
            dialogWidth: "w-full h-full sm:h-5/6",
            onOpened: i.onDislikeModalOpen,
            showFooter: !1,
            title:
              e.translations && e.translations.people_who_disliked_the_post,
          },
          {
            default: E(() => [
              l.loadingUnliked
                ? (a(),
                  d("div", Rr, [
                    (a(),
                    d(
                      M,
                      null,
                      G(3, (c) => r(f, { key: c, type: "list-item-avatar" })),
                      64
                    )),
                  ]))
                : !l.loadingUnliked &&
                  l.unLikedUsers &&
                  l.unLikedUsers.length > 0
                ? (a(),
                  d("div", $r, [
                    (a(!0),
                    d(
                      M,
                      null,
                      G(
                        l.unLikedUsers,
                        (c, D) => (
                          a(), L(w, { key: D, user: c }, null, 8, ["user"])
                        )
                      ),
                      128
                    )),
                  ]))
                : (a(),
                  d("div", Dr, [
                    o(
                      "div",
                      Ar,
                      g(e.translations && e.translations.no_contractor_found),
                      1
                    ),
                  ])),
            ]),
            _: 1,
          },
          8,
          ["onOpened", "title"]
        ),
        r(
          p,
          {
            ref: "repostDialogRef",
            onSubmit: i.onRepost,
            loading: l.loadingRepost,
            disabled: l.loadingRepost,
            shouldFetchPost: !1,
            submitText: e.translations && e.translations.repost_now,
            title:
              e.translations && e.translations.do_you_wish_to_share_this_post,
          },
          {
            default: E(() => [
              o("div", jr, [
                o(
                  "div",
                  Ur,
                  g(
                    e.translations &&
                      e.translations.reposting_allows_you_to_share
                  ),
                  1
                ),
                o(
                  "div",
                  Hr,
                  g(e.translations && e.translations.comment_text),
                  1
                ),
                X(
                  o(
                    "textarea",
                    {
                      id: "responseText",
                      type: "text",
                      rows: 5,
                      class:
                        "mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm overflow-hidden",
                      required: "",
                      "onUpdate:modelValue":
                        t[0] || (t[0] = (c) => (l.commentText = c)),
                      ref: "textRef",
                      onKeydown:
                        t[1] ||
                        (t[1] = (...c) => i.insertTab && i.insertTab(...c)),
                      onInput:
                        t[2] ||
                        (t[2] = (...c) =>
                          i.adjustHeight && i.adjustHeight(...c)),
                      onPaste:
                        t[3] ||
                        (t[3] = (...c) =>
                          i.adjustHeight && i.adjustHeight(...c)),
                      placeholder:
                        e.translations &&
                        e.translations.say_something_about_the_post,
                    },
                    null,
                    40,
                    Fr
                  ),
                  [[se, l.commentText]]
                ),
                l.commentTextError
                  ? (a(),
                    L(
                      k,
                      { key: 0, class: "mt-2", message: l.commentTextError },
                      null,
                      8,
                      ["message"]
                    ))
                  : I("", !0),
              ]),
            ]),
            _: 1,
          },
          8,
          ["onSubmit", "loading", "disabled", "submitText", "title"]
        ),
        o(
          "div",
          {
            class:
              "fixed m-0 inset-0 flex items-center justify-center z-20 bg-slate-200 bg-opacity-80",
            style: { "--tw-space-x-reverse": "inherit" },
            type: "button",
            onClick: t[16] || (t[16] = (c) => e.$emit("close-enlarged")),
          },
          [
            o(
              "div",
              {
                class:
                  "bg-white md:max-w-4xl w-full h-full sm:h-[93%] rounded-xl max-sm:rounded-none shadow-xl flex flex-col z-10",
                type: "button",
                onClick: t[15] || (t[15] = Re(() => {}, ["stop"])),
              },
              [
                o("div", Lr, [
                  o("div", Mr, [
                    o(
                      "button",
                      {
                        class: "w-full",
                        onClick:
                          t[4] || (t[4] = (c) => e.$emit("close-enlarged")),
                      },
                      [
                        o("div", Br, [
                          o("div", Nr, [
                            r(u, {
                              icon: "ph:arrow-fat-left-duotone",
                              color: "#232069",
                              height: "35",
                            }),
                            o(
                              "span",
                              Wr,
                              g(e.translations && e.translations.news_feed) +
                                "...",
                              1
                            ),
                          ]),
                          o("div", Vr, [r(b)]),
                        ]),
                      ]
                    ),
                  ]),
                ]),
                o("div", zr, [
                  o("div", qr, [
                    o("div", Gr, [
                      o(
                        "div",
                        {
                          onClick:
                            t[5] ||
                            (t[5] = (...c) =>
                              i.openDialog && i.openDialog(...c)),
                          class:
                            "cursor-pointer flex justify-start items-start flex-none w=16",
                        },
                        [
                          o("div", Kr, [
                            r(
                              _,
                              {
                                style: q({
                                  width:
                                    e.screenWidth >= 640 ? "4.5rem" : "3.7rem",
                                  height:
                                    e.screenWidth >= 640 ? "4.5rem" : "3.7rem",
                                }),
                                imageSrc: l.postToEnlarge.user_avatar,
                              },
                              null,
                              8,
                              ["style", "imageSrc"]
                            ),
                          ]),
                        ]
                      ),
                      o("div", Xr, [
                        o(
                          "h2",
                          Jr,
                          g(l.postToEnlarge.id) +
                            ": " +
                            g(
                              l.postToEnlarge.first_name +
                                " " +
                                l.postToEnlarge.last_name
                            ),
                          1
                        ),
                        o("div", Yr, g(l.postToEnlarge.company_name), 1),
                        o("div", Zr, [
                          o(
                            "h2",
                            Qr,
                            g(l.postToEnlarge.city) +
                              " " +
                              g(l.postToEnlarge.state),
                            1
                          ),
                        ]),
                      ]),
                    ]),
                    o("div", ed, [
                      o("div", td, [
                        o("div", sd, [
                          r(
                            x,
                            {
                              onClick: i.openDialog,
                              starWidth: 15,
                              class: "h-4 cursor-pointer",
                              indicatorClasses: "text-small h-4",
                              starHeight: 15,
                              rating: Number(
                                parseFloat(
                                  l.postToEnlarge.average_rating
                                    ? l.postToEnlarge.average_rating
                                    : 0
                                ).toFixed(1)
                              ),
                              isIndicatorActive: !1,
                            },
                            null,
                            8,
                            ["onClick", "rating"]
                          ),
                          o("div", od, [
                            o("h2", ld, g(l.postToEnlarge.total_reviews), 1),
                          ]),
                        ]),
                      ]),
                    ]),
                  ]),
                  l.postToEnlarge.original_user_first_name &&
                  l.postToEnlarge.original_user_last_name
                    ? (a(),
                      d("div", id, [
                        o(
                          "div",
                          {
                            style: q({
                              width: e.screenWidth >= 640 ? "4.5rem" : "3.7rem",
                            }),
                          },
                          null,
                          4
                        ),
                        r(
                          h,
                          {
                            class: "self-start",
                            href: `/contractor/${l.postToEnlarge.original_user_id}`,
                          },
                          {
                            default: E(() => [
                              l.postToEnlarge.original_user_first_name &&
                              l.postToEnlarge.original_user_last_name
                                ? (a(),
                                  d("div", nd, [
                                    ad,
                                    o(
                                      "div",
                                      rd,
                                      g(
                                        e.translations &&
                                          e.translations.reposted_from
                                      ),
                                      1
                                    ),
                                    r(u, {
                                      class: "translate-y-[-1px]",
                                      icon: "ion:caret-forward",
                                      width: "15",
                                    }),
                                    o(
                                      "div",
                                      dd,
                                      g(
                                        l.postToEnlarge
                                          .original_user_first_name +
                                          " " +
                                          l.postToEnlarge
                                            .original_user_last_name
                                      ),
                                      1
                                    ),
                                  ]))
                                : I("", !0),
                            ]),
                            _: 1,
                          },
                          8,
                          ["href"]
                        ),
                      ]))
                    : I("", !0),
                  l.postToEnlarge.repost_comment
                    ? (a(), d("div", ud, g(l.postToEnlarge.repost_comment), 1))
                    : I("", !0),
                  o(
                    "div",
                    {
                      class: C([
                        `${l.title_text_alignment} ${
                          l.titleCustomBgColor.startsWith("#")
                            ? " flex-col w-full items-center  px-2 py-2 rounded-md shadow-lg border-2"
                            : "w-full"
                        } `,
                        "font-bold text-xl sm:text-2xl md:tex-3xl mb-1 mt-1",
                      ]),
                      style: q({ backgroundColor: l.titleCustomBgColor }),
                    },
                    [
                      X(
                        o(
                          "span",
                          {
                            innerHTML: l.postToEnlarge.title,
                            style: q([
                              { "white-space": "pre-wrap" },
                              i.titleTextStyle,
                            ]),
                            class: C(
                              `${i.titleClass} w-full processed-body inline`
                            ),
                            ref: "titleElement",
                          },
                          null,
                          14,
                          cd
                        ),
                        [[me, l.postToEnlarge.title]]
                      ),
                    ],
                    6
                  ),
                  o(
                    "div",
                    {
                      class: C([
                        `${l.text_alignment} ${
                          l.customBgColor.startsWith("#")
                            ? " flex-col w-full items-center  px-2 py-[87px] rounded-md shadow-lg border-2"
                            : "w-full"
                        } `,
                        "",
                      ]),
                      style: q({ backgroundColor: l.customBgColor }),
                    },
                    [
                      X(
                        o(
                          "span",
                          {
                            innerHTML: i.displayedBody1,
                            style: q([
                              { "white-space": "pre-wrap" },
                              i.textStyle,
                            ]),
                            class: C(
                              `${i.body1Class} w-full processed-body inline`
                            ),
                            ref: "textElement",
                          },
                          null,
                          14,
                          md
                        ),
                        [[me, l.postToEnlarge.body1]]
                      ),
                    ],
                    6
                  ),
                  o("div", fd, [
                    i.imageArray.length > 0
                      ? (a(),
                        d("div", gd, [
                          (a(!0),
                          d(
                            M,
                            null,
                            G(
                              i.imageArray,
                              (c) => (
                                a(),
                                d("div", { key: c.id, class: "pb-2" }, [
                                  r(
                                    R,
                                    {
                                      image: c,
                                      numberOfImages: 1,
                                      cropImage: !1,
                                      plusImages: !1,
                                    },
                                    null,
                                    8,
                                    ["image"]
                                  ),
                                ])
                              )
                            ),
                            128
                          )),
                        ]))
                      : I("", !0),
                  ]),
                  o("div", { class: C(["'w-full'", ""]) }, [
                    X(
                      o(
                        "span",
                        {
                          innerHTML: i.displayedBody2,
                          style: q([
                            { "white-space": "pre-wrap" },
                            i.textStyleBody2,
                          ]),
                          class: C("w-full processed-body inline"),
                          ref: "textElementBody2",
                        },
                        null,
                        12,
                        pd
                      ),
                      [[me, l.postToEnlarge.body2]]
                    ),
                  ]),
                  o(
                    "div",
                    {
                      class: C(
                        `mb-2 ${
                          l.postToEnlarge.body2 ? "mt-3" : ""
                        } border-[1px] w-1/3 border-gray-800 rounded self-center`
                      ),
                    },
                    null,
                    2
                  ),
                  o("div", hd, [
                    o("div", vd, [
                      o(
                        "div",
                        {
                          class:
                            "flex gap-1 justify-center items-center cursor-pointer",
                          onClick:
                            t[6] ||
                            (t[6] = (...c) =>
                              i.onOpenListofLikedUsersModel &&
                              i.onOpenListofLikedUsersModel(...c)),
                        },
                        [
                          o("div", _d, [
                            r(u, {
                              icon: "emojione-monotone:up-arrow",
                              class: C(
                                "text-[17px] xs:text-[25px]  text-[#16a34a]"
                              ),
                            }),
                          ]),
                          o("div", yd, g(l.likes_count), 1),
                        ]
                      ),
                      o(
                        "div",
                        {
                          class:
                            "flex gap-1 justify-center items-center cursor-pointer",
                          onClick:
                            t[7] ||
                            (t[7] = (...c) =>
                              i.onOpenListofDislikedUsersModel &&
                              i.onOpenListofDislikedUsersModel(...c)),
                        },
                        [
                          o("div", xd, [
                            r(u, {
                              icon: "emojione-monotone:up-arrow",
                              class: C(
                                "text-[17px] xs:text-[25px] text-[#c40516]"
                              ),
                              rotate: 2,
                            }),
                          ]),
                          o("div", bd, g(l.dislikes_count), 1),
                        ]
                      ),
                    ]),
                    o("div", kd, [
                      o(
                        "span",
                        {
                          class: "cursor-pointer hover:underline leading-3",
                          onClick:
                            t[8] ||
                            (t[8] = (c) => e.$emit("enlarge-post", e.post)),
                        },
                        g(l.total_number_of_comments_with_replies) +
                          " " +
                          g(e.translations && e.translations.comments),
                        1
                      ),
                      r(u, { icon: "octicon:dot-fill-16", width: "11" }),
                      o(
                        "span",
                        wd,
                        g(l.repost_count) +
                          " " +
                          g(e.translations && e.translations.reposts),
                        1
                      ),
                    ]),
                  ]),
                  Cd,
                  o("div", Id, [
                    o(
                      "div",
                      {
                        class: "hovered",
                        onClick:
                          t[9] || (t[9] = (...c) => i.onLike && i.onLike(...c)),
                      },
                      [
                        o("div", Td, [
                          o("div", Sd, [
                            o("div", Ed, [
                              r(
                                u,
                                {
                                  icon: "emojione-monotone:up-arrow",
                                  class: C([
                                    "text-[17px] x350:text-[20px] sm:text-[25px] icon-like text-transparent stroke-[2px] stroke-green-600",
                                    `${
                                      l.your_reaction === "like" ? "liked" : ""
                                    }`,
                                  ]),
                                },
                                null,
                                8,
                                ["class"]
                              ),
                            ]),
                            o(
                              "div",
                              Pd,
                              g(e.translations && e.translations.like),
                              1
                            ),
                          ]),
                        ]),
                      ]
                    ),
                    o(
                      "div",
                      {
                        class: "hovered",
                        onClick:
                          t[10] ||
                          (t[10] = (...c) => i.onDislike && i.onDislike(...c)),
                      },
                      [
                        o("a", Od, [
                          o("div", Rd, [
                            o("div", $d, [
                              r(
                                u,
                                {
                                  icon: "emojione-monotone:up-arrow",
                                  rotate: 2,
                                  class: C([
                                    `${
                                      l.your_reaction === "dislike"
                                        ? "disliked"
                                        : ""
                                    }`,
                                    "text-[17px] x350:text-[20px] sm:text-[25px] icon-dislike text-transparent stroke-[2px] stroke-[#c40516]",
                                  ]),
                                },
                                null,
                                8,
                                ["class"]
                              ),
                            ]),
                            o(
                              "div",
                              Dd,
                              g(e.translations && e.translations.dislike),
                              1
                            ),
                          ]),
                        ]),
                      ]
                    ),
                    o(
                      "div",
                      {
                        class: "hovered cursor-pointer",
                        onClick:
                          t[11] ||
                          (t[11] = (c) => e.$emit("enlarge-post", e.post)),
                      },
                      [
                        o("div", Ad, [
                          o("div", jd, [
                            Ud,
                            o(
                              "div",
                              Hd,
                              g(e.translations && e.translations.comment),
                              1
                            ),
                          ]),
                        ]),
                      ]
                    ),
                    o(
                      "div",
                      {
                        class: "hovered cursor-pointer",
                        onClick:
                          t[12] ||
                          (t[12] = (...c) =>
                            i.onOpenRepostAssuranceModel &&
                            i.onOpenRepostAssuranceModel(...c)),
                      },
                      [
                        o("div", Fd, [
                          o("div", Ld, [
                            Md,
                            o(
                              "div",
                              Bd,
                              g(e.translations && e.translations.repost),
                              1
                            ),
                          ]),
                        ]),
                      ]
                    ),
                  ]),
                  Nd,
                  r(
                    y,
                    {
                      modelValue: l.allComments,
                      "onUpdate:modelValue":
                        t[13] || (t[13] = (c) => (l.allComments = c)),
                      loadingComments: l.loadingComments,
                      addedNumber: l.addedNumber,
                      "onUpdate:addedNumber":
                        t[14] || (t[14] = (c) => (l.addedNumber = c)),
                      postId: l.postToEnlarge.id,
                      pagination: l.pagination,
                      added: l.added,
                    },
                    null,
                    8,
                    [
                      "modelValue",
                      "loadingComments",
                      "addedNumber",
                      "postId",
                      "pagination",
                      "added",
                    ]
                  ),
                ]),
                r(
                  $,
                  {
                    onUnshiftIntoComments: i.onAddingComment,
                    postId: l.postToEnlarge.id,
                  },
                  null,
                  8,
                  ["onUnshiftIntoComments", "postId"]
                ),
              ]
            ),
          ]
        ),
      ],
      64
    )
  );
}
const au = ce(Tr, [
  ["render", Wd],
  ["__scopeId", "data-v-391118a4"],
]);
export { au as P, bt as S, Pt as _, iu as a, nu as b };
