let PROJECT_ID = 'qqm8v4gw';
let DATASET = 'production';
const PAGE_NAME = 'contact';
let QUERY = encodeURIComponent('*[_type == "' + PAGE_NAME + '"]');
let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

const firstSectionHeadlineContainer = document.querySelector(
  '#first-section-headline'
);
const firstSectionTextContainer = document.querySelector('#first-section-text');

// fetch the content
fetch(URL)
  .then((res) => res.json())
  .then(({ result }) => {
    const page = result.find((obj) => obj?._id === PAGE_NAME);

    // Put data in contact page
    const { firstSectionHeadline, firstSectionText } = page;
    firstSectionHeadlineContainer.innerText = firstSectionHeadline;
    sanityBlockContent(firstSectionTextContainer, firstSectionText);
  })
  .catch((err) => console.error(err));
