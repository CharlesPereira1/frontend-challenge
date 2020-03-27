import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import PullRequest from '~/pages/PullRequest';
import Repository from '~/pages/Repository';
import Teste from '~/pages/Repository/teste';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Repository} />
        <Route path="/teste" exact component={Teste} />
        <Route path="/pullrequests/:request/pulls" component={PullRequest} />
      </Switch>
    </BrowserRouter>
  );
}
