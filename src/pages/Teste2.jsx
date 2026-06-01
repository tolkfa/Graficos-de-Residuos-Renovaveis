import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { getAllCidades } from '../services/apiService';
import Profile from '../assets/perosn.png';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrar componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Teste2() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);

  // Novos estados para tipo de resíduo, kg, e energia
  const [tipoResiduo, setTipoResiduo] = useState('');
  const [kg, setKg] = useState('');
  const [energia, setEnergia] = useState(0); // Energia gerada em kWh
  const [dadosArmazenados, setDadosArmazenados] = useState([]);

  // Supomos que o userID é obtido após o login
  const userID = localStorage.getItem('userID'); // Pegando o ID do usuário do localStorage

  // Hook do React Router para navegação
  const navigate = useNavigate(); // Hook para navegação

  // Taxas de conversão para energia por kg de resíduo
  const taxasConversao = {
    'Resíduo de Alimento': 0.5,  // 0.5 kWh por kg
    'Resíduo de Madeira': 0.8,   // 0.8 kWh por kg
    'Resíduos Agrícolas': 0.6,  // 0.6 kWh por kg
    'Estrume Animal': 0.4,      // 0.4 kWh por kg
  };

  // Função para calcular a energia gerada com base no tipo de resíduo
  useEffect(() => {
    if (tipoResiduo && kg) {
      const energiaGerada = (taxasConversao[tipoResiduo] || 0) * kg;
      setEnergia(energiaGerada.toFixed(2)); // Calcula e arredonda para 2 casas decimais
    }
  }, [tipoResiduo, kg]);

  // Função para submeter dados
  const handleSubmit = () => {
    if (!tipoResiduo || !kg) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    const novoDado = { tipoResiduo, kg, energia };

    // Atualizar localStorage com o ID do usuário
    const dados = JSON.parse(localStorage.getItem('dados_' + userID)) || [];
    dados.push(novoDado);
    localStorage.setItem('dados_' + userID, JSON.stringify(dados));

    // Atualizar o estado
    setDadosArmazenados(dados);

    // Resetar os campos
    setTipoResiduo('');
    setKg('');
    setEnergia(0);
  };

  // Carregar os dados históricos do usuário ao iniciar o componente
  useEffect(() => {
    if (userID) {
      const dados = JSON.parse(localStorage.getItem('dados_' + userID)) || [];
      setDadosArmazenados(dados);
    }
  }, [userID]);

  // Função para limpar os dados do localStorage
  const handleClear = () => {
    localStorage.removeItem('dados_' + userID);
    setDadosArmazenados([]); // Limpar o estado também
  };

  // Função para buscar dados do MockAPI
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCidades(); // Obtém todas as cidades
        setDados(response); // Salva os dados no estado
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Carregando dados...</p>;
  }

  // Dados do gráfico 1
  const data1 = {
    labels: dados.map((item) => item.cidade),
    datasets: [
      {
        label: 'Cidade (Mil toneladas)',
        data: dados.map((item) => item.kg),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Opções dos gráficos
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Gráfico de resíduo renovável',
      },
    },
  };

  // Função para lidar com o logout
  const handleSignOut = () => {
    // Remover o usuário do localStorage ou de qualquer sistema de autenticação
    localStorage.removeItem('userID'); // Exemplo de remoção do userID do localStorage

    // Redirecionar para a tela de login (ou página inicial)
    navigate('/'); // Redireciona para a rota raiz (página inicial)
  };

  return (
    <div style={{ position: 'relative', height: '100vh', padding: '20px' }}>
      {/* Cabeçalho com ícone de usuário */}
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <div
          style={{
            position: 'relative',
            cursor: 'pointer',
          }}
          onClick={() => setMenuAberto(!menuAberto)} // Alternar menu ao clicar
        >
          <img
            src={Profile}
            alt="Ícone de usuário"
            style={{ borderRadius: '50%', width: '40px', height: '40px', backgroundColor: '#3d3b3b' }}
          />
          {/* Menu de opções */}
          {menuAberto && (
            <div
              style={{
                position: 'absolute',
                top: '50px',
                right: '0',
                backgroundColor: 'white',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                padding: '10px',
                borderRadius: '4px',
                zIndex: 100,
              }}
            >
              <button
                onClick={handleSignOut} // Função de logout
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#007BFF',
                  cursor: 'pointer',
                  fontSize: '16px',
                  padding: '5px',
                }}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Conteúdo principal */}
      <div style={{ textAlign: 'center', marginTop: '80px' }}>
        <h1>Gráficos de Dados</h1>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '40px' }}>
          {/* Primeiro gráfico */}
          <div style={{ width: '45%' }}>
            <Bar data={data1} options={options} />
          </div>
        </div>

        {/* Campos de entrada de dados */}
        <div
          style={{
            marginTop: '40px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <h2>Insira Novos Dados:</h2>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
              gap: '20px',
            }}
          >
            {/* Select para tipo de resíduo */}
            <div>
              <label htmlFor="tipoResiduo">
                <strong>Tipo de Resíduo:</strong>
              </label>
              <select
                id="tipoResiduo"
                value={tipoResiduo}
                onChange={(e) => setTipoResiduo(e.target.value)}
                style={{
                  marginLeft: '10px',
                  padding: '5px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              >
                <option value="">Selecione um tipo</option>
                <option value="Resíduo de Alimento">Resíduo de Alimento</option>
                <option value="Resíduo de Madeira">Resíduo de Madeira</option>
                <option value="Resíduos Agrícolas">Resíduos Agrícolas</option>
                <option value="Estrume Animal">Estrume Animal</option>
              </select>
            </div>

            {/* Campo de entrada de Kg */}
            <div>
              <label htmlFor="kg">
                <strong>Quantidade de Resíduo (kg):</strong>
              </label>
              <input
                type="number"
                id="kg"
                value={kg}
                onChange={(e) => setKg(e.target.value)}
                style={{
                  marginLeft: '10px',
                  padding: '5px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
            </div>
          </div>

          {/* Exibição da energia gerada */}
          <div>
            <strong>Energia Gerada:</strong> {energia} kWh
          </div>

          {/* Botão de submeter */}
          <button
            onClick={handleSubmit}
            style={{
              backgroundColor: '#28a745',
              color: '#fff',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '20px',
            }}
          >
            Submeter
          </button>

          {/* Botão de limpar */}
          <button
            onClick={handleClear}
            style={{
              backgroundColor: '#dc3545',
              color: '#fff',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '10px',
            }}
          >
            Limpar Dados
          </button>

          {/* Exibição de dados armazenados */}
          <div style={{ marginTop: '40px' }}>
            <h3>Dados Armazenados:</h3>
            <ul>
              {dadosArmazenados.map((item, index) => (
                <li key={index}>
                  {item.tipoResiduo} - {item.kg} kg - {item.energia} kWh
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Teste2;
