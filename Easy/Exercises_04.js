// Đếm số lượng số chẵn trong mảng

let myArray = [1, 2, 3, 4, 5, 6, 7];

let count = 0;
for (let i = 0; i < myArray.length; i++) {
  if (myArray[i] % 2 == 0) {
    count += 1;
  }
}

console.log(`Số lượng số chẵn trong mảng là ${count}.`);
