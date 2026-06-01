import React from 'react';

function HistoricoConversoes({ historico }) {
  return (
    <div style={{ marginTop: '20px', textAlign: 'center' }}>
      <h2>Histórico de Conversões</h2>
      {historico.length === 0 ? (
        <p>Nenhuma conversão registrada até o momento.</p>
      ) : (
        <table
          style={{
            width: '100%',
            maxWidth: '600px',
            margin: '0 auto',
            borderCollapse: 'collapse',
            border: '1px solid #ccc',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#f9f9f9', textAlign: 'left' }}>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Tipo de Resíduo</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Quantidade (kg)</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Energia (kWh)</th>
            </tr>
          </thead>
          <tbody>
            {historico.map((item, index) => (
              <tr key={index} style={{ textAlign: 'center' }}>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.tipoResiduo}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.kg}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.energia}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default HistoricoConversoes;
