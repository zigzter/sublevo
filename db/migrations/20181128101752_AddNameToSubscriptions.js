
exports.up = function (knex, Promise) {
    return knex.schema.table('subscriptions', t => {
        t.string('name');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.table('subscriptions', t => {
        t.dropColumn('name');
    })
};
