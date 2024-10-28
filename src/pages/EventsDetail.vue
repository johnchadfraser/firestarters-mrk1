<template>
  <div v-if="loading">
    <base-loader></base-loader>
  </div>

  <div v-else v-for="event in events" :key="event.id">
    <meta-head
      :title="event.e_title"
      :description="event.e_description"
      :ogImageTypePath="event.imgt_path"
      :ogImage="event.img_file"
    ></meta-head>

    <jumbotron-detail-page
      :pageID="parseInt(event.id)"
      :pageTypeID="parseInt(event.et_id)"
      pageType="event"
      :pageImagePath="event.imgt_path"
      :pageImageFile="event.img_file"
      :pageTitle="event.e_title"
      :pageCaption="`${event.e_description}`"
      :pageDate="event.e_date"
      :pageTags="event.e_tag"
      :pageAuthorID="event.host_user_id"
      :pageAuthor="`${event.host_first_name} ${event.host_last_name}`"
      :pageAuthorImagePath="event.host_imgt_path"
      :pageAuthorImageFile="event.host_img_file"
    ></jumbotron-detail-page>

    <div id="article" class="container p-container pt pb rb">
      <div class="row">
        <div
          :class="
            event.e_url === ''
              ? 'col-lg-8 col-md-8 col-sm-12'
              : 'col-lg-12 col-md-12 col-sm-12'
          "
        >
          <h1 class="diamond-icon">Event Information</h1>

          <!--Event author and date info-->
          <p>
            <strong
              >{{ event.edt_name }} - {{ dateFormat(event.e_date) }}</strong
            >
          </p>

          <p class="small">
            {{ event.e_note }}
          </p>

          <!--Event details-->
          <p v-html="event.e_description"></p>

          <!--Get document(s)-->
          <p>
            <event-document :eventid="parseInt(event.id)"></event-document>
          </p>

          <div v-if="event.edt_id == 2">
            <!--Event city-->
            <h2 class="diamond-icon">Event Details</h2>

            <!--Event time & date-->
            <p>
              <span class="event-date">{{ dateFormat(event.e_date) }}</span>
              <span class="event-time"
                >Time(s):
                <strong
                  >{{ timeFormatEuro(event.time_name_start) }} -
                  {{ timeFormatEuro(event.time_name_end) }} LT</strong
                ></span
              >
              Where:
              <strong>
                <span v-if="event.e_address">{{ event.e_address }},</span>
                <span v-if="event.e_city">&nbsp;{{ event.e_city }}</span>
                <span v-if="event.sp_name">&nbsp;{{ event.sp_name }}</span>
                <span v-if="event.e_zipcode">&nbsp;{{ event.e_zipcode }}</span>
              </strong>

              <!--Event industry-->

              <event-industry-rel
                :e_id="parseInt(event.id)"
              ></event-industry-rel>
            </p>

            <p>
              {{ event.e_note }}
            </p>

            <div v-if="schedules.length > 0">
              <h3 class="diamond-icon">Event Schedule</h3>

              <p v-for="schedule in schedules" :key="schedule.id">
                <span class="schedule-time"
                  >{{ timeFormatEuro(schedule.time_name_start) }} -
                  {{ timeFormatEuro(schedule.time_name_end) }}</span
                >
                <span class="schedule-detail">{{ schedule.e_detail }}</span>
                <span
                  v-if="schedule.e_description"
                  class="schedule-description"
                  v-html="schedule.e_description"
                ></span>
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <p
                v-if="
                  event.e_url != '' &&
                  dateNowFormat(event.e_date) > dateNowFormat(Date.now())
                "
              >
                <a
                  :href="event.e_url"
                  target="_blank"
                  class="btn btn-primary"
                  role="button"
                  :disabled="
                    dateNowFormat(event.e_date) < dateNowFormat(Date.now())
                      ? 'disabled'
                      : ''
                  "
                  >Register Now</a
                >
              </p>

              <p v-else>
                <span>
                  If you're interested in joining our network of professionals
                  in person, please register. We look forward to seeing you
                  around the fire!
                </span>
              </p>

              <p v-if="event.et_id == 4">
                <router-link :to="{ name: 'Academy' }" class="btn btn-info"
                  >Back to Academy courses</router-link
                >
              </p>
              <p v-else>
                <router-link :to="{ name: 'Events' }" class="btn btn-info"
                  >Back to All Events</router-link
                >
              </p>
            </div>
          </div>
        </div>
        <div v-if="event.e_url === ''" class="col-lg-4 col-md-4 col-sm-12">
          <register-event
            :e_id="parseInt(event.id)"
            :event_title="event.e_title"
            :event_date="event.e_date"
          ></register-event>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MetaHead from "../components/layout/MetaHead.vue";
import JumbotronDetailPage from "../components/layout/JumbotronDetailPage.vue";
import RegisterEvent from "../pages/auth/RegisterEvent.vue";
import BaseLoader from "../components/ui/BaseLoader.vue";
import EventDocument from "../components/layout/EventDocument.vue";
import EventIndustryRel from "../components/layout/EventIndustryRel.vue";
const axios = require("axios");
const moment = require("moment-mini");

export default {
  components: {
    MetaHead,
    JumbotronDetailPage,
    RegisterEvent,
    BaseLoader,
    EventDocument,
    EventIndustryRel,
  },

  data() {
    return {
      events: {},
      schedules: {},
      industries: "",
      loading: false,
      id: this.$route.params.id,
    };
  },

  mounted() {
    this.getEvent();
    this.getEventIndustryRel();
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
              id: this.id,
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
          //Get event schedule if applicable.
          this.getEventSchedule(this.id);

          this.loading = false;

          //Close request.
          eventController.abort();
        });
    },

    getEventSchedule(id) {
      //Show loading
      this.loading = true;

      //Initialize controller.
      const eventScheduleController = new AbortController();

      //Get data.
      axios
        .get(
          process.env.VUE_APP_API_URL +
            "/" +
            process.env.VUE_APP_API_EVENT_ROUTE +
            "-schedule-rel/?e_id=" +
            id,
          { signal: eventScheduleController.signal }
        )

        .then((res) => {
          this.schedules = res.data;
        })

        .catch((error) => {
          console.log("An error occured getting user: " + error.response.data);
        })

        .finally(() => {
          this.loading = false;

          //Close request.
          eventScheduleController.abort();
        });
    },

    getEventIndustryRel() {
      //Initialize controller.
      const eventIndustryRelController = new AbortController();

      //Get data.
      axios
        .get(
          process.env.VUE_APP_API_URL +
            "/" +
            process.env.VUE_APP_API_EVENT_INDUSTRY_REL_ROUTE,
          { params: { e_id: this.id } },
          { signal: eventIndustryRelController.signal }
        )

        .then((res) => {
          for (var i = 0; i < res.data.length; i++) {
            this.industries = this.industries + res.data[i].i_name;
            if (i < res.data.length - 1) {
              this.industries = this.industries + ", ";
            }
          }
        })

        .catch((error) => {
          console.log(
            "An error occured getting event industry rel.: " +
              error.response.data
          );
        })

        .finally(() => {
          //Close request.
          eventIndustryRelController.abort();
        });
    },

    //Set the date format.
    dateFormat(value) {
      return moment
        .utc(value, process.env.VUE_APP_DATEFORMAT)
        .format("dddd, DD MMMM YYYY");
    },

    dateNowFormat(value) {
      return moment.utc(value).format(process.env.VUE_APP_DATEFORMAT);
    },

    timeFormatEuro(value) {
      let timeValue = value.split(":");
      timeValue =
        parseInt(timeValue[0]) +
        12 +
        ":" +
        timeValue[1].replace("AM", "").replace("PM", "");
      return timeValue;
    },
  },
};
</script>

<style scoped>
/*Some styles here support older iPhone responsiveness.*/

h1 {
  font-size: 1.5rem;
  margin: 0rem 2.25rem 1rem;
}

h2 {
  font-size: 1.25rem;
  margin: 1rem 1.5rem;
}

h3 {
  font-size: 1.15rem;
  margin: 1rem 1.5rem;
}

p {
  font-size: 0.875rem;
  padding: 0rem 2.25rem;
}

.event-date {
  display: block;
  font-weight: 700;
}

.event-time {
  display: block;
}

.schedule-time {
  display: block;
  font-weight: 700;
  padding: 1rem 0rem 0rem;
}

.schedule-detail {
  display: block;
  border-top: solid 1px;
  padding: 1rem 0rem 0rem;
}

.schedule-description {
  display: block;
  background-color: #f3f1f1;
  margin: 1rem 0rem;
  padding: 1rem;
  border: solid 1px;
  border-radius: 5px;
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  h1 {
    font-size: 1.75rem;
    margin: 0rem 2rem 1rem;
  }

  h2 {
    font-size: 1.65rem;
    margin: 0rem 2rem;
  }

  h3 {
    font-size: 1.5rem;
    margin: 0rem 2rem;
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
    margin: 1.5rem 2.5rem 1rem;
  }

  h2 {
    font-size: 1.75rem;
    margin: 0rem 2.75rem;
  }

  h3 {
    font-size: 1.5rem;
    margin: 0rem 2.5rem;
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
    margin: 2rem 4.75rem 1rem;
  }

  h2 {
    font-size: 2rem;
    margin: 0rem 5.25rem;
  }

  h3 {
    font-size: 1.75rem;
    margin: 0rem 5.25rem;
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
    margin: 2rem 4rem 1rem;
  }

  h2 {
    font-size: 2.5rem;
    padding: 0.625rem 3.5rem;
    margin: 0rem 4rem;
  }

  h3 {
    font-size: 2.25rem;
    padding: 0.5rem 3rem;
    margin: 2rem 4.5rem 1rem;
  }

  p {
    font-size: 1.15rem;
    font-weight: normal;
    margin: 1rem 5.6rem;
  }

  .event-date {
    font-size: 1.5rem;
  }

  .event-time {
    font-size: 1.15rem;
  }
}
</style>
