<template>
  <jumbotron-page
    :pageImage="pageImage"
    :pageTitle="pageTitle"
    :pageSubTitle="pageSubTitle"
    :pageMessage="pageMessage"
  ></jumbotron-page>

  <div class="container p-container pt pb rt rb">
    <div class="result" v-html="result" v-if="result != ''"></div>

    <div v-else>
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12">
          <form @submit.prevent="resetPassword">
            <div class="row form-group required">
              <div class="col-lg-12 col-md-12 col-sm-12">
                <label class="control-label text-muted" for="user_password"
                  >Password</label
                >
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

              <div class="col-lg-12 col-md-12 col-sm-12">
                <label
                  class="control-label text-muted"
                  for="user_password_confirm"
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

            <div class="row form-group required">
              <div class="col-lg-12 col-md-12 col-sm-12">
                <input
                  type="hidden"
                  class="form-control form-control-sm"
                  v-model="v$.form.user_token.$model"
                />
                <input
                  type="hidden"
                  class="form-control form-control-sm"
                  v-model="v$.form.user_email.$model"
                />

                <input
                  type="submit"
                  :disabled="v$.form.$invalid"
                  class="btn btn-primary"
                  value="Reset Password"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import JumbotronPage from "../../components/layout/JumbotronPage.vue";
const axios = require("axios");
const moment = require("moment-mini");
import useVuelidate from "@vuelidate/core";
import { required, sameAs } from "@vuelidate/validators";

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
    const route = useRoute();
    const router = useRouter();

    if (route.query.token == undefined || route.query.email == undefined) {
      router.push({ name: "Home" });
    }

    return {
      v$: useVuelidate(),
      token: route.query.token,
      email: route.query.email,
    };
  },

  data() {
    function dateNowFormat(value) {
      return moment.utc(value).format(process.env.VUE_APP_DATEFORMAT);
    }

    return {
      pageImage: "page-banner-contact",
      pageTitle: "Reset Your Password",
      pageSubTitle: "",
      pageMessage: "",
      form: {
        user_email: this.email,
        user_password: "",
        user_token: this.token,
      },
      result: "",
      dateNow: dateNowFormat(Date.now()),
    };
  },

  methods: {
    resetPassword() {
      //Initialize controller.
      const resetPasswordController = new AbortController();

      //Check token.
      axios
        .post(
          process.env.VUE_APP_API_URL +
            "/" +
            process.env.VUE_APP_API_RESET_PASSWORD_ROUTE,
          {
            user_email: this.form.user_email,
            user_password: this.form.user_password,
            sk_value: this.form.user_token,
            user_date_exp: this.dateNow,
            status_id: 1,
            signal: resetPasswordController.signal,
          }
        )

        .then((res) => {
          this.result = res.data;
        })

        .finally((res) => {
          this.result = res.data;

          //Close request.
          resetPasswordController.abort();

          //Hide the result message.
          setTimeout(() => (this.result = ""), 5000);
        });
    },
  },

  validations() {
    return {
      form: {
        user_email: {
          required,
        },

        user_token: {
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
  font-size: 0.875rem;
  margin: 0rem 3rem 2rem;
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
