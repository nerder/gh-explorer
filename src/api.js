import axios from 'axios';

const baseURL = 'https://api.github.com';

export const getRepos = (query) => {
  return axios.get(`${baseURL}/search/repositories`, {
    params: {
      q: query
    }
  })
  .then(res => res.data.items
    .map(({ id, name, description, html_url, owner }) => ({ id, name, description, html_url, owner })
   )
  );
};

export const getSingleRepo = (owner, repo) => {
  return axios.get(`${baseURL}/repos/${owner}/${repo}`);
};
