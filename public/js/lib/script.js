document.addEventListener(
  'DOMContentLoaded',
  () => {
    console.log('basic-auth JS imported successfully!');
  },
  false
);
// const signUp = document.querySelector('.signup');
// const searchBar = document.getElementById('search');
// const users = document.querySelectorAll('.card');
// // const card = document.querySelectorAll('.card');

// console.log(signUp);
// console.log(searchBar);
// console.log(users);
// // console.log(card);

// searchBar.addEventListener('keyup', (e) => {
//   console.log(e);
//   // we grab the input here and make it equal to loweracse, they are case sensitive.
//   const keyupValue = e.target.value.toLowerCase();
//   //  loop through our cards and access the h2 then put them to lowercase so it matches both upper/lower
//   users.forEach((user) => {
//     // startswith gives us a boolean true or false
//     user.querySelector('h2').textContent.toLowerCase().startsWith(keyupValue)
//       ? (user.style.display = 'block')
//       : (user.style.display = 'none');
//   });
// });

// searchBar.addEventListener('keyup', (e) => {
//   const term = e.target.value.toLowerCase();

//   names.forEach((name) => {
//     if (term === users) {
//       card.style.display = none;
//     }
//   });
// });
