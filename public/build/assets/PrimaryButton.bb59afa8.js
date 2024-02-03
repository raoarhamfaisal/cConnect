import { c as s, f as o, h as n, A as i, z as c } from "./app.9755ce2a.js";
const u = ["type"],
  f = {
    __name: "PrimaryButton",
    props: {
      type: { type: String, default: "submit" },
      class: { type: String, default: "" },
    },
    setup(t) {
      const { type: g, class: e } = t,
        r = s(
          () =>
            `inline-flex items-center px-4 py-2 bg-gray-800  border border-transparent rounded-md font-semibold text-md text-white  uppercase tracking-widest hover:bg-gray-700  focus:bg-gray-700  active:bg-gray-900  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2  transition ease-in-out duration-150 ${e}`
        );
      return (a, d) => (
        o(),
        n(
          "button",
          { type: t.type, class: c(r.value) },
          [i(a.$slots, "default")],
          10,
          u
        )
      );
    },
  };
export { f as _ };
