<template>
  <div>
    <!--Like-->
    <span class="like-action">
      <a
        href="#"
        :id="`like${uc_id}`"
        class="like-link"
        title="Like"
        @click.prevent="isAuthenticated === true ? setLikeValue(true) : ''"
        :data-target="isAuthenticated === null ? '#loginModal' : ''"
        :data-toggle="isAuthenticated === null ? 'modal' : ''"
        :type="isAuthenticated === null ? 'button' : ''"
        >▲</a
      >
      {{ likeCountValue }}
    </span>

    <!--Dislike-->
    <span class="dislike-action">
      <a
        href="#"
        :id="`dislike${uc_id}`"
        class="like-link"
        title="Dislike"
        @click.prevent="isAuthenticated === true ? setLikeValue(false) : ''"
        :data-target="isAuthenticated === null ? '#loginModal' : ''"
        :data-toggle="isAuthenticated === null ? 'modal' : ''"
        :type="isAuthenticated === null ? 'button' : ''"
        >▼</a
      >
      {{ dislikeCountValue }}
    </span>
  </div>
</template>

<script>
const axios = require("axios");
const ls = require("@/store/storage/LocalStorage");

export default {
  props: {
    likeCount: {
      type: Number,
      default: 0,
    },
    dislikeCount: {
      type: Number,
      default: 0,
    },
    uc_id: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      isAuthenticated: ls.getStorage("userAuthenticated"),
      userEmail: ls.getStorage("userEmail"),
      error: null,
      likeCountValue: this.likeCount,
      dislikeCountValue: this.dislikeCount,
      disableLike: false,
    };
  },

  mounted() {
    this.getLikeCount();
  },

  methods: {
    getLikeCount() {
      //Delay so the component has time to register the value.
      setTimeout(() => (this.likeCountValue = parseInt(this.likeCount)), 500);
      setTimeout(
        () => (this.dislikeCountValue = parseInt(this.dislikeCount)),
        500
      );
    },
    async setLikeValue(str) {
      if (!this.disableLike) {
        //Prevent continuous likes
        this.disableLike = true;

        //Initialize controller.
        const likeController = new AbortController();

        //Get data.
        await axios
          .post(
            process.env.VUE_APP_API_URL +
              "/" +
              process.env.VUE_APP_API_USER_COMMENT_LIKE_ROUTE,
            {
              uc_id: this.uc_id,
              user_id: 1,
              uclur_value: str,
            },
            { signal: likeController.signal }
          )

          .catch((error) => {
            console.log(
              "An error occured setting data: " + error.response.data
            );
          })

          .finally(() => {
            //Close request.
            likeController.abort();
            this.updateLikeCount(str);
          });
      }
    },
    updateLikeCount(str) {
      if (str) {
        this.likeCountValue++;
      } else {
        this.dislikeCountValue++;
      }
    },
  },
};
</script>

<style scoped>
.like-action {
  display: block;
  float: left;
  padding: 0rem 1rem 0rem 0rem;
  border-right: solid 1px #363031;
}

.dislike-action {
  display: block;
  float: left;
  padding: 0rem 1rem;
  border-right: solid 1px #363031;
}

.like-link {
  color: #8f8d8d;
  text-decoration: none;
}
</style>
