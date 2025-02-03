import React, { useState, useEffect, useContext } from "react";
import "./Notificaciones.css";
import { AppContext } from "/src/context/AppContext.jsx";

const Notificaciones = () => {
  const { idioma, darkMode, setIdioma, setDarkMode } = useContext(AppContext);
  const [notificaciones, setNotificaciones] = useState([]);

  // 🔥 Datos quemados de reseñas
  const reseñas = [
    { id: 1, usuario: "Carlos", calificacion: 5, comentario: "¡La pizza estuvo increíble!", fecha: "2024-02-01" },
    { id: 2, usuario: "María", calificacion: 4, comentario: "Buena comida, pero llegó un poco fría.", fecha: "2024-02-02" },
    { id: 3, usuario: "Jorge", calificacion: 3, comentario: "El sushi estaba rico, pero tardó mucho en llegar.", fecha: "2024-02-03" },
    { id: 4, usuario: "Ana", calificacion: 5, comentario: "Excelente servicio y sabor, repetiré sin duda.", fecha: "2024-02-04" },
    { id: 5, usuario: "Pedro", calificacion: 2, comentario: "La carne estaba muy seca, esperaba más.", fecha: "2024-02-05" },
  ];

  // 🔥 Simulación de nuevas notificaciones
  useEffect(() => {
    const nuevasNotificaciones = reseñas.map((reseña) => ({
      mensaje: `${reseña.usuario} ${idioma === "en" ? "left a review:" : "dejó una reseña:"} ${reseña.comentario}`,
      fecha: reseña.fecha,
    }));
    setNotificaciones(nuevasNotificaciones);
  }, [idioma]); // Actualizar cuando cambia el idioma

  return (
    <div className={`notificaciones ${darkMode ? "dark-mode" : ""}`}>
      <header className="header">
        <h2>{idioma === "en" ? "Notifications" : "Notificaciones"}</h2>
      </header>

      {/* 🔔 Apartado de notificaciones */}
      <section className="notificaciones-section">
        <h3>{idioma === "en" ? "New Reviews" : "Nuevas Reseñas"}</h3>
        {notificaciones.length > 0 ? (
          <ul className="notificaciones-list">
            {notificaciones.map((notif, index) => (
              <li key={index} className="notificacion-item">
                <span className="notif-text">{notif.mensaje}</span>
                <span className="notif-date">{notif.fecha}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>{idioma === "en" ? "No new notifications." : "No hay nuevas notificaciones."}</p>
        )}
      </section>

      {/* ⭐ Apartado de calificaciones y reseñas */}
      <section className="reseñas-section">
        <h3>{idioma === "en" ? "Previous Reviews" : "Reseñas Anteriores"}</h3>
        <table className="reseñas-table">
          <thead>
            <tr>
              <th>{idioma === "en" ? "User" : "Usuario"}</th>
              <th>{idioma === "en" ? "Rating" : "Calificación"}</th>
              <th>{idioma === "en" ? "Comment" : "Comentario"}</th>
              <th>{idioma === "en" ? "Date" : "Fecha"}</th>
            </tr>
          </thead>
          <tbody>
            {reseñas.map((reseña) => (
              <tr key={reseña.id}>
                <td>{reseña.usuario}</td>
                <td>
                  {"⭐".repeat(reseña.calificacion)} {/* Mostrar estrellas según la calificación */}
                </td>
                <td>{reseña.comentario}</td>
                <td>{reseña.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Notificaciones;
