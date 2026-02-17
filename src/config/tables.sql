CREATE TABLE products (
	name VARCHAR(225) PRIMARY KEY,
	image TEXT,
	rating DECIMAL(1,1),
	volume INTEGER,
	price DECIMAL(2, 2),
	category VARCHAR(225)
)

CREATE TABLE customer_reviews(
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(225),
	review VARCHAR(225),
	rating DECIMAL(1,1)	
)

CREATE TABLE customer_order (
	customer_order_id BIGSERIAL PRIMARY KEY,
	customer_name VARCHAR(225),
	product_name VARCHAR(225) REFERENCES products(name),
	quantity INT,
	payment INT REFERENCES payment_method(payment_id),
	paid BOOLEAN
)

CREATE TABLE payment_method (
	payment_id BIGSERIAL PRIMARY KEY,
	method VARCHAR(225)
)

CREATE TABLE orders_receipt (
	order_id INT REFERENCES customer_order(customer_order_id),
	order_date DATE,
	server_name VARCHAR(225),
	order_type VARCHAR(225),
	total_price DECIMAL(10, 2),
	address VARCHAR(225),
	contact INT
)