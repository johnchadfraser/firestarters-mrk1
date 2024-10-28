<template>
  <metainfo></metainfo>

  <jumbotron-page
    :pageImage="pageImage"
    :pageTitle="pageTitle"
    :pageSubTitle="pageSubTitle"
    :pageMessage="pageMessage"
  ></jumbotron-page>

  <div class="container p-container pb rb">
    <div class="row" id="flash">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <h1 id="flash" class="diamond-icon flash-bolt-icon">
          Flash Enterprise Maturity Assessment
        </h1>

        <!--Flash details-->
        <p>
          CX Advisory's FLASH model is a proprietary research tool that
          assesses, scores, and ranks brands against their peers and the
          industry average. FLASH analyzes attributes across the business to
          assess brands' maturity against changing trends, market conditions and
          consumer needs. Leading brands rely on FLASH benchmarks to clarify
          priorities, develop strategies and capabilities, and increase their
          organization's overall performance.
        </p>
      </div>
    </div>

    <!--Start flash feature cards-->

    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <p>
          <img
            role="img"
            src="~@/assets/flash/flash-banner.jpg"
            class="img-fluid"
            aria-label="feature image"
          />
        </p>

        <!--Feature title-->
        <h2 class="diamond-icon">Scoring & Ranking</h2>

        <!--Feature details-->
        <p>
          Brands will receive an overall business maturity score that is
          calculated and based on the weighted scoring of the individual
          attributes to compare against their peers in the industry average and
          leaders in the top quartile.
        </p>
      </div>

      <div class="col-lg-12 col-md-12 col-sm-12">
        <p>
          <img
            role="img"
            src="~@/assets/flash/flash-score.png"
            class="img-fluid"
            aria-label="feature image 2"
          />
        </p>

        <!--Feature title-->
        <h2 class="diamond-icon">Analyze Your Results</h2>

        <!--Feature details-->
        <p>
          You will receive a report to explain your scores on each question,
          identify your brand's strengths and opportunities, and compare against
          benchmarks and best practices.
        </p>
      </div>

      <div class="col-lg-12 col-md-12 col-sm-12">
        <p>
          <img
            role="img"
            src="~@/assets/flash/flash-strengths.png"
            class="img-fluid"
            aria-label="feature image 3"
          />
        </p>

        <!--Feature title-->
        <h2 class="diamond-icon">The Methodology</h2>

        <!--Feature details-->
        <p>
          FLASH Assessment and performance benchmarks are provided by SAP, a
          global leader in enterprise cloud technology supporting 87% of total
          global commerce.
          <br />
          <br />
          Company scores from FLASH are collected, protected and analyzed using
          SAP's Value Lifecycle Management (VLM) technology. VLM provides
          companies with tools, such as benchmarking surveys and business cases,
          to identify the financial and strategic value of their digital
          transformation initiatives.
        </p>
      </div>
    </div>

    <!--End flash benefit cards-->

    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <h3 class="diamond-icon">Get Your Brand Report</h3>
        <!--Flash details-->
        <p>
          Take the <strong>FLASH Retail Assessment</strong> now and see how your
          business' maturity compares to the industry. Get best practice
          recommendations on how to improve your business, and request a
          knowledge expert to walk you through your results.
        </p>

        <p>
          <a
            :href="flashURL"
            target="_blank"
            class="btn btn-primary"
            role="button"
            >Start Your Flash Now!</a
          >
        </p>
      </div>
    </div>
    <div class="row" id="benefits">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <h1 class="diamond-icon benefits-calculator-icon">
          Benefits Calculators
        </h1>

        <p>
          <span class="badge badge-pill badge-primary">benefits</span>
          <span class="badge badge-pill badge-primary">calculators</span>
          <span class="badge badge-pill badge-primary">reports</span>
        </p>

        <!--Benefits calculator details-->
        <p>
          In collaboration with our partners at SAP, we have developed a set of
          tools that will help you identify, and calculate the potential impact
          their CX products could have on your KPIs. The benefits calculators
          empower you to develop your own understanding of the benefits
          associated with the SAP CX product suite, through a simple model
          requiring very little inputs.
        </p>

        <p>
          These tools use a 3 step process where you first select a specific
          industry, the value drivers that are most relevant to your business,
          then input a few baseline metrics. The benefits calculators will then
          provide a benefits summary outlining both the conservative, and
          likely, impact you could expect your business to achieve by
          implementing that specific CX product.
        </p>

        <!--Benefits calculator details-->
        <p>
          Benchmarks and real customer proof points are provided, to enable you
          to validate and adjust the benefit assumptions and drivers directly in
          the tool to come up with a result that is more accurate to what you
          believe your business could achieve. A final downloadable report is
          also available that outlines all of the inputs, data, and results
          developed using the tools.
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <!--Benefits calculator details-->
        <p>
          The total process can be completed in roughly 15 minutes. Select the
          calculator below to learn more, and calculate how SAP CX can impact
          your business today.
        </p>

        <h2 class="diamond-icon">Choose your Calculator</h2>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <p>
          <a
            href="https://valuemanagement.sap.com/bc-info-lite/0/1/sap_commerce_cloud"
            target="_blank"
            class="btn btn-primary benefit-btn"
            role="button"
            >Commerce Calculator</a
          >
        </p>
        <p>
          <a
            href="https://valuemanagement.sap.com/bc-info-lite/0/1/sap_sales_cloud"
            target="_blank"
            class="btn btn-primary benefit-btn"
            role="button"
            >Sales Calculator</a
          >
        </p>
        <p>
          <a
            href="https://valuemanagement.sap.com/bc-info-lite/0/1/sap_service_cloud"
            target="_blank"
            class="btn btn-primary benefit-btn"
            role="button"
            >Service Cloud Calculator</a
          >
        </p>
        <p>
          <a
            href="https://valuemanagement.sap.com/bc-info-lite/0/1/sap_emarsys"
            target="_blank"
            class="btn btn-primary benefit-btn"
            role="button"
            >Marketing Calculator</a
          >
        </p>
        <p>
          <a
            href="https://valuemanagement.sap.com/bc-info-lite/0/1/sap_customer_data_management"
            target="_blank"
            class="btn btn-primary benefit-btn"
            role="button"
            >Customer Data Calculator</a
          >
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <p>
          Join the Firestarters community to stay up to date on the continuous
          development and availability of tools that can help you unlock value,
          and drive your business forward.
        </p>

        <p>
          <router-link
            :to="{ name: 'Home' }"
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#registerModal"
            >Sign Up</router-link
          >
          <router-link :to="{ name: 'About Us' }" class="btn btn-info"
            >Learn More</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { useMeta } from "vue-meta";
import JumbotronPage from "../components/layout/JumbotronPage.vue";

export default {
  components: {
    JumbotronPage,
  },

  setup() {
    useMeta({
      title: "Tools - Firestarters",
      description:
        "Join the Firestarters community to stay up to date on the continuous development and availability of tools that can help you unlock value, and drive your business forward.",
    });
  },

  data() {
    return {
      pageImage: "page-banner-tools",
      pageTitle:
        "Discover our online self-assist <span class='yellow'>tools.</span>",
      pageSubTitle: "Impactful Tools",
      pageMessage:
        "Join the Firestarters community to stay up to date on the continuous development and availability of tools that can help you unlock value, and drive your business forward.",
      flashURL: process.env.VUE_APP_FLASH_WEBSITE_URL,
    };
  },
};
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
  font-size: 0.875rem;
  padding: 0rem 2.25rem;
}

h1.diamond-icon.benefits-calculator-icon {
  background-image: url("../assets/svg/benefit-calculator-icon.svg") !important;
}

h1.diamond-icon.flash-bolt-icon {
  padding: 0.625rem 1.75rem;
  background-image: url("../assets/svg/flash-bolt-icon.svg") !important;
  background-size: 1.25rem;
}

.badge {
  font-size: 0.825rem;
  font-weight: 400;
  text-transform: lowercase;
  padding: 0.375rem 0.75rem;
  margin-right: 0.375rem;
  margin-bottom: 0.5rem;
}

.badge-primary {
  background-color: #003049 !important;
}

p img {
  display: block;
  width: 100%;
  margin: 0 auto;
  border-radius: 0.25rem;
}

p .benefit-btn {
  display: block;
  margin: 0 auto;
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

  h1.diamond-icon.flash-bolt-icon {
    padding: 0.625rem 2.25rem;
    background-position: 0.5rem 1rem;
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
    margin: 0rem 2.5rem;
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

  p img {
    display: block;
    width: 100%;
    margin: 0 auto;
    border-radius: 0.25rem;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  h1 {
    font-size: 2.5rem;
    margin: 5rem 4.5rem 1rem;
  }

  h2 {
    font-size: 2rem;
    margin: 0rem 5rem;
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

  h1.diamond-icon.flash-bolt-icon {
    padding: 0.625rem 2.85rem;
    background-position: 0.5rem 1.125rem;
    background-size: 2rem;
  }

  .benefit-btn {
    font-size: 1.25rem;
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

  p img {
    display: block;
    width: 100%;
    margin: 0 auto;
    border-radius: 0.65rem;
  }

  h1.diamond-icon.flash-bolt-icon {
    padding: 0.625rem 3.5rem;
    background-position: 0.5rem 1.2rem;
    background-size: 2.25rem;
  }
}
</style>
