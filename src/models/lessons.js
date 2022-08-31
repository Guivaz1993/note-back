const knex = require("../server/connection")

const createLesson = async (lesson, done, course_id, user_id) => {
  const iten = await knex("lessons_course")
    .insert({ lesson, done, course_id, user_id })
    .returning("*")
  return iten
}

const updateLesson = async (id, lesson, done) => {
  const updated_at = new Date()
  const iten = await knex("lessons_course")
    .update({ lesson, done, updated_at })
    .where({ id })
    .returning("*")
  return iten
}

const getLesson = async (id) => {
  const iten = await knex("lessons_course")
    .where({ id })
    .first()
  return iten
}

module.exports = {
  createLesson,
  updateLesson,
  getLesson
}