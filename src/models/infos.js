const knex = require("../server/connection")

const createStudy = async (study, user_id) => {
  const iten = await knex("studies").insert({ study, user_id }).returning("*")
  return iten
}

const listStudies = async () => {
  const list = await knex("studies").returning("*");
  return list
}

const getStudy = async (study) => {
  const iten = await knex("studies").where({ study }).first()
  return iten
}

const getStudyById = async (id) => {
  const iten = await knex("studies").where({ id }).first()
  return iten
}

const listTopics = async () => {
  const list = await knex("topics").returning("*");
  return list
}

const getTopic = async (topic) => {
  const iten = await knex("topics").where({ topic }).first()
  return iten
}

const getTopicById = async (id) => {
  const iten = await knex("topics").where({ id }).first()
  return iten
}

const createTopic = async (topic, user_id) => {
  const newTopic = await knex("topics").insert({ topic, user_id }).returning("*")
  return newTopic
}

const listUserTopics = async (id) => {
  const list = await knex("user_topics")
    .select("user_topics.id as id", "studies.study", "topics.topic",
      knex.raw("(SELECT COUNT(*) FROM articles  WHERE articles.usertopics_id = user_topics.id) AS textos"),
      knex.raw("(SELECT COUNT(*) FROM articles WHERE articles.done=true AND articles.usertopics_id = user_topics.id) AS textos_finalizados"),
      knex.raw("(SELECT COUNT(*) FROM videos  WHERE videos.usertopics_id = user_topics.id) AS videos"),
      knex.raw(" (SELECT COUNT(*) FROM videos WHERE videos.done=true AND videos.usertopics_id = user_topics.id) AS videos_finalizadas"),
      knex.raw("(SELECT COUNT(*) FROM courses  WHERE courses.usertopics_id = user_topics.id) AS cursos"),
      knex.raw("(SELECT COUNT(*) FROM courses  WHERE courses.done=true AND courses.usertopics_id = user_topics.id) AS cursos_finalizados")
    )
    .join("studies", "studies.id", "user_topics.study_id")
    .join("topics", "topics.id", "user_topics.topic_id")
    .where({ "user_topics.user_id": id })
    .returning("*");
  return list
}

const getStudyTopic = async (study_id, topic_id, user_id) => {
  const study = await knex("user_topics")
    .where({ study_id, topic_id, user_id })
    .first()
  return study
}

const createStudyTopic = async (study_id, topic_id, user_id) => {
  const study = await knex("user_topics")
    .insert({ study_id, topic_id, user_id })
    .returning("*")
  return study
}

module.exports = {
  createStudy,
  listStudies,
  getStudyById,
  getStudy,
  listTopics,
  getTopic,
  getTopicById,
  createTopic,
  listUserTopics,
  getStudyTopic,
  createStudyTopic
}