import { viewer } from "./viewer.js";
var treeModuleBtn = document.getElementById('button_3');

// Function to create new buttons and range slider
function createTreeButtons() {
    // Create a container div to hold the new buttons and range slider
    var container = document.createElement('div');
    container.classList.add('tree-button-range-container', 'vertical-stack'); // Adjusted class to display items vertically
  
    // Create a div for buttons
    var buttonContainer = document.createElement('div');
    buttonContainer.classList.add('tree-button-container', 'horizontal-stack');
    buttonContainer.style.paddingTop = '2px';
    // Create buttons dynamically
  // Create a select element
  const selectMenu = document.createElement('select');
  selectMenu.setAttribute('id', 'treeType')
  // Define options for the select menu
  const options = [
    { value: 'Your virtual map on the server/models/lovTrad/lovTrad.gltf', text: 'Lövträd' },
    { value: 'Your virtual map on the server/models/barrTrad/barrTrad.gltf', text: 'Barrträd' },
    { value: 'Your virtual map on the server/models/bjorkTrad/bjorkTrad.gltf', text: 'Björkträd' },
    { value: 'Your virtual map on the server/models/tallTrad/tallTrad.gltf', text: 'Tallträd'}
  ];
  
  // Populate the select menu with options
  options.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option.value;
    optionElement.textContent = option.text;
    selectMenu.appendChild(optionElement);
  });
  
  // Add event listener if needed
  selectMenu.addEventListener('change', function(event) {
    console.log('Selected option:', event.target.value);
    // Add your logic here
  });
  
  // Append the select menu to the desired location in the DOM
  buttonContainer.appendChild(selectMenu);
      // Create span element with the specified class and text
      let span = document.createElement('span');
  
      // Set text content and title based on button index
      let buttonText = '';
      let buttonTitle = '';
    for (let i = 1; i <= 2; i++) {
      let button = document.createElement('button');
      button.className = 'custom-button counter_' + i; // Assign unique class for each button
  
      // Create span element with the specified class and text
      let span = document.createElement('span');
      if (i === 1) {
        buttonText = 'delete';
        buttonTitle = 'Radera placerade träd';
        // Add event listener to button number 5 to clear placed trees
        button.addEventListener('click', clearPlacedTrees);
      } else if (i === 2) {
        buttonText = 'undo';
        buttonTitle = 'Radera senaste placerade träd';
        // Add event listner to button number 6 to clear last placed tree
        button.addEventListener('click',clearLastPlacedTree )
      } /* else {
        span.className = 'material-symbols-outlined';
        span.textContent = 'counter_' + i;
      } */
      span.className = 'material-symbols-outlined';
      span.textContent = buttonText;
      span.title = buttonTitle;
      button.appendChild(span);
      
      // Add event listener to the button
      button.addEventListener('click', handleButtonClick);
  
      // Append the button to the button container
      buttonContainer.appendChild(button);
      tippy(button, {
        content: buttonTitle,
        placement: 'top', // Set tooltip position
      });
    }
  
    // Append the button container to the main container
    container.appendChild(buttonContainer);
  
   
  
    // Create centered text "Trädskala"
    var treeScaleText = document.createElement('div');
    treeScaleText.textContent = 'Trädskala';
    treeScaleText.classList.add('textTreeModule'); // Add class to text element
  
    // Append the text to the main container
    container.appendChild(treeScaleText);
  
    // Create range slider
    var rangeSlider = document.createElement('input');
    rangeSlider.type = 'range';
    rangeSlider.min = '0.5';
    rangeSlider.step ='0.1';
    rangeSlider.max = '3';
    rangeSlider.value = '1'; // Set initial value
    rangeSlider.classList.add('range-sliderTreeModule');
  
    // Append the range slider to the main container
    container.appendChild(rangeSlider);
  
    // Find the TreeModuleBtn button
    var treeModuleBtn = document.getElementById('button_3');
  
    // Insert the container before the next sibling of TreeModuleBtn (i.e., the extra button)
    treeModuleBtn.parentNode.insertBefore(container, treeModuleBtn.nextSibling);
  
  }
  // Call the function so we can create the buttons, so they are avaible
  createTreeButtons();
  // Function to handle click on each new button
  function handleButtonClick(event) {
    // Remove 'active' class from all buttons
    let buttons = document.querySelectorAll('.custom-button');
    buttons.forEach(button => {
      button.classList.remove('active');
    });
  
    // Add 'active' class to the clicked button
    event.currentTarget.classList.add('active');
     
  }
  
  // Function to toggle visibility of new buttons, text, and range slider
  function toggleNewComponents() {
    let buttonContainer = document.querySelector('.tree-button-container');
    let text = document.querySelector('.textTreeModule');
    let rangeSlider = document.querySelector('.range-sliderTreeModule');
    let selectTreeModel = document.getElementById('treeType');
    buttonContainer.classList.toggle('hidden');
    text.classList.toggle('hidden');
    rangeSlider.classList.toggle('hidden');
    selectTreeModel.classList.toggle('hidden');
  
    // Remove 'active' class from all buttons, text, and range slider when hiding them
    if (buttonContainer.classList.contains('hidden')) {
      let elements = document.querySelectorAll('.custom-button, .text, .range-slider');
      elements.forEach(element => {
        element.classList.remove('active');
      });
     } else {
    }
  }
  // Since we call the createTreeButtons function we need to call this function to hide them at start
  toggleNewComponents();
  const treeTypeSelect = document.getElementById("treeType");
  const treeScaleInput = document.querySelector('.range-sliderTreeModule');
  let selectedTreeScale = parseFloat(treeScaleInput.value);
  let isTreePlacementActive = false;
  let placedTrees = [];
  // Add event listner to slider value
  treeScaleInput.addEventListener("input", function () {
    selectedTreeScale = parseFloat(treeScaleInput.value);
  });
  
  function clearPlacedTrees() {
    for (let i = 0; i < placedTrees.length; i++) {
      viewer.entities.remove(placedTrees[i]);
    }
    placedTrees = []; // Clear the array
  }
  
  function clearLastPlacedTree() {
    if (placedTrees.length > 0) {
      const lastPlacedTree = placedTrees.pop();
      viewer.entities.remove(lastPlacedTree);
    }
  }
  
  function placeTreeOnClick(event) {
  const clickedPosition = viewer.scene.pickPosition(event.position);
  if (Cesium.defined(clickedPosition)) {
    const selectedTreeType = treeTypeSelect.value; // Get the selected tree type from the button's dataset
    placeTree(clickedPosition, selectedTreeType);
  }
  }
  
  
  function placeTree(position, treeType) {
  const treeEntity = viewer.entities.add({
    position: position,
    model: {
      uri: treeType,
      scale: selectedTreeScale,
      receiveShadows: false, // Allow the model to receive shadows
    },
    isTree: true, // Custom property to identify trees
  });
  placedTrees.push(treeEntity); // Store the entity in the array
  }
  
  // Add event listener to each place tree button
  treeModuleBtn.addEventListener("click", function () {
  isTreePlacementActive = !isTreePlacementActive; // Toggle the state
  
  if (isTreePlacementActive) {
    treeModuleBtn.style.backgroundColor = "#0482fc"
    viewer.screenSpaceEventHandler.setInputAction(placeTreeOnClick, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  } else {
    viewer.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    treeModuleBtn.style.backgroundColor = "#fff"

}
  });
  
  
  
  // Add click event listener to the treeModuleBtn button
  treeModuleBtn.addEventListener('click', function() {
    // Check if new buttons are already created
    if (document.querySelector('.tree-button-container') === null) {
      // Create new buttons
      createTreeButtons();
     treeModuleBtn.style.backgroundColor = "#0482fc"

    } else {
      // Toggle visibility of new buttons
      toggleNewComponents();
  
    }
  });
