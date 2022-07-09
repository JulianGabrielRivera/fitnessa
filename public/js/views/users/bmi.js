console.log('hey');
const yourFeet = document.getElementById('myFeet');
const yourInches = document.getElementById('myInches');
const yourWeight = document.getElementById('yourWeight');

const bmi = document.getElementById('bmiButton');
const currBMI = document.getElementById('yourBMI');

console.log(yourFeet);

bmi.addEventListener('click', () => {
  let feet = yourFeet.value;
  console.log(feet);
  let inches = yourInches.value;

  let height = parseInt(inches) + feet * 12;
  console.log(height);

  let weight = yourWeight.value;

  let bmi = (weight / Math.pow(height, 2)) * 703;
  console.log(bmi.toFixed(1));

  currBMI.value = bmi.toFixed(1).toString();
});

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
