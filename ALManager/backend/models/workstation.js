const db = require('../util/database');

module.exports = class Workstation {
    constructor(short_name, name, pc_name) {
    this.short_name = short_name;
    this.name = name;
    this.pc_name = pc_name;
    }

    static fetchAll () {
        return db.execute('SELECT * FROM workstations');
    }

    static save(workstation) {
        return db.execute(
            'INSERT INTO workstations (short_name, name, pc_name) VALUES (?, ?, ?)', 
            [workstation.short_name, workstation.name, workstation.pc_name]
        )
    }

    static delete(id) {
        return db.execute('DELETE FROM workstations WHERE id = ?', [id])
    }
};