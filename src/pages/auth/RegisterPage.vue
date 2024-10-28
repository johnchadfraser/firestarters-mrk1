<template>
  <jumbotron-page
    :pageImage="pageImage"
    :pageTitle="pageTitle"
    :pageSubTitle="pageSubTitle"
    :pageMessage="pageMessage"
  ></jumbotron-page>

  <div class="container p-container pt pb rb">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <form @submit.prevent="registerUser">
          <div>
            <div class="result" v-if="result != ''">
              {{ result }}
            </div>

            <div class="row form-group required">
              <div class="col">
                <label class="control-label text-muted" for=""
                  >First Name</label
                >
                <input
                  type="text"
                  class="form-control form-control-sm"
                  aria-describedby="user_first_nameHelp"
                  placeholder="First name"
                  maxlength="32"
                  v-model="v$.form.user_first_name.$model"
                  :class="{
                    'error-border': v$.form.user_first_name.$errors.length,
                  }"
                />
                <small
                  id="user_first_nameHelp"
                  class="form-text text-muted"
                ></small>

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

              <div class="col">
                <label class="control-label text-muted" for="">Last Name</label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  aria-describedby="user_last_nameHelp"
                  placeholder="Last name"
                  maxlength="32"
                  v-model="v$.form.user_last_name.$model"
                  :class="{
                    'error-border': v$.form.user_last_name.$errors.length,
                  }"
                />
                <small
                  id="user_last_nameHelp"
                  class="form-text text-muted"
                ></small>

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
            </div>

            <div class="row form-group required">
              <div class="col">
                <label class="control-label text-muted" for=""
                  >Email Address</label
                >
                <input
                  type="email"
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
                  <div class="error-msg" v-if="index > 0">
                    {{ error.$message }}
                  </div>
                </div>
              </div>
            </div>

            <div class="row form-group required">
              <div class="col">
                <label class="control-label text-muted" for="">Company</label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  aria-describedby="user_companyHelp"
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

              <div
                class="col"
                :class="{ 'error-border': v$.form.cntry_id.$errors.length }"
              >
                <label class="control-label text-muted" for="">Country</label>
                <select
                  class="form-control form-control-sm"
                  aria-describedby="cntry_idHelp"
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
              <div class="col">
                <label class="control-label text-muted" for="">Password</label>
                <input
                  type="password"
                  class="form-control form-control-sm"
                  autocomplete="off"
                  aria-describedby="user_passwordHelp"
                  placeholder="Password"
                  maxlength="16"
                  v-model="v$.form.user_password.$model"
                  :class="{
                    'error-border': v$.form.user_password.$errors.length,
                  }"
                />

                <div
                  class="input-errors"
                  v-for="(error, index) of v$.form.user_password.$errors"
                  :key="index"
                >
                  <div class="error-msg" v-if="index > 0">
                    {{ error.$message }}
                  </div>
                </div>
              </div>

              <div class="col">
                <label class="control-label text-muted" for=""
                  >Confirm Password</label
                >
                <input
                  type="password"
                  class="form-control form-control-sm"
                  autocomplete="off"
                  aria-describedby="user_password_confirmHelp"
                  placeholder="Confirm Password"
                  maxlength="16"
                  v-model="v$.form.user_password_confirm.$model"
                  :class="{
                    'error-border':
                      v$.form.user_password_confirm.$errors.length,
                  }"
                />

                <div
                  class="input-errors"
                  v-for="(error, index) of v$.form.user_password_confirm
                    .$errors"
                  :key="index"
                >
                  <div class="error-msg" v-if="index >= 0">
                    {{ error.$message }}
                  </div>
                </div>
              </div>
            </div>

            <div class="row form-group required">
              <ul>
                <li>At least 8 characters, max 16</li>
                <li>5 or more unique characters</li>
                <li>Uppercase, lowercase, numeric & special characters.</li>
              </ul>
            </div>
          </div>

          <div class="row form-group float-right">
            <input
              type="submit"
              :disabled="v$.form.$invalid"
              class="btn btn-primary"
              value="Sign Up"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
import JumbotronPage from "../../components/layout/JumbotronPage.vue";
import useVuelidate from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";

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

export function validPassword(value) {
  let validPattern = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})"
  );
  if (validPattern.test(value)) {
    return true;
  }

  return false;
}

export default {
  components: {
    JumbotronPage,
  },

  setup() {
    return {
      v$: useVuelidate(),
    };
  },

  data() {
    return {
      pageImage: "page-banner-contact",
      pageTitle: "Register Now",
      pageSubTitle: "Register to Join Our Team of Industry Leaders",
      pageMessage: "",
      countries: [],
      result: "",
      form: {
        user_first_name: "",
        user_last_name: "",
        user_email: "",
        user_company: "",
        cntry_id: "",
        user_password: "",
        user_password_confirm: "",
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
        },

        user_password: {
          required,
          password_validation: {
            $validator: validPassword,
            $message: "Please enter a valid password.",
          },
        },

        user_password_confirm: {
          required,
          sameAsPassword: sameAs(this.form.user_password),
        },
      },
    };
  },

  mounted() {
    this.getCountry();
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

    registerUser() {
      this.v$.$touch();

      if (this.v$.$error) {
        return;
      } else {
        //Initialize controller.
        const registerController = new AbortController();

        axios
          .post(
            process.env.VUE_APP_API_URL +
              "/" +
              process.env.VUE_APP_API_REGISTER_ROUTE,
            {
              user_first_name: this.form.user_first_name,
              user_last_name: this.form.user_last_name,
              user_email: this.form.user_email.toLowerCase(),
              user_company: this.form.user_company,
              cntry_id: this.form.cntry_id,
              user_password: this.form.user_password,
              register_source: "Firestarters",
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
            this.result =
              "Thank you for registering.  Please see your email for more information.";

            this.v$.form.$reset();
            this.form.user_first_name = "";
            this.form.user_last_name = "";
            this.form.user_email = "";
            this.form.user_company = "";
            this.form.cntry_id = "";
            this.form.user_password = "";
            this.form.user_password_confirm = "";

            //Close request.
            registerController.abort();

            //Hide the result message.
            setTimeout(() => (this.result = ""), 5000);
          });
      }
    },
  },
};
</script>

<style scoped>
/*Some styles here support older iPhone responsiveness.*/

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
  margin: 2rem 2.5rem;
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

  .result {
    margin: 2rem 4.25rem;
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
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
</style>
