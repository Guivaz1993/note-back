const yup = require("./config")

const newTopicSchema = yup.object().shape({
  topic: yup.string().required()
})

const newStudySchema = yup.object().shape({
  area_id: yup.number().required(),
  topic_id: yup.number().required()
})



module.exports = {
  newTopicSchema,
  newStudySchema
}