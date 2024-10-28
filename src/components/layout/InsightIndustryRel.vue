<template>
  <!--Insight industry relationship-->
  Industry(s):
  <span
    class="industry"
    :class="color ? 'yellow' : ''"
    v-for="(cir, index) in insightsIndustryRel"
    :key="cir.c_id"
  >
    {{ cir.i_name
    }}<span v-if="index < insightsIndustryRel.length - 1">, </span>
  </span>
</template>

<script>
const axios = require("axios");

export default {
  props: {
    c_id: { type: Number },
    color: { type: Boolean },
  },

  data() {
    return {
      insightsIndustryRel: {},
      loading: false,
      error: null,
    };
  },

  mounted() {
    this.getInsightIndustryRel();
  },

  methods: {
    getInsightIndustryRel() {
      //Initialize controller.
      const insightIndustryRelController = new AbortController();

      //Get data.
      axios
        .get(
          process.env.VUE_APP_API_URL +
            "/" +
            process.env.VUE_APP_API_CONTENT_INDUSTRY_REL_ROUTE,
          { params: { c_id: this.c_id } },
          { signal: insightIndustryRelController.signal }
        )

        .then((res) => {
          this.insightsIndustryRel = res.data;
        })

        .catch((error) => {
          console.log(
            "An error occured getting content industry rel.: " +
              error.response.data
          );
        })

        .finally(() => {
          //Close request.
          insightIndustryRelController.abort();
        });
    },
  },
};
</script>
