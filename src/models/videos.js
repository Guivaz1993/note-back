const knex = require("../server/connection")

const listVideosStudy = async (usertopics_id) => {
  const list = await knex("videos")
    .where({ usertopics_id })
    .returning("*")

  return list
}

const getVideoLink = async (link, usertopics_id, user_id) => {
  const video = await knex("videos")
    .where({ link, user_id, usertopics_id })
    .first()

  return video
}

const createVideo = async (video, description, link, done, topic_id, usertopics_id, user_id) => {
  video = video.trim();
  description = description.trim()

  const newVideo = await knex("videos")
    .insert({ video, description, link, done, topic_id, usertopics_id, user_id })
    .returning("*")
  return newVideo
}

const getVideoById = async (id) => {
  const video = await knex("videos")
    .where({ id })
    .first()

  return video
}

const updateVideo = async (id, video, description, link, done) => {
  const created_at = new Date()
  const iten = await knex("lessons_course")
    .update({ video, description, link, done, created_at })
    .where({ id })
    .returning("*")
  return iten
}

module.exports = {
  listVideosStudy,
  getVideoLink,
  createVideo,
  getVideoById,
  updateVideo
}