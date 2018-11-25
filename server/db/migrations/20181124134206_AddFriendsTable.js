
exports.up = function (knex, Promise) {
    return knex.schema.createTable('friends', t => {
        t.increments('id');
        t.integer('userOne').unsigned().references('users.id');
        t.integer('userTwo').unsigned().references('users.id');
        t.string('status');
        t.integer('actionUser').unsigned().references('users.id');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('friends');
};
