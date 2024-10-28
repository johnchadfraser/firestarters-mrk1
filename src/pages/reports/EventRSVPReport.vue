<template>
    <div v-if="loading">

        <base-loader></base-loader>

    </div>
    
    <div v-else>
        <div class="container p-container pt pb rb"> 
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 table-responsive-md">
                    <h1>Event User RSVP</h1>

                    <div class="pagination">
                      <div class="totalRecords">
                        Total RSVPs: <span class="red">{{ rsvps.length }}</span>
                      </div>

                      <download-excel
                        class="fa fa-file-excel-o download"
                        :data="rsvps"
                        :fields="json_fields"
                        worksheet="results"
                        name="event-user-rsvp.csv"
                        type="csv"
                      ><span class="downloadText">Download Report</span>
                      </download-excel>
                  </div>

                    <p>
                        <table class="table table-striped">
                            <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Event</th>
                                <th scope="col">Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(rsvp) in rsvps" :key="rsvp.id">
                                <td>{{ rsvp.user_first_name }} {{ rsvp.user_last_name }}</td>
                                <td>{{ rsvp.user_email }}</td>
                                <td>{{ rsvp.e_title }}</td>
                                <td>{{ dateFormat(rsvp.eursvpr_time_created) }}</td>
                            </tr>
                        </tbody>   
                        </table>
                    </p>

                </div>
            </div>
        </div>
    </div>
</template>

<script>

  import BaseLoader from '../../components/ui/BaseLoader.vue'; 
  const ls = require("../../store/storage/LocalStorage");
  const axios = require("axios");
  const moment = require("moment-mini");
  import JsonExcel from "vue-json-excel3";

  export default {

    components: {
      BaseLoader,
      downloadExcel:JsonExcel
    },

    data() {

      return {
        isAuthenticated: ls.getStorage("userAuthenticated"),
        rsvps: {},
        loading: false,
        //Date, Event, First Name, Last Name, Email, Company, Title, Country, Industry
        json_fields: {
          'Date': { field: 'eursvpr_time_created', callback: (value) => {
            return moment(value).format(process.env.VUE_APP_DATEFORMAT);
          }},
          'Event': 'e_title',
          'First Name': 'user_first_name',
          'Last Name': 'user_last_name',
          'Email': 'user_email',
          'Company': 'user_company',
          'Title': 'ut_name',
          'Country': 'cntry_name',
          'Industry': 'i_name'
        }
      }
      
    },

    async mounted() {

        //Check auth first.
        await this.checkAuth(this.isAuthenticated, this.userEmail);

        this.getEventUserRSVP();

    },

    methods: {

        async checkAuth(auth, email) {
      await ls.checkAuth(auth, email);
      this.dataReady = true;
    },

      getEventUserRSVP() {

        //Show loading
        this.loading = true;

        //Initialize controller.
        const userController = new AbortController();

        //Get data.
        axios.get(process.env.VUE_APP_API_URL + '/' + process.env.VUE_APP_API_EVENT_USER_RSVP_REPORT_ROUTE, { params: {
            order_by: 'eursvpr_time_created',
            sort: 'DESC'
        }},
        { signal: userController.signal }
        )

        .then(res => {

          this.rsvps = res.data;

        })

        .catch(error => {

          console.log('An error occured getting rsvp: ' + error.response.data);

        })

        .finally(()=> {

          this.loading = false;
          
          //Close request.
          userController.abort();
        
        });

      },

      //Set the date format.
      dateFormat(value) {
        return moment.utc(value, process.env.VUE_APP_DATEFORMAT).format('dddd, DD MMMM');
      },

      dateNowFormat(value) {
        return moment.utc(value).format(process.env.VUE_APP_DATEFORMAT);
      }

   }

}

</script>

<style scoped>
/*Some styles here support older iPhone responsiveness.*/

h1 {
  font-size: 1.5rem;
  margin: 1rem;
}

.pagination {
  display:block;
  margin: 1rem;
  width: auto;
  height:55px;
}

p {
  padding:1rem;
}

.totalRecords {
  display: block;
  float:left;
  height:auto;
  padding: 10px 0px 0px;
}

.download {
  display: block;
  float:right;
  cursor: pointer;
  padding: 1rem;
}

.downloadText {
  font-weight: 300;
  font-family: "Roboto Condensed", Arial, Helvetica, sans-serif !important;
  margin-left:0.5rem;
  text-decoration: underline;
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
