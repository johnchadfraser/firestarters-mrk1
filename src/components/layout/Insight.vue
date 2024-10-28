<template>
  <div class="container p-container">
    <insight-main></insight-main>

    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <h1 class="diamond-icon">Insight Information</h1>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <p>
          Members are welcome at anytime to jump on the site and review content
          and (coming soon) submit your own articles, best practices, and engage
          with other members.
        </p>

        <p>
          <router-link :to="{ name: 'Insights' }" class="btn btn-info"
            >More Insights</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import InsightMain from "../../components/layout/InsightMain.vue";

export default {
  components: {
    InsightMain,
  },
};
</script>

<style scoped>
/*Some styles here support older iPhone responsiveness.*/

h1 {
  font-size: 1.5rem;
  margin: 1rem 2rem 1rem;
}

p {
  font-size: 0.875rem;
  padding: 0rem 2.25rem;
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  h1 {
    font-size: 1.75rem;
    margin: 1.5rem 2rem 0rem;
  }

  p {
    font-size: 1rem;
    font-weight: normal;
    margin: 1rem 2rem;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  h1 {
    font-size: 2rem;
    margin: 1.5rem 2.25rem 0rem;
  }

  p {
    font-size: 1rem;
    font-weight: normal;
    margin: 1rem 2.75rem;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  h1 {
    font-size: 2.5rem;
    margin: 5rem 4.5rem 0rem;
  }

  p {
    font-size: 1.15rem;
    font-weight: normal;
    margin: 1rem 5.5rem;
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  h1 {
    font-size: 3rem;
    margin: 2rem 4rem 0rem;
  }

  p {
    font-size: 1.15rem;
    font-weight: normal;
    margin: 1rem 5.6rem;
  }
}
</style>