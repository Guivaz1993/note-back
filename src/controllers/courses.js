const modelCourses = require("../models/courses")
const { newCourseSchema, updateCourseSchema } = require("../validations/courses")

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
  const { id: user_id } = req.user
  const { course, description, link, done, topic_id, usertopics_id } = req.body

  try {
    await newCourseSchema.validate(req.body)

    const courseExists = await modelCourses.courseExists(course, link, usertopics_id, user_id)

    if (courseExists) {
      return res.status(400).json({ message: "Esse curso já está cadastrado." })
    }

    const newCourse = await modelCourses.createCourse(course, description, link, done, topic_id, usertopics_id, user_id)
    if (newCourse.length === 0) {
      return res.status(400).json({ message: "Não foi possível adicionar o vídeo." })
    }

    return res.status(201).json({ message: "Curso adicionado com sucesso." })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const getCourse = async (req, res) => {
  const { id } = req.params
  try {
    const course = await modelCourses.getCourse(id)

    if (!course) {
      return res.status(400).json({ message: "Desculpa não foi possível encontrar seu curso" })
    }

    return res.status(200).json(course)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const updateCourse = async (req, res) => {
  const { id: user_id } = req.user
  const { course, description, link, done, usertopics_id } = req.body
  const { id } = req.params

  if (((!course || course && !course.trim()) &&
    (!description || description && !description.trim()) &&
    !link && done === undefined) || !usertopics_id) {
    return res.status(400).json({ message: "Desculpe, é necessário passar alguma informação válida para ser alterada" })
  }

  try {
    await updateCourseSchema.validate(req.body)

    if (course) {
      const courseExists = await modelCourses.courseExists(course, "", usertopics_id, user_id, id)

      if (courseExists) {
        return res.status(400).json({ message: "Já existe um curso cadastrado com esse nome." })
      }
    }
    if (link) {
      const courseExists = await modelCourses.courseExists("", link, usertopics_id, user_id, id)

      if (courseExists) {
        return res.status(400).json({ message: "Já existe um curso cadastrado com esse link." })
      }
    }
    const updateCourse = await modelCourses.updateCourse(id, course, description, link, done)

    if (updateCourse.length === 0) {
      return res.status(400).json({ message: "Desculpe não conseguimos atualizar seu curso tente novamente mais tarde." })
    }

    return res.status(200).json({ message: "Seu curso foi atualizado com sucesso" })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const lastLessonCourse = async (req, res) => {
  const { id } = req.user
  try {
    const course = await modelCourses.lastCourse(id)

    if (!course) {
      return res.status(400).json({ message: "Desculpa não foi possível encontrar seu curso" })
    }

    return res.status(200).json(course)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

module.exports = {
  listCourseStudy,
  createCourse,
  getCourse,
  updateCourse,
  lastLessonCourse
}