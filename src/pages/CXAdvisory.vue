<template>

  <metainfo></metainfo>

  <jumbotron-page :pageImage="pageImage" :pageTitle="pageTitle" :pageSubTitle="pageSubTitle" :pageMessage="pageMessage"></jumbotron-page>

  <div class="container p-container pb rb"> 

    <div class="row">

      <div class="col-lg-12 col-md-12 col-sm-12">

        <h1 class="diamond-icon">
          What we do
        </h1>

        <p>
          CXAs support with developing or validating your Customer Experience vision and long-term digitalization/transformation strategy.<br/><br/>  
          We offer free CX consultancy services, workshops and insights tailored to your needs, organization, customers, products and services, challenges and opportunities.<br/><br/>  
          Our services can provide tangible and actionable customer analysis and plans to support your business strategies and growth strategies.
        </p>

      </div>

    </div>

    <div class="row">

      <div class="col-lg-6 col-md-6 col-sm-12">

        <h1 class="diamond-icon">
          Industry Expertise
        </h1>

        <p>
          <ul>
            <li>Consumer Products</li>
            <li>Retail</li>
            <li>Life Sciences</li>
            <li>Automotive</li>
            <li>Industrial Machinery & Components</li>
            <li>Travel & Transportation</li>
            <li>Telecomm</li>
            <li>Media & Entertainment</li>
            <li>Utilities</li>
            <li>Chemicals</li>
            <li>Financial Services</li>
          </ul>
        </p>

      </div>

      <div class="col-lg-6 col-md-6 col-sm-12">

        <h1 class="diamond-icon">
          Region Coverage
        </h1>

        <p>
          <ul>
            <li>North America</li>
            <li>Latin America</li>
            <li>Europe/UK</li>
            <li>Middle East</li>
            <li>Africa</li>
            <li>Asia/Pacific</li>
          </ul>
        </p>

      </div>

    </div>

    <div class="row">

      <div class="col-lg-12 col-md-12 col-sm-12">

        <h1 class="diamond-icon">
          The Team
        </h1>

      </div>

      <c-x-advisory-card></c-x-advisory-card>

    </div>

    <div class="row">

      <div class="col-lg-12 col-md-12 col-sm-12">

      <h1 class="diamond-icon">
        Discover our online self-assist tools
      </h1>

    </div>

      <div class="col-lg-6 col-md-6 col-sm-12">

        <flash-card></flash-card>

      </div>

      <div class="col-lg-6 col-md-6 col-sm-12">

        <benefits-calculator-card></benefits-calculator-card>

      </div>
  
    </div>

  </div>

</template>

<script>
 
  import { useMeta } from 'vue-meta';
  import JumbotronPage from '../components/layout/JumbotronPage.vue'; 
  import CXAdvisoryCard from '../components/layout/CXAdvisoryCard.vue';
  import FlashCard from '../components/layout/FlashCard.vue';
  import BenefitsCalculatorCard from '../components/layout/BenefitsCalculatorCard.vue';

  export default {

    components: {
      JumbotronPage,
      CXAdvisoryCard,
      FlashCard,
      BenefitsCalculatorCard
    },

    setup () {
      useMeta({
            title: 'CX Advisory - Firestarters',
            description: 'A team of advisors with proven track records of running and building omnichannel businesses as executives in your industry.'
        })
    },

    data() {

      return {
        pageImage: "page-banner-cxa",  
        pageTitle: "Your <span class='yellow'>CX Advisors</span>",
        pageSubTitle: "Who are we exactly?",
        pageMessage: "A team of advisors with proven track records of running and building omnichannel businesses as executives in your industry."
      }

    },

  }

</script>

<style scoped>

  /*Some styles here support older iPhone responsiveness.*/

  h1 {
    font-size: 1.5rem;
    margin: 2rem 2rem 1rem;
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
    padding: 0rem 2.25rem;
  }

  ul {
    margin: 0rem 4rem 1rem 2.25rem;
  }

  li {
    padding: 0rem;
  }

  /* Small devices (landscape phones, 576px and up) */
  @media (min-width: 576px) {  

    h1 {
      font-size: 1.75rem;
      margin: 1.5rem 2rem 1rem;
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

    ul {
      margin: 1rem 3rem 2rem;
    }

    li {
      font-size: 1rem;
      font-weight: normal;
    }

  }

  /* Medium devices (tablets, 768px and up) */
  @media (min-width: 768px) { 

    h1 {
      font-size: 2rem;
      margin: 1.5rem 2.25rem 1rem;
    }

    h2 {
      font-size: 1.75rem;
      margin: 0rem 4rem;
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

    ul {
      margin: 1rem 3.5rem 2rem;
    }

    li {
      font-size: 1rem;
      font-weight: normal;
    }

  }

  /* Large devices (desktops, 992px and up) */
  @media (min-width: 992px) { 

    h1 {
      font-size: 2.5rem;
      margin: 3rem 0rem 1rem 4.5rem;
    }

    h2 {
      font-size: 2rem;
      margin: 0rem 4.75rem;
    }

    h3 {
      font-size: 1.75rem;
      margin: 0rem 5.25rem;
    }

    p {
      font-size: 1.15rem;
      font-weight: normal;
      margin: 1rem 2.75rem;
    }

    ul {
      margin: 1rem 5rem 2rem;
    }

    li {
      font-size: 1.15rem;
      font-weight: normal;
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
      margin: 2rem 4.5rem;
    }

    p {
      font-size: 1.15rem;
      font-weight: normal;
      margin: 1rem 5.6rem;
    }

    ul {
      margin: 0rem 6.25rem;
    }

    li {
      font-size: 1.15rem;
      font-weight: normal;
    }
    
  }

</style>