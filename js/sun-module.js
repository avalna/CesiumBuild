// We are working with ES6 modules so we need to import the Viewer
import { viewer } from "./viewer.js";
// Put at top to make it globally availble
function updateCesiumTimeAndShadows(month, day, time) {
    // Create a JavaScript Date object with the slider values
    var date = new Date(new Date().getFullYear(), month - 1, day, time, 0, 0);
  
    // Set Cesium clock to the desired time
    viewer.clock.currentTime = Cesium.JulianDate.fromDate(date);
  
    // Ensure that shadows are enabled
    viewer.shadows = true;
  }

var SunModuleBtn = document.getElementById('button_2');
  
// Function to create sliders for the sun module
function createSunModuleSliders() {
    console.log('Creating sun sliders...'); // Log when sliders are being created
    // Create a container div to hold the sliders
    var container = document.createElement('div');
    container.classList.add('sun-slider-text-container', 'vertical-stack'); // Adjusted class to display items vertically
    
    // Create centered text "Sun Month"
    var sunMonthText = document.createElement('div');
    sunMonthText.textContent = 'Månad';
    sunMonthText.classList.add('sun-month-text', 'styled-text'); // Add class to text element
    // Append the text to the main container
    container.appendChild(sunMonthText);
    
    // Create centered text output for "Sun Month"
    var sunMonthTextOutput = document.createElement('div');
    sunMonthTextOutput.textContent = 'Juni'; // Set initial value
    sunMonthTextOutput.classList.add('sun-month-text-output', 'styled-text'); // Add class to text element
    // Append the text output to the main container
    container.appendChild(sunMonthTextOutput);
    
    // Create range slider for sun month
    var rangeSliderMonth = document.createElement('input');
    rangeSliderMonth.type = 'range';
    rangeSliderMonth.min = '1';
    rangeSliderMonth.step = '1';
    rangeSliderMonth.max = '12';
    rangeSliderMonth.value = '6'; // Set initial value
    rangeSliderMonth.classList.add('range-slider-sun-month');
    // Append the range slider to the main container
    container.appendChild(rangeSliderMonth);
    
    // Add event listener to update Cesium time and shadows when slider value changes
    rangeSliderMonth.addEventListener('input', function() {
      var month = parseInt(this.value);
      var day = parseInt(document.querySelector('.range-slider-sun-day').value);
      var time = parseFloat(document.querySelector('.range-slider-sun-time').value);
      updateCesiumTimeAndShadows(month, day, time);
      
      // Update output text for month
      var monthIndex = parseInt(this.value) - 1;
      var months = ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'];
      sunMonthTextOutput.textContent = months[monthIndex];
      
      // Update the maximum value and output text for day slider based on the selected month
      var daysInMonth = new Date(new Date().getFullYear(), month, 0).getDate();
      var currentDay = parseInt(document.querySelector('.range-slider-sun-day').value);
      if (currentDay > daysInMonth) {
        rangeSliderDay.max = daysInMonth.toString();
        rangeSliderDay.value = daysInMonth.toString();
        sunDayTextOutput.textContent = daysInMonth;
      } else {
        rangeSliderDay.max = daysInMonth.toString();
      }
    });
  
    // Create centered text "Sun day"
    var sunDayText = document.createElement('div');
    sunDayText.textContent = 'Datum';
    sunDayText.classList.add('sun-day-text', 'styled-text'); // Add class to text element
    // Append the text to the main container
    container.appendChild(sunDayText);
    
    // Create centered text output for "Sun day"
    var sunDayTextOutput = document.createElement('div');
    sunDayTextOutput.textContent = '15'; // Set initial value
    sunDayTextOutput.classList.add('sun-day-text-output', 'styled-text'); // Add class to text element
    // Append the text output to the main container
    container.appendChild(sunDayTextOutput);
    
    // Create range slider for sun day
    var rangeSliderDay = document.createElement('input');
    rangeSliderDay.type = 'range';
    rangeSliderDay.min = '1';
    rangeSliderDay.step = '1';
    rangeSliderDay.max = '31'; // Set initial value for maximum days
    rangeSliderDay.value = '15'; // Set initial value
    rangeSliderDay.classList.add('range-slider-sun-day');
    // Append the range slider to the main container
    container.appendChild(rangeSliderDay);
    
    // Add event listener to update Cesium time and shadows when slider value changes
    rangeSliderDay.addEventListener('input', function() {
      var month = parseInt(document.querySelector('.range-slider-sun-month').value);
      var day = parseInt(this.value);
      var time = parseFloat(document.querySelector('.range-slider-sun-time').value);
      updateCesiumTimeAndShadows(month, day, time);
      
      // Update output text for day
      sunDayTextOutput.textContent = this.value;
    });
  
    // Create centered text "Sun time"
    var sunTimeText = document.createElement('div');
    sunTimeText.textContent = 'Tid';
    sunTimeText.classList.add('sun-time-text', 'styled-text'); // Add class to text element
    // Append the text to the main container
    container.appendChild(sunTimeText);
    
    // Create centered text output for "Sun time"
    var sunTimeTextOutput = document.createElement('div');
    sunTimeTextOutput.textContent = '10:00'; // Set initial value
    sunTimeTextOutput.classList.add('sun-time-text-output', 'styled-text'); // Add class to text element
    // Append the text output to the main container
    container.appendChild(sunTimeTextOutput);
    
    // Create range slider for sun time
    var rangeSliderTime = document.createElement('input');
    rangeSliderTime.type = 'range';
    rangeSliderTime.min = '0.5';
    rangeSliderTime.step = '0.5';
    rangeSliderTime.max = '24';
    rangeSliderTime.value = '10'; // Set initial value
    rangeSliderTime.classList.add('range-slider-sun-time');
    // Append the range slider to the main container
    container.appendChild(rangeSliderTime);
    
    // Add event listener to update Cesium time and shadows when slider value changes
    rangeSliderTime.addEventListener('input', function() {
      var month = parseInt(document.querySelector('.range-slider-sun-month').value);
      var day = parseInt(document.querySelector('.range-slider-sun-day').value);
      var time = parseFloat(this.value);
      updateCesiumTimeAndShadows(month, day, time);
      
      // Update output text for time
      var hours = Math.floor(this.value);
      var minutes = (this.value - hours) * 60;
      var timeString = ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2);
      sunTimeTextOutput.textContent = timeString;
    });
  
    // Find the SunModuleBtn button
    var sunModuleBtn = document.getElementById('button_2');
    // Insert the container before the next sibling of SunModuleBtn (i.e., the extra button)
    sunModuleBtn.parentNode.insertBefore(container, sunModuleBtn.nextSibling);
  }
  
  
  // Function to toggle visibility of sliders for SunModule
  function toggleSunModuleSliders() {
    console.log('Toggling sun sliders...'); // Log when sliders are being toggled
    let sliderContainer = document.querySelector('.sun-slider-text-container');
    sliderContainer.classList.toggle('hidden');
    SunModuleBtn.style.backgroundColor = "#0482fc"
    // Turn off shadows when hiding sliders
    if (sliderContainer.classList.contains('hidden')) {
      viewer.shadows = false;
      SunModuleBtn.style.backgroundColor = "#fff"
    }
  }
 

  // Add click event listener to the SunModuleBtn button
  SunModuleBtn.addEventListener('click', function() {
    console.log('SunModuleBtn clicked...'); // Log when SunModuleBtn is clicked
    // Check if sliders are already created
    if (document.querySelector('.sun-slider-text-container') === null) {
      // Create sliders
      createSunModuleSliders();
      SunModuleBtn.style.backgroundColor = "#0482fc"

    } else {
      // Toggle visibility of sliders
      toggleSunModuleSliders();
      
    }
  });
