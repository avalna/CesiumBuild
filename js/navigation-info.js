// Create a div for the information container
var informationContainer = document.createElement('div');
// Add class to the information container
informationContainer.classList.add('information-container');
// Set the initial display property to 'none' to hide it by default
informationContainer.style.display = 'none';

    // Create flipContainer
    var flipContainer = document.createElement('div');
    flipContainer.id = 'flipContainer';
    
    // Create flipContent
    var flipContent = document.createElement('div');
    flipContent.id = 'flipContent';
    
    // Create informationText
    var informationText = document.createElement('div');
    informationText.classList.add('flipText');
    informationText.id = 'informationText';
    informationText.innerHTML = '<h3>Information</h3><p>Välkommen till V-Dalas Digitala Tvilling. Här hittar du information om aktuella/pågående byggnadsprojekt i våra tre kommuner. Modellen har även flera avancerade funktioner som solstudie, ritverktyg, streetview mm.</p><p>Modellen är under uppbyggnad och kommer bara att bli bättre. Vissa buggar kan förekomma. Rapportera gärna buggar till oss via mail-länken nedan.</p><br> <a href="mailto:kartomat@avesta.se?subject=Från Plan och byggs interna modell - Buggar"><i class="material-symbols-outlined">mail</i><b>Rapportera buggar</b></a><br><a href="mailto:kartomat@avesta.se?subject=Från Plan och byggs interna modell - Förslag på ändring"><i class="material-symbols-outlined">mail</i><b>Föreslå ändringar</b></a>';
    
    // Create navigationText
    var navigationText = document.createElement('div');
    navigationText.classList.add('flipText');
    navigationText.id = 'navigationText';
    navigationText.style.display = 'none'
    navigationText.innerHTML = '<h3>Hur man navigerar</h3><img src=images/mus_instruk.png>';
    
// Append navigationText and informationText to flipContent
flipContent.appendChild(navigationText);
flipContent.insertBefore(informationText, navigationText.nextSibling);

// Create left arrow container
var leftArrowContainer = document.createElement('button');
leftArrowContainer.classList.add('flipArrow', 'arrowLeft');
leftArrowContainer.id = 'leftArrow';
leftArrowContainer.style.display = 'none'; // Initially hide
leftArrowContainer.addEventListener('click', function(){
  leftArrowContainer.style.display = 'none';
  rightArrowContainer.style.display = 'block';
  navigationText.style.display = 'none';
  informationText.style.display = 'block';
})
// Create left arrow icon
var leftArrowIcon = document.createElement('span');
leftArrowIcon.classList.add('material-symbols-outlined');
leftArrowIcon.textContent = 'arrow_back'; // Arrow symbol

// Append left arrow icon to left arrow container
leftArrowContainer.appendChild(leftArrowIcon);

// Create right arrow container
var rightArrowContainer = document.createElement('button');
rightArrowContainer.classList.add('flipArrow', 'arrowRight');
rightArrowContainer.id = 'rightArrow';
rightArrowContainer.style.display = 'block'; // Initially hide
rightArrowContainer.addEventListener('click', function(){
  rightArrowContainer.style.display = 'none';
  leftArrowContainer.style.display = 'block';  
  navigationText.style.display = 'block';
  informationText.style.display = 'none';
})
// Create right arrow icon
var rightArrowIcon = document.createElement('span');
rightArrowIcon.classList.add('material-symbols-outlined');
rightArrowIcon.textContent = 'arrow_forward'; // Arrow symbol

// Append
rightArrowContainer.appendChild(rightArrowIcon);
flipContainer.appendChild(flipContent);
flipContainer.appendChild(leftArrowContainer);
flipContainer.appendChild(rightArrowContainer);

// Append the close button to the information container
informationContainer.appendChild(flipContainer);

// Create a close button
var informationCloseButton = document.createElement('button');
informationCloseButton.textContent = 'Stäng';
// Add class to the close button
informationCloseButton.classList.add('information-close-button');

// Add event listener to close the information popup when the close button is clicked
informationCloseButton.addEventListener('click', function() {
  informationContainer.style.display = 'none'; // Hide the information container
  overlay.style.display = 'none'; //Hide the overlay
});

// Append the close button to the information container
informationContainer.appendChild(informationCloseButton);
// Append the information container to the document body
document.body.appendChild(informationContainer);
// Create the overlay
var overlay = document.createElement('div');
overlay.classList.add('overlay');
overlay.style.display = 'none'; // Initially hide

// Append the overlay to the document body
document.body.appendChild(overlay);
// Find the NavigationInfoBtn button
var navigationInfoBtn = document.getElementById('button_0');
// Add event listener to toggle the display of the overlay and information container when the NavigationInfoBtn is clicked
navigationInfoBtn.addEventListener('click', function() {
  // Toggle the display of the overlay
  overlay.style.display = overlay.style.display === 'none' ? 'block' : 'none';
  // Toggle the display of the information container
  informationContainer.style.display = informationContainer.style.display === 'none' ? 'block' : 'none';
});
