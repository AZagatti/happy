import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

import logoImg from "../../images/logo.svg";

import { Container } from "./styles";

const Landing: React.FC = () => {
  return (
    <Container>
      <div>
        <img src={logoImg} alt="logo" />

        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>

        <div>
          <strong>Pederneiras</strong>
          <span>São Paulo</span>
        </div>

        <Link to="/app">
          <FiArrowRight size={26} color="rgba(0,0,0,0.6)" />
        </Link>
      </div>
    </Container>
  );
};

export default Landing;
