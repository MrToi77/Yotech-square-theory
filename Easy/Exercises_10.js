// Tìm số lớn nhất trong mảng

let myArray = [1, 2, 3, 4, 5, 5, 7];

let Max = myArray[0];

for (let i = 1; i < myArray.length; i++) {
  if (Max < myArray[i]) {
    Max = myArray[i];
  }
}

console.log(`Số lớn nhất trong mảng là ${Max}.`);
