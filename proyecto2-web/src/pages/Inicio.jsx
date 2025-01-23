import React, { useState, useEffect } from "react";
import "./Inicio.css";

const Inicio = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [pedidos, setPedidos] = useState([
    { id: 1, cliente: "Juan Pérez", plato: "Pasta Alfredo", estado: "En preparación", modificado: false, tiempoEstimado: "15 min" },
    { id: 2, cliente: "Maria López", plato: "Pizza Margarita", estado: "Listo", modificado: true, tiempoEstimado: "10 min" },
  ]);
  const [nuevasNotificaciones, setNuevasNotificaciones] = useState(0);
  const [historialPedidos, setHistorialPedidos] = useState([]);

  // Simula notificaciones de nuevos pedidos
  useEffect(() => {
    const interval = setInterval(() => {
      const nuevoPedido = {
        id: pedidos.length + 1,
        cliente: `Cliente ${pedidos.length + 1}`,
        plato: "Nuevo plato",
        estado: "Pendiente",
        modificado: false,
        tiempoEstimado: "20 min",
      };
      setPedidos((prevPedidos) => [...prevPedidos, nuevoPedido]);
      setNuevasNotificaciones((prev) => prev + 1);
    }, 10000); // Cada 10 segundos llega un nuevo pedido

    return () => clearInterval(interval);
  }, [pedidos]);

  // Actualiza el estado de un pedido
  const actualizarEstado = (id, nuevoEstado) => {
    setPedidos((prevPedidos) =>
      prevPedidos.map((pedido) =>
        pedido.id === id
          ? { ...pedido, estado: nuevoEstado, modificado: false }
          : pedido
      )
    );
  };

  // Mueve un pedido al historial
  const completarPedido = (id) => {
    setPedidos((prevPedidos) => {
      const pedidoCompletado = prevPedidos.find((pedido) => pedido.id === id);
      setHistorialPedidos((prevHistorial) => [...prevHistorial, pedidoCompletado]);
      return prevPedidos.filter((pedido) => pedido.id !== id);
    });
  };

  return (
    <div className={darkMode ? "inicio dark-mode" : "inicio"}>
      {/* Barra de navegación */}
      <header className="header">
        <div className="logo">🍴 Cocina Express</div>
        <div className="actions">
          <button
            className="toggle-theme"
            onClick={() => setDarkMode((prev) => !prev)}
          >
            {darkMode ? "☀️ Claro" : "🌙 Oscuro"}
          </button>
          <button className="logout">Cerrar sesión</button>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="main-content">
        <section className="notificaciones">
          <h2>Notificaciones</h2>
          <p>
            {nuevasNotificaciones > 0
              ? `Tienes ${nuevasNotificaciones} nuevo(s) pedido(s).`
              : "Sin nuevas notificaciones."}
          </p>
        </section>

        <section className="pedidos-activos">
          <h2>Pedidos activos</h2>
          <table className="pedidos-table">
            <thead>
              <tr>
                <th>Número</th>
                <th>Cliente</th>
                <th>Plato</th>
                <th>Estado</th>
                <th>Tiempo estimado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido) => (
                <tr key={pedido.id} className={pedido.modificado ? "modificado" : ""}>
                  <td>#{pedido.id}</td>
                  <td>{pedido.cliente}</td>
                  <td>{pedido.plato}</td>
                  <td>{pedido.estado}</td>
                  <td>{pedido.tiempoEstimado}</td>
                  <td>
                    <button
                      className="btn-accion"
                      onClick={() => actualizarEstado(pedido.id, "Listo")}
                    >
                      Marcar como Listo
                    </button>
                    <button
                      className="btn-accion"
                      onClick={() => completarPedido(pedido.id)}
                    >
                      Completar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="historial-pedidos">
          <h2>Historial de pedidos</h2>
          {historialPedidos.length > 0 ? (
            <table className="pedidos-table">
              <thead>
                <tr>
                  <th>Número</th>
                  <th>Cliente</th>
                  <th>Plato</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {historialPedidos.map((pedido) => (
                  <tr key={pedido.id}>
                    <td>#{pedido.id}</td>
                    <td>{pedido.cliente}</td>
                    <td>{pedido.plato}</td>
                    <td>{pedido.estado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No hay pedidos en el historial.</p>
          )}
        </section>
      </main>

      <footer className="footer">
        © 2025 Cocina Express. <a href="#soporte">Soporte técnico</a> |{" "}
        <a href="#privacidad">Política de privacidad</a>
      </footer>
    </div>
  );
};

export default Inicio;
