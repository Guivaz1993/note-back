const knex = require("../server/connection")

const listVideosStudy = async (usertopics_id) => {
  const list = await knex("videos")
    .where({ usertopics_id })
    .returning("*")

  return list
}

const videoExists = async (video, link, usertopics_id, user_id, id) => {
  if (!id) {
    const iten = await knex("videos")
      .where({ link, user_id, usertopics_id })
      .orWhere({ video, user_id, usertopics_id })
      .first()

    return iten
  }

  if (link) {
    const iten = await knex("videos")
      .where({ link, user_id, usertopics_id })
      .whereNot({ id })
      .first()

    return iten
  }

  if (video) {
    const iten = await knex("videos")
      .where({ video, user_id, usertopics_id })
      .whereNot({ id })
      .first()

    return iten
  }
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
  if (video && video.trim()) {
    video = video.trim()
  } else {
    video = undefined
  }
  if (description && description.trim()) {
    description = description.trim()
  } else {
    description = undefined
  }
  const date = new Date()

  const iten = await knex("videos")
    .update({ video, description, link, done, last_change: date })
    .where({ id })
    .returning("*")
  return iten
}

module.exports = {
  listVideosStudy,
  videoExists,
  createVideo,
  getVideoById,
  updateVideo
}