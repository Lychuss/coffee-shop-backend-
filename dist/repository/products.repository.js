"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catergory_get_products = exports.search_product = exports.display_all_product = void 0;
const db_1 = require("../config/db");
const display_all_product = async () => {
    return db_1.pool.query('SELECT * FROM products');
};
exports.display_all_product = display_all_product;
const search_product = async (name) => {
    return db_1.pool.query('SELECT * FROM products WHERE name = $1', [name]);
};
exports.search_product = search_product;
const catergory_get_products = async (category) => {
    return db_1.pool.query('SELECT * FROM PRODUCTS WHERE category = $1', [category]);
};
exports.catergory_get_products = catergory_get_products;
