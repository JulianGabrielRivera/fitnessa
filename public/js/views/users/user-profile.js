const heartImg = document.querySelectorAll(".heart_img");
const heartImg2 = document.querySelectorAll(".heart_img2");
const likes = document.querySelectorAll(".user p span");
const profileImg = document.querySelectorAll(".profile_img");
const searchBar = document.getElementById("search");
const userProfiles = document.querySelectorAll(".user");
console.log(profileImg);
console.log(heartImg2);

let isSending = false;
for (let i = 0; i < heartImg2.length; i++) {
  heartImg2[i].addEventListener("click", () => {
    //  this part not needed i think
    // if (!isSending) {
    // isSending = true;
    axios
      // post request to the back end
      .post(`/like/${heartImg[i].dataset.userId}`)
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          console.log(response.data);
          likes[i].textContent = response.data.likedUser.likedMe;
        }

        // console.log(response);

        heartImg2[i].classList.add("hidden");
        heartImg[i].classList.remove("hidden");
        // isSending = false;
        console.log(isSending);
      })
      .catch((err) => {
        isSending = false;
        console.log(err);
      });
    // }

    console.log(heartImg[i].dataset.userId);
  });
}

//  page loads set to false by default then if you click it looks for if statement, if true it runs code inside if statement

for (let i = 0; i < heartImg.length; i++) {
  heartImg[i].addEventListener("click", () => {
    // first time it sends its true cause we negative it with ! and second time it wont work until first reponse gets back
    // this part not needed i think
    // if (!isSending) {
    console.log(isSending);

    // isSending = true;
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
          console.log(response.data);
          likes[i].textContent = response.data.likedUser.likedMe;
        }

        heartImg2[i].classList.remove("hidden");
        heartImg[i].classList.add("hidden");
        // isSending = false;
        console.log(response);
      })
      .catch((err) => {
        isSending = false;
        console.log(err);
      });
    // }
  });
}
console.log(isSending);

profileImg.forEach((img) => {
  img.addEventListener("click", () => {
    axios.get(`/users/${img.dataset.userId}/comment`).then((response) => {
      console.log("yes", response.data.userId);
    });
  });
});

searchBar.addEventListener("keyup", (e) => {
  console.log(e);
  // we grab the input here and make it equal to loweracse, they are case sensitive.
  const keyupValue = e.target.value.toLowerCase();
  //  loop through our cards and access the h2 then put them to lowercase so it matches both upper/lower
  userProfiles.forEach((userProfile) => {
    // startswith gives us a boolean true or false
    userProfile
      .querySelector("h2")
      .textContent.toLowerCase()
      .startsWith(keyupValue)
      ? (userProfile.style.display = "block")
      : (userProfile.style.display = "none");
  });
});
