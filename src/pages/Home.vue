<template>
  <metainfo></metainfo>
  <jumbotron
    :pageImage="pageImage"
    :pageTitle="pageTitle"
    :pageSubTitle="pageSubTitle"
    :pageMessage="pageMessage"
    :pageLink="pageLink"
    :pageLinkTitle="pageLinkTitle"
    :pageLinkType="pageLinkType"
    :pageLinkTarget="pageLinkTarget"
    :pageSubTitle2="pageSubTitle2"
    :pageMessage2="pageMessage2"
    :pageLink2="pageLink2"
    :pageLinkTitle2="pageLinkTitle2"
    :pageLinkType2="pageLinkType2"
    :pageLinkTarget2="pageLinkTarget2"
  >
  </jumbotron>
  <event></event>
  <insight></insight>
  <testimonial></testimonial>
  <c-x-advisory></c-x-advisory>
</template>

<script>
import Jumbotron from "../components/layout/Jumbotron.vue";
import Event from "../components/layout/Event.vue";
import Insight from "../components/layout/Insight.vue";
import Testimonial from "../components/layout/Testimonial.vue";
import CXAdvisory from "../components/layout/CXAdvisory.vue";
import { useMeta } from "vue-meta";

export default {
  components: {
    Jumbotron,
    Event,
    Insight,
    Testimonial,
    CXAdvisory,
  },

  setup() {
    useMeta({
      title: "Firestarters - Global Business Community",
      description:
        "By the people for the people! Each Firestarters member has ownership in our business community. We know the market is tough which is why our charter is to build and support each other through crowdsourced past learnings, thought leadership, expertise and strategy as you build your business",
      meta: [
        "keywords",
        {
          property: "keywords",
          content: process.env.NODE_ENV,
        },
      ],
    });
  },

  data() {
    return {
      pageImage: "",
      pageTitle: "By the People, For the People",
      pageSubTitle: "Who Are We?",
      pageMessage:
        "If you are responsible for business outcomes and driving growth for your organization - WE ARE YOU.",
      pageLink: "Home",
      pageLinkTitle: "Join Us",
      pageLinkType: "modal",
      pageLinkTarget: "#registerModal",
      pageSubTitle2: "What Do We Do?",
      pageMessage2:
        "Each Firestarters member has ownership in our business community. We know the market is tough which is why our charter is to build and support each other through crowdsourced past learnings, thought leadership, expertise and strategy as you build your business.",
      pageLink2: "About Us",
      pageLinkTitle2: "About Us",
      pageLinkType2: "",
      pageLinkTarget2: "",
    };
  },
};
</script>
