<template>
  <div class="card">
    <router-link :to="{ name: 'Tools', hash: '#benefits' }">
      <img
        role="img"
        src="~@/assets/svg/benefit-calculator-tool-card.png"
        aria-label="Tool image"
      />
    </router-link>

    <div class="card-body">
      <!--Tool details-->
      <p>
        Use this tool to calculate the impact specific products could have on
        your KPIs.
      </p>

      <p>
        <router-link
          :to="{ name: 'Tools', hash: '#benefits' }"
          class="btn btn-info"
          >Learn About Calculators</router-link
        >
      </p>
    </div>
  </div>
</template>

<style scoped>
/*Some styles here support older iPhone responsiveness.*/

p {
  padding: 0rem 2.25rem;
}

.card img {
  width: 80%;
  margin: 1rem 2rem;
}

.card-body {
  padding: 1.25rem 0rem;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-top: 0.75rem;
  margin-bottom: 1.375rem;
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  .card img {
    width: 75%;
    margin: 1rem 4rem;
  }

  p {
    padding: 0rem 4rem;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  .card img {
    width: 75%;
    margin: 1rem 0rem;
  }

  p {
    padding: 0rem 6.5rem 0rem 0rem;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  .card img {
    width: 70%;
    margin: 1rem 2rem;
  }

  p {
    padding: 0rem 7rem 0rem 2rem;
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  .card {
    width: 100%;
    margin: 0rem;
  }

  p {
    font-size: 1.15rem;
    line-height: 1.75rem;
  }
}
</style>
