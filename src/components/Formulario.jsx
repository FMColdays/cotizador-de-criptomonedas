import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useSelectMonedas from "../hooks/useSelectMonedas";
import { monedas } from "../data/monedas";
import Error from "./Error";

const InputSubmit = styled.input`
  background-color: #8497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  margin-top: 30px;
  transition: background-color, color 0.2s ease-in-out;

  &:hover {
    background-color: #747dfe;
    cursor: pointer;
  }
`;

const Formulario = ({ setMonedas }) => {
  const [criptos, setCriptos] = useState([]);
  const [moneda, SelectMonedas] = useSelectMonedas("Elige tu moneda", monedas);
  const [criptomoneda, SelectCriptoMoneda] = useSelectMonedas(
    "Elige tu criptomoneda",
    criptos
  );
  const [error, setError] = useState(false);

  useEffect(() => {
    const colsutarApi = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=15&tsym=USD";

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      const arrayCriptos = resultado.Data.map((cripto) => {
        const objeto = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName,
        };

        return objeto;
      });

      setCriptos(arrayCriptos);
    };

    colsutarApi();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([moneda, criptomoneda].includes("")) {
      setError(true);
      return;
    }
    setError(false);

    setMonedas({ moneda, criptomoneda });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <Error>Todos los campos son obligatorios</Error>}
      <SelectMonedas />
      <SelectCriptoMoneda />
      <InputSubmit type="submit" value="Cotizar" />
    </form>
  );
};

Formulario.propTypes = {
  setMonedas: PropTypes.func.isRequired,
};

export default Formulario;
