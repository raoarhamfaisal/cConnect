import { _ as s } from "./AuthenticatedLayout.51c67e8d.js";
import {
  f as r,
  h as o,
  i as e,
  j as d,
  l as t,
  F as l,
  H as i,
  n as a,
} from "./app.9755ce2a.js";
import "./_plugin-vue_export-helper.cdc0426e.js";
import "./ResponsiveNavLink.9bd1f854.js";
const n = a(
    "h2",
    {
      class: "font-semibold text-xl text-gray-800  leading-tight",
    },
    " Dashboard ",
    -1
  ),
  c = a(
    "div",
    { class: "py-12" },
    [
      a("div", { class: "max-w-7xl mx-auto sm:px-6 lg:px-8" }, [
        a(
          "div",
          {
            class: "bg-white  overflow-hidden shadow-sm sm:rounded-lg",
          },
          [a("div", { class: "p-6 text-gray-900 " }, " You're logged in! ")]
        ),
      ]),
    ],
    -1
  ),
  f = {
    __name: "Dashboard",
    setup(m) {
      return (_, g) => (
        r(),
        o(
          l,
          null,
          [
            e(d(i), { title: "Dashboard" }),
            e(s, null, { header: t(() => [n]), default: t(() => [c]), _: 1 }),
          ],
          64
        )
      );
    },
  };
export { f as default };
