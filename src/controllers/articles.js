const modelArticles = require("../models/articles")

const listArticlesStudy = async (req, res) => {
  const { usertopics_id } = req.params

  try {
    const list = await modelArticles.listArticlesStudy(usertopics_id)
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

    const articleExists = await modelArticles.getArticleLink(link, usertopics_id, id)

    if (articleExists) {
      return res.status(400).json({ message: "Esse texto já está cadastrado." })
    }

    const newArticle = await modelArticles.createArticle(article, description, link, done, topic_id, usertopics_id, id)
    if (newArticle.length === 0) {
      return res.status(400).json({ message: "Não foi possível adicionar o texto." })
    }

    return res.status(200).json({ message: "Texto adicionado com sucesso." })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

module.exports = {
  createArticle,
  listArticlesStudy
}