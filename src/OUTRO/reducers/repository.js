import { Reducer } from 'redux';
import { RepositoriosActions, RepositoriosActionsTypes } from '../actions/RepositoriosActions';
import { Repositorio } from '../models/Repositorio';

export interface Repositorios {
  readonly repositorios: Repositorio[];
  readonly qtdResultados: number;
  readonly paginaAtual: number;
  readonly haMaisPaginas: boolean;
  readonly resultadosPorPagina: number;
}

const estadoInicialRepositorios: Repositorios = {
  repositorios: [],
  qtdResultados: 0,
  paginaAtual: 0,
  haMaisPaginas: false,
  resultadosPorPagina: 30,
};

export const repositoriosReducer: Reducer<Repositorios, RepositoriosActions> = (
  state = estadoInicialRepositorios,
  action
) => {
  switch (action.type) {
    case RepositoriosActionsTypes.BUSCAREPOSITORIOS: {
      let paginasTotais = action.qtdResultados / state.resultadosPorPagina;
      return {
        ...state,
        repositorios: action.repositorios,
        qtdResultados: action.qtdResultados,
        paginaAtual: 1,
        haMaisPaginas: (paginasTotais > 1 ) ? true : false,
      };
    }
    case RepositoriosActionsTypes.PROXIMAPAGINA: {
      const repositorios = state.repositorios.concat(action.repositorios);
      let paginasTotais = state.qtdResultados / state.resultadosPorPagina;
      let novaPaginaAtual = state.paginaAtual + 1;
      return {
        ...state,
        repositorios,
        paginaAtual: novaPaginaAtual,
        haMaisPaginas: (paginasTotais > novaPaginaAtual ) ? true : false,
      };
    }
    case RepositoriosActionsTypes.PREPARAPARACARREGAR: {
      return {
        ...estadoInicialRepositorios,
        haMaisPaginas: true,
      };
    }
    default:
      return state;
  }
};
