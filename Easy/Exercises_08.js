// Kiểm tra số nguyên tố

let myNumber = 7;
let test = true;

for (let i = 2; i < Math.sqrt(myNumber); i++) {
  if (myNumber % i == 0) {
    console.log(`${muNumber} không phải số nguyên tố.`);
    test = false;
    break;
  }
}
if (test) {
  console.log(`${myNumber} là số nguyên tố.`);
}
