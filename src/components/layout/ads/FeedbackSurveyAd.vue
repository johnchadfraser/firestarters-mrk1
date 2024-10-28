<template>
  <div class="ad-container">
    <h1>Enjoy this Insight?</h1>
    <p>Tell us what you think?</p>
    <a
      :href="`${feedbackURL}?insightTitle=${title}`"
      target="_blank"
      class="btn btn-sm btn-primary"
      role="button"
      >Feedback Survey</a
    >
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      feedbackURL: process.env.VUE_APP_FIRESTARTERS_FEEDBACK_SURVEY_URL,
    };
  },
};
</script>

<style scoped>
h1 {
  font-size: 2rem;
  color: #fff;
  text-transform: capitalize;
  margin: 2rem 1rem;
}

p {
  color: #fff;
  margin: 1rem;
}

.ad-container {
  display: block;
  float: left;
  width: 100%;
  background-color: #666;
  background-image: url("~@/assets/bg/bg-texture-06.png");
  background-size: cover;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  margin: 0.5rem;
}
</style>
