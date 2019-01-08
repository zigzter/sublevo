
exports.up = function (knex, Promise) {
    return knex.schema.createTable('subscriptions', t => {
        t.increments('id');
        t.integer('userId').unsigned().references('users.id');
        t.string('type');
        t.integer('targetId');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('subscriptions')
};
