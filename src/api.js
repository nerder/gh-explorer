import axios from 'axios';

const baseURL = 'https://api.github.com';

export const getRepos = (query) => {
  return axios.get(`${baseURL}/search/repositories`, {
    params: {
      q: query
    }
  })
  .then(res => res.data.items
    .map(({ id, name, description, html_url, owner: { login } }) => ({ id, name, description, html_url, login })
   )
  );
};

export const getSingleRepo = (owner, repo) => {
  return axios.get(`${baseURL}/repos/${owner}/${repo}`)
    .then(({
      data: {
        id,
        language,
        name,
        description,
        stargazers_count,
        html_url,
        owner: {
          login,
          avatar_url
        }
      }
    }) => ({
      id,
      language,
      name,
      description,
      stargazers_count,
      html_url,
      login,
      avatar_url
    })
  );
};
