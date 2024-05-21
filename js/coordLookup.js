import { viewer } from "./viewer.js";

// Create the main container
var coordLabelsInfo = document.createElement("div");
coordLabelsInfo.id = "coordlabelsInfo";

// Add text content to the main container
coordLabelsInfo.textContent = "Klicka på marken för att få koordinater för vald position";

// Create the nested container for labels
var coordLabels = document.createElement("div");
coordLabels.id = "coordlabels";

// Append the nested container to the main container
coordLabelsInfo.appendChild(coordLabels);

// Append the main container to the document body or another parent element
document.body.appendChild(coordLabelsInfo);

var coordinateLookupBtn = document.getElementById('button_1');
coordinateLookupBtn.addEventListener('click', function () {
    if (isCoordinateLookupActive) {
        deactivateCoordinateLookup();
    } else {
        activateCoordinateLookup();
    }
  });

let isCoordinateLookupActive = false;
let tempBillboard;

function activateCoordinateLookup() {
    if (!isCoordinateLookupActive) {
        isCoordinateLookupActive = true;
        coordinateLookupBtn.style.backgroundColor = "#0482fc"; // Change the button color to indicate activation
        document.getElementById("coordlabelsInfo").style.display ="block"

        // Set up the ScreenSpaceEventHandler only once
        new Cesium.ScreenSpaceEventHandler(viewer.canvas).setInputAction(handleMapClick, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }
}

        function handleMapClick (action){
        if (isCoordinateLookupActive){
        let ray = viewer.camera.getPickRay(action.position);
        let cartesian3 = viewer.scene.globe.pick(ray, viewer.scene);

        if (cartesian3) {
            Cesium.sampleTerrainMostDetailed(viewer.scene.terrainProvider, [cartesian3])
                .then((updatedPositions) => {
                    let accurateCartesian3 = updatedPositions[0];
                    let cartographic = Cesium.Cartographic.fromCartesian(accurateCartesian3);
                    let sourceCoord = [Cesium.Math.toDegrees(cartographic.longitude), Cesium.Math.toDegrees(cartographic.latitude)];

                    let targetCoordSweref = proj4("EPSG:4326", "EPSG:3006", sourceCoord);
                    let targetCoordSweref1630 = proj4("EPSG:4326", "EPSG:3010", sourceCoord);
                    let targetCoordRT90 = proj4("EPSG:4326", "EPSG:3021", sourceCoord);

                    let result = `<b>Koordinater för vald position:</b> <br>` +
                        `<b>WGS 84:</b> N ${sourceCoord[1].toFixed(3)}, E ${sourceCoord[0].toFixed(3)}<br>` +
                        `<b>SWEREF 99TM:</b> N ${targetCoordSweref[1].toFixed(3)}, E ${targetCoordSweref[0].toFixed(3)}<br>` +
                        `<b>SWEREF 99 16 30:</b> N ${targetCoordSweref1630[1].toFixed(3)}, E ${targetCoordSweref1630[0].toFixed(3)}<br>` +
                        `<b>RT90 2.5 gon V:</b> N ${targetCoordRT90[1].toFixed(3)}, E ${targetCoordRT90[0].toFixed(3)}`;

                    if (tempBillboard) {
                        viewer.entities.remove(tempBillboard);
                    }

                    tempBillboard = viewer.entities.add({
                        position: accurateCartesian3,
                        billboard: {
                            image: '../images/MorkBlaPin.png',
                            scale: 0.02,
                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM
                        },
                        label: {
                            text: 'Vald position',
                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                            pixelOffset: new Cesium.Cartesian2(0.0, -45.0),
                            fillColor: Cesium.Color.WHITE,
                            font: "18px sans-serif",
                            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                            outlineWidth: 2,
                            outlineColor: Cesium.Color.BLACK,
                        }
                    });

                    document.getElementById("coordlabels").innerHTML = result;
                    document.getElementById("coordlabels").style.display = "block";
                })
                .catch((error) => {
                    console.error("Error sampling terrain: ", error);
                });
        }
    };
};
function deactivateCoordinateLookup() {
    isCoordinateLookupActive = false;
    coordinateLookupBtn.style.backgroundColor = ''; // Reset the button color

    if (tempBillboard) {
        viewer.entities.remove(tempBillboard);
        tempBillboard = undefined;
    }
    document.getElementById("coordlabelsInfo").style.display ="none";

    document.getElementById("coordlabels").style.display = "none";
     // Remove the ScreenSpaceEventHandler
     viewer.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
}


