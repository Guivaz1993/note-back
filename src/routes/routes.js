const express = require("express");
const {
  listTopics,
  listUserTopics,
  createTopic,
  createStudyTopic,
  listStudies,
  createStudy,
} = require("../controllers/infos");
const {
  listArticlesStudy,
  createArticle,
  getArticle,
  updateArticle,
} = require("../controllers/articles");
const {
  createVideo,
  listVideosStudy,
  getVideo,
  updateVideo,
} = require("../controllers/videos");
const {
  createCourse,
  listCourseStudy,
  getCourse,
  updateCourse,
  lastLessonCourse,
} = require("../controllers/courses");
const { signIn, signUp, userData } = require("../controllers/users");
const userTokenVerify = require("../middlewares/userTokenVerfify");
const {
  getLesson,
  createLesson,
  updateLesson,
  listLessons,
} = require("../controllers/lessons");

const route = express();

route.get("/", (_, response) => {
  return response.status(200).json({ message: `hi ` });
});

route.post("/signup", signUp);
route.post("/signin", signIn);

route.get("/userData", userTokenVerify, userData);

route.post("/studies", userTokenVerify, createStudy);
route.get("/studies", userTokenVerify, listStudies);
route.post("/topics", userTokenVerify, createTopic);
route.get("/topics", userTokenVerify, listTopics);
route.get("/usertopics", userTokenVerify, listUserTopics);
route.post("/usertopics", userTokenVerify, createStudyTopic);

route.get("/articles/:usertopics_id", userTokenVerify, listArticlesStudy);
route.get("/article/detail/:id", userTokenVerify, getArticle);
route.post("/article", userTokenVerify, createArticle);
route.patch("/article/:id", userTokenVerify, updateArticle);

route.get("/videos/:usertopics_id", userTokenVerify, listVideosStudy);
route.get("/video/detail/:id", userTokenVerify, getVideo);
route.post("/videos", userTokenVerify, createVideo);
route.patch("/videos/:id", userTokenVerify, updateVideo);

route.get("/courses/:usertopics_id", userTokenVerify, listCourseStudy);
route.get("/course/:id", userTokenVerify, getCourse);
route.post("/course", userTokenVerify, createCourse);
route.patch("/course/:id", userTokenVerify, updateCourse);
route.get("/lastcourse", userTokenVerify, lastLessonCourse);

route.get("/lessons/:course_id", userTokenVerify, listLessons);
route.get("/lesson/:id", userTokenVerify, getLesson);
route.post("/lessons", userTokenVerify, createLesson);
route.patch("/lessons/:id", userTokenVerify, updateLesson);

module.exports = route;
