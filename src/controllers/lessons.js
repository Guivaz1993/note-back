const modelLesson = require("../models/lessons")
const schemaLesson = require("../validations/lessons")

const listLessons = async (req, res) => {
  const { course_id } = req.params;

  try {
    const list = await modelLesson.listLesson(course_id)

    if (!list) {
      return res.status(400).json({ message: "Desculpe, não encontramos aulas cadastradas nesse curso." })
    }

    return res.status(200).json(list)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const createLesson = async (req, res) => {
  const { id } = req.user
  const { lesson, done, course_id } = req.body

  try {
    await schemaLesson.createLessonSchema.validate(req.body)

    const lessonExists = await modelLesson.nameLessonExist(lesson, course_id)

    if (lessonExists) {
      return res.status(400).json({ message: "Acreditamos que essa aula já está cadastrada." })
    }

    const newLesson = await modelLesson.createLesson(lesson, done, course_id, id)

    if (newLesson.length === 0) {
      return res.status(400).json({ message: "Desculpe não conseguimos salvar essa aula, tente novamente mais tarde." })
    }

    return res.status(201).json({ message: "Sua aula foi cadastrada com sucesso" })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const updateLesson = async (req, res) => {
  const { lesson, done, course_id } = req.body
  const { id } = req.params

  try {
    await schemaLesson.updateLessonSchema.validate(req.body)

    if (lesson.trim()) {
      const lessonExists = await modelLesson.nameLessonExist(lesson, course_id, id)

      if (lessonExists) {
        return res.status(400).json({ message: "Acreditamos que essa aula já está cadastrada." })
      }
    }

    const updateLesson = await modelLesson.updateLesson(id, lesson, done)

    if (updateLesson.length === 0) {
      return res.status(400).json({ message: "Desculpe não conseguimos atualizar essa aula, tente novamente mais tarde." })
    }

    return res.status(201).json({ message: "Sua aula foi atualizada com sucesso" })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const getLesson = async (req, res) => {
  const { id } = req.params

  try {
    const lesson = await modelLesson.getLesson(id)

    if (!lesson) {
      return res.status(400).json({ message: "Desculpe essa aula não foi encontrada." })
    }

    return res.status(200).json(lesson)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

module.exports = {
  listLessons,
  createLesson,
  updateLesson,
  getLesson
}