
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('comments', t => {
      t.dropColumn('author');
      t.dropColumn('profile');
      t.integer('authorId').unsigned().references('users.id');
      t.integer('profileId').unsigned().references('users.id');
  })
};

exports.down = function(knex, Promise) {

};
