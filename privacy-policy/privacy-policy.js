let PROJECT_ID = 'qqm8v4gw';
let DATASET = 'production';
let QUERY = encodeURIComponent('*[_type == "privacyPolicy"]');
let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

const headlineContainer = document.querySelector('#privacy-policy-header');
const textContainer = document.querySelector('#privacy-policy-container');

// fetch the content
fetch(URL)
  .then((res) => res.json())
  .then(({ result }) => {
    const page = result.find((obj) => obj?._id === 'privacyPolicy');

    // Put data in home page
    const { headline, privacyPolicy } = page;
    headlineContainer.innerText = headline;
    sanityBlockContent(textContainer, privacyPolicy);
  })
  .catch((err) => console.error(err));
