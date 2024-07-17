// Tìm số nhỏ nhất trong mảng

let myArray = [1, 2, 3, 4, 5, 5, 7];

let Min = myArray[0];

for (let i = 1; i < myArray.length; i++) {
  if (Min > myArray[i]) {
    Min = myArray[i];
  }
}

console.log(`Số nhỏ nhất trong mảng là ${Min}.`);
