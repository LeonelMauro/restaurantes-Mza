import React, { useState } from 'react';
import axios from 'axios';

const FormularioDepartamento = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imagen) {
      setMensaje('Selecciona una imagen');
      return;
    }

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('image', imagen); // 👈 debe coincidir con FileInterceptor('image')

    try {
      const res = await axios.post('http://localhost:3000/departamento', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMensaje('Departamento creado con éxito');
      console.log('Respuesta:', res.data);
    } catch (error) {
      console.error(error);
      setMensaje('Error al crear departamento');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear Departamento</h2>

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />

      <br />

      <textarea
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        required
      />

      <br />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImagen(e.target.files[0])}
        required
      />

      <br />

      <button type="submit">Crear</button>

      <p>{mensaje}</p>
    </form>
  );
};

export default FormularioDepartamento;
