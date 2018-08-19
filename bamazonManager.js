// 5. Create a Node application called `bamazonCustomer.js`.
// Running this application will first display all of the items available for sale.
// Include the ids, names, and prices of products for sale.

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "password",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  // readProducts();
  customTableView();
  // promptManager(res);
});

var customTableView = function(){
  connection.query("SELECT * FROM products", function(err, res){
    for(var i=0; i<res.length; i++){
      console.log(res[i].item_id+" || "+res[i].product_name+" || "+res[i].department_name+" || "+res[i].price+" || "+res[i].stock_quantity+"\n");
    }
  promptManager(res);
  });
};

// function which prompts the manager for what action they should take
var promptManager = function(res){
  inquirer.prompt([{
    type: 'rawlist',
    name: 'managerChoice',
    message: "Please Choose One of the Following Options: [Press Q to Quit Application]",
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
  }]).then(function(answer){
    var correct = false;
    if(answer.managerChoice.toUpperCase()=="Q"){
      console.log("\x1b[36m%s\x1b[0m", "\n===========================================================\n" + "Please come back when you would like to buy something!!!" + "\n===========================================================\n"); //Cyan color
      process.exit();
    }
    else if(answer.managerChoice.toLowerCase()=="View Products for Sale"){
      console.log("You chose to 'View Products for Sale'");
      var viewProductsForSale = function(){
        connection.query("SELECT * FROM products", function(err, res){
          for(var i=0; i<res.length; i++)
          {
            console.log(res[i].item_id+" || "+res[i].product_name+" || "+res[i].department_name+" || "+res[i].price+" || "+res[i].stock_quantity+"\n");
          }
        });
        viewProductsForSale();
      };
      promptManager(res);
    }
    else if(answer.managerChoice.toLowerCase()=="View Low Inventory"){
      console.log("You chose to 'View Low Inventory'");
      var viewLowInventory = function(){
        connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res){
          for(var i=0; i<res.length; i++)
          {
            console.log(res[i].item_id+" || "+res[i].product_name+" || "+res[i].department_name+" || "+res[i].price+" || "+res[i].stock_quantity+"\n");
          }
        });
        viewLowInventory();
      };
    promptManager(res);
    }
    else if(answer.managerChoice.toLowerCase()=="Add to Inventory"){
      console.log("You chose to 'Add to Inventory'");
    }
    else if(answer.managerChoice.toLowerCase()=="Add New Product"){
      console.log("You chose to 'Add New Product'");

      connection.query("INSERT INTO auctions SET ?",
      {
        product_name: answer.managerChoice,
        department_name: answer.managerChoice,
        price: answer.managerChoice,
        stock_quantity: answer.managerChoice
      },
      function(err)
      {
        if (err) throw err;
        console.log("You have added an item!");
        // re-prompt the user for if they want to bid or post
        start();
      });
    }
  });
};
