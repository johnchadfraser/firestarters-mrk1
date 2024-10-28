<template>
  <div class="card">
    <router-link :to="{ name: 'Tools', hash: '#flash' }">
      <img
        role="img"
        src="~@/assets/svg/flash-tool-card.png"
        aria-label="Tool image"
      />
    </router-link>

    <div class="card-body">
      <!--Tool details-->
      <p>
        Leverage an industry specific tool to determine your digital maturity
        against competitors, and the industry average.
      </p>

      <p>
        <router-link
          :to="{ name: 'Tools', hash: '#flash' }"
          class="btn btn-info"
          >Learn About Flash</router-link
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
  margin: 1rem 2rem;
  width: 80%;
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
    margin: 1rem 5rem;
  }

  p {
    padding: 0rem 0rem 0rem 5rem;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  .card img {
    width: 70%;
    margin: 1rem 7.5rem;
  }

  p {
    padding: 0rem 0rem 0rem 7.5rem;
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  .card {
    width: 100%;
    margin: 0rem 2rem 0rem 0rem;
  }

  p {
    font-size: 1.15rem;
    line-height: 1.75rem;
  }
}
</style>
