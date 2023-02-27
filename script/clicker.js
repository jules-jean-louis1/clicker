const btnClick = document.querySelector("#idClicker"); // Select the button element
const btnReset = document.querySelector("#resetClicker"); // Select the button element
const plus10 = document.querySelector('#plus10Clicker');
const display = document.querySelector("#nbClicks"); // Select the div element
let clicks = localStorage.getItem("clicks"); // Retrieve the number of clicks from local storage



// If the number of clicks is null or undefined, set it to 0
if (clicks === null || clicks === undefined) {
    clicks = 0;
}
display.textContent = "Clicks: " + clicks;
// Add a click event listener to the button element
btnClick.addEventListener("click", function () {
    clicks++; // Increment the number of clicks
    localStorage.setItem("clicks", clicks); // Store the updated number of clicks in local storage
    btnClick.textContent = "Clicks: " + clicks; // Update the text content of the button element
 // Update the text content of the div element
});

plus10.addEventListener("click", function () {
    clicks = clicks + 10; // Increment the number of clicks
    localStorage.setItem("clicks", clicks); // Store the updated number of clicks in local storage
    btnClick.textContent = "Clicks: " + clicks; // Update the text content of the button element
 // Update the text content of the div element
});
btnReset.addEventListener("click", function () {
    clicks = 0; // Reset the number of clicks
    localStorage.setItem("clicks", clicks);
    btnClick.textContent = "Clicks: " + clicks;
});
