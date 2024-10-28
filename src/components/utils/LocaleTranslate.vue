<template>
  {{ this.localeTranslation }}
</template>

<script>
const axios = require("axios");
const ls = require("../../store/storage/LocalStorage");

export default {
  props: {
    l_column_name: { type: String },
    lt_id: { type: Number },
    default: { type: String },
  },

  data() {
    return {
      locale: ls.getStorage("userLocale"),
      localeTranslation: "Default",
    };
  },

  created() {
    this.getLocaleData();
  },

  methods: {
    async getLocaleData() {
      if (this.locale === "gb") {
        this.localeTranslation = this.default;
      } else {
        //Get data.
        await axios
          .get(
            process.env.VUE_APP_API_URL +
              "/" +
              process.env.VUE_APP_API_LOCALE_ROUTE,
            {
              params: {
                l_column_name: this.l_column_name,
                ll_code: this.locale,
                lt_id: parseInt(this.lt_id),
                status_id: 1,
              },
            }
          )

          .then((res) => {
            if (res.data.length === 0) {
              this.localeTranslation = this.default;
            } else {
              this.localeTranslation = res.data[0].l_translation;
            }
          })

          .catch((error) => {
            console.log(
              "An error occured getting locale data: " + error.response.data
            );
          });
      }
    },
  },
};
</script>
