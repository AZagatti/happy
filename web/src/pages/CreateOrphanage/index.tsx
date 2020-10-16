import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";

import { FiPlus } from "react-icons/fi";

import Sidebar from "../../components/Sidebar";
import mapIcon from "../../utils/mapIcon";
import { Container } from "./styles";
import useForm from "../../hooks/useForm";
import api from "../../services/api";
import { useHistory } from "react-router-dom";

interface FormInputs {
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
}

export default function CreateOrphanage() {
  const history = useHistory();

  const [location, setLocation] = useState({
    latitude: -22.3525389,
    longitude: -48.7754833,
  });
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLocation({ latitude, longitude });
      },
      undefined,
      {
        timeout: 30000,
      }
    );
  }, []);

  const handleMapClick = useCallback((e: LeafletMouseEvent) => {
    setPosition({
      latitude: e.latlng.lat,
      longitude: e.latlng.lng,
    });
  }, []);

  const { values, handleChange } = useForm<FormInputs>({
    name: "",
    about: "",
    instructions: "",
    opening_hours: "",
  });

  const handleSelectImages = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const imagesArray = Array.from(e.target.files);

    setImages(imagesArray);
    setPreviewImages(imagesArray.map((image) => URL.createObjectURL(image)));
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const { latitude, longitude } = position;

      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("about", values.about);
      formData.append("instructions", values.instructions);
      formData.append("opening_hours", values.opening_hours);
      formData.append("latitude", String(latitude));
      formData.append("longitude", String(longitude));
      formData.append("open_on_weekends", String(open_on_weekends));
      images.forEach((image) => {
        formData.append("images", image);
      });

      try {
        await api.post("orphanages", formData);
        history.push("/app");
      } catch (err) {
        alert("Erro ao cadastrar orfanato");
      }
    },
    [values, position, open_on_weekends, history, images]
  );

  return (
    <Container>
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[location.latitude, location.longitude]}
              style={{ width: "100%", height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {position.latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[position.latitude, position.longitude]}
                />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                onChange={handleChange}
                value={values.name}
                name="name"
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                id="about"
                onChange={handleChange}
                value={values.about}
                name="about"
                maxLength={300}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map((image) => (
                  <img src={image} key={image} alt={values.name} />
                ))}
                <label className="new-image" htmlFor="image[]">
                  <FiPlus size={24} color="#15b6d6" />

                  <input
                    multiple
                    onChange={handleSelectImages}
                    type="file"
                    id="image[]"
                    name="image[]"
                  />
                </label>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                onChange={handleChange}
                value={values.instructions}
                name="instructions"
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input
                id="opening_hours"
                onChange={handleChange}
                value={values.opening_hours}
                name="opening_hours"
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={open_on_weekends ? "active" : ""}
                  onClick={() => {
                    setOpenOnWeekends(true);
                  }}
                >
                  Sim
                </button>
                <button
                  className={!open_on_weekends ? "active" : ""}
                  type="button"
                  onClick={() => {
                    setOpenOnWeekends(false);
                  }}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </Container>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
