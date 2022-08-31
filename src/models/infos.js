const knex = require("../server/connection")

const listAreas = async () => {
  const list = await knex("areas").returning("*");
  return list
}

const getAreaById = async (id) => {
  const iten = await knex("areas").where({ id }).returning("*")
  return iten
}

const listTopics = async () => {
  const list = await knex("topics").returning("*");
  return list
}

const getTopic = async (topic) => {
  const iten = await knex("topics").where({ topic }).returning("*")
  return iten
}

const getTopicById = async (id) => {
  const iten = await knex("topics").where({ id }).returning("*")
  return iten
}

const createTopic = async (topic) => {
  const newTopic = await knex("topics").insert({ topic }).returning("*")
  return newTopic
}

const listUserTopics = async (id) => {
  const list = await knex("user_topics")
    .select("user_topics.id as id", "areas.area", "topics.topic",
      knex.raw("(SELECT COUNT(*) FROM articles  WHERE articles.usertopics_id = user_topics.id) AS textos"),
      knex.raw("(SELECT COUNT(*) FROM articles WHERE articles.done=true AND articles.usertopics_id = user_topics.id) AS textos_finalizados"),
      knex.raw("(SELECT COUNT(*) FROM videos  WHERE videos.usertopics_id = user_topics.id) AS videos"),
      knex.raw(" (SELECT COUNT(*) FROM videos WHERE videos.done=true AND videos.usertopics_id = user_topics.id) AS videos_finalizadas"),
      knex.raw("(SELECT COUNT(*) FROM courses  WHERE courses.usertopics_id = user_topics.id) AS cursos"),
      knex.raw("(SELECT COUNT(*) FROM courses  WHERE courses.done=true AND courses.usertopics_id = user_topics.id) AS cursos_finalizados")
    )
    .join("areas", "areas.id", "user_topics.area_id")
    .join("topics", "topics.id", "user_topics.topic_id")
    .where({ "user_topics.user_id": id })
    .returning("*");
  return list
}

const getStudy = async (area_id, topic_id, user_id) => {
  const study = await knex("user_topics")
    .where({ area_id, topic_id, user_id })
    .first()
  return study
}

const createStudy = async (area_id, topic_id, user_id) => {
  const study = await knex("user_topics")
    .insert({ area_id, topic_id, user_id })
    .returning("*")
  return study
}

module.exports = {
  listAreas,
  getAreaById,
  listTopics,
  getTopic,
  getTopicById,
  createTopic,
  listUserTopics,
  getStudy,
  createStudy
}