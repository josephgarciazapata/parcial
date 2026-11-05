import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [departamentos, setDepartamentos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState(null)

  useEffect(() => {
    fetch('https://api-colombia.com/api/v1/Department')
      .then(respuesta => respuesta.json())
      .then(datos => {
        setDepartamentos(datos)
        setCargando(false)
      })
      .catch(error => {
        console.error(error)
        setCargando(false)
      })
  }, [])

  return (
    <div className="contenedor">
      <h1>Departamentos de Colombia</h1>
      
      {cargando ? (
        <p className="mensaje-carga">Cargando departamentos...</p>
      ) : (
        <div className="grid">
          {departamentos.map(depto => (
            <div key={depto.id} className="tarjeta-departamento">
              <h2>{depto.name}</h2>
              
              <div className="info-basica">
                <p><strong>Población:</strong> {new Intl.NumberFormat('es-CO').format(depto.population)}</p>
                <p><strong>Superficie:</strong> {new Intl.NumberFormat('es-CO').format(depto.surface)} km²</p>
                <span className="badge">Capital: {depto.cityCapital?.name}</span>
              </div>
              
              <button 
                className="btn-accion"
                onClick={() => setDepartamentoSeleccionado(depto)}
              >
                Ver detalles
              </button>
            </div>
          ))}
        </div>
      )}

      {departamentoSeleccionado && (
        <div className="modal-fondo">
          <div className="modal-contenido">
            <h2>Departamento de {departamentoSeleccionado.name}</h2>
            <hr />
            
            <div className="modal-scroll">
              <h3>Descripción</h3>
              <p>{departamentoSeleccionado.description || 'Sin descripción disponible.'}</p>
              
              <h3>Datos Adicionales</h3>
              <p><strong>Municipios:</strong> {departamentoSeleccionado.municipalities}</p>
              <p><strong>Prefijo Telefónico:</strong> {departamentoSeleccionado.phonePrefix}</p>
              
              <h3>Capital: {departamentoSeleccionado.cityCapital?.name}</h3>
              <p>{departamentoSeleccionado.cityCapital?.description}</p>
            </div>

            <button 
              className="btn-cerrar"
              onClick={() => setDepartamentoSeleccionado(null)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App