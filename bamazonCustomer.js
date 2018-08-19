// 5. Creating a Node application called `bamazonCustomer.js`.
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

//Establish inital connection to datbase
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  // readProducts();
  customTableView();
});

// Creating a custom table look in the console without using a specific npm package. This is called once the connection to the database has been made.
var customTableView = function(){
  connection.query("SELECT * FROM products", function(err, res){
    for(var i=0; i<res.length; i++){
      console.log(res[i].item_id+" || "+res[i].product_name+" || "+res[i].department_name+" || "+res[i].price+" || "+res[i].stock_quantity+"\n");
    }
  // Calling promptCustomer function to have user input what they would like to buy
  promptCustomer(res);
  });
};

// Creating fucntion as an inquire prompt in which we ask the user the id of the project they would like to buy
var promptCustomer = function(res){
  inquirer.prompt([{
    type: 'input',
    name: 'userChoice',
    // 6. The app should then prompt users with two messages.
    //    * The first should ask them the ID of the product they would like to buy.
    message: 'Please enter the corresponding ID of the item that would you like to purchase. [Press Q to Quit Application]'
  }]).then(function(answer){
    var correct = false;
    // Regardless of whether or not the q is capitalized, it will quit the application if they press the key
    if(answer.userChoice.toUpperCase()=="Q"){
      console.log("\x1b[36m%s\x1b[0m", "\n===========================================================\n" + "Please come back when you would like to buy something!!!" + "\n===========================================================\n"); //Cyan color
      // Exits application
      process.exit();
    }
    for(var i=0; i<res.length; i++){
      // Initially designed logic based off of the product name, and intended to have the user decided whtether or not they would like to enter the ID or the name of hte product, but I encountered later issues, so I commented this out:
      // if((res[i].product_name==answer.userChoice) || (res[i].item_id==parseInt(answer.userChoice))){
      if(res[i].item_id==parseInt(answer.userChoice)){
        correct = true;
        // Creating a new variable that we are assigning to the user's input
        var product = answer.userChoice;
        var id = i;
        // Second inquirer prompt
        inquirer.prompt([{
          type: 'input',
          name: 'quantity',
          // 6. The app should then prompt users with two messages.
          //    * The second message should ask how many units of the product they would like to buy.
          message: 'How many of this item would you like to buy?',
          // Including a validation to ensure that the user is entering a value that is correct (I.E. a number that exists).
          validate: function(value){
            if(isNaN(value)==false){
              return true;
            } else {
              return false;
            }
          }
        }]).then(function(answer){
          // 8. If the store _does_ have enough of the product, fulfill the customer's order.
          if(res[id].stock_quantity>answer.quantity){
            //    * Updating the SQL database to reflect the remaining quantity.
            connection.query("UPDATE products SET stock_quantity='"+(res[id].stock_quantity-answer.quantity)+"' WHERE item_id='"+product+"';", function(err,response){
              console.log("\x1b[32m", "\n===========================================================\n" + "Product Bought!" + "\n===========================================================\n"); // green color
              //    * Once the update goes through, we show the customer the sub total with some styling and a blue color
              console.log("\x1b[35m", "\n+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n" + "Your Sub Total is $" +(parseFloat(res[id].price)*parseInt(answer.quantity))+ "\n+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n");
              //    * Once the update goes through, we show the customer the total cost of their purchases (including 12% sales tax) with some styling and a magenta color
              console.log("\x1b[34m", "\n+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n" + "Your Total (after 12% sales tax) is $" +((parseFloat(res[id].price)*parseInt((answer.quantity)))+((parseFloat(res[id].price)*parseInt((answer.quantity))*('.12'))))+ "\n+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n");
              // Included this to offset the issues I was having after my color changes... :(
              // Just added a reloading inventory message to mask the fact that I am changing the color back to black.
              console.log("\x1b[30m", "\n===========================================================\n" + "Reloading Inventory..." + "\n===========================================================\n");
              // Loading the custom (updated) table view
              customTableView();
            });
          }
          else {
             //7. Once the customer has placed the order, the application should check if the store has enough of the product to meet the customer's request. If not, the app will log a phrase like "Insufficient Inventory --- We are all out of stock, please try another item. Sorry!!!", and then prevent the order from going through, routing the user back to the second prompt.
             //Console logging the text in a red color
            console.log("\x1b[31m", "\n----------------------------------------------------------------------------------------\n" + "Insufficient Inventory --- We are all out of stock, please try another item. Sorry!!!" + "\n----------------------------------------------------------------------------------------\n");
            // Calling the second inquire prompt
            promptCustomer(res);
          }
        });
      }
    }
    // Do the following if the index hits the response length, and if the response is not correct
    if(i==res.length && correct==false){
      //Console logging text in with purple color
      console.log("\x1b[34m", "\n-----------------------------------------------------------\n" + "That is not a valid selection, please try again!!!" + "\n-----------------------------------------------------------\n");
      // Calling the prompt again
      promptCustomer(res);
    }
  });
};
