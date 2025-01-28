import React, { useState } from 'react';
import './menu.css';

const Menu = () => {
  const [darkMode, setDarkMode] = useState(false); // Estado para modo oscuro
  const [dishes, setDishes] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    description: '',
    price: '',
    baseIngredients: '',
    photo: '',
    customizableIngredients: [],
    isAvailable: true
  });
  const [newCustomizable, setNewCustomizable] = useState({
    name: '',
    additionalCost: ''
  });
  const [error, setError] = useState(null); // Estado para manejar errores

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCustomizableChange = (e) => {
    const { name, value } = e.target;
    setNewCustomizable(prev => ({ ...prev, [name]: value }));
  };

  const addCustomizable = () => {
    if (newCustomizable.name && newCustomizable.additionalCost) {
      setFormData(prev => ({
        ...prev,
        customizableIngredients: [...prev.customizableIngredients, newCustomizable]
      }));
      setNewCustomizable({ name: '', additionalCost: '' });
      setError(null); // Resetear errores después de agregar
    } else {
      setError("Por favor, completa ambos campos para agregar un ingrediente personalizable.");
    }
  };

  const removeCustomizable = (index) => {
    setFormData(prev => ({
      ...prev,
      customizableIngredients: prev.customizableIngredients.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación básica
    if (!formData.name || !formData.price) {
      setError("Por favor, completa todos los campos requeridos.");
      return;
    }

    const dish = {
      ...formData,
      id: formData.id || Date.now(),
      price: parseFloat(formData.price),
      baseIngredients: formData.baseIngredients.split(',').map(i => i.trim())
    };

    setDishes(prev => 
      formData.id 
        ? prev.map(d => d.id === formData.id ? dish : d) 
        : [...prev, dish]
    );
    
    setFormData({
      id: null,
      name: '',
      description: '',
      price: '',
      baseIngredients: '',
      photo: '',
      customizableIngredients: [],
      isAvailable: true
    });
    setError(null); // Resetear errores después de una operación exitosa
  };

  const editDish = (dish) => {
    setFormData({
      ...dish,
      baseIngredients: dish.baseIngredients.join(', ')
    });
    setError(null); // Resetear errores al editar
  };

  const deleteDish = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este plato?")) {
      setDishes(prev => prev.filter(d => d.id !== id));
      setError(null); // Resetear errores después de eliminar
    }
  };

  const toggleAvailability = (id) => {
    setDishes(prev => prev.map(d => 
      d.id === id ? { ...d, isAvailable: !d.isAvailable } : d
    ));
  };

  return (
    <div className={`inicio ${darkMode ? 'dark-mode' : ''}`}>
      <header className="header">
        <div className="logo">
          🍽️ Gestión de Menú
        </div>
        <div className="header-controls">
          <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? '☀️ Claro' : '🌙 Oscuro'}
          </button>
        </div>
      </header>
      
      <main className="main-content">
        <form onSubmit={handleSubmit} className="dish-form">
          <h2>{formData.id ? 'Editar Plato' : 'Agregar Nuevo Plato'}</h2>
          {error && <p className="error-message">{error}</p>}
          
          <label>
            Nombre:
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
          </label>
          
          <label>
            Descripción:
            <textarea name="description" value={formData.description} onChange={handleInputChange} required />
          </label>
          
          <label>
            Precio:
            <input type="number" name="price" value={formData.price} onChange={handleInputChange} step="0.01" required />
          </label>
          
          <label>
            Ingredientes Base (separados por comas):
            <input type="text" name="baseIngredients" value={formData.baseIngredients} onChange={handleInputChange} required />
          </label>
          
          <label>
            URL de la Foto:
            <input type="text" name="photo" value={formData.photo} onChange={handleInputChange} placeholder="http://ejemplo.com/foto.jpg" />
          </label>
          
          <div className="customizable-section">
            <h3>Ingredientes Personalizables</h3>
            <div className="customizable-inputs">
              <input
                type="text"
                name="name"
                placeholder="Nombre ingrediente"
                value={newCustomizable.name}
                onChange={handleCustomizableChange}
              />
              <input
                type="number"
                name="additionalCost"
                placeholder="Costo adicional"
                value={newCustomizable.additionalCost}
                onChange={handleCustomizableChange}
                step="0.01"
              />
              <button type="button" onClick={addCustomizable} className="btn-add">Agregar</button>
            </div>
            
            <div className="customizable-list">
              {formData.customizableIngredients.map((ingredient, index) => (
                <div key={index} className="customizable-item">
                  <span>{ingredient.name} (+${ingredient.additionalCost})</span>
                  <button type="button" onClick={() => removeCustomizable(index)} className="btn-remove">×</button>
                </div>
              ))}
            </div>
          </div>

          <label className="availability">
            <input
              type="checkbox"
              checked={formData.isAvailable}
              onChange={() => setFormData(prev => ({ ...prev, isAvailable: !prev.isAvailable }))}
            />
            Disponible
          </label>

          <button type="submit" className="btn-submit">{formData.id ? 'Actualizar' : 'Agregar'} Plato</button>
        </form>

        <section className="section-title">
          <h2>Lista de Platos</h2>
          {/* Puedes añadir filtros o botones adicionales aquí */}
        </section>

        <div className="dishes-grid">
          {dishes.map(dish => (
            <div key={dish.id} className={`dish-card ${!dish.isAvailable ? 'unavailable' : ''}`}>
              {dish.photo && <img src={dish.photo} alt={dish.name} />}
              <h3>{dish.name}</h3>
              <p>{dish.description}</p>
              <div className="dish-details">
                <p>Precio: ${dish.price.toFixed(2)}</p>
                <p>Ingredientes Base: {dish.baseIngredients.join(', ')}</p>
                {dish.customizableIngredients.length > 0 && (
                  <div className="customizables">
                    <p>Personalizaciones:</p>
                    <ul>
                      {dish.customizableIngredients.map((ing, i) => (
                        <li key={i}>{ing.name} (+${ing.additionalCost})</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="dish-actions">
                  <button onClick={() => editDish(dish)}>Editar</button>
                  <button onClick={() => deleteDish(dish.id)}>Eliminar</button>
                  <button onClick={() => toggleAvailability(dish.id)}>
                    {dish.isAvailable ? 'Desactivar' : 'Activar'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      
    </div>
  );
};

export default Menu;
