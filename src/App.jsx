import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import ImagenCripto from "../src/img/imagen-criptos.png";
import Formulario from "./components/Formulario";
import Spinner from "./components/Spinner";
import Resultado from "./components/Resultado";

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  color: #fff;
  font-size: 34px;
  text-align: center;
  margin-top: 80px;
  margin-bottom: 50px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;

const SpinnerContenedor = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const App = () => {
  const [monedas, setMonedas] = useState({});
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (Object.keys(monedas).length > 0) {
      setCargando(true);
      const { moneda, criptomoneda } = monedas;
      const cotizarCripto = async () => {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setResultado(resultado.DISPLAY[criptomoneda][moneda]);
        setCargando(false);
      };
      cotizarCripto();
    }
  }, [monedas]);

  return (
    <Contenedor>
      <Imagen src={ImagenCripto} alt="Imagen criptomonedas"></Imagen>
      <div>
        <Heading>Cotiza criptomonedas al instante</Heading>
        <Formulario setMonedas={setMonedas} />

        {cargando ? (
          <SpinnerContenedor>
            <Spinner />
          </SpinnerContenedor>
        ) : (
          resultado.PRICE && <Resultado resultado={resultado} />
        )}
      </div>
    </Contenedor>
  );
};

export default App;
