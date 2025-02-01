import React, { useContext, useState } from "react";
import { AppContext } from "/src/context/AppContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "/src/services/supabase";
import { comparePassword } from "/src/services/hashUtils";

function Login() {
  const { setCocina, setIdioma, setTema, setTexto } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ telefono: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleIdiomaContext = async (cocina) => {
    const { data, error } = await supabase
      .from("idiomas")
      .select(`id, nombre, valor, cocinas (id, nombre, ididioma)`)
      .eq("cocinas.id", cocina.id)
      .eq("id", cocina.ididioma);
    setIdioma(data[0].valor);
  };

  const handleTemaContext = async (cocina) => {
    const { data, error } = await supabase
      .from("temas")
      .select(`id, nombre, valor, cocinas (id, nombre, idtema)`)
      .eq("cocinas.id", cocina.id)
      .eq("id", cocina.idtema);
    setTema(data[0].valor);
  };

  const handleTextoContext = async (cocina) => {
    const { data, error } = await supabase
      .from("textos")
      .select(`id, nombre, valor, cocinas (id, nombre, idtexto)`)
      .eq("cocinas.id", cocina.id)
      .eq("id", cocina.idtexto);
    setTexto(data[0].valor);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { telefono, password } = formData;

    // Buscar la cocina en la base de datos
    const { data, error } = await supabase
      .from("cocinas")
      .select("*")
      .eq("telefono", telefono)
      .single();

    if (error || !data) {
      setMessage("Número de teléfono o contraseña inválidos");
      return;
    }

    // Comparar la contraseña
    const isValidPassword = await comparePassword(password, data.hash);
    if (isValidPassword) {
      setCocina(data);
      await handleIdiomaContext(data);
      await handleTemaContext(data);
      await handleTextoContext(data);
      navigate("/inicio");
    } else {
      setMessage("Número de teléfono o contraseña inválidos");
    }
  };

  return (
    <div className={`Login`}>
      <header>
        <h1>{"Login"}</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="telefono">{"Teléfono"}</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">{"Contraseña"}</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">{"Iniciar Sesión"}</button>
          <button type="button" onClick={() => navigate("/registro")}>
            {"Registrarse"}
          </button>
        </form>
        {message && <p>{message}</p>}
      </main>
      <footer>{"Proyecto de Diseño de Software de Verano, 2024"}</footer>
    </div>
  );
}

export default Login;
