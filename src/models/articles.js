const knex = require("../server/connection")

const listArticlesStudy = async (usertopics_id) => {
  const list = await knex("articles")
    .where({ usertopics_id })
    .returning("*")

  return list
}

const getArticleLink = async (link, usertopics_id, user_id) => {
  const article = await knex("articles")
    .where({ link, user_id, usertopics_id })
    .first()

  return article
}

const createArticle = async (article, description, link, done, topic_id, usertopics_id, user_id) => {
  article = article.trim();
  description = description.trim()

  const newArticle = await knex("articles")
    .insert({ article, description, link, done, topic_id, usertopics_id, user_id })
    .returning("*")
  console.log(newArticle)
  return newArticle
}

const getArticleById = async (id) => {
  const article = await knex("articles")
    .where({ id })
    .first()

  return article
}

const updateArticle = async (id, article, description, link, done) => {
  const date = new Date()

  const iten = knex("articles")
    .update({ article, description, link, done, created_at: date })
    .where({ id })
    .returning("*")
  return iten
}

module.exports = {
  listArticlesStudy,
  getArticleLink,
  createArticle,
  getArticleById,
  updateArticle
}