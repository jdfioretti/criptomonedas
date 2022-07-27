import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import Error from "./Error";
import useMoneda from "../hooks/useModeda";
import useCriptomoneda from "../hooks/useCriptomonedas";
import axios from "axios";


const Boton = styled.input`
  margin-top: 20px;
  fonr-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {

    const [listacripto, guardarCripto] = useState([]);
    const [error, guardaError] = useState(false);


  const MONEDAS = [
    { codigo: "USD", nombre: "Dolar USA" },
    { codigo: "ARS", nombre: "Peso Argentino" },
    { codigo: "EUR", nombre: "Euro" },
    { codigo: "GBP", nombre: "Libra Esterlina" },
  ];

  const [moneda, SelectMonedas] = useMoneda("Elige tu moneda", "", MONEDAS);

  const [criptomoneda, SelectCripto] = useCriptomoneda(
    "Elige tu criptomoneda",
    "",
    listacripto
  );


  useEffect(() => {
    const consultarApi = async () => {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

      const resultado = await axios.get(url);

      guardarCripto(resultado.data.Data);

    }
    consultarApi();
  }, []);
  
  const cotizarMoneda = e => {
    e.preventDefault();

    if(moneda === '' || criptomoneda === ''){
      guardaError(true);
      return;
    }
    guardaError(false);
    guardarMoneda(moneda);
    guardarCriptomoneda(criptomoneda);
  }

  return (
    <form
      onSubmit={cotizarMoneda}
    >
      {error ? <Error mensaje='Todos los campos son obligatorios'/> : null}
      <SelectMonedas />
      <SelectCripto />

      <Boton type="submit" value="Calcular" />
    </form>
  );
};

export default Formulario;
