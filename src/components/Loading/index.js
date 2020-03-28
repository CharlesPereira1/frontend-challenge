import React from 'react';

import loading from '~/assets/loading.gif';

import { Container } from './styles';

export default function Loading() {
  return (
    <Container>
      <img src={loading} alt="" />
    </Container>
  );
}
