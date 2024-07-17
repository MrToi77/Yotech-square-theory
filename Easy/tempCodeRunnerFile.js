  let factorial = 1;
  for (let i = 1; i <= n; i++) {
    factorial *= i;
  }
  return factorial;
}

console.log(`Giai thừa của ${myFactorial} là ${factorial(myFactorial)}.`);
