<template>
  <div class="author-user" :style="align">
    <social-user
      :userID="parseInt(user_id)"
      :imgtPath="imgtPath"
      :imgFile="imgFile"
      :imgSize="imgSize"
    ></social-user>
  </div>
  <div>
    Hosted By:
    <strong>
      {{ pageAuthor }}
    </strong>
    <br />
    Posted:
    <strong>{{ dateFormat(e_date_posted) }} </strong>
  </div>
</template>

<script>
const moment = require("moment-mini");
import SocialUser from "../../components/layout/SocialUser.vue";

export default {
  props: {
    user_id: {
      type: Number,
      default: 0,
    },
    pageAuthor: {
      type: String,
      default: "",
    },
    imgtPath: {
      type: String,
      default: "user",
    },
    imgFile: {
      type: String,
      default: "avatar-default.png",
    },
    imgSize: {
      type: String,
      default: "large",
    },
    pageDate: {
      type: String,
      default: "",
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
      dateNow: dateNowFormat(Date.now()),
    };
  },

  methods: {
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
