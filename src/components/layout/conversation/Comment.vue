<template>
  <div class="comment-container">
    <div class="comment-detail">
      <div
        :class="userCommentReply.length > 0 ? 'comment-connector' : ''"
      ></div>
      <!--Comment user-->
      <social-user
        :userID="parseInt(userComment.user_id)"
        :imgtPath="userComment.imgt_path"
        :imgFile="userComment.img_file"
      ></social-user>
      <span class="social-user-detail">
        <strong
          >{{ userComment.user_first_name }}
          {{ userComment.user_last_name }}</strong
        >
        <br />
        <small>{{ dateFormatForNow(userComment.uc_time_created) }}</small>
      </span>
      <!--Comment post-->
      <span class="comment-post">
        {{ userComment.uc_comment }}
        <!--Comment actions-->
        <div
          class="comment-actions"
          :data-target="isAuthenticated === null ? '#loginModal' : ''"
          :data-toggle="isAuthenticated === null ? 'modal' : ''"
          :type="isAuthenticated === null ? 'button' : ''"
        >
          <!--Reply-->
          <reply :userData="userData" :userComment="userComment"></reply>

          <!--Like/Dislike-->
          <like
            :likeCount="parseInt(userComment.uc_like_count)"
            :dislikeCount="parseInt(userComment.uc_dislike_count)"
            :uc_id="parseInt(userComment.id)"
          ></like>

          <!--Share-->
          <share
            :shareCount="parseInt(userComment.uc_share_count)"
            :toEmail="``"
            :emailSubject="`Firestarters - ${title}`"
            :emailBody="`I'm sharing this with you. I think you might find this valuable, Firestarters - ${shareURL}/insights/${userComment.ref_id}/${canonicalTitle}`"
          ></share>
        </div>
      </span>
    </div>
    <div v-for="(reply, index) in userCommentReply" :key="reply.id">
      <div class="comment-container-reply">
        <div class="comment-detail">
          <span class="comment-connector-reply"></span>
          <span
            :class="
              userCommentReply.length > index + 1
                ? 'comment-connector-replies'
                : ''
            "
          ></span>
          <!--Comment user-->
          <social-user
            :userID="parseInt(reply.user_id)"
            :imgtPath="reply.imgt_path"
            :imgFile="reply.img_file"
            imgSize="small"
          ></social-user>
          <span class="social-user-detail">
            <strong
              >{{ reply.user_first_name }} {{ reply.user_last_name }}</strong
            >
            <br />
            <small>{{ dateFormatForNow(reply.uc_time_created) }}</small>
          </span>
          <!--Comment post-->
          <div class="comment-post-reply">
            {{ reply.uc_comment }}
            <!--Comment actions-->
            <div
              class="comment-actions"
              :data-target="userData.user_email === null ? '#loginModal' : ''"
              :data-toggle="userData.user_email === null ? 'modal' : ''"
              :type="userData.user_email === null ? 'button' : ''"
            >
              <!--Reply-->
              <reply :userData="userData" :userComment="reply"></reply>

              <!--Like/Dislike-->
              <like
                :likeCount="parseInt(reply.uc_like_count)"
                :dislikeCount="parseInt(reply.uc_dislike_count)"
                :uc_id="parseInt(reply.id)"
              ></like>

              <!--Share-->
              <share
                :ref_id="parseInt(ref_id)"
                :uc_id="parseInt(reply.id)"
                :user_id="parseInt(userData.id)"
                :shareCount="parseInt(reply.uc_share_count)"
                :toEmail="``"
                :emailSubject="`Firestarters - ${title}`"
                :emailBody="`I'm sharing this with you. I think you might find this valuable, Firestarters - ${shareURL}/insights/${reply.ref_id}/${canonicalTitle}`"
              ></share>
            </div>
          </div>
        </div>
        <comment-reply-to-reply
          :ref_id="parseInt(ref_id)"
          :userData="userData"
          :userComment="reply"
          :title="title"
          :canonicalTitle="canonicalTitle"
        >
        </comment-reply-to-reply>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
const moment = require("moment-mini");
const ls = require("@/store/storage/LocalStorage");
import CommentReplyToReply from "@/components/layout/conversation/CommentReplyToReply.vue";
import SocialUser from "@/components/layout/SocialUser.vue";
import Reply from "@/components/layout/conversation/Reply.vue";
import Share from "@/components/layout/conversation/Share.vue";
import Like from "@/components/layout/conversation/Like.vue";

export default {
  components: {
    CommentReplyToReply,
    SocialUser,
    Reply,
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
      userCommentReply: {},
      userCommentReplyToReply: {},
      error: null,
      shareURL: process.env.VUE_APP_FIRESTARTERS_WEBSITE_URL,
    };
  },

  watch: {
    userComment: function (val) {
      console.log("Value changed: " + val);
    },
  },

  mounted() {
    this.getUserCommentReply(this.userComment.id);
  },

  methods: {
    async getUserCommentReply(uc_parent_id, uc_id) {
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
          this.userCommentReply = res.data;
        })

        .catch((error) => {
          console.log("An error occured getting data: " + error.response.data);
        })

        .finally(() => {
          //Close request.
          userCommentReplyController.abort();
        });
    },
    async getUserCommentReplyToReply(uc_parent_id, uc_id) {
      //Initialize controller.
      const userCommentReplyToReplyController = new AbortController();

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
          { signal: userCommentReplyToReplyController.signal }
        )

        .then((res) => {
          this.userCommentReplyToReply = res.data;
        })

        .catch((error) => {
          console.log("An error occured getting data: " + error.response.data);
        })

        .finally(() => {
          //Close request.
          userCommentReplyToReplyController.abort();
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

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  h1 {
    font-size: 1.5rem;
    margin: 3rem 4rem 1.5rem;
  }

  p {
    margin: 1rem 4rem;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  h1 {
    font-size: 1.5rem;
    margin: 3rem 4rem 1.5rem;
  }

  p {
    margin: 1rem 4rem;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  h1 {
    font-size: 1.5rem;
    margin: 3rem 4rem 1.5rem;
  }

  p {
    margin: 1rem 4rem;
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  h1 {
    font-size: 1.5rem;
    margin: 3rem 4rem 1.5rem;
  }

  p {
    margin: 1rem 4rem;
  }
}
</style>
