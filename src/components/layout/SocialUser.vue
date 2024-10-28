<template>
  <div class="social-user">
    <img
      v-if="imgtPath != null"
      v-lazy="{
        src: getImage(imgtPath, imgFile),
        delay: 0,
      }"
      :class="`author-img-${imgSize}`"
      aria-label="Insight Author image"
    />
    <div v-for="ufr in userFieldRel" :key="ufr.id">
      <a
        :href="ufr.ufr_value"
        target="_blank"
        :class="imgtPath != null ? 'linkedin' : 'linkedin-no-photo'"
      >
        <span v-if="imgSize === 'small'">
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 48 48"
            width="20"
            height="20"
          >
            <path
              d="M0 0v18.293l6.415 6.414L0 31.122V48h48V0z"
              fill="#0095ff"
            ></path>
            <path
              d="M20.501 34.702h4.724v-7.935c0-.425.03-.85.155-1.153.342-.848 1.119-1.727 2.424-1.727 1.709 0 2.393 1.303 2.393 3.213v7.602h4.723v-8.148c0-4.364-2.33-6.395-5.438-6.395-2.549 0-3.667 1.424-4.289 2.394h.032v-2.06H20.5c.062 1.333 0 14.21 0 14.21zm-2.614 0v-14.21h-4.723v14.21zm-2.362-16.15c1.648 0 2.673-1.091 2.673-2.455-.03-1.394-1.025-2.455-2.641-2.455s-2.672 1.06-2.672 2.455c0 1.364 1.025 2.455 2.61 2.455h.03z"
              fill="#fff"
            ></path>
          </svg>
        </span>
        <span v-else>
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 48 48"
            width="24"
            height="24"
          >
            <path
              d="M0 0v18.293l6.415 6.414L0 31.122V48h48V0z"
              fill="#0095ff"
            ></path>
            <path
              d="M20.501 34.702h4.724v-7.935c0-.425.03-.85.155-1.153.342-.848 1.119-1.727 2.424-1.727 1.709 0 2.393 1.303 2.393 3.213v7.602h4.723v-8.148c0-4.364-2.33-6.395-5.438-6.395-2.549 0-3.667 1.424-4.289 2.394h.032v-2.06H20.5c.062 1.333 0 14.21 0 14.21zm-2.614 0v-14.21h-4.723v14.21zm-2.362-16.15c1.648 0 2.673-1.091 2.673-2.455-.03-1.394-1.025-2.455-2.641-2.455s-2.672 1.06-2.672 2.455c0 1.364 1.025 2.455 2.61 2.455h.03z"
              fill="#fff"
            ></path>
          </svg>
        </span>
      </a>
    </div>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  props: {
    userID: {
      type: Number,
      default: 0,
    },
    imgtPath: {
      type: String,
      default: "user",
    },
    imgFile: {
      type: String,
      default: "avatar-default.png",
    },
    imgSize: {
      type: String,
      default: "large",
    },
  },

  data() {
    return {
      userFieldRel: {},
      uf_id: 1,
    };
  },

  mounted() {
    this.getUserFieldRel(this.userID, this.uf_id);
  },

  methods: {
    getUserFieldRel(id, uf_id) {
      if (!isNaN(id)) {
        //Show loading
        this.loading = true;

        //Initialize controller.
        const userFieldRelController = new AbortController();

        //Get data.
        axios
          .get(
            process.env.VUE_APP_API_URL +
              "/" +
              process.env.VUE_APP_API_USER_FIELD_REL_ROUTE +
              "/?user_id=" +
              id +
              "&uf_id=" +
              uf_id,
            { signal: userFieldRelController.signal }
          )

          .then((res) => {
            this.userFieldRel = res.data;
          })

          .catch((error) => {
            console.log(
              "An error occured getting user: " + error.response.data
            );
          })

          .finally(() => {
            this.loading = false;

            //Close request.
            userFieldRelController.abort();
          });
      }
    },

    getImage(path, file) {
      const imageURL =
        process.env.VUE_APP_CDN_URL +
        "/" +
        process.env.VUE_APP_CDN_REPOSITORY_PATH +
        "/image/" +
        path +
        "/" +
        file;

      return imageURL;
    },
  },
};
</script>

<style scoped>
.social-user {
  display: block;
  float: left;
  position: relative;
  padding: 0rem;
  margin: 0rem 1rem 1rem 0rem;
}

.linkedin {
  position: absolute;
  right: 0px;
  bottom: -10px;
  z-index: 5;
}

.linkedin-no-photo {
  margin-right: 1rem;
}

.author-img-large {
  position: relative;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 1.75rem;
  z-index: 4;
}

.author-img-medium {
  position: relative;
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 1.65rem;
  z-index: 4;
}

.author-img-small {
  position: relative;
  width: 3rem;
  height: 3rem;
  border-radius: 1.5rem;
  z-index: 4;
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  .author-img-large {
    width: 5rem;
    height: 5rem;
    border-radius: 2.5rem;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  .author-img-large {
    width: 5rem;
    height: 5rem;
    border-radius: 2.5rem;
  }

  .author-img-medium {
    width: 4rem;
    height: 4rem;
    border-radius: 2rem;
  }

  .author-img-small {
    width: 3rem;
    height: 3rem;
    border-radius: 1.5rem;
  }
}
</style>
