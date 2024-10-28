<template>
  <!--Stats-->
  <h1>Insight Stats</h1>
  <div class="stats stats-border-r">
    <span class="stats-count">{{ this.analyticsPageView }}</span
    ><br />
    Views
  </div>
  <div class="stats stats-border-r">
    <span class="stats-count">{{ this.shareCount }}</span
    ><br />
    Shares
  </div>
  <div class="stats">
    <span class="stats-count">{{ this.likeCount }}</span
    ><br />
    Likes
  </div>
</template>

<script>
const axios = require("axios");

export default {
  props: {
    ref_id: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      analyticsPageView: {},
      userCommentStats: {},
      likeCount: 0,
      shareCount: 0,
    };
  },

  created() {
    this.getAnalyticPageView();
    this.getUserCommentStats();
  },

  methods: {
    async getAnalyticPageView() {
      //Initialize controller.
      const analyticsPageViewController = new AbortController();

      //Get data.
      await axios
        .get(
          process.env.VUE_APP_API_URL +
            "/" +
            process.env.VUE_APP_API_ANALYTICS_PAGE_VIEW_ROUTE,
          {
            params: {
              ref_id: this.ref_id,
            },
          },
          { signal: analyticsPageViewController.signal }
        )

        .then((res) => {
          this.analyticsPageView = res.data.length;
        })

        .catch((error) => {
          console.log("An error occured getting data: " + error.response.data);
        })

        .finally(() => {
          //Close request.
          analyticsPageViewController.abort();
        });
    },
    async getUserCommentStats() {
      //Initialize controller.
      const userCommentStatsController = new AbortController();

      //Get data.
      await axios
        .get(
          process.env.VUE_APP_API_URL +
            "/" +
            process.env.VUE_APP_API_USER_COMMENT_ROUTE,
          {
            params: {
              ref_id: this.ref_id,
              uct_id: 1,
              status_id: 1,
            },
          },
          { signal: userCommentStatsController.signal }
        )

        .then((res) => {
          this.userCommentStats = res.data;
          for (let i = 0; i < this.userCommentStats.length; i++) {
            this.likeCount += parseInt(this.userCommentStats[i].uc_like_count);
            this.shareCount += parseInt(
              this.userCommentStats[i].uc_share_count
            );
          }
        })

        .catch((error) => {
          console.log("An error occured getting data: " + error.response);
        })

        .finally(() => {
          //Close request.
          userCommentStatsController.abort();
        });
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 1.5rem;
  color: #fcbf49;
}

.stats {
  text-align: center;
  float: left;
  width: 33%;
  background: rgba(256, 256, 256, 0.1);
}

.stats-border-r {
  border-right: solid 1px #fff;
}
.stats-border-l {
  border-right: solid 1px #fff;
}

.stats-count {
  font-size: 2.5rem;
  text-align: center;
}
</style>
