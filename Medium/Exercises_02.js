let ArrA = [1, 2, 3, 4, 5];
let ArrB = [6, 7, 8, 9, 10];
for (let i = 0; i < ArrB.length; i++) {
  ArrA.push(ArrB[i]);
}
console.log(`Hai mảng sau khi được nối là ${ArrA}`);
