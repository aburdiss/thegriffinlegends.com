let PROJECT_ID = 'qqm8v4gw';
let DATASET = 'production';
let QUERY = encodeURIComponent('*[_type == "home"]');
let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

const firstSectionHeadlineContainer = document.querySelector(
  '#first-section-headline'
);
const firstSectionTextContainer = document.querySelector('#first-section-text');

const contactSectionHeadlineContainer = document.querySelector(
  '#contact-section-headline'
);
const contactSectionTextContainer = document.querySelector(
  '#contact-section-text'
);

// fetch the content
fetch(URL)
  .then((res) => res.json())
  .then(({ result }) => {
    const page = result.find((obj) => obj?._id === 'home');

    // Put data in home page
    const {
      firstSectionHeadline,
      firstSectionText,
      contactSectionHeadline,
      contactSectionText,
    } = page;
    firstSectionHeadlineContainer.innerText = firstSectionHeadline;
    sanityBlockContent(firstSectionTextContainer, firstSectionText);
    contactSectionHeadlineContainer.innerText = contactSectionHeadline;
    sanityBlockContent(contactSectionTextContainer, contactSectionText);
  })
  .catch((err) => console.error(err));
