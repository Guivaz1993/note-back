const knex = require("../server/connection")

const listLesson = async (course_id) => {
  const list = await knex("lessons_course")
    .where({ course_id })
    .returning("*")
  return list
}

const createLesson = async (lesson, done, course_id, user_id) => {
  const iten = await knex("lessons_course")
    .insert({ lesson, done, course_id, user_id })
    .returning("*")
  return iten
}

const updateLesson = async (id, lesson, done) => {
  if (lesson && lesson.trim()) {
    lesson = lesson.trim()
  } else {
    lesson = undefined
  }
  const date = new Date()
  const iten = await knex("lessons_course")
    .update({ lesson, done, last_change: date })
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

const nameLessonExist = async (lesson, course_id, id) => {
  lesson = lesson.trim()
  if (id) {
    const iten = await knex("lessons_course")
      .where({ lesson, course_id })
      .whereNot({ id })
      .first()
    return iten
  } else {
    const iten = await knex("lessons_course")
      .where({ lesson, course_id })
      .first()
    return iten
  }
}

module.exports = {
  listLesson,
  createLesson,
  updateLesson,
  getLesson,
  nameLessonExist
}