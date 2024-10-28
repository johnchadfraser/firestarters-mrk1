<template>
  <metainfo></metainfo>

  <jumbotron-page
    :pageImage="pageImage"
    :pageTitle="pageTitle"
    :pageSubTitle="pageSubTitle"
    :pageMessage="pageMessage"
  ></jumbotron-page>

  <div class="container p-container pb rb">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <h1 class="diamond-icon">Send Us a Message</h1>

        <div class="result" v-if="result != ''">
          {{ result }}
        </div>

      </div>
    </div>

    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <form @submit.prevent="contactForm">
          <div class="form-group required">
            <label class="control-label text-muted" for="name">Name</label>
            <input
              type="text"
              class="form-control form-control-sm"
              aria-describedby="nameHelp"
              placeholder="Enter full name"
              v-model="v$.form.name.$model"
              :class="{ 'error-border': v$.form.name.$errors.length }"
            />
            <small id="nameHelp" class="form-text text-muted"></small>

            <div
              class="input-errors"
              v-for="(error, index) of v$.form.name.$errors"
              :key="index"
            >
              <div class="error-msg" v-if="index > 0">{{ error.$message }}</div>
            </div>
          </div>

          <div class="form-group required">
            <label class="control-label text-muted" for="email">Email</label>
            <input
              type="email"
              class="form-control form-control-sm"
              aria-describedby="emailHelp"
              placeholder="Enter email address"
              maxlength="32"
              v-model="v$.form.email.$model"
              :class="{ 'error-border': v$.form.email.$errors.length }"
            />

            <div
              class="input-errors"
              v-for="(error, index) of v$.form.email.$errors"
              :key="index"
            >
              <div class="error-msg" v-if="index > 0">{{ error.$message }}</div>
            </div>
          </div>

          <div class="form-group required">
            <label class="control-label text-muted" for="message"
              >Message</label
            >
            <textarea
              class="form-control form-control-sm"
              id="message"
              placeholder="Enter message"
              rows="3"
              v-model="v$.form.message.$model"
              :class="{ 'error-border': v$.form.message.$errors.length }"
            >
            </textarea>

            <div
              class="input-errors"
              v-for="(error, index) of v$.form.message.$errors"
              :key="index"
            >
              <div class="error-msg" v-if="index > 0">{{ error.$message }}</div>
            </div>
          </div>

          <input
            type="submit"
            :disabled="v$.form.$invalid"
            class="btn btn-primary"
            value="Send"
          />
        </form>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <h2 class="diamond-icon">Who are the Firestarters?</h2>

        <p>
          It is a global gathering of people that have Customer Experience in
          their DNA and want to exchange together in a safe and open
          environment. Think about a group of friends & colleagues that share a
          hobby and meet regularly to discuss the latest developments, points of
          views and seek advice from each other on a number of business topics.
        </p>

        <p>
          <router-link
            :to="{ name: 'Home' }"
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#registerModal"
            >Become a Member</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
import { useMeta } from "vue-meta";
import JumbotronPage from "../components/layout/JumbotronPage.vue";
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
  components: {
    JumbotronPage,
  },

  setup() {
    useMeta({
      title: "Contact - Firestarters",
      description:
        "A global gathering of people that have Customer Experience in their DNA and want to exchange together in a safe and open environment. Think about a group of friends & colleagues that share a hobby and meet regularly to discuss the latest developments, points of views and seek advice from each other on a number of business topics.",
    });

    return { v$: useVuelidate() };
  },

  data() {
    return {
      pageImage: "page-banner-contact",
      pageTitle: "Contact Us",
      pageSubTitle: "We're Here For You!",
      pageMessage: "Please allow for 2 -3 business days for us to respond.",
      form: {
        name: "",
        email: "",
        message: "",
        subject: "Firestarter's Contact Form",
        toEmail: process.env.VUE_APP_COMPANY_EMAIL,
        fromEmail: process.env.VUE_APP_NOREPLY_EMAIL,
      },
      result: "",
    };
  },

  validations() {
    return {
      form: {
        name: {
          required,
          first_name_validation: {
            $validator: validValue,
            $message: "Please enter a name.",
          },
        },

        email: {
          required,
          email,
          email_validation: {
            $validator: validEmail,
            $message: "Please enter a valid email address.",
          },
        },

        message: {
          required,
          company_validation: {
            $validator: validValue,
            $message: "Please enter a message.",
          },
        },
      },
    };
  },

  methods: {
    contactForm() {
      this.v$.$touch();

      if (this.v$.$error) {
        return;
      } else {
        //Initialize controller.
        const emailController = new AbortController();

        const firestartersWebsiteURL =
          process.env.VUE_APP_FIRESTARTERS_WEBSITE_URL;

        axios
          .post(
            process.env.VUE_APP_API_URL +
              "/" +
              process.env.VUE_APP_API_EMAIL_ROUTE,
            {
              to: this.form.toEmail,
              from: this.form.fromEmail,
              subject: this.form.subject,
              html:
                '<a href="' +
                firestartersWebsiteURL +
                '"><img role="img" src="cid:firestarters-logo" style="border:none;"/></a><br/><br/>' +
                this.form.name +
                " " +
                this.form.email +
                " sent a message.<br/><br/>" +
                this.form.message,
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
              this.form.toEmail;

            //Hide the result message.
            setTimeout(() => (this.result = ""), 5000);
          })

          .finally(() => {
            this.result =
              "Thank you for your message.  Please allow for up to 48hrs for a response.";

            this.v$.form.$reset();
            this.form.name = "";
            this.form.email = "";
            this.form.message = "";

            //Close request.
            emailController.abort();

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

h1 {
  font-size: 1.5rem;
  margin: 2rem 2rem 1rem;
}

h2 {
  font-size: 1.25rem;
  margin: 1rem 1.5rem;
}

p {
  font-size: 0.875rem;
  padding: 0rem 2.25rem;
}

form {
  padding: 0rem 2rem 1rem;
}

.result {
  font-size: 0.875rem;
  margin: 0rem 2.25rem 2rem;
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  h1 {
    font-size: 1.75rem;
    margin: 1.5rem 2rem 1rem;
  }

  h2 {
    font-size: 1.65rem;
    margin: 0rem 2rem;
  }

  p {
    font-size: 1rem;
    font-weight: normal;
    margin: 1rem 2rem;
  }

  form {
    padding: 0rem 4rem 2rem;
  }

  .result {
    font-size: 1rem;
    margin: 0rem 4.25rem 2rem;
  }

}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  h1 {
    font-size: 2rem;
    margin: 2rem 4rem 1rem;
  }

  h2 {
    font-size: 1.75rem;
    margin: 0rem 4rem;
  }

  p {
    font-size: 1rem;
    font-weight: normal;
    margin: 1rem 4rem;
  }

  form {
    padding: 0rem 6.5rem 3rem;
  }

  .result {
    font-size: 1rem;
    margin: 0rem 6.5rem 2rem;
  }

}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  h1 {
    font-size: 2.5rem;
    margin: 3rem 4.5rem 1rem;
  }

  h2 {
    font-size: 2rem;
    margin: 0rem 4.75rem;
  }

  p {
    font-size: 1.15rem;
    font-weight: normal;
    margin: 1rem 5.5rem;
  }

  form {
    padding: 0rem 7.5rem 3rem;
  }

  .result {
    font-size: 1rem;
    margin: 0rem 7.5rem 2rem;
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  h1 {
    font-size: 3rem;
    margin: 2rem 4rem 1rem;
  }

  h2 {
    font-size: 2.5rem;
    padding: 0.625rem 3.5rem;
    margin: 0rem 4rem;
  }

  p {
    font-size: 1.15rem;
    font-weight: normal;
    margin: 1rem 5.6rem;
  }

  .result {
    font-size: 1rem;
    margin: 0rem 7.5rem 2rem;
  }

}
</style>
