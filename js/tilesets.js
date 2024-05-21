import { viewer } from "./viewer.js";
// Create a new <ul> element
var ulElement = document.createElement("ul");

// Set the id attribute of the <ul> element to "tilesetsList"
ulElement.setAttribute("id", "tilesetsList");

// Optionally, you can add some content or attributes to the <ul> element if needed.

// Append the <ul> element to the body of the document, or to any other desired parent element.
document.body.appendChild(ulElement);


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
fetch('../../../json/tileset_v6.json')
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
