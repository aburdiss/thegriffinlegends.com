let PROJECT_ID = 'qqm8v4gw';
let DATASET = 'production';
const PAGE_NAME = 'about';
let QUERY = encodeURIComponent('*[_type == "' + PAGE_NAME + '"]');
let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

const firstSectionHeadlineContainer = document.querySelector(
  '#first-section-headline'
);
const firstSectionTextContainer = document.querySelector('#first-section-text');

const firstSectionLinkContainer = document.querySelector(
  '#first-section-link-container'
);

// fetch the content
fetch(URL)
  .then((res) => res.json())
  .then(({ result }) => {
    const page = result.find((obj) => obj?._id === PAGE_NAME);

    // Put data in about page
    const { firstSectionHeadline, firstSectionText, firstSectionLink } = page;
    firstSectionHeadlineContainer.innerText = firstSectionHeadline;
    sanityBlockContent(firstSectionTextContainer, firstSectionText);
    if (!!firstSectionLink) {
      firstSectionLinkContainer.innerHTML = `<a class="button" href="${firstSectionLink.url}">${firstSectionLink.title}</a>`;
    }
  })
  .catch((err) => console.error(err));
