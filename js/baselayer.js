import { viewer } from "./viewer.js";
function toggleLayerMenu() {
    const layerMenu = document.getElementById("layerMenu");
    const computedStyle = window.getComputedStyle(layerMenu); // Get the computed style of the element
  
    // Check if the computed display style is "none"
    if (computedStyle.display === "none") {
      layerMenu.style.display = "block";
      layerMenu.classList.toggle("show"); // Toggle the "show" class
    } else {
      layerMenu.style.display = "none";
    }
  }
  
// Create the button with id "layerIcon"
var layerIconButton = document.createElement("button");
layerIconButton.setAttribute("id", "layerIcon");
layerIconButton.innerHTML = '<span class="material-symbols-outlined">layers</span>';
layerIconButton.addEventListener('click', function () {
    toggleLayerMenu ()
} )
// Create the div with id "layerMenu"
var layerMenuDiv = document.createElement("div");
layerMenuDiv.setAttribute("id", "layerMenu");

// Create the div with id "title2" inside "layerMenu"
var title2Div = document.createElement("div");
title2Div.setAttribute("id", "title2");

// Create the close button inside "title2"
var closeButton = document.createElement("button");
closeButton.setAttribute("id", "closeLayers");
closeButton.innerHTML = '<span class="material-symbols-outlined">close</span>';
closeButton.addEventListener('click', function () {
    toggleLayerMenu ()
} )
// Create the clearAllLayers button inside "title2"
var clearAllLayersButton = document.createElement("button");
clearAllLayersButton.setAttribute("id", "clearAllLayers");
clearAllLayersButton.innerHTML = '<span class="material-symbols-outlined">layers_clear</span>';

// Create the collapseAllLayers button inside "title2"
var collapseAllLayersButton = document.createElement("button");
collapseAllLayersButton.setAttribute("id", "collapseAllLayers");
collapseAllLayersButton.innerHTML = '<span class="material-symbols-outlined">collapse_all</span>';

// Create the input element with id "layerSearch" inside "title2"
var layerSearchInput = document.createElement("input");
layerSearchInput.setAttribute("type", "text");
layerSearchInput.setAttribute("id", "layerSearch");
layerSearchInput.setAttribute("placeholder", "Sök efter lager");

// Create the tilesLayerInfo div inside "title2"
var tilesLayerInfoDiv = document.createElement("div");
tilesLayerInfoDiv.setAttribute("id", "tilesLayerInfo");
tilesLayerInfoDiv.innerHTML = "Klicka på lager för att expandera";

// Append buttons and input to "title2"
title2Div.appendChild(closeButton);
title2Div.appendChild(clearAllLayersButton);
title2Div.appendChild(collapseAllLayersButton);
title2Div.appendChild(layerSearchInput);
title2Div.appendChild(tilesLayerInfoDiv);

// Append "title2" to "layerMenu"
layerMenuDiv.appendChild(title2Div);

// Create the ul element with id "layerList"
var layerListUl = document.createElement("ul");
layerListUl.setAttribute("id", "layerList");

// Create the ul element with id "tilesetsList"
var tilesetsListUl = document.createElement("ul");
tilesetsListUl.setAttribute("id", "tilesetsList");


// Append all elements to the document body
document.body.appendChild(layerIconButton);
document.body.appendChild(layerMenuDiv);
layerMenuDiv.appendChild(layerListUl);
layerMenuDiv.appendChild(tilesetsListUl);

// Create a new div element
var layermenuFooter = document.createElement("div");

// Set the id attribute to "layermenuFooter"
layermenuFooter.setAttribute("id", "layermenuFooter");
// Get the div with the id "layerMenu"
var layerMenuDiv = document.getElementById("layerMenu");

// Append the newly created element to the "layerMenu" div
layerMenuDiv.appendChild(layermenuFooter);

// Function to map button IDs to layer names
function getLayerName(buttonId) {
  switch (buttonId) {
    case 'Baselayer-button1':
      return 'Ortofoto_0.16';
    case 'Baselayer-button2':
      return 'topowebbkartan';
    case 'Baselayer-button3':
      return 'topowebbkartan_nedtonad';
    case 'Baselayer-button4':
      return 'DigitalTvilling:grupp';
    case 'Baselayer-button5':
      return 'OI.Histortho_75';
    case 'Baselayer-button6':
      return 'OI.Histortho_60';
    case 'Baselayer-button7':
      return 'Ortofoto_IR';
    default:
      return null; // Handle unknown button IDs
  }
}

let lastActiveBaselayerButton = null;
let activeImageryLayer = null; // Declare activeImageryLayer variable

// Function to handle button click event
function handleBaselayerButtonClick(button, layerName) {
  // Remove active class from previous last active button
  if (lastActiveBaselayerButton) {
    lastActiveBaselayerButton.classList.remove('active');
  }

  // Add active class to the clicked button
  button.classList.add('active');
  
  // Update last active button
  lastActiveBaselayerButton = button;
  activateBaselayer(layerName);
}

// Create and append the buttons
for (let i = 0; i < 7; i++) {
  const button = document.createElement('button');
  button.classList.add('default-map');
  button.classList.add(`base-layer-${i + 1}`); // Unique class for each button
  button.id = `Baselayer-button${i + 1}`; // Unique ID for each button
  layermenuFooter.appendChild(button);

  // Add event listener to handle button click
  button.addEventListener('click', function() {
    const layerName = getLayerName(this.id); // Get layer name based on button ID
    handleBaselayerButtonClick(this, layerName); // Pass layerName to the click handler
  });

  // Set the first button as active at startup
  if (i === 0) {
    button.classList.add('active');
    lastActiveBaselayerButton = button;
    activateBaselayer('Ortofoto_0.16'); // Call the function for the first button
  }
}

const baseLayer1 = document.getElementById('Baselayer-button1');
// Add an event listener to baseLayer1
baseLayer1.addEventListener('click', function() {
  activateBaselayer('Ortofoto_0.16');
});
tippy('#Baselayer-button1', {
  content: 'Ortofoto LM',
  placement: 'top',
});
const baseLayer2 = document.getElementById('Baselayer-button2');
// Add an event listener to baseLayer1
baseLayer2.addEventListener('click', function() {
  activateBaselayer('topowebbkartan');
});
tippy('#Baselayer-button2', {
  content: 'Topowebbkartan LM',
  placement: 'top',
});
const baseLayer3 = document.getElementById('Baselayer-button3');
// Add an event listener to baseLayer1
baseLayer3.addEventListener('click', function() {
  activateBaselayer('topowebbkartan_nedtonad');
});
tippy('#Baselayer-button3', {
  content: 'Topowebbkartan nedtonad LM',
  placement: 'top',
});
const baseLayer4 = document.getElementById('Baselayer-button4');
// Add an event listener to baseLayer1
baseLayer4.addEventListener('click', function() {
  activateBaselayer('DigitalTvilling:grupp');
});
tippy('#Baselayer-button4', {
  content: 'Topowebbkartan skikt LM',
  placement: 'top',
});
const baseLayer5 = document.getElementById('Baselayer-button5');
// Add an event listener to baseLayer1
baseLayer5.addEventListener('click', function() {
  activateBaselayer('OI.Histortho_75');
});
tippy('#Baselayer-button5', {
  content: 'Historiskt ortofot runt 1975 LM',
  placement: 'top',
});
const baseLayer6 = document.getElementById('Baselayer-button6');
// Add an event listener to baseLayer1
baseLayer6.addEventListener('click', function() {
  activateBaselayer('OI.Histortho_60');
});
tippy('#Baselayer-button6', {
  content: 'Historiskt ortofot runt 1960 LM',
  placement: 'top',
});
const baseLayer7 = document.getElementById('Baselayer-button7');
// Add an event listener to baseLayer1
baseLayer7.addEventListener('click', function() {
  activateBaselayer('Ortofoto_IR');
});
tippy('#Baselayer-button7', {
  content: 'Ortofoto IR',
  placement: 'top',
});
// Function to activate baselayer
function activateBaselayer(layerName) {
    if (activeImageryLayer) {
        viewer.imageryLayers.remove(activeImageryLayer); // Remove the active imagery layer if it exists
    }

    var baseLayerImagery = new Cesium.WebMapServiceImageryProvider({
        url: 'geoserver URL',
        layers: layerName,
        parameters: {
            transparent: true,
            format: "image/png",
        },
    });

    // Add the base layer imagery as the bottom layer
    activeImageryLayer = viewer.imageryLayers.addImageryProvider(baseLayerImagery, 0); // 0 specifies the index to add the imagery layer
}
