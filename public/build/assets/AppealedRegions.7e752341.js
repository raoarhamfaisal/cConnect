import { H as i } from "./Header.8b20dfa0.js";
import p from "./AllRegions.f98e40a2.js";
import {
  D as s,
  S as a,
  N as m,
  e as l,
  h as o,
  i as n,
  K as c,
  s as f,
  l as u,
  F as h,
  d as r,
  H as d,
} from "./app.907bb242.js";
import "./spanish.afd7e950.js";
import "./cConnectWord.60dc90ac.js";
import "./_plugin-vue_export-helper.cdc0426e.js";
import "./filepond-plugin-file-poster.b4b2d2f1.js";
import "./CustomDialog.f5ff7c4f.js";
import "./iconify.99e09ef6.js";
import "./selectListsHelpters.6d73b684.js";
import "./Badge.c427ce3e.js";
import "./DialogProfileTabs.3ff770e3.js";
import "./Trades.1aa0dbd9.js";
import "./Views.82daefe6.js";
import "./Loader.9dfd413c.js";
import "./Avatar.72f6a2c8.js";
import "./InputLabel.c691f6db.js";
import "./InputError.a485c9eb.js";
import "./SelectProfile.a00d96e3.js";
import "./DialogUpgradeToGoldPlatinum.8daf4ac5.js";
import "./HeadingCard.ac3646cb.js";
import "./Card.0c51827f.js";
/* empty css                                                             */ import "./PageTitle.f25bd43b.js";
/* empty css                                                                  */ const $ =
  {
    __name: "AppealedRegions",
    props: {
      profile: Object,
      showit: Boolean,
      postSearchFilters: { type: Object, default: () => ({ postSearch: "" }) },
    },
    setup(t) {
      const e = s().props.value.auth.user.appeals_privileges === 1;
      return (
        a(() => {
          !e &&
            window.location.pathname !== "/post" &&
            m.Inertia.visit("/post");
        }),
        (w, g) => (
          r(),
          l(
            h,
            null,
            [
              o(n(d), { title: "Regions" }),
              e
                ? (r(),
                  c(
                    i,
                    {
                      key: 0,
                      profile: t.profile,
                      "post-search-filters": t.postSearchFilters,
                      showit: t.showit,
                      "show-post-buttons": !0,
                      color: "rgb(229 231 235 / var(--tw-bg-opacity))",
                    },
                    {
                      default: f(() => [
                        o(p, {
                          pageTitle: "Appealed Reviews -> All Regions",
                          link: "appealed",
                        }),
                      ]),
                      _: 1,
                    },
                    8,
                    ["profile", "post-search-filters", "showit"]
                  ))
                : u("", !0),
            ],
            64
          )
        )
      );
    },
  };
export { $ as default };
