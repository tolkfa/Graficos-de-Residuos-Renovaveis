import React from 'react';
import { useParams, Link } from 'react-router-dom';

function Teste3() {
  const { name, age } = useParams();

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Página Teste3</h1>
      <p>Parâmetro Name recebido: {name}</p>
      <p>Parâmetro Age recebido: {age}</p>
      <Link to="/">Voltar para Home</Link>
    </div>
  );
}

export default Teste3;
