document.body.classList.add('js-enabled');
const navContainer = document.querySelector('header nav');

const subdomain = '';
// const subdomain = '/thegriffinlegends.com';

navContainer.innerHTML = `
<ul>
  <li><a href="${subdomain}/books">Books</a></li>
  <li><a href="${subdomain}/lore">Lore</a></li>
  <li>
    <a href="https://the-griffin-legends.creator-spring.com" class="external-link">
      Shop
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 24 24"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"
        ></path>
      </svg>
    </a>
  </li>
  <li><a href="${subdomain}/news">News</a></li>
  <li><a href="${subdomain}/about">About</a></li>
  <li><a href="${subdomain}/contact">Contact</a></li>
</ul>`;

// Build hamburger navigation to replace static navigation (if JS enabled)
const closeButton = document.createElement('button');
closeButton.classList.add('hamburger');
closeButton.innerHTML = `
<span class="visually-hidden-accessibility">Open Menu</span>
<span class="first-span"></span>
<span class="second-span"></span>
<span class="third-span"></span>
`;
const headerContent = document.querySelector('header .inner-content');
closeButton.addEventListener('click', function () {
  const header = document.querySelector('header');
  const hamburgerMenu = document.querySelector('.hamburger');
  const menuAccessibilityText = document.querySelector(
    '.hamburger .visually-hidden-accessibility'
  );
  const isOpen = hamburgerMenu.classList.contains('open');
  if (isOpen) {
    document.body.style.overflow = 'visible';
    hamburgerMenu.classList.remove('open');
    header.classList.remove('mobile-menu-open');
    menuAccessibilityText.innerText = 'Open Menu';
  } else {
    document.body.style.overflow = 'hidden';
    hamburgerMenu.classList.add('open');
    header.classList.add('mobile-menu-open');
    menuAccessibilityText.innerText = 'Close Menu';
  }
});
// Close the menu when resized larger than mobile
window.addEventListener('resize', function (event) {
  if (window.innerWidth >= 860) {
    const header = document.querySelector('header');
    const hamburgerMenu = document.querySelector('.hamburger');
    const menuAccessibilityText = document.querySelector(
      '.hamburger .visually-hidden-accessibility'
    );
    document.body.style.overflow = 'visible';
    hamburgerMenu.classList.remove('open');
    header.classList.remove('mobile-menu-open');
    menuAccessibilityText.innerText = 'Open Menu';
  }
});
headerContent.appendChild(closeButton);
