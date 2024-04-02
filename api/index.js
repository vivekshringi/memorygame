const express = require('express')
const app = express()
const port = 3000

function shuffleArray(arr) {
  let i = arr.length, j, temp;
  while(--i > 0){
    j = Math.floor(Math.random()*(i+1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

function getArray(){
  const numbers = [];
  for (let index = 0; index < 16; index++) {
      numbers[index] = parseInt(index/2);
  }
  return numbers
}

app.get('/numbers', (req, res) => {
  let numbers = getArray();
  let finalArray = shuffleArray(numbers);
  res.send({"numbers":finalArray})
})

app.use('/static', express.static('public'));

app.post('/', (req, res) => {
    
    res.send('Got a POST request')
  })

app.put('/user', (req, res) => {
    res.send('Got a PUT request at /user')
})

app.delete('/user', (req, res) => {
    res.send('Got a DELETE request at /user')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;