const knex = require("../server/connection")

const listCoursesStudy = async (usertopics_id) => {
  const list = await knex("courses")
    .select("courses.id", "courses.course", "courses.description", knex.raw("(SELECT COUNT(lessons_course.id) FROM lessons_course     WHERE lessons_course.course_id=courses.id     AND lessons_course.done=TRUE) AS lessons_done"))
    .count("lessons_course.id", { as: "Lessons" })
    .leftJoin("lessons_course", "lessons_course.course_id", "courses.id")
    .where({ usertopics_id })
    .groupBy("courses.id")
    .returning("*")

  return list
}

const courseExists = async (course, link, usertopics_id, user_id, id) => {
  course = course.trim()
  if (!id) {
    const iten = await knex("courses")
      .where({ course, user_id, usertopics_id })
      .orWhere({ link, user_id, usertopics_id })
      .first()

    return iten
  }
  if (link) {
    const iten = await knex("courses")
      .where({ link, user_id, usertopics_id })
      .whereNot({ id })
      .first()

    return iten
  }
  if (course) {
    const iten = await knex("courses")
      .where({ course, user_id, usertopics_id })
      .whereNot({ id })
      .first()

    return iten
  }
}

const getCourse = async (id) => {
  const iten = await knex("courses")
    .where({ id })
    .first()

  return iten
}

const createCourse = async (course, description, link, done, topic_id, usertopics_id, user_id) => {
  course = course.trim();
  description = description.trim()

  const newCourse = await knex("courses")
    .insert({ course, description, link, done, topic_id, usertopics_id, user_id })
    .returning("*")
  return newCourse
}

const updateCouse = async (id, course, description, link, done) => {
  if (course && course.trim()) {
    course = course.trim()
  } else {
    course = undefined
  }
  description ? description = description.trim() : "";
  const date = new Date()

  const iten = knex("courses")
    .update({ course, description, link, done, last_change: date })
    .where({ id })
    .returning("*")
  return iten
}

module.exports = {
  listCoursesStudy,
  courseExists,
  getCourse,
  createCourse,
  updateCouse
}