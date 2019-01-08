
exports.up = function (knex, Promise) {
    return knex.schema.table('notifications', t => {
        t.string('commentId');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.table('notifications', t => {
        t.dropColumn('commentId');
    })
};
