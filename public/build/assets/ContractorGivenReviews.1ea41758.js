import { H as p } from "./Header.8b20dfa0.js";
import {
  D as a,
  S as m,
  N as s,
  I as n,
  e as c,
  h as r,
  K as l,
  s as f,
  l as u,
  F as d,
  d as i,
} from "./app.907bb242.js";
import h from "./ContractorDetails.797b894e.js";
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
import "./Button.f68cd005.js";
/* empty css                                                               */ import "./ContractorInfo.6f4506f5.js";
import "./StarRating.345caaaf.js";
import "./ReviewResponseAdmin.27bcb44a.js";
import "./Card.0c51827f.js";
/* empty css                                                             */ import "./ReviewAdmin.d009177d.js";
import "./EditRatingModal.2e8212da.js";
import "./StarRatingEditable.6da32187.js";
import "./Appeal.1c9232a0.js";
import "./DecisionNotes.5034a79b.js";
import "./ButtonRatings.029b3347.js";
import "./QualifyingQuestionsAdmin.20d9d8ea.js";
import "./Tooltip.df5bf8e9.js";
import "./ResponseAdmin.1e10ea9a.js";
import "./HeadingCard.ac3646cb.js";
import "./PageTitle.f25bd43b.js";
/* empty css                                                                  */ const it =
  {
    __name: "ContractorGivenReviews",
    props: {
      profile: Object,
      region_id: [String, Number],
      contractorDetails: Object,
      showit: Boolean,
      postSearchFilters: { type: Object, default: () => ({ postSearch: "" }) },
    },
    setup(t) {
      const o = a().props.value.auth.user.appeals_privileges === 1;
      return (
        m(() => {
          !o &&
            window.location.pathname !== "/post" &&
            s.Inertia.visit("/post");
        }),
        (w, g) => {
          const e = n("Head");
          return (
            i(),
            c(
              d,
              null,
              [
                r(e, { title: "Contractor Reviews" }),
                o
                  ? (i(),
                    l(
                      p,
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
                          r(
                            h,
                            {
                              profile: t.profile,
                              region_id: t.region_id,
                              contractorDetails: t.contractorDetails,
                              givenReviews: "",
                            },
                            null,
                            8,
                            ["profile", "region_id", "contractorDetails"]
                          ),
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
          );
        }
      );
    },
  };
export { it as default };
