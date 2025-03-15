function main() {
  const h1 = document.querySelector('h1');

  if (window.location.hash == '') {
    h1.innerText = 'Error 404: Lore not found.';
  }

  let PROJECT_ID = 'qqm8v4gw';
  let DATASET = 'production';
  let QUERY = encodeURIComponent(
    `*[_type == "lore" && slug.current == "${window.location.hash.slice(1)}"]{
    title,
    "authorName": author->name,
    "authorImgUrl": author->image.asset->url,
    publishDate,
    body,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt,
    }`
  );
  let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

  fetch(URL)
    .then((res) => res.json())
    .then(({ result }) => {
      const post = result[0];
      console.log(post);

      h1.innerText = post.title;
    });
}

main();
