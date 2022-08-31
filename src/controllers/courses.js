const modelCourses = require("../models/courses")
const { newCourseSchema } = require("../validations/courses")

const listCourseStudy = async (req, res) => {
  const { usertopics_id } = req.params

  try {
    const list = await modelCourses.listCoursesStudy(usertopics_id)
    if (list.length === 0) {
      return res.status(400).json({ message: "Nenhum curso encontrado." })
    }

    return res.status(200).json(list)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const createCourse = async (req, res) => {
  const { id } = req.user
  const { course, description, link, done, topic_id, usertopics_id } = req.body

  try {
    await newCourseSchema.validate(req.body)

    const courseExists = await modelCourses.getCourse(course, link, usertopics_id, id)

    if (courseExists) {
      return res.status(400).json({ message: "Esse curso já está cadastrado." })
    }

    const newCourse = await modelCourses.createCourse(course, description, link, done, topic_id, usertopics_id, id)
    if (newCourse.length === 0) {
      return res.status(400).json({ message: "Não foi possível adicionar o vídeo." })
    }

    return res.status(200).json({ message: "Curso adicionado com sucesso." })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

module.exports = {
  listCourseStudy,
  createCourse
}