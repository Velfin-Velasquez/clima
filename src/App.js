import React, { Fragment, useState, useEffect } from "react";
import { Clima } from "./components/Clima";
import { Error } from "./components/Error";
import { Formulario } from "./components/Formulario";
import { Header } from "./components/Header";

export const App = () => {
  //state de formulario
  const [busqueda, guardarBusqueda] = useState({
    ciudad: "",
    pais: "",
  });

  //state para hacer la consulta a la api
  const [consultar, guardarConsulta] = useState(false);

  //state para guardar resultado de la API
  const [resultado, guardarResultado] = useState({});

  //state error
  const [error, guardarError] = useState(false);

  //extraer variables del formulario
  const { ciudad, pais } = busqueda;

  useEffect(() => {
    const consultarAPI = async () => {
      if (consultar) {
        const apikey = "8c3ac9a4a8671053c80d21224e9374cc";
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apikey}`;
        const respuesta = await fetch(url);
        const resultadoAPI = await respuesta.json();

        //guardando resultado en el state
        guardarResultado(resultadoAPI);

        //cerrar la peticion
        guardarConsulta(false);

        console.log(resultadoAPI.cod);
        //validando posibles errores
        if (resultadoAPI.cod === "404") {
          guardarError(true);
        } else {
          guardarError(false);
        }
      }
    };
    consultarAPI();
  }, [consultar]);

  let componente;

  if (error) {
    componente = <Error mensaje="No hay resultados!!" />;
  } else {
    componente = <Clima resultado={resultado} />;
  }

  return (
    <Fragment>
      <Header titulo="Clima react app" />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsulta={guardarConsulta}
              />
            </div>
            <div className="col m6 s12">{componente}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
