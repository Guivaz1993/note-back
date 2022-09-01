const modelVideos = require("../models/videos")
const { newVideoSchema, updateVideoSchema } = require("../validations/videos")

const listVideosStudy = async (req, res) => {
  const { usertopics_id } = req.params

  try {
    const list = await modelVideos.listVideosStudy(usertopics_id)
    if (list.length === 0) {
      return res.status(400).json({ message: "Nenhum vídeo encontrado." })
    }

    return res.status(200).json(list)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const createVideo = async (req, res) => {
  const { id: user_id } = req.user
  const { video, description, link, done, topic_id, usertopics_id } = req.body

  try {
    await newVideoSchema.validate(req.body)

    const videoExists = await modelVideos.videoExists(video, link, usertopics_id, user_id)

    if (videoExists) {
      return res.status(400).json({ message: "Esse vídeo já está cadastrado." })
    }

    const newVideo = await modelVideos.createVideo(video, description, link, done, topic_id, usertopics_id, user_id)
    if (newVideo.length === 0) {
      return res.status(400).json({ message: "Não foi possível adicionar o vídeo." })
    }

    return res.status(201).json({ message: "Vídeo adicionado com sucesso." })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const getVideo = async (req, res) => {
  const { id } = req.params

  try {
    const video = await modelVideos.getVideoById(id)

    if (!video) {
      return res.status(400).json({ message: "Desculpa não foi possível encontrar o texto" })
    }

    return res.status(200).json(video)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const updateVideo = async (req, res) => {
  const { id: user_id } = req.user
  const { video, description, link, done, usertopics_id } = req.body
  const { id } = req.params

  if (((!video || video && !video.trim()) &&
    (!description || description && !description.trim()) &&
    !link && done === undefined) || !usertopics_id) {
    return res.status(400).json({ message: "Desculpe, é necessário passar alguma informação válida para ser alterado" })
  }

  try {
    await updateVideoSchema.validate(req.body)

    if (video && video.trim()) {
      const videoExists = await modelVideos.videoExists(video, "", usertopics_id, user_id, id)

      if (videoExists) {
        return res.status(400).json({ message: "Esse vídeo já está cadastrado." })
      }
    }

    if (link) {
      const videoExists = await modelVideos.videoExists("", link, usertopics_id, user_id, id)

      if (videoExists) {
        return res.status(400).json({ message: "Esse vídeo já está cadastrado." })
      }
    }

    const updateVideo = await modelVideos.updateVideo(id, video, description, link, done)

    if (updateVideo.length === 0) {
      return res.status(400).json({ message: "Desculpe não conseguimos atualizar esse vídeo, tente novamente mais tarde." })
    }

    return res.status(200).json({ message: "Seu vídeo foi atualizado com sucesso" })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

module.exports = {
  createVideo,
  listVideosStudy,
  getVideo,
  updateVideo
}