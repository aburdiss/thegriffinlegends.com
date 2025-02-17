let PROJECT_ID = 'qqm8v4gw';
let DATASET = 'production';
const PAGE_NAME = 'about';
let QUERY = encodeURIComponent(`*[_type in ["${PAGE_NAME}", "author"]]{
  _type == "${PAGE_NAME}" => {
    _type,
    firstSectionHeadline,
    firstSectionText,
    firstSectionLink,
  },
  _type == "author" => {
    _type,
    name,
    biography,
    "imageUrl": image.asset->url
  }
}`);
let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

const firstSectionHeadlineContainer = document.querySelector(
  '#first-section-headline'
);
const firstSectionTextContainer = document.querySelector('#first-section-text');

const firstSectionLinkContainer = document.querySelector(
  '#first-section-link-container'
);

const biographyContainer = document.querySelector('#bio-container');

// fetch the content
fetch(URL)
  .then((res) => res.json())
  .then(({ result }) => {
    const page = result.find((obj) => obj?._type === PAGE_NAME);

    // Put data in about page
    const { firstSectionHeadline, firstSectionText, firstSectionLink } = page;
    firstSectionHeadlineContainer.innerText = firstSectionHeadline;
    sanityBlockContent(firstSectionTextContainer, firstSectionText);
    if (!!firstSectionLink) {
      firstSectionLinkContainer.innerHTML = `<a class="button" href="${firstSectionLink.url}">${firstSectionLink.title}</a>`;
    }

    const authors = result.filter((obj) => obj?._type === 'author');
    if (authors?.length > 0) {
      biographyContainer.innerHTML = '';
    }
    authors.map(function (author) {
      const authorContainer = document.createElement('section');
      authorContainer.classList.add('bio');
      authorContainer.classList.add('overlay');
      authorContainer.id = formatSlug(author.name);

      const imageContainer = document.createElement('div');
      imageContainer.classList.add('image-container');
      imageContainer.innerHTML = `<img src="${author.imageUrl}" alt="${author.name}" />`;
      authorContainer.appendChild(imageContainer);

      const textContainer = document.createElement('div');
      textContainer.classList.add('text-container');

      const authorNameContainer = document.createElement('h2');
      authorNameContainer.innerText = author.name;
      textContainer.appendChild(authorNameContainer);

      const bioContainer = document.createElement('div');
      bioContainer.classList.add('bio-container');
      sanityBlockContent(bioContainer, author.biography);
      textContainer.appendChild(bioContainer);
      authorContainer.appendChild(textContainer);

      biographyContainer.appendChild(authorContainer);

      scrollToId();
    });
  })
  .catch((err) => console.error(err));
