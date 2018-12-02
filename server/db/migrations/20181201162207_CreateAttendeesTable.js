
exports.up = function (knex, Promise) {
    return knex.schema.createTable('attendees', t => {
        t.increments('id');
        t.integer('userId').unsigned().references('users.id');
        t.string('status');
        t.string('eventId');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('attendees')
};
