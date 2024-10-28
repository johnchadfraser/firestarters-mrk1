<template>
  <div v-if="loading">
    <base-loader></base-loader>
  </div>

  <div v-else>
    <div class="row" v-if="insights.length !== 0">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <h1 class="diamond-icon">Our Latest Insights</h1>
      </div>
    </div>

    <div class="row" v-for="(insight, index) in insights" :key="insight.c_id">
      <div class="col-lg-12 col-md-12 col-sm-12 pb" v-if="index == 0">
        <!--Insight image-->
        <router-link
          :to="{
            path: '/insights/' + insight.c_id + '/' + insight.c_canonical_title,
          }"
        >
          <img
            role="img"
            v-lazy="{ src: getImage(insight.imgt_path, insight.img_file) }"
            class="img-fluid"
            aria-label="insight image"
          />
        </router-link>

        <!--Insight title-->
        <h1>
          <router-link
            :to="{
              path:
                '/insights/' + insight.c_id + '/' + insight.c_canonical_title,
            }"
            class="link-no-underline"
            >{{ insight.c_title }}</router-link
          >
        </h1>

        <!--Insight tags-->
        <p v-html="splitJoin(insight.c_tag)"></p>

        <!--Insight industry-->
        <p>
          <insight-industry-rel
            :c_id="parseInt(insight.c_id)"
          ></insight-industry-rel>
        </p>

        <!--Insight details-->
        <p>
          {{ insight.c_caption }}
        </p>

        <!--Insight author and date info-->
        <p class="content-author">
          <content-author-user
            :c_id="parseInt(insight.c_id)"
            :c_read_time="insight.c_read_time"
            :align="`justify-content: left;`"
          ></content-author-user>
        </p>

        <p class="content-author">
          <router-link
            :to="{
              path:
                '/insights/' + insight.c_id + '/' + insight.c_canonical_title,
            }"
            class="btn btn-primary btn-sm"
            >Read the Full Article</router-link
          >
          <insight-document
            :insightid="parseInt(insight.c_id)"
          ></insight-document>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import BaseLoader from "../../components/ui/BaseLoader.vue";
import InsightDocument from "../../components/layout/InsightDocument.vue";
import InsightIndustryRel from "../../components/layout/InsightIndustryRel.vue";
import ContentAuthorUser from "../../components/layout/ContentAuthorUser.vue";
const axios = require("axios");
const moment = require("moment-mini");

export default {
  components: {
    BaseLoader,
    InsightDocument,
    InsightIndustryRel,
    ContentAuthorUser,
  },

  data() {
    function dateNowFormat(value) {
      return moment.utc(value).format(process.env.VUE_APP_DATEFORMAT);
    }

    return {
      insights: {},
      loading: false,
      error: null,
      dateNow: dateNowFormat(Date.now()),
    };
  },

  mounted() {
    this.getInsight();
  },

  methods: {
    getInsight() {
      //Show loading
      this.loading = true;

      //Initialize controller.
      const insightController = new AbortController();

      //Get data.
      axios
        .get(
          process.env.VUE_APP_API_URL +
            "/" +
            process.env.VUE_APP_API_CONTENT_ROUTE,
          {
            params: {
              order_by: "c_date_posted DESC",
              c_date_gte: this.dateNow,
              c_data_exp: this.dateNow,
              status_id: 1,
            },
          },
          { signal: insightController.signal }
        )

        .then((res) => {
          this.insights = res.data;
        })

        .catch((error) => {
          console.log("An error occured getting user: " + error.response.data);
        })

        .finally(() => {
          this.loading = false;

          //Close request.
          insightController.abort();
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

    splitJoin(str) {
      let badge =
        "<style>.badge {font-weight:400; text-transform:lowercase; padding:0.375rem 0.75rem; margin-right:0.375rem; margin-bottom:0.5rem;} .badge-primary { background-color:#003049 !important; }</style>";
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
  margin: 1rem 2.25rem 1rem;
}

p {
  font-size: 0.875rem;
  padding: 0rem 2.25rem;
}

.img-fluid {
  display: block;
  border-radius: 0.25rem;
  width: 80%;
  margin: 0rem 2.25rem;
}

.content-author {
  display: block;
  clear: both;
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  h1 {
    font-size: 1.75rem;
    margin: 1.5rem 2.25rem 1rem;
  }

  p {
    font-size: 1rem;
    font-weight: normal;
    margin: 1rem 0.25rem;
  }

  .img-fluid {
    display: block;
    border-radius: 0.25rem;
    width: 85%;
    margin: 0rem 2.25rem;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  h1 {
    font-size: 2rem;
    margin: 1.5rem 2.25rem 1rem;
  }

  p {
    font-size: 1rem;
    font-weight: normal;
    margin: 1rem 0.25rem;
  }

  .img-fluid {
    display: block;
    border-radius: 0.35rem;
    width: 90%;
    margin: 0rem 2.25rem;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  h1 {
    font-size: 2.5rem;
    margin: 2rem 4.5rem 1rem;
  }

  p {
    font-size: 1.15rem;
    font-weight: normal;
    margin: 1rem 2.5rem;
  }

  .img-fluid {
    display: block;
    border-radius: 0.5rem;
    width: 85%;
    margin: 0rem 4.5rem;
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  h1 {
    font-size: 3rem;
    margin: 2rem 4rem 1rem;
  }

  p {
    font-size: 1.15rem;
    font-weight: normal;
    margin: 1rem 2rem;
  }

  .img-fluid {
    display: block;
    border-radius: 0.65rem;
    width: 88%;
    margin: 0rem 4.25rem;
  }
}
</style>
