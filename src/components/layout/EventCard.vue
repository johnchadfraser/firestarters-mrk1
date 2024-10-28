<template>
  <div v-if="loading">
    <base-loader></base-loader>
  </div>

  <div v-else>
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <h1 class="diamond-icon" v-if="et_id == 4">Upcoming Courses</h1>
      </div>
      <div v-if="events.length == 0" class="col-lg-12 col-md-12 col-sm-12 pb">
        <p>
          No events scheduled. Register now to stay in the loop!<br /><br />
          <a
            href="#"
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#registerModal"
            role="button"
            >Become a Member</a
          >
        </p>
      </div>
      <div
        v-else
        v-for="event in events"
        :key="event.id"
        style="display: contents"
      >
        <div class="col-lg-12 col-md-12 col-sm-12 pb">
          <!--Event image-->
          <router-link
            :to="{
              path: '/events/' + event.id + '/' + event.e_canonical_title,
            }"
          >
            <img
              role="img"
              v-lazy="{ src: getImage(event.imgt_path, event.img_file) }"
              class="img-fluid"
              aria-label="event image"
            />
          </router-link>

          <!--Event title-->
          <h1>
            <router-link
              :to="{
                path: '/events/' + event.id + '/' + event.e_canonical_title,
              }"
              class="link-no-underline"
            >
              {{ event.e_title }}
            </router-link>
          </h1>

          <!--Event tags-->
          <p v-html="splitJoin(event.e_tag)"></p>

          <!--Event industry-->
          <p>
            <event-industry-rel :e_id="parseInt(event.id)"></event-industry-rel>
          </p>

          <!--Event details-->
          <p v-html="event.e_description"></p>

          <!--Event host and date info-->
          <p>
            <strong
              ><span v-if="event.e_city !== '' && event.e_city !== null"
                >{{ event.e_city }} - </span
              >{{ event.edt_name }} - {{ dateFormat(event.e_date) }}</strong
            >
          </p>

          <p class="small">
            {{ event.e_note }}
          </p>

          <p v-if="event.e_url != '' && event.et_id == 4">
            <a
              :href="event.e_url"
              target="_blank"
              class="btn btn-primary"
              role="button"
              >Register For Course</a
            >
          </p>

          <p v-else-if="event.et_id != 4">
            <router-link
              :to="{
                path: '/events/' + event.id + '/' + event.e_canonical_title,
              }"
              class="btn btn-primary btn-sm"
              >Details</router-link
            >
            <event-document :eventid="parseInt(event.id)"></event-document>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseLoader from "@/components/ui/BaseLoader.vue";
import EventDocument from "../../components/layout/EventDocument.vue";
import EventIndustryRel from "../../components/layout/EventIndustryRel.vue";
const axios = require("axios");
const moment = require("moment-mini");

export default {
  components: {
    BaseLoader,
    EventDocument,
    EventIndustryRel,
  },

  props: {
    et_id: {
      type: Number,
      default: 2,
    },
  },

  data() {
    function dateNowFormat(value) {
      return moment.utc(value).format(process.env.VUE_APP_DATEFORMAT);
    }

    return {
      events: {},
      loading: false,
      error: null,
      dateNow: dateNowFormat(Date.now()),
    };
  },

  mounted() {
    this.getEvent();
  },

  methods: {
    getEvent() {
      //Show loading
      this.loading = true;

      //Initialize controller.
      const eventController = new AbortController();

      //Get data.
      axios
        .get(
          process.env.VUE_APP_API_URL +
            "/" +
            process.env.VUE_APP_API_EVENT_ROUTE,
          {
            params: {
              order_by: "e_date ASC",
              e_date_gte: this.dateNow,
              e_data_exp: this.dateNow,
              et_id: this.et_id,
              status_id: 1,
            },
          },
          { signal: eventController.signal }
        )

        .then((res) => {
          this.events = res.data;
        })

        .catch((error) => {
          console.log("An error occured getting user: " + error.response.data);
        })

        .finally(() => {
          this.loading = false;

          //Close request.
          eventController.abort();
        });
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

    splitJoin(str) {
      let badge =
        "<style>.badge {font-weight:400; text-transform:lowercase; padding:0.375rem 0.75rem; margin-right:0.375rem; margin-bottom:0.5rem;} .badge-primary { background-color: #003049 !important; }</style>";
      const list = str.split(", ");

      list.forEach(function (tag) {
        badge =
          badge +
          '<span class="badge badge-pill badge-primary">' +
          tag +
          "</span>";
      });

      return badge;
    },

    dateFormat(value) {
      return moment.utc(value).format(process.env.VUE_APP_DATEFORMAT);
    },
  },
};
</script>

<style scoped>
/*Some styles here support older iPhone responsiveness.*/

h1 {
  font-size: 1.5rem;
  margin: 1rem 2.25rem 1rem;
}

h1.diamond-icon {
  font-size: 1.5rem;
}

p {
  font-size: 0.875rem;
  padding: 0rem 2.25rem;
}

.img-fluid {
  display: block;
  border-radius: 0.25rem;
  width: 80%;
  margin: 0rem 2.25rem;
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  h1 {
    font-size: 1.75rem;
    margin: 1.5rem 2.25rem 1rem;
  }

  h1.diamond-icon {
    font-size: 1.75rem;
  }

  p {
    font-size: 1rem;
    font-weight: normal;
    margin: 1rem 0.25rem;
  }

  .img-fluid {
    display: block;
    border-radius: 0.25rem;
    width: 85%;
    margin: 0rem 2.25rem;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  h1 {
    font-size: 2rem;
    margin: 1.5rem 2.25rem 1rem;
  }

  h1.diamond-icon {
    font-size: 2rem;
  }

  p {
    font-size: 1rem;
    font-weight: normal;
    margin: 1rem 0.25rem;
  }

  .img-fluid {
    display: block;
    border-radius: 0.35rem;
    width: 90%;
    margin: 0rem 2.25rem;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  h1 {
    font-size: 2rem;
    margin: 2rem 4rem 1rem;
  }

  h1.diamond-icon {
    font-size: 2rem;
  }

  p {
    font-size: 1.15rem;
    font-weight: normal;
    margin: 1rem 2rem;
  }

  .img-fluid {
    display: block;
    border-radius: 0.5rem;
    width: 85%;
    margin: 0rem 4rem;
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  h1 {
    font-size: 2rem;
    margin: 2rem 4rem 1rem;
  }

  h1.diamond-icon {
    font-size: 2.5rem;
  }

  p {
    font-size: 1.15rem;
    font-weight: normal;
    margin: 1rem 2rem;
  }

  .img-fluid {
    display: block;
    border-radius: 0.65rem;
    width: 87%;
    margin: 0rem 4.25rem;
  }
}
</style>
