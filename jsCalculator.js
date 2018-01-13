// Avoiding polluting the global namespace.
(function () {
  var allClear = document.getElementById("all-clear");
  var clearEntry = document.getElementById("clear-entry");
  var digits = document.querySelectorAll(".digit");
  var decimal = document.getElementById(".");
  var equals = document.getElementById("equals");
  var operations = document.querySelectorAll(".operation");
  var changeSign = document.getElementById("changeSign");
  var output = document.getElementById("display");
    
  var Calculator = function() {
    var total;

    this.add = function(a, b) {
      this.total = parseFloat(a, 10) + parseFloat(b, 10);
    };

    this.subtract = function(a, b) {
      this.total = parseFloat(a, 10) - parseFloat(b, 10);
    };

    this.multiply = function(a, b) {
      this.total = parseFloat(a, 10) * parseFloat(b, 10);
    };

    this.divide = function(a, b) {
      this.total = parseFloat(a, 10) / parseFloat(b, 10);
    };
  };
    
  var page = new Calculator();
    
  allClear.addEventListener("click", function() {
    output.textContent = '0';
  });
    
  clearEntry.addEventListener("click", function() {
    var expression = output.textContent;
    var clearedExpression = expression.split(' ');
    if (clearedExpression.length === 1) {
      output.textContent = '0';
    } else if (clearedExpression[clearedExpression.length - 1] === '') {
      clearedExpression.pop(); clearedExpression.pop();
      output.textContent = clearedExpression.join(' ');
    } else {
      clearedExpression.pop();
      output.textContent = clearedExpression.join(' ') + ' ';
    }
  });
    
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
    
  operations.forEach(function(el) {
    el.addEventListener("click", function(ev) {
      var expression = output.textContent, opValue = ev.target.innerHTML;
      output.textContent = expression + ' ' + opValue + ' ';
    });
  });
    
  decimal.addEventListener("click", function() {
    var expression = output.textContent, lastNum = expression.split(' ').pop();
    console.log(lastNum);
    if (lastNum === '') {
      output.textContent = expression + '0.';
    } else if (lastNum.indexOf('.') === -1) {
      output.textContent = expression + '.';
    } else {
      alert("Error: A number can't have more than 1 decimal point!");
    }
  });
  
  changeSign.addEventListener("click", function() {
    alert('Hello');
  });

  equals.addEventListener("click", function() {
    var expression = output.textContent;
    var willEvaluate = expression.split(' ');
    if (Number.isNaN(parseInt(willEvaluate[willEvaluate.length -1], 10))) {
      alert('Error: Expression must end in a number. Please complete it.');
    } else {
      while (willEvaluate.length > 1) {
        var result = willEvaluate.slice(0, 3);
        switch (result[1]) {
          case '+':
            page.add(result[0], result[2]);
            willEvaluate.splice(0, 3, page.total);
            break;
          case '-':
            page.subtract(result[0], result[2]);
            willEvaluate.splice(0, 3, page.total);
            break;
          case '*':
            page.multiply(result[0], result[2]);
            willEvaluate.splice(0, 3, page.total);
            break;
          case '/':
            page.divide(result[0], result[2]);
            willEvaluate.splice(0, 3, page.total);
            break;
        }
      }

      output.textContent = willEvaluate[0];
    }
  });
}());
