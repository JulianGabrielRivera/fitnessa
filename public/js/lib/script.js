document.addEventListener(
  'DOMContentLoaded',
  () => {
    console.log('basic-auth JS imported successfully!');
  },
  false
);

const switchButton = document.querySelector('.switch');
const body = document.querySelector('body');
const nav = document.querySelectorAll('.main-nav a');
const blogText = document.querySelectorAll('.card-body');
const logOut = document.querySelector('.logout_button');
const loggedOutNav = document.querySelectorAll('.header_container nav a');

switchButton.addEventListener('click', () => {
  switchButton.classList.toggle('lightmode');
  body.classList.toggle('lightmode');

  // logOut.classList.toggle('lightmode');

  loggedOutNav.forEach((a) => {
    a.classList.toggle('lightmode');
  });
  nav.forEach((tag) => {
    tag.classList.toggle('lightmode');
  });

  blogText.forEach((blog) => {
    blog.classList.toggle('lightmode');
  });
});
