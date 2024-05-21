import { viewer } from "./viewer.js";
// Create the container div with id "location-search-container"
var locationSearchContainer = document.createElement("div");
locationSearchContainer.setAttribute("id", "location-search-container");

// Create the input element with id "adress-search"
var addressSearchInput = document.createElement("input");
addressSearchInput.setAttribute("id", "adress-search");
addressSearchInput.setAttribute("autocomplete", "off");
addressSearchInput.setAttribute("type", "search");
addressSearchInput.setAttribute("placeholder", "Sök Adresser");
addressSearchInput.classList.add("hide-clear");

// Create the search clear icon span with id "search-clear-icon"
var searchClearIconSpan = document.createElement("span");
searchClearIconSpan.setAttribute("id", "search-clear-icon");
searchClearIconSpan.classList.add("material-symbols-outlined");
searchClearIconSpan.textContent = "search";

// Append input and span to the container div
locationSearchContainer.appendChild(addressSearchInput);
locationSearchContainer.appendChild(searchClearIconSpan);

// Create the div with id "addressDropdown"
var addressDropdownDiv = document.createElement("div");
addressDropdownDiv.setAttribute("id", "addressDropdown");

// Append the container div and the dropdown div to the document body
document.body.appendChild(locationSearchContainer);
document.body.appendChild(addressDropdownDiv);

/* Searchbar */
///////////////
var searchInput = document.getElementById("adress-search");
var addressDropdown = document.getElementById("addressDropdown");
var tempPointEntity = undefined; // To store the temporary point entity

// Function to populate the address dropdown with suggestions
function populateAddressDropdown(suggestions) {
  addressDropdown.innerHTML = "";
  suggestions.forEach(function (suggestion) {
    var addressItem = document.createElement("div");
    addressItem.classList.add("addressItem");
    addressItem.textContent = suggestion.td_adress + ", " + suggestion.td_kommund; // Include "td_kommund"
    addressItem.addEventListener("click", function () {
      flyToCoordinates(
        suggestion.json_geometry.coordinates[1],
        suggestion.json_geometry.coordinates[0],
        suggestion.td_adress,
        suggestion.td_kommund // Pass "td_kommund"
      );
    
       // Clear the text input
      // searchInput.value = '';
    });
    addressDropdown.appendChild(addressItem);
  });
  addressDropdown.style.display = "block";
}

// Function to fly to the specified coordinates
function flyToCoordinates(lat, lon, td_adress, td_kommund) {
  // Sample the height at the specified location
  var heightPromise = Cesium.sampleTerrainMostDetailed(viewer.terrainProvider, [Cesium.Cartographic.fromDegrees(lon, lat)]);
  var height = 0;

  heightPromise.then(function (samples) {
    height = samples[0].height;

    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(lon, lat, height + 200), // Fly 200 meters above the terrain
      duration: 2
    });

    // Remove previous temporary point
    if (tempPointEntity) {
      viewer.entities.remove(tempPointEntity);
    }

    // Create the temporary point entity
    tempPointEntity = viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(lon, lat, height + 10),
      point: {
        pixelSize: 10,
        color: Cesium.Color.RED,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 2
      },
      label: {
        text:  td_adress + ", " + td_kommund, // Include "td_kommund"
        showBackground: true,
        backgroundColor: Cesium.Color.BLACK,
        fillColor: Cesium.Color.WHITE,
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        pixelOffset: new Cesium.Cartesian2(0, -15),
      },
    });

    // Remove the temporary point after 10 seconds
    setTimeout(function () {
      viewer.entities.remove(tempPointEntity);
    }, 10000);

    addressDropdown.style.display = "none";
  });
}

// Fetch addresses from addresses.json
fetch("adresses-json/adresser.json")
  .then(response => response.json())
  .then(addresses => {
    searchInput.addEventListener("input", function () {
      var inputValue = searchInput.value.toLowerCase();
      var suggestions = addresses.filter(function (address) {
        return address.td_adress && address.td_adress.toLowerCase().includes(inputValue); // Use "td_adress" with additional check
      });
      if (inputValue === "") {
        addressDropdown.style.display = "none";
      } else {
        populateAddressDropdown(suggestions);
      }
    });
  });


// Close the address dropdown when clicking outside
document.addEventListener("click", function (event) {
  if (!addressDropdown.contains(event.target) && event.target !== searchInput) {
    addressDropdown.style.display = "none";
  }
});


const clearIcon = document.getElementById('search-clear-icon');

// Add event listener to input field
searchInput.addEventListener('input', function() {
    // Toggle icon visibility based on input value
    clearIcon.style.display = this.value.trim() ? 'flex' : 'flex';
    // Update icon content based on input value
    clearIcon.textContent = this.value.trim() ? 'close' : 'search';
});

// Add event listener to clear icon
clearIcon.addEventListener('click', function() {
    // Clear input field and hide icon
    searchInput.value = '';
    this.style.display = 'flex';
    this.textContent = 'search';
});
