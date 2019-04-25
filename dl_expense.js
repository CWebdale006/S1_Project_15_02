"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Case Problem 2

   Author: Connor J Webdale 
   Date: 4.24.19 
   
   Filename: dl_expenses.js
   
   Function List
   =============
   
   validateSummary()
      Validates the data entry in the summary field.
   
   calcClass(sumClass)
      Sums up all of the data values for elements of the sumClass class.
      
   calcExp()
      Calculates the travel expenses from all categories and dates.
      
   formatNumber(val, decimals)
      Formats the value, "val" to the number of decimals indicated 
      by "decimals", adding thousands separators.
      
   formatUSCurrency(val)
      Formats the value, "val", as U.S. currency.
      
*/
// Event listener for the load event 
window.addEventListener("load", function () {
      // Matches all "input" elements in the travelExp table belonging to the sum class 
      var changingCells = document.querySelectorAll("table#travelExp input.sum");

      // Loops through every item in the changingCells collection 
      for (var i = 0; i < changingCells.length; i++) {
            // Adds an onchange event handler than runs the calcExp() function 
            changingCells[i].onchange = calcExp;
      }

      // For the button with the ID "submitButton", adds an event handler for the click event to run a function 
      document.getElementById("submitButton").onclick = validateSummary;
});

// Displays a customized validation message 
function validateSummary() {
      var summary = document.getElementById("summary")

      // If the validation state of the summary fied value is missing, sets a custom message 
      if (summary.validity.valueMissing) {
            summary.setCustomValidity("You must include a summary of the trip in your report.");
      } else {
            summary.setCustomValidity("");
      }
}

// Sum the values of input elements belonging to the sumClass class of elements 
function calcClass(sumClass) {
      // Contains the object collection of all elements belonging to the sumClass class 
      var sumFields = document.getElementsByClassName(sumClass);
      // Will be used to keep a running total of the total values in the input elements in the sumFields object collection 
      var sumTotal = 0;
      // Loops through the sumFields collection 
      for (var i = 0; i < sumFields.length; i++) {
            var itemValue = parseFloat(sumFields[i].value);
            if (isNaN(itemValue) === false) {
                  sumTotal += itemValue;
            }
      }

      // Returns the value of sumTotal 
      return sumTotal;
}

// Calculates the row and column totals from the travelExp table 
function calcExp() {
      // References all table row elements within the table body of the travelExp table 
      var expTable = document.querySelectorAll("table#travelExp tbody tr");

      // Loops through the rows in the expTable collection 
      for (var i = 0; i < expTable.length; i++) {
            // Sets the value of the input element to the value returned by the calcClass funtion using a parameter value 
            document.getElementById("subtotal" + i).value = formatNumber(calcClass("date" + i), 2);
      }

      // Sets the values of input elements by calling the calcClass() function using parameter values 
      document.getElementById("transTotal").value = formatNumber(calcClass("trans"), 2);
      document.getElementById("lodgeTotal").value = formatNumber(calcClass("lodge"), 2);
      document.getElementById("mealTotal").value = formatNumber(calcClass("meal"), 2);
      document.getElementById("otherTotal").value = formatNumber(calcClass("other"), 2);

      // Sets the value of an input element returned by the calcClass() function 
      document.getElementById("expTotal").value = formatUSCurrency(calcClass("sum"), 2);
}







function formatNumber(val, decimals) {
      return val.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
      });
}

function formatUSCurrency(val) {
      return val.toLocaleString('en-US', {
            style: "currency",
            currency: "USD"
      });
}