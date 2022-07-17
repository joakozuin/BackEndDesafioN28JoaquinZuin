 const calculo = (num) => {
  let sum = 0;
  for (let i = 0; i < num; i++) {
    sum += i;
  }
  return sum;
};


process.on('message', (msg) => {
  console.log('Hijo recibe mensaje padre:-->'+msg)
  if (msg!=0) {
    console.log('Comienza el cálculo');
    const  sum =  calculo(msg);
    //const  sum = 10;
    process.send(sum);
  }
});
