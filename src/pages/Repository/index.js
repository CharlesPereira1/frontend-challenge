import React, { useState, useEffect } from 'react';
import { FaGithubAlt, FaSpinner, FaSearch } from 'react-icons/fa';
import { FiGitPullRequest } from 'react-icons/fi';
import { GoRepoForked, GoStar } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { debounce } from 'lodash';

import Container from '~/components/Container';
import InputSearch from '~/components/InputSearch';
import Loading from '~/components/Loading';
import { repoRequestSearch } from '~/store1/modules/repository/actions';

// import api from '~/services/api';
import { colors } from '~/styles/colors';

import { Form, SubmitButton, List } from './styles';

export default function Repository() {
  // const [repositories, setRepositories] = useState([]);
  const [newRepo, setNewRepo] = useState('');

  const dispatch = useDispatch();
  const repository = useSelector(state => state.repository.repos);
  const loading = useSelector(state => state.repository.loading);

  const [stars, setStars] = useState(0);
  const [forks, setForks] = useState(0);
  const [issues, setIssues] = useState(0);

  // console.log(newRepo);
  // console.log(loading);
  // console.log(repository);
  // console.log(loading);

  useEffect(() => {
    dispatch(repoRequestSearch({ search: newRepo, page: 1, filter: 'star' }));
  }, [])// eslint-disable-line

  function handleSearchMain(value, page = 1, filter = 'star') {
    setNewRepo(value);
    dispatch(repoRequestSearch({ search: value, page, filter }));

    // console.log(newRepo);
    // setNewRepo('');
  }
  // recupera value e trata com delay de 400milessimos
  // const searchInput = debounce(value => handleSearchMain(value), 400);

  // function handleChange(e) {
  //   searchInput(e.target.value);
  // }
  return (
    <Container>
      <InputSearch
        // onChange={handleChange}
        // value={searchInput}
        handleSearch={handleSearchMain}
        placeholder="Buscar aluno"
      />
      {loading ? (
        <Loading />
      ) : (
          <List>
            {repository.repository.items.map(repo => (
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
                    to={`/pullrequests/${encodeURIComponent(
                      repo.full_name
                    )}/pulls`}
                  // onClick={() => handleAddRequest(repo)}
                  >
                    <FiGitPullRequest size={14} color={colors.primary} />
                  Pull Request
                </Link>
                </div>
              </li>
            ))}
          </List>
        )}
    </Container>
  );
}

// const [loading, setLoading] = useState(false);
// const [page, setPage] = useState(1);

// function handleInput(e) {
//   setNewRepo(e.target.value);
//   if (e.key === 'Enter' || e.key === 13) {
//     console.log(`enter press here! ${newRepo}`);
//   }
//   console.log(newRepo);
// }

// // let cancel;
// async function handleSearch() {
//   // handleInput();

//   const res = await api.get(`search/repositories`, {
//     params: {
//       q: newRepo,
//       sort: 'stars',
//       page,
//       per_page: 10,
//     },
//     // cancelToken: new res.cancelToken(c => (cancel = c)),
//   });
//   setLoading(true);
//   setRepositories(res.data.items);
//   // setPage(page + 1);
//   setLoading(false);
//   // console.log(newRepo);

//   setNewRepo('');
// }

// useEffect(() => {
//   handleSearch();
// }, []); //eslint-disable-line

// const dispatch = useDispatch();
// function handleAddRequest(repo) {
//   dispatch({
//     type: 'ADD_REQUEST',
//     repo,
//   });
// }

// return (
//   <Container>
//     <h1>
//       <FaGithubAlt />
//       Repositórios
//     </h1>

// {
/* <Form>

    <input
      type="text"
      placeholder="Pesquisar repositório"
      value={newRepo}
      onSubmit={evento => evento.target.value}
    />
    <SubmitButton onClick={handleSearch}> loading={loading}>
      {loading ? <FaSpinner size={15} /> : <FaSearch size={15} />}
    </SubmitButton>
  </Form> */
// }
// {
/* <List>
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
          // onClick={() => handleAddRequest(repo)}
          >
            <FiGitPullRequest size={14} color={colors.primary} />
            Pull Request
          </Link>
        </div>
      </li>
    ))}
  </List> */
// }
//   </Container >
// );
// }

// export default connect()(Repository);
