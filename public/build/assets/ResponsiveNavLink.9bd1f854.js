import {
  c as a,
  f as s,
  k as i,
  l as d,
  A as n,
  z as g,
  j as c,
  L as u,
} from "./app.9755ce2a.js";
const b = {
  __name: "ResponsiveNavLink",
  props: ["href", "active"],
  setup(r) {
    const e = r,
      o = a(() =>
        e.active
          ? "block w-full pl-3 pr-4 py-2 border-l-4 border-indigo-400  text-left text-base font-medium text-indigo-700  bg-indigo-50  focus:outline-none focus:text-indigo-800  focus:bg-indigo-100  focus:border-indigo-700  transition duration-150 ease-in-out"
          : "block w-full pl-3 pr-4 py-2 border-l-4 border-transparent text-left text-base font-medium text-gray-600  hover:text-gray-800  hover:bg-gray-50  hover:border-gray-300  focus:outline-none focus:text-gray-800  focus:bg-gray-50  focus:border-gray-300  transition duration-150 ease-in-out"
      );
    return (t, f) => (
      s(),
      i(
        c(u),
        { href: r.href, class: g(o.value) },
        { default: d(() => [n(t.$slots, "default")]), _: 3 },
        8,
        ["href", "class"]
      )
    );
  },
};
export { b as _ };
