const newsContainer = document.querySelector('#news-container');
newsContainer.innerHTML = 'Loading News...';

const upcomingNewsContainer = document.createElement('div');
upcomingNewsContainer.classList.add('upcoming-news-container');

const pastNewsContainer = document.createElement('div');
pastNewsContainer.classList.add('past-news-container');

let PROJECT_ID = 'qqm8v4gw';
let DATASET = 'production';
let QUERY = encodeURIComponent('*[_type == "news"]');
let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

// fetch the content
fetch(URL)
  .then((res) => res.json())
  .then(({ result }) => {
    const upcomingNews = [];
    const pastNews = [];

    if (result.length === 0) {
      newsContainer.innerHTML = `
      <p>There is no news to display at this time.</p>
      <p>Please check back later!</p>`;
      return;
    }

    result.forEach(function (news) {
      const newsDate = new Date(news.date);
      const today = new Date();
      if (newsDate >= today) upcomingNews.push(news);
      else pastNews.push(news);
    });
    console.log({ upcomingNews, pastNews });

    newsContainer.innerHTML = '';

    upcomingNewsContainer.innerHTML = `
    <h2>News and Events</h2>
    <div class="upcoming news-container">
      ${
        upcomingNews.length === 0
          ? `<p>There are no upcoming events.</p>
             <p>Please check back later!</p>`
          : createEvents(upcomingNews)
      }
    </div>`;

    pastNewsContainer.innerHTML = `
    <h2>Past News and Events</h2>
    <div class="past news-container">
      ${
        pastNews.length === 0
          ? `<p>There are no past events.</p>
             <p>Please check back later!</p>`
          : createEvents(pastNews)
      }
    </div>`;

    newsContainer.appendChild(upcomingNewsContainer);
    newsContainer.appendChild(pastNewsContainer);
  })
  .catch((err) => {
    newsContainer.innerHTML = `<p>Failed to load news.</p>
<p>If this persists, please <a href="mailto:thegriffinlegends@alexanderburdiss.com?subject=${encodeURIComponent(
      'The Griffin Legends Error'
    )}&body=${encodeURIComponent(
      "The News Page on The Griffin Legends is not loading. Here's the error: " +
        err
    )}">Contact Us</a>`;
    console.error(err);
  });

function createEvents(eventList) {
  const eventsMarkdownList = eventList.map(function (event) {
    return `<h3>${event.headline}</h3>`;
  });

  return eventsMarkdownList.join('');
}
