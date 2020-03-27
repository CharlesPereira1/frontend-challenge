import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com/',
});

export default api;

// import { Filtro } from '../views/TelaBuscaRepositorios/TelaBuscaRepositorios';

// export default function Api() {
//   const url = 'https://api.github.com/';

//   function buscaRepositorios(search, filter, numberpage) {
//     let urlEspecifica = 'search/repositories?q=';

//     // seta filtro de texto
//     if (search !== '') {
//       urlEspecifica = urlEspecifica.concat(search);
//       urlEspecifica = urlEspecifica.concat('+');
//     }
//     // seta linguagem javascript
//     urlEspecifica = urlEspecifica.concat('language:Javascript');
//     // seta tipo de ordenacao
//     if (filter.nome !== '') {
//       urlEspecifica = urlEspecifica.concat('&sort=');
//       urlEspecifica = urlEspecifica.concat(
//         Api.deParaFiltros(filter.nome)
//       );
//       if (filter.ascendente) {
//         urlEspecifica = urlEspecifica.concat('&order=asc');
//       }
//     }
//     // seta a pagina
//     urlEspecifica = urlEspecifica.concat('&page=');
//     urlEspecifica = urlEspecifica.concat(`${numberpage}`);

//     return fetch(Api.url + urlEspecifica)
//       .then(Api.lidaComErros)
//       .then(response => response.json())
//       .catch(error => console.log(error));
//   }

// function buscaRepositorio(repositorio, donoRepositorio) {
//   let urlEspecifica = 'repos/';
//   urlEspecifica = urlEspecifica.concat(`${donoRepositorio}/`);
//   urlEspecifica = urlEspecifica.concat(repositorio);
//   return fetch(Api.url + urlEspecifica)
//     .then(Api.lidaComErros)
//     .then(response => response.json())
//     .catch(error => console.log(error));
// }

// function buscaPullRequests(repositorio, donoRepositorio) {
//   let urlEspecifica = 'repos/';

//   urlEspecifica = urlEspecifica.concat(`${donoRepositorio}/`);
//   urlEspecifica = urlEspecifica.concat(`${repositorio}/`);
//   urlEspecifica = urlEspecifica.concat('pulls');

//   return fetch(Api.url + urlEspecifica)
//     .then(Api.lidaComErros)
//     .then(response => response.json())
//     .catch(error => console.log(error));
// }

// function lidaComErros(response) {
//   if (!response.ok) {
//     throw Error(response.statusText);
//   }
//   return response;
// }

// function deParaFiltros(nomeFiltro) {
//   switch (nomeFiltro) {
//     case 'issues':
//       return 'help-wanted-issues';
//     case 'updates':
//       return 'updated';
//     default:
//       return nomeFiltro;
//   }
