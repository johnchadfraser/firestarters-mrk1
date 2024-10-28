<template>
  <metainfo></metainfo>

  <jumbotron-page
    :pageImage="pageImage"
    :pageTitle="pageTitle"
    :pageSubTitle="pageSubTitle"
    :pageMessage="pageMessage"
  ></jumbotron-page>

  <div class="container p-container pt rb">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <h1 class="diamond-icon">What is the Firestarters Community</h1>

        <p>
          It is a global gathering of people that have Customer Experience in
          their DNA and want to exchange together in a safe and open
          environment. Think about a group of friends & colleagues that share a
          hobby and meet regularly to discuss the latest developments, points of
          views and seek advice from each other on a number of business topics.
        </p>
      </div>
    </div>

    <div class="row">
      <div
        class="col-lg-12 col-md-12 col-sm-12"
        v-for="video in videos"
        :key="video.id"
      >
        <video-player
          :videoSrc="video.vst_url + video.v_source_id"
          :videoTitle="video.c_title"
        ></video-player>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <h1 class="diamond-icon">Who is part of this community?</h1>

        <p>
          Business stakeholders across different industries and regions all
          around the world.
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <h1 class="diamond-icon">Where does it take place?</h1>

        <ul>
          <li>
            Members are welcome at anytime to jump on the site and review
            content and (coming soon) submit your own articles, best practices,
            and engage with other members
          </li>
          <li>Virtual events: 1 meeting/month, 1 hour in length</li>
          <li>
            Virtual events are focused on existing insights found on this site.
          </li>
          <li>Discussion based and topics are crowd sourced</li>
        </ul>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <h1 class="diamond-icon">Your Benefits</h1>

        <ul class="list">
          <li>
            <span class="font-weight-bold">Exchange and learn</span> from
            business stakeholders across the world and across many industries.
          </li>
          <li>
            <span class="font-weight-bold">Open environment</span> - we
            appreciate a diversity of thoughts where there is no right or wrong
            answer. We value your thoughts and point of views!
          </li>
          <li>
            <span class="font-weight-bold">Safe environment</span> as there is
            no one focused on selling any products / services to you. This
            community is not used for any commercial purpose.
          </li>
          <li>
            <span class="font-weight-bold">Expanding your network</span> with
            business professionals.
          </li>
          <li>
            <span class="font-weight-bold">Problem solve and discuss</span>
            topics affecting your businesses—not platform related.
          </li>
        </ul>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <h1 class="diamond-icon">Discover our online self-assist tools</h1>
      </div>

      <div class="col-lg-6 col-md-6">
        <flash-card></flash-card>
      </div>

      <div class="col-lg-6 col-md-6">
        <benefits-calculator-card></benefits-calculator-card>
      </div>
    </div>
  </div>
</template>

<script>
import { useMeta } from "vue-meta";
import JumbotronPage from "../components/layout/JumbotronPage.vue";
import VideoPlayer from "../components/layout/VideoPlayer.vue";
import FlashCard from "../components/layout/FlashCard.vue";
import BenefitsCalculatorCard from "../components/layout/BenefitsCalculatorCard.vue";
const axios = require("axios");
const moment = require("moment-mini");

export default {
  components: {
    JumbotronPage,
    VideoPlayer,
    FlashCard,
    BenefitsCalculatorCard,
  },

  setup() {
    useMeta({
      title: "About Us - Firestarters",
      description:
        "Create an exclusive member owned platform where business practitioners and leaders can expand their knowledge and edify each other through sharing insights, experiences, learnings, and perspectives.",
    });
  },

  data() {
    function dateNowFormat(value) {
      return moment.utc(value).format(process.env.VUE_APP_DATEFORMAT);
    }

    return {
      pageImage: "page-banner-about-us",
      pageTitle:
        "A truly global thought leadership <span class='yellow'>community.</span>",
      pageSubTitle: "Our Vision",
      pageMessage:
        "Create an exclusive member owned platform where business practitioners and leaders can expand their knowledge and edify each other through sharing insights, experiences, learnings, and perspectives.",
      videos: {},
      loading: false,
      error: null,
      dateNow: dateNowFormat(Date.now()),
    };
  },

  mounted() {
    //Show loading
    this.loading = true;

    //Get data.
    axios
      .get(
        process.env.VUE_APP_API_URL +
          "/" +
          process.env.VUE_APP_API_CONTENT_VIDEO_REL_ROUTE,
        {
          params: {
            v_id: 2,
            e_date_gte: this.dateNow,
            status_id: 1,
          },
        }
      )

      .then((res) => {
        this.videos = res.data;
      })

      .catch((error) => {
        console.log("No data was found: " + error.response.data);

        return "Sorry, but no data was returned.";
      })

      .finally(() => (this.loading = false));
  },

  methods: {
    dateFormat(value) {
      return moment.utc(value).format(process.env.VUE_APP_DATEFORMAT);
    },
  },
};
</script>

<style scoped>
/*Some styles here support older iPhone responsiveness.*/

h1 {
  font-size: 1.5rem;
  margin: 0rem 2rem 1rem;
}

h2 {
  font-size: 1.25rem;
  margin: 1rem 1.5rem;
}

h3 {
  font-size: 1.15rem;
  margin: 1rem 1.5rem;
}

p {
  padding: 0rem 2.25rem;
}

ul {
  margin: 0rem 4rem 1rem 2.25rem;
}

li {
  padding: 0.5rem 0rem;
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  h1 {
    font-size: 1.75rem;
    margin: 0rem 2rem 1rem;
  }

  h2 {
    font-size: 1.65rem;
    margin: 0rem 2rem;
  }

  h3 {
    font-size: 1.5rem;
    margin: 0rem 2rem;
  }

  p {
    font-size: 1rem;
    font-weight: normal;
    margin: 1rem 2rem;
  }

  ul {
    margin: 1rem 3rem 2rem;
  }

  li {
    font-size: 1rem;
    font-weight: normal;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  h1 {
    font-size: 2rem;
    margin: 1.5rem 2.25rem 1rem;
  }

  h2 {
    font-size: 1.75rem;
    margin: 0rem 4rem;
  }

  h3 {
    font-size: 1.5rem;
    margin: 0rem 2.5rem;
  }

  p {
    font-size: 1rem;
    font-weight: normal;
    margin: 1rem 2.75rem;
  }

  ul {
    margin: 1rem 3.5rem 2rem;
  }

  li {
    font-size: 1rem;
    font-weight: normal;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  h1 {
    font-size: 2.5rem;
    margin: 5rem 4.5rem 1rem;
  }

  h2 {
    font-size: 2rem;
    margin: 0rem 4.75rem;
  }

  h3 {
    font-size: 1.75rem;
    margin: 0rem 5.25rem;
  }

  p {
    font-size: 1.15rem;
    font-weight: normal;
    margin: 1rem 5.5rem;
  }

  ul {
    margin: 1rem 6.5rem 2rem;
  }

  li {
    font-size: 1.15rem;
    font-weight: normal;
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  h1 {
    font-size: 3rem;
    margin: 2rem 4rem 1rem;
  }

  h2 {
    font-size: 2.5rem;
    padding: 0.625rem 3.5rem;
    margin: 0rem 4rem;
  }

  h3 {
    font-size: 2.25rem;
    padding: 0.5rem 3rem;
    margin: 2rem 4.5rem;
  }

  p {
    font-size: 1.15rem;
    font-weight: normal;
    margin: 1rem 5.6rem;
  }

  ul {
    margin: 0rem 6.25rem;
  }

  li {
    font-size: 1.15rem;
    font-weight: normal;
  }
}
</style>
