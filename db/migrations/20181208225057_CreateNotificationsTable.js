
exports.up = function (knex, Promise) {
    return knex.schema.createTable('notifications', t => {
        t.increments('id');
        t.string('type');
        t.integer('userId').unsigned().references('users.id');
        t.boolean('isRead').defaultTo(false);
        t.timestamp('createdAt').defaultTo(knex.fn.now());
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('notifications');
};
