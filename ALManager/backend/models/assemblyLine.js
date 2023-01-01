const db = require('../util/database');

module.exports = class AssemblyLine {
    constructor(name) {
    this.name = name;
    }

    static fetchAll () {
        return db.execute('SELECT * FROM assembly_lines');
    }

    static save(assemblyLine) {
        return db.execute(
            'INSERT INTO assembly_lines (name) VALUES (?)', 
            [assemblyLine.name]
        )
    }

    static delete(id) {
        return db.execute('DELETE FROM assembly_lines WHERE id = ?', [id])
    }

    static changeState(id) {
        return db.execute('UPDATE assembly_lines SET active = NOT active WHERE id = ?', [id])
    }

    static assignProduct(id, product_id) {
        product_id == 0 ? product_id = null: "";
        return db.execute('UPDATE assembly_lines SET product_id = ? WHERE id = ?', [product_id, id])
    }
};