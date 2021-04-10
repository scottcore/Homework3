// Assignment Code
var generateBtn = document.querySelector("#generate");
// console.log(generateBtn);

//arrays to build password
var lowercase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var uppercase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var numeric = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var specialChar = ["!", '"', "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\'", "]", "^", "_", "`", "{", "|", "}", "~"];

//blank string to caputre prompt box response
var confirmLength = "";

//booleans to capture confirm box response
var confirmLowercase;
var confirmUppercase;
var confirmNumeric;
var confirmSpecialChar;

function generatePassword() {
  //prompt box to select password length
  var confirmLength = (prompt("Select a password length between 8 to 128 characters"));

  //alert box loop if user fails to select password length
  while (confirmLength <= 7 || confirmLength >= 129) {
    alert("Password length must be between 8 to 128 charcaters");
    var confirmLength = (prompt("Select a password length between 8 to 128 characters"));
  }

  //confirm boxes for password criteria
  var confirmLowercase = confirm("Click OK to include lowercase letters, click Cancel to exclude");
  var confirmUppercase = confirm("Click OK to include uppercase letters, click Cancel to exclude");
  var confirmNumeric = confirm("Click OK to include numbers, click Cancel to exclude");
  var confirmSpecialChar = confirm("Click OK include special characters, click Cancel to exclude");

  //alert box loop for if user fails to select critera
  while (confirmLowercase === false && confirmUppercase === false && confirmNumeric === false && confirmSpecialChar === false) {
    alert("You must choose at least one parameter");
    var confirmLowercase = confirm("Click OK to include lowercase letters, click Cancel to exclude");
    var confirmUppercase = confirm("Click OK to include uppercase letters, click Cancel to exclude");
    var confirmNumeric = confirm("Click OK to include numbers, click Cancel to exclude");
    var confirmSpecialChar = confirm("Click OK include special characters, click Cancel to exclude");
  }

  //concatenation of the strings for iteration loop
  var concatinatePass = []
  if (confirmLowercase) {
    concatinatePass = concatinatePass.concat(lowercase)
  }
  if (confirmUppercase) {
    concatinatePass = concatinatePass.concat(uppercase)
  }
  if (confirmNumeric) {
    concatinatePass = concatinatePass.concat(numeric)
  }
  if (confirmSpecialChar) {
    concatinatePass = concatinatePass.concat(specialChar)
  }
// console.log(concatinatePass);

  //my attempt in trying to use a crypto as MDN states math.random() isn't for secure random numbers. Borrowed the function from StackOverflow as I didn't understand how to limit crypto.getRandomValues to mimic math.random().
  function cryptoRandom(){
    // return a crypto generated number
    // between 0 and 1 (0 inclusive, 1 exclusive);
    // Mimics the Math.random function in range of results
    var array = new Uint32Array(1),
      max = Math.pow(2, 32), // normally the max is 2^32 -1 but we remove the -1
                             //  so that the max is exclusive
      randomValue = window.crypto.getRandomValues(array)[0] / max;
  
      return randomValue;
  }

  //loop to build the password
  var scratchPassword = ""
  for (var i = 0; i < confirmLength; i++) {
    scratchPassword = scratchPassword + concatinatePass[Math.floor(cryptoRandom() * concatinatePass.length)];
    //The alternate using math.random()
    // scratchPassword = scratchPassword + concatinatePass[Math.floor(Math.random() * concatinatePass.length)];
    // console.log(scratchPassword);
  }
  return scratchPassword;
}

  // Write password to the #password input
  function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector("#password");

    passwordText.value = password;

  }

  // Add event listener to generate button
  generateBtn.addEventListener("click", writePassword);