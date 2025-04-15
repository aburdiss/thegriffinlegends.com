const canShare = !!navigator.share;

function main() {
  const h1 = document.querySelector('#title-container');

  if (window.location.hash == '') {
    h1.innerText = 'Error 404: Article not found.';
  }

  let PROJECT_ID = 'qqm8v4gw';
  let DATASET = 'production';
  let QUERY = encodeURIComponent(
    `*[_type == "news" && slug.current == "${window.location.hash.slice(1)}"]{
    headline,
    description,
    shortDescription,
    date,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt,
    }`
  );
  let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

  const avatarContainer = document.querySelector('#avatar-container');
  const bodyContainer = document.querySelector('#post-body-container');

  fetch(URL)
    .then((res) => res.json())
    .then(({ result }) => {
      const post = result[0];
      console.log(post);

      h1.innerText = post.headline;

      const avatarContent = `
        <div class="right">
          <div class="date">
            ${new Date(post.date).toLocaleDateString()}
          </div>
        </div>`;
      avatarContainer.innerHTML = avatarContent;

      const bodyContent = `
      <img src="${post.imageUrl}" alt="${post.imageAlt}" />
      ${
        sanityBlockContent(document.createElement('article'), post.description)
          .outerHTML
      }
      <hr />
      <div class="share-container">
        Share: ${
          !canShare
            ? `<button id="share">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M384 336a63.78 63.78 0 0 0-46.12 19.7l-148-83.27a63.85 63.85 0 0 0 0-32.86l148-83.27a63.8 63.8 0 1 0-15.73-27.87l-148 83.27a64 64 0 1 0 0 88.6l148 83.27A64 64 0 1 0 384 336z"></path></svg>
        </button>`
            : `
        <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          window.location.href
          // 'https://thegriffinlegends.com'
        )}"
          onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=500,width=500');return false;"
          target="_blank"
          title="Share on Facebook">
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M426.8 64H85.2C73.5 64 64 73.5 64 85.2v341.6c0 11.7 9.5 21.2 21.2 21.2H256V296h-45.9v-56H256v-41.4c0-49.6 34.4-76.6 78.7-76.6 21.2 0 44 1.6 49.3 2.3v51.8h-35.3c-24.1 0-28.7 11.4-28.7 28.2V240h57.4l-7.5 56H320v152h106.8c11.7 0 21.2-9.5 21.2-21.2V85.2c0-11.7-9.5-21.2-21.2-21.2z"></path></svg>
        </a>
        <a href="http://twitter.com/share?text=${encodeURIComponent(
          'Check out "' + post.headline + '"'
        )}&url=${encodeURIComponent(
                window.location.href
                // 'https://thegriffinlegends.com'
              )}"
          onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=500,width=500');return false;"
          target="_blank"
          title="Share on X.com">
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M10.4883 14.651L15.25 21H22.25L14.3917 10.5223L20.9308 3H18.2808L13.1643 8.88578L8.75 3H1.75L9.26086 13.0145L2.31915 21H4.96917L10.4883 14.651ZM16.25 19L5.75 5H7.75L18.25 19H16.25Z"></path></svg>
        </a>

        `
        }
      </div>`;
      bodyContainer.innerHTML = bodyContent;

      if (canShare) {
        const shareButton = bodyContainer.querySelector('#share');
        shareButton.addEventListener('click', async function share() {
          navigator.share({
            url: window.location.href,
            title: post.headline,
            text: sanityBlockContent(
              document.createElement('div'),
              post.shortDescription
            ).innerText,
          });
        });
      }
    });
}

main();
