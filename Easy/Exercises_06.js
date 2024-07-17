// Tính tổng số chẵn trong mảng

let myArray = [1, 2, 3, 4, 5, 6, 7];

let total = 0;
for (let i = 0; i < myArray.length; i++) {
  if (myArray[i] % 2 == 0) {
    total += myArray[i];
  }
}

console.log(`Tổng của số chẵn trong mảng là ${total}.`);
