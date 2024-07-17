const prompt = require("prompt-sync")();

console.log("Nhập lựa chọn (ascending/descending):");
let Choice = prompt().trim();
let myArray = [1, 2, 5, 3, 6, 7, 4];

function BubbleSort(arr, ascending = true) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (ascending) {
        if (arr[j] > arr[j + 1]) {
          let tmp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = tmp;
        }
      } else {
        if (arr[j] < arr[j + 1]) {
          let tmp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = tmp;
        }
      }
    }
  }
  return arr;
}

if (Choice === "ascending") {
  console.log(
    `Mảng sau khi được sắp xếp theo thứ tự tăng dần là ${BubbleSort(
      myArray,
      true
    )}`
  );
} else if (Choice === "descending") {
  console.log(
    `Mảng sau khi được sắp xếp theo thứ tự giảm dần là ${BubbleSort(
      myArray,
      false
    )}`
  );
} else {
  console.log(
    "Lựa chọn không hợp lệ. Vui lòng chọn 'ascending' hoặc 'descending'."
  );
}
