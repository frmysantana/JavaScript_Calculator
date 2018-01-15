// To avoid polluting the global namespace.
(function () {

  var allClear = document.getElementById("all-clear");
  var clearEntry = document.getElementById("clear-entry");
  var digits = document.querySelectorAll(".digit");
  var decimal = document.getElementById(".");
  var equals = document.getElementById("equals");
  var operations = document.querySelectorAll(".operation");
  var changeSign = document.getElementById("changeSign");
  var output = document.getElementById("display");

  var total;

  function add(a, b) {
    total = parseFloat(a, 10) + parseFloat(b,10);
  }

  function subtract(a, b) {
    total = parseFloat(a, 10) - parseFloat(b,10);
  }

  function multiply(a, b) {
    total = parseFloat(a, 10) * parseFloat(b,10);
  }

  function divide(a, b) {
    total = parseFloat(a, 10) / parseFloat(b,10);
  }

  allClear.addEventListener("click", function() {
    output.textContent = '0';
  });
    
  clearEntry.addEventListener("click", function() {
    var expression = output.textContent;
    var clearedExpression = expression.split(' ');
    if (clearedExpression.length === 1) {
      output.textContent = '0';
    } // Clear an operation symbol.
    else if (clearedExpression[clearedExpression.length - 1] === '') {
      clearedExpression.pop(); clearedExpression.pop();
      output.textContent = clearedExpression.join(' ');
    } else {
      clearedExpression.pop();
      output.textContent = clearedExpression.join(' ') + ' ';
    }
  });
  
  // Add the clicked digit to the current number.
  digits.forEach(function(el) {
    el.addEventListener("click", function(ev) {
      var digitValue = ev.target.innerHTML, expression = output.textContent;
      if (expression === '0') {
        output.textContent = digitValue;
      } else {
        output.textContent = expression + digitValue;
      }
    });
  });
    
  // Add the clicked operation to the expression.
  operations.forEach(function(el) {
    el.addEventListener("click", function(ev) {
      var expression = output.textContent, opValue = ev.target.innerHTML;
      var lastNum = expression.split(' ').pop();
      if (!Number.isNaN(parseFloat(lastNum, 10))) {
        output.textContent = expression + ' ' + opValue + ' ';
      } else { // In case user forgets to input a number before appending an operation.
        alert("Error: There must be a number to operate on.");
      }
    });
  });
    
  
  decimal.addEventListener("click", function() {
    var expression = output.textContent, lastNum = expression.split(' ').pop();
    if (lastNum === '') { // In case user begins the current number with '.'
      output.textContent = expression + '0.';
    } // Add a decimal to the current number
    else if (lastNum.indexOf('.') === -1) {
      output.textContent = expression + '.';
    } else { // Prevent a number from having more than 1 decimal.
      alert("Error: A number can't have more than 1 decimal point!");
    }
  });
  
  // Flip sign of the current number (positive number turns negative and vice versa)
  changeSign.addEventListener("click", function() {
    var expression = output.textContent, lastNum = expression.split(' ').pop();
    if (!Number.isNaN(parseFloat(lastNum, 10))) {
      // Change a negative number to a positive number
      if (parseFloat(lastNum, 10) < 0) {
        lastNum = lastNum.slice(1);
      } else if (lastNum > 0) { // Change a positive number to a negative number.
        lastNum = '-' + lastNum;
      }
      var newExp = expression.split(' ');
      newExp.pop();
      newExp.push(lastNum);
      output.textContent = newExp.join(' ');
    } else if (lastNum === '') { // Begin the next number as a negative
      var newExp = expression + '-';
      output.textContent = newExp;
    }
  });

  equals.addEventListener("click", function() {
    var expression = output.textContent;
    var willEvaluate = expression.split(' ');
    // Make sure the expression ends with a number before evaluating.
    if (Number.isNaN(parseInt(willEvaluate[willEvaluate.length -1], 10))) {
      alert('Error: Invalid Expression. Make sure the expression ends in a number and each\
      operation has a number to its left and right.');
    } else {
      // Evaluation occurs from left to right, replacing the operation represeted by the first
      // three elements (a number, an operation, and a second number) with the result of that operation
      // until only one element (a number) is left, which is then outputted as the final result.
      while (willEvaluate.length > 1) {
        var result = willEvaluate.slice(0, 3);
        switch (result[1]) { // Pick the function corresponding to the operation symbol.
          case '+':
            add(result[0], result[2]);
            willEvaluate.splice(0, 3, total);
            break;
          case '-':
            subtract(result[0], result[2]);
            willEvaluate.splice(0, 3, total);
            break;
          case '*':
            multiply(result[0], result[2]);
            willEvaluate.splice(0, 3, total);
            break;
          case '/':
            divide(result[0], result[2]);
            willEvaluate.splice(0, 3, total);
            break;
        }
      }

      output.textContent = willEvaluate[0];
    }
  });
}());
