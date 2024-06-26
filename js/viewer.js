    // Your access token can be found at: https://ion.cesium.com/tokens.
    // This is the default access token from your ion account

    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4MGQ2NzUxYi1iMGNlLTQxYTAtYTlhMi1lZjc3YmI2OTZmOTQiLCJpZCI6OTk5MjgsImlhdCI6MTY1NjkxMjEwMH0.T4sPk7z8C5nd_9ETtny3p7n9Y3G-DioMZpQ8eCUVyDw';
    
    var extent = Cesium.Rectangle.fromDegrees(15.671103064362,60.21484248223163,16.312895699095435,59.91045413122643);
    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = extent;
    Cesium.Camera.DEFAULT_VIEW_FACTOR = 0;

    // Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
    const viewer = new Cesium.Viewer('cesiumContainer', {
        timeline: false,
        animation: false,
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
    });    
    viewer.scene.globe.depthTestAgainstTerrain = true

    viewer.scene.setTerrain(
        new Cesium.Terrain(Cesium.CesiumTerrainProvider.fromIonAssetId(2255008))
      );

    viewer.scene.imageryLayers.removeAll();
    export {viewer}; 
   
    viewer.extend(Cesium.viewerCesiumNavigationMixin, {});
