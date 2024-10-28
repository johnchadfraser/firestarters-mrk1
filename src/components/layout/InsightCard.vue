<template>
  <div v-if="loading">
    <base-loader></base-loader>
  </div>

  <div v-else>
    <div class="row">
      <div v-if="insights == ''" class="result">
        No results found, please modify your search.
      </div>

      <div
        v-else
        v-for="(insight, index) in insights"
        :key="insight.c_id"
        style="display: contents"
      >
        <div class="pagination" v-if="index == 0">
          Total Insights By Industry:
          <span class="red">{{ insights.length - 1 }}</span>
        </div>

        <div
          class="col-lg-6 col-md-12 col-sm-12"
          v-if="index > 0 || insights.length == 1"
        >
          <div class="pb" :id="insight.c_canonical_title.replaceAll('-', '')">
            <router-link
              :to="{
                path:
                  '/insights/' + insight.c_id + '/' + insight.c_canonical_title,
              }"
            >
              <img
                v-lazy="{
                  src: getImage(insight.imgt_path, insight.img_file),
                  delay: 0,
                }"
                class="img-fluid"
                aria-label="Insight image"
              />
            </router-link>

            <!--Insight title-->
            <h1>
              <router-link
                :to="{
                  path:
                    '/insights/' +
                    insight.c_id +
                    '/' +
                    insight.c_canonical_title,
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
                :imgSize="`small`"
                :align="`justify-content: left;`"
              ></content-author-user>
            </p>

            <p style="clear: left">
              <router-link
                :to="{
                  path:
                    '/insights/' +
                    insight.c_id +
                    '/' +
                    insight.c_canonical_title,
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
    </div>
  </div>
</template>

<script>
import BaseLoader from "../../components/ui/BaseLoader.vue";
import InsightIndustryRel from "../../components/layout/InsightIndustryRel.vue";
import InsightDocument from "../../components/layout/InsightDocument.vue";
import ContentAuthorUser from "../../components/layout/ContentAuthorUser.vue";
const axios = require("axios");
const moment = require("moment-mini");

export default {
  props: {
    kw: String,
    industry: Number,
  },

  components: {
    BaseLoader,
    InsightIndustryRel,
    InsightDocument,
    ContentAuthorUser,
  },

  data() {
    return {
      insights: {},
      loading: false,
      error: null,
      disable: false,
      pageSize: 30,
      columns: [
        {
          images: [],
          page: 1,
          visible: true,
        },
        {
          images: [],
          page: 1,
          visible: true,
        },
      ],
    };
  },

  mounted() {
    this.getInsight();
  },

  updated() {
    //Go to hash.
    this.$nextTick(() => {
      if (this.$route.hash) {
        const el = document.querySelector(this.$route.hash);
        el && el.scrollIntoView({ block: "center", behavior: "smooth" });
      }
    });
  },

  watch: {
    kw(v) {
      const arg1 = v;
      const arg2 = this.$props.industry;

      this.getInsightSearch(arg1, arg2);
    },

    industry(v) {
      const arg1 = this.$props.kw;
      const arg2 = v;

      this.getInsightSearch(arg1, arg2);
    },
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

    getInsightSearch(arg1, arg2) {
      //Show loading
      this.loading = true;

      //Initialize controller.
      const insightController = new AbortController();

      //Get data.
      axios
        .get(
          process.env.VUE_APP_API_URL +
            "/" +
            process.env.VUE_APP_API_CONTENT_INDUSTRY_REL_ROUTE,
          {
            params: {
              order_by: "c_date_posted ASC",
              c_date_gte: this.dateNow,
              c_data_exp: this.dateNow,
              kw: arg1,
              i_id: arg2,
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
        "<style>.badge{font-weight:400;text-transform:lowercase;padding:0.375rem 0.75rem;margin-right:0.375rem;margin-bottom:1rem;}.badge-primary{background-color:#003049 !important;}</style>";
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
  margin: 1rem 2.25rem;
}

.result {
  font-size: 0.875rem;
  margin: 0rem 3rem 2rem;
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
    margin: 1rem 2.25rem;
  }

  .result {
    font-size: 1rem;
    margin: 0rem 3rem 2rem;
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
    margin: 1rem 2.25rem;
  }

  .result {
    font-size: 1rem;
    margin: 0rem 3rem 2rem;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  h1 {
    font-size: 2rem;
    margin: 2rem 4rem 1rem;
  }

  p {
    font-size: 1.15rem;
    font-weight: normal;
    margin: 1rem 2rem;
  }

  .img-fluid {
    display: block;
    border-radius: 0.5rem;
    width: 75%;
    margin: 1rem 4rem;
  }

  .result {
    font-size: 1rem;
    margin: 0rem 5.5rem 2rem;
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  h1 {
    font-size: 2rem;
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
    width: 75%;
    margin: 0rem 4.25rem;
  }

  .result {
    font-size: 1rem;
    margin: 0rem 5.5rem 2rem;
  }
}
</style>
