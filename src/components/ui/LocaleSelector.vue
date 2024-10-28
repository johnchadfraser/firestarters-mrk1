<template>
  <div v-if="loading">
    <base-loader></base-loader>
  </div>
  <div v-else class="ls-container">
    <div v-for="ls in localeLanguage" :key="ls.id">
      <a
        class="navbar-link"
        title="Locale"
        data-toggle="modal"
        data-dismiss="modal"
        data-target="#localeModal"
      >
        <span class="ls-text">{{ ls.ll_name }}</span>
        <img
          :title="ls.ll_name"
          :src="`https://purecatamphetamine.github.io/country-flag-icons/3x2/${ls.ll_code.toUpperCase()}.svg`"
          class="ls-flag-icon"
      /></a>
    </div>
    <p></p>
  </div>
</template>

<script>
const axios = require("axios");
import BaseLoader from "../ui/BaseLoader.vue";
const ls = require("../../store/storage/LocalStorage");

export default {
  components: {
    BaseLoader,
  },

  data() {
    return {
      localeLanguage: {},
      locale: ls.getStorage("userLocale"),
      loading: false,
    };
  },

  mounted() {
    this.getLocaleLanguage(this.locale);
  },

  methods: {
    getLocaleLanguage(ll_code) {
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
              ll_code: ll_code,
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
.ls-container {
  display: block;
  float: right;
  color: #fff;
  padding: 0.25rem;
  font-size: 13px;
  cursor: pointer;
}

.ls-text {
  display: block;
  float: left;
  padding: 0.5rem 0.25rem;
}

.ls-flag-icon {
  display: block;
  float: right;
  width: 2rem;
  padding: 0.5rem 0.25rem;
}

.navbar-link {
  display: block;
  color: #fff;
  font-weight: 400;
  width: 100%;
}
/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
}
</style>
