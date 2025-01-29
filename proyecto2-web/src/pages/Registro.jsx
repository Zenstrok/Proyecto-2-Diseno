import React, { useState } from "react";
import { newHashPassword } from "/src/services/hashUtils";
import { insertData, selectData } from "/src/services/supabase";

function Registro() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido1: "",
    apellido2: "",
    telefono: "",
    correo: "",
    provincia: "",
    canton: "",
    distrito: "",
    direccion: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      nombre,
      apellido1,
      apellido2,
      telefono,
      correo,
      provincia,
      canton,
      distrito,
      direccion,
      password,
    } = formData;

    // Verificar si el usuario ya existe
    const usuarios = await selectData("usuarios", "telefono");
    if (usuarios && usuarios.some((usuario) => usuario.telefono === telefono)) {
      setMessage("El usuario ya existe.");
      return;
    }

    // Hashear la contraseña
    const hash = await newHashPassword(password);

    // Datos a insertar en la BD
    const newUser = {
      nombre,
      apellido1,
      apellido2,
      telefono,
      correo,
      provincia,
      canton,
      distrito,
      direccion,
      tema: "Claro",
      idioma: "Español",
      texto: "Mediano",
      salt: "",
      hash,
    };

    // Insertar en la base de datos
    const result = await insertData("usuarios", newUser);
    if (result) {
      setMessage("Usuario registrado con éxito.");
      setFormData({
        nombre: "",
        apellido1: "",
        apellido2: "",
        telefono: "",
        correo: "",
        provincia: "",
        canton: "",
        distrito: "",
        direccion: "",
        password: "",
      });
    } else {
      setMessage("Error al registrar el usuario.");
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="apellido1"
          placeholder="Apellido 1"
          value={formData.apellido1}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="apellido2"
          placeholder="Apellido 2"
          value={formData.apellido2}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={formData.correo}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="provincia"
          placeholder="Provincia"
          value={formData.provincia}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="canton"
          placeholder="Cantón"
          value={formData.canton}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="distrito"
          placeholder="Distrito"
          value={formData.distrito}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="direccion"
          placeholder="Dirección Exacta"
          value={formData.direccion}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Registrarse</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Registro;
