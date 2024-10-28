<template>
  <div
    class="modal fade"
    id="forgotPasswordModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="forgotPasswordLabel"
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
                  <h1 class="modal-title" id="forgotModalLabel">
                    {{ modalTitle }}
                  </h1>
                </div>

                <div class="col-4">
                  <button
                    type="button"
                    class="btn btn-info float-right"
                    data-dismiss="modal"
                    aria-label="Close"
                    @click="document.forms[0].reset()"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>

          <form id="forgotForm" @submit.prevent="sendEmail">

          <div class="modal-body">
            <div class="result" v-html="result" v-if="result != ''"></div>

            <div class="row form-group required">
              <div class="col">
                <label class="control-label text-muted" for="email"
                  >Email</label
                >
                <input
                  id="user_email"
                  type="email"
                  class="form-control form-control-sm"
                  aria-describedby="user_emailHelp"
                  placeholder="Email Address"
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
          </div>

          <div class="modal-footer">
            <input
              type="submit"
              :disabled="v$.form.$invalid"
              class="btn btn-primary"
              value="Reset Password"
            />

            <div class="small">
              Don't have an account yet?
              <router-link
                :to="{ name: 'Home' }"
                class="arrow-link"
                data-toggle="modal"
                data-dismiss="modal"
                data-target="#registerModal"
                >Sign Up Now</router-link
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
const moment = require("moment-mini");
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

export function validEmail(email) {
  let validEmailPattern = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
  if (validEmailPattern.test(email)) {
    return true;
  }

  return false;
}

export default {
  
  setup() {
    return { v$: useVuelidate() };
  },

  data() {
    function dateNowFormat(value) {
      return moment.utc(value).format(process.env.VUE_APP_DATEFORMAT);
    }

    return {
      form: {
        user_email: "",
        subject: "Firestarters - Forgot Password",
        html: ``,
      },
      result: "",
      dateNow: dateNowFormat(Date.now()),
      modalTitle: "Forgot Password?",
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
      },
    };
  },

  methods: {
    sendEmail() {
      this.v$.$touch();

      if (this.v$.$error) {
        return;
      } else {
        //Initialize controller.
        const securityKeyController = new AbortController();
        const emailController = new AbortController();

        //Get the users password and send it..
        axios
          .get(
            process.env.VUE_APP_API_URL +
              "/" +
              process.env.VUE_APP_API_USER_SECURITY_KEY_REL_ROUTE,
            {
              params: {
                user_email: this.form.user_email,
                status_id: 1,
                user_date_exp: this.dateNow,
                signal: securityKeyController.signal,
              },
            }
          )

          .then((res) => {
            const firestartersWebsiteURL =
              process.env.VUE_APP_FIRESTARTERS_WEBSITE_URL;

            if (res.data.length != 0) {
              axios
                .post(
                  process.env.VUE_APP_API_URL +
                    "/" +
                    process.env.VUE_APP_API_EMAIL_ROUTE,
                  {
                    to: this.form.user_email,
                    from: process.env.VUE_APP_NOREPLY_EMAIL,
                    subject: this.form.subject,
                    html:
                      '<a href="' +
                      firestartersWebsiteURL +
                      '"><img role="img" src="cid:firestarters-logo" style="border:none;" aria-label="firestarters logo"/></a><br/><br/>You have requested to reset your password please ' +
                      ` <a href="${firestartersWebsiteURL}/reset-password?token=${res.data[0].sk_value}&email=${this.form.user_email}">click here to reset your password.</a>`,
                    attachments: [
                      {
                        filename: "firestarters-logo.png",
                        path: "./public/assets/logo/firestarters-logo.png",
                        cid: "firestarters-logo",
                      },
                    ],
                    signal: emailController.signal,
                  }
                )

                .catch((error) => {
                  console.log("An error occured sending the message: " + error.response.data);

                  this.result =
                    "Sorry, but there was an error sending your message. Please contact us directly here - " +
                    process.env.VUE_APP_COMPANY_EMAIL;
                })

                .finally(() => {
                  this.result =
                    "Please check your email for a password reset link.";

                  //Close request.
                  emailController.abort();

                  //Hide the result message.
                  setTimeout(() => (this.result = ""), 5000);
                });
            } else {
              this.result =
                'No account was found with that email address please try again or <a href="/" class="arrow-link" data-toggle="modal" data-dismiss="modal" data-target="#registerModal">Sign Up.<a/>';

              setTimeout(() => (this.result = ""), 5000);
            }
          })

          .finally(() => {
            //Close request.
            securityKeyController.abort();
          });
      }
    },

    dateNowFormat(value) {
      return moment.utc(value).format(process.env.VUE_APP_DATEFORMAT);
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
  font-size: 2rem;
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
  font-size: 0.875rem;
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
    font-size: 3.5rem;
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
    font-size: 3.85rem;
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
