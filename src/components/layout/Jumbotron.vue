<template>
  <div class="jumbotron container p-container rb" :style="bgImage">
    <img
      role="img"
      class="svg-container x-background-icon"
      src="~@/assets/svg/x-background.svg"
      loading="lazy"
      aria-label="background icon"
    />

    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <h1>
          <locale-translate
            :l_column_name="pageTitle"
            :lt_id="parseInt(4)"
            :default="pageTitle"
          ></locale-translate>
        </h1>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <h2 class="diamond-icon">
          <locale-translate
            :l_column_name="pageSubTitle"
            :lt_id="parseInt(4)"
            :default="pageSubTitle"
          ></locale-translate>
        </h2>

        <p>
          <locale-translate
            :l_column_name="pageMessage"
            :lt_id="parseInt(4)"
            :default="pageMessage"
          ></locale-translate>
        </p>

        <p>
          <router-link
            :to="{ name: pageLink }"
            class="jt-link yellow"
            :data-toggle="pageLinkType"
            :data-target="pageLinkTarget"
            ><locale-translate
              :l_column_name="pageLinkTitle"
              :lt_id="parseInt(4)"
              :default="pageLinkTitle"
            ></locale-translate
          ></router-link>
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <h2 class="diamond-icon">
          {{ pageSubTitle2 }}
        </h2>

        <p>
          {{ pageMessage2 }}
        </p>

        <p>
          <router-link
            :to="{ name: pageLink2 }"
            class="jt-link yellow"
            :data-toggle="pageLinkType2"
            :data-target="pageLinkTarget2"
            >{{ pageLinkTitle2 }}</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import LocaleTranslate from "../utils/LocaleTranslate.vue";
export default {
  components: {
    LocaleTranslate,
  },

  props: {
    pageImage: {
      type: String,
      default: "",
    },

    pageTitle: {
      type: String,
      default: "",
    },

    pageSubTitle: {
      type: String,
      default: "",
    },

    pageMessage: {
      type: String,
      default: "",
    },

    pageLink: {
      type: String,
      default: "",
    },

    pageLinkTitle: {
      type: String,
      default: "",
    },

    pageLinkType: {
      type: String,
      default: "",
    },

    pageLinkTarget: {
      type: String,
      default: "",
    },

    pageSubTitle2: {
      type: String,
      default: "",
    },

    pageMessage2: {
      type: String,
      default: "",
    },

    pageLink2: {
      type: String,
      default: "",
    },

    pageLinkTitle2: {
      type: String,
      default: "",
    },

    pageLinkType2: {
      type: String,
      default: "",
    },

    pageLinkTarget2: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      bgImage: {
        "background-size": "cover",
        "background-image": `url(${this.getImage(this.pageImage)})`,
      },
    };
  },

  methods: {
    getImage(pageImage) {
      if (pageImage !== "") {
        return require(`@/assets/banner/${pageImage}.jpg`);
      } else {
        return;
      }
    },
  },
};
</script>

<style scoped>
/* Default Styles */

/*Set page banner styles.*/

h1 {
  font-size: 1.85rem;
  color: #fff;
  margin: 4rem 2rem 1rem;
}

h2 {
  font-size: 1.25rem;
  color: #fff;
  margin: 0rem 2rem;
}

h2.diamond-icon {
  padding: 0.625rem 1.75rem;
  background-position: 0rem 0.75rem;
  background-size: 1.25rem;
}

p {
  font-size: 0.875rem;
  color: #fff;
  padding: 0rem 4rem;
}

.jt-link {
  font-size: 0.875rem;
  font-weight: 400;
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  h1 {
    font-size: 2.5rem;
    color: #fff;
    margin: 4rem 2rem 1rem;
  }

  h2 {
    font-size: 1.5rem;
    color: #fff;
    margin: 0rem 2rem;
    background-position: 0rem 0.8rem;
  }

  h2.diamond-icon {
    padding: 0.625rem 2.25rem;
    background-position: 0rem 0.65rem;
    background-size: 1.5rem;
  }

  p {
    font-size: 1rem;
    color: #fff;
    padding: 0rem 4.35rem;
  }

  .jt-link {
    font-size: 1rem;
    font-weight: 400;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  h1 {
    font-size: 3.25rem;
    color: #fff;
    margin: 4rem 2rem 1rem;
  }

  h2 {
    font-size: 1.75rem;
    color: #fff;
    margin: 0rem 2rem;
  }

  h2.diamond-icon {
    padding: 0.625rem 2.25rem;
    background-position: 0rem 0.9rem;
    background-size: 1.5rem;
  }

  p {
    font-size: 1rem;
    color: #fff;
    padding: 0rem 4.35rem;
  }

  .jt-link {
    font-size: 1.25rem;
    font-weight: 400;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  h1 {
    font-size: 4rem;
    color: #fff;
    margin: 5rem 4rem 3rem;
  }

  h2 {
    font-size: 2.5rem;
    color: #fff;
    margin: 0rem 4rem;
  }

  h2.diamond-icon {
    padding: 0.625rem 3rem;
    background-position: 0rem 1.15rem;
    background-size: 2.15rem;
  }

  p {
    font-size: 1.25rem;
    color: #fff;
    padding: 0rem 7.25rem;
  }

  .jt-link {
    font-size: 1.5rem;
    font-weight: 400;
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  h1 {
    font-size: 5rem;
    color: #fff;
    margin: 6rem 4rem 3rem;
  }

  h2 {
    font-size: 2.25rem;
    color: #fff;
    margin: 0rem 4rem 0.5rem;
  }

  h2.diamond-icon {
    padding: 0.625rem 3.25rem;
    background-position: 0rem 0.9rem;
    background-size: 2.15rem;
  }

  p {
    font-size: 1.25rem;
    color: #fff;
    padding: 0rem 7.5rem 1rem;
  }
}
</style>
