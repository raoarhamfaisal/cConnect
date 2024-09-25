import { d as a, e as s, f as t, n, F as o } from "./app.907bb242.js";
const r = t("span", { class: "text-white font-extrabold font-sans" }, "C", -1),
  c = t("span", { class: "text-white font-bold font-sans" }, "ontractor", -1),
  _ = {
    __name: "cConnectWhite",
    props: { isOrange: { type: Boolean, default: !1 } },
    setup(e) {
      return (l, i) => (
        a(),
        s(
          o,
          null,
          [
            t(
              "span",
              {
                class: n(
                  `${
                    e.isOrange ? "text-orange-accent" : "text-green-rgba"
                  } font-extrabold italic font-serif normal-case`
                ),
              },
              "t",
              2
            ),
            r,
            c,
          ],
          64
        )
      );
    },
  };
export { _ };
