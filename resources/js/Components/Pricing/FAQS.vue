<script setup>
import { computed } from "vue";

import { useStore } from "vuex";

const store = useStore();

const screenWidth = computed(() => store.getters.screenWidth);
const translations = computed(() => store.getters.translations);
</script>
<template>
  <div class="mt-4">
    <div class="flex justify-center" ref="whatVersionAreYourRef">
      <span
        class="text-4xl sm:text-5xl font-extrabold mb-4 text-center text-blue-rgba"
      >
        {{ translations && translations.faqs }}
      </span>
    </div>
    <v-expansion-panels multiple class="">
      <v-expansion-panel class="rounded-lg-imp">
        <v-expansion-panel-title
          expand-icon="mdi-plus"
          collapse-icon="mdi-minus"
          class="text-3xl-imp"
        >
          {{ translations && translations.what_is_the_news_feed }}
        </v-expansion-panel-title>
        <v-expansion-panel-text
          class="p-3 sm:p-6 flex-col text-lg font-semibold text-gray-900"
        >
          <div>
            {{ translations && translations.the_news_feed_is_the_heart }}
          </div>
          {{ translations && translations.use_the_news_feed_community }}
          <br /><br />
          {{ translations && translations.post_often_to }}
          <ul class="list-disc pl-8">
            <li>
              {{ translations && translations.advertise_your_services }}
            </li>
            <li>
              {{ translations && translations.put_your_brag_out_there }}
            </li>
            <li>{{ translations && translations.post_new_jobs_coming_up }}</li>
            <li>{{ translations && translations.got_a_question_post_it }}</li>
            <li>
              {{ translations && translations.ran_into_a_situation_post_it }}
            </li>
          </ul>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel class="rounded-lg-imp">
        <v-expansion-panel-title
          expand-icon="mdi-plus"
          collapse-icon="mdi-minus"
          class="text-3xl-imp"
        >
          {{ translations && translations.why_tcontractor }}
        </v-expansion-panel-title>
        <v-expansion-panel-text
          class="p-3 sm:p-6 flex-col text-lg font-semibold text-gray-900"
        >
          {{ translations && translations.true_social_media_platforms_offer
          }}<br />
          <br />
          <div>
            <strong class="inline">tContractor</strong>
            {{ translations && translations.is_the_answer_to_these_issues }}
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel class="rounded-lg-imp">
        <v-expansion-panel-title
          expand-icon="mdi-plus"
          collapse-icon="mdi-minus"
          class="text-3xl-imp"
        >
          {{ translations && translations.how_much_does_it_cost_to_advertise }}
        </v-expansion-panel-title>
        <v-expansion-panel-text
          class="p-3 sm:p-6 flex-col text-lg font-semibold text-gray-900"
        >
          <div>
            {{ translations && translations.member_contractor_advertises_free }}
            <strong class="inline">tContractor</strong>.
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel class="rounded-lg-imp">
        <v-expansion-panel-title
          expand-icon="mdi-plus"
          collapse-icon="mdi-minus"
          class="text-3xl-imp"
        >
          {{ translations && translations.what_is_sub_finder }}
        </v-expansion-panel-title>
        <v-expansion-panel-text
          class="p-3 sm:p-6 flex-col text-lg font-semibold text-gray-900"
        >
          {{ translations && translations.sub_finder_allows_you_to_find }}
          <br /><br />
          <strong class="inline">
            {{ translations && translations.simple_but_powerful }}</strong
          >
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel class="rounded-lg-imp">
        <v-expansion-panel-title
          expand-icon="mdi-plus"
          collapse-icon="mdi-minus"
          class="text-3xl-imp"
          >{{ translations && translations.what_are_red_flag_customers }}
        </v-expansion-panel-title>
        <v-expansion-panel-text
          class="p-3 sm:p-6 flex-col text-lg font-semibold text-gray-900"
        >
          {{ translations && translations.have_you_ever_had_a_customer
          }}<br /><br />
          {{ translations && translations.they_are_out_there }}
          <br /><br />
          {{ translations && translations.would_you_like_to_know_experiences }}
          <br /><br />{{
            translations &&
            translations.as_a_contractor_you_are_always_under_review
          }}
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel class="rounded-lg-imp">
        <v-expansion-panel-title
          expand-icon="mdi-plus"
          collapse-icon="mdi-minus"
          class="text-3xl-imp"
        >
          {{
            translations &&
            translations.more_business_more_profit_less_headaches
          }}
        </v-expansion-panel-title>
        <v-expansion-panel-text
          class="p-3 sm:p-6 flex-col text-lg font-semibold text-gray-900"
        >
          {{ translations && translations.sounds_great_how_do_i_do_this
          }}<br /><br />
          <div>
            {{ translations && translations.with }}
            <strong class="inline">tContractor</strong>,
            {{ translations && translations.its_easy }}
          </div>
          <br />
          {{ translations && translations.heres_a_simple_example }}<br /><br />
          {{ translations && translations.most_contractors_would_refuse }}<br />
          <div>
            {{ translations && translations.with }}
            <strong class="inline">tContractor</strong>,
            {{ translations && translations.you_can_now_have_the_tools }}
          </div>
          <br />
          {{ translations && translations.or_heres_another }} <br /><br />
          {{ translations && translations.youre_a_roofer_or_general_contractor
          }}<br /><br />
          <div>
            {{ translations && translations.use_tcontractors_sub_finder }}
            <strong class="inline">tContractor</strong>.
            {{ translations && translations.someone_you_can_reasonably_trust }}
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel class="rounded-lg-imp">
        <v-expansion-panel-title
          expand-icon="mdi-plus"
          collapse-icon="mdi-minus"
          class="text-3xl-imp"
        >
          {{ translations && translations.what_are_trades }}
        </v-expansion-panel-title>
        <v-expansion-panel-text
          class="p-3 sm:p-6 flex-col text-lg font-semibold text-gray-900"
        >
          {{ translations && translations.trades_are_what_you_do }}
          <br /><br />
          <div>
            <strong class="inline">tContractor</strong>
            {{ translations && translations.has_26_plus_trade_groups }}
            <strong class="inline">tContractor</strong>
            {{
              translations &&
              translations.allows_you_to_view_only_your_trade_group
            }}
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel class="rounded-lg-imp">
        <v-expansion-panel-title
          expand-icon="mdi-plus"
          collapse-icon="mdi-minus"
          class="text-3xl-imp"
        >
          {{ translations && translations.what_are_regions }}
        </v-expansion-panel-title>
        <v-expansion-panel-text
          class="p-3 sm:p-6 flex-col text-lg font-semibold text-gray-900"
        >
          {{
            translations && translations.regions_are_major_metropolitan_areas
          }}
          <br /><br />
          <div>
            <strong class="inline">tContractor</strong>
            {{ translations && translations.lets_you_limit_your_searches }}
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<style scoped>
.text-3xl-imp {
  font-size: 1.5rem !important;
  line-height: 2rem !important;
  font-weight: 600 !important;
  padding: 20px;
}

@media (max-width: 768px) {
  .text-3xl-imp {
    font-size: 1.25rem !important;
    line-height: 1.75rem !important;
    padding: 12px;
  }
}
</style>
