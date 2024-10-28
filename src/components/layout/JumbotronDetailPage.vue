<template>
  <div class="jumbotron container p-container rb" :style="bgImage">
    <img
      role="img"
      class="svg-container x-background-icon overlay"
      src="~@/assets/svg/x-background.svg"
      loading="lazy"
      aria-label="background icon"
    />

    <div class="row pt">
      <div class="col-lg-12 col-md-12 col-sm-12" style="height: fit-content">
        <h1 v-html="formatPageTitle(pageTitle)"></h1>
      </div>
      <div class="col-lg-7 col-md-12 col-sm-12" style="height: fit-content">
        <p>
          <!--Insight industry-->
          <insight-industry-rel
            v-if="pageType != 'event'"
            :c_id="parseInt(pageID)"
            :color="true"
          ></insight-industry-rel>

          <!--Insight industry-->
          <event-industry-rel
            v-if="pageType != 'insight'"
            :e_id="parseInt(pageID)"
            :color="true"
          ></event-industry-rel>

          <!--Insight tags-->
          <span class="pt pb" v-html="splitJoin(pageTags)"></span>

          <!--Insight caption (summary)-->
          <span class="caption-title">Summary</span>
          <span v-html="formatPageCaption(pageCaption)"></span>

          <a href="#article" class="arrow-link">Read More</a>
        </p>

        <p v-if="pageTypeID === 4">
          <router-link :to="{ name: 'Academy' }" class="btn btn-sm btn-info"
            >Return to Academy</router-link
          >
        </p>

        <p v-else-if="pageTypeID == 1 || pageTypeID == 2">
          <router-link :to="{ name: 'Events' }" class="btn btn-sm btn-info"
            >Return to Events</router-link
          >
        </p>

        <p v-else>
          <router-link :to="{ name: 'Insights' }" class="btn btn-sm btn-primary"
            >Return to Insights</router-link
          >
        </p>
      </div>
      <div class="col-lg-5 col-md-12 col-sm-12" style="height: fit-content">
        <p class="show-social" v-if="pageAuthorID != 0">
          <span v-if="pageTypeID === 0">
            <content-author-user
              :c_id="parseInt(pageID)"
              :c_read_time="pageReadTime"
              :align="`justify-content: left;`"
            ></content-author-user>
          </span>
          <span v-else>
            <event-author-user
              :user_id="parseInt(pageAuthorID)"
              :pageAuthor="pageAuthor"
              :imgtPath="pageAuthorImagePath"
              :imgFile="pageAuthorImageFile"
              :pageDate="pageDate"
              :align="`justify-content: left;`"
            ></event-author-user>
          </span>
        </p>

        <p class="insight-stats">
          <!--Insight stats-->
          <insight-stats
            v-if="showInsightStats"
            :ref_id="parseInt(pageID)"
          ></insight-stats>

          <!--Social tags-->
          <social-tag
            :title="pageTitle"
            :caption="pageCaption"
            :showShare="true"
            :showTwitter="false"
            :showFacebook="false"
            :showLinkedIn="true"
          >
          </social-tag>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import SocialTag from "@/components/layout/SocialTag.vue";
import ContentAuthorUser from "@/components/layout/ContentAuthorUser.vue";
import EventAuthorUser from "@/components/layout/EventAuthorUser.vue";
import InsightStats from "@/components/layout/InsightStats.vue";
import InsightIndustryRel from "@/components/layout/InsightIndustryRel.vue";
import EventIndustryRel from "@/components/layout/EventIndustryRel.vue";
const moment = require("moment-mini");

export default {
  components: {
    ContentAuthorUser,
    EventAuthorUser,
    SocialTag,
    InsightStats,
    InsightIndustryRel,
    EventIndustryRel,
  },

  props: {
    pageID: {
      type: Number,
      default: 0,
    },

    pageTypeID: {
      type: Number,
      default: 0,
    },

    pageType: {
      type: String,
      default: "",
    },

    pageImagePath: {
      type: String,
      default: "",
    },

    pageImageFile: {
      type: String,
      default: "",
    },

    pageTitle: {
      type: String,
      default: "",
    },

    pageIndustry: {
      type: String,
      default: "Retail",
    },

    pageDate: {
      type: String,
      default: "",
    },

    pageReadTime: {
      type: String,
      default: "",
    },

    showInsightStats: {
      type: Boolean,
    },

    pageTags: {
      type: String,
      default: "",
    },

    pageCaption: {
      type: String,
      default: "",
    },

    pageAuthorID: {
      type: String,
      default: "",
    },

    pageAuthor: {
      type: String,
      default: "",
    },

    pageAuthorImagePath: {
      type: String,
      default: "",
    },

    pageAuthorImageFile: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      bgImage: {
        "background-position": "center center",
        "background-size": "cover",
        "background-image": `url(${this.getImage(
          this.pageImagePath,
          this.pageImageFile
        )})`,
      },
    };
  },

  methods: {
    getImage(pageImagePath, pageImageFile) {
      const imageURL =
        process.env.VUE_APP_CDN_URL +
        "/" +
        process.env.VUE_APP_CDN_REPOSITORY_PATH +
        "/image/" +
        pageImagePath +
        "/" +
        pageImageFile;

      return imageURL;
    },

    formatPageTitle(pageTitle) {
      if (pageTitle.length > 85) {
        return (pageTitle = pageTitle.substring(0, 85) + "...");
        //return pageTitle;
      } else {
        return pageTitle;
      }
    },

    formatPageCaption(str) {
      if (str.length > 256) {
        return (str = str.substring(0, 256) + "...");
        //return pageTitle;
      } else {
        return str;
      }
    },

    //Split the badge tags.
    splitJoin(str) {
      let badge =
        "<style>.badge{font-weight:700;color:#003049;text-transform:lowercase;padding:0.375rem 0.75rem;margin-right:0.375rem;margin-bottom:0.5rem;}.badge-primary{background-color:#FFF !important;}</style>";
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
/* Default Styles */

span {
  display: block;
}

.overlay {
  position: relative;
  background-color: #363031cc;
  z-index: 0;
}

/*Set page banner styles.*/

.badge {
  font-size: 1rem !important;
}

h1 {
  position: relative;
  font-size: 1.5rem;
  color: #fff;
  margin: 3rem 2.25rem 1rem;
  z-index: 2000;
}

.caption-title {
  font-size: 1.25rem;
  text-transform: uppercase;
  font-weight: 700;
}

p {
  font-size: 0.875rem;
  color: #fff;
  padding: 0rem 2.25rem;
}

.btn {
  position: relative;
  z-index: 2000;
}

.show-social {
  display: none;
}

.insight-stats {
  padding-top: 2rem;
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  h1 {
    font-size: 2.5rem;
    color: #fff;
    margin: 4rem 2rem 1rem;
  }

  p {
    font-size: 1rem;
    color: #fff;
    padding: 0rem 2rem;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  h1 {
    font-size: 3.25rem;
    color: #fff;
    margin: 4rem 2.5rem 1rem;
  }

  p {
    font-size: 1rem;
    color: #fff;
    padding: 1rem 2.5rem;
  }
  .caption-title {
    font-size: 1.5rem;
    text-transform: uppercase;
    font-weight: 700;
  }
  .show-social {
    display: block;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  h1 {
    font-size: 4rem;
    color: #fff;
    margin: 5rem 5rem 1rem;
  }

  p {
    font-size: 1.25rem;
    color: #fff;
    padding: 2rem 5rem;
  }
  .badge {
    font-size: 1rem;
  }
  .caption-title {
    font-size: 2rem;
    text-transform: uppercase;
    font-weight: 700;
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  h1 {
    font-size: 3rem;
    color: #fff;
    margin: 5rem 4rem 1rem;
  }

  p {
    font-size: 1.25rem;
    color: #fff;
    padding: 2rem 4rem 0rem;
  }
}
</style>
