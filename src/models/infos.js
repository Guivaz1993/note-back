const knex = require("../server/connection")

const listAreas = async () => {
  const list = await knex("areas").returning("*");
  return list
}

const listTopics = async () => {
  const list = await knex("topics").returning("*");
  return list
}

const listUserTopics = async (id) => {
  //falta as contagens
  const list = await knex("user_topics")
    .select("user_topics.id as id", "areas.area", "topics.topic")
    .where({ user_id: id })
    .join("areas", "areas.id", "=", "user_topics.area_id")
    .join("topics", "topics.id", "=", "user_topics.topic_id")
    .returning("*");
  return list
}

module.exports = {
  listAreas,
  listTopics,
  listUserTopics
}