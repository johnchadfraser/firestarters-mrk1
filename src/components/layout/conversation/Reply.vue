<template>
  <!--Reply-->
  <a :id="`reply${userComment.id}`"></a>
  <span class="reply-container" v-if="replyTextArea">
    <div class="reply-comment-message" v-if="showReplyCommentMessage">
      {{ replyCommentMessage }}
    </div>
    <social-user
      :userID="parseInt(userData[0].id)"
      :imgtPath="userData[0].imgt_path"
      :imgFile="userData[0].img_file"
      imgSize="small"
      class="social-user"
    ></social-user>
    <!--Post form-->
    <form id="commentForm" @submit.prevent="postReplyComment">
      <span class="reply-comment">
        <textarea
          name="uc_comment"
          class="form-control form-control-sm"
          placeholder="What's your reply?"
          v-model="form.uc_comment"
          :rows="replyTextArea ? 3 : 1"
        ></textarea>
      </span>
      <br />
      <button
        type="submit"
        role="button"
        class="btn btn-sm btn-primary float-right"
      >
        Post a Reply
      </button>
      <input type="hidden" name="uc_parent_id" :v-model="form.uc_parent_id" />
      <input type="hidden" name="uc_id" v-model="form.uc_id" />
      <input type="hidden" name="ref_id" v-model="form.ref_id" />
    </form>
  </span>
  <span class="reply-action">
    <a
      href="#"
      class="reply-link"
      @click.prevent="isAuthenticated === true ? openReply() : ''"
      :data-anchor="`#reply${userComment.id}`"
      :data-target="isAuthenticated === null ? '#loginModal' : ''"
      :data-toggle="isAuthenticated === null ? 'modal' : ''"
      :type="isAuthenticated === null ? 'button' : ''"
      >Reply</a
    >
  </span>
</template>

<script>
const axios = require("axios");
const moment = require("moment-mini");
const ls = require("@/store/storage/LocalStorage");
import SocialUser from "@/components/layout/SocialUser.vue";
export default {
  components: {
    SocialUser,
  },
  props: {
    userData: {
      type: Object,
    },
    userComment: {
      type: Object,
    },
  },

  data() {
    return {
      isAuthenticated: ls.getStorage("userAuthenticated"),
      userEmail: ls.getStorage("userEmail"),
      replyTextArea: false,
      showReplyCommentMessage: false,
      replyCommentMessage: "Thank you for your response.",
      error: null,
      form: {
        uc_parent_id: this.userComment.id,
        uc_comment: "",
        uc_id: this.userComment.uc_parent_id,
        ref_id: this.userComment.ref_id,
      },
    };
  },

  methods: {
    async postReplyComment() {
      if (this.form.uc_comment === "" || this.form.uc_comment === null) {
        this.replyCommentMessage = "Please respond with a complete message.";
        this.showReplyCommentMessage = true;
        setTimeout(() => (this.showReplyCommentMessage = false), 3000);
      } else {
        //Initialize controller.
        const replyCommentController = new AbortController();
        await axios
          .post(
            process.env.VUE_APP_API_URL +
              "/" +
              process.env.VUE_APP_API_USER_COMMENT_ROUTE,
            {
              ref_id: this.form.ref_id,
              uc_parent_id: this.form.uc_parent_id,
              uc_id: this.form.uc_id,
              uc_comment: this.form.uc_comment,
              uct_id: 1,
              ms_id: 2, //Set to approved! May need to apply moderation.
              user_id: this.userData[0].id,
              sort_id: 1,
              status_id: 1,
              signal: replyCommentController.signal,
            }
          )

          .then(() => {
            this.showReplyCommentMessage = true;
            setTimeout(() => (this.replyTextArea = false), 2000);
          })

          .catch((error) => {
            console.log(
              "An error occured posting reply: " + error.response.data
            );
          })

          .finally(() => {
            setTimeout(() => (this.showReplyCommentMessage = false), 3000);

            //Close request.
            replyCommentController.abort();
          });
      }
    },
    openReply() {
      this.replyTextArea = !this.replyTextArea;
    },
    closeReply() {
      this.replyTextArea = false;
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
.social-user {
  display: block;
  float: left;
}

.reply-action {
  display: block;
  float: left;
  padding: 0rem 1rem 0rem 0rem;
  border-right: solid 1px #363031;
  margin-right: 1rem;
}

.reply-link {
  color: #8f8d8d;
  text-decoration: none;
}

.reply-container {
  display: block;
  position: relative;
  background-color: #fff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  top: 0px;
  float: left;
  width: 100%;
  border-bottom: solid 1px #dcddde;
  border-radius: 10px;
  padding: 1rem 2rem 2rem;
  margin-bottom: 1rem;
  z-index: 10;
}

.reply-comment {
  display: block;
  float: left;
  width: 100%;
  padding: 1rem 0rem;
}

.reply-comment-message {
  display: block;
  float: left;
  width: 100%;
  color: red;
  padding: 1rem 0rem;
}
</style>
