// Create the toolbar container
var toolbarContainer = document.createElement("div");
toolbarContainer.classList.add("toolbar");

// Define an array of tooltip contents
var tooltipContents = [
  "Information och navigeringsinstruktioner",
  "Hitta koordinat, klicka på marken",
  "Solstudie",
  "Placera träd",
  "Dela din vy",
  "Ta en skärmbild av 3D-kartan"
];

// Create buttons and spans for material icons dynamically
var icons = ["question_mark", "pin_drop", "light_mode", "forest", "share_location","print"];
icons.forEach(function(iconName, index) {
  // Create button element with a unique ID
  var button = document.createElement("button");
  button.id = "button_" + index; // Unique ID for each button

  // Create span element for material icon
  var span = document.createElement("span");
  span.classList.add("material-symbols-outlined");
  span.textContent = iconName;

  // Append span to button
  button.appendChild(span);

  // Append button to toolbar container
  toolbarContainer.appendChild(button);

  // Add Tippy tooltip to each button with unique content
  tippy(button, {
    content: tooltipContents[index], // Use the corresponding content for each button
    placement: "right", // Adjust as needed
    theme: "light", // Adjust as needed
  });
});

// Append toolbar container to the document body
document.body.appendChild(toolbarContainer);
