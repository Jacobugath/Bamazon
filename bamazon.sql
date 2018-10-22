DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
item_id INTEGER (11) AUTO_INCREMENT NOT NULL,
product_name VARCHAR (75),
department_name VARCHAR (50),
price INTEGER (10),
stock_quantity INTEGER (10),
primary key (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Black Slippers', 'Apparel', '20', '50');
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Throwing Stars', 'Appliance', '50', '35');
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Smoke Pellets', 'Toys', '50', '35');
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Sword', 'Appliance', '1020', '20');
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Hologram', 'Technology', '850', '28');
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Cell Phone', 'Phones', '425', '10');
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Scooter', 'Toys', '35', '33');
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('War Helmet', 'Toys', '50', '80');
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Cell Phone Case', 'Phones', '15', '42');
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Bar Soap', 'Household', '1', '1200');

SELECT * FROM products.stock_quantity;