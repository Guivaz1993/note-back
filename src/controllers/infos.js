const modelInfos = require("../models/infos");

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
    const list = await modelInfos.listTopic()
    if (list.length === 0) {
      return res.status(400).json({ message: "Nenhum tópico encontrado." })
    }

    return res.status(200).json(list)
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

module.exports = {
  listAreas,
  listTopics,
  listUserTopics
}