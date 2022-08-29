const modelInfos = require("../models/infos");
const { newTopicSchema, newStudySchema, newArticleSchema, newVideoSchema } = require("../validations/infos");

const listAreas = async (req, res) => {
  try {
    const list = await modelInfos.listAreas()
    if (list.length === 0) {
      return res.status(400).json({ message: "Nenhuma área foi encontrada." })
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
  const { topic } = req.body

  try {
    await newTopicSchema.validate(req.body)

    const topicExists = await modelInfos.getTopic(topic)

    if (topicExists.length > 0) {
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

const createStudy = async (req, res) => {
  const { id } = req.user
  const { area_id, topic_id } = req.body

  try {
    await newStudySchema.validate(req.body)

    const areaExists = await modelInfos.getAreaById(area_id)

    if (areaExists.length === 0) {
      return res.status(400).json({ message: "Área não encontrada" })
    }

    const topicExists = await modelInfos.getTopicById(topic_id)

    if (topicExists.length === 0) {
      return res.status(400).json({ message: "Tópico não encontrado" })
    }

    const studyExists = await modelInfos.getStudy(area_id, topic_id, id)

    if (studyExists) {
      return res.status(400).json({ message: "Plano de estudo já cadastrado" })
    }

    const newStudy = await modelInfos.createStudy(area_id, topic_id, id)

    if (newStudy.length === 0) {
      return res.status(400).json({ message: "Não foi possível criar o seu novo plano de estudo" })
    }

    return res.status(201).json({ message: "Plano de estudo criado com sucesso" })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const listArticlesStudy = async (req, res) => {
  const { usertopics_id } = req.params

  try {
    const list = await modelInfos.listArticlesStudy(usertopics_id)
    if (list.length === 0) {
      return res.status(400).json({ message: "Nenhum texto encontrado." })
    }

    return res.status(200).json(list)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const createArticle = async (req, res) => {
  const { id } = req.user
  const { article, description, link, done, topic_id, usertopics_id } = req.body

  try {
    await newArticleSchema.validate(req.body)

    const articleExists = await modelInfos.getArticleLink(link, usertopics_id, id)

    if (articleExists) {
      return res.status(400).json({ message: "Esse texto já está cadastrado." })
    }

    const newArticle = await modelInfos.createArticle(article, description, link, done, topic_id, usertopics_id, id)
    if (newArticle.length === 0) {
      return res.status(400).json({ message: "Não foi possível adicionar o texto." })
    }

    return res.status(200).json({ message: "Texto adicionado com sucesso." })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const listVideosStudy = async (req, res) => {
  const { usertopics_id } = req.params

  try {
    const list = await modelInfos.listVideosStudy(usertopics_id)
    if (list.length === 0) {
      return res.status(400).json({ message: "Nenhum vídeo encontrado." })
    }

    return res.status(200).json(list)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const createVideo = async (req, res) => {
  const { id } = req.user
  const { video, description, link, done, topic_id, usertopics_id } = req.body

  try {
    await newVideoSchema.validate(req.body)

    const videoExists = await modelInfos.getVideoLink(link, usertopics_id, id)

    if (videoExists) {
      return res.status(400).json({ message: "Esse vídeo já está cadastrado." })
    }

    const newVideo = await modelInfos.createVideo(video, description, link, done, topic_id, usertopics_id, id)
    if (newVideo.length === 0) {
      return res.status(400).json({ message: "Não foi possível adicionar o vídeo." })
    }

    return res.status(200).json({ message: "Vídeo adicionado com sucesso." })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

module.exports = {
  listAreas,
  listTopics,
  createTopic,
  listUserTopics,
  createStudy,
  listArticlesStudy,
  createArticle,
  listVideosStudy,
  createVideo
}