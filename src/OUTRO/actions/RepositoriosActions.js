import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { Filtro } from '../views/TelaBuscaRepositorios/TelaBuscaRepositorios';
import { Repositorio } from '../models/Repositorio';
import ApiCalls from '../services/ApiCalls';
import { Repositorios } from '../reducers/repositoriosReducer';

// Cria as constantes dos tipos de ação
export enum RepositoriosActionsTypes {
  BUSCAREPOSITORIOS = 'BUSCAREPOSITORIOS',
  PROXIMAPAGINA = 'PROXIMAPAGINA',
  PREPARAPARACARREGAR = 'PREPARAPARACARREGAR',
}

// Cria interface que define parametros de cada ação
export interface BuscaRepositoriosAction {
  type: RepositoriosActionsTypes.BUSCAREPOSITORIOS;
  repositorios: Repositorio[];
  qtdResultados: number;
}
export interface ProximaPaginaAction {
  type: RepositoriosActionsTypes.PROXIMAPAGINA;
  repositorios: Repositorio[];
}
export interface PreparaParaCarregarAction {
  type: RepositoriosActionsTypes.PREPARAPARACARREGAR;
}

// Combina as ações do tipo consulta
export type RepositoriosActions = 
  BuscaRepositoriosAction |
  ProximaPaginaAction |
  PreparaParaCarregarAction ;


/* As ações devem seguir a tipagem:
<Promise<Tipo do retorno>, 
Tipo do reducer no qual ela está operando, 
Tipo do parametro que recebe,
Tipo da ação> */
export const buscaRepositorios: 
  ActionCreator<
    ThunkAction<Promise<any>, 
    Repositorios, 
    string, 
    BuscaRepositoriosAction
  >
> = (nomeBuscado: string, filtro: Filtro) => {
  return async (dispatch: Dispatch) => {
    const resultado = await ApiCalls.buscaRepositorios(nomeBuscado,filtro,1);
    return dispatch({
      qtdResultados: resultado.total_count,
      repositorios: resultado.items,
      type: RepositoriosActionsTypes.BUSCAREPOSITORIOS,
    });
  };
};

export const proximaPagina: 
  ActionCreator<
    ThunkAction<Promise<any>, 
    Repositorios, 
    string, 
    BuscaRepositoriosAction
  >
> = (nomeBuscado: string, filtro: Filtro, paginaAtual: number) => {
  return async (dispatch: Dispatch) => {
    const resultado = await ApiCalls.buscaRepositorios(nomeBuscado,filtro,paginaAtual+1);
    return dispatch({
      repositorios: resultado.items,
      type: RepositoriosActionsTypes.PROXIMAPAGINA,
    });
  };
};

export const preparaParaCarregar: 
  ActionCreator<
    ThunkAction<Promise<any>, 
    Repositorios, 
    string, 
    BuscaRepositoriosAction
  >
> = () => {
  return async (dispatch: Dispatch) => {
    return dispatch({
      type: RepositoriosActionsTypes.PREPARAPARACARREGAR,
    });
  };
};