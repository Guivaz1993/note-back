const yup = require("./config");

const createLessonSchema = yup.object().shape({
  lesson: yup.string().trim().required(),
  done: yup.boolean(),
  course_id: yup.number().required()
});

const updateLessonSchema = yup.object().shape({
  lesson: yup.string().trim(),
  done: yup.boolean()
})

module.exports = {
  createLessonSchema,
  updateLessonSchema
}