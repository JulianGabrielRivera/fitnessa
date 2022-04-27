const signUp = document.querySelector('.signup');
const searchBar = document.getElementById('search');
const gymWorkouts = document.querySelectorAll('.workout_card');
// const card = document.querySelectorAll('.card');

console.log(signUp);
console.log(searchBar);
console.log(gymWorkouts);
// console.log(card);

searchBar.addEventListener('keyup', (e) => {
  console.log(e);
  // we grab the input here and make it equal to loweracse, they are case sensitive.
  const keyupValue = e.target.value.toLowerCase();
  //  loop through our cards and access the h2 then put them to lowercase so it matches both upper/lower
  gymWorkouts.forEach((gymWorkout) => {
    // startswith gives us a boolean true or false
    gymWorkout
      .querySelector('h1')
      .textContent.toLowerCase()
      .startsWith(keyupValue)
      ? (gymWorkout.style.display = 'block')
      : (gymWorkout.style.display = 'none');
  });
});
