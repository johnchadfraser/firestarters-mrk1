<template>
  <div>
    <h1 class="headline" v-if="insightsRelatedRel.length > 0">
      Related Insights
    </h1>
    <div v-if="loading">
      <base-loader></base-loader>
    </div>

    <div
      v-else
      v-for="(insight, index) in insightsRelatedRel"
      :key="insight.id"
    >
      <a
        :href="`/insights/${insight.related_c_id}/${insight.related_c_canonical_title}`"
      >
        <div
          class="ad-container"
          :style="{
            'background-color': adColor.at(index),
            'background-image': `url(${require('@/assets/bg/' +
              adBGTexture.at(index))})`,
          }"
        >
          <img
            v-lazy="{
              src: getImage(
                insight.related_imgt_path,
                insight.related_img_file
              ),
              delay: 0,
            }"
            class="img-fluid ad-image"
            aria-label="Insight image"
          />
          <h1>
            {{ insight.related_c_title }}
          </h1>
          <p style="text-align: center">
            <content-author-user
              :c_id="parseInt(insight.related_c_id)"
              :c_read_time="insight.related_c_read_time"
              :imgSize="`small`"
              :text_align="`text-align: center;`"
            ></content-author-user>
          </p>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import BaseLoader from "@/components/ui/BaseLoader.vue";
import ContentAuthorUser from "@/components/layout/ContentAuthorUser.vue";
const axios = require("axios");
const moment = require("moment-mini");
export default {
  components: {
    BaseLoader,
    ContentAuthorUser,
  },
  props: {
    c_id: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      insightsRelatedRel: {},
      loading: true,
      adColor: ["#EA5F0F", "#363031", "#D52828"],
      adBGTexture: [
        "bg-texture-01.png",
        "bg-texture-02.png",
        "bg-texture-03.png",
      ],
      error: null,
    };
  },

  mounted() {
    this.getInsightRelatedRel();
  },

  methods: {
    getInsightRelatedRel() {
      //Show loading
      this.loading = true;

      //Initialize controller.
      const insightRelatedRelController = new AbortController();

      //Get data.
      axios
        .get(
          process.env.VUE_APP_API_URL +
            "/" +
            process.env.VUE_APP_API_CONTENT_RELATED_REL_ROUTE,
          {
            params: {
              c_id: this.c_id,
              status_id: 1,
            },
          },
          { signal: insightRelatedRelController.signal }
        )

        .then((res) => {
          this.insightsRelatedRel = res.data;
        })

        .catch((error) => {
          console.log("An error occured getting user: " + error.response.data);
        })

        .finally(() => {
          this.loading = false;

          //Close request.
          insightRelatedRelController.abort();
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
    getBGImage(path, file) {
      const imageURL = "/image/" + path + "/" + file;

      return imageURL;
    },
    //Set the date format.
    dateFormat(value) {
      return moment.utc(value).format(process.env.VUE_APP_DATEFORMAT);
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 1.5rem;
  color: #fff;
  text-transform: capitalize;
  margin: 2rem 1rem 0rem;
}

p {
  color: #fff;
  text-align: left;
  padding: 1rem;
}

a {
  text-decoration: none;
}

.headline {
  display: block;
  float: left;
  color: #363031;
  font-size: 1.5rem;
  margin: 2rem 1rem 1rem;
  padding-top: 1rem;
}

.ad-container {
  display: block;
  float: left;
  width: 100%;
  background-color: #777;
  background-size: cover;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
  padding: 1.5rem 0rem;
  text-align: center;
  margin: 0.5rem;
}

.ad-image {
  position: relative;
  margin-top: -1.5rem;
  width: 100%;
  border-radius: 10px 10px 0px 0px;
}
</style>
