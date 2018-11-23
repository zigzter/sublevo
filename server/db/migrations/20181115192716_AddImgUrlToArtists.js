
exports.up = function (knex, Promise) {
    return knex.schema.table('artists', t => {
        t.string('artistImage');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.table('artists', t => {
        t.dropColumn('artistImage');
    })
};
