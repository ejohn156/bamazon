var inquirer = require("inquirer")
var mysql = require("mysql")

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});
console.log("\nWelcome to Bamazon! The center for console based shopping\n")
runProgram()

function runProgram() {

    connection.query("SELECT * FROM products", function (error, response, fields) {
        response.forEach(function (element) {
            console.log("ID: " + element.item_id + " | " + "Product: " + element.product_name + " | " + "Department: " + element.department_name + " | " + "Price: $" + element.price + " | " + "Stock: " + element.stock_quantity)
            console.log("---------------------------------------------------------------------------------------")
        });
    })
    setTimeout(buy, 500)
}
function buy() {
    inquirer.prompt([
        {
            type: "input",
            message: "enter the ID number of the product listed above that you would like to buy",
            name: "id"
        },
        {
            type: "input",
            message: "how much of this item would you like to buy?",
            name: "quantity"
        }
    ]).then(function (res) {
        item_id = res.id
        quantity = res.quantity
        accessDb(item_id, quantity)

    })
}
function accessDb(item_id, quantity) {
    connection.query("SELECT * FROM products WHERE item_id = ?", item_id, function (error, response, fields) {
        if (error) throw error
        else {
            if (response[0] === undefined) {
                console.log("Product was not found on bamazon")
                cont()
            }
            else {
                if (quantity > response[0].stock_quantity) {
                    console.log("Insufficient quantity!")
                    cont()
                }
                else {
                    transactionAccepted(response, quantity)
                }
            }
        }
    })
}

function transactionAccepted(response, quantity) {
    var cost = parseFloat(quantity * response[0].price).toFixed(2)
    var newStock = response[0].stock_quantity - quantity
    var item_id = response[0].item_id
    
    connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [newStock, item_id]);
        console.log("Transaction accepted! You have bought " + quantity + " " + response[0].product_name + " for $" + cost)
        cont()
    

}
function cont() {
    inquirer.prompt([
        {
            type: "list",
            choices: ["yes", "no"],
            message: "would you like to buy another item?",
            name: "answer"
        }
    ]).then(function (res) {
        if (res.answer === "yes") {
            runProgram()
        }
        else {
            console.log("thank you for shopping at bamazon!")
            connection.end()
        }
    })

}