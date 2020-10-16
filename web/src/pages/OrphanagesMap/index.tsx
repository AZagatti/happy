import React from "react";
import { FiArrowRight, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import mapMarkerImg from "../../images/map-marker.svg";

import { Container } from "./styles";
import mapIcon from "../../utils/mapIcon";

const OrphanagesMap: React.FC = () => {
  return (
    <Container>
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Pederneiras</strong>
          <span>São Paulo</span>
        </footer>
      </aside>

      <Map
        center={[-22.346845, -48.7693609]}
        zoom={15}
        style={{ width: "100%", height: "100%" }}
      >
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />
        <Marker position={[-22.346845, -48.7693609]} icon={mapIcon}>
          <Popup
            closeButton={false}
            minWidth={240}
            maxWidth={240}
            className="map-popup"
          >
            Lar das meninas
            <Link to="/orphanages/1">
              <FiArrowRight size={20} color="#FFF" />
            </Link>
          </Popup>
        </Marker>
      </Map>

      <Link to="/orphanages/create">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </Container>
  );
};

export default OrphanagesMap;
