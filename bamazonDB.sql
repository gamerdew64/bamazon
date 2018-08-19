-- 1. Create a MySQL Database called `bamazon`.
CREATE DATABASE bamazon;

USE  bamazon;
-- 2. Then create a Table inside of that database called `products`.
CREATE TABLE products (
  -- (unique id for each product)
  item_id INT NOT NULL AUTO_INCREMENT,
  -- (Name of product)
  product_name VARCHAR(75) NULL,
   -- (Name of department) 
  department_name VARCHAR(75) NULL,
  -- (cost to customer)
  price DECIMAL(10,2) NULL,
  -- (how much of the product is available in stores)
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

-- 4. Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Book", "Books & Literature", 14.99, 75);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Clock", "Home & Kichen", 44.99, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Computer", "Electronics", 1499.99, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("DSLR Camera", "Photography", 499.99, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Ice cube tray", "Home & Kitchen", 4.99, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Lamp", "Furniture & Lighting", 19.99, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Baseball Cap", "Sports", 34.99, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Shampoo", "Health & Beauty", 2.99, 225);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Toothpaste", "Health & Beauty", 1.49, 150);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Wallet", "Fashion Accessories", 14.99, 250);

USE bamazon;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

SELECT * FROM products
SELECT item_id, product_name, price FROM products;

USE bamazon;
-- SELECT * FROM products;

ALTER TABLE bamazon.products MODIFY COLUMN stock_quantity INTEGER(10) NOT NULL;
SELECT item_id, product_name, price FROM bamazon.products;

CREATE DATABASE bamazon;

-- USE  bamazon;
CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(75) NULL,
  department_name VARCHAR(75) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

USE bamazon;
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Book", "Books & Literature", 14.99, 75);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Clock", "Home & Kichen", 44.99, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Computer", "Electronics", 1499.99, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("DSLR Camera", "Photography", 499.99, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Ice cube tray", "Home & Kitchen", 4.99, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Lamp", "Furniture & Lighting", 19.99, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Baseball Cap", "Sports", 34.99, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Shampoo", "Health & Beauty", 2.99, 225);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Toothpaste", "Health & Beauty", 1.49, 150);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Wallet", "Fashion Accessories", 14.99, 250);


USE bamazon;
SELECT * FROM products;

ALTER TABLE bamazon.products MODIFY COLUMN stock_quantity INTEGER(10) NOT NULL;
SELECT item_id, product_name, price FROM bamazon.products;

UPDATE bamazon.products
SET stock_quantity = '75'
WHERE item_ID = 1;

UPDATE bamazon.products
SET stock_quantity = '15'
WHERE item_ID = 2;

UPDATE bamazon.products
SET stock_quantity = '5'
WHERE item_ID = 3;

UPDATE bamazon.products
SET stock_quantity = '10'
WHERE item_ID = 4;

UPDATE bamazon.products
SET stock_quantity = '200'
WHERE item_ID = 5;

UPDATE bamazon.products
SET stock_quantity = '20'
WHERE item_ID = 6;

UPDATE bamazon.products
SET stock_quantity = '50'
WHERE item_ID = 7;

UPDATE bamazon.products
SET stock_quantity = '225'
WHERE item_ID = 8;

UPDATE bamazon.products
SET stock_quantity = '150'
WHERE item_ID = 9;

UPDATE bamazon.products
SET stock_quantity = '250'
WHERE item_ID = 10;