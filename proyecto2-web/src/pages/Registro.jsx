import React, { useState, useEffect } from "react";
import { newHashPassword } from "/src/services/hashUtils";
import { insertData, supabase } from "/src/services/supabase";
import { useNavigate } from "react-router-dom";

function Registro() {
  const [formData, setFormData] = useState({
    nombre: "",
    provincia: "",
    canton: "",
    distrito: "",
    direccion: "",
    telefono: "",
    tiempoentrega: "",
    horaapertura: "",
    horacierre: "",
    password: "",
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [provincias, setProvincias] = useState([]);
  const [cantones, setCantones] = useState([]);
  const [distritos, setDistritos] = useState([]);

  useEffect(() => {
    const importarProvincias = async () => {
      const { data, error } = await supabase.from("provincias").select("*");
      if (error) {
        console.error("Error importing provincias:", error);
      } else {
        setProvincias(data);
      }
    };
    importarProvincias();
  }, []);

  const importarCantones = async (idprovincia) => {
    try {
      const { data, error } = await supabase
        .from("cantones")
        .select("*")
        .eq("idprovincia", idprovincia);
      if (error) {
        throw error;
      }
      setCantones(data);
    } catch (error) {
      console.error("Error importing cantones:", error);
      setCantones([]);
    }
  };

  const importarDistritos = async (idcanton) => {
    try {
      const { data, error } = await supabase
        .from("distritos")
        .select("*")
        .eq("idcanton", idcanton);
      if (error) {
        throw error;
      }
      setDistritos(data);
    } catch (error) {
      console.error("Error importing distritos:", error);
      setDistritos([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "provincia") {
      importarCantones(value);
      setFormData((prevData) => ({
        ...prevData,
        canton: "",
        distrito: "",
      }));
      setDistritos([]);
    }

    if (name === "canton") {
      importarDistritos(value);
      setFormData((prevData) => ({
        ...prevData,
        distrito: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      nombre,
      provincia,
      canton,
      distrito,
      direccion,
      telefono,
      tiempoentrega,
      horaapertura,
      horacierre,
      password,
    } = formData;
    const { salt, hash } = await newHashPassword(password);
    const newUser = {
      nombre,
      idprovincia: parseInt(provincia, 10),
      idcanton: parseInt(canton, 10),
      iddistrito: parseInt(distrito, 10),
      direccionexacta: direccion,
      telefono: parseInt(telefono, 10),
      tiempoentrega,
      horaapertura,
      horacierre,
      estado: false,
      salt: salt || "",
      hash: hash,
      idtema: 1,
      ididioma: 1,
      idtexto: 2,
    };

    // Insertar en la base de datos
    console.log(newUser);
    const result = await insertData("cocinas", newUser);
    if (result) {
      setMessage("Cocina registrado con éxito.");
      setFormData({
        nombre: "",
        provincia: "",
        canton: "",
        distrito: "",
        direccion: "",
        telefono: "",
        tiempoentrega: "",
        horaapertura: "",
        horacierre: "",
        password: "",
      });
      navigate("/login");
    } else {
      setMessage("Error al registrar la cocina.");
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre de la Cocina"
          value={formData.nombre}
          onChange={handleChange}
        />
        <select
          name="provincia"
          value={formData.provincia}
          onChange={handleChange}
        >
          <option value="">Seleccione una provincia</option>
          {provincias.map((provincia) => (
            <option key={provincia.id} value={provincia.id}>
              {provincia.nombre}
            </option>
          ))}
        </select>
        <select
          name="canton"
          value={formData.canton}
          onChange={handleChange}
          disabled={!formData.provincia}
        >
          <option value="">Seleccione un cantón</option>
          {cantones.map((canton) => (
            <option key={canton.id} value={canton.id}>
              {canton.nombre}
            </option>
          ))}
        </select>
        <select
          name="distrito"
          value={formData.distrito}
          onChange={handleChange}
          disabled={!formData.canton}
        >
          <option value="">Seleccione un distrito</option>
          {distritos.map((distrito) => (
            <option key={distrito.id} value={distrito.id}>
              {distrito.nombre}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={formData.direccion}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={handleChange}
        />
        <input
          type="text"
          name="tiempoentrega"
          placeholder="Tiempo de Entrega (Mins)"
          value={formData.tiempoentrega}
          onChange={handleChange}
        />
        <input
          type="time"
          name="horaapertura"
          placeholder="Hora de apertura"
          value={formData.horaapertura}
          onChange={handleChange}
        />
        <input
          type="time"
          name="horacierre"
          placeholder="Hora de cierre"
          value={formData.horacierre}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Registrar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Registro;
