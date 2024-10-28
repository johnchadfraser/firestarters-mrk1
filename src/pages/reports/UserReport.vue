<template>
    <div v-if="loading">

        <base-loader></base-loader>

    </div>
    
    <div v-else>
        <div class="container p-container pt pb rb"> 
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 table-responsive-md">
                    <h1>Registered Users</h1>

                    <div class="pagination">
                      <div class="totalRecords">
                        Total Registered Users: <span class="red">{{ users.length }}</span>
                      </div>

                      <download-excel
                        class="fa fa-file-excel-o download"
                        :data="users"
                        :fields="json_fields"
                        worksheet="results"
                        name="registered-users.csv"
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
                                <th scope="col">Company</th>
                                <th scope="col">Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(user) in users" :key="user.id">
                                <td>{{ user.user_first_name }} {{ user.user_last_name }}</td>
                                <td>{{ user.user_email }}</td>
                                <td>{{ user.user_company }}</td>
                                <td>{{ dateFormat(user.user_time_created) }}</td>
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
        users: {},
        loading: false,
        //Date, First Name, Last Name, Email, Company, Title, Type, Region, Country, Industry, Opt-In
        json_fields: {
          'Date': { field: 'user_time_created', callback: (value) => {
            return moment(value).format(process.env.VUE_APP_DATEFORMAT);
          }},
          'First Name': 'user_first_name',
          'Last Name': 'user_last_name',
          'Email': 'user_email',
          'Company': 'user_company',
          'Title': 'ut_name',
          'Type': 'u_type_name',
          'Region': 'erpr_name',
          'Country': 'cntry_name',
          'Industry': 'i_name',
          'Opt-in': 'umpr_value'
        }
      }
      
    },

    async mounted() {

        //Check auth first.
        await this.checkAuth(this.isAuthenticated, this.userEmail);

        this.getUser();

    },

    methods: {

        async checkAuth(auth, email) {
      await ls.checkAuth(auth, email);
      this.dataReady = true;
    },

      getUser() {

        //Show loading
        this.loading = true;

        //Initialize controller.
        const userController = new AbortController();

        //Get data.
        axios.get(process.env.VUE_APP_API_URL + '/' + process.env.VUE_APP_API_USER_REPORT_ROUTE, { params: {
            order_by: 'user_time_created',
            sort: 'DESC'
        }},
        { signal: userController.signal }
        )

        .then(res => {

          this.users = res.data;

        })

        .catch(error => {

          console.log('An error occured getting user: ' + error.response.data);

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
