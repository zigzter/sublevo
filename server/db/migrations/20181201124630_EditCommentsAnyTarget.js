
exports.up = function (knex, Promise) {
    return knex.schema.table('comments', t => {
        t.dropColumn('profileId');
        t.string('targetId');
        t.string('targetType');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.table('comments', t => {
        t.integer('profileId').unsigned().references('users.id');
        t.dropColumn('targetId');
        t.dropColumn('targetType');
    })
};
