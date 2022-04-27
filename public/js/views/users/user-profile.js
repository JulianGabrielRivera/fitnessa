const heartImg = document.querySelectorAll('.heart_img');

const likes = document.querySelectorAll('.card p span');
const profileImg = document.querySelectorAll('.profile_img');
console.log(profileImg);
const signUp = document.querySelector('.signup');
const searchBar = document.getElementById('search');
const users = document.querySelectorAll('.card');
// const card = document.querySelectorAll('.card');

console.log(signUp);
console.log(searchBar);
console.log(users);
// console.log(card);

searchBar.addEventListener('keyup', (e) => {
  console.log(e);
  // we grab the input here and make it equal to loweracse, they are case sensitive.
  const keyupValue = e.target.value.toLowerCase();
  //  loop through our cards and access the h2 then put them to lowercase so it matches both upper/lower
  users.forEach((user) => {
    // startswith gives us a boolean true or false
    user.querySelector('h2').textContent.toLowerCase().startsWith(keyupValue)
      ? (user.style.display = 'block')
      : (user.style.display = 'none');
  });
});
//  if they have a like in array id
let counter = 0;
for (let i = 0; i < heartImg.length; i++) {
  heartImg[i].addEventListener('click', () => {
    // axios call here to store id in an array within my user model
    console.log(heartImg[i].dataset.userId);
    // axios.get('http://localhost:3000/myprofile').then((response) => {
    //   console.log(response);
    // });
    axios
      .post(`/like/${heartImg[i].dataset.userId}`)
      .then((response) => {
        if (response.data.success) {
          // total number of people that like dthem
          likes[i].textContent = response.data.likedUser.likedMe;
          // remov e event listenerand attach one with a decrement event
          // two hearts one showing and other one not, one will have increase event and other one decrement

          // convert to number cause its in string format
          // counter = counter + 1;
          // if (counter === 0 || counter % 2 === 1) {
          //   likes[i].textContent = Number(likes[i].textContent) + 1;
          // }
          // console.log(counter);

          // if (counter % 2 === 0) {
          //   likes[i].textContent = Number(likes[i].textContent) - 1;
          // }
        }

        console.log(response);
      })
      .catch((err) => console.log(err));
    // axios
    //   .post('http://localhost:3000/myprofile')
    //   .then((response) => {
    //     console.log(response.data);
    //     // console.log(response.status);
    //     // console.log(response.statusText);
    //     // console.log(response.headers);
    //     // console.log(response.config);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  });

  // axios
  //   .post(`unlike/${heartImg[i].dataset.userId}`)
  //   .then((response) => {
  //     if (response.data.success) {
  //       // total number of people that like dthem
  //       likes[i].textContent = response.data.likedUser.likedMe;
  //       // remov e event listenerand attach one with a decrement event
  //       // two hearts one showing and other one not, one will have increase event and other one decrement

  //       // convert to number cause its in string format
  //       // counter = counter + 1;
  //       // if (counter === 0 || counter % 2 === 1) {
  //       //   likes[i].textContent = Number(likes[i].textContent) + 1;
  //       // }
  //       // console.log(counter);

  //       // if (counter % 2 === 0) {
  //       //   likes[i].textContent = Number(likes[i].textContent) - 1;
  //       // }
  //     }
  //   })
  //   .catch((err) => console.log(err));
}
profileImg.forEach((img) => {
  img.addEventListener('click', () => {
    axios.get(`/users/${img.dataset.userId}/comment`).then((response) => {
      console.log('yes', response.data.userId);
    });
  });
});
// {
//   /* <a href='/users/{{userInSession._id}}/edit'>EDIT</a> */
// }
