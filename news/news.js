let PROJECT_ID = 'qqm8v4gw';
let DATASET = 'production';
const PAGE_NAME = 'newsEventPage';
let QUERY = encodeURIComponent(`*[_type in ["${PAGE_NAME}", "news", "event"]]{
  _type == "${PAGE_NAME}" => {
    _type,
    mainHeadline,
    eventsHeadline,
    newsHeadline
  },
  _type == "news" => {
    _type,
    headline,
    shortDescription,
    description,
    date,
    slug,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt
  },
  _type == "event" => {
    _type,
    headline,
    description,
    date,
    address1,
    address2,
    address3,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt
  }
}`);
let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

const pageHeadlineContainer = document.querySelector(
  '#page-headline-container'
);

const newsContainer = document.querySelector('#news-container');
const newsHeadlineContainer = document.querySelector(
  '#news-headline-container'
);

const eventsContainer = document.querySelector('#events-container');
const eventsHeadlineContainer = document.querySelector(
  '#events-headline-container'
);

newsContainer.innerHTML = `<p>Loading News...</p>`;
eventsContainer.innerHTML = `<p>Loading Events...</p>`;

// fetch the content
fetch(URL)
  .then((res) => res.json())
  .then(({ result }) => {
    console.log(result);
    const events = result
      .filter(function (content) {
        return content._type === 'event';
      })
      .filter(function (event) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return new Date(event.date).getTime() > tomorrow.getTime();
      });
    const news = result.filter(function (content) {
      return content._type === 'news';
    });
    const pageData = result.find(function (content) {
      return content._type === 'newsEventPage';
    });

    pageHeadlineContainer.innerText = pageData.mainHeadline;
    newsHeadlineContainer.innerText = pageData.newsHeadline;
    eventsHeadlineContainer.innerText = pageData.eventsHeadline;

    if (news.length === 0) {
      newsContainer.innerHTML = `
      <p>There is no news to display at this time.</p>
      <p>Please check back later!</p>`;
    } else {
      newsContainer.innerHTML = createNews(news);
    }

    if (events.length === 0) {
      eventsContainer.innerHTML = `
      <p>There are no Events to display at this time.</p>
      <p>Please check back later!</p>`;
    } else {
      eventsContainer.innerHTML = createEvents(events);
    }
  })
  .catch((err) => {
    document.querySelector('.overlay.events').remove();
    newsHeadlineContainer.innerHTML = 'Failed to load news and events.';
    newsContainer.innerHTML = `<br />
<p>If this persists, please <a href="mailto:thegriffinlegends@alexanderburdiss.com?subject=${encodeURIComponent(
      'The Griffin Legends Error'
    )}&body=${encodeURIComponent(
      "The News Page on The Griffin Legends is not loading. Here's the error: " +
        err
    )}">Contact Us</a>`;
    console.error(err);
  });

function createEvents(eventList) {
  const eventsMarkdownList = eventList
    .sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    })
    .map(function (event) {
      return `
<div class="event-card">
  ${
    !!event.imageUrl
      ? `<div class="left">
          <img src="${event.imageUrl}" alt="${event.imageAlt}" />
        </div>`
      : ''
  }
  <div class="right">
   <h3>${event.headline}</h3>
    <time datetime="${event.date}">
      ${new Date(event.date).toLocaleDateString()}
    </time>
    <div class="location">
      <div>${event.address1}</div>
      <div>${event.address2}</div>
      <div>${event.address3}</div>
    </div>
    <hr />
    <div class="description">
      ${
        sanityBlockContent(document.createElement('div'), event.description)
          .outerHTML
      }
    </div>
  </div>
</div>`;
    });

  return eventsMarkdownList.join('');
}

function createNews(newsList) {
  const newsMarkdownList = newsList
    .sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    })
    .map(function (news) {
      return `
<a class="news-card" href="./article#${news.slug.current}">
  ${
    !!news.imageUrl
      ? `<img src="${news.imageUrl}" alt="${news.imageAlt}" />`
      : ''
  }
  <div class="left">
    <h3>${news.headline}</h3>
    <time datetime="${news.date}">
      ${new Date(news.date).toLocaleDateString()}
    </time>
    <div class="description">
      ${
        sanityBlockContent(document.createElement('div'), news.shortDescription)
          .outerHTML
      }
    </div>
  </div>
</a>`;
    });

  return newsMarkdownList.join('');
}
