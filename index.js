let colorsArray = [];
let storedHexValue = "";
const colorChoiceEl = document.getElementById("color-choice");
const choiceBtn = document.getElementById("color-scheme-btn");
const dropdownEl = document.getElementById("color-scheme-mood");

// WHen a user clicks the input to choose a color, it gets
// (fetches) the hex color value
colorChoiceEl.addEventListener("input", updatedHexColor);

// function that gets the hex color the user chooses
function updatedHexColor(event) {
  const hexColor = event.target.value.replace("#", "");

  fetch("https://www.thecolorapi.com/scheme?hex=${hexColor}")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const colors = data.colors;
      console.log("Color Scheme: ", colors);
      colorsArray = colors;
      storedHexValue = hexColor;
      console.log("Stored Hex Value: ", hexColor);
    });
}

function renderColors() {
  let htmlColors = "";
  for (let color of colorsArray) {
    htmlColors += `
      <div class="color-wrapper">
        <div class="color-box" style="background-color: ${color.hex.value}"></div>
        <div class="hex-code">${color.hex.value}</div>
      </div>
    `;
  }

  document.getElementById("main-container").innerHTML = htmlColors;
}

choiceBtn.addEventListener("click", function () {
  let dropdownChoice = dropdownEl.value;
  const hexColor = storedHexValue || "000000";

  // fetch(GET) the dropdown menu colors from the server
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${hexColor}&mode=${dropdownChoice}&count=5`
  )
    .then((res) => res.json())
    .then((data) => {
      colorsArray = data.colors;
      renderColors();
    });
});
