<template>
  <div
    class="modal fade"
    id="localeModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="localeModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="form">
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
                <h1>Choose Language</h1>
                <p>
                  If the content is available in your preferred language it will
                  be provided.
                </p>
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

        <form id="localeForm" @submit.prevent="setLocale">
          <div class="modal-body">
            <div class="result" v-html="result" v-if="result != ''"></div>

            <div class="row form-group required">
              <div
                class="col"
                :class="{ 'error-border': v$.form.user_locale.$errors.length }"
              >
                <label class="control-label text-muted" for="">Locale</label>
                <select
                  class="form-control form-control-sm"
                  aria-describedby="user_localeHelp"
                  v-model="v$.form.user_locale.$model"
                  :class="{
                    'error-border': v$.form.user_locale.$errors.length,
                  }"
                >
                  <option
                    v-for="ll in localeLanguage"
                    :key="ll.id"
                    :value="ll.ll_code"
                  >
                    {{ ll.ll_name }}
                  </option>
                </select>

                <div
                  class="input-errors"
                  v-for="(error, index) of v$.form.user_locale.$errors"
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
              value="Update"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import jquery from "jquery";
const axios = require("axios");
const ls = require("../../store/storage/LocalStorage");
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  components: {},

  setup() {
    return {
      v$: useVuelidate(),
    };
  },

  data() {
    return {
      localeLanguage: {},
      result: "",
      form: {
        user_locale: ls.getStorage("userLocale"),
      },
    };
  },

  validations() {
    return {
      form: {
        user_locale: {
          required,
        },
      },
    };
  },

  mounted() {
    this.getLocaleLanguage(this.locale);
  },

  methods: {
    setLocale() {
      this.v$.$touch();

      if (this.v$.$error) {
        return;
      } else {
        try {
          ls.setLocale(this.form.user_locale, true);

          //Close modal.
          jquery("#localeModal").modal("hide");
          this.$router.go(0);
        } catch (error) {
          console.log("An error occured setting locale: " + error.response);

          this.result =
            "Sorry, but there was an error setting the locale. Please contact us directly here - " +
            process.env.VUE_APP_COMPANY_EMAIL;
        }
      }
    },

    getLocaleLanguage() {
      //Show loading
      this.loading = true;

      //Initialize controller.
      const localeLanguageController = new AbortController();

      //Get data.
      axios
        .get(
          process.env.VUE_APP_API_URL +
            "/" +
            process.env.VUE_APP_API_LOCALE_LANGUAGE_ROUTE,
          {
            params: {
              status_id: 1,
            },
          },
          { signal: localeLanguageController.signal }
        )

        .then((res) => {
          this.localeLanguage = res.data;
        })

        .catch((error) => {
          console.log(
            "An error occured getting locale language: " + error.response.data
          );
        })

        .finally(() => {
          this.loading = false;

          //Close request.
          localeLanguageController.abort();
        });
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
    font-size: 2rem;
    margin: 1rem 3rem;
  }

  p {
    margin: 1rem 3rem 0rem 3rem;
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
