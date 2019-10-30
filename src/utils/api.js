import axios from "axios";

export const getArticles = (sort_by, order, topic, author) => {
  return axios
    .get("https://ruths-nc-news.herokuapp.com/api/articles", {
      params: { sort_by, order, topic, author }
    })
    .then(response => {
      return response.data.articles;
    });
};

export const getTopics = () => {
  return axios
    .get("https://ruths-nc-news.herokuapp.com/api/topics")
    .then(response => {
      return response.data.topics;
    });
};

export const getArticleById = article_id => {
  return axios
    .get(`https://ruths-nc-news.herokuapp.com/api/articles/${article_id}`)
    .then(response => {
      return response.data.article;
    });
};

export const getCommentsByArticleId = article_id => {
  return axios
    .get(
      `https://ruths-nc-news.herokuapp.com/api/articles/${article_id}/comments`
    )
    .then(response => {
      return response.data.comments;
    });
};

export const getUsers = () => {
  return axios
    .get("https://ruths-nc-news.herokuapp.com/api/users")
    .then(response => {
      return response.data.users;
    });
};
