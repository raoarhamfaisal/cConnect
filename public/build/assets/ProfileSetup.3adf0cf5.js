import { H as i } from "./Header.8b20dfa0.js";
import {
  u as s,
  c as a,
  o as m,
  e as p,
  h as o,
  i as l,
  s as n,
  F as f,
  d as u,
  H as c,
} from "./app.907bb242.js";
import h from "./AllSteps.28c7fb4d.js";
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
import "./GeneralInfo.b275e167.js";
import "./TextInput.a3698496.js";
import "./UserAvatar.e643b2f7.js";
/* empty css                                                                   */ import "./CompanyAddressInfo.fb22c9fb.js";
import "./GoogleAddressAutoComplete.36d7109e.js";
import "./LinksInfo.b2be1232.js";
import "./InputIcon.1f121658.js";
import "./PricingVersions.c166986b.js";
import "./freebox.8421bda3.js";
const Q = {
  __name: "ProfileSetup",
  props: {
    mustVerifyEmail: Boolean,
    status: String,
    profile: Object,
    showit: Boolean,
    regions: Array,
    postSearchFilters: { type: Object, default: () => ({ postSearch: "" }) },
  },
  setup(t) {
    const e = s(),
      r = a(() => e.getters.translations);
    return (
      e.commit("profile/setActiveTab", 0),
      m(async () => {
        await e.dispatch("getToken"),
          localStorage.setItem("prevUrl", "/profile-setup");
      }),
      (d, g) => (
        u(),
        p(
          f,
          null,
          [
            o(l(c), { title: r.value && r.value.profile_setup }, null, 8, [
              "title",
            ]),
            o(
              i,
              {
                profile: t.profile,
                "show-post-buttons": !1,
                showOnlyNewsFeed: !1,
                "post-search-filters": t.postSearchFilters,
                showit: t.showit,
              },
              {
                default: n(() => [
                  o(
                    h,
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
      )
    );
  },
};
export { Q as default };
