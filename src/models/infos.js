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

module.exports = {
  listAreas,
  listTopics,
  listUserTopics
}