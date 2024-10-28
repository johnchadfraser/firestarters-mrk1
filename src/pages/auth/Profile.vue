<template>
  <metainfo></metainfo>

  <change-password></change-password>
  <timeout-reset></timeout-reset>

  <div class="sub-header"></div>

  <div class="container p-container rt rb">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <h1>Profile</h1>
        <hr />

        <div v-if="loading && dataReady">
          <base-loader></base-loader>
        </div>

        <div v-else v-for="user in userData" :key="user.id">
          <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-6">
              <p>
                <strong
                  ><span v-if="user.ut_name !== '' && user.ut_name !== null"
                    >{{ user.ut_name }} - </span
                  ><span
                    v-if="
                      user.user_company !== '' && user.user_company !== null
                    "
                    >{{ user.user_company }} </span
                  ><span
                    v-if="
                      user.user_company !== '' &&
                      user.user_company !== null &&
                      user.user_company !== '' &&
                      user.user_company !== null
                    "
                    ><br
                  /></span>
                  <span v-else>Name<br /></span
                ></strong>
                {{ user.user_first_name }} {{ user.user_last_name }}<br />
                {{ user.user_email }}
              </p>
            </div>

            <div class="col-lg-6 col-md-6 col-sm-6">
              <p>
                <strong>Country</strong><br />
                <span v-if="userAddressRelData == ''">
                  You haven't chosen a country,
                  <router-link
                    :to="{ name: 'Profile Update' }"
                    @click="resetAuth()"
                    class="link"
                    >Edit Profile</router-link
                  >
                  now!
                </span>

                <span v-else v-for="uar in userAddressRelData" :key="uar.id">
                  {{ uar.cntry_name }}
                </span>
              </p>
            </div>

            <div class="col-lg-12 col-md-12 col-sm-12">
              <p>
                <router-link
                  :to="{ name: 'Profile Update' }"
                  @click="resetAuth()"
                  class="btn-sm btn-primary"
                  >Edit Profile</router-link
                >
                <router-link
                  :to="{ name: 'Profile' }"
                  @click="resetAuth()"
                  class="btn-sm btn-primary"
                  style="color: #000 !important"
                  data-toggle="modal"
                  data-dismiss="modal"
                  data-target="#changePasswordModal"
                  >Change Password</router-link
                >
              </p>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <h2>User Settings</h2>
              <p class="small">
                These settings enable us to customize your profile experience
                such as social network hooks and more.
              </p>
              <hr />
            </div>
          </div>

          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <div v-if="userFieldRelData == ''">
                <p>
                  You haven't setup your user settings yet,
                  <router-link
                    :to="{ name: 'Profile Update' }"
                    @click="resetAuth()"
                    class="link"
                    >Edit Profile</router-link
                  >
                  now!
                </p>
              </div>

              <div v-else v-for="uf in userFieldRelData" :key="uf.id">
                <h3>
                  <strong>{{ uf.uf_name }}</strong>
                </h3>

                <!--If input type is URL.-->
                <div v-if="uf.uft_input_type === 'url'">
                  <p>
                    <span v-if="uf.ufr_value !== '' && uf.ufr_value !== null">
                      <a :href="uf.ufr_value" class="link" target="_blank">{{
                        uf.ufr_value
                      }}</a>
                    </span>
                    <span v-else>
                      You haven't setup this user setting,
                      <router-link
                        :to="{ name: 'Profile Update' }"
                        @click="resetAuth()"
                        class="link"
                        >Edit Profile</router-link
                      >
                    </span>
                  </p>
                </div>

                <div v-else>
                  <p>
                    {{ uf.ufr_value }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <h2>Business Settings</h2>
              <p class="small">
                These setting enable us to deliver Insights & Event data
                talyored to your profile.
              </p>
              <hr />
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-12">
              <h3>Business Channels</h3>

              <p v-if="bcnList.length !== 0">
                <span v-html="splitJoin(bcnList)"></span>
              </p>

              <p v-else>
                <router-link
                  :to="{ name: 'Profile Update' }"
                  @click="resetAuth()"
                  class="link"
                  >Edit Profile</router-link
                >
                to setup business channels.
              </p>
            </div>

            <div class="col-lg-6 col-md-6 col-sm-12">
              <h3>Industries</h3>

              <p v-if="inList !== ''">
                <span v-html="splitJoin(inList)"></span>
              </p>
              <p v-else>
                <router-link
                  :to="{ name: 'Profile Update' }"
                  @click="resetAuth()"
                  class="link"
                  >Edit Profile</router-link
                >
                to setup industries.
              </p>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <h2>Forum Settings</h2>
              <p class="small">
                Forum tags enable us to deliver forum data talyored to your
                profile.
              </p>
              <hr />
            </div>
          </div>

          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <h3>Tags</h3>

              <p v-if="ftagList !== ''">
                <span v-html="splitJoin(ftagList)"></span>
              </p>

              <p v-else>
                <router-link
                  :to="{ name: 'Profile Update' }"
                  @click="resetAuth()"
                  class="link"
                  >Edit Profile</router-link
                >
                to setup forum tags.
              </p>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <h2>Membership & Preferences</h2>
              <p class="small">
                Memberships include access across all Firestarters related
                solutions.
              </p>
              <hr />
            </div>
          </div>

          <div class="row">
            <div class="col-5">
              <h3>Memberships</h3>

              <div v-if="umprList.length !== 0">
                <p
                  v-for="member in userMemberPreferenceRelData"
                  :key="member.id"
                >
                  {{ member.um_name }}
                </p>
              </div>

              <div v-else>
                <p>
                  <router-link
                    :to="{ name: 'Profile Update' }"
                    @click="resetAuth()"
                    class="link"
                    >Edit Profile</router-link
                  >
                  to complete membership.
                </p>
              </div>
            </div>

            <div class="col-7">
              <h3>Email Opt-In</h3>

              <div v-if="umprList.length !== 0">
                <p
                  v-for="member in userMemberPreferenceRelData"
                  :key="member.id"
                >
                  {{ member.umpr_value ? "Yes" : "No" }}
                </p>
              </div>

              <div v-else>
                <p>
                  <router-link
                    :to="{ name: 'Profile Update' }"
                    @click="resetAuth()"
                    class="link"
                    >Edit Profile</router-link
                  >
                  to complete membership.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
const ls = require("../../store/storage/LocalStorage");
import BaseLoader from "../../components/ui/BaseLoader.vue";
import ChangePassword from "../../pages/auth/ChangePassword.vue";
import TimeoutReset from "../../pages/auth/TimeoutReset.vue";
import { useMeta } from "vue-meta";

export default {
  setup() {
    useMeta({
      title: "Profile - Firestarters",
      description: "Manage your Firestarters Member Profile here.",
    });
  },

  components: {
    BaseLoader,
    ChangePassword,
    TimeoutReset,
  },

  data() {
    return {
      isAuthenticated: ls.getStorage("userAuthenticated"),
      userEmail: ls.getStorage("userEmail"),
      userData: {},
      userAddressRelData: {},
      userFieldRelData: {},
      userBusinessChannelRelData: {},
      userIndustryRelData: {},
      userForumTagRelData: {},
      userMemberPreferenceRelData: {},
      bcnList: "",
      inList: "",
      ftagList: "",
      umprList: "",
      loading: true,
      error: null,
      dataReady: false,
    };
  },

  async mounted() {
    //Check auth first.
    await this.checkAuth(this.isAuthenticated, this.userEmail);

    this.clearModal();
    this.getUser();
    this.getUserAddressRel();
    this.getUserFieldRel();
    this.getUserBusinessChannelRel();
    this.getUserIndustryRel();
    this.getUserForumTagRel();
    this.getUserMemberPreferenceRel();
  },

  methods: {
    async checkAuth(auth, email) {
      await ls.checkAuth(auth, email);
      this.dataReady = true;
    },

    resetAuth() {
      ls.resetAuth();
    },

    //Remove the modal class if exists.
    clearModal() {
      var elementExists = document.getElementsByClassName("modal-backdrop");
      if (elementExists.length != 0) {
        document.querySelector(".modal-backdrop").removeAttribute("class");
        window.location.reload();
      }
    },

    getUser() {
      //Initialize controller.
      const userController = new AbortController();

      //Get current user.
      axios
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
          console.log("An error occured getting user: " + error.response.data);
        })

        .finally(() => (this.loading = false));
    },

    getUserAddressRel() {
      //Initialize controller.
      const userAddressRelController = new AbortController();

      //Get current user.
      axios
        .get(
          process.env.VUE_APP_API_URL +
            "/" +
            process.env.VUE_APP_API_USER_ADDRESS_REL_ROUTE,
          {
            params: {
              user_email: this.userEmail,
              status_id: 1,
            },
          },
          { signal: userAddressRelController.signal }
        )

        .then((res) => {
          this.userAddressRelData = res.data;

          //Close request.
          userAddressRelController.abort();
        })

        .catch((error) => {
          console.log("An error occured getting user: " + error.response.data);
        })

        .finally(() => (this.loading = false));
    },

    getUserFieldRel() {
      //Initialize controller.
      const userFieldRelController = new AbortController();

      //Get current user.
      axios
        .get(
          process.env.VUE_APP_API_URL +
            "/" +
            process.env.VUE_APP_API_USER_FIELD_REL_ROUTE,
          {
            params: {
              user_email: this.userEmail,
              status_id: 1,
            },
          },
          { signal: userFieldRelController.signal }
        )

        .then((res) => {
          this.userFieldRelData = res.data;

          //Close request.
          userFieldRelController.abort();
        })

        .catch((error) => {
          console.log("An error occured getting user: " + error.response.data);
        })

        .finally(() => (this.loading = false));
    },

    getUserBusinessChannelRel() {
      //Initialize controller.
      const userBusinessChannelRelController = new AbortController();

      //Get current user.
      axios
        .get(
          process.env.VUE_APP_API_URL +
            "/" +
            process.env.VUE_APP_API_USER_BUSINESS_CHANNEL_REL_ROUTE,
          {
            params: {
              user_email: this.userEmail,
              status_id: 1,
            },
          },
          { signal: userBusinessChannelRelController.signal }
        )

        .then((res) => {
          this.userBusinessChannelRelData = res.data;

          //Create a list of business channel names.
          const data = res.data;
          let bcnList = "";

          for (let i in data) {
            bcnList += data[i].bc_name;
            if (i + 1 < data.length) {
              bcnList = bcnList + ", ";
            }
          }

          this.bcnList = bcnList;

          //Close request.
          userBusinessChannelRelController.abort();
        })

        .catch((error) => {
          console.log("An error occured getting user: " + error.response.data);
        })

        .finally(() => (this.loading = false));
    },

    getUserIndustryRel() {
      //Initialize controller.
      const userIndustryRelController = new AbortController();

      //Get current user.
      axios
        .get(
          process.env.VUE_APP_API_URL +
            "/" +
            process.env.VUE_APP_API_USER_INDUSTRY_REL_ROUTE,
          {
            params: {
              user_email: this.userEmail,
              status_id: 1,
            },
          },
          { signal: userIndustryRelController.signal }
        )

        .then((res) => {
          this.userIndustryRelData = res.data;

          //Create a list of industry names.
          const data = res.data;
          let inList = "";

          for (let i in data) {
            inList += data[i].i_name;
            if (i + 1 < data.length) {
              inList = inList + ", ";
            }
          }

          this.inList = inList;

          //Close request.
          userIndustryRelController.abort();
        })

        .catch((error) => {
          console.log("An error occured getting user: " + error.response.data);
        })

        .finally(() => (this.loading = false));
    },

    getUserForumTagRel() {
      //Initialize controller.
      const userForumTagRelController = new AbortController();

      //Get current user.
      axios
        .get(
          process.env.VUE_APP_API_URL +
            "/" +
            process.env.VUE_APP_API_USER_FORUM_TAG_REL_ROUTE,
          {
            params: {
              user_email: this.userEmail,
              status_id: 1,
            },
          },
          { signal: userForumTagRelController.signal }
        )

        .then((res) => {
          this.userForumTagRelData = res.data;

          //Create a list of forum tag names.
          const data = res.data;
          let ftagList = "";

          for (let i in data) {
            ftagList += data[i].ftag_name;
            if (i + 1 < data.length) {
              ftagList = ftagList + ", ";
            }
          }

          this.ftagList = ftagList;

          //Close request.
          userForumTagRelController.abort();
        })

        .catch((error) => {
          console.log("An error occured getting user: " + error.response.data);
        })

        .finally(() => (this.loading = false));
    },

    getUserMemberPreferenceRel() {
      //Initialize controller.
      const userMemberPreferenceRelController = new AbortController();

      //Get current user.
      axios
        .get(
          process.env.VUE_APP_API_URL +
            "/" +
            process.env.VUE_APP_API_USER_MEMBER_PREFERENCE_REL_ROUTE,
          {
            params: {
              user_email: this.userEmail,
              um_id: 2,
              up_id: 1,
              status_id: 1,
            },
          },
          { signal: userMemberPreferenceRelController.signal }
        )

        .then((res) => {
          this.userMemberPreferenceRelData = res.data;

          //Create a list of forum tag names.
          const data = res.data;
          let umList = [];
          let upList = [];
          let umprList = [];

          for (let i in data) {
            umList.push(data[i].um_id);
            upList.push(data[i].up_id);
            umprList.push(data[i].umpr_value);
          }

          this.umList = umList;
          this.upList = upList;
          this.umprList = umprList;

          //Close request.
          userMemberPreferenceRelController.abort();
        })

        .catch((error) => {
          console.log("An error occured getting user: " + error.response.data);
        })

        .finally(() => (this.loading = false));
    },

    splitJoin(str) {
      let badge =
        "<style>.badge {font-weight:400; text-transform:lowercase; padding:0.375rem 0.75rem; margin-right:0.375rem; margin-bottom:0.5rem;} .badge-primary {background-color:#003049 !important;}</style>";
      const list = str.split(", ");

      list.forEach(function (tag) {
        badge =
          badge +
          '<span class="badge badge-pill badge-primary">' +
          tag +
          "</span>";
      });

      return badge;
    },
  },
};
</script>

<style scoped>
/*Some styles here support older iPhone responsiveness.*/
.sub-header {
  height: 4.5rem;
}

h1 {
  font-size: 2.25rem;
  margin: 2rem 2rem 1rem;
}

h2 {
  font-size: 1.5rem;
  margin: 1rem 2rem;
}

h3 {
  font-size: 1rem;
  text-transform: capitalize;
  margin: 0rem 2.25rem;
}

p {
  padding: 0.5rem 2.25rem;
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  h1 {
    font-size: 2.5rem;
    margin: 2rem 3rem 1rem;
  }

  h2 {
    font-size: 2rem;
    margin: 2rem 3rem 0rem;
  }

  h3 {
    font-size: 1rem;
    margin: 0rem 3.25rem;
  }

  p {
    font-size: 1rem;
    font-weight: normal;
    margin: 1rem 1rem;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  h1 {
    font-size: 3rem;
    margin: 3rem 4rem 1rem;
  }

  h2 {
    font-size: 2rem;
    margin: 2rem 4rem 1rem;
  }

  h3 {
    font-size: 1.15rem;
    margin: 0rem 4rem;
  }

  p {
    font-size: 1.15rem;
    font-weight: normal;
    margin: 1rem 2rem;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  .sub-header {
    height: 6.5rem;
  }

  h1 {
    font-size: 4rem;
    margin: 4rem 4.5rem 1rem;
  }

  h2 {
    font-size: 2rem;
    margin: 2rem 4.75rem 1rem;
  }

  h3 {
    font-size: 1.25rem;
    margin: 0rem 4.75rem;
  }

  p {
    font-size: 1.15rem;
    font-weight: normal;
    margin: 1rem 2.5rem;
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  .sub-header {
    height: 6.5rem;
  }

  h1 {
    font-size: 5rem;
    margin: 4rem 4.75rem 2rem;
  }

  h2 {
    font-size: 2.5rem;
    margin: 2rem 4.75rem 1.5rem;
  }

  h3 {
    font-size: 1.25rem;
    margin: 2rem 5rem 1rem;
  }

  p {
    font-size: 1.15rem;
    font-weight: normal;
    margin: 1rem 2.75rem 2rem;
  }
}
</style>
