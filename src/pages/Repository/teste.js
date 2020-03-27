import React, { useState } from 'react';

// import { Container } from './styles';

export default function Teste() {
  const [values, setValues] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = event => {
    const auxValues = { ...values };
    auxValues[event.target.name] = event.target.value;
    setValues(auxValues);
  };

  const handleSubmit = callback => event => {
    event.preventDefault();
    setLoading(true);
    callback();
    setLoading(false);
  };

  return (
    <div>
      <h1>Contato</h1>
      <form>
        <input type="text" name="name" placeholder="Digite o seu nome" />
        <input type="email" name="email" placeholder="Digite o seu e-mail" />
        <input type="text" name="message" placeholder="Mensagem" />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
