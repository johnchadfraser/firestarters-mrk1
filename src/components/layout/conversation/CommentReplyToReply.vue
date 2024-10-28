<template>
  <div
    v-if="userCommentReplyToReply != null"
    class="comment-container-reply-to-reply"
  >
    <div class="comment-detail-reply-to-reply">
      <div class="comment-connector-reply-to-reply"></div>
      <span class="comment-connector-dot-top"></span>
      <span class="comment-connector-replies"></span>
      <span class="comment-connector-dot-bottom"></span>
      <!--Comment user-->
      <social-user
        v-if="parseInt(userCommentReplyToReply.user_id)"
        :userID="parseInt(userCommentReplyToReply.user_id)"
        :imgtPath="userCommentReplyToReply.imgt_path"
        :imgFile="userCommentReplyToReply.img_file"
        imgSize="small"
      ></social-user>
      <span class="social-user-detail">
        <strong
          >{{ userCommentReplyToReply.user_first_name }}
          {{ userCommentReplyToReply.user_last_name }}</strong
        >
        <br />
        <strong
          >{{ dateFormatForNow(userCommentReplyToReply.uc_time_created) }}
        </strong>
      </span>
      <!--Comment post-->
      <span class="comment-post-reply-to-reply">
        {{ userCommentReplyToReply.uc_comment }}
        <!--Comment actions-->
        <div
          class="comment-actions"
          :data-target="isAuthenticated === null ? '#loginModal' : ''"
          :data-toggle="isAuthenticated === null ? 'modal' : ''"
          :type="isAuthenticated === null ? 'button' : ''"
        >
          <!--Like/Dislike-->
          <like
            :likeCount="parseInt(userCommentReplyToReply.uc_like_count)"
            :dislikeCount="parseInt(userCommentReplyToReply.uc_dislike_count)"
            :uc_id="parseInt(userCommentReplyToReply.id)"
          ></like>

          <!--Share-->
          <share
            :ref_id="parseInt(ref_id)"
            :uc_id="parseInt(userCommentReplyToReply.id)"
            :user_id="parseInt(userData.id)"
            :shareCount="parseInt(userCommentReplyToReply.uc_share_count)"
            :toEmail="``"
            :emailSubject="`Firestarters - ${title}`"
            :emailBody="`I'm sharing this with you. I think you might find this valuable, Firestarters - ${shareURL}/insights/${userCommentReplyToReply.ref_id}/${canonicalTitle}`"
          ></share>
        </div>
      </span>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
const moment = require("moment-mini");
const ls = require("@/store/storage/LocalStorage");
import SocialUser from "@/components/layout/SocialUser.vue";
import Share from "@/components/layout/conversation/Share.vue";
import Like from "@/components/layout/conversation/Like.vue";

export default {
  components: {
    SocialUser,
    Share,
    Like,
  },

  props: {
    ref_id: {
      type: Number,
      default: 0,
    },
    userData: {
      type: Object,
    },
    userComment: {
      type: Object,
    },
    title: {
      type: String,
      default: "",
    },
    canonicalTitle: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      isAuthenticated: ls.getStorage("userAuthenticated"),
      userEmail: ls.getStorage("userEmail"),
      userCommentReplyToReply: {},
      error: null,
      shareURL: process.env.VUE_APP_FIRESTARTERS_WEBSITE_URL,
    };
  },

  created() {
    this.getUserCommentReplyToReply(
      this.userComment.uc_parent_id,
      this.userComment.id
    );
  },

  methods: {
    async getUserCommentReplyToReply(uc_id, uc_parent_id) {
      //Initialize controller.
      const userCommentReplyController = new AbortController();

      //Get data.
      await axios
        .get(
          process.env.VUE_APP_API_URL +
            "/" +
            process.env.VUE_APP_API_USER_COMMENT_ROUTE,
          {
            params: {
              ref_id: this.ref_id,
              uc_parent_id: uc_parent_id,
              uc_id: uc_id,
              uct_id: 1,
              status_id: 1,
            },
          },
          { signal: userCommentReplyController.signal }
        )

        .then((res) => {
          this.userCommentReplyToReply = res.data[0];
        })

        .catch((error) => {
          console.log("An error occured getting data: " + error.response.data);
        })

        .finally(() => {
          //Close request.
          userCommentReplyController.abort();
        });
    },
    //Set the date format.
    dateFormat(value) {
      return moment.utc(value).format(process.env.VUE_APP_DATEFORMAT);
    },
    dateFormatForNow(value) {
      return moment.utc(value).fromNow();
    },
  },
};
</script>

<style scoped>
p {
  margin: 1rem 4rem;
}
</style>
