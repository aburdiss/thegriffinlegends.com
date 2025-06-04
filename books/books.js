let PROJECT_ID = 'qqm8v4gw';
let DATASET = 'production';
const PAGE_NAME = 'bookPage';
let QUERY = encodeURIComponent(`*[_type in ["${PAGE_NAME}", "book"]]{
  _type == "${PAGE_NAME}" => {
    _type,
    firstSectionHeadline,
    firstSectionText,
    firstSectionLink,
  },
  _type == "book" => {
    _type,
    title,
    "author": author->name,
    description,
    isbn,
    purchaseOptions,
    reviews[] {
      name,
      url,
      "imageUrl": image.asset->url
    },
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

const booksContainer = document.querySelector('#books-container');

// fetch the content
fetch(URL)
  .then((res) => res.json())
  .then(({ result }) => {
    const page = result.find((obj) => obj?._type === PAGE_NAME);

    // Put data in books page
    const { firstSectionHeadline, firstSectionText, firstSectionLink } = page;

    firstSectionHeadlineContainer.innerText = firstSectionHeadline;
    sanityBlockContent(firstSectionTextContainer, firstSectionText);
    if (!!firstSectionLink) {
      firstSectionLinkContainer.innerHTML = `<a class="button" href="${firstSectionLink.url}">${firstSectionLink.title}</a>`;
    }

    // Handle all books
    const books = result
      .filter((obj) => obj?._type === 'book')
      .sort(function (a, b) {
        return a.isbn > b.isbn;
      });
    if (books.length > 0) {
      booksContainer.innerHTML = '';
    }
    books.forEach((book) => {
      const bookNode = createBookNode(book);
      booksContainer.appendChild(bookNode);
    });
  })
  .catch((err) => console.error(err));

function createBookNode(bookData) {
  const sectionNode = document.createElement('section');
  sectionNode.classList.add('book');
  sectionNode.classList.add('overlay');
  sectionNode.id = formatSlug(bookData.title);
  const description = document.createElement('div');
  sanityBlockContent(description, bookData.description);
  const innerHtml = `
<div class="image-container">
  <img
    src="${bookData.imageUrl}"
    alt="${bookData.title} Cover"
  />
</div>
<div class="text-container">
  <h2>${bookData.title}</h2>
  <div class="author">
    by <a href="../about#${formatSlug(bookData.author)}" rel="author">${
    bookData.author
  }</a>
  </div>
  <div class="isbn">ISBN ${bookData.isbn}</div>
  ${description.outerHTML}
  <div class="links">
    ${bookData.purchaseOptions
      .map(function (purchaseOption) {
        const link = `<a class="button" href="${purchaseOption.url.trim()}">${
          purchaseOption.title
        }</a>`;
        return link;
      })
      .reduce(function (acc, cur) {
        return acc + cur;
      }, '')}
  </div>
  <h3 class="reviews-heading">Reviews for ${bookData.title}</h3>
  <div class="reviews">
     ${bookData.reviews
       .map(function (review) {
         const imageReview = !!review.imageUrl;
         const link = `<a class="${
           !imageReview ? 'button' : ''
         }" href="${review.url.trim()}">${
           imageReview
             ? `<img src="${review.imageUrl}" alt="${review.name}" />`
             : review.name
         }</a>`;
         return link;
       })
       .reduce(function (acc, cur) {
         return acc + cur;
       }, '')}
  </div>
</div>`;
  sectionNode.innerHTML = innerHtml;
  return sectionNode;
}
