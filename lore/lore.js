let PROJECT_ID = 'qqm8v4gw';
let DATASET = 'production';
const PAGE_NAME = 'lorePage';
let QUERY = encodeURIComponent(`*[_type in ["${PAGE_NAME}", "lore"]]{
  _type == "${PAGE_NAME}" => {
    _type,
    firstSectionHeadline,
    firstSectionText,
    firstSectionLink,
  },
  _type == "lore" => {
    _type,
    title,
    slug,
    "authorName": author->name,
    "authorImgUrl": author->image.asset->url,
    publishDate,
    shortDescription,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt,
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

const lorePostsContainer = document.querySelector('#lore-posts-container');

// fetch the content
fetch(URL)
  .then((res) => res.json())
  .then(({ result }) => {
    const page = result.find((obj) => obj?._type === PAGE_NAME);

    // Put data in lore page
    const { firstSectionHeadline, firstSectionText, firstSectionLink } = page;
    firstSectionHeadlineContainer.innerText = firstSectionHeadline;
    sanityBlockContent(firstSectionTextContainer, firstSectionText);
    if (!!firstSectionLink) {
      firstSectionLinkContainer.innerHTML = `<a class="button" href="${firstSectionLink.url}">${firstSectionLink.title}</a>`;
    }

    // Handle Lore Page content
    const lorePages = result.filter((obj) => obj?._type === 'lore');
    if (lorePages?.length > 0) {
      lorePostsContainer.innerHTML = '';
    }
    lorePages
      .sort(
        (a, b) =>
          new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      )
      .map(function (pageData) {
        const loreContainer = document.createElement('div');
        loreContainer.classList.add('article-container');

        loreContainer.innerHTML = `<img
              src="${pageData.imageUrl}"
              alt="${pageData.imageAlt}"
            />
            <div class="text-container">
              <div class="avatar-container">
                <img src="${pageData.authorImgUrl}" alt="${
          pageData.authorName
        }" />
                <div class="right">
                  <a href="../../about#${formatSlug(pageData.authorName)}">${
          pageData.authorName
        }</a>
                  <div class="date">${new Date(
                    pageData.publishDate
                  ).toLocaleDateString()}</div>
                </div>
              </div>
              <a href="./post#${pageData.slug.current}">
                <h2>${pageData.title}</h2>
              </a>
              <div>
                ${
                  sanityBlockContent(
                    document.createElement('div'),
                    pageData.shortDescription
                  ).outerHTML
                }
              </div>
            </div>`;

        lorePostsContainer.appendChild(loreContainer);
      });
  })
  .catch((err) => console.error(err));
