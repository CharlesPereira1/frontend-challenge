import React, { useState, useEffect } from 'react';
import { FaGithubAlt, FaSpinner, FaSearch } from 'react-icons/fa';
import { FiGitPullRequest } from 'react-icons/fi';
import { GoRepoForked, GoStar } from 'react-icons/go';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Container from '~/components/Container';
import api from '~/service/api';
import { colors } from '~/styles/colors';

import { Form, SubmitButton, List } from './styles';

export default function Repository() {
  const [repositories, setRepositories] = useState([]);
  const [newRepo, setNewRepo] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  async function handleSearch() {
    setNewRepo(newRepo);

    const res = await api.get(`search/repositories`, {
      params: {
        q: newRepo,
        sort: 'stars',
        page,

        per_page: 10,
      },
    });
    setLoading(true);
    setRepositories(res.data.items);
    // setPage(page + 1);
    setLoading(false);

    setNewRepo('');
  }

  useEffect(() => {
    handleSearch();
  }, []); //eslint-disable-line

  const dispatch = useDispatch();
  function handleAddRequest(repo) {
    dispatch({
      type: 'ADD_REQUEST',
      repo,
    });
  }

  return (
    <Container>
      <h1>
        <FaGithubAlt />
        Repositórios
      </h1>

      <Form>
        <input
          type="text"
          placeholder="Pesquisar repositório"
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
        />
        <SubmitButton onClick={handleSearch} loading={loading}>
          {loading ? <FaSpinner size={15} /> : <FaSearch size={15} />}
        </SubmitButton>
      </Form>
      <List>
        {repositories.map(repo => (
          <li key={repo.id}>
            <img src={repo.owner.avatar_url} alt={repo.owner.login} />
            <strong>{repo.name}</strong>
            <span>{repo.description}</span>
            <div>
              <p>
                <GoStar size={14} color={colors.primary} />
                {repo.stargazers_count}
              </p>
              <p>
                <GoRepoForked size={14} color={colors.primary} />
                {repo.forks_count}
              </p>
              <Link
                to={`/pullrequests/${encodeURIComponent(repo.full_name)}/pulls`}
                onClick={() => handleAddRequest(repo)}
              >
                <FiGitPullRequest size={14} color={colors.primary} />
                Pull Request
              </Link>
            </div>
          </li>
        ))}
      </List>
    </Container>
  );
}

// export default connect()(Repository);
