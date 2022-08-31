const modelVideos = require("../models/videos")

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
  const { id } = req.user
  const { video, description, link, done, topic_id, usertopics_id } = req.body

  try {
    await newVideoSchema.validate(req.body)

    const videoExists = await modelVideos.getVideoLink(link, usertopics_id, id)

    if (videoExists) {
      return res.status(400).json({ message: "Esse vídeo já está cadastrado." })
    }

    const newVideo = await modelVideos.createVideo(video, description, link, done, topic_id, usertopics_id, id)
    if (newVideo.length === 0) {
      return res.status(400).json({ message: "Não foi possível adicionar o vídeo." })
    }

    return res.status(200).json({ message: "Vídeo adicionado com sucesso." })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}


module.exports = {
  createVideo,
  listVideosStudy
}