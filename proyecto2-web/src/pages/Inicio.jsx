import React, { useState, useEffect, useContext } from "react";
import "./Inicio.css";
import { AppContext } from "/src/context/AppContext.jsx";

const Inicio = () => {
  const { cocina, idioma, tema, texto } = useContext(AppContext);
  console.log(cocina);
  console.log(idioma);
  console.log(tema);
  console.log(texto);
  const [darkMode, setDarkMode] = useState(false);
  const [pedidos, setPedidos] = useState([
    {
      id: 1,
      cliente: "Juan Pérez",
      platos: ["Pasta Alfredo"],
      modificaciones: "Sin gluten, salsa aparte",
      estado: "recibido",
      prioridad: "alta",
      horaPedido: new Date(),
      horaCompletado: null,
    },
    {
      id: 2,
      cliente: "Maria López",
      platos: ["Pizza Margarita"],
      modificaciones: "",
      estado: "recibido",
      prioridad: "media",
      horaPedido: new Date(),
      horaCompletado: null,
    },
  ]);

  const [historialPedidos, setHistorialPedidos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const estadosConfig = {
    recibido: {
      color: "#FFA726",
      accion: "Iniciar preparación",
    },
    "en preparación": {
      color: "#29B6F6",
      accion: "Terminar preparación",
    },
    listo: {
      color: "#66BB6A",
      accion: "Pedido Listo",
    },
  };

  const manejarProgreso = (pedido) => {
    const nuevosPedidos = [...pedidos];
    const index = nuevosPedidos.findIndex((p) => p.id === pedido.id);

    switch (pedido.estado) {
      case "recibido":
        nuevosPedidos[index].estado = "en preparación";
        break;
      case "en preparación":
        nuevosPedidos[index].estado = "listo";
        nuevosPedidos[index].horaCompletado = new Date();
        setTimeout(() => {
          setHistorialPedidos((prev) => [...prev, nuevosPedidos[index]]);
          setPedidos((prev) => prev.filter((p) => p.id !== pedido.id));
        }, 2000);
        break;
      default:
        break;
    }

    setPedidos(nuevosPedidos);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nuevoPedido = {
        id: pedidos.length + 1,
        cliente: `Cliente ${pedidos.length + 1}`,
        platos: ["Nuevo plato"],
        modificaciones: Math.random() > 0.5 ? "Modificación especial" : "",
        estado: "recibido",
        prioridad: ["alta", "media"][Math.floor(Math.random() * 2)],
        horaPedido: new Date(),
        horaCompletado: null,
      };

      setPedidos((prev) => [...prev, nuevoPedido]);
    }, 15000);

    return () => clearInterval(interval);
  }, [pedidos.length]);

  const filteredHistorial = historialPedidos.filter((pedido) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      pedido.cliente.toLowerCase().includes(searchLower) ||
      pedido.id.toString().includes(searchLower)
    );
  });

  return (
    <div className={`inicio ${darkMode ? "dark-mode" : ""}`}>
      <header className="header">
        <div className="logo">
          <span role="img" aria-label="chef">
            👨🍳
          </span>{" "}
          Cocina Express
        </div>
        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Claro" : "🌙 Oscuro"}
        </button>
      </header>

      <main className="main-content">
        <section className="pedidos-section">
          <h2 className="section-title">Pedidos Activos ({pedidos.length})</h2>

          <div className="pedidos-grid">
            {pedidos
              .sort((a, b) => {
                const prioridadOrden = { alta: 1, media: 2 };
                return (
                  prioridadOrden[a.prioridad] - prioridadOrden[b.prioridad]
                );
              })
              .map((pedido) => (
                <div
                  key={pedido.id}
                  className={`pedido-card ${pedido.prioridad}`}
                  style={{ borderColor: estadosConfig[pedido.estado].color }}
                >
                  <div className="pedido-header">
                    <div className="pedido-info">
                      <h3>
                        #{pedido.id} - {pedido.cliente}
                      </h3>
                      <span className="prioridad">
                        {pedido.prioridad.toUpperCase()}
                      </span>
                    </div>
                    <span className="tiempo">
                      {new Date(pedido.horaPedido).toLocaleTimeString()}
                    </span>
                  </div>

                  <div className="pedido-body">
                    <div className="platos">
                      <strong>Platos:</strong> {pedido.platos.join(", ")}
                    </div>

                    {pedido.modificaciones && (
                      <div className="modificaciones">
                        <strong>Modificaciones:</strong>
                        <p>{pedido.modificaciones}</p>
                      </div>
                    )}
                  </div>

                  <div className="pedido-footer">
                    <button
                      className="accion-btn"
                      onClick={() => manejarProgreso(pedido)}
                      style={{
                        backgroundColor: estadosConfig[pedido.estado].color,
                        opacity: pedido.estado === "listo" ? 0.7 : 1,
                      }}
                      disabled={pedido.estado === "listo"}
                    >
                      {estadosConfig[pedido.estado].accion}
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </section>

        <section className="historial-section">
          <h2 className="section-title">
            Pedidos Completados ({historialPedidos.length})
          </h2>

          <div className="historial-filters">
            <input
              type="text"
              placeholder="Buscar por cliente o ID..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <table className="historial-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Platos</th>
                <th>Modificaciones</th> {/* Nueva columna agregada */}
                <th>Prioridad</th>
                <th>Hora Pedido</th>
                <th>Hora Completado</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistorial.map((pedido) => (
                <tr key={pedido.id} className="historial-row">
                  <td>#{pedido.id}</td>
                  <td>{pedido.cliente}</td>
                  <td>{pedido.platos.join(", ")}</td>
                  <td className="modificaciones-historial">
                    {pedido.modificaciones || "Ninguna"}
                  </td>
                  <td className={`prioridad ${pedido.prioridad}`}>
                    {pedido.prioridad.toUpperCase()}
                  </td>
                  <td>{new Date(pedido.horaPedido).toLocaleTimeString()}</td>
                  <td>
                    {pedido.horaCompletado
                      ? new Date(pedido.horaCompletado).toLocaleTimeString()
                      : "-"}
                  </td>
                  <td>
                    <span className="estado-badge listo">✅ Listo</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default Inicio;
