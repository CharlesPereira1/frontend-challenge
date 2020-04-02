import React, { useState, useEffect, useRef } from 'react';
import { FaGithubAlt } from 'react-icons/fa';
import { FiGitPullRequest } from 'react-icons/fi';
import { GoRepoForked, GoStar } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Container from '~/components/Container';
import InputSearch from '~/components/InputSearch';
import Loading from '~/components/Loading';
import {
  repoRequestSearch,
  repoRequestNextPage,
  repoSearchSuccess,
} from '~/store1/modules/repository/actions';

// import api from '~/services/api';
import { colors } from '~/styles/colors';

import { Form, SubmitButton, List } from './styles';

export default function Repository() {
  const scrollObserver = useRef();
  const dispatch = useDispatch();
  const repositories = useSelector(state => state.repository.repos.items);
  const loading = useSelector(state => state.repository.loading);
  const filters = useSelector(state => state.repository.search);
  const teste = useSelector(state => state.repository);
  console.log(teste);

  // const page = useSelector(state => state.repository.page);

  const [search, setSearch] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [scrollRadio, setScrollRadio] = useState(null);

  // recupera dados do input
  function handleSearchMain(value) {
    setSearch(value);
  }

  // quando o nome do input mudar dispara a ação dos parametros
  useEffect(() => {
    dispatch(
      repoRequestSearch({
        search: search || filters,
        page,
        filter: newFilter || 'forks1',
        perPage,
      })
    );
  }, [search]); // eslint-disable-line

  /**
   * Scroll infinito
   */
  // função utilizando o intersection para verificar se a pagina foi toda lida
  // inicia com valor zero se nao foi lida e no fim traz valor 1 para lida
  const intersectionObserver = new IntersectionObserver(entries => {
    const radio = entries[0].intersectionRatio;
    setScrollRadio(radio);
  });
  // faz um disconnect depois de lida para voltar ao estado de zero novamente
  useEffect(() => {
    intersectionObserver.observe(scrollObserver.current);
    return () => {
      intersectionObserver.disconnect();
    };
  }, []); // eslint-disable-line
  console.log(scrollRadio);

  useEffect(() => {
    if (scrollRadio > 0) {
      const newPage = page + 1;
      setPage(newPage);
      dispatch(
        repoRequestNextPage({
          search: search || filters,
          page,
          filter: newFilter || 'forks',
          perPage: 4,
        })
      );
      // dispatch(repoSearchSuccess(page));
    }
  }, [scrollRadio]);
  console.log(page);

  // Assim que mudar o valor de 0 p/ 1 na variavel scroolradio o useeffect irá executar
  // useEffect(() => {
  //   console.log('Executando o efeito scrollRadio');
  //   if (scrollradio > 0) {
  //     dispatch(
  //       repoRequestSearch({
  //         page: page + 1,
  //       })
  //     );
  //   }
  // }, [scrollradio]); // eslint-disable-line
  // console.log(page);

  // function hadleFilter(e) {
  //   setNewFilter(e.target.value);
  // }

  // useEffect(() => {
  //   dispatch(
  //     repoRequestSearch({
  //       filter: newFilter || 'forks',
  //     })
  //   );
  // }, [page]); // eslint-disable-line

  return (
    <Container>
      <h1>
        <FaGithubAlt />
        Buscar Repositório
      </h1>

      <Form>
        <InputSearch
          handleSearch={handleSearchMain}
          placeholder="Buscar aluno"
        />

        {/* <select value={newFilter} onChange={hadleFilter}>
          <option selected value="stars">
            stars
          </option>
          <option value="forks">forks</option>
          <option value="issues">issues</option>
          <option value="updates">updates</option>
        </select> */}
      </Form>

      <h2>{filters}</h2>
      {scrollRadio}
      {loading ? (
        <Loading />
      ) : (
        <List>
          {repositories &&
            repositories.map(repo => (
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
                  >
                    <FiGitPullRequest size={14} color={colors.primary} />
                    Pull Request
                  </Link>
                </div>
              </li>
            ))}
        </List>
      )}
      {scrollRadio}
      <div ref={scrollObserver} />
    </Container>
  );
}
