import axios from 'axios';

// URL base do MockAPI
const BASE_URL = 'https://673d190a4db5a341d834040a.mockapi.io/api/v1/Cidades';

/**
 * Função para obter todos os registros do MockAPI.
 * @returns {Promise} - Dados retornados da API.
 */
export const getAllCidades = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data; // Retorna os dados da API
  } catch (error) {
    console.error('Erro ao buscar todas as cidades:', error);
    throw error;
  }
};

/**
 * Função para obter os dados de uma cidade específica pelo ID.
 * @param {string} id - ID do registro no MockAPI.
 * @returns {Promise} - Dados retornados da API para o ID especificado.
 */
export const getCidadeById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data; // Retorna os dados da API
  } catch (error) {
    console.error(`Erro ao buscar a cidade com ID ${id}:`, error);
    throw error;
  }
};

/**
 * Função para criar um novo registro no MockAPI.
 * @param {Object} data - Dados a serem enviados para a API.
 * @returns {Promise} - Dados do novo registro criado.
 */
export const createCidade = async (data) => {
  try {
    const response = await axios.post(BASE_URL, data);
    return response.data; // Retorna os dados do registro criado
  } catch (error) {
    console.error('Erro ao criar uma nova cidade:', error);
    throw error;
  }
};

/**
 * Função para atualizar um registro existente no MockAPI.
 * @param {string} id - ID do registro a ser atualizado.
 * @param {Object} data - Dados atualizados a serem enviados para a API.
 * @returns {Promise} - Dados do registro atualizado.
 */
export const updateCidade = async (id, data) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, data);
    return response.data; // Retorna os dados do registro atualizado
  } catch (error) {
    console.error(`Erro ao atualizar a cidade com ID ${id}:`, error);
    throw error;
  }
};

/**
 * Função para excluir um registro do MockAPI.
 * @param {string} id - ID do registro a ser excluído.
 * @returns {Promise} - Dados do registro excluído.
 */
export const deleteCidade = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data; // Retorna os dados do registro excluído
  } catch (error) {
    console.error(`Erro ao excluir a cidade com ID ${id}:`, error);
    throw error;
  }
};
