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
    .select("user_topics.id as id",
      knex.raw("(SELECT area FROM areas WHERE areas.id=user_topics.area_id)"),
      knex.raw("(SELECT topic FROM topics WHERE topics.id=user_topics.topic_id)"),
      knex.raw("(SELECT COUNT(*) FROM articles WHERE articles.done=true AND articles.usertopics_id = user_topics.id) AS textos_finalizados"),
      knex.raw(" (SELECT COUNT(*) FROM videos WHERE videos.done=true AND videos.usertopics_id = user_topics.id) AS videos_finalizadas"),
      knex.raw("(SELECT COUNT(*) FROM courses  WHERE courses.done=true AND courses.usertopics_id = user_topics.id) AS cursos_finalizados")
    )
    .count("articles.id", { as: "Textos" })
    .count("videos.id", { as: "Vídeos" })
    .count("courses.id", { as: "Cursos" })
    .where({ "user_topics.user_id": id })
    .leftJoin("courses", "courses.usertopics_id", "=", "user_topics.id")
    .leftJoin("videos", "videos.usertopics_id", "=", "user_topics.id")
    .leftJoin("articles", "articles.usertopics_id", "=", "user_topics.id")
    .groupBy("user_topics.id")
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