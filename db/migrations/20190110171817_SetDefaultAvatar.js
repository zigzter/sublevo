
exports.up = function (knex, Promise) {
    return knex.schema.table('users', t => {
        t.string('avatar').alter().defaultTo('default.jpg')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.table('users', t => {
        t.string('avatar').alter().defaultTo(null)
    })
};
