import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import novaGreen from '../assets/green__1_-removebg-preview.png';

function Home() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [historico, setHistorico] = useState([]); // Estado para o histórico
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Recuperar os dados armazenados no Local Storage (todos os usuários)
    const usuariosArmazenados = JSON.parse(localStorage.getItem('usuarios')) || [];
  
    // Verificar se o email e senha correspondem a algum dos usuários cadastrados
    const usuarioValido = usuariosArmazenados.find(
      (usuario) => usuario.email === email && usuario.senha === senha
    );
  
    if (usuarioValido) {
      setMensagem('');
      
      // Limpar dados do e-mail anterior, se houver
      const currentUserEmail = localStorage.getItem('userID');  // Pega o e-mail do usuário anterior
      if (currentUserEmail && currentUserEmail !== email) {
        localStorage.removeItem('dados_' + currentUserEmail);  // Limpa os dados armazenados do usuário anterior
      }
  
      // Armazenar o novo e-mail no localStorage
      localStorage.setItem('userID', email);
  
      // Recuperar o histórico de dados do usuário atual
      const dadosHistorico = JSON.parse(localStorage.getItem('dados_' + email)) || [];
      setHistorico(dadosHistorico); // Armazenar no estado o histórico do usuário
  
      // Redirecionar para a página de teste2 e passar o histórico via state
      navigate('/teste2', { state: { historico: dadosHistorico } });
    } else {
      setMensagem('Gmail ou senha incorretos.');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* Imagem na esquerda */}
      <div style={{ flex: 1, backgroundColor: '#101922', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={novaGreen} alt="Imagem ilustrativa" style={{ maxWidth: '100%', maxHeight: '100%' }} />
      </div>

      {/* Login na direita */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          padding: '20px',
          boxShadow: '-2px 0 5px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h1 style={{ marginBottom: '20px' }}>Entrar</h1>
        <form style={{ width: '100%', maxWidth: '300px' }} onSubmit={handleSubmit}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />

          <label style={{ display: 'block', marginBottom: '5px' }}>Senha:</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />

          <button
            type="submit"
            style={{
              width: '107%',
              padding: '10px',
              backgroundColor: '#007BFF',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Entrar
          </button>
        </form>

        {/* Mensagem de erro */}
        {mensagem && (
          <p style={{ marginTop: '15px', color: 'red' }}>{mensagem}</p>
        )}

        <p style={{ marginTop: '15px' }}>
          Não tem uma conta? <a href="/criarconta">Crie uma</a>
        </p>
      </div>
    </div>
  );
}

export default Home;
