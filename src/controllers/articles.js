const modelArticles = require("../models/articles")
const { newArticleSchema, updateArticleSchema } = require("../validations/article")

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

    const articleExists = await modelArticles.articleExists(article, link, usertopics_id, id)

    if (articleExists) {
      return res.status(400).json({ message: "Esse texto já está cadastrado." })
    }

    const newArticle = await modelArticles.createArticle(article, description, link, done, topic_id, usertopics_id, id)
    if (newArticle.length === 0) {
      return res.status(400).json({ message: "Não foi possível adicionar o texto." })
    }

    return res.status(201).json({ message: "Texto adicionado com sucesso." })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const getArticle = async (req, res) => {
  const { id } = req.params

  try {
    const article = await modelArticles.getArticleById(id)

    if (!article) {
      return res.status(400).json({ message: "Desculpa não foi possível encontrar o texto" })
    }

    return res.status(200).json(article)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const updateArticle = async (req, res) => {
  const { id: user_id } = req.user
  const { article, description, link, done, usertopics_id } = req.body
  const { id } = req.params

  try {
    await updateArticleSchema.validate(req.body)

    if (article) {
      const articleExists = await modelArticles.articleExists(article, "", usertopics_id, user_id, id)

      if (articleExists) {
        return res.status(400).json({ message: "Esse texto já está cadastrado." })
      }
    }
    if (link) {
      const articleExists = await modelArticles.articleExists("", link, usertopics_id, user_id, id)

      if (articleExists) {
        return res.status(400).json({ message: "Esse texto já está cadastrado." })
      }
    }

    const updateArticle = await modelArticles.updateArticle(id, article, description, link, done)

    if (updateArticle.length === 0) {
      return res.status(400).json({ message: "Desculpe não conseguimos atualizar esse texto, tente novamente mais tarde." })
    }

    return res.status(200).json({ message: "Seu texto foi atualizado com sucesso" })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

module.exports = {
  createArticle,
  listArticlesStudy,
  getArticle,
  updateArticle
}