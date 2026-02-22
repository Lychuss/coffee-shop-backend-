CREATE TABLE products (
	name VARCHAR(225) PRIMARY KEY,
	image TEXT,
	rating DECIMAL(1,1),
	price DECIMAL(2, 2),
	category VARCHAR(225)
)

CREATE TABLE users (
	users_id UUID PRIMARY KEY,
	role VARCHAR(50) DEFAULT 'guest',
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
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

CREATE TABLE carts (
	id UUID PRIMARY KEY,
	user_id UUID REFERENCES users(id),
	status VARCHAR(50) DEFAULT 'active',
	time_add TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	time_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE cart_items (
	id BIGSERIAL PRIMARY KEY,
	cart_id UUID REFERENCES carts(id) ON DELETE CASCADE,
	product_name VARCHAR(225) REFERENCES products(name),
	size INT,
	quantity INT
)

1. BANGSILOG, /images/bangsilog-menu.png, 3.4, null, 95, breakfast
1. HUNGSILOG, /images/hungsilog-menu.png, 4.5, null, 95, breakfast
1. LONGSILOG, /images/longsilog-menu.png, 2.4, null, 85, breakfast
1. TOSILOG, /images/tosilog-menu.png, 4.4, null, 85, breakfast
1. CLASSIC BURGER, /images/classic-burger-menu.png, 4.2, null, 75, snacks
1. FRENCH FRIES, /images/french-fries-menu.png, 4.5, null, 50, snacks
1. HAM CARBONARA, /images/ham-carbonara-menu.png, 3.8, null, 65, snacks
1. HUNGARIAN SANDWICH, /images/hungarian-sandiwch-menu.png, 4.6, null, 85, snacks
1. PANCAKE 2PC, /images/classic-burger-menu.png, 4.2, null, 65, snacks