<template>
  <div
    class="modal fade"
    id="loginModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="loginModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content rt rb">
        <div class="svg-container">
          <img
            role="img"
            src="~@/assets/svg/x-large-background.svg"
            class="x-background-icon"
            loading="lazy"
            aria-label="background icon"
          />
        </div>

        <div class="modal-header">
          <div class="container">
            <div class="row">
              <div class="col-8">
                <h1>Login</h1>
              </div>

              <div class="col-4">
                <button
                  type="button"
                  class="btn btn-info float-right"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        <form id="loginForm" @submit.prevent="loginUser">
          <div class="modal-body">
            <div class="result" v-html="result" v-if="result != ''"></div>

            <div class="row form-group required">
              <div class="col">
                <label class="control-label text-muted" for="">Email</label>
                <input
                  type="email"
                  class="form-control form-control-sm"
                  aria-describedby="user_emailHelp"
                  placeholder="Enter email address"
                  maxlength="32"
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
            </div>

            <div class="row form-group required">
              <div class="col">
                <div class="form-group form-check">
                  <label class="form-check-label">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      name="user_remember"
                      id="user_remember"
                      value="true"
                      v-model="form.user_remember"
                    />
                    Remember Me
                  </label>
                </div>
              </div>

              <div class="row form-group">
                <div class="col">
                  <div class="form-group">
                    <a
                      class="arrow-link"
                      data-toggle="modal"
                      data-dismiss="modal"
                      data-target="#forgotPasswordModal"
                      >Forgot Password</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <!--TODO: Redirect value.-->
            <input id="redirect" name="redirect" type="hidden" />

            <input
              type="submit"
              :disabled="v$.form.$invalid"
              class="btn btn-primary"
              value="Login"
            />

            <div class="small">
              Don't have an account yet?
              <a
                class="arrow-link"
                data-toggle="modal"
                data-dismiss="modal"
                data-target="#registerModal"
                >Sign Up</a
              >
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
import jquery from "jquery";

const moment = require("moment-mini");
const ls = require("../../store/storage/LocalStorage");
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

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

export default {
  components: {},

  setup() {
    return {
      v$: useVuelidate(),
    };
  },

  data() {
    function dateNowFormat(value) {
      return moment.utc(value).format(process.env.VUE_APP_DATEFORMAT);
    }

    return {
      result: "",
      dateNow: dateNowFormat(Date.now()),
      form: {
        user_email: ls.getStorage("userEmail"),
        user_password: "",
        user_remember: ls.getStorage("userRemember"),
        status_id: 1,
      },
    };
  },

  validations() {
    return {
      form: {
        user_email: {
          required,
          email,
          email_validation: {
            $validator: validEmail,
            $message: "Please enter a valid email address.",
          },
        },

        user_password: {
          required,
        },
      },
    };
  },

  methods: {
    loginUser() {
      this.v$.$touch();

      if (this.v$.$error) {
        return;
      } else {
        console.log("Redirect: " + this.form.redirect);
        //Initialize controller.
        const loginController = new AbortController();

        axios
          .post(
            process.env.VUE_APP_API_URL +
              "/" +
              process.env.VUE_APP_API_LOGIN_ROUTE,
            {
              user_email: this.form.user_email.toLowerCase(),
              user_password: this.form.user_password,
              user_remember: this.form.user_remember,
              user_date_exp: this.dateNow,
              register_source: "Firestarters",
              email_confirmation: false,
              status_id: 1,
              signal: loginController.signal,
            }
          )

          .then((res) => {
            if (res.data != true) {
              this.result = res.data;
            } else {
              ls.setLogin(this.form.user_email, this.form.user_remember);

              this.v$.form.$reset();
              this.form.user_email = "";
              this.form.user_password = "";

              //Close request.
              loginController.abort();

              //Go to profile page.
              if (this.form.redirect === "") {
                this.$router.push({ name: "Profile" });
              } else {
                jquery("#loginModal").modal("hide");
                this.$router.go(0);
              }
            }
          })

          .catch((error) => {
            console.log("An error occured logging in: " + error.response);

            this.result =
              "Sorry, but there was an error logging in. Please contact us directly here - " +
              process.env.VUE_APP_COMPANY_EMAIL;
          });
      }
    },
  },
};
</script>

<style scoped>
/*Some styles here support older iPhone responsiveness.*/

.modal-body {
  padding: 0rem 1.5rem;
}

.modal-header {
  border-bottom: none;
}

.modal-footer {
  justify-content: flex-start;
  padding: 0rem 1.5rem 1.5rem;
  border-top: none;
}

h1 {
  font-size: 3rem;
}

.form-check-label {
  font-size: 0.875rem;
}

.arrow-link {
  font-size: 0.875rem;
  padding: 0rem 1rem;
}

.small {
  padding: 0.5rem 0rem;
}

.btn-info {
  font-size: 0.75rem;
  margin-top: 0.5rem;
  background-color: transparent !important;
}

.result {
  margin: 2rem;
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  h1 {
    font-size: 3rem;
  }

  .form-check-label {
    font-size: 0.875rem;
  }

  .arrow-link {
    font-size: 0.875rem;
    padding: 0rem 1rem;
  }

  .small {
    padding: 0.5rem 0rem;
  }

  .btn-info {
    font-size: 0.875rem;
    margin-top: 0.5rem;
    background-color: transparent !important;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  h1 {
    font-size: 4rem;
  }

  .form-check-label {
    font-size: 0.875rem;
  }

  .arrow-link {
    font-size: 0.875rem;
    padding: 0rem 1rem;
  }

  .small {
    padding: 0.5rem 0rem;
  }

  .btn-info {
    font-size: 0.875rem;
    margin-top: 0.75rem;
    background-color: transparent !important;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  .modal-body {
    padding: 0rem 5rem;
  }

  .modal-footer {
    padding: 0rem 5rem 2rem;
  }

  h1 {
    font-size: 5rem;
    margin: 1rem 3rem;
  }

  .form-check-label {
    font-size: 0.875rem;
  }

  .arrow-link {
    font-size: 0.875rem;
    padding: 0rem 1rem;
  }

  .small {
    padding: 0.5rem 0rem;
  }

  .btn-info {
    font-size: 0.875rem;
    margin: 2rem 3rem;
    background-color: transparent !important;
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  .modal-body {
    padding: 0rem 5rem;
  }

  .modal-footer {
    padding: 0rem 5rem 2rem;
  }

  h1 {
    font-size: 5rem;
    margin: 1rem 3rem;
  }

  .form-check-label {
    font-size: 0.875rem;
  }

  .arrow-link {
    font-size: 1rem;
    padding: 0rem 1rem;
  }

  .small {
    padding: 0.5rem 0rem;
  }

  .btn-info {
    margin: 2.5rem 3rem;
  }
}
</style>
