// Hoán đổi giá trị a b c

let a = 1;
let b = 2;
let c = 3;

function swap(a, b, c) {
  let tmp = a;
  a = b;
  b = c;
  c = tmp;
  return [a, b, c]; // Trả về một mảng các giá trị đã đổi
}

// Gán kết quả của hàm swap vào các biến mới
[a, b, c] = swap(a, b, c);

console.log(`Ba số sau khi đổi giá trị là ${a},${b},${c}.`);
