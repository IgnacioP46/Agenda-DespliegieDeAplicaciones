import { useState, useEffect } from 'react';
import './App.css';
import eventosData from './data/eventos.json';

function App() {
  // --- ESTADOS ---
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favoritos, setFavoritos] = useState([]); 
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null); 

  // Filtros
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");

  // --- EFECTO: CARGA DE DATOS ---
  useEffect(() => {
    // Simulamos carga asíncrona
    const cargarDatos = () => {
      setLoading(true);
      setTimeout(() => {
        try {
          if (!eventosData || eventosData.length === 0) {
            setError("No hay eventos disponibles.");
          } else {
            setEventos(eventosData);
          }
        } catch (err) {
          setError("Error al cargar los eventos.");
        } finally {
          setLoading(false);
        }
      }, 1500); 
    };
    cargarDatos();
  }, []);

  // --- LÓGICA DE FILTRADO ---
  const eventosFiltrados = eventos.filter((evento) => {
    const texto = busqueda.toLowerCase();
    const coincideTexto = evento.titulo.toLowerCase().includes(texto) || 
                          evento.lugar.toLowerCase().includes(texto);
    const coincideCategoria = categoriaSeleccionada === "Todas" || evento.categoria === categoriaSeleccionada;
    
    return coincideTexto && coincideCategoria;
  });

  // --- MANEJADORES ---
  const toggleFavorito = (id) => {
    if (favoritos.includes(id)) {
      setFavoritos(favoritos.filter(favId => favId !== id));
    } else {
      setFavoritos([...favoritos, id]);
    }
  };

  const verDetalle = (evento) => setEventoSeleccionado(evento);
  const volver = () => setEventoSeleccionado(null);

  // --- RENDERIZADO ---
  if (loading) return <div className="loading">⏳ Cargando eventos...</div>;
  if (error) return <div className="error">❌ {error}</div>;

  return (
    <div className="app-container">
      <header className="header">
        <h1>📅 QuickPlan DAW</h1>
        <p>Agenda de Eventos del Centro</p>
      </header>

      <main>
        {eventoSeleccionado ? (
          // VISTA DETALLE
          <div className="detalle-container">
            <button className="btn-volver" onClick={volver}>← Volver</button>
            <div className="detalle-card">
              <span className={`tag ${eventoSeleccionado.categoria}`}>{eventoSeleccionado.categoria}</span>
              <h2>{eventoSeleccionado.titulo}</h2>
              <p className="fecha-lugar">📅 {eventoSeleccionado.fecha} | 📍 {eventoSeleccionado.lugar}</p>
              <p className="descripcion">{eventoSeleccionado.descripcion}</p>
              
              <button 
                className={`btn-fav ${favoritos.includes(eventoSeleccionado.id) ? 'activo' : ''}`}
                onClick={() => toggleFavorito(eventoSeleccionado.id)}
                disabled={favoritos.includes(eventoSeleccionado.id)}
              >
                {favoritos.includes(eventoSeleccionado.id) ? '♥ En Favoritos' : '♡ Añadir a Favoritos'}
              </button>
            </div>
          </div>
        ) : (
          // VISTA LISTA
          <>
            {/* FAVORITOS */}
            {favoritos.length > 0 && (
              <div className="favoritos-bar">
                <h3>⭐ Mis Favoritos ({favoritos.length})</h3>
                <div className="fav-list">
                  {eventos.filter(e => favoritos.includes(e.id)).map(fav => (
                    <div key={fav.id} className="fav-item">
                      <span>{fav.titulo}</span>
                      <button onClick={() => toggleFavorito(fav.id)}>✖</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FILTROS */}
            <div className="filtros">
              <input 
                type="text" 
                placeholder="🔍 Buscar por título o lugar..." 
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <select 
                value={categoriaSeleccionada} 
                onChange={(e) => setCategoriaSeleccionada(e.target.value)}
              >
                <option value="Todas">Todas las categorías</option>
                <option value="Charla">Charla</option>
                <option value="Taller">Taller</option>
                <option value="Torneo">Torneo</option>
                <option value="Excursión">Excursión</option>
              </select>
            </div>

            <p className="contador">Mostrando {eventosFiltrados.length} de {eventos.length} eventos</p>

            {/* TARJETAS */}
            <div className="grid-eventos">
              {eventosFiltrados.map((evento) => (
                <div key={evento.id} className="card">
                  <div className="card-header">
                    <span className={`tag ${evento.categoria}`}>{evento.categoria}</span>
                    {favoritos.includes(evento.id) && <span className="fav-icon">♥</span>}
                  </div>
                  <h3>{evento.titulo}</h3>
                  <p>📅 {evento.fecha}</p>
                  <p>📍 {evento.lugar}</p>
                  <button className="btn-detalle" onClick={() => verDetalle(evento)}>Ver detalle</button>
                </div>
              ))}
            </div>
            
            {eventosFiltrados.length === 0 && <p className="no-results">No se encontraron eventos.</p>}
          </>
        )}
      </main>
    </div>
  );
}

export default App;