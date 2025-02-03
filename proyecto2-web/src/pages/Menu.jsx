import React, { useState, useEffect, useContext } from 'react';
import './menu.css';
import { AppContext } from '/src/context/AppContext.jsx';
import { supabase } from "/src/services/supabase";

const Menu = () => {
  const { darkMode, idioma, cocina } = useContext(AppContext); // Obtener idioma y cocina desde el contexto
  const [dishes, setDishes] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    description: '',
    price: '',
    photo: '',
    isAvailable: true
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // 📌 Cargar platos de la cocina logueada al iniciar la página
  useEffect(() => {
    const fetchDishes = async () => {
      if (!cocina) return; // Si no hay una cocina logueada, no hacer nada

      try {
        const { data, error } = await supabase
          .from('platosbase')
          .select('*')
          .eq('idcocina', cocina.id); // Filtrar platos según la cocina logueada

        if (error) throw error;
        setDishes(data);
      } catch (err) {
        console.error("Error al obtener los platos:", err);
      }
    };

    fetchDishes();
  }, [cocina]); // Ejecutar cuando la cocina cambie

  // 📌 Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 📌 Enviar datos a Supabase
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cocina) {
      setError(idioma === "en" ? "No kitchen selected. Please log in again." : "No hay cocina seleccionada. Por favor, inicie sesión nuevamente.");
      return;
    }

    if (!formData.name || !formData.price) {
      setError(idioma === "en" ? "Please fill in all required fields." : "Por favor, completa todos los campos requeridos.");
      return;
    }

    try {
      const { data, error } = await supabase.from("platosbase").insert([
        {
          nombre: formData.name,
          descripcion: formData.description,
          preciobase: parseFloat(formData.price),
          foto: formData.photo,
          idcocina: cocina.id, // Guardar el plato en la cocina actual
          disponible: formData.isAvailable,
        },
      ]).select(); // 👈 Recupera el plato insertado inmediatamente

      if (error) throw error;

      console.log("Plato guardado en Supabase:", data);

      // Actualizar la lista de platos sin recargar la página
      setDishes((prev) => [...prev, ...data]);

      // Resetear formulario después de guardar
      setFormData({
        id: null,
        name: '',
        description: '',
        price: '',
        photo: '',
        isAvailable: true
      });

      setError(null);
      setSuccess(idioma === "en" ? "Dish added successfully!" : "Plato agregado con éxito!");
      setTimeout(() => setSuccess(null), 3000); // Quitar mensaje de éxito después de 3 segundos

    } catch (err) {
      setError((idioma === "en" ? "Error saving to Supabase: " : "Error al guardar en Supabase: ") + err.message);
      console.error("Error al guardar en Supabase:", err);
    }
  };

  return (
    <div className={`menu ${darkMode ? 'dark-mode' : ''}`}>
      <header className="header">
        <div className="logo">
          🍽️ {idioma === "en" ? "Menu Management" : "Gestión de Menú"}
        </div>
      </header>

      <main className="main-content">
        <form onSubmit={handleSubmit} className="dish-form">
          <h2>{idioma === "en" ? "Add New Dish" : "Agregar Nuevo Plato"}</h2>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <label>{idioma === "en" ? "Name:" : "Nombre:"}</label>
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />

          <label>{idioma === "en" ? "Description:" : "Descripción:"}</label>
          <textarea name="description" value={formData.description} onChange={handleInputChange} />

          <label>{idioma === "en" ? "Price (₡):" : "Precio (₡):"}</label>
          <input 
            type="number" 
            name="price" 
            value={formData.price} 
            onChange={handleInputChange} 
            step="0.01" 
            required 
            placeholder={idioma === "en" ? "Enter price in CRC" : "Ingrese precio en CRC"} 
          />

          <label>{idioma === "en" ? "Photo URL:" : "URL de la Foto:"}</label>
          <input type="text" name="photo" value={formData.photo} onChange={handleInputChange} placeholder="http://example.com/photo.jpg" />

          <label className="availability">
            <input
              type="checkbox"
              checked={formData.isAvailable}
              onChange={() => setFormData(prev => ({ ...prev, isAvailable: !prev.isAvailable }))}
            />
            {idioma === "en" ? "Available" : "Disponible"}
          </label>

          <button type="submit" className="btn-submit">
            {idioma === "en" ? "Add Dish" : "Agregar Plato"}
          </button>
        </form>

        <section className="section-title">
          <h2>{idioma === "en" ? "Dish List" : "Lista de Platos"}</h2>
        </section>

        <div className="dishes-grid">
          {dishes.length === 0 ? (
            <p>{idioma === "en" ? "No dishes found for this kitchen." : "No se encontraron platos para esta cocina."}</p>
          ) : (
            dishes.map((dish) => (
              <div key={dish.id} className={`dish-card ${!dish.disponible ? 'unavailable' : ''}`}>
                {dish.foto && <img src={dish.foto} alt={dish.nombre} />}
                <h3>{dish.nombre}</h3>
                <p>{dish.descripcion}</p>
                <p>
                  {idioma === "en" ? "Price:" : "Precio:"} 
                  <strong> {dish.preciobase.toLocaleString("es-CR", { style: "currency", currency: "CRC" })} </strong>
                </p>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Menu;
