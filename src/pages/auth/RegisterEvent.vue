<template>
  <div v-if="loading">
    <base-loader></base-loader>
  </div>
  <div v-if="dateNowFormat(this.event_date) > dateNowFormat(Date.now())">
    <form @submit.prevent="registerUser">
      <div class="register-container">
        <h3>Register online: {{ this.event_title }}</h3>

        <div class="row form-group required">
          <label class="control-label" for="">First Name</label>
          <input
            type="text"
            class="form-control form-control-sm"
            placeholder="First name"
            maxlength="32"
            v-model="v$.form.user_first_name.$model"
            :class="{
              'error-border': v$.form.user_first_name.$errors.length,
            }"
          />

          <div
            class="input-errors"
            v-for="(error, index) of v$.form.user_first_name.$errors"
            :key="index"
          >
            <div class="error-msg" v-if="index > 0">
              {{ error.$message }}
            </div>
          </div>
        </div>

        <div class="row form-group required">
          <label class="control-label" for="">Last Name</label>
          <input
            type="text"
            class="form-control form-control-sm"
            placeholder="Last name"
            maxlength="32"
            v-model="v$.form.user_last_name.$model"
            :class="{
              'error-border': v$.form.user_last_name.$errors.length,
            }"
          />

          <div
            class="input-errors"
            v-for="(error, index) of v$.form.user_last_name.$errors"
            :key="index"
          >
            <div class="error-msg" v-if="index > 0">
              {{ error.$message }}
            </div>
          </div>
        </div>

        <div class="row form-group required">
          <label class="control-label" for="">Email Address</label>
          <input
            type="email"
            class="form-control form-control-sm"
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
            <div class="error-msg" v-if="index > 0">
              {{ error.$message }}
            </div>
          </div>
        </div>

        <div class="row form-group required">
          <label class="control-label" for="">Company</label>
          <input
            type="text"
            class="form-control form-control-sm"
            placeholder="Company name"
            maxlength="64"
            v-model="v$.form.user_company.$model"
            :class="{
              'error-border': v$.form.user_company.$errors.length,
            }"
          />

          <div
            class="input-errors"
            v-for="(error, index) of v$.form.user_company.$errors"
            :key="index"
          >
            <div class="error-msg" v-if="index > 0">
              {{ error.$message }}
            </div>
          </div>
        </div>

        <div class="row form-group required">
          <div :class="{ 'error-border': v$.form.ut_id.$errors.length }">
            <label class="control-label" for="">Title</label>
            <select
              class="form-control form-control-sm"
              v-model="v$.form.ut_id.$model"
              :class="{ 'error-border': v$.form.ut_id.$errors.length }"
            >
              <option selected>Choose...</option>
              <option
                v-for="userTitle in userTitles"
                :key="userTitle.id"
                :value="userTitle.id"
              >
                {{ userTitle.ut_name }}
              </option>
            </select>

            <div
              class="input-errors"
              v-for="(error, index) of v$.form.ut_id.$errors"
              :key="index"
            >
              <div class="error-msg" v-if="index > 0">
                {{ error.$message }}
              </div>
            </div>
          </div>
        </div>

        <div class="row form-group required">
          <div :class="{ 'error-border': v$.form.cntry_id.$errors.length }">
            <label class="control-label" for="">Country</label>
            <select
              class="form-control form-control-sm"
              v-model="v$.form.cntry_id.$model"
              :class="{ 'error-border': v$.form.cntry_id.$errors.length }"
            >
              <option selected>Choose...</option>
              <option
                v-for="country in countries"
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
              <div class="error-msg" v-if="index > 0">
                {{ error.$message }}
              </div>
            </div>
          </div>
        </div>

        <div class="row form-group required">
          <div :class="{ 'error-border': v$.form.i_id.$errors.length }">
            <label class="control-label" for="">Industry</label>
            <select
              class="form-control form-control-sm"
              v-model="v$.form.i_id.$model"
              :class="{ 'error-border': v$.form.i_id.$errors.length }"
            >
              <option selected>Choose...</option>
              <option
                v-for="industry in industries"
                :key="industry.id"
                :value="industry.id"
              >
                {{ industry.i_name }}
              </option>
            </select>

            <div
              class="input-errors"
              v-for="(error, index) of v$.form.i_id.$errors"
              :key="index"
            >
              <div class="error-msg" v-if="index > 0">
                {{ error.$message }}
              </div>
            </div>
          </div>
        </div>
        <div class="row form-group">
          <p>
            By entering your personal data above and clicking register, you are
            giving your consent to join the Firestarters community.
          </p>
        </div>
      </div>
      <div class="register-container-footer">
        <div class="result" v-if="result != ''">
          {{ result }}
        </div>
        <input type="submit" class="btn btn-primary" value="Register" />
      </div>
    </form>
  </div>
  <div v-else>
    <div class="register-container">
      <h3>{{ this.event_title }}</h3>
      <div class="row form-group">
        <p>
          <strong
            >This event expired as of
            {{ dateNowFormat(this.event_date) }}.</strong
          >
          <br /><small>Online registration for this event is closed.</small>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import BaseLoader from "../../components/ui/BaseLoader.vue";
const moment = require("moment-mini");

export function validValue(value) {
  let validPattern = new RegExp("^[\\S\\s]+[\\S]+");

  if (validPattern.test(value)) {
    return true;
  }

  return false;
}

export function validSelectValue(value) {
  let validPattern = new RegExp("^[\\S\\s]");

  if (validPattern.test(value)) {
    return true;
  }

  return false;
}

export function validEmail(value) {
  let validPattern = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
  if (validPattern.test(value)) {
    return true;
  }

  return false;
}

export default {
  components: {
    BaseLoader,
  },
  props: {
    e_id: {
      type: Number,
    },
    event_title: {
      type: String,
    },
    event_date: {
      type: String,
    },
  },

  setup() {
    return {
      v$: useVuelidate(),
    };
  },

  data() {
    return {
      loading: false,
      countries: [],
      industries: [],
      userTitles: [],
      result: "",
      form: {
        user_first_name: "",
        user_last_name: "",
        user_email: "",
        user_company: "",
        ut_id: "",
        cntry_id: "",
        i_id: "",
      },
    };
  },

  validations() {
    return {
      form: {
        user_first_name: {
          required,
          minLengthValue: minLength(2),
          user_first_name_validation: {
            $validator: validValue,
            $message: "Please enter a first name.",
          },
        },

        user_last_name: {
          required,
          minLengthValue: minLength(2),
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
          minLengthValue: minLength(2),
          company_validation: {
            $validator: validValue,
            $message: "Please enter a company name.",
          },
        },

        ut_id: {
          required,
          ut_id_validation: {
            $validator: validSelectValue,
            $message: "Please enter a user title.",
          },
        },

        cntry_id: {
          required,
          cntry_id_validation: {
            $validator: validSelectValue,
            $message: "Please choose a country.",
          },
        },

        i_id: {
          required,
          i_id_validation: {
            $validator: validSelectValue,
            $message: "Please choose an industry.",
          },
        },
      },
    };
  },

  mounted() {
    this.getCountry();
    this.getIndustry();
    this.getUserTitle();
  },

  methods: {
    getCountry() {
      //Show loading
      this.loading = true;

      //Initialize controller.
      const countryController = new AbortController();

      //Get data.
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
          this.countries = res.data;
        })

        .catch((error) => {
          console.log("An error occured getting user: " + error.response.data);
        })

        .finally(() => {
          this.loading = false;

          //Close request.
          countryController.abort();
        });
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
          this.industries = res.data;

          //Close request.
          industryController.abort();
        })

        .catch((error) => {
          console.log("An error occured getting user: " + error.response.data);
        })

        .finally(() => (this.loading = false));
    },

    getUserTitle() {
      //Initialize controller.
      const userTitleController = new AbortController();

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
          this.userTitles = res.data;

          //Close request.
          userTitleController.abort();
        })

        .catch((error) => {
          console.log(
            "An error occured getting user title: " + error.response.data
          );
        })

        .finally(() => (this.loading = false));
    },

    registerUser() {
      this.v$.$touch();

      if (this.v$.$error) {
        return;
      } else {
        //Show loading
        this.loading = true;
        //Initialize controller.
        const registerController = new AbortController();

        axios
          .post(
            process.env.VUE_APP_API_URL +
              "/" +
              process.env.VUE_APP_API_REGISTER_EVENT_ROUTE,
            {
              e_id: parseInt(this.e_id),
              user_first_name: this.form.user_first_name,
              user_last_name: this.form.user_last_name,
              user_email: this.form.user_email.toLowerCase(),
              user_company: this.form.user_company,
              ut_id: this.form.ut_id,
              cntry_id: this.form.cntry_id,
              i_id: this.form.i_id,
              register_source: "Firestarters Event",
              register_event: this.event_title,
              email_confirmation: true,
              signal: registerController.signal,
            }
          )

          .then((res) => {
            this.result = res.data;
          })

          .catch((error) => {
            console.log(
              "An error occured sending the message: " + error.response.data
            );

            this.result =
              "Sorry, but there was an error registering. Please contact us directly here - " +
              process.env.VUE_APP_COMPANY_EMAIL;
          })

          .finally(() => {
            this.loading = false;
            this.result =
              "Thank you for registering.  Please see your email for more information.";

            this.v$.form.$reset();
            this.form.user_first_name = "";
            this.form.user_last_name = "";
            this.form.user_email = "";
            this.form.user_company = "";
            this.form.ut_id = "";
            this.form.cntry_id = "";
            this.form.i_id = "";

            //Close request.
            registerController.abort();

            //Hide the result message.
            setTimeout(() => (this.result = ""), 5000);
          });
      }
    },

    //Set the date format.
    dateFormat(value) {
      return moment
        .utc(value, process.env.VUE_APP_DATEFORMAT)
        .format("dddd, DD MMMM");
    },

    dateNowFormat(value) {
      return moment.utc(value).format(process.env.VUE_APP_DATEFORMAT);
    },
  },
};
</script>

<style scoped>
/*Some styles here support older iPhone responsiveness.*/
.register-container {
  display: block;
  background-color: #fcbf49;
  margin: 1rem 2rem 0rem;
  padding: 0rem;
  border: solid 1px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.register-container-footer {
  display: block;
  background-color: #363031;
  margin: 0rem 2rem 1rem 2rem;
  padding: 1rem 2rem;
  border: solid 1px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.form-control {
  width: 200px !important;
}

h3 {
  font-size: 1rem;
  padding: 1.25rem;
}

ul {
  margin: 0rem;
}

li {
  font-size: 0.875rem;
  padding: 0rem;
}

.form-group {
  padding: 0rem 2.25rem;
}

.result {
  display: block;
  padding: 10px;
  width: 100%;
  margin: 2rem 0rem;
  color: #fff;
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  ul {
    margin: 0rem;
  }

  li {
    font-size: 0.875rem;
    padding: 0rem;
  }

  .form-group {
    padding: 0rem 2.25rem;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  ul {
    margin: 0rem;
  }

  li {
    font-size: 0.875rem;
    padding: 0rem;
  }

  .form-group {
    padding: 0rem 2.25rem;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  ul {
    margin: 0rem;
  }

  li {
    font-size: 0.875rem;
    padding: 0rem;
  }

  .form-group {
    padding: 0rem 4rem;
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  h3 {
    font-size: 1.5rem;
    padding: 1rem;
  }
  ul {
    margin: 0rem;
  }

  li {
    font-size: 0.875rem;
    padding: 0rem;
  }

  .form-group {
    padding: 0rem 2rem;
  }

  .form-control {
    width: 270px !important;
  }

  .register-container {
    margin: 1rem 2rem 0rem 0rem;
    padding: 0.5rem;
  }

  .register-container-footer {
    margin: 0rem 2rem 0rem 0rem;
  }
}
</style>
