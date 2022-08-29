const yup = require("./config")

const newTopicSchema = yup.object().shape({
  topic: yup.string().required()
})

const newStudySchema = yup.object().shape({
  area_id: yup.number().required(),
  topic_id: yup.number().required()
})

const newArticleSchema = yup.object().shape({
  article: yup.string().trim().required(),
  description: yup.string().trim().required(),
  link: yup.string().url("Esse link está correto? tente novamente por favor").required(),
  topic_id: yup.number().required(),
  usertopics_id: yup.number().required()
})

const newVideoSchema = yup.object().shape({
  video: yup.string().trim().required(),
  description: yup.string().trim().required(),
  link: yup.string().url("Esse link está correto? tente novamente por favor").required(),
  topic_id: yup.number().required(),
  usertopics_id: yup.number().required()
})

module.exports = {
  newTopicSchema,
  newStudySchema,
  newArticleSchema,
  newVideoSchema
}