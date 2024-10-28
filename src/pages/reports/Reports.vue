<template>
  <div class="sub-header"></div>
    <div v-if="loading">

        <base-loader></base-loader>

    </div>
    
    <div v-else>
        <div class="container p-container pt pb rb">
            <div v-if="!this.id" class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 table-responsive-md">
                    <h1>Reports</h1>

                    <p>
                        <table class="table table-striped">
                            <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(report) in reports" :key="report.id">
                                <td><a :href="`?id=${report.id}`" class="link">{{ report.name }}</a></td>
                                <td>{{ report.description }}</td>
                            </tr>
                        </tbody>   
                        </table>
                    </p>

                </div>
            </div>
            <div v-else>
              <div class="col-lg-12 col-md-12 col-sm-12">
                <div class="report-nav"><a href="/reports" class="link">Report List</a></div>
                  <div v-if="id == 1">
                    <user-report></user-report>
                  </div>
                  <div v-if="id == 2">
                    <event-rsvp-report></event-rsvp-report>
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

  import BaseLoader from '../../components/ui/BaseLoader.vue'; 
  import UserReport from '../../pages/reports/UserReport.vue';
  import EventRsvpReport from '../../pages/reports/EventRSVPReport.vue';
  const ls = require("../../store/storage/LocalStorage");

  export default {

    components: {
      BaseLoader,
      UserReport,
      EventRsvpReport
    },

    data() {

      return {
        isAuthenticated: ls.getStorage("userAuthenticated"),
        reports: [
        {
          id: "1",
          path: "user",
          name: "Registered Users",
          description: "List of users."
        },
        {
          id: "2",
          path: "event-rsvp",
          name: "Event RSVP",
          description: "List of users registerd for an event."
        }
      ],
        loading: false,
        id: this.$route.query.id
      }
      
    },

    async mounted() {

        //Check auth first.
        await this.checkAuth(this.isAuthenticated, this.userEmail);

    },

    methods: {

      async checkAuth(auth, email) {
      await ls.checkAuth(auth, email);
      this.dataReady = true;
    },

   }

}

</script>

<style scoped>
/*Some styles here support older iPhone responsiveness.*/

.sub-header {
  height: 4.5rem;
}

h1 {
  font-size: 1.5rem;
  margin: 1rem;
}

p {
    padding:1rem;
}

.report-nav {
  display:block;
  float: right;
  padding: 0rem 2rem;
  font-weight: 700;
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  h1 {
    font-size: 2rem;
    margin-top: 2rem;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
    h1 {
    font-size: 2rem;
    margin-top: 2rem;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
    .sub-header {
    height: 6.5rem;
  }
  h1 {
    font-size: 2rem;
    margin-top: 2rem;
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {

  h1 {
    font-size: 2.5rem;
    margin: 1rem;
  }
}
</style>
