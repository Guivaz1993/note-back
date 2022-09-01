const knex = require("../server/connection")

const listArticlesStudy = async (usertopics_id) => {
  const list = await knex("articles")
    .where({ usertopics_id })
    .returning("*")

  return list
}

const articleExists = async (article, link, usertopics_id, user_id, id) => {
  article = article.trim()
  if (!id) {
    const iten = await knex("articles")
      .where({ link, user_id, usertopics_id })
      .orWhere({ article, user_id, usertopics_id })
      .first()

    return iten
  }
  if (link) {
    const iten = await knex("articles")
      .orWhere({ link, user_id, usertopics_id })
      .whereNot({ id })
      .first()

    return iten
  }
  if (article) {
    const iten = await knex("articles")
      .where({ article, user_id, usertopics_id })
      .whereNot({ id })
      .first()

    return iten
  }
}

const createArticle = async (article, description, link, done, topic_id, usertopics_id, user_id) => {
  article = article.trim();
  description = description.trim()

  const newArticle = await knex("articles")
    .insert({ article, description, link, done, topic_id, usertopics_id, user_id })
    .returning("*")
  return newArticle
}

const getArticleById = async (id) => {
  const article = await knex("articles")
    .where({ id })
    .first()

  return article
}

const updateArticle = async (id, article, description, link, done) => {
  if (article.trim()) {
    article = article.trim()
  } else {
    article = undefined
  }
  description ? description = description.trim() : "";
  const date = new Date()

  const iten = knex("articles")
    .update({ article, description, link, done, created_at: date })
    .where({ id })
    .returning("*")
  return iten
}

module.exports = {
  listArticlesStudy,
  articleExists,
  createArticle,
  getArticleById,
  updateArticle
}