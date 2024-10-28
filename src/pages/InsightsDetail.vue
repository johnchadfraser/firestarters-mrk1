<template>
  <div v-if="loading">
    <base-loader></base-loader>
  </div>

  <div v-else v-for="insight in insights" :key="insight.c_id">
    <meta-head
      :title="insight.c_title"
      :description="insight.c_caption"
      :ogImageTypePath="insight.imgt_path"
      :ogImage="insight.img_file"
    ></meta-head>

    <jumbotron-detail-page
      :pageID="parseInt(insight.c_id)"
      :pageTypeID="parseInt(0)"
      pageType="insight"
      :pageImagePath="insight.imgt_path"
      :pageImageFile="insight.img_file"
      :pageTitle="insight.c_title"
      :pageCaption="`${insight.c_caption}`"
      :pageDate="insight.c_date_posted"
      :pageReadTime="insight.c_read_time"
      :showInsightStats="true"
      :pageTags="insight.c_tag"
      :pageAuthorID="insight.author_user_id"
      :pageAuthor="`${insight.author_first_name} ${insight.author_last_name}`"
      :pageAuthorImagePath="insight.author_imgt_path"
      :pageAuthorImageFile="insight.author_img_file"
    ></jumbotron-detail-page>
    <div id="article" class="container p-container pt pb rb">
      <p :class="showTitle > 200 ? 'hide-title-scroll' : `show-title-scroll`">
        ▼ Scroll to continue with the article...
      </p>
      <div
        class="row"
        :class="showTitle > 200 ? 'show-title-scroll' : `hide-title-scroll`"
      >
        <div class="col-lg-9 col-md-12 col-sm-12">
          <!--Insight Title-->
          <h1>
            {{ insight.c_title }}
          </h1>

          <p>
            <!--Insight author-->
            <content-author-user
              :c_id="parseInt(insight.c_id)"
              :c_read_time="insight.c_read_time"
              :align="`justify-content: left;`"
            ></content-author-user>

            <!--Insight document(s)-->
            <span class="insight-document">
              <insight-document
                :insightid="parseInt(insight.c_id)"
              ></insight-document>
            </span>
          </p>

          <!--Insight video(s)-->
          <p v-for="video in videos" :key="video.id">
            <video-player
              :videoSrc="video.vst_url + video.v_source_id"
              :videoTitle="video.c_title"
              :videoDisplay="`article`"
            ></video-player>
          </p>

          <!--Insight details-->
          <p class="insight-story" v-html="insight.c_story"></p>

          <p>
            <a href="#article" class="link">Top ▲</a> |
            <a
              :href="`${feedbackURL}?insightTitle=${insight.c_title}`"
              class="link"
              target="_blank"
              >Feedback</a
            >
          </p>

          <!--Conversation-->
          <p>
            <conversation
              :ref_id="parseInt(insight.c_id)"
              :title="insight.c_title"
              :canonicalTitle="insight.c_canonical_title"
            ></conversation>
          </p>
        </div>

        <div class="right-col col-lg-3 col-md-12 col-sm-12">
          <member-ad></member-ad>
          <feedback-survey-ad :title="insight.c_title"></feedback-survey-ad>
          <insight-related :c_id="parseInt(insight.c_id)"></insight-related>
          <academy-ad></academy-ad>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MetaHead from "@/components/layout/MetaHead.vue";
import JumbotronDetailPage from "@/components/layout/JumbotronDetailPage.vue";
import BaseLoader from "@/components/ui/BaseLoader.vue";
import InsightDocument from "@/components/layout/InsightDocument.vue";
import InsightRelated from "@/components/layout/InsightRelated.vue";
import ContentAuthorUser from "@/components/layout/ContentAuthorUser.vue";
import AcademyAd from "@/components/layout/ads/AcademyAd.vue";
import MemberAd from "@/components/layout/ads/MemberAd.vue";
import FeedbackSurveyAd from "@/components/layout/ads/FeedbackSurveyAd.vue";
import Conversation from "@/components/layout/conversation/Conversation.vue";
import VideoPlayer from "@/components/layout/VideoPlayer.vue";
const axios = require("axios");
const moment = require("moment-mini");

export default {
  components: {
    MetaHead,
    JumbotronDetailPage,
    BaseLoader,
    InsightDocument,
    InsightRelated,
    VideoPlayer,
    ContentAuthorUser,
    AcademyAd,
    MemberAd,
    FeedbackSurveyAd,
    Conversation,
  },

  data() {
    function dateNowFormat(value) {
      return moment.utc(value).format(process.env.VUE_APP_DATEFORMAT);
    }

    return {
      insights: {},
      documents: {},
      videos: {},
      userFieldRel: {},
      loading: true,
      error: null,
      id: this.$route.params.id,
      dateNow: dateNowFormat(Date.now()),
      showTitle: 0,
      feedbackURL: process.env.VUE_APP_FIRESTARTERS_FEEDBACK_SURVEY_URL,
    };
  },

  mounted() {
    this.getInsight();
    this.setAnalyticPageView();
  },

  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  methods: {
    getInsight() {
      //Show loading
      this.loading = true;

      //Initialize controller.
      const analyticsPageViewController = new AbortController();

      //Get data.
      axios
        .get(
          process.env.VUE_APP_API_URL +
            "/" +
            process.env.VUE_APP_API_CONTENT_ROUTE,
          {
            params: {
              id: this.id,
              status_id: 1,
            },
          },
          { signal: analyticsPageViewController.signal }
        )

        .then((res) => {
          this.insights = res.data;
        })

        .catch((error) => {
          console.log("An error occured getting user: " + error.response.data);
        })

        .finally(() => {
          //Get insight video if applicable.
          this.getVideo(this.id);

          //Get user field data.
          this.getUserFieldRel(this.insights[0].author_user_id, 1);

          this.loading = false;

          //Close request.
          analyticsPageViewController.abort();
        });
    },

    getVideo(id) {
      //Show loading
      this.loading = true;

      //Initialize controller.
      const videoController = new AbortController();

      //Get data.
      axios
        .get(
          process.env.VUE_APP_API_URL +
            "/" +
            process.env.VUE_APP_API_CONTENT_VIDEO_REL_ROUTE +
            "/?c_id=" +
            id,
          { signal: videoController.signal }
        )

        .then((res) => {
          this.videos = res.data;
        })

        .catch((error) => {
          console.log("An error occured getting user: " + error.response.data);
        })

        .finally(() => {
          this.loading = false;

          //Close request.
          videoController.abort();
        });
    },

    getUserFieldRel(id, uf_id) {
      //Show loading
      this.loading = true;

      //Initialize controller.
      const userFieldRelController = new AbortController();

      //Get data.
      axios
        .get(
          process.env.VUE_APP_API_URL +
            "/" +
            process.env.VUE_APP_API_USER_FIELD_REL_ROUTE +
            "/?user_id=" +
            id +
            "&uf_id=" +
            uf_id,
          { signal: userFieldRelController.signal }
        )

        .then((res) => {
          this.userFieldRel = res.data;
        })

        .catch((error) => {
          console.log("An error occured getting user: " + error.response.data);
        })

        .finally(() => {
          this.loading = false;

          //Close request.
          userFieldRelController.abort();
        });
    },

    async setAnalyticPageView() {
      //Initialize controller.
      const analyticsPageViewController = new AbortController();

      //Get data.
      await axios
        .post(
          process.env.VUE_APP_API_URL +
            "/" +
            process.env.VUE_APP_API_ANALYTICS_PAGE_VIEW_ROUTE,
          {
            ref_id: this.id,
            apvt_id: 1,
            user_id: 1,
            status_id: 1,
          },
          { signal: analyticsPageViewController.signal }
        )

        .catch((error) => {
          console.log("An error occured setting data: " + error.response.data);
        })

        .finally(() => {
          //Close request.
          analyticsPageViewController.abort();
        });
    },

    getImage(path, file) {
      const imageURL =
        process.env.VUE_APP_CDN_URL +
        "/" +
        process.env.VUE_APP_CDN_REPOSITORY_PATH +
        "/image/" +
        path +
        "/" +
        file;

      return imageURL;
    },

    handleScroll() {
      this.showTitle = window.scrollY;
    },

    //Split the badge tags.
    splitJoin(str) {
      let badge =
        "<style>.badge{font-weight:700;text-transform:lowercase;padding:0.375rem 0.75rem;margin-right:0.375rem;margin-bottom:0.5rem;}.badge-primary{background-color:#003049 !important;}</style>";
      const list = str.split(", ");

      list.forEach(function (tag) {
        badge =
          badge +
          '<span class="badge badge-pill badge-primary">' +
          tag +
          "</span>";
      });

      return badge;
    },

    //Set the date format.
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

p {
  font-size: 0.875rem;
  padding: 0rem 2.25rem;
  clear: both;
}

.right-col {
  padding: 1rem 2.25rem 0rem 1.5rem;
}

.insight-story {
  text-align: justify;
}

.show-title-scroll {
  transition-timing-function: ease-in;
  transition: 0.9s;
  /*transform: translateY(0);*/
  height: auto;
}

.hide-title-scroll {
  transition-timing-function: ease-out;
  transition: 0.4s;
  /*transform: translateY(-100%);*/
  opacity: 0;
  height: 0px;
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  h1 {
    font-size: 1.75rem;
    margin: 0rem 2rem 1rem;
  }

  p {
    font-size: 1rem;
    font-weight: normal;
    margin: 1rem 0rem;
  }

  .right-col {
    padding: 1rem 3.5rem 0rem 2.5rem;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  h1 {
    font-size: 2rem;
    margin: 1.5rem 2.5rem 1rem;
  }

  p {
    font-size: 1rem;
    font-weight: normal;
    margin: 1rem 0.75rem;
  }

  .right-col {
    padding: 1rem 4.5rem 0rem 3.5rem;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  h1 {
    font-size: 2.5rem;
    margin: 2rem 4.75rem 1rem;
  }

  p {
    font-size: 1.15rem;
    font-weight: normal;
    margin: 1rem 2.65rem;
  }

  .right-col {
    padding: 1rem 1rem 0rem 0rem;
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  h1 {
    font-size: 3rem;
    margin: 1rem 4rem 1rem;
  }

  p {
    font-size: 1.15rem;
    font-weight: normal;
    margin: 1rem 2rem;
  }

  .insight-document {
    display: block;
    float: right;
    margin: 0rem 0rem 2rem;
  }
}
</style>
