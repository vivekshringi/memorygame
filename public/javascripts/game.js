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
       block.firstChild.style.display="block";
      if(firstValue==undefined){
        firstValue = block.firstChild.src;
        firstBlock = block.firstChild;
        firstIndex = index;
        console.log("firstValue "+firstValue);
        count++;
        document.getElementById('count').innerText=count;
        console.log("First click "+index);
        return;
      }
      if(firstValue!=undefined && secondValue==undefined){
        secondValue = block.firstChild.src;
        secondBlock = block.firstChild;
        secondIndex = index;
        count++;
        document.getElementById('count').innerText=count;
        console.log("SecondValue "+secondValue);
        console.log("Second click "+index);
      }
      if(firstValue==secondValue && firstIndex!=secondIndex){
        console.log("Wonderful");
        match++;
        document.getElementById('match').innerText=match;
        firstValue = undefined;
        secondValue = undefined;
        if(match==8){
          const button = document.createElement('button');
          button.innerText = "Restart the game";
          button.addEventListener("click",()=>{location.reload();})
          document.getElementById("result").innerText = "You won the match!"
          document.getElementById("result").append(button);
        }
      }
      else{
        setTimeout(() => {
          firstBlock.style.display="none";
          secondBlock.style.display="none";
          firstValue = undefined;
          secondValue = undefined;
        }, "100");

      }
    });
  }
  })
  .catch((err) => console.error(`Fetch problem: ${err.message}`));
}

getArray();


