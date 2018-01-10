var allClear = document.getElementById("all-clear");
var clearEntry = document.getElementById("clear-entry");
var digits = document.querySelectorAll(".digit");
var decimal = document.getElementById(".");
var operations = document.querySelectorAll(".operation");
var output = document.getElementById("display");

allClear.addEventListener("click", function() {
    alert("Clearing everything from the output field!");
});

clearEntry.addEventListener("click", function() {
    alert("Clearing the last entry");
})

digits.forEach(function(el) {
    el.addEventListener("click", function(e) {
        var digitValue = e.target.innerHTML;
        var quantity = output.textContent;
        console.log("Type of digitValue: " + typeof(digitValue));
        console.log("Type of quantity: " + typeof(quantity));
        if (quantity === '0') {
            alert("nothing in here!");
            output.textContent = digitValue;
        } else {
            output.textContnet = quantity + digitValue;
        }  
    });
});

operations.forEach(function(el) {
    el.addEventListener("click", function(e) {
        var opValue = e.target.innerHTML;
        alert('Hello from button ' + opValue + ' !');
    });
});

decimal.addEventListener("click", function() {
    var quantity = output.textContent;
    output.textContent = quantity + '.';
});
