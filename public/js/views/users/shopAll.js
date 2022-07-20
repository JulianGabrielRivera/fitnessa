const creatineButton = document.querySelector('#creatine');
const preworkoutButton = document.querySelector('#preworkout');
const proteinButton = document.querySelector('#protein');
const postworkoutButton = document.querySelector('#postworkout');
const vitaminsButton = document.querySelector('#vitamins');
const fatburnersButton = document.querySelector('#fatburners');
const clothingButton = document.querySelector('#clothing');
const starOne = document.querySelector('.star1');

const starsContainer = document.querySelector('.starsContainer');
const stars = document.querySelectorAll('.star');

const productsName = document.querySelectorAll('.productName');
console.log(productsName);
console.log(productsName.innerText);
console.log(stars);
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

stars.forEach((star) => {
  star.addEventListener('click', () => {
    console.log('hey');
    star.src = '../images/mariostar.png';
  });

  star.addEventListener('mouseover', () => {
    console.log('hey');
    star.src = '../images/mariostar.png';
  });
});

//

const likedImage = document.querySelectorAll('.like-img');
console.log(likedImage);
const unlikedImage = document.querySelectorAll('.unlike-img');
const likedMe = document.querySelectorAll('.numOfLikes');

let isSending = false;
for (let i = 0; i < likedImage.length; i++) {
  likedImage[i].addEventListener('click', () => {
    if (!isSending) {
      isSending = true;
      axios
        .post(`/likeEmoji/${likedImage[i].dataset.userId}`)
        .then((response) => {
          console.log(response);
          if (response.data.success) {
            likedMe[i].textContent = response.data.totalLikes.likedMe;
          }
          unlikedImage[i].classList.remove('hidden');
          likedImage[i].classList.add('hidden');
          isSending = false;
        })
        .catch((error) => {
          isSending = false;
          console.log(error);
        });
    }
  });
}

for (let i = 0; i < unlikedImage.length; i++) {
  unlikedImage[i].addEventListener('click', () => {
    if (!isSending) {
      isSending = true;
      axios
        .post(`/unlikeEmoji/${unlikedImage[i].dataset.userId}`)
        .then((response) => {
          console.log(response);
          if (response.data.success) {
            likedMe[i].textContent = response.data.totalLikes.likedMe;
          }
          unlikedImage[i].classList.add('hidden');
          likedImage[i].classList.remove('hidden');
          isSending = false;
        })
        .catch((error) => {
          isSending = false;
          console.log(error);
        });
    }
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
