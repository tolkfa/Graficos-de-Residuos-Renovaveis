import { useState } from 'react';
import novaGreen from '../assets/green__1_-removebg-preview.png';

function CriarConta() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && senha) {
      // Recuperar as contas existentes no Local Storage
      const contas = JSON.parse(localStorage.getItem('usuarios')) || [];

      // Verificar se o e-mail já está cadastrado
      const contaExistente = contas.find((conta) => conta.email === email);
      if (contaExistente) {
        setMensagem('Este e-mail já está cadastrado.');
        return;
      }

      // Adicionar nova conta à lista
      contas.push({ email, senha });

      // Salvar a lista de contas no Local Storage
      localStorage.setItem('usuarios', JSON.stringify(contas));

      setMensagem('Conta criada com sucesso!');
      setEmail('');
      setSenha('');
    } else {
      setMensagem('Por favor, preencha todos os campos.');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* Imagem na esquerda */}
      <div style={{ flex: 1, backgroundColor: '#101922', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src={novaGreen}
          alt="Imagem ilustrativa"
          style={{ maxWidth: '100%', maxHeight: '100%' }}
        />
      </div>

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
        <h1 style={{ marginBottom: '20px' }}>Criar Conta</h1>
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
            Criar Conta
          </button>
        </form>

        {mensagem && (
          <p style={{ marginTop: '15px', color: mensagem.includes('sucesso') ? 'green' : 'red' }}>{mensagem}</p>
        )}

        <p style={{ marginTop: '15px' }}>
          Já tem uma conta? <a href="/">Entrar</a>
        </p>
      </div>
    </div>
  );
}

export default CriarConta;
