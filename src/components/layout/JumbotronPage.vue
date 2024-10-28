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
        <h1 v-html="pageTitle"></h1>
      </div>
    </div>

    <div class="row" v-if="pageSubTitle != '' && pageSubTitle != ''">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <h2 class="diamond-icon" v-if="pageSubTitle != ''">
          {{ pageSubTitle }}
        </h2>

        <p v-if="pageSubTitle != ''">
          {{ pageMessage }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
      return require(`@/assets/banner/${pageImage}.jpg`);
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
  padding: 0rem 2.25rem;
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
    padding: 0rem 2.25rem;
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
    padding: 0rem 2.25rem;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  h1 {
    font-size: 4rem;
    color: #fff;
    margin: 4rem 4rem 1rem;
  }

  h2 {
    font-size: 2.75rem;
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
    padding: 0rem 4rem;
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  h1 {
    font-size: 5rem;
    color: #fff;
    margin: 6rem 4rem 1rem;
  }

  h2 {
    font-size: 2.25rem;
    color: #fff;
    margin: 0rem 4rem;
  }

  h2.diamond-icon {
    padding: 0.625rem 3.25rem;
    background-position: 0rem 0.9rem;
    background-size: 2.15rem;
  }

  p {
    font-size: 1.25rem;
    color: #fff;
    padding: 0rem 4rem;
  }
}
</style>
