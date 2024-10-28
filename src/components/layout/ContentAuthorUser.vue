<template>
  <div class="author-user" :style="align">
    <div v-for="au in contentAuthorUserRel" :key="au.id">
      <social-user
        :userID="parseInt(au.author_user_id)"
        :imgtPath="au.author_imgt_path"
        :imgFile="au.author_img_file"
        :imgSize="contentAuthorUserRel.length > 1 ? imgSize : 'large'"
      ></social-user>
    </div>
  </div>
  <div>
    <span v-if="contentAuthorUserRel.length > 1">By:<br /></span>
    <span v-else>By: </span>
    <strong>
      <span v-for="(au, index) in contentAuthorUserRel" :key="au.id"
        >{{ au.author_first_name }} {{ au.author_last_name
        }}<span v-if="index < contentAuthorUserRel.length - 1">, </span></span
      ></strong
    >
    <br />
    Posted:
    <strong>{{ dateFormat(contentAuthorUserRel.c_date_posted) }} </strong><br />
    Read Time: <strong>{{ c_read_time }}</strong>
  </div>
</template>

<script>
const axios = require("axios");
const moment = require("moment-mini");
import SocialUser from "../../components/layout/SocialUser.vue";

export default {
  props: {
    c_id: {
      type: Number,
      default: 0,
    },
    c_read_time: {
      type: String,
      default: "2 mins",
    },
    imgSize: {
      type: String,
      default: "large",
    },
    align: {
      type: String,
      default: "justify-content: center;",
    },
  },

  components: {
    SocialUser,
  },

  data() {
    function dateNowFormat(value) {
      return moment.utc(value).format(process.env.VUE_APP_DATEFORMAT);
    }

    return {
      contentAuthorUserRel: {},
      dateNow: dateNowFormat(Date.now()),
    };
  },

  mounted() {
    this.getContentAuthorUserRel(this.c_id);
  },

  methods: {
    getContentAuthorUserRel(id) {
      if (!isNaN(id)) {
        //Show loading
        this.loading = true;

        //Initialize controller.
        const contentAuthorUserRelController = new AbortController();

        //Get data.
        axios
          .get(
            process.env.VUE_APP_API_URL +
              "/" +
              process.env.VUE_APP_API_CONTENT_AUTHOR_USER_REL_ROUTE +
              "/?c_id=" +
              id,
            { signal: contentAuthorUserRelController.signal }
          )

          .then((res) => {
            this.contentAuthorUserRel = res.data;
          })

          .catch((error) => {
            console.log(
              "An error occured getting content author user: " +
                error.response.data
            );
          })

          .finally(() => {
            this.loading = false;

            //Close request.
            contentAuthorUserRelController.abort();
          });
      }
    },
    dateFormat(value) {
      return moment.utc(value).format(process.env.VUE_APP_DATEFORMAT);
    },
  },
};
</script>

<style scoped>
.author-user {
  display: flex;
  width: 100%;
}
</style>
