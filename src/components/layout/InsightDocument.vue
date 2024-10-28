<template>
  <span v-for="document in documents" :key="document.id">
    <a
      :href="
        repositoryPath +
        '/document/' +
        document.doct_path +
        '/' +
        document.doc_file
      "
      target="_blank"
      class="btn btn-primary btn-sm"
      role="button"
      v-if="document.doc_file !== null"
      >Get Article (PDF)</a
    >
  </span>
</template>

<script>
const axios = require("axios");
const moment = require("moment-mini");

export default {
  props: {
    insightid: { type: Number },
  },

  data() {
    function dateNowFormat(value) {
      return moment.utc(value).format(process.env.VUE_APP_DATEFORMAT);
    }

    return {
      documents: {},
      error: null,
      dateNow: dateNowFormat(Date.now()),
      repositoryPath:
        process.env.VUE_APP_CDN_URL +
        "/" +
        process.env.VUE_APP_CDN_REPOSITORY_PATH,
    };
  },

  mounted() {
    this.getDocument();
  },

  methods: {
    getDocument() {
      //Show loading
      this.loading = true;

      //Initialize controller.
      const documentController = new AbortController();

      //Get data.
      axios
        .get(
          process.env.VUE_APP_API_URL +
            "/" +
            process.env.VUE_APP_API_CONTENT_ROUTE +
            "-document-rel/",
          {
            params: {
              c_id: this.insightid,
              status_id: 1,
            },
          },
          { signal: documentController.signal }
        )

        .then((res) => {
          this.documents = res.data;
        })

        .catch((error) => {
          console.log("An error occured getting user: " + error.response.data);
        })

        .finally(() => {
          this.loading = false;

          //Close request.
          documentController.abort();
        });
    },

    dateFormat(value) {
      return moment.utc(value).format(process.env.VUE_APP_DATEFORMAT);
    },
  },
};
</script>
