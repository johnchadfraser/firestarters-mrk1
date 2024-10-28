const axios = require("axios");
const moment = require("moment-mini");

function dateNowFormat(value) {
  return moment.utc(value).format(process.env.VUE_APP_DATEFORMAT);
}

async function setURLS() {
  //Get content urls.
  const content = await getContent();
  var contentURLS = new Array();

  for (let i in content) {
    //Construct the url and date.
    const url = `/insights/${content[i].id}/${content[i].c_canonical_title}`;
    const dateUpdated = `${content[i].c_time_updated}`;

    //Create result.
    result = {
      loc: `${url}`,
      lastmod: dateNowFormat(dateUpdated),
      priority: 0.8,
      changefreq: "weekly",
    };

    //Add to array.
    contentURLS.push(result);
  }

  //Get events urls.
  const events = await getEvents();
  var eventsURLS = new Array();

  for (let i in events) {
    //Construct the url and date.
    const url = `/events/${events[i].id}/${events[i].e_canonical_title}`;
    const dateUpdated = `${events[i].e_time_updated}`;

    //Create result.
    var result = {
      loc: `${url}`,
      lastmod: dateNowFormat(dateUpdated),
      priority: 0.8,
      changefreq: "weekly",
    };

    //Add to array.
    eventsURLS.push(result);
  }

  return contentURLS.concat(eventsURLS);
}

async function getEvents() {
  //Get data.
  const res = await axios.get(
    process.env.VUE_APP_API_URL + "/" + process.env.VUE_APP_API_EVENT_ROUTE,
    {
      params: {
        status_id: 1,
      },
    }
  );

  return res.data;
}

async function getContent() {
  //Get data.
  const res = await axios.get(
    process.env.VUE_APP_API_URL + "/" + process.env.VUE_APP_API_CONTENT_ROUTE,
    {
      params: {
        status_id: 1,
      },
    }
  );

  return res.data;
}

export const urls = setURLS();
