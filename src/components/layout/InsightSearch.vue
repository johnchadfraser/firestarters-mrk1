<template>
  <div class="container p-container">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <div class="search-container">
          <h1>Search Insights</h1>

          <div class="row form-group required">
            <div class="col-lg-6 col-md-6 col-sm-12">
              <input
                type="search"
                class="form-control form-control-sm"
                v-model="kw"
                aria-describedby="kwHelp"
                placeholder="Search"
                @input="$emit('update:kw', $event.target.value)"
              />
            </div>

            <div class="col-lg-6 col-md-6 col-sm-12">
              <select
                class="form-control form-control-sm"
                v-model="industry"
                aria-describedby="industryHelp"
                @change="
                  $emit('update:industry', parseInt($event.target.value))
                "
              >
                <option value="0">{{ industrySelected }}</option>
                <option
                  v-for="industry in industries"
                  :key="industry.id"
                  :value="industry.id"
                >
                  {{ industry.i_name }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
import { ref } from "vue";

export default {
  setup() {
    const industry = ref(0);
    const kw = ref();
    return { industry, kw };
  },

  data() {
    return {
      industries: 0,
      industrySelected: "All Industries",
      result: "",
    };
  },

  mounted() {
    //Initialize controller.
    const industryController = new AbortController();

    //Get data.
    axios
      .get(
        process.env.VUE_APP_API_URL +
          "/" +
          process.env.VUE_APP_API_INDUSTRY_ROUTE,
        {
          params: {
            status_id: 1,
          },
          signal: industryController.signal,
        }
      )

      .then((res) => {
        this.industries = res.data;
      })

      .catch((error) => {
        console.log("No data was found: " + error.response.data);

        return "Sorry, but no data was returned.";
      })

      .finally(() => {
        //Close request.
        industryController.abort();
      });
  },
};
</script>

<style scoped>
/*Some styles here support older iPhone responsiveness.*/

h1 {
  font-size: 1.5rem;
}

.form-control {
  margin-top: 1rem;
}

.search-container {
  width: 100%;
  padding: 1rem 1.5rem;
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  h1 {
    font-size: 1.75rem;
  }

  .form-control {
    margin-top: 1rem;
  }

  .search-container {
    width: 100%;
    padding: 1rem 1.5rem;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  h1 {
    font-size: 2rem;
  }

  .form-control {
    margin-top: 1rem;
  }

  .search-container {
    width: 100%;
    padding: 1rem 1.5rem;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  h1 {
    font-size: 2rem;
  }

  .form-control {
    margin-top: 1rem;
  }

  .search-container {
    width: 100%;
    padding: 1rem 4rem;
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  h1 {
    font-size: 2rem;
  }

  .form-control {
    margin-top: 1rem;
  }

  .search-container {
    width: 100%;
    padding: 1rem 4rem;
  }
}
</style>
