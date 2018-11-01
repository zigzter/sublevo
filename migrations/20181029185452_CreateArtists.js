
exports.up = function(knex) {
  return knex.schema.createTable('artists', t => {
    t.increments('id');
    t.string('name');
    t.string('spotifyId');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('artists');
};
