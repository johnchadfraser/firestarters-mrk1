<template>
  <metainfo></metainfo>

  <div class="sub-header"></div>

  <div v-if="loading">
    <base-loader></base-loader>
  </div>

  <form @submit.prevent="profileUpdate">
    <div class="container p-container pb rt rb">
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12">
          <h1>Update Profile</h1>
          <p>
            Fully enhance your experience by configuring your Profile below.
          </p>
        </div>

        <div class="col-lg-12 col-md-12 col-sm-12">
          <p>
            <router-link
              :to="{ name: 'Profile' }"
              @click="resetAuth()"
              class="btn-sm btn-primary"
              >Back</router-link
            >
            <router-link
              :to="{ name: 'Profile' }"
              @click="resetAuth()"
              class="btn-sm btn-primary"
              data-toggle="modal"
              data-dismiss="modal"
              data-target="#changePasswordModal"
              >Change Password</router-link
            >
          </p>

          <hr />
        </div>
      </div>

      <div class="result" v-if="result != ''">
        <p>{{ result }}</p>
      </div>

      <div class="row form-group required">
        <div class="col-lg-6 col-md-6 col-sm-12">
          <label class="control-label text-muted" for="">First Name</label>
          <input
            type="text"
            class="form-control form-control-sm"
            aria-describedby="user_first_nameHelp"
            placeholder="First name"
            maxlength="32"
            v-model="v$.form.user_first_name.$model"
            :class="{ 'error-border': v$.form.user_first_name.$errors.length }"
          />
          <small id="user_first_nameHelp" class="form-text text-muted"></small>

          <div
            class="input-errors"
            v-for="(error, index) of v$.form.user_first_name.$errors"
            :key="index"
          >
            <div class="error-msg" v-if="index > 0">{{ error.$message }}</div>
          </div>
        </div>

        <div class="col-lg-6 col-md-6 col-sm-12">
          <label class="control-label text-muted" for="">Last Name</label>
          <input
            type="text"
            class="form-control form-control-sm"
            aria-describedby="user_last_nameHelp"
            placeholder="Last name"
            maxlength="32"
            v-model="v$.form.user_last_name.$model"
            :class="{ 'error-border': v$.form.user_last_name.$errors.length }"
          />
          <small id="user_last_nameHelp" class="form-text text-muted"></small>

          <div
            class="input-errors"
            v-for="(error, index) of v$.form.user_last_name.$errors"
            :key="index"
          >
            <div class="error-msg" v-if="index > 0">{{ error.$message }}</div>
          </div>
        </div>
      </div>

      <div class="row form-group required">
        <div class="col-lg-6 col-md-6 col-sm-12">
          <label class="control-label text-muted" for="">Email Address</label>
          <input
            type="email"
            disabled
            class="form-control form-control-sm"
            aria-describedby="user_emailHelp"
            placeholder="Enter email address"
            maxlength="64"
            v-model="v$.form.user_email.$model"
            :class="{ 'error-border': v$.form.user_email.$errors.length }"
          />

          <div
            class="input-errors"
            v-for="(error, index) of v$.form.user_email.$errors"
            :key="index"
          >
            <div class="error-msg" v-if="index > 0">{{ error.$message }}</div>
          </div>
        </div>

        <div class="col-lg-6 col-md-6 col-sm-12">
          <label class="control-label text-muted" for="">Title</label>
          <select
            class="form-control form-control-sm"
            aria-describedby="ut_idHelp"
            v-model="v$.form.ut_id.$model"
            :class="{ 'error-border': v$.form.ut_id.$errors.length }"
          >
            <option
              v-for="title in userTitleData"
              :key="title.id"
              :value="title.id"
            >
              {{ title.ut_name }}
            </option>
          </select>

          <div
            class="input-errors"
            v-for="(error, index) of v$.form.ut_id.$errors"
            :key="index"
          >
            <div class="error-msg" v-if="index > 0">{{ error.$message }}</div>
          </div>
        </div>
      </div>

      <div class="row form-group required">
        <div class="col-lg-6 col-md-6 col-sm-12">
          <label class="control-label text-muted" for="">Company</label>
          <input
            type="text"
            class="form-control form-control-sm"
            aria-describedby="user_companyHelp"
            placeholder="Company name"
            maxlength="64"
            v-model="v$.form.user_company.$model"
            :class="{ 'error-border': v$.form.user_company.$errors.length }"
          />

          <div
            class="input-errors"
            v-for="(error, index) of v$.form.user_company.$errors"
            :key="index"
          >
            <div class="error-msg" v-if="index > 0">{{ error.$message }}</div>
          </div>
        </div>

        <div class="col-lg-6 col-md-6 col-sm-12">
          <label class="control-label text-muted" for="">Country</label>
          <select
            class="form-control form-control-sm"
            aria-describedby="cntry_idHelp"
            v-model="v$.form.cntry_id.$model"
            :class="{ 'error-border': v$.form.cntry_id.$errors.length }"
          >
            <option
              v-for="country in countryData"
              :key="country.id"
              :value="country.id"
            >
              {{ country.cntry_name }}
            </option>
          </select>

          <div
            class="input-errors"
            v-for="(error, index) of v$.form.cntry_id.$errors"
            :key="index"
          >
            <div class="error-msg" v-if="index > 0">{{ error.$message }}</div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12">
          <h2>User Information</h2>
          <p class="small">
            These settings enable us to customize your profile experience such
            as social network hooks and more.
          </p>
          <hr />
        </div>
      </div>

      <div class="row form-group">
        <div class="col-lg-12 col-md-12 col-sm-12">
          <div v-for="(uf, index) in userFieldData" :key="uf.id">
            <label class="control-label text-muted" for="ufr_value"
              >{{ uf.uf_name
              }}<span class="required" v-if="uf.uf_required">*</span></label
            ><br />

            <!--If input type is URL.-->
            <div v-if="uf.uft_input_type === 'url'">
              <input
                type="url"
                maxlength="256"
                :required="uf.uf_required"
                :pattern="uf.uf_regex"
                :title="uf.uf_required_message"
                :id="'ufr_value' + uf.id"
                name="ufr_value"
                class="form-control form-control-sm"
                :placeholder="`Enter your ${uf.uf_name} URL`"
                v-model="this.form.ufr_value[index]"
              /><br />
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12">
          <h2>Business Settings</h2>
          <p class="small">
            These setting enable us to deliver Insights & Event data talyored to
            your profile.
          </p>
          <hr />
        </div>
      </div>

      <div class="row required">
        <div class="col-lg-6 col-md-12 col-sm-12">
          <h3>Business Channels</h3>

          <p>
            <span
              class="form-check form-check-inline"
              v-for="bc in businessChannelData"
              :key="bc.id"
            >
              <input
                :id="'bc_id' + bc.id"
                name="bc_id"
                type="checkbox"
                class="form-check-input"
                :value="bc.id"
                v-model="v$.form.bc_id.$model"
                :class="{ 'error-border': v$.form.bc_id.$errors.length }"
              />
              <label for="bc_id" class="form-check-label">{{
                bc.bc_name
              }}</label>
            </span>

            <span
              class="input-errors"
              v-for="(error, index) of v$.form.bc_id.$errors"
              :key="index"
            >
              <div class="error-msg" v-if="index > 0">{{ error.$message }}</div>
            </span>
          </p>
        </div>

        <div class="col-lg-6 col-md-12 col-sm-12">
          <h3>Industries</h3>

          <p>
            <span
              class="form-check form-check-inline"
              v-for="industry in industryData"
              :key="industry.id"
            >
              <input
                :id="'i_id' + industry.id"
                name="i_id"
                type="checkbox"
                class="form-check-input"
                :value="industry.id"
                v-model="v$.form.i_id.$model"
                :class="{ 'error-border': v$.form.i_id.$errors.length }"
              />
              <label for="i_id" class="form-check-label">{{
                industry.i_name
              }}</label>
            </span>

            <span
              class="input-errors"
              v-for="(error, index) of v$.form.i_id.$errors"
              :key="index"
            >
              <div class="error-msg" v-if="index > 0">{{ error.$message }}</div>
            </span>
          </p>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12">
          <h2>Forum Settings</h2>
          <p class="small">
            Forum tags enable us to deliver forum data talyored to your profile.
          </p>
          <hr />
        </div>
      </div>

      <div class="row required">
        <div class="col-lg-12 col-md-12 col-sm-12">
          <h3>Tags</h3>

          <p>
            <span
              class="form-check form-check-inline"
              v-for="ftag in forumTagData"
              :key="ftag.id"
            >
              <input
                :id="'ftag_id' + ftag.id"
                name="ftag_id"
                type="checkbox"
                class="form-check-input"
                :value="ftag.id"
                v-model="v$.form.ftag_id.$model"
                :class="{ 'error-border': v$.form.ftag_id.$errors.length }"
              />
              <label for="ftag_id" class="form-check-label">{{
                ftag.ftag_name
              }}</label>
            </span>

            <span
              class="input-errors"
              v-for="(error, index) of v$.form.ftag_id.$errors"
              :key="index"
            >
              <div class="error-msg" v-if="index > 0">{{ error.$message }}</div>
            </span>
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

          <p v-for="member in userMemberData" :key="member.id">
            {{ member.um_name }}
          </p>
        </div>

        <div class="col-7">
          <h3>Email Opt-In</h3>

          <p>
            <span
              class="form-check form-check-inline"
              v-for="(pref, index) in userPreferenceData"
              :key="pref.id"
            >
              <label class="form-check-label">
                <input
                  :id="'umpr_value' + index"
                  name="umpr_value"
                  type="radio"
                  class="form-check-input"
                  v-bind:value="['true']"
                  v-model="this.form.umpr_value"
                  :checked="form.umpr_value"
                />True
              </label>

              <label class="form-check-label">
                <input
                  :id="'umpr_value' + index"
                  name="umpr_value"
                  type="radio"
                  class="form-check-input"
                  v-bind:value="['false']"
                  v-model="this.form.umpr_value"
                  :checked="!form.umpr_value"
                />False
              </label>
            </span>
          </p>
        </div>
      </div>

      <div class="row form-group">
        <div class="col-lg-12 col-md-12 col-sm-12">
          <input
            type="submit"
            @click="resetAuth()"
            :disabled="v$.form.$invalid"
            class="btn btn-primary float-right"
            value="Update"
          />
        </div>
      </div>
    </div>
  </form>
</template>

<script>
const axios = require("axios");
const ls = require("../../store/storage/LocalStorage");
import BaseLoader from "../../components/ui/BaseLoader.vue";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { useMeta } from "vue-meta";

export function validEmail(value) {
  let validPattern = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
  if (validPattern.test(value)) {
    return true;
  }

  return false;
}

export function validValue(value) {
  let validPattern = new RegExp("[\\S\\s]+[\\S]+");

  if (validPattern.test(value)) {
    return true;
  }

  return false;
}

export function validNotZero(value) {
  let validPattern = new RegExp("[^0]+");

  if (validPattern.test(value)) {
    return true;
  }

  return false;
}

export function validMinLength(value) {
  let validPattern = new RegExp("^.{1,}$");
  if (validPattern.test(value)) {
    return true;
  }

  return false;
}

export default {
  components: {
    BaseLoader,
  },

  setup() {
    useMeta({
      title: "Profile Update - Firestarters",
      description: "Manage your Firestarters Member Profile here.",
    });

    return {
      v$: useVuelidate(),
    };
  },

  data() {
    return {
      loading: false,
      isAuthenticated: ls.getStorage("userAuthenticated"),
      userEmail: ls.getStorage("userEmail"),
      userData: [],
      userAddressRelData: [],
      userFieldRelData: [],
      userMemberPreferenceRelData: [],
      countryData: [],
      userTitleData: [],
      userFieldData: [],
      businessChannelData: [],
      industryData: [],
      forumTagData: [],
      userMemberData: [],
      userPreferenceData: [],
      result: "",
      ufrList: [],
      bcList: [],
      inList: [],
      ftagList: [],
      umList: [],
      umprList: [],
      form: {
        user_id: 0,
        user_first_name: "",
        user_last_name: "",
        user_email: "",
        user_company: "",
        ut_id: 0,
        a_id: 0,
        cntry_id: 0,
        uf_id: 0,
        ufr_value: "",
        bc_id: "",
        i_id: "",
        ftag_id: "",
        um_id: 0,
        up_id: 0,
        umpr_value: "",
      },
    };
  },

  validations() {
    return {
      form: {
        user_first_name: {
          required,
          first_name_validation: {
            $validator: validValue,
            $message: "Please enter a first name.",
          },
        },

        user_last_name: {
          required,
          last_name_validation: {
            $validator: validValue,
            $message: "Please enter a last name.",
          },
        },

        user_email: {
          required,
          email,
          email_validation: {
            $validator: validEmail,
            $message: "Please enter a valid email address.",
          },
        },

        user_company: {
          required,
          company_validation: {
            $validator: validValue,
            $message: "Please enter a company name.",
          },
        },

        cntry_id: {
          required,
          country_validation: {
            $validator: validValue,
            $message: "Please select a country.",
          },
        },

        ut_id: {
          required,
          title_validation: {
            $validator: validNotZero,
            $message: "Please select a title.",
          },
        },

        bc_id: {
          required,
          bc_validation: {
            $validator: validMinLength,
            $message: "Please choose business channel(s).",
          },
        },

        i_id: {
          required,
          i_validation: {
            $validator: validMinLength,
            $message: "Please choose industry(s).",
          },
        },

        ftag_id: {
          required,
          ftag_validation: {
            $validator: validMinLength,
            $message: "Please choose forum tag(s).",
          },
        },
      },
    };
  },

  mounted() {
    //Show loading
    this.loading = true;

    //Check auth.
    this.checkAuth(this.isAuthenticated, this.userEmail);

    this.getUser();
    this.getUserField();
    this.getCountry();
    this.getUserTitle();
    this.getBusinessChannel();
    this.getIndustry();
    this.getForumTag();
    this.getUserMember();
    this.getUserPreference();
    this.getUserAddressRel();
    this.getUserFieldRel();
    this.getUserBusinessChannelRel();
    this.getUserIndustryRel();
    this.getUserForumTagRel();
    this.getUserMemberPreferenceRel();
  },

  methods: {
    checkAuth(auth, email) {
      ls.checkAuth(auth, email);
    },

    resetAuth() {
      ls.resetAuth();
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
          this.userData = res.data[0];
          this.form.user_id = this.userData.id;
          this.form.user_first_name = this.userData.user_first_name;
          this.form.user_last_name = this.userData.user_last_name;
          this.form.user_email = this.userData.user_email;
          this.form.user_company = this.userData.user_company;
          this.form.ut_id = this.userData.ut_id;

          //Close request.
          userController.abort();
        })

        .catch((error) => {
          console.log("An error occured getting user: " + error.response.data);
        })

        .finally(() => (this.loading = false));
    },

    getCountry() {
      //Initialize controller.
      const countryController = new AbortController();

      //Get current user.
      axios
        .get(
          process.env.VUE_APP_API_URL +
            "/" +
            process.env.VUE_APP_API_COUNTRY_ROUTE,
          {
            params: {
              status_id: 1,
            },
          },
          { signal: countryController.signal }
        )

        .then((res) => {
          this.countryData = res.data;

          //Close request.
          countryController.abort();
        })

        .catch((error) => {
          console.log("An error occured getting country: " + error.response.data);
        })

        .finally(() => (this.loading = false));
    },

    getUserTitle() {
      //Initialize controller.
      const userTitleController = new AbortController();

      //Get current user.
      axios
        .get(
          process.env.VUE_APP_API_URL +
            "/" +
            process.env.VUE_APP_API_USER_TITLE_ROUTE,
          {
            params: {
              status_id: 1,
            },
          },
          { signal: userTitleController.signal }
        )

        .then((res) => {
          this.userTitleData = res.data;

          //Close request.
          userTitleController.abort();
        })

        .catch((error) => {
          console.log("An error occured getting user title: " + error.response.data);
        })

        .finally(() => (this.loading = false));
    },

    getUserField() {
      //Initialize controller.
      const userFieldController = new AbortController();

      //Get current user.
      axios
        .get(
          process.env.VUE_APP_API_URL +
            "/" +
            process.env.VUE_APP_API_USER_FIELD_ROUTE,
          {
            params: {
              status_id: 1,
            },
          },
          { signal: userFieldController.signal }
        )

        .then((res) => {
          this.userFieldData = res.data;

          //Create a list of field values.
          const data = res.data;
          let ufList = [];

          for (let i in data) {
            ufList.push(data[i].id);
          }

          this.ufList = ufList;
          this.form.uf_id = this.ufList;

          //Close request.
          userFieldController.abort();
        })

        .catch((error) => {
          console.log("An error occured getting user: " + error.response.data);
        })

        .finally(() => (this.loading = false));
    },

    getBusinessChannel() {
      //Initialize controller.
      const businessChannelController = new AbortController();

      //Get current user.
      axios
        .get(
          process.env.VUE_APP_API_URL +
            "/" +
            process.env.VUE_APP_API_BUSINESS_CHANNEL_ROUTE,
          {
            params: {
              status_id: 1,
            },
          },
          { signal: businessChannelController.signal }
        )

        .then((res) => {
          this.businessChannelData = res.data;

          //Close request.
          businessChannelController.abort();
        })

        .catch((error) => {
          console.log("An error occured getting user: " + error.response.data);
        })

        .finally(() => (this.loading = false));
    },

    getIndustry() {
      //Initialize controller.
      const industryController = new AbortController();

      //Get current user.
      axios
        .get(
          process.env.VUE_APP_API_URL +
            "/" +
            process.env.VUE_APP_API_INDUSTRY_ROUTE,
          {
            params: {
              status_id: 1,
            },
          },
          { signal: industryController.signal }
        )

        .then((res) => {
          this.industryData = res.data;

          //Close request.
          industryController.abort();
        })

        .catch((error) => {
          console.log("An error occured getting user: " + error.response.data);
        })

        .finally(() => (this.loading = false));
    },

    getForumTag() {
      //Initialize controller.
      const forumTagController = new AbortController();

      //Get current user.
      axios
        .get(
          process.env.VUE_APP_API_URL +
            "/" +
            process.env.VUE_APP_API_FORUM_TAG_ROUTE,
          {
            params: {
              status_id: 1,
            },
          },
          { signal: forumTagController.signal }
        )

        .then((res) => {
          this.forumTagData = res.data;

          //Close request.
          forumTagController.abort();
        })

        .catch((error) => {
          console.log("An error occured getting user: " + error.response.data);
        })

        .finally(() => (this.loading = false));
    },

    getUserMember() {
      //Initialize controller.
      const userMemberController = new AbortController();

      //Get current user.
      axios
        .get(
          process.env.VUE_APP_API_URL +
            "/" +
            process.env.VUE_APP_API_USER_MEMBER_ROUTE,
          {
            params: {
              id: 2,
              status_id: 1,
            },
          },
          { signal: userMemberController.signal }
        )

        .then((res) => {
          this.userMemberData = res.data;
          const data = res.data;

          let umList = [];

          for (let i in data) {
            umList.push(data[i].id);
          }

          this.umList = umList;
          this.form.um_id = this.umList;

          //Close request.
          userMemberController.abort();
        })

        .catch((error) => {
          console.log("An error occured getting user preference: " + error.response.data);
        })

        .finally(() => (this.loading = false));
    },

    getUserPreference() {
      //Initialize controller.
      const userPreferenceController = new AbortController();

      //Get current user.
      axios
        .get(
          process.env.VUE_APP_API_URL +
            "/" +
            process.env.VUE_APP_API_USER_PREFERENCE_ROUTE,
          {
            params: {
              id: 1,
              status_id: 1,
            },
          },
          { signal: userPreferenceController.signal }
        )

        .then((res) => {
          this.userPreferenceData = res.data;
          const data = res.data;

          let upList = [];

          for (let i in data) {
            upList.push(data[i].id);
          }

          this.upList = upList;
          this.form.up_id = this.upList;

          //Close request.
          userPreferenceController.abort();
        })

        .catch((error) => {
          console.log("An error occured getting user preference: " + error.response.data);
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
          this.userAddressRelData = res.data[0];
          this.form.a_id = this.userAddressRelData.a_id;
          this.form.cntry_id = this.userAddressRelData.cntry_id;

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

          //Create a list of field values.
          const data = res.data;
          let ufrList = [];

          for (let i in data) {
            ufrList.push(data[i].ufr_value);
          }

          this.ufrList = ufrList;
          this.form.ufr_value = this.ufrList;

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
          let bcList = [];

          for (let i in data) {
            bcList.push(data[i].bc_id);
          }

          this.bcList = bcList;
          this.form.bc_id = this.bcList;

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
          let inList = [];

          for (let i in data) {
            inList.push(data[i].i_id);
          }

          this.inList = inList;
          this.form.i_id = this.inList;

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
          let ftagList = [];

          for (let i in data) {
            ftagList.push(data[i].ftag_id);
          }

          this.ftagList = ftagList;
          this.form.ftag_id = this.ftagList;

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

          //Create a list of member values.
          const data = res.data;
          let umprList = ["true"];

          for (let i in data) {
            umprList.push(data[i].umpr_value);
          }

          this.umprList = umprList;
          this.form.umpr_value = this.umprList;

          //Close request.
          userMemberPreferenceRelController.abort();
        })

        .catch((error) => {
          console.log("An error occured getting user: " + error.response.data);
        })

        .finally(() => (this.loading = false));
    },

    profileUpdate() {
      this.v$.$touch();

      if (this.v$.$error) {
        return;
      } else {
        //Show loading.
        this.loading = true;

        //Scroll to top.
        window.scrollTo(0, 0);

        //Initialize controller.
        const updateProfileController = new AbortController();

        axios
          .put(
            process.env.VUE_APP_API_URL +
              "/" +
              process.env.VUE_APP_API_PROFILE_ROUTE,
            {
              user_id: this.form.user_id,
              user_email: this.form.user_email,
              user_first_name: this.form.user_first_name,
              user_last_name: this.form.user_last_name,
              user_company: this.form.user_company,
              a_id: this.form.a_id,
              cntry_id: this.form.cntry_id,
              ut_id: this.form.ut_id,
              uf_id: this.form.uf_id,
              ufr_value: this.form.ufr_value,
              bc_id: this.form.bc_id,
              i_id: this.form.i_id,
              ftag_id: this.form.ftag_id,
              um_id: this.form.um_id,
              up_id: this.form.up_id,
              umpr_value: this.form.umpr_value,
              signal: updateProfileController.signal,
            }
          )

          .then((res) => {
            this.result = res.data;
          })

          .catch((error) => {
            console.log("An error occured sending the message: " + error.response.data);

            this.result =
              "Sorry, but there was an error updating your profile. Please contact us directly here - " +
              process.env.VUE_APP_COMPANY_EMAIL;
          })

          .finally();

          this.loading = false;

          this.result =
            "Thank you for updating your profile.  Please see your email for additonal information.";

          //Close request.
          updateProfileController.abort();

          //Hide the result message.
          setTimeout(() => (this.result = ""), 5000);
        }

      return;
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
  font-size: 0.875rem;
  padding: 0.5rem 2.25rem;
}

.form-group {
  padding: 0.5rem 2.25rem;
}

.form-check-label {
  margin-right: 0.5rem;
  white-space: nowrap;
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

  .form-group {
    padding: 0.5rem 3rem;
  }

  .form-check-label {
    margin-right: 0.5rem;
    white-space: nowrap;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  h1 {
    font-size: 3rem;
    margin: 3rem 3rem 1rem;
  }

  h2 {
    font-size: 2rem;
    margin: 2rem 3rem 1rem;
  }

  h3 {
    font-size: 1.15rem;
    margin: 0rem 3rem;
  }

  p {
    font-size: 1rem;
    font-weight: normal;
    margin: 1rem 1rem;
  }

  .form-group {
    padding: 0.5rem 3rem;
  }

  .form-check-label {
    margin-right: 0.5rem;
    white-space: nowrap;
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
    margin: 2rem 4.5rem 1rem;
  }

  h3 {
    font-size: 1.25rem;
    margin: 0rem 4.5rem;
  }

  p {
    font-size: 1.15rem;
    font-weight: normal;
    margin: 1rem 2.5rem;
  }

  .form-group {
    padding: 0.5rem 4.5rem;
  }

  .form-check-label {
    margin-right: 0.5rem;
    white-space: nowrap;
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
