<template>
  <div class="row">
    <span
      v-for="advisor in advisors"
      :key="advisor.id"
      style="display: contents"
    >
      <div class="col-lg-6 col-md-6 col-sm-12">
        <div class="card">
          <!--Advisor photo-->
          <a :href="advisor.linkedin" target="_blank">
            <img
              role="img"
              v-lazy="getImage(advisor.path, advisor.image)"
              class="card-img-top"
              aria-label="Advisor image"
            />
          </a>

          <div class="card-body">
            <!--Advisor name-->
            <h1>{{ advisor.name }}</h1>

            <!--Advisor title-->
            <h2>{{ advisor.title }}</h2>

            <a :href="advisor.linkedin" target="_blank">
              <img
                role="img"
                src="~@/assets/svg/linkedin-icon.svg"
                :href="advisor.linkedin"
              />
            </a>
          </div>
        </div>
      </div>
    </span>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      advisors: [
        {
          id: "1",
          path: "cxa",
          image: "jmccoy.jpg",
          name: "John McCoy",
          title: "Global VP CX Advisory",
          linkedin: "https://www.linkedin.com/in/therealmccoy1/",
        },

        {
          id: "2",
          path: "cxa",
          image: "jadmire.jpg",
          name: "Jeffrey Admire",
          title: "IM&C CXA",
          linkedin: "https://www.linkedin.com/in/jeffadmire/",
        },

        {
          id: "3",
          path: "cxa",
          image: "jbbarthel.jpg",
          name: "JB Barthel",
          title: "Consumer Products CXA",
          linkedin: "https://www.linkedin.com/in/johncbarthel/",
        },

        {
          id: "4",
          path: "cxa",
          image: "nbohorad.jpg",
          name: "Nicole Bohorad",
          title: "Retail CXA",
          linkedin: "https://www.linkedin.com/in/nbohorad/",
        },

        {
          id: "5",
          path: "cxa",
          image: "jflores.jpg",
          name: "Javier Flores",
          title: "Consumer Products Industry",
          linkedin: "https://www.linkedin.com/in/javflores/",
        },

        {
          id: "6",
          path: "cxa",
          image: "ffroemberg.jpg",
          name: "Florian Froemberg",
          title: "Multi-Industry Insights Director",
          linkedin:
            "https://www.linkedin.com/in/florian-fr%c3%b6mberg-8207751a/",
        },

        {
          id: "7",
          path: "cxa",
          image: "cgoddard.jpg",
          name: "Craig Goddard",
          title: "Studios CXA Lead",
          linkedin: "https://www.linkedin.com/in/craigjgoddard/",
        },

        {
          id: "8",
          path: "cxa",
          image: "tguendling.jpg",
          name: "Tina Guendling",
          title: "Automotive CXA",
          linkedin: "https://www.linkedin.com/in/tina-guendling-mba-210b9027/",
        },

        {
          id: "9",
          path: "cxa",
          image: "pjonsson.jpg",
          name: "Pether Jonsson",
          title: "IM&C CXA",
          linkedin: "https://www.linkedin.com/in/petherjonsson/",
        },

        {
          id: "10",
          path: "cxa",
          image: "zkrauss.jpg",
          name: "Zev Krauss",
          title: "Retail CXA",
          linkedin: "https://www.linkedin.com/in/zev-krauss/",
        },

        {
          id: "11",
          path: "cxa",
          image: "lmcdonald.jpg",
          name: "Luke McDonald",
          title: "IM&C CXA",
          linkedin: "https://www.linkedin.com/in/linklukemcdonald/",
        },

        {
          id: "12",
          path: "cxa",
          image: "totten.jpg",
          name: "Thomas Otten",
          title: "Strategic Partners CXA",
          linkedin: "https://www.linkedin.com/in/thomas-otten-ku/",
        },

        {
          id: "13",
          path: "cxa",
          image: "rsaluja.jpg",
          name: "Ritu Saluja",
          title: "Consumer Products CXA",
          linkedin: "https://www.linkedin.com/in/ritusaluja/",
        },

        {
          id: "14",
          path: "cxa",
          image: "dscribner.jpg",
          name: "David Scribner",
          title: "Strategic APJ CXA",
          linkedin: "https://www.linkedin.com/in/davidrossscribner/",
        },

        {
          id: "15",
          path: "cxa",
          image: "asingh.jpg",
          name: "Amrish Singh",
          title: "Retail CXA",
          linkedin: "https://www.linkedin.com/in/amrish-singh/",
        },

        {
          id: "16",
          path: "cxa",
          image: "avastert.jpg",
          name: "Anouk Vastert",
          title: "Consumer Products CXA",
          linkedin: "https://www.linkedin.com/in/anouk-vastert-b80b042/",
        },
      ],
      loading: false,
      error: null,
    };
  },

  methods: {
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
/*Some styles here support older iPhone responsiveness.*/

h1 {
  font-size: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 1.375rem;
}

h2 {
  font-size: 1rem;
  margin-top: 2rem;
  margin-bottom: 1.375rem;
}

.card {
  border: none;
  text-align: center;
  padding: 2rem 0rem;
  margin: 1rem 2rem;
  background-color: #eceaea;
}

.card-body {
  padding: 1.25rem 0rem;
}

.card-img-top {
  width: 10rem;
  height: 10rem;
  border-radius: 5rem;
  margin: auto;
}

.row {
  padding: 0rem 1rem;
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  h1 {
    font-size: 1.5rem;
    margin-top: 2rem;
    margin-bottom: 1.375rem;
  }

  h2 {
    font-size: 0.875rem;
    margin-top: 2rem;
    margin-bottom: 1.375rem;
  }

  .card {
    padding: 2rem;
  }

  .row {
    padding: 0rem 3rem;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  .row {
    padding: 0rem 4rem;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  h1 {
    font-size: 2rem;
    margin-top: 2rem;
    margin-bottom: 1.375rem;
  }

  h2 {
    font-size: 1rem;
    margin-top: 2rem;
    margin-bottom: 1.375rem;
  }

  .card {
    padding: 2rem;
  }

  .row {
    padding: 0rem 6.5rem;
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
}
</style>
