<template>
  <!--Event event relationship-->
  <div v-if="eventsIndustryRel.length">
    Industry(s):
    <span
      class="event"
      :class="color ? 'yellow' : ''"
      v-for="(eir, index) in eventsIndustryRel"
      :key="eir.e_id"
    >
      {{ eir.i_name
      }}<span v-if="index < eventsIndustryRel.length - 1">, </span>
    </span>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  props: {
    e_id: { type: Number },
    color: { type: Boolean },
  },

  data() {
    return {
      eventsIndustryRel: {},
      loading: false,
      error: null,
    };
  },

  mounted() {
    this.getEventIndustryRel();
  },

  methods: {
    getEventIndustryRel() {
      //Initialize controller.
      const eventIndustryRelController = new AbortController();

      //Get data.
      axios
        .get(
          process.env.VUE_APP_API_URL +
            "/" +
            process.env.VUE_APP_API_EVENT_INDUSTRY_REL_ROUTE,
          { params: { e_id: this.e_id } },
          { signal: eventIndustryRelController.signal }
        )

        .then((res) => {
          this.eventsIndustryRel = res.data;
        })

        .catch((error) => {
          console.log(
            "An error occured getting event industry rel.: " +
              error.response.data
          );
        })

        .finally(() => {
          //Close request.
          eventIndustryRelController.abort();
        });
    },
  },
};
</script>
