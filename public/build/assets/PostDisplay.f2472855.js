import {
  a0 as V,
  L as q,
  r as _,
  x as O,
  f as u,
  h as c,
  n as t,
  i as r,
  l as v,
  z as j,
  $ as z,
  w as re,
  B as b,
  m as x,
  a1 as A,
  I as ie,
  J as ae,
} from "./app.9755ce2a.js";
import { t as X } from "./tContractorWord.dc451942.js";
import { B as J, _ as Y } from "./PostForm.1a0d1801.js";
import { _ as oe } from "./AuthenticatedLayout.51c67e8d.js";
import { _ as N } from "./_plugin-vue_export-helper.cdc0426e.js";
const En = {
    props: { showSpinText: Boolean },
    template: `
        <div class="flex justify-around mt-4 mt-2 max-w-2xl">
            <div class="loader"></div>
            <div v-if="showSpinText">
                <slot />
            </div>
        </div>
    `,
  },
  le = {
    components: {
      AuthenticatedLayout: oe,
      InertiaLink: V,
      tContractorWord: X,
      ButtonPost: J,
      ButtonRefresh: Y,
      Link: q,
      ref: _,
    },
    props: {
      showingPostingActionMenu: Boolean,
      postID: Number,
      postUserId: Number,
      currentUserId: Number,
    },
    data() {
      return {};
    },
  },
  me = { id: "", class: "z-50 fixed top-4 right-2 left-4" },
  ge = { class: "" },
  ue = ["id"],
  ce = { key: 0 },
  de = z(
    '<button class="flex items-center px-4 py-1 text-gray-600 transition-colors duration-300 transform rounded-lg  hover:bg-gray-300   hover:text-gray-700"><img src="/images/icons/edit.png" width="20" height="20"><span class="mx-4 font-medium">Edit Post</span></button><button class="flex items-center px-4 py-1 text-gray-600 transition-colors duration-300 transform rounded-lg  hover:bg-gray-300   hover:text-gray-700"><img src="/images/icons/delete.png" width="20" height="20"><span class="mx-4 font-medium">DELETE Post</span></button>',
    2
  ),
  fe = [de],
  he = { key: 1 },
  be = t(
    "img",
    { src: "/images/icons/Icon-report.png", width: "20", height: "20" },
    null,
    -1
  ),
  xe = t("span", { class: "mx-4 font-medium" }, "Report Post", -1),
  ve = t(
    "img",
    { src: "/images/icons/Icon-blocked-red.png", width: "20", height: "20" },
    null,
    -1
  ),
  ye = t("span", { class: "mx-4 font-medium" }, "Block This Contact", -1),
  Ie = t(
    "img",
    { src: "/images/icons/Icon-person-blue.png", width: "20", height: "20" },
    null,
    -1
  ),
  we = t("span", { class: "mx-4 font-medium" }, "Follow Contact", -1),
  pe = t(
    "img",
    { src: "/images/icons/Icon-unfollow.png", width: "20", height: "20" },
    null,
    -1
  ),
  _e = t("span", { class: "mx-4 font-medium" }, "Un-Follow Contact", -1);
function ke(e, s, n, d, i, f) {
  const m = O("Link");
  return (
    u(),
    c("div", me, [
      t(
        "div",
        {
          class: j([
            {
              block: n.showingPostingActionMenu,
              hidden: !n.showingPostingActionMenu,
            },
            "absolute flex top-8 right-0 sm:right-0 px-3 text-left border-b border-gray-400 rounded-xl bg-gray-100 ",
          ]),
        },
        [
          t("div", ge, [
            t(
              "div",
              {
                id: "postID" + n.postID,
                class: "PostActionMenu pt-1 pb-3 space-y-2",
              },
              [
                n.currentUserId == n.postUserId
                  ? (u(), c("div", ce, fe))
                  : (u(),
                    c("div", he, [
                      r(
                        m,
                        {
                          href: e.route("post"),
                          class:
                            "flex items-center px-4 py-1 text-gray-600 transition-colors duration-300 transform rounded-lg  hover:bg-gray-300   hover:text-gray-700",
                        },
                        { default: v(() => [be, xe]), _: 1 },
                        8,
                        ["href"]
                      ),
                      r(
                        m,
                        {
                          href: e.route("post"),
                          class:
                            "flex items-center px-4 py-1 text-gray-600 transition-colors duration-300 transform rounded-lg  hover:bg-gray-300   hover:text-gray-700",
                        },
                        { default: v(() => [ve, ye]), _: 1 },
                        8,
                        ["href"]
                      ),
                      r(
                        m,
                        {
                          href: e.route("post"),
                          class:
                            "flex items-center px-4 py-1 text-gray-600 transition-colors duration-300 transform rounded-lg  hover:bg-gray-300   hover:text-gray-700",
                        },
                        { default: v(() => [Ie, we]), _: 1 },
                        8,
                        ["href"]
                      ),
                      r(
                        m,
                        {
                          href: e.route("post"),
                          class:
                            "flex items-center px-4 py-1 text-gray-600 transition-colors duration-300 transform rounded-lg  hover:bg-gray-300   hover:text-gray-700",
                        },
                        { default: v(() => [pe, _e]), _: 1 },
                        8,
                        ["href"]
                      ),
                    ])),
              ],
              8,
              ue
            ),
          ]),
        ],
        2
      ),
    ])
  );
}
const Ae = N(le, [["render", ke]]),
  Oe = "/uploads/posts/";
const je = {
    key: 0,
    class: "w-full h-full rounded-lg",
    controls: "",
    autoplay: "",
    loop: "",
    muted: "",
  },
  Pe = ["src"],
  $e = { key: 1 },
  Te = ["src"],
  Me = ["src"],
  Se = {
    key: 2,
    class:
      "fixed w-full h-full grid place-items-center blue-400 text-red-600 font-extrabold text-7xl",
  },
  Ne = {
    __name: "PostShowTheImage",
    props: {
      image: String,
      numberOfImages: Number,
      plusImages: Boolean,
      cropImage: Boolean,
    },
    setup(e) {
      const s = e,
        n = _(!1),
        d = _({});
      function i(a) {
        return Oe + a;
      }
      function f(a) {
        let o = a.split(".").pop();
        return (
          (o == "mp4") | (o == "mov") ? (n.value = !0) : (n.value = !1), n.value
        );
      }
      const m = async (a) => {
        if (!a) return {};
        const o = new Image();
        return (
          (o.src = i(a)),
          await new Promise((h) => (o.onload = h)),
          {
            nHeight: o.naturalHeight,
            nWidth: o.naturalWidth,
            nAspect: o.naturalWidth / o.naturalHeight,
            nPortrait: !(o.naturalWidth > o.naturalHeight),
          }
        );
      };
      return (
        re(
          () => s.image,
          async () => (d.value = await m(s.image)),
          { immediate: !0 }
        ),
        (a, o) => (
          u(),
          c("div", null, [
            t("span", null, "Height: " + b(d.value.nHeight), 1),
            f(s.image)
              ? (u(),
                c("video", je, [
                  t(
                    "source",
                    { src: i(s.image), type: "video/mp4" },
                    null,
                    8,
                    Pe
                  ),
                ]))
              : (u(),
                c("div", $e, [
                  e.cropImage
                    ? (u(),
                      c(
                        "img",
                        {
                          key: 0,
                          class: "h-full w-full rounded-lg",
                          src: i(s.image),
                          alt: "",
                        },
                        null,
                        8,
                        Te
                      ))
                    : (u(),
                      c(
                        "img",
                        {
                          key: 1,
                          class:
                            "w-full h-full object-fill object-center rounded-lg",
                          src: i(s.image),
                          alt: "",
                        },
                        null,
                        8,
                        Me
                      )),
                  e.plusImages ? (u(), c("div", Se, " +000000 ")) : x("", !0),
                ])),
          ])
        )
      );
    },
  },
  l = N(Ne, [["__scopeId", "data-v-6d3f9ba5"]]),
  Ce = { class: "w-full" },
  Ee = { key: 0, class: "flex flex-col flex-nowrap w-full gap-1 pb-1" },
  Be = { key: 1, class: "flex flex-col flex-nowrap w-full gap-1 pb-1" },
  Le = { key: 2 },
  De = { class: "flex flex-col flex-nowrap w-full gap-1 pb-1" },
  He = { class: "grid grid-rows-1 grid-cols-2 w-full h-full gap-1 pb-1" },
  Ue = { key: 3 },
  We = { class: "flex flex-col flex-nowrap w-full gap-1 pb-1" },
  Re = { class: "grid grid-rows-1 grid-cols-2 w-full h-full gap-1 pb-1" },
  Ge = { key: 4 },
  Fe = { class: "flex flex-col flex-nowrap w-full gap-1 pb-1" },
  Ve = { class: "grid grid-rows-1 grid-cols-3 w-full h-full gap-1 pb-1" },
  qe = { key: 5 },
  ze = { class: "flex flex-col flex-nowrap w-full gap-1 pb-1" },
  Xe = { class: "grid grid-rows-1 grid-cols-3 w-full h-full gap-1 pb-1" },
  Je = {
    __name: "PostImageDisplay",
    props: { imageArray: Array, numberOfImages: { type: Number, default: 0 } },
    setup(e) {
      return (s, n) => (
        u(),
        c("div", Ce, [
          t("p", null, "numberOfImages: " + b(e.numberOfImages), 1),
          e.numberOfImages == 1
            ? (u(),
              c("div", Ee, [
                r(
                  l,
                  {
                    image: e.imageArray[0],
                    numberImages: e.numberOfImages,
                    cropImage: !0,
                    plusImages: !1,
                  },
                  null,
                  8,
                  ["image", "numberImages"]
                ),
              ]))
            : x("", !0),
          e.numberOfImages == 2
            ? (u(),
              c("div", Be, [
                r(
                  l,
                  {
                    image: e.imageArray[0],
                    numberImages: e.numberOfImages,
                    cropImage: !0,
                    plusImages: !1,
                  },
                  null,
                  8,
                  ["image", "numberImages"]
                ),
                r(
                  l,
                  {
                    image: e.imageArray[1],
                    numberImages: e.numberOfImages,
                    cropImage: !0,
                    plusImages: !1,
                  },
                  null,
                  8,
                  ["image", "numberImages"]
                ),
              ]))
            : x("", !0),
          e.numberOfImages == 3
            ? (u(),
              c("div", Le, [
                t("div", De, [
                  r(
                    l,
                    {
                      image: e.imageArray[0],
                      numberImages: e.numberOfImages,
                      cropImage: !0,
                      plusImages: !1,
                    },
                    null,
                    8,
                    ["image", "numberImages"]
                  ),
                ]),
                t("div", He, [
                  r(
                    l,
                    {
                      image: e.imageArray[1],
                      numberImages: e.numberOfImages,
                      cropImage: !0,
                      plusImages: !1,
                    },
                    null,
                    8,
                    ["image", "numberImages"]
                  ),
                  r(
                    l,
                    {
                      image: e.imageArray[2],
                      numberImages: e.numberOfImages,
                      cropImage: !0,
                      plusImages: !1,
                    },
                    null,
                    8,
                    ["image", "numberImages"]
                  ),
                ]),
              ]))
            : x("", !0),
          e.numberOfImages == 4
            ? (u(),
              c("div", Ue, [
                t("div", We, [
                  t("div", null, [
                    r(
                      l,
                      {
                        image: e.imageArray[0],
                        numberImages: e.numberOfImages,
                        cropImage: !0,
                        plusImages: !1,
                      },
                      null,
                      8,
                      ["image", "numberImages"]
                    ),
                  ]),
                  t("div", null, [
                    r(
                      l,
                      {
                        image: e.imageArray[1],
                        numberImages: e.numberOfImages,
                        cropImage: !0,
                        plusImages: !1,
                      },
                      null,
                      8,
                      ["image", "numberImages"]
                    ),
                  ]),
                ]),
                t("div", Re, [
                  t("div", null, [
                    r(
                      l,
                      {
                        image: e.imageArray[2],
                        numberImages: e.numberOfImages,
                        cropImage: !0,
                        plusImages: !1,
                      },
                      null,
                      8,
                      ["image", "numberImages"]
                    ),
                  ]),
                  t("div", null, [
                    r(
                      l,
                      {
                        image: e.imageArray[3],
                        numberImages: e.numberOfImages,
                        cropImage: !0,
                        plusImages: !1,
                      },
                      null,
                      8,
                      ["image", "numberImages"]
                    ),
                  ]),
                ]),
              ]))
            : x("", !0),
          e.numberOfImages == 5
            ? (u(),
              c("div", Ge, [
                t("div", Fe, [
                  t("div", null, [
                    r(
                      l,
                      {
                        image: e.imageArray[0],
                        numberImages: e.numberOfImages,
                        cropImage: !0,
                        plusImages: !1,
                      },
                      null,
                      8,
                      ["image", "numberImages"]
                    ),
                  ]),
                  t("div", null, [
                    r(
                      l,
                      {
                        image: e.imageArray[1],
                        numberImages: e.numberOfImages,
                        cropImage: !0,
                        plusImages: !1,
                      },
                      null,
                      8,
                      ["image", "numberImages"]
                    ),
                  ]),
                ]),
                t("div", Ve, [
                  t("div", null, [
                    r(
                      l,
                      {
                        image: e.imageArray[2],
                        numberImages: e.numberOfImages,
                        cropImage: !0,
                        plusImages: !1,
                      },
                      null,
                      8,
                      ["image", "numberImages"]
                    ),
                  ]),
                  t("div", null, [
                    r(
                      l,
                      {
                        image: e.imageArray[3],
                        numberImages: e.numberOfImages,
                        cropImage: !0,
                        plusImages: !1,
                      },
                      null,
                      8,
                      ["image", "numberImages"]
                    ),
                  ]),
                  t("div", null, [
                    r(
                      l,
                      {
                        image: e.imageArray[4],
                        numberImages: e.numberOfImages,
                        cropImage: !0,
                        plusImages: !1,
                      },
                      null,
                      8,
                      ["image", "numberImages"]
                    ),
                  ]),
                ]),
              ]))
            : x("", !0),
          e.numberOfImages >= 6
            ? (u(),
              c("div", qe, [
                t("div", ze, [
                  t("div", null, [
                    r(
                      l,
                      {
                        image: e.imageArray[0],
                        numberImages: e.numberOfImages,
                        cropImage: !0,
                        plusImages: !1,
                      },
                      null,
                      8,
                      ["image", "numberImages"]
                    ),
                  ]),
                  t("div", null, [
                    r(
                      l,
                      {
                        image: e.imageArray[1],
                        numberImages: e.numberOfImages,
                        cropImage: !0,
                        plusImages: !1,
                      },
                      null,
                      8,
                      ["image", "numberImages"]
                    ),
                  ]),
                ]),
                t("div", Xe, [
                  t("div", null, [
                    r(
                      l,
                      {
                        image: e.imageArray[2],
                        numberImages: e.numberOfImages,
                        cropImage: !0,
                        plusImages: !1,
                      },
                      null,
                      8,
                      ["image", "numberImages"]
                    ),
                  ]),
                  t("div", null, [
                    r(
                      l,
                      {
                        image: e.imageArray[3],
                        numberImages: e.numberOfImages,
                        cropImage: !0,
                        plusImages: !1,
                      },
                      null,
                      8,
                      ["image", "numberImages"]
                    ),
                  ]),
                  t("div", null, [
                    r(
                      l,
                      {
                        image: e.imageArray[4],
                        numberImages: e.numberOfImages,
                        cropImage: !0,
                        plusImages: !0,
                      },
                      null,
                      8,
                      ["image", "numberImages"]
                    ),
                  ]),
                ]),
              ]))
            : x("", !0),
        ])
      );
    },
  };
function Ye(e) {
  var s = typeof e;
  return e != null && (s == "object" || s == "function");
}
var C = Ye,
  Ke = typeof A == "object" && A && A.Object === Object && A,
  Qe = Ke,
  Ze = Qe,
  et = typeof self == "object" && self && self.Object === Object && self,
  tt = Ze || et || Function("return this")(),
  K = tt,
  nt = K,
  st = function () {
    return nt.Date.now();
  },
  rt = st,
  it = /\s/;
function at(e) {
  for (var s = e.length; s-- && it.test(e.charAt(s)); );
  return s;
}
var ot = at,
  lt = ot,
  mt = /^\s+/;
function gt(e) {
  return e && e.slice(0, lt(e) + 1).replace(mt, "");
}
var ut = gt,
  ct = K,
  dt = ct.Symbol,
  Q = dt,
  H = Q,
  Z = Object.prototype,
  ft = Z.hasOwnProperty,
  ht = Z.toString,
  p = H ? H.toStringTag : void 0;
function bt(e) {
  var s = ft.call(e, p),
    n = e[p];
  try {
    e[p] = void 0;
    var d = !0;
  } catch {}
  var i = ht.call(e);
  return d && (s ? (e[p] = n) : delete e[p]), i;
}
var xt = bt,
  vt = Object.prototype,
  yt = vt.toString;
function It(e) {
  return yt.call(e);
}
var wt = It,
  U = Q,
  pt = xt,
  _t = wt,
  kt = "[object Null]",
  At = "[object Undefined]",
  W = U ? U.toStringTag : void 0;
function Ot(e) {
  return e == null
    ? e === void 0
      ? At
      : kt
    : W && W in Object(e)
    ? pt(e)
    : _t(e);
}
var jt = Ot;
function Pt(e) {
  return e != null && typeof e == "object";
}
var $t = Pt,
  Tt = jt,
  Mt = $t,
  St = "[object Symbol]";
function Nt(e) {
  return typeof e == "symbol" || (Mt(e) && Tt(e) == St);
}
var Ct = Nt,
  Et = ut,
  R = C,
  Bt = Ct,
  G = 0 / 0,
  Lt = /^[-+]0x[0-9a-f]+$/i,
  Dt = /^0b[01]+$/i,
  Ht = /^0o[0-7]+$/i,
  Ut = parseInt;
function Wt(e) {
  if (typeof e == "number") return e;
  if (Bt(e)) return G;
  if (R(e)) {
    var s = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = R(s) ? s + "" : s;
  }
  if (typeof e != "string") return e === 0 ? e : +e;
  e = Et(e);
  var n = Dt.test(e);
  return n || Ht.test(e) ? Ut(e.slice(2), n ? 2 : 8) : Lt.test(e) ? G : +e;
}
var Rt = Wt,
  Gt = C,
  M = rt,
  F = Rt,
  Ft = "Expected a function",
  Vt = Math.max,
  qt = Math.min;
function zt(e, s, n) {
  var d,
    i,
    f,
    m,
    a,
    o,
    h = 0,
    E = !1,
    I = !1,
    P = !0;
  if (typeof e != "function") throw new TypeError(Ft);
  (s = F(s) || 0),
    Gt(n) &&
      ((E = !!n.leading),
      (I = "maxWait" in n),
      (f = I ? Vt(F(n.maxWait) || 0, s) : f),
      (P = "trailing" in n ? !!n.trailing : P));
  function $(g) {
    var y = d,
      w = i;
    return (d = i = void 0), (h = g), (m = e.apply(w, y)), m;
  }
  function ee(g) {
    return (h = g), (a = setTimeout(k, s)), E ? $(g) : m;
  }
  function te(g) {
    var y = g - o,
      w = g - h,
      D = s - y;
    return I ? qt(D, f - w) : D;
  }
  function B(g) {
    var y = g - o,
      w = g - h;
    return o === void 0 || y >= s || y < 0 || (I && w >= f);
  }
  function k() {
    var g = M();
    if (B(g)) return L(g);
    a = setTimeout(k, te(g));
  }
  function L(g) {
    return (a = void 0), P && d ? $(g) : ((d = i = void 0), m);
  }
  function ne() {
    a !== void 0 && clearTimeout(a), (h = 0), (d = o = i = a = void 0);
  }
  function se() {
    return a === void 0 ? m : L(M());
  }
  function T() {
    var g = M(),
      y = B(g);
    if (((d = arguments), (i = this), (o = g), y)) {
      if (a === void 0) return ee(o);
      if (I) return clearTimeout(a), (a = setTimeout(k, s)), $(o);
    }
    return a === void 0 && (a = setTimeout(k, s)), m;
  }
  return (T.cancel = ne), (T.flush = se), T;
}
var Xt = zt,
  Jt = Xt,
  Yt = C,
  Kt = "Expected a function";
function Qt(e, s, n) {
  var d = !0,
    i = !0;
  if (typeof e != "function") throw new TypeError(Kt);
  return (
    Yt(n) &&
      ((d = "leading" in n ? !!n.leading : d),
      (i = "trailing" in n ? !!n.trailing : i)),
    Jt(e, s, { leading: d, maxWait: s, trailing: i })
  );
}
var S = Qt;
const Zt = {
    components: {
      InertiaLink: V,
      tContractorWord: X,
      ButtonPost: J,
      ButtonRefresh: Y,
      PostingActionMenu: Ae,
      PostImageDisplay: Je,
      Link: q,
      ref: _,
      throttle: S,
    },
    mounted() {
      window.addEventListener("scroll", S(this.HidePostingActionMenu, 500));
    },
    unmounted() {
      window.removeEventListener("scroll", S(this.HidePostingActionMenu, 500));
    },
    props: {
      showit: Boolean,
      profile: { type: Object, required: !0 },
      post: { type: Object, required: !0 },
      body1Colors: { type: Array, required: !0 },
    },
    data() {
      return { showingPostingActionMenu: _(!1) };
    },
    computed: {
      numberOfImages: {
        get: function () {
          return this.post.image.length > 0
            ? this.post.image.split("|").length
            : 0;
        },
      },
      imageArray: {
        get: function () {
          return this.post.image.length > 0 ? this.post.image.split("|") : [];
        },
      },
    },
    methods: {
      NavPostingActionMenu(e) {
        this.showingPostingActionMenu = !this.showingPostingActionMenu;
      },
      HidePostingActionMenu(e) {
        this.showingPostingActionMenu = !1;
      },
    },
  },
  en = {
    key: 0,
    class:
      "z-48 flex flex-col items-center justify-start my-2 py-1 lg:py-1 px-2 bg-gray-200 border-2 border-gray-300 rounded-lg drop-shadow-lg",
  },
  tn = { class: "flex flex-row justify-between items-center w-full mb-2" },
  nn = { class: "flex flex-row justify-start items-center" },
  sn = { class: "flex justify-start items-start flex-none mt-2 w=16" },
  rn = t(
    "img",
    {
      class: "object-cover w-14 h-14 mx-2 rounded-full",
      src: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      alt: "avatar",
    },
    null,
    -1
  ),
  an = { class: "flex flex-wrap ml-1" },
  on = { class: "flex flex-row justify-end items-center flex-none w-28" },
  ln = z(
    '<div class="flex flex-row flex-none justify-end items-center px-2"><div class=""><img src="/images/icons/pre-diamond.png" width="20" height="30"></div><div class="flex flex-col justify-center items-center"><div class=""><img src="/images/icons/Stars4_icon.png" width="40" height="40"></div><div class=""><h2 class="font-light text-xs overflow-hidden tracking-tighter"> 5555 </h2></div></div></div>',
    1
  ),
  mn = {
    class:
      "flex flex-col flex-initial flex-nowrap justify-center items-center mr-3",
  },
  gn = { class: "-mr-2 flex items-center" },
  un = {
    class: "h-6 w-6",
    stroke: "currentColor",
    fill: "none",
    viewBox: "0 0 24 24",
  },
  cn = t(
    "div",
    { class: "" },
    [
      t(
        "h2",
        {
          class: "flex flex-nowrap font-light text-xs tracking-tighter italic",
        },
        " 20 hrs "
      ),
    ],
    -1
  ),
  dn = { class: "flex flex-row justify-center w-full mb-1" },
  fn = { class: "flex flex-row justify-between items-center w-full mb-2" },
  hn = { class: "" },
  bn = { class: "flex flex-row justify-between items-center" },
  xn = t(
    "div",
    { class: "" },
    [
      t("img", {
        src: "/images/icons/like_green.png",
        width: "25",
        height: "25",
      }),
    ],
    -1
  ),
  vn = { class: "pl-1" },
  yn = { class: "" },
  In = t(
    "div",
    { class: "flex flex-row justify-between items-center" },
    [
      t("div", { class: "" }, [
        t("img", {
          src: "/images/icons/comment_icon.png",
          width: "25",
          height: "25",
        }),
      ]),
      t("div", { class: "pl-1" }, "12,999"),
    ],
    -1
  ),
  wn = { class: "" },
  pn = { class: "flex flex-row justify-between items-center" },
  _n = t(
    "div",
    { class: "" },
    [
      t("img", {
        src: "/images/icons/share_icon.png",
        width: "25",
        height: "25",
      }),
    ],
    -1
  ),
  kn = { class: "pl-1" },
  An = { class: "" },
  On = { class: "flex flex-row justify-between items-center" },
  jn = t(
    "div",
    { class: "" },
    [
      t("img", {
        src: "/images/icons/share_out_icon.png",
        width: "20",
        height: "17",
      }),
    ],
    -1
  ),
  Pn = { class: "pl-1" };
function $n(e, s, n, d, i, f) {
  const m = O("Link"),
    a = O("PostImageDisplay"),
    o = O("PostingActionMenu");
  return n.post.view
    ? (u(),
      c("div", en, [
        t("div", tn, [
          t("div", nn, [
            t("div", sn, [
              r(
                m,
                { href: "#", class: "block" },
                { default: v(() => [rn]), _: 1 }
              ),
            ]),
            t("div", an, [
              t(
                "h2",
                {
                  class: "font-bold text-xl xs:text-2xl md:text-3xl",
                  onClick:
                    s[0] || (s[0] = (h) => e.$emit("enlarge-post", n.post)),
                },
                b(n.post.id) + ": " + b(n.post.title),
                1
              ),
            ]),
          ]),
          t("div", on, [
            ln,
            t("div", mn, [
              t("div", gn, [
                t(
                  "button",
                  {
                    onClick:
                      s[1] ||
                      (s[1] = (...h) =>
                        f.NavPostingActionMenu && f.NavPostingActionMenu(...h)),
                    class:
                      "inline-flex items-center justify-center p-2 rounded-md text-black  hover:text-gray-500  hover:bg-gray-100  focus:outline-none focus:bg-gray-100  focus:text-gray-500  transition duration-150 ease-in-out",
                  },
                  [
                    (u(),
                    c("svg", un, [
                      t(
                        "path",
                        {
                          class: j({
                            hidden: i.showingPostingActionMenu,
                            "inline-flex": !i.showingPostingActionMenu,
                          }),
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M4 6h16M4 12h16M4 18h16",
                        },
                        null,
                        2
                      ),
                      t(
                        "path",
                        {
                          class: j({
                            hidden: !i.showingPostingActionMenu,
                            "inline-flex": i.showingPostingActionMenu,
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
              ]),
              cn,
            ]),
          ]),
        ]),
        ie(
          t(
            "div",
            {
              onClick: s[2] || (s[2] = (h) => e.$emit("enlarge-post", n.post)),
              class: j([
                "flex flex-row justify-center items-center w-full px-2 text-lg xs:text-xl md:text-2xl ",
                [
                  n.body1Colors[n.post.body1ColorId],
                  n.post.body1Bold ? "font-bold" : "font-normal",
                ],
              ]),
            },
            b(n.post.body1),
            3
          ),
          [[ae, n.post.body1]]
        ),
        t("div", dn, [
          n.post.image
            ? (u(),
              c(
                "div",
                {
                  key: 0,
                  onClick:
                    s[3] || (s[3] = (h) => e.$emit("enlarge-post", n.post)),
                },
                [
                  r(
                    a,
                    {
                      imageArray: f.imageArray,
                      numberOfImages: f.numberOfImages,
                    },
                    null,
                    8,
                    ["imageArray", "numberOfImages"]
                  ),
                ]
              ))
            : x("", !0),
        ]),
        t(
          "div",
          {
            class:
              "flex flex-row justify-center items-center w-full px-2 mt-0 mb-0 text-base xs:text-lg md:text-xl font-normal text-gray-900 ",
            onClick: s[4] || (s[4] = (h) => e.$emit("enlarge-post", n.post)),
          },
          b(n.post.body2),
          1
        ),
        t("div", fn, [
          t("div", hn, [
            r(
              m,
              {
                href: "#",
                class:
                  "font-medium text-xs sm:text-sm text-blue-800  hover:underline",
              },
              {
                default: v(() => [
                  t("div", bn, [xn, t("div", vn, b(n.post.likes), 1)]),
                ]),
                _: 1,
              }
            ),
          ]),
          t("div", yn, [
            r(
              m,
              {
                href: "#",
                class:
                  "font-medium text-xs sm:text-sm text-blue-800  hover:underline",
              },
              { default: v(() => [In]), _: 1 }
            ),
          ]),
          t("div", wn, [
            r(
              m,
              {
                href: "#",
                class:
                  "font-medium text-xs sm:text-sm text-blue-800  hover:underline",
              },
              {
                default: v(() => [
                  t("div", pn, [_n, t("div", kn, b(n.post.repost), 1)]),
                ]),
                _: 1,
              }
            ),
          ]),
          t("div", An, [
            r(
              m,
              {
                href: "#",
                class:
                  "font-medium text-xs sm:text-sm text-blue-800  hover:underline",
              },
              {
                default: v(() => [
                  t("div", On, [jn, t("div", Pn, b(n.post.shares), 1)]),
                ]),
                _: 1,
              }
            ),
          ]),
        ]),
        r(
          o,
          {
            showingPostingActionMenu: i.showingPostingActionMenu,
            postID: n.post.id,
            postUserId: n.post.user_id,
            currentUserId: n.profile.user_id,
            onNavPostingActionMenu: f.NavPostingActionMenu,
          },
          null,
          8,
          [
            "showingPostingActionMenu",
            "postID",
            "postUserId",
            "currentUserId",
            "onNavPostingActionMenu",
          ]
        ),
      ]))
    : x("", !0);
}
const Bn = N(Zt, [["render", $n]]);
export { l as P, En as _, Bn as a, S as t };
