const input = document.querySelector(".input-value");
const submit = document.querySelector(".submit-btn");
const display = document.querySelector(".display-section");
const msg = document.querySelector(".msg");

function updateDate(){
  const apiKey = "74a1aaed6557b2cb57293ad3f24041b3";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`;
  fetch(url).then(response => response.json())
  .then(data => {
    const {weather,main,sys,name,timezone} = data;
    let date = new Date()
    let localTime = date.getTime();
    let localOffset = date.getTimezoneOffset() * 60000;
    let utc = localTime + localOffset;
    let searchedTime = utc + (1000 * timezone)
    let newDate = new Date(searchedTime).toString().slice(0,21)
  const elements = `<div class="city">
  <p class="name">${name},<span class="country">${sys.country}</span></p>
  <p class="date">${newDate}</p>
  <p class="temp">${Math.round(main.temp)}<sup>°c</sup></p>
  <p class="discription">${weather[0].description}</p>
  <p class= "temp-min-max">${Math.round(main.temp_max)}<sup>°c</sup><span>/</span>${Math.round(main.temp_min)}<sup>°c</sup></p>
  </div>`
  const div = document.createElement("div");
  div.classList.add("newDiv");
  const newDiv = document.querySelectorAll('.newDiv')
  div.innerHTML = elements;
  display.appendChild(div)
  if(display.childElementCount > 1) {
  display.removeChild(newDiv[0])
  }
  }).catch(()=> {
    msg.textContent = "Please search for a valid city 🤦🏽"
  })
  msg.textContent = "";
  input.value = "";
  input.focus();
}

submit.addEventListener('click',() => {
  if (!input.value == "") {
    updateDate();
  } else {
    input.focus();
    msg.textContent = "Empty Input";
  }
})

input.addEventListener('keypress',event => {
  if (event.key === 'Enter') {
    if (!input.value == "") {
      updateDate()
    } else {
      input.focus();
      msg.textContent = "Empty Input";
    }
  }
})

