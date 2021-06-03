
exports.up = function(knex) {
  return knex.schema.createTable("users", function(table){
    table.increments("id").primary();
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updateAt").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
