import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Playlist from "../components/Playlist";

const ChangeMood = () => {
  const navigate = useNavigate();
  const dominantEmotion = useSelector(
    (state) => state.changeMood.dominantEmotion
  );

  let url;

  useEffect(() => {
    if (!dominantEmotion) {
      navigate("/");
    }
  }, [dominantEmotion, navigate]);

  if (!dominantEmotion) {
    return;
  }

  switch (dominantEmotion.toLowerCase()) {
    case "happy":
      url =
        "https://open.spotify.com/embed/playlist/37i9dQZF1DXdPec7aLTmlC?utm_source=generator&theme=0";
      // src="https://open.spotify.com/embed/playlist/37i9dQZF1DXdPec7aLTmlC?utm_source=generator"
      break;
    case "sad":
      url =
        "https://open.spotify.com/embed/playlist/37i9dQZF1DX7qK8ma5wgG1?utm_source=generator&theme=0";
      // src="https://open.spotify.com/embed/playlist/37i9dQZF1DX7qK8ma5wgG1?utm_source=generator"
      break;
    case "angry":
      url =
        "https://open.spotify.com/embed/playlist/37i9dQZF1DX1s9knjP51Oa?utm_source=generator&theme=0";
      // src="https://open.spotify.com/embed/playlist/37i9dQZF1DX1s9knjP51Oa?utm_source=generator"
      break;
    default:
      url =
        "https://open.spotify.com/embed/playlist/37i9dQZF1EQncLwOalG3K7?utm_source=generator&theme=0";
      // src="https://open.spotify.com/embed/playlist/37i9dQZF1EQncLwOalG3K7?utm_source=generator"
      break;
  }

  return (
    <div>
      <h1>{dominantEmotion}</h1>
      <Playlist url={url} />
    </div>
  );
};

export default ChangeMood;
