
exports.up = function (knex, Promise) {
    return knex.schema.table('users', t => {
        t.string('avatar');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.table('users', t => {
        t.dropColumn('avatar');
    })
};
