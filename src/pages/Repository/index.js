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
  repoNextPage,
} from '~/store1/modules/repository/actions';

// import api from '~/services/api';
import { colors } from '~/styles/colors';

import { Form, SubmitButton, List } from './styles';

export default function Repository() {
  const scrollObserver = useRef();
  const dispatch = useDispatch();
  const repositories = useSelector(state => state.repository.repos.items);
  const loading = useSelector(state => state.repository.loading);
  const filters = useSelector(state => state.repository.nameSearch);
  const pages = useSelector(state => state.repository);
  const [page, setPage] = useState(1);

  const [newRepo, setNewRepo] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [scrollradio, setScrollRadio] = useState(null);

  const [pageActual, setPageActual] = useState(pages.page); // page atual
  const [totalPage, setTotalPage] = useState(
    repositories && pages.repos.total_count
  ); // total page
  const [postPage, setPostPage] = useState(pages.perPage); // total por page

  console.log(pageActual);
  console.log(page);
  console.log(totalPage);
  console.log(postPage);
  console.log(newFilter);

  useEffect(() => {
    dispatch(
      repoRequestSearch({
        search: newRepo || filters,
        page,
        filter: newFilter,
      })
    );
  }, [newFilter]); // eslint-disable-line

  function handleSearchMain(value, page, filter) {
    setNewRepo(value);

    dispatch(
      repoRequestSearch({
        search: value || filters,
        page,
        filter: newFilter,
      })
    );
  }

  /**
   * Scroll infinito
   */
  const intersectionObserver = new IntersectionObserver(entries => {
    const radio = entries[0].intersectionRatio;
    setScrollRadio(radio);
  });

  useEffect(() => {
    intersectionObserver.observe(scrollObserver.current);
    return () => {
      intersectionObserver.disconnect();
    };
  }, []);

  // Assim que mudar o valor de 0 p/ 1 na variavel scroolradio o useeffect irá executar
  useEffect(() => {
    console.log('Executando o efeito scrollRadio');
    if (scrollradio > 0) {
      dispatch(
        repoRequestSearch({
          search: newRepo || filters,
          page: page + 1,
          filter: newFilter,
        })
      );
    }
  }, [scrollradio]); // eslint-disable-line
  console.log(page);

  function hadleFilter(e) {
    setNewFilter(e.target.value);
  }

  useEffect(() => {
    dispatch(
      repoRequestSearch({
        search: newRepo || filters,
        page: pageActual,
        filter: newFilter,
      })
    );
  }, [pageActual]);
  /**
   * Scroll infinito
   */
  // const repositories = () => {

  // }

  //   setPageActual(pageActual);
  // }
  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

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

        <select value={newFilter} onChange={hadleFilter}>
          <option selected value="stars">
            stars
          </option>
          <option value="forks">forks</option>
          <option value="issues">issues</option>
          <option value="updates">updates</option>
        </select>
      </Form>

      <h2>{filters}</h2>
      {scrollradio}
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
      {scrollradio}
      <div ref={scrollObserver} />
    </Container>
  );
}
