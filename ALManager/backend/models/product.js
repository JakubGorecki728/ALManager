const db = require('../util/database');

module.exports = class Product {
    constructor(name) {
    this.name = name;
    }

    static fetchAll () {
        return db.execute('SELECT * FROM products');
    }

    static save(product) {
        return db.execute(
            'INSERT INTO products (name) VALUES (?)', 
            [product.name]
        )
    }

    static delete(id) {
        return db.execute('DELETE FROM products WHERE id = ?', [id])
    }
};