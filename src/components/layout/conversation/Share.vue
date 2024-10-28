<template>
  <div
    class="share-action"
    v-if="typeof parseInt(shareCountValue) === 'number'"
  >
    {{ shareCountValue }}
    <a
      href="#"
      class="share-link"
      @click.prevent="isAuthenticated === true ? openShare() : ''"
      :data-target="isAuthenticated === null ? '#loginModal' : ''"
      :data-toggle="isAuthenticated === null ? 'modal' : ''"
      :type="isAuthenticated === null ? 'button' : ''"
      >Share(s)</a
    >
    <div class="clipboard-message" v-if="showClipboardMessage">
      Copied to Clipboard!
    </div>
    <div v-if="showShareMenu" class="menu-container">
      <span
        class="menu-item"
        @click.prevent="
          shareAction({
            action: 'Email',
            mailto: emailTo,
            subject: emailSubject,
            body: emailBody,
          })
        "
        ><i class="fa fa-envelope" aria-hidden="true"></i> Email</span
      >
      <span
        class="menu-item"
        @click.prevent="
          shareAction({
            action: 'Link',
            body: 'https://firestarters.cxahub.com',
          })
        "
        ><i class="fa fa-link" aria-hidden="true"></i> Link
      </span>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
const ls = require("@/store/storage/LocalStorage");
import useClipboard from "vue-clipboard3";

export default {
  props: {
    ref_id: {
      type: Number,
      default: 0,
    },
    uc_id: {
      type: Number,
      default: 0,
    },
    user_id: {
      type: Number,
      default: 0,
    },
    shareCount: {
      type: Number,
      default: 0,
    },
    emailTo: {
      type: String,
      default: "",
    },
    emailSubject: {
      type: String,
      default: "",
    },
    emailBody: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      isAuthenticated: ls.getStorage("userAuthenticated"),
      userEmail: ls.getStorage("userEmail"),
      socialNetworkShare: {},
      showShareMenu: false,
      showClipboardMessage: false,
      sns_id: "1,2",
      error: null,
      shareCountValue: this.shareCount,
    };
  },

  mounted() {
    this.getSocialNetworkShare();
    this.getShareCount();
  },

  methods: {
    async setShare(sns_id) {
      if (!this.disableShare) {
        //Prevent continuous likes
        this.disableShare = true;

        //Initialize controller.
        const shareController = new AbortController();

        //Get data.
        await axios
          .post(
            process.env.VUE_APP_API_URL +
              "/" +
              process.env.VUE_APP_API_USER_COMMENT_SHARE_ROUTE,
            {
              ref_id: this.ref_id,
              uc_id: this.uc_id,
              sns_id: sns_id,
              user_id: this.user_id,
            },
            { signal: shareController.signal }
          )

          .catch((error) => {
            console.log(
              "An error occured setting data: " + error.response.data
            );
          })

          .finally(() => {
            //Close request.
            console.log("Finally");
            shareController.abort();
            this.updateShareCount();
          });
      }
    },
    getSocialNetworkShare() {
      //Show loading
      this.loading = true;

      //Initialize controller.
      const socialNetworkShareController = new AbortController();

      //Get data.
      axios
        .get(
          process.env.VUE_APP_API_URL +
            "/" +
            process.env.VUE_APP_API_SOCIAL_NETWORK_SHARE_ROUTE,
          {
            params: {
              id: this.sns_id,
              status_id: 1,
            },
          },
          { signal: socialNetworkShareController.signal }
        )

        .then((res) => {
          this.socialNetworkShare = res.data;
        })

        .catch((error) => {
          console.log("An error occured getting user: " + error.response.data);
        })

        .finally(() => {
          this.loading = false;

          //Close request.
          socialNetworkShareController.abort();
        });
    },
    getShareCount() {
      //Delay so the component has time to register the value.
      setTimeout(() => (this.shareCountValue = parseInt(this.shareCount)), 500);
    },
    updateShareCount() {
      this.shareCountValue++;
    },
    openShare() {
      this.showShareMenu = !this.showShareMenu;
    },
    closeShare() {
      this.showShareMenu = false;
    },
    clipBoard(str) {
      const { toClipboard } = useClipboard();
      toClipboard(str);
      this.showClipboardMessage = true;
    },
    shareAction({ action, mailto, subject, body } = {}) {
      if (action === "Email") {
        window.location =
          "mailto:" +
          mailto +
          "?subject=" +
          encodeURIComponent(subject) +
          "&body=" +
          encodeURIComponent(body);
        this.setShare(2);
      } else if (action === "Link") {
        this.clipBoard(body);
        this.showClipboardMessage = true;
        this.setShare(1);
        setTimeout(() => (this.showClipboardMessage = false), 3000);
      }
      this.showShareMenu = false;
    },
  },
};
</script>

<style scoped>
.share-action {
  display: block;
  float: left;
  padding: 0rem 1rem;
}

.share-link {
  color: #8f8d8d;
  text-decoration: none;
}

.menu-container {
  display: block;
  position: absolute;
  background-color: #fff;
  padding: 1rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
  z-index: 10;
}

.menu-item {
  display: block;
  width: auto;
  color: #000;
  padding: 0.5rem 0rem;
  cursor: pointer;
}

.menu-item-selected {
  font-weight: 700;
}

.fa {
  padding-right: 0.5rem;
}

.clipboard-message {
  display: block;
  position: absolute;
  background-color: #fff;
  padding: 1rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
  color: red;
}
</style>
