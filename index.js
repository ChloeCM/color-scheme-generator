let colorsArray = [];
let storedHexValue = "";
const colorChoiceEl = document.getElementById("color-choice");
const choiceBtn = document.getElementById("color-scheme-btn");
const dropdownEl = document.getElementById("color-scheme-mood");

// When a user clicks the input to choose a color, it gets
// (fetches) the hex color value they have choose.
//
colorChoiceEl.addEventListener("input", updatedHexColor);

// function that fetches/ gets the hex color the user chooses
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

// Function that displays the color and its hex value to the DOM.
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

// When a user clicks the button, its get both the dropdown menu value
// and the hex color value and fetches the data from the server to display
// the correct information
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
