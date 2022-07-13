const creatineButton = document.querySelector('#creatine');
const preworkoutButton = document.querySelector('#preworkout');
const proteinButton = document.querySelector('#protein');
const postworkoutButton = document.querySelector('#postworkout');
const vitaminsButton = document.querySelector('#vitamins');
const fatburnersButton = document.querySelector('#fatburners');
const clothingButton = document.querySelector('#clothing');
const starOne = document.querySelector('.star1');

const starsContainer = document.querySelector('.starsContainer');
const stars = document.querySelectorAll('star');

const productsName = document.querySelectorAll('.productName');
console.log(productsName);
console.log(productsName.innerText);

// productsName.forEach((product) => {
//   console.log(product.innerText);
// });
const arr = [];
productsName.forEach((product) => {
  const text = product.innerText;
  arr.push(text);
  console.log(text, 'hey');
});
console.log(arr);

let buttonText = creatineButton.innerText;
// productsName.forEach.addEventListener('click', (e) => {
//   console.log(e.currentTarget.dataset.id);
//   // axios.post(`/shopAll/${creatineButton.dataset.userId}`).then((response) => {
//   //   console.log(response.data);
//   // });
// });
creatineButton.addEventListener('click', () => {
  // const filt = productsName.forEach((product) => {
  //   const text = product.innerText;
  // });
  const filtered = arr.filter((name) => {
    return buttonText === name;
  });
  console.log(filtered);
  console.log(buttonText);
});

for (let i = 0; i < stars.length; i++) {
  console.log(i);
  stars.forEach((star) => {
    star.innerHTML = i + 1;
  });
}

// stars.forEach((star) => {
//   star.addEventListener('click', () => {
//     star.innerHTML = star + 1;
//   });
// });

// axios
// // post request to the back end
// .post(`/like/${heartImg[i].dataset.userId}`)
// .then((response) => {
//   console.log(response.data);
//   if (response.data.success) {
//     console.log(response.data);
//     likes[i].textContent = response.data.likedUser.likedMe;
//   }
