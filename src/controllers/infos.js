const modelInfos = require("../models/infos");
const { newTopicSchema, newStudySchema, newStudyTopicSchema } = require("../validations/infos");

const createStudy = async (req, res) => {
  const { id } = req.user
  const { study } = req.body
  try {
    await newStudySchema.validate(req.body)

    const studyExists = await modelInfos.getStudy(study)

    if (studyExists) {
      return res.status(400).json({ message: "Acreditamos que esse plano de estudo já existe no nosso banco de dados" })
    }

    const newStudy = await modelInfos.createStudy(study, id)

    if (newStudy.length === 0) {
      return res.status(400).json({ message: "Desculpe não conseguimos cadastrar esse novo curso" })
    }

    return res.status(201).json({ message: "Novo plano de estudo cadastrado com sucesso" })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const listStudies = async (req, res) => {
  try {
    const list = await modelInfos.listStudies()
    if (list.length === 0) {
      return res.status(400).json({ message: "Nenhuma plano de estudo foi encontrada." })
    }
    return res.status(200).json(list)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const listTopics = async (req, res) => {
  try {
    const list = await modelInfos.listTopics()
    if (list.length === 0) {
      return res.status(400).json({ message: "Nenhum tópico encontrado." })
    }

    return res.status(200).json(list)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const createTopic = async (req, res) => {
  const { id } = req.user
  const { topic } = req.body

  try {
    await newTopicSchema.validate(req.body)

    const topicExists = await modelInfos.getTopic(topic, id)

    if (topicExists) {
      return res.status(400).json({ message: "Esse tópico já existe" })
    }

    const newTopic = await modelInfos.createTopic(topic)

    if (newTopic.length === 0) {
      return res.status(400).json({ message: "Não foi possível criar o novo tópico de estudo" })
    }

    return res.status(201).json({ message: "Tópico criado com sucesso" })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const listUserTopics = async (req, res) => {
  const { id } = req.user

  try {
    const list = await modelInfos.listUserTopics(id)
    if (list.length === 0) {
      return res.status(400).json({ message: "Nenhum tópico encontrado." })
    }

    return res.status(200).json(list)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const createStudyTopic = async (req, res) => {
  const { id } = req.user
  const { study_id, topic_id } = req.body

  try {
    await newStudyTopicSchema.validate(req.body)

    const studyExists = await modelInfos.getStudyById(study_id)

    if (!studyExists) {
      return res.status(400).json({ message: "Nenhum plano de estudo encontrado" })
    }

    const topicExists = await modelInfos.getTopicById(topic_id)

    if (!topicExists) {
      return res.status(400).json({ message: "Tópico não encontrado" })
    }

    const studyTopicExists = await modelInfos.getStudyTopic(study_id, topic_id, id)

    if (studyTopicExists) {
      return res.status(400).json({ message: "Plano de estudo já contem esse tópico" })
    }

    const newStudyTopic = await modelInfos.createStudyTopic(study_id, topic_id, id)

    if (newStudyTopic.length === 0) {
      return res.status(400).json({ message: "Não foi possível adicionar esse tópico ao seu plano de estudo" })
    }

    return res.status(201).json({ message: "Tópico adicionado ao plano de estudo com sucesso." })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

module.exports = {
  createStudy,
  listStudies,
  listTopics,
  createTopic,
  listUserTopics,
  createStudyTopic
}