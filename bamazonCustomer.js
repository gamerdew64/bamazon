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
});

var customTableView = function(){
  connection.query("SELECT * FROM products", function(err, res){
    for(var i=0; i<res.length; i++){
      console.log(res[i].item_id+" || "+res[i].product_name+" || "+res[i].department_name+" || "+res[i].price+" || "+res[i].stock_quantity+"\n");
    }
  promptCustomer(res);
  });
};

var promptCustomer = function(res){
  inquirer.prompt([{
    type: 'input',
    name: 'choice',
    // 6. The app should then prompt users with two messages.
    //    * The first should ask them the ID of the product they would like to buy.
    message: 'Please enter the corresponding ID of the item that would you like to purchase. [Press Q to Quit Application]'
  }]).then(function(answer){
    var correct = false;
    if(answer.choice.toUpperCase()=="Q"){
      console.log("\x1b[36m%s\x1b[0m", "\n===========================================================\n" + "Please come back when you would like to buy something!!!" + "\n===========================================================\n"); //Cyan color
      process.exit();
    }
    for(var i=0; i<res.length; i++){
      // console.log(res[i].item_id, parseInt(answer.choice));

      // if((res[i].product_name==answer.choice) || (res[i].item_id==parseInt(answer.choice))){
      if(res[i].item_id==parseInt(answer.choice)){
        correct = true;
        var product = answer.choice;
        var id = i;
        inquirer.prompt([{
          type: 'input',
          name: 'quant',
          // 6. The app should then prompt users with two messages.
          //    * The second message should ask how many units of the product they would like to buy.
          message: 'How many of this item would you like to buy?',
          validate: function(value){
            if(isNaN(value)==false){
              return true;
            } else {
              return false;
            }
          }
        }]).then(function(answer){
          if(res[id].stock_quantity>answer.quant){
            connection.query("UPDATE products SET stock_quantity='"+(res[id].stock_quantity-answer.quant)+"' WHERE item_id='"+product+"';", function(err,response){
              console.log("\x1b[32m", "\n===========================================================\n" + "Product Bought!" + "\n===========================================================\n"); // green color
              console.log("\x1b[35m", "\n+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n" + "Your Sub Total is $" +(parseFloat(res[id].price)*parseInt(answer.quant))+ "\n+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n"); // magenta color
              console.log("\x1b[34m", "\n+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n" + "Your Total (after 12% sales tax) is $" +((parseFloat(res[id].price)*parseInt((answer.quant)))+((parseFloat(res[id].price)*parseInt((answer.quant))*('.12'))))+ "\n+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n"); // magenta color
              console.log("\x1b[30m", "\n===========================================================\n" + "Reloading Inventory..." + "\n===========================================================\n"); // black color
              customTableView();
            });
          }
          else {
             //7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request. If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.
            console.log("\x1b[31m", "\n----------------------------------------------------------------------------------------\n" + "Insufficient Inventory --- We are all out of stock, please try another item. Sorry!!!" + "\n----------------------------------------------------------------------------------------\n"); // Red Color
            promptCustomer(res);
          }
        });
      }
    }
    if(i==res.length && correct==false){
      console.log("\x1b[34m", "\n-----------------------------------------------------------\n" + "That is not a valid selection, please try again!!!" + "\n-----------------------------------------------------------\n"); //Purple Color
      promptCustomer(res);
    }
  });
};
