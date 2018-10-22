var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require("colors");

var connection = mysql.createConnection({
    host: "localhost",
    port: "8889",
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function(error) {
    if (error) {
        throw error;
    }
    console.log("connected as id" + connection.threadId);

    connection.query("SELECT * FROM products", function(error, response) {
        if (error) throw error;
        for (var i = 0; i < response.length; i++) {
            console.log(
                "Available for sale - ".green +
                    colors.yellow(
                        "Item ID: " +
                            response[i].item_id +
                            "," +
                            " Product: " +
                            response[i].product_name +
                            "," +
                            " $" +
                            response[i].price
                    )
            );
        }
        start(response);
    });
});

function start(results) {
    inquirer
        .prompt([
            {
                type: "list",
                name: "selectItemID",
                message:
                    "What is the Item ID of the product you would like to buy?",
                choices: function() {
                    var choiceArrayItemId = [];
                    for (var i = 0; i < results.length; i++) {
                        choiceArrayItemId.push(results[i].item_id.toString());
                    }
                    return choiceArrayItemId;
                }
            },
            {
                type: "input",
                name: "selectNumUnits",
                message: "How many would you like to buy?"
            }
        ])

        .then(function(answer) {
            CheckUnits(answer.selectItemID, answer.selectNumUnits);
        });
}

function updateUnits(itemID, NumUnits, stock_quantity) {
    var query = connection.query(
        `UPDATE products SET stock_quantity = ${stock_quantity -
            NumUnits} WHERE ${itemID} = item_id`,
        function(err, results) {
            if (err) {
                throw err;
            } else {
                console.log("Your order has been placed successfully!".bold);
            }
        }
    );
}
function OrderTotal(NumUnits, price) {
    console.log("Order Total $" + NumUnits * price);
}

function CheckUnits(ItemID, NumUnits, price) {
    connection.query(
        `SELECT stock_quantity, price FROM products WHERE ${ItemID} = products.item_id`,
        function(err, results) {
            let price = results[0].price;

            if (err) {
                throw err;
            } else if (parseInt(NumUnits) > results[0].stock_quantity) {
                console.log(
                    "Insufficient quantity - cannot complete your order."
                );
            } else if (parseInt(NumUnits) <= results[0].stock_quantity) {
                updateUnits(ItemID, NumUnits, results[0].stock_quantity);

                OrderTotal(NumUnits, price);
            }

            connection.end();
        }
    );
}
