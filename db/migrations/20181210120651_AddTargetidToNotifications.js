
exports.up = function (knex, Promise) {
    return knex.schema.table('notifications', t => {
        t.string('targetId');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.table('notifications', t => {
        t.dropColumn('targetId');
    })
};
