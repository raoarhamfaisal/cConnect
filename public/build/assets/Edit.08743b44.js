import { H as e } from "./Header.8b20dfa0.js";
import {
  u as s,
  c as m,
  e as a,
  h as r,
  i as p,
  s as l,
  F as n,
  d as f,
  H as u,
} from "./app.907bb242.js";
import c from "./AllTabs.5579006f.js";
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
import "./PrimaryButton.d6b2dece.js";
import "./GeneralInfo.b275e167.js";
import "./TextInput.a3698496.js";
import "./UserAvatar.e643b2f7.js";
/* empty css                                                                   */ import "./Tabs.0fb5ab76.js";
import "./CompanyAddressInfo.fb22c9fb.js";
import "./GoogleAddressAutoComplete.36d7109e.js";
import "./LinksInfo.b2be1232.js";
import "./InputIcon.1f121658.js";
const Q = {
  __name: "Edit",
  props: {
    mustVerifyEmail: Boolean,
    status: String,
    profile: Object,
    showit: Boolean,
    regions: Array,
    postSearchFilters: { type: Object, default: () => ({ postSearch: "" }) },
  },
  setup(t) {
    const i = s();
    i.commit("profile/setActiveTab", 0);
    const o = m(() => i.getters.translations);
    return (h, d) => (
      f(),
      a(
        n,
        null,
        [
          r(p(u), { title: o.value && o.value.profile }, null, 8, ["title"]),
          r(
            e,
            {
              profile: t.profile,
              "show-post-buttons": !1,
              "post-search-filters": t.postSearchFilters,
              showit: t.showit,
            },
            {
              default: l(() => [
                r(
                  c,
                  {
                    status: t.status,
                    mustVerifyEmail: t.mustVerifyEmail,
                    profile: t.profile,
                    regions: t.regions,
                  },
                  null,
                  8,
                  ["status", "mustVerifyEmail", "profile", "regions"]
                ),
              ]),
              _: 1,
            },
            8,
            ["profile", "post-search-filters", "showit"]
          ),
        ],
        64
      )
    );
  },
};
export { Q as default };
