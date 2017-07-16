var inquirer = require("inquirer");

// Create a basic command line Node application using the inquirer package.
// Your application should ask the user any five questions of your choosing.
// The question set should include at least one:

inquirer
.prompt([
  {
    type: "input",
    message: "What is your name?",
    name: "username"
  },
  {
    type: "confirm",
    message: "Are you sure?",
    name: "confirm",
    default: true
  },
  {
    type: "password",
    message: "Please type a paswword",
    name: "password"
  },
  {
    type: "confirm",
    message: "Are you sure?",
    name: "confirm",
    default: true
  },
  {
    type: "list",
    message: "Which movie do you like?",
    choices: ["Batman", "Spiderman", "Superman"]
    name: "movies"
  },
  {
    type: "confirm",
    message: "Are you sure?",
    name: "confirm",
    default: true
  }
])
.then(function(inquirerResponse){
  if(inquirerResponse.confirm){
    console.log("\nWelcome " + inquirerResponse.username);
    console.log("Your " + inquirerResponse.pokemon + " is ready for battle!\n");
  }
  else {
    console.log("\nThat's okay " + inquirerResponse.username + ", come again when you are more sure.\n");
  }
});
