let PROJECT_ID = 'qqm8v4gw';
let DATASET = 'production';
const PAGE_NAME = 'home';
let QUERY = encodeURIComponent(`*[_type == "${PAGE_NAME}"]{
  _id,
  firstSectionHeadline,
  firstSectionText,
  "firstSectionImageUrl": firstSectionImage.asset->url,
  "firstSectionImageAlt": firstSectionImage.alt,
  featuredBookHeadline,
  "featuredBookImageUrl": featuredBook->image.asset->url,
  "featuredBookTitle": featuredBook->title,
  "featuredBookDescription": featuredBook->description,
  featuredBookCta,
  contactSectionHeadline,
  contactSectionText
}`);
let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

// First Section Elements
const firstSectionHeadlineContainer = document.querySelector(
  '#first-section-headline'
);
const firstSectionTextContainer = document.querySelector('#first-section-text');
const firstSectionImageContainer = document.querySelector(
  '#first-section-image'
);

// Featured Book Elements
const featuredBookHeadlineContainer = document.querySelector(
  '#featured-book-headline'
);
const featuredBookTitleContainer = document.querySelector(
  '#featured-book-title'
);
const featuredBookImageElement = document.querySelector('#featured-book-image');
const featuredBookDescriptionContainer = document.querySelector(
  '#featured-book-description'
);
const featuredBookCtaElement = document.querySelector('#featured-book-cta');

// Contact Section Elements
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
    console.log(result);
    const page = result.find((obj) => obj?._id === PAGE_NAME);

    // Put data in home page
    const {
      firstSectionHeadline,
      firstSectionText,
      firstSectionImageUrl,
      firstSectionImageAlt,
      featuredBookHeadline,
      featuredBookTitle,
      featuredBookImageUrl,
      featuredBookDescription,
      featuredBookCta,
      contactSectionHeadline,
      contactSectionText,
    } = page;

    // First Section
    firstSectionHeadlineContainer.innerText = firstSectionHeadline;
    sanityBlockContent(firstSectionTextContainer, firstSectionText);

    const firstSectionImageElement = document.createElement('img');
    firstSectionImageElement.src = firstSectionImageUrl;
    firstSectionImageElement.alt = firstSectionImageAlt;
    firstSectionImageContainer.innerHTML = '';
    firstSectionImageContainer.appendChild(firstSectionImageElement);

    // Featured Book Section
    featuredBookHeadlineContainer.innerText = featuredBookHeadline;
    featuredBookTitleContainer.innerText = featuredBookTitle;
    featuredBookImageElement.src = featuredBookImageUrl;
    featuredBookImageElement.alt = featuredBookTitle;
    sanityBlockContent(
      featuredBookDescriptionContainer,
      featuredBookDescription
    );
    featuredBookCtaElement.href = featuredBookCta.url;
    featuredBookCtaElement.innerText = featuredBookCta.title;

    // Contact Section
    contactSectionHeadlineContainer.innerText = contactSectionHeadline;
    sanityBlockContent(contactSectionTextContainer, contactSectionText);
  })
  .catch((err) => console.error(err));
