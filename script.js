let input;

function getValue() {
    const inputElement = document.getElementById("myInput");
    const inputValue = inputElement.value;
  
    input = ("You entered: " + inputValue);
    document.getElementById("output").innerHTML = `${input}`;
  }