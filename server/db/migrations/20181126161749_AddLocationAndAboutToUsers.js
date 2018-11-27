
exports.up = function (knex, Promise) {
    return knex.schema.table('users', t => {
        t.string('location');
        t.text('about');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.table('users', t => {
        t.dropColumn('location');
        t.dropColumn('about');
    });
};
