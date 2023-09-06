import { _ as n } from "./Avatar.00189ff3.js";
import { S as s } from "./StarRating.bc2c2f18.js";
import {
  f as a,
  h as r,
  n as e,
  i,
  B as c,
  m as o,
  k as l,
} from "./app.9755ce2a.js";
import "./iconify.d4bdef87.js";
import "./_plugin-vue_export-helper.cdc0426e.js";
const m = { class: "flex space-x-2 justify-between" },
  _ = { class: "flex justify-center items-center space-x-2" },
  d = { class: "flex flex-col justify-center" },
  u = { class: "text-xl font-medium font-bold text-gray-900 " },
  f = { key: 0 },
  B = {
    __name: "Contractor",
    props: ["contractor"],
    setup(t) {
      return (x, g) => (
        a(),
        r("div", m, [
          e("div", _, [
            e("div", null, [
              i(n, { imageSrc: t.contractor.user_avatar }, null, 8, [
                "imageSrc",
              ]),
            ]),
            e("div", d, [
              e(
                "h2",
                u,
                c(t.contractor.first_name + " " + t.contractor.last_name),
                1
              ),
              t.contractor.company
                ? (a(), r("div", f, c(t.contractor.company_name), 1))
                : o("", !0),
              t.contractor.average_rating
                ? (a(),
                  l(
                    s,
                    {
                      key: 1,
                      rating: Number(
                        parseFloat(t.contractor.average_rating).toFixed(1)
                      ),
                      isIndicatorActive: !0,
                    },
                    null,
                    8,
                    ["rating"]
                  ))
                : o("", !0),
            ]),
          ]),
        ])
      );
    },
  };
export { B as default };
