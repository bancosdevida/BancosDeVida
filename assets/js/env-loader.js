/**
 * Carregador de variáveis de ambiente para o cliente
 * Este script carrega variáveis do arquivo .env para o objeto window.ENV
 */

// Inicializa o objeto window.ENV
window.ENV = window.ENV || {};

// Função para carregar variáveis de ambiente do arquivo .env
async function loadEnvVariables() {
  try {
    // Tenta buscar o arquivo .env
    const response = await fetch('/.env');
    
    if (response.ok) {
      const text = await response.text();
      
      // Processa cada linha do arquivo .env
      text.split('\n').forEach(line => {
        // Ignora linhas vazias ou comentários
        if (!line || line.startsWith('#')) return;
        
        // Extrai a chave e o valor (formato KEY=VALUE)
        const parts = line.split('=');
        if (parts.length >= 2) {
          const key = parts[0].trim();
          const value = parts.slice(1).join('=').trim();
          
          // Adiciona ao objeto window.ENV
          window.ENV[key] = value;
        }
      });
      
      console.log('Variáveis de ambiente carregadas com sucesso');
    } else {
      console.warn('Arquivo .env não encontrado ou não acessível');
    }
  } catch (error) {
    console.error('Erro ao carregar variáveis de ambiente:', error);
  }
}

// Carrega as variáveis imediatamente
loadEnvVariables(); 