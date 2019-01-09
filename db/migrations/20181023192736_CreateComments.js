
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('users', (t) => {
      t.unique('username');
      t.unique('email');
    }),
    knex.schema.createTable('comments', (t) => {
      t.increments('id');
      t.string('author').unsigned().references('users.username');
      t.string('profile').unsigned().references('users.username');
      t.text('content');
      t.timestamp('createdAt').defaultTo(knex.fn.now());
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('users', (t) => {
      t.dropUnique('username');
      t.dropUnique('email');
    }),
    knex.schema.dropTable('comments'),
  ]);
};
