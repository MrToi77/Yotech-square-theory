// Tính giá trị trung bình trong mảng

let myArray = [1, 2, 3, 4, 5, 6, 7];

let total = 0;
let mean;

for (let i = 0; i < myArray.length; i++) {
  total += myArray[i];
}

mean = Math.floor(total / myArray.length);

console.log(`Giá trị trung bình của mảng là ${mean}.`);
