// Đảo ngược thứ tự mảng số

let myArray = [1, 2, 3, 4, 5, 6, 7];
let reversedArray = [];

for (let i = myArray.length - 1; i >= 0; i--) {
  reversedArray.push(myArray[i]);
}

console.log(`Mảng sau khi đảo ngược là ${reversedArray}.`);
