
exports.up = function(knex) {
  return knex.schema.createTable('seenlive', t => {
    t.increments('id');
    t.integer('userId').unsigned().references('users.id');
    t.integer('artistId').unsigned().references('artists.id');
    t.unique(['userId', 'artistId']);
    t.integer('seenCount').defaultTo(1);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('seenlive');
};
