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
      <event-card :et_id="4"></event-card>
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12">
          <p>
            <img
              role="img"
              class="img-fluid logo"
              src="~@/assets/logo/firestarters-academy-logo-275px.png"
              loading="lazy"
              aria-label="Firestarters Academy Logo"
            />
          </p>
          <p>
            Learn from courses designed and delivered by customer experience and industry experts.
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 col-md-4 col-sm-12">
          <div class="academy-callout">
            <span class="white">Adopt</span><br/>
            Customer<br/> 
            Centricity
          </div>
          <div class="academy-callout-text">
            Invest in your customer and develop as the change agent needed for your company.
          </div>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12">
          <div class="academy-callout">
            <span class="white">Learn</span><br/>
            Business<br/>
            Skills
          </div>
          <div class="academy-callout-text">
            Advance your career  and grow your business by staying up to date on the latest trends and topics.
          </div>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12">
          <div class="academy-callout">
            <span class="white">Grow</span><br/>Industry
            <br/>Knowledge
          </div>
          <div class="academy-callout-text">
            Earn badges and certifications to show that you are recognized as a true Firestarter.
          </div>
        </div>
        <div class="col-lg-12 col-md-12 col-sm-12">
          <p>
            <strong>How it works:</strong>
            <ol>
              <li>Register for a Course</li>
              <li>Attend the Course</li>
              <li>Take the Quiz (Don't worry, we'll send you the link)</li>
              <li>Pass the Quiz, Earn Your Badge!</li>
              <li>Share Your Badge on LinkedIn and Build Your Personal Brand</li>
            </ol>
          </p>
          <event-past-card :et_id="4"></event-past-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useMeta } from "vue-meta";
import JumbotronPage from "@/components/layout/JumbotronPage.vue";
import BaseLoader from "@/components/ui/BaseLoader.vue";
import EventCard from "@/components/layout/EventCard.vue";
import EventPastCard from "@/components/layout/EventPastCard.vue";

export default {
  components: {
    JumbotronPage,
    BaseLoader,
    EventCard,
    EventPastCard,
  },

  setup() {
    useMeta({
      title: "Academy - Firestarters",
      description:
        "Members are able to expand your knowledge and energize your business.  Earn a badge and develop your path to certification.​",
    });
  },

  data() {
    return {
      pageImage: "page-banner-academy",
      pageTitle:
        "Discover Our Virtual & <span class='yellow'>Live Courses.</span>",
      pageSubTitle: "Be More Effective",
      pageMessage:
        "Members are able to expand your knowledge and energize your business.  Earn a badge and develop your path to certification​.",
      loading: false,
      error: null,
    };
  },
};
</script>

<style scoped>
/*Some styles here support older iPhone responsiveness.*/

p {
  font-size: 0.875rem;
  padding: 0rem 2.25rem;
}

.academy-callout {
  display:block;
  padding: 1rem 3rem;
  margin: 1rem;
  background-image: linear-gradient(to bottom right, #fcbf49, #f77f00);
  text-align:center;
  font-family: "Roboto Black", Arial, Helvetica, sans-serif !important;
  font-size: 1.75rem;
  text-transform: uppercase;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.academy-callout-text {
  display:block;
  padding: 1rem 3rem;
  margin: 1rem;
  text-align:center;
  font-family: "Roboto Condensed", Arial, Helvetica, sans-serif !important;
  font-size: 1.25rem;
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  p {
    font-size: 1rem;
    font-weight: normal;
    margin: 1rem 0.25rem;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  p {
    font-size: 1rem;
    font-weight: normal;
    margin: 1rem 0.25rem;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  p {
    font-size: 1.15rem;
    font-weight: normal;
    margin: 1rem 2rem;
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  p {
    font-size: 1.15rem;
    font-weight: normal;
    margin: 1rem 2rem;
  }
}
</style>
