<template>
  <metainfo></metainfo>

  <jumbotron-page
    :pageImage="pageImage"
    :pageTitle="pageTitle"
    :pageSubTitle="pageSubTitle"
    :pageMessage="pageMessage"
  ></jumbotron-page>

  <div class="container p-container pt pb rb">
    <div v-if="loading">
      <base-loader></base-loader>
    </div>

    <div v-else>
      <insight-search
        v-model:kw="kw"
        v-model:industry="industry"
      ></insight-search>
      <insight-main v-if="kw == '' && industry == 0"></insight-main>
      <insight-card :kw="kw" :industry="industry"></insight-card>
    </div>
  </div>
</template>

<script>
import { useMeta } from "vue-meta";
import JumbotronPage from "../components/layout/JumbotronPage.vue";
import BaseLoader from "../components/ui/BaseLoader.vue";
import InsightSearch from "../components/layout/InsightSearch.vue";
import InsightMain from "../components/layout/InsightMain.vue";
import InsightCard from "../components/layout/InsightCard.vue";

export default {
  components: {
    JumbotronPage,
    BaseLoader,
    InsightSearch,
    InsightMain,
    InsightCard,
  },

  setup() {
    useMeta({
      title: "Insights - Firestarters",
      description: "Global Thought Leadership - Firestarters",
    });
  },

  data() {
    return {
      pageImage: "page-banner-insights",
      pageTitle:
        "Discover whats happening around <span class='yellow'>you.</span>",
      pageSubTitle: "Submit Your Insights",
      pageMessage:
        "Members are welcome at anytime to jump on the site and review content and (coming soon) submit your own articles, best practices, and engage with other members.",
      loading: false,
      error: null,
      kw: "",
      industry: 0,
    };
  },
};
</script>
