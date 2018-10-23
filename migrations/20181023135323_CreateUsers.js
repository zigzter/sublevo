
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (t) => {
      t.increments('id');
      t.string('email');
      t.string('username');
      t.string('name');
      t.boolean('isAdmin').defaultTo(false);
      t.string('passwordDigest');
      t.timestamp('createdAt').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
