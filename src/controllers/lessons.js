const modelLesson = require("../models/lessons")

const createLesson = async (req, res) => {
  const { id } = req.user
  const { lesson, done, course_id } = req.body

  try {
    //validação

    //verificação


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
  const { lesson, done } = req.body
  const { id } = req.params

  console.log(id)

  try {
    //validação

    //verificação

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
  createLesson,
  updateLesson,
  getLesson
}