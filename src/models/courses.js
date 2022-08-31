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

const getCourse = async (course, link, usertopics_id, user_id) => {
  const iten = await knex("courses")
    .where({ user_id, usertopics_id })
    .andWhere({ course })
    .orWhere({ link })
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

module.exports = {
  listCoursesStudy,
  getCourse,
  createCourse
}