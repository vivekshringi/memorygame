let firstValue;
let secondValue;
let count = 0;
let match = 0;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getArray(){
fetch("/numbers")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  }).then((res)=>{
    let random = getRandomInt(3);
    for (let index = 0; index < res.numbers.length ; index++) {
    let block = document.querySelector(`[id='${index}']`)
    let image = document.createElement("img");
    image.src = `../images/${res.numbers[index]}${random}.svg`;
    image.setAttribute("id",`image${index}`);
    block.appendChild(image);
    block.addEventListener('click', () => {
       count++;
       document.getElementById('count').innerText=count;
       block.firstChild.style.display="block";
      if(firstValue==undefined){
        firstValue = block.firstChild.src;
        firstBlock = block.firstChild;
        console.log("firstValue "+firstValue);
        return;
      }
      if(secondValue==undefined){
        secondValue = block.firstChild.src;
        secondBlock = block.firstChild;
        console.log("SecondValue "+secondValue);
      }
      if(firstValue==secondValue){
        console.log("Wonderful");
        match++;
        document.getElementById('match').innerText=match;
        firstValue = undefined;
        secondValue = undefined;
      }
      else{
        setTimeout(() => {
          firstBlock.style.display="none";
          secondBlock.style.display="none";
          firstValue = undefined;
          secondValue = undefined;
        }, "1000");

      }
    });
  }
  })
  .catch((err) => console.error(`Fetch problem: ${err.message}`));
}

getArray();


