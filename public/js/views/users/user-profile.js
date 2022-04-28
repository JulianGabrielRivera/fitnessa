const heartImg = document.querySelectorAll('.heart_img');
const heartImg2 = document.querySelectorAll('.heart_img2');
const likes = document.querySelectorAll('.user p span');
const profileImg = document.querySelectorAll('.profile_img');
console.log(profileImg);
console.log(heartImg2);

//  if they have a like in array id
// let counter = 0;

let isSending = false;
for (let i = 0; i < heartImg.length; i++) {
  heartImg[i].addEventListener('click', () => {
    if (!isSending) {
      isSending = true;
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

          // console.log(response);
          isSending = false;
          heartImg[i].classList.add('hidden');
          heartImg2[i].classList.remove('hidden');
        })
        .catch((err) => {
          isSending = false;
          console.log(err);
        });
    }

    // axios call here to store id in an array within my user model
    console.log(heartImg[i].dataset.userId);
    // axios.get('http://localhost:3000/myprofile').then((response) => {
    //   console.log(response);
    // });

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
}
//  page loads set to false by default then if you click it looks for if statement, if true it runs code inside if statement

for (let i = 0; i < heartImg2.length; i++) {
  heartImg2[i].addEventListener('click', () => {
    // first time it sends its true cause we negative it with ! and second time it wont work until first reponse gets back
    if (!isSending) {
      isSending = true;
      // axios call here to store id in an array within my user model
      console.log(heartImg2[i].dataset.userId);
      // axios.get('http://localhost:3000/myprofile').then((response) => {
      //   console.log(response);
      // });
      axios
        .post(`/unlike/${heartImg2[i].dataset.userId}`)
        .then((response) => {
          if (response.data.success) {
            // total number of people that like dthem
            likes[i].textContent = response.data.unlikedUser.likedMe;
          }
          isSending = false;
          heartImg[i].classList.remove('hidden');
          heartImg2[i].classList.add('hidden');

          console.log(response);
        })
        .catch((err) => {
          isSending = false;
          console.log(err);
        });
    }
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
}

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

// {
//   /* <a href='/users/{{userInSession._id}}/edit'>EDIT</a> */
// }
