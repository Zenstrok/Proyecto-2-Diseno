import React, { useState, useEffect, useContext } from "react";
import "./Inicio.css";
import { AppContext } from "/src/context/AppContext.jsx";
import { supabase } from "../services/supabase";

const Inicio = () => {
  const { idioma, darkMode } = useContext(AppContext);
  const [pedidos, setPedidos] = useState([]);
  const [historialPedidos, setHistorialPedidos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // 📌 Configuración de estados y su traducción
  const estadosConfig = {
    recibido: {
      color: "#FFA726",
      accion: idioma === "en" ? "Start Preparation" : "Iniciar preparación",
    },
    "en preparación": {
      color: "#29B6F6",
      accion: idioma === "en" ? "Finish Preparation" : "Terminar preparación",
    },
    listo: {
      color: "#66BB6A",
      accion: idioma === "en" ? "Order Ready" : "Pedido Listo",
    },
  };


  async function probarConexion() {
  try {
    // Intentar obtener datos de la tabla "pedidos"
    const { data, error } = await supabase.from(name).select("*").limit(10);

    if (error) {
      console.error("❌ Error al conectar a Supabase:", error.message);
    } else {
      console.log("✅ Conexión exitosa, datos obtenidos:", data);
    }
  } catch (error) {
    console.error("❌ Error inesperado en la conexión a Supabase:", error);
  }
}

// Llamar a la función al cargar la página
probarConexion();


  // 📌 Cargar pedidos activos
  const cargarPedidos = async () => {
    const { data, error } = await supabase
    .from("pedidos")
    .select(`
      id,
      estado,
      continuado,
      instruccionesespeciales,
      instruccionesingredientes,
      horapedido,
      platosbase:platosbase(nombre),
      usuarios:usuarios(nombre)
    `)
      .not("estado", "eq", "completado"); // Excluir pedidos completados

    if (error) {
      console.error("❌ Error al obtener pedidos:", error.message);
      return;
    }

    // 📌 Ordenar los pedidos correctamente
    const pedidosOrdenados = data.sort((a, b) => {
      if (a.continuado && !b.continuado) return -1;
      if (!a.continuado && b.continuado) return 1;
      if (a.estado === "en preparación" && b.estado !== "en preparación") return -1;
      if (b.estado === "en preparación" && a.estado !== "en preparación") return 1;
      if (a.estado === "recibido" && b.estado === "listo") return -1;
      if (b.estado === "recibido" && a.estado === "listo") return 1;
      return 0;
    });

    setPedidos(pedidosOrdenados);
  };
  
   // 📌 Cargar historial de pedidos completados
   const cargarHistorial = async () => {
    const { data, error } = await supabase
      .from("pedidos")
      .select(`
        id,
        estado,
        continuado,
        instruccionesespeciales,
        instruccionesingredientes,
        horapedido,
        horacompletado, 
        platosbase:platosbase(nombre),
        usuarios:usuarios(nombre)
      `)
      .eq("estado", "completado");
  
    if (error) {
      console.error("❌ Error al obtener historial de pedidos:", error.message);
      return;
    }
    
    console.log("📊 Historial de pedidos recuperado:", data); // 🔥 Para depuración
    setHistorialPedidos(data);
  };
  

// 📌 FILTRO: Buscar en pedidos completados por ID o nombre del cliente
const filteredHistorialPedidos = historialPedidos.filter((pedido) => {
  const searchLower = searchQuery.toLowerCase();

  if (searchLower === "") return true; // Si la búsqueda está vacía, mostrar todo

  // 🔹 Buscar IDs que **empiezan** con los números ingresados
  const idMatch = pedido.id.toString().startsWith(searchLower);

  // 🔹 Buscar nombres que **empiezan** con la letra ingresada
  const nameMatch = pedido.usuarios?.nombre?.toLowerCase().startsWith(searchLower);

  return idMatch || nameMatch;
});


  

  // 📌 Manejo del progreso de los pedidos
  const manejarProgreso = async (pedido) => {
    let nuevoEstado;
    let updateFields = {};
  
    switch (pedido.estado) {
      case "recibido":
        nuevoEstado = "en preparación";
        break;
      case "en preparación":
        nuevoEstado = "listo";
        break;
      case "listo":
        nuevoEstado = "completado";
        updateFields.horacompletado = new Date().toISOString(); // 🔥 Guarda la hora actual del sistema
        break;
      default:
        return;
    }
  
    const { error } = await supabase
      .from("pedidos")
      .update({ estado: nuevoEstado, ...updateFields })
      .eq("id", pedido.id);
  
    if (!error) {
      if (nuevoEstado === "completado") {
        setHistorialPedidos((prevHistorial) => [
          ...prevHistorial,
          { ...pedido, estado: "completado", horacompletado: new Date().toISOString() }
        ]);
        setPedidos((prevPedidos) => prevPedidos.filter((p) => p.id !== pedido.id));
      } else {
        setPedidos((prevPedidos) =>
          prevPedidos.map((p) => (p.id === pedido.id ? { ...p, estado: nuevoEstado } : p))
        );
      }
    } else {
      console.error("❌ Error al actualizar pedido:", error);
    }
  };
  
  

  // 📌 Cargar datos en tiempo real
useEffect(() => {
  cargarPedidos();
  cargarHistorial();

  const subscription = supabase
    .channel("pedidos-channel")
    .on("postgres_changes", { event: "*", schema: "public", table: "pedidos" }, (payload) => {
      if (payload.eventType === "UPDATE" && payload.new.estado === "completado") {
        setHistorialPedidos((prevHistorial) => [...prevHistorial, payload.new]);
        setPedidos((prevPedidos) => prevPedidos.filter((p) => p.id !== payload.new.id));
      } else {
        cargarPedidos();
      }
    })
    .subscribe();

  return () => {
    supabase.removeChannel(subscription);
  };
}, []);


  return (
    <div className={`inicio ${darkMode ? "dark-mode" : ""}`}>
      <header className="header">
        <div className="logo">
          <span role="img" aria-label="chef">👨🍳</span> {idioma === "en" ? "Express Kitchen" : "Cocina Express"}
        </div>
      </header>
  
      <main className="main-content">
        {/* 🔹 Sección de Pedidos Activos */}
        <section className="pedidos-section">
          <h2 className="section-title">
            {idioma === "en" ? "Active Orders" : "Pedidos Activos"} ({pedidos.length})
          </h2>
          <div className="pedidos-grid">
            {pedidos.map((pedido) => {
              const estadoInfo = estadosConfig[pedido.estado] || { color: "#000", accion: "Sin acción" };
              return (
                <div
                  key={pedido.id}
                  className={`pedido-card ${pedido.continuado ? "pedido-continuado" : ""}`}
                  style={{ borderColor: estadoInfo.color }}
                >
                  <div className="pedido-header">
                    <div className="pedido-info">
                      <h3>#{pedido.id} - {pedido.usuarios?.nombre || (idioma === "en" ? "Unknown Client" : "Cliente Desconocido")}</h3>
                      
                    </div>
                    <span className="tiempo">{new Date(pedido.horapedido).toLocaleTimeString()}</span>
                  </div>
  
                  <div className="pedido-body">
                    <p><strong>{idioma === "en" ? "Dishes:" : "Platos:"}</strong> {pedido.platosbase?.nombre || (idioma === "en" ? "Dish not specified" : "Plato no especificado")}</p>
                    <p><strong>{idioma === "en" ? "Special Instructions:" : "Instrucciones Especiales:"}</strong> {pedido.instruccionesespeciales || (idioma === "en" ? "None" : "Ninguna")}</p>
                    <p><strong>{idioma === "en" ? "Ingredient Instructions:" : "Instrucciones de Ingredientes:"}</strong> {pedido.instruccionesingredientes || (idioma === "en" ? "None" : "Ninguna")}</p>
                  </div>
  
                  <div className="pedido-footer">
                    <button
                      className="accion-btn"
                      onClick={() => manejarProgreso(pedido)}
                      style={{ backgroundColor: estadoInfo.color }}
                    >
                      {estadoInfo.accion}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
  
        {/* 🔹 Sección de Historial */}
      <section className="historial-section">
        <h2 className="section-title">
          {idioma === "en" ? "Completed Orders" : "Pedidos Completados"} ({historialPedidos.length})
        </h2>

        {/* 🔎 Barra de búsqueda */}
        <div className="historial-filters">
          <input
            type="text"
            placeholder={idioma === "en" ? "Search by ID or Client Name..." : "Buscar por ID o Nombre del Cliente..."}
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <table className="historial-table">
  <thead>
    <tr>
      <th>ID</th>
      <th>{idioma === "en" ? "Client" : "Cliente"}</th>
      <th>{idioma === "en" ? "Dishes" : "Platos"}</th>
      <th>{idioma === "en" ? "Special Instructions" : "Instrucciones Especiales"}</th>
      <th>{idioma === "en" ? "Ingredient Instructions" : "Instrucciones de Ingredientes"}</th>
      <th>{idioma === "en" ? "Order Time" : "Hora Pedido"}</th>
      <th>{idioma === "en" ? "Completion Time" : "Hora Completado"}</th>
      <th>{idioma === "en" ? "Status" : "Estado"}</th>
    </tr>
  </thead>
  <tbody>
    {filteredHistorialPedidos.length > 0 ? (
      filteredHistorialPedidos.map((pedido) => (
        <tr key={pedido.id}>
          <td>#{pedido.id}</td>
          <td>{pedido.usuarios?.nombre || (idioma === "en" ? "Unknown Client" : "Cliente Desconocido")}</td>
          <td>{pedido.platosbase?.nombre || (idioma === "en" ? "Dish not specified" : "Plato no especificado")}</td>
          <td>{pedido.instruccionesespeciales || (idioma === "en" ? "None" : "Ninguna")}</td>
          <td>{pedido.instruccionesingredientes || (idioma === "en" ? "None" : "Ninguna")}</td>
          <td>{new Date(pedido.horapedido).toLocaleTimeString()}</td>
          <td>{pedido.horacompletado && !isNaN(new Date(pedido.horacompletado))
                  ? new Date(pedido.horacompletado).toLocaleTimeString()
                  : "-"}
              </td>
          <td>{pedido.estado || "-"}</td> 
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="8" className="no-results">
          {idioma === "en" ? "No orders found" : "No se encontraron pedidos"}
        </td>
      </tr>
    )}
  </tbody>
</table>

      </section>
    </main>
  </div>
  );  
};


export default Inicio;
