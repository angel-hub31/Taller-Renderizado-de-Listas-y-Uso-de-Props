import React, { useState } from 'react';
import { data } from './data/videojuegos';
import { TablaVideojuegos } from './components/TablaVideojuegos';

function App() {
  const [videojuegos, setVideojuegos] = useState(data);
return (
    <div style={{
      backgroundColor: '#a7b1de',
      minHeight: '100vh',
      padding: '40px 20px',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{
        textAlign: 'center',
        color: '#f8fafc', 
        fontSize: '2.5rem',
        fontWeight: '800',
        letterSpacing: '1px',
        marginBottom: '30px',
        textShadow: '0 0 15px rgba(99, 102, 241, 0.3)'
      }}>
        🕹️ Tienda de Videojuegos 
      </h1>

      <TablaVideojuegos listaVideojuegos={videojuegos} />
    </div>
  );
}

export default App;