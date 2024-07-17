// Tìm số dư của a chia b không dùng %

let a = 9;

let b = 2;

let remain = 0;
while (true) {
  if (a >= b) {
    a -= b;
  } else {
    remain = a;
    break;
  }
}

if (remain == 0) {
  console.log(`A chia hết cho b.`);
} else {
  console.log(`A chia B dư ${remain}.`);
}
