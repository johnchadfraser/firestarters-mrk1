<template>
  <div v-if="loading">
    <base-loader></base-loader>
  </div>
  <div v-else>
    <h1>
      Conversation
      <span class="comment-count" v-if="userComment.length > 1"
        >{{ userComment.length }} Comments</span
      >
    </h1>
    <div class="comment-container">
      <span class="comment-user" v-for="ud in userData" :key="ud.id">
        <social-user
          :userID="parseInt(ud.user_id)"
          :imgtPath="ud.imgt_path"
          :imgFile="ud.img_file"
        ></social-user>
        <span class="social-user-detail">
          {{ ud.user_first_name }} {{ ud.user_last_name }}<br />
          <span class="small"
            >Joined Firestarters {{ dateFormatForNow(ud.user_time_created)
            }}<br />
            <div v-if="isAuthenticated === true">
              <router-link :to="{ name: 'Profile' }" class="link"
                >Update Profile?</router-link
              >
            </div>
            <div v-else>
              <a
                class="link"
                data-toggle="modal"
                data-dismiss="modal"
                data-target="#loginModal"
                >Log In</a
              >
            </div>
          </span>
        </span>
      </span>
      <!--Post form-->
      <div class="comment-message" v-if="showCommentMessage">
        {{ commentMessage }}
      </div>
      <form id="commentForm" @submit.prevent="postComment">
        <textarea
          name="uc_comment"
          v-model="form.uc_comment"
          class="form-control form-control-sm"
          placeholder="What do you think?"
          onfocus="this.placeholder=''"
          onblur="this.placeholder='What do you think?'"
          :rows="commentTextArea ? 5 : 1"
          @click.prevent="
            isAuthenticated === true ? (this.commentTextArea = true) : ''
          "
          :data-target="isAuthenticated === null ? '#loginModal' : ''"
          :data-toggle="isAuthenticated === null ? 'modal' : ''"
          :type="isAuthenticated === null ? 'button' : ''"
        ></textarea>

        <br />
        <button
          v-if="isAuthenticated === true"
          type="submit"
          role="button"
          class="btn btn-sm btn-primary float-right"
        >
          Post Comment
        </button>
        <input type="hidden" name="uc_parent_id" :v-model="form.uc_parent_id" />
        <input type="hidden" name="uc_id" v-model="form.uc_id" />
        <input type="hidden" name="ref_id" v-model="form.ref_id" />
      </form>
      <!--Sort-->
      <sort
        v-if="userComment.length > 1 ? (showSort = true) : (showSort = false)"
      ></sort>
    </div>
    <span v-for="uc in userComment" :key="uc.id">
      <comment
        :ref_id="ref_id"
        :userData="userData"
        :userComment="uc"
        :title="title"
        :canonicalTitle="canonicalTitle"
      >
      </comment>
    </span>
  </div>
</template>

<script>
import BaseLoader from "@/components/ui/BaseLoader.vue";
const axios = require("axios");
const moment = require("moment-mini");
const ls = require("@/store/storage/LocalStorage");
import Comment from "@/components/layout/conversation/Comment.vue";
import SocialUser from "@/components/layout/SocialUser.vue";
import Sort from "@/components/layout/conversation/Sort.vue";

export default {
  components: {
    BaseLoader,
    Comment,
    SocialUser,
    Sort,
  },

  props: {
    ref_id: {
      type: Number,
      default: 0,
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
      userData: {},
      userComment: {},
      showPostBtn: false,
      showSort: false,
      showCommentMessage: false,
      commentMessage: "Thank you for your comment.",
      commentTextArea: false,
      loading: true,
      error: null,
      shareURL: process.env.VUE_APP_FIRESTARTERS_WEBSITE_URL,
      form: {
        uc_parent_id: 0,
        uc_comment: "",
        uc_id: 0,
        ref_id: this.ref_id,
      },
    };
  },

  created() {
    this.getUserComment();
    this.getUser();
  },

  methods: {
    async getUser() {
      //Show loading
      this.loading = true;

      //Initialize controller.
      const userController = new AbortController();

      //Get the current user if signed in.
      if (this.userEmail != null) {
        await axios
          .get(
            process.env.VUE_APP_API_URL +
              "/" +
              process.env.VUE_APP_API_USER_ROUTE,
            {
              params: {
                user_email: this.userEmail,
                user_date_exp: this.dateNow,
                status_id: 1,
              },
            },
            { signal: userController.signal }
          )

          .then((res) => {
            this.userData = res.data;

            //Close request.
            userController.abort();
          })

          .catch((error) => {
            console.log(
              "An error occured getting user: " + error.response.data
            );
          })

          .finally(() => (this.loading = false));
      }
    },
    async getUserComment() {
      //Initialize controller.
      const userCommentController = new AbortController();

      //Get data.
      await axios
        .get(
          process.env.VUE_APP_API_URL +
            "/" +
            process.env.VUE_APP_API_USER_COMMENT_ROUTE,
          {
            params: {
              ref_id: this.ref_id,
              uc_parent_id: 0,
              uct_id: 1,
              status_id: 1,
            },
          },
          { signal: userCommentController.signal }
        )

        .then((res) => {
          this.userComment = res.data;
        })

        .catch((error) => {
          console.log("An error occured getting data: " + error.response);
        })

        .finally(() => {
          this.loading = false;
          //Close request.
          userCommentController.abort();
        });
    },
    async postComment() {
      if (this.form.uc_comment === "" || this.form.uc_comment === null) {
        this.commentMessage = "Please respond with a complete message.";
        this.showCommentMessage = true;
        setTimeout(() => (this.showCommentMessage = false), 3000);
      } else {
        //Initialize controller.
        const commentController = new AbortController();
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
              user_id: parseInt(this.userData[0].id),
              sort_id: 1,
              status_id: 1,
              signal: commentController.signal,
            }
          )

          .then((res) => {
            this.userComment = this.userComment.concat(res.data);
            this.showCommentMessage = true;
            setTimeout(() => (this.commentTextArea = false), 2000);
          })

          .catch((error) => {
            console.log(
              "An error occured posting comment: " + error.response.data
            );
          })

          .finally(() => {
            setTimeout(() => (this.showCommentMessage = false), 3000);

            //Close request.
            commentController.abort();
          });
      }
    },
    //Set the date format for now.
    dateFormatForNow(value) {
      return moment.utc(value).fromNow();
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 1rem;
  text-transform: capitalize;
  border-bottom: solid 1px #363031;
  padding-top: 2rem;
}

a {
  color: #363031;
  cursor: pointer;
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  h1 {
    font-size: 1.5rem;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
}
</style>
