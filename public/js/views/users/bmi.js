const bmiFeet = document.getElementById('myFeet');
const bmiInches = document.getElementById('myInches');
const bmiWeight = document.getElementById('yourWeight');

const bmi = document.getElementById('bmiButton');
const currBMI = document.getElementById('yourBMI');
const currBMR = document.getElementById('yourBMR');
const bmr = document.getElementById('calorieButton');
const calorieWeight = document.getElementById('calorieWeight');
const calorieFeet = document.getElementById('calorieFeet');
const calorieInches = document.getElementById('calorieInches');
const calorieAge = document.getElementById('myAge');
const totalCal = document.getElementById('totalCalories');
const pal = document.getElementById('yourPAL');

const gender = document.getElementById('myGender');

bmi.addEventListener('click', () => {
  let feet = bmiFeet.value;
  console.log(feet);
  let inches = bmiInches.value;

  let height = parseInt(inches) + feet * 12;
  console.log(height);

  let weight = bmiWeight.value;
  console.log(weight);

  let bmi = (weight / Math.pow(height, 2)) * 703;
  console.log(bmi.toFixed(1));

  currBMI.value = bmi.toFixed(1).toString();
});

bmr.addEventListener('click', () => {
  let weight = calorieWeight.value / 2.205;
  weight = weight.toFixed(2);
  console.log(weight);
  let feet = calorieFeet.value * 30.48;
  console.log(feet);

  let inches = calorieInches.value * 2.54;
  console.log(inches);
  // let height = parseInt(inches) + feet * 12;
  // console.log(height);
  let height = feet + inches;
  console.log(height);

  let genderValue = gender.value;
  console.log(genderValue);

  let age = calorieAge.value;
  console.log(age);
  if (genderValue === 'Male') {
    let bmr = 66.5 + 13.75 * weight + 5.003 * height - 4.676 * age;
    currBMR.value = bmr.toFixed();
  } else if (genderValue === 'Female') {
    let bmr = 655.1 + 9.563 * weight + 1.85 * height - 4.676 * age;
    currBMR.value = bmr.toFixed();
  }
  if (pal.value === 'Little/no exercise(sedentary lifestyle)') {
    let calories = currBMR.value * 1.2;
    totalCal.value = calories.toFixed();
  }
  if (pal.value === pal.options[1].value) {
    let calories = currBMR.value * 1.375;
    totalCal.value = calories.toFixed();
  }
  if (pal.value === 'Moderate exercise 2-3 times/week') {
    let calories = currBMR.value * 1.55;
    totalCal.value = calories.toFixed();
  }
  if (pal.value === 'Hard exercise 4-5 times/week') {
    let calories = currBMR.value * 1.725;
    totalCal.value = calories.toFixed();
  }
  if (pal.value === 'Physical job or hard exercise 6-7 times/week') {
    let calories = currBMR.value * 1.9;
    totalCal.value = calories.toFixed();
  }
});

// let stars = [];
// let ratingNumber = Number(data);

// let starNumber = Math.round(ratingNumber);

// const myFilledStarArray = [];

// for (let i = 0; i < starNumber; i++) {
//   myFilledStarArray.push(<div>★</div>);
// }

// const myEmptyStarArray = [];
// for (let i = 0; i < 5 - starNumber; i++) {
//   myEmptyStarArray.push(<div>☆</div>);
// }

// return (
//   <div style={{ display: 'flex', fontSize: '2rem' }}>
//     {myFilledStarArray} {myEmptyStarArray}
//   </div>
);
// axios.get('/cart').then((response) => {
//   console.log(response);
// });

// function bmiCalc(feet, inches, weight) {
//   yourFeet.addEventListener('input', (e) => {
//     let feet = e.target.value;
//     console.log(feet);
//   });
//   yourInches.addEventListener('input', (e) => {
//     let inches = e.target.value;
//     console.log(inches);
//   });
//   yourWeight.addEventListener('input', (e) => {
//     let weight = e.target.value;
//     console.log(weight);
//   });
//   const sum = yourFeet + yourInches + yourWeight;
// }
// bmiCalc(yourFeet, yourInches, yourWeight);
