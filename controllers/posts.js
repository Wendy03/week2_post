const successHandler = require('../service/successHandler');
const errorHandler = require('../service/errorHandler');

const Post = require('../models/post');

const posts = {
  async getPosts({ res, req }) {
    const posts = await Post.find();
    successHandler(res, posts);
  },
  async createPost({ body, res, req }) {
    try {
      const data = JSON.parse(body);
      const { name, content, image, createdAt } = data;
      const newPost = await Post.create({
        name,
        content,
        image,
        createdAt,
      });
      successHandler(res, newPost);
    } catch (err) {
      errorHandler(res, '資料錯誤');
    }
  },
  async delAllPosts({ res, req }) {
    const posts = await Post.deleteMany({});
    successHandler(res, posts);
  },
  async delPost({ res, req }) {
    const id = req.url.split('/').pop();
    const posts = await Post.findByIdAndDelete(id);
    successHandler(res, posts);
  },
  async editPost({ body, res, req }) {
    try {
      const data = JSON.parse(body);
      const id = req.url.split('/').pop();
      if (data !== undefined) {
        const { content, image, likes } = data;
        const posts = await Post.findByIdAndUpdate(id, {
          $set: {
            content,
            image,
            likes,
          },
        });
        successHandler(res, posts);
      } else {
        errorHandler(res, '資料錯誤');
      }
    } catch {
      errorHandler(res, '查無此id');
    }
  },
};

module.exports = posts;
