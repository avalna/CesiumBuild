
// Your access token can be found at: https://cesium.com/ion/tokens.
// This is the default access token from your ion account
Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4MGQ2NzUxYi1iMGNlLTQxYTAtYTlhMi1lZjc3YmI2OTZmOTQiLCJpZCI6OTk5MjgsImlhdCI6MTY1NjkxMjEwMH0.T4sPk7z8C5nd_9ETtny3p7n9Y3G-DioMZpQ8eCUVyDw";


var extent = Cesium.Rectangle.fromDegrees(15.671103064362,60.21484248223163,16.312895699095435,59.91045413122643);

    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = extent;
    Cesium.Camera.DEFAULT_VIEW_FACTOR = 0;
// Init viewer
const viewer = new Cesium.Viewer("cesiumContainer", {
   
//Stänger av timeline tills funktion för solstudie, och andra basfunktioner
    timeline: false,
    animation: false, /* Hidden via css */
    projectionPicker: false,
    sceneModePicker: false,
    vrButton: false,
    fullscreenButton: false,
    homeButton: false,
    selectionIndicator : false,
    infoBox : true,    
    shadows: false,
    shouldAnimate: false,
    geocoder: false,
    navigationHelpButton: false,
    baseLayerPicker: false,
    imageryProvider: false,
    // requestRenderMode: true,
   //  requestWebgl2: true,
   // GroundPrimitives: true,
   // DepthTexture: true,
});
viewer.scene.setTerrain(
    new Cesium.Terrain(Cesium.CesiumTerrainProvider.fromIonAssetId(2255008))
  );
// stäng av alla bakgrundskartor om du vill starta utan Bing-Satelite, för att läsa in den krävs ION-token
viewer.scene.imageryLayers.removeAll();
// Get the container element
const layermenuFooter = document.getElementById('layermenuFooter');

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
        url: 'https://digitaltvilling-test.adm.avesta.se/geoserver/wms/',
        layers: layerName,
        parameters: {
            transparent: true,
            format: "image/png",
        },
    });

    // Add the base layer imagery as the bottom layer
    activeImageryLayer = viewer.imageryLayers.addImageryProvider(baseLayerImagery, 0); // 0 specifies the index to add the imagery layer
}

// Assuming layermenuFooter is the parent element of twoDBtn and threeDBtn
let twoDBtn = document.createElement('button');
twoDBtn.id = 'layers-2D';
twoDBtn.textContent = '2D';
twoDBtn.classList.add('active');
layermenuFooter.appendChild(twoDBtn);

let threeDBtn = document.createElement('button');
threeDBtn.id = 'layers-3D';
threeDBtn.textContent = '3D'; 
layermenuFooter.appendChild(threeDBtn);

tippy('#layers-2D', {
  content: 'Visa kartlager',
  placement: 'top',
  zIndex: 9999, // Set the desired z-index value
});
tippy('#layers-3D', {
  content: 'Visa 3D-lager',
  placement: 'top',
  zIndex: 9999, // Set the desired z-index value
});
function toggleLayersDisplay(is2D) {
  const layerSearch = document.getElementById('layerSearch');
  const clearAllLayers = document.getElementById('clearAllLayers');
  const twoDBtn = document.getElementById('layers-2D');
  const threeDBtn = document.getElementById('layers-3D');
  const tilesetsList = document.getElementById('tilesetsList');
  const layerList = document.getElementById('layerList');
  const tilesLayerInfo = document.getElementById('tilesLayerInfo');
  const collapseAllLayers = document.getElementById('collapseAllLayers');
  layerSearch.style.display = is2D ? 'block' : 'none';
  tilesLayerInfo.style.display = is2D ? 'none' : 'block';
  clearAllLayers.style.display = is2D ? 'block' : 'none';
  twoDBtn.classList.toggle('active', is2D);
  threeDBtn.classList.toggle('active', !is2D);
  tilesetsList.style.display = is2D ? 'none' : 'block';
  layerList.style.display = is2D ? 'block' : 'none';
  collapseAllLayers.style.display = is2D ? 'block' : 'none';
}

twoDBtn.addEventListener('click', function() {
  toggleLayersDisplay(true);
});

threeDBtn.addEventListener('click', function() {
  toggleLayersDisplay(false);
});

//
//
//
//
// Drag and drop functionallity
//
//
//
//
viewer.extend(Cesium.viewerDragDropMixin, {
    clearOnDrop: false,
    flyToOnDrop: true
    
});
viewer.dropError.addEventListener(function (viewerArg, source, error) {
  window.alert('Error processing ' + source + ':' + error);
});
//
//
//
//


// Disable default double-click behavior
viewer.cesiumWidget.screenSpaceEventHandler.setInputAction(function (event) {
  // Check if the event is a double-click event (e.type === 'DBL_CLICK')
  if (event.type === Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK) {
      // Prevent the default behavior of double-click (e.g., zooming)
      event.preventDefault();
  }
}, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

viewer.scene.globe.baseColor = Cesium.Color.fromAlpha(Cesium.Color.DARKSLATEGREY, 0.5);

// Fly functions

 function flyToLoc(lat, long, alt, h, p, r){
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(lat, long, alt),
    orientation: {
      heading: h,
      pitch: p,
      roll: r
    }
  });
};

  function flyToOverview(){
  viewer.camera.flyHome();
  };

  
 function fly(position) {
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(
        position.coords.longitude,
        position.coords.latitude,
        350.0
      ),
    });
  }
  // Find the anchor elements by their IDs
const avestaLink = document.getElementById('avesta');
const fagerstaLink = document.getElementById('fagersta');
const norbergLink = document.getElementById('norberg');
const overviewLink = document.getElementById('overview');
const floravagen = document.getElementById('floravagen')
// Add event listeners to handle the clicks
avestaLink.addEventListener('click', () => flyToLoc(16.17052, 60.14526, 4000.0));
fagerstaLink.addEventListener('click', () => flyToLoc(15.80708, 59.99882, 4000.0));
norbergLink.addEventListener('click', () => flyToLoc(15.92426, 60.06535, 4000.0));
overviewLink.addEventListener('click', flyToOverview);

//planfunctions
const avestaStadsplanLink = document.getElementById('avestaStandplanFly')
const DPFarboLink = document.getElementById('DPFarboFly')
const dpVCLink = document.getElementById('dpVCFly')

avestaStadsplanLink.addEventListener('click',() => flyToLoc(16.16699, 60.14357, 1000.0))
DPFarboLink.addEventListener('click', () => flyToLoc(15.80307, 59.98195, 1000.0))  
dpVCLink.addEventListener('click', () => flyToLoc(15.91505, 60.06615, 1000.0))
floravagen.addEventListener('click', ()=> flyToLoc(15.81497, 59.99684, 300, Cesium.Math.toRadians(-40), Cesium.Math.toRadians(-45.0),0))

export { viewer };
new Cesium.ScreenSpaceEventHandler(viewer.canvas).setInputAction((action) => {
  console.log("屏幕：", action.position);
  
  let cartesian3 = viewer.scene.globe.pick(viewer.camera.getPickRay(action.position), viewer.scene);
  console.log("Cartesian3：", cartesian3);
  
  let cartographic = Cesium.Cartographic.fromCartesian(cartesian3);
  console.log("latitude and longitude：", {
    latitude: Cesium.Math.toDegrees(cartographic.latitude),
    longitude: Cesium.Math.toDegrees(cartographic.longitude),
    height: cartographic.height
  });
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);


// Staback 

try {
  const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(2563457);
  viewer.scene.primitives.add(tileset);
  // Apply the default style if it exists
  const extras = tileset.asset.extras;
  if (
    Cesium.defined(extras) &&
    Cesium.defined(extras.ion) &&
    Cesium.defined(extras.ion.defaultStyle)
  ) {
    tileset.style = new Cesium.Cesium3DTileStyle(extras.ion.defaultStyle);
  }
} catch (error) {
  console.log(error);
}

try {
  const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(2563455);
  viewer.scene.primitives.add(tileset);

  // Apply the default style if it exists
  const extras = tileset.asset.extras;
  if (
    Cesium.defined(extras) &&
    Cesium.defined(extras.ion) &&
    Cesium.defined(extras.ion.defaultStyle)
  ) {
    tileset.style = new Cesium.Cesium3DTileStyle(extras.ion.defaultStyle);
  }
} catch (error) {
  console.log(error);
}

//Alert for WMS
        // Get references to all checkboxes with the class "wmsError"
        var checkboxes = document.querySelectorAll(".wmsError");

        // Add a click event listener to each checkbox
        checkboxes.forEach(function(checkbox) {
            checkbox.addEventListener("click", function(event) {
                // Prevent the checkbox from being checked
                event.preventDefault();

                // Display the alert when the checkbox is clicked
                alert("WMS är inte påkopplad");
            });
        });


// Stormossen Vindkraft
let stormossenvindkraft = new Cesium.WebMapServiceImageryProvider({
  url : 'https://digitaltvilling-test.adm.avesta.se/geoserver/wms/',
  layers: 'Stormossen',
parameters: {
  transparent: "true",
  format: "image/png",
},
}); 
let imageryLayerStormossenvindkraft = new Cesium.ImageryLayer(stormossenvindkraft);
viewer.imageryLayers.add(imageryLayerStormossenvindkraft);

// Kommungräns
let kommungrans = new Cesium.WebMapServiceImageryProvider({
  url : 'https://digitaltvilling-test.adm.avesta.se/geoserver/wms/',
  layers: 'Alla_kommungranser',
parameters: {
  transparent: "true",
  format: "image/png",
},
});

let imageryLayerKommungrans = new Cesium.ImageryLayer(kommungrans);
viewer.imageryLayers.add(imageryLayerKommungrans);

// Pågående Ajourområden
let statusAjour = new Cesium.WebMapServiceImageryProvider({
  url : 'https://digitaltvilling-test.adm.avesta.se/geoserver/wms/',
  layers: 'StatusAjour',
parameters: {
  transparent: "true",
  format: "image/png",
},
});
let imageryLayerStatusAjour = new Cesium.ImageryLayer(statusAjour);
imageryLayerStatusAjour.alpha = 0.4;
viewer.imageryLayers.add(imageryLayerStatusAjour);


// Dp o illplaner        
const dpDelAvFarbo = Cesium.ImageryLayer.fromProviderAsync(Cesium.IonImageryProvider.fromAssetId(2227222));
viewer.imageryLayers.add(dpDelAvFarbo);
dpDelAvFarbo.alpha = 0.8;
dpDelAvFarbo.show=!dpDelAvFarbo.show;
document.querySelector('#dpDelAvFarbo').onclick = function(){
  dpDelAvFarbo.show=!dpDelAvFarbo.show;
}

const dpVC = Cesium.ImageryLayer.fromProviderAsync(Cesium.IonImageryProvider.fromAssetId(1406758));
viewer.imageryLayers.add(dpVC);
dpVC.alpha = 0.8;
dpVC.show=!dpVC.show;
document.querySelector('#dpVC').onclick = function(){
  dpVC.show=!dpVC.show;
}
const illVC = Cesium.ImageryLayer.fromProviderAsync(Cesium.IonImageryProvider.fromAssetId(1406755));
viewer.imageryLayers.add(illVC);
illVC.alpha = 0.8;
illVC.show=!illVC.show;
document.querySelector('#illVC').onclick = function(){
  illVC.show=!illVC.show;
  }



Cesium.GeoJsonDataSource.clampToGround = true;
let solen19omrade = Cesium.GeoJsonDataSource.load('https://digitaltvilling-test.adm.avesta.se/geojson/avesta/solen19omrade.geojson', {
  fill: new Cesium.Color(1,1,0.2,0.5),
});
solen19omrade.then(function (dataSource) {
  viewer.dataSources.add(dataSource);
  dataSource.show=!dataSource.show
  document.querySelector('#solen19grans').onclick = function(){
    dataSource.show=!dataSource.show;
    }
  const entities = dataSource.entities.values;
  for (let i = 0; i < entities.length; i++) {
    const entity = entities[i];
    entity.polygon.classificationType = Cesium.ClassificationType.TERRAIN;
  }
}).catch(function (error) {
  window.alert(error);
});


// NavigationMixin
viewer.extend(Cesium.viewerCesiumNavigationMixin, {});


// Limit the zooming allowed
viewer.scene.screenSpaceCameraController.minimumZoomDistance = 1;
viewer.scene.screenSpaceCameraController.maximumZoomDistance = 30000 * 2;
// Two pops both world terrain and wgs84 terrain option
// viewer.baseLayerPicker.viewModel.terrainProviderViewModels.pop()
// viewer.baseLayerPicker.viewModel.terrainProviderViewModels.pop()
//  Object syns inte genom terrain
viewer.scene.globe.depthTestAgainstTerrain = true


// Load trees in model
let tradLovtrad;
try {
  tradLovtrad = await Cesium.Cesium3DTileset.fromIonAssetId(1702470)
  viewer.scene.primitives.add(tradLovtrad)
} catch (error){
  console.log(`Error loading tileset: ${error}`)
}

let tradBarr; 
try {
  tradBarr = await Cesium.Cesium3DTileset.fromIonAssetId(1702958);
  viewer.scene.primitives.add(tradBarr)
} catch (error){
  console.log(`Error loading tileset: ${error}`)
}

let dalahast;
try {
  dalahast = await Cesium.Cesium3DTileset.fromIonAssetId(2329385);
  viewer.scene.primitives.add(dalahast)
} catch (error) {
  console.log(`Error loading tileset: ${error}`)
};


let TilesAvestaAvestadalskolan;
try {
  TilesAvestaAvestadalskolan = await Cesium.Cesium3DTileset.fromUrl(
    "https://digitaltvilling-test.adm.avesta.se/byggnader/avesta/avestadalskolan/tileset.json"
  );
  viewer.scene.primitives.add(TilesAvestaAvestadalskolan);
  
} catch (error) {
  console.log(`Error loading tileset: ${error}`);
}


// Define an array of Ion asset IDs
const ionAssetIds = [
  1408127, 1408126, 1408125, 1408123,
  1408122, 1408121, 1408120, 1406854,
  1406853, 1406852, 1406851, 1406850,
  1406849, 1406846
];

// Create an array to store tilesets
const vcArray = [];

// Load tilesets using async/await
async function loadTilesets() {
  for (const assetId of ionAssetIds) {
    const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(assetId);
    tileset.show = false;
    viewer.scene.primitives.add(tileset);
    vcArray.push(tileset);
  }
}

// Call the function to load tilesets
loadTilesets();

// Function to toggle the visibility of tilesets
function toggleTilesetsVisibility() {
  for (const tileset of vcArray) {
    tileset.show = !tileset.show; // Toggle the visibility
  }
}

// Use querySelector to select an element with id 'vcByggnader'
const vcByggnaderButton = document.querySelector('#vcByggnader');

// Check if the element is found before adding the event listener
if (vcByggnaderButton) {
  vcByggnaderButton.addEventListener('click', toggleTilesetsVisibility);
} else {
  console.error('Element with id "vcByggnader" not found.');
}



// This function asynchronously loads a 3D tileset, adds it to the Cesium viewer, and creates UI elements for controlling visibility and zooming.
async function addTileset2(tilesetData, higherLevelTag, groupName) {
  try {
    // Load the 3D tileset from the provided URL
    const tileset = await Cesium.Cesium3DTileset.fromUrl(tilesetData.url);

    // Set the name of the tileset
    tileset.name = tilesetData.name;
 // Set tileset visibility based on whether groupName contains '(N)'
 tileset.show = !groupName.includes('(N)');
    // Add the tileset to the Cesium viewer's scene primitives
    viewer.scene.primitives.add(tileset);

    // Log success message with the added tileset
    // console.log('Tileset added successfully:', tileset);

    // Create a checkbox for toggling visibility
    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !tilesetData.name.includes('(N)'); // Initially checked if tileset name doesn't contain '(N)'
    checkbox.onchange = function() {
      tileset.show = this.checked; // Set tileset visibility based on checkbox state
    };

    // Create a button for zooming to the tileset
    // Create a button for zooming to the tileset
const zoomButton = document.createElement('button');
zoomButton.innerHTML = '<span class="material-symbols-outlined">zoom_in</span>';
zoomButton.id = 'zoomTilesBtn';
zoomButton.onclick = function() {
    // Define a bounding sphere for the tileset
    const boundingSphere = tileset.boundingSphere;
    const scaleFactor = 1.2; // Adjust as needed

    if (boundingSphere) {
        // Fly the camera to the bounding sphere of the tileset
        viewer.camera.flyToBoundingSphere(boundingSphere, {
            duration: 2, // Animation duration
            complete: function() {
                // Create a bounding box visual representation
                const boundingBoxEntity = viewer.entities.add({
                    position: boundingSphere.center,
                    box: {
                        dimensions: new Cesium.Cartesian3(
                          boundingSphere.radius * scaleFactor, 
                          boundingSphere.radius * scaleFactor, 
                          boundingSphere.radius * scaleFactor),
                        material: Cesium.Color.RED.withAlpha(0.5)
                    }
                });

                // Optionally, set a timeout to remove the bounding box after a certain duration
                setTimeout(function() {
                    viewer.entities.remove(boundingBoxEntity);
                }, 5000); // Remove after 5 seconds
            }
        });
    } else {
        // Log a warning if the bounding sphere is not available
        console.warn('Bounding sphere not available for tileset:', tileset.name);
    }
};
    // Create a label for displaying the tileset name
    const label = document.createElement('label');
    label.textContent = tilesetData.name;

    // Append UI elements to the list item
    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(zoomButton);

// Find or create the group element in the tilesets list
let groupElement = document.getElementById(groupName);
if (!groupElement) {
  // If the group element doesn't exist, create it
  groupElement = document.createElement('li');
  groupElement.id = groupName; // Set the id to groupName
  groupElement.textContent = groupName; // Set the group name as the text content
  groupElement.className = 'tag-header'; // Set class to tag-header for styling
  groupElement.style.listStyleType = 'none';
  
  // Create an arrow element
  const groupArrow = document.createElement('span');
  groupArrow.classList.add('arrowGroupName');

// Insert the arrow after the group name
groupElement.appendChild(groupArrow);

  // Add event listener for toggling collapsed state and arrow direction
// Add event listener for toggling collapsed state and arrow direction
groupElement.addEventListener('click', function(event) {
  if (event.target.tagName.toLowerCase() !== 'input') {
    const sublist = this.nextElementSibling; // Get the sublist
    const isCollapsed = sublist.classList.toggle('collapsed');
    sublist.style.display = isCollapsed ? 'none' : 'block';
    groupArrow.style.transform = isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)';
  }
});


  
  // Append the group element to the tilesets list
  higherLevelTag.appendChild(groupElement);

  // Create sublist for tilesets within the group
  const sublist = document.createElement('ul');
  sublist.className = 'sublist collapsed'; // Set class for styling

  // Append the sublist to the group element
  higherLevelTag.appendChild(sublist);

  // Create checkbox to toggle all checkboxes within the group
  const groupCheckbox = document.createElement('input');
  groupCheckbox.type = 'checkbox';
  groupCheckbox.checked = !groupName.includes('(N)');
  groupCheckbox.onchange = function() {
    // Get all checkboxes within the group sublist
    const checkboxes = sublist.querySelectorAll('input[type="checkbox"]');
    // Set the state of each checkbox based on the state of the group checkbox
    checkboxes.forEach(cb => {
      cb.checked = this.checked;
      // Trigger onchange event manually for each checkbox
      cb.onchange();
    });
  };
  // Insert the group checkbox before the group name
  groupElement.insertBefore(groupCheckbox, groupElement.firstChild);
}

// Append the list item to the sublist
groupElement.nextElementSibling.appendChild(listItem); // Append to the sublist

  } catch (error) {
    // Log an error if tileset loading fails
    console.error('Error loading tileset:', error);
  }
}

// Fetch the tileset data from the JSON file
fetch('json/tileset_v6.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch tileset data');
    }
    return response.json();
  })
  .then(tilesetData => {
    // Iterate through each tileset and add it to the tilesets list
    tilesetData.forEach(tileset => {
      // Find or create the higher level tag element
      let higherLevelTag = higherLevelTags[tileset.higherLevelTag];
      if (!higherLevelTag) {
        // Create higher level tag element
        higherLevelTag = document.createElement('ul');
        higherLevelTag.id = tileset.higherLevelTag;
        higherLevelTag.className = 'higher-level-tag collapsed'; // Add 'collapsed' class initially

        // Create list item for higher level tag name
        const higherLevelTagItem = document.createElement('li');

        // Create checkbox for toggling visibility of tilesets within this higher level tag
        const tagCheckbox = document.createElement('input');
        tagCheckbox.type = 'checkbox';
        tagCheckbox.checked =  tileset.higherLevelTag === 'Nedtonade byggnader (N)' ? false : true; // Initially unchecked only for 'N' tag
        tagCheckbox.addEventListener('click', function(event) {
          // Prevent the event from propagating to higher levels
          event.stopPropagation();
        });
        tagCheckbox.onchange = function() {
          // Get all checkboxes within the higher level tag
          const checkboxes = higherLevelTag.querySelectorAll('input[type="checkbox"]');
          // Set the state of each checkbox based on the state of the tag checkbox
          checkboxes.forEach(cb => {
            cb.checked = this.checked;
            // Trigger onchange event manually for each checkbox
            cb.onchange();
          });
        };

        // Append the checkbox to the higher level tag item
        higherLevelTagItem.appendChild(tagCheckbox);

        // Add text content for higher level tag name
        const tagText = document.createElement('span');
        tagText.textContent = tileset.higherLevelTag;
        higherLevelTagItem.appendChild(tagText);

        // Add 'collapsible' class
        higherLevelTagItem.classList.add('collapsible');

        // Add event listener for toggling collapsed state
        higherLevelTagItem.addEventListener('click', function() {
          higherLevelTag.classList.toggle('collapsed');
          arrow.style.transform = higherLevelTag.classList.contains('collapsed') ? 'rotate(-90deg)' : 'rotate(0deg)';
        });

        // Append the higher level tag item to the tilesets list
        tilesetsList.appendChild(higherLevelTagItem);

        tilesetsList.appendChild(higherLevelTag);
        
        // Inside the loop where you create higher level tag items
        // Create an arrow element
        const arrow = document.createElement('span');
        arrow.classList.add('arrow');
        higherLevelTagItem.appendChild(arrow);
        // Determine initial rotation of the arrow based on collapsed state
        arrow.style.transform = higherLevelTag.classList.contains('collapsed') ? 'rotate(-90deg)' : 'rotate(0deg)';

        // Store reference to higher level tag element
        higherLevelTags[tileset.higherLevelTag] = higherLevelTag;
      }
      // Add the tileset to the higher level tag
      addTileset2(tileset, higherLevelTag, tileset.groupName);
    });
  })
  .catch(error => {
    console.error('Error fetching tileset data:', error);
  });


// Get the tilesets list element from the DOM
const tilesetsList = document.getElementById('tilesetsList');

// Create an object to store references to higher level tag elements
const higherLevelTags = {};




// Collapse the tag-header from start
const tagHeaders = document.querySelectorAll('.tag-header');
tagHeaders.forEach(header => {
  header.classList.add('collapsed');
});



var hideToolbarBtn = document.getElementById('hideToolbarBtn');
var cesiumToolbar = document.querySelector(".cesium-viewer-toolbar");

hideToolbarBtn.addEventListener('click', function() {
  cesiumToolbar.classList.toggle('hidden');
});
