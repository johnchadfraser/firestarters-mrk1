<template>
  <metainfo></metainfo>

  <jumbotron-page
    :pageImage="pageImage"
    :pageTitle="pageTitle"
    :pageSubTitle="pageSubTitle"
    :pageMessage="pageMessage"
  ></jumbotron-page>

  <div class="container p-container pt rb">
    <div v-if="loading">
      <base-loader></base-loader>
    </div>

    <div v-else>
      <event-card></event-card>
      <event-past-card></event-past-card>
    </div>
  </div>
</template>

<script>
import { useMeta } from "vue-meta";
import JumbotronPage from "../components/layout/JumbotronPage.vue";
import BaseLoader from "../components/ui/BaseLoader.vue";
import EventCard from "../components/layout/EventCard.vue";
import EventPastCard from "../components/layout/EventPastCard.vue";

export default {
  components: {
    JumbotronPage,
    BaseLoader,
    EventCard,
    EventPastCard,
  },

  setup() {
    useMeta({
      title: "Events - Firestarters",
      description:
        "Members of the community will have an opportunity to connect with each other on various CX topics and build a network of like-minded colleagues to collectively define what a great customer experience can be.",
    });
  },

  data() {
    return {
      pageImage: "page-banner-events",
      pageTitle:
        "Discover our Virtual & <span class='yellow'>live events.</span>",
      pageSubTitle: "Why Join Us Live?",
      pageMessage:
        "Members of the community will have an opportunity to connect with each other on various CX topics and build a network of like-minded colleagues to collectively define what a great customer experience can be.",
      loading: false,
      error: null,
    };
  },
};
</script>
