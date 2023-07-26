import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ChangeMood = () => {
  const navigate = useNavigate();
  const dominantEmotion = useSelector(
    (state) => state.changeMood.dominantEmotion
  );

  useEffect(() => {
    if (!dominantEmotion) {
      navigate("/");
    }
  }, [dominantEmotion, navigate]);

  if (!dominantEmotion) {
    return;
  }

  return (
    <div>
      <h1>{dominantEmotion}</h1>
      <iframe
        style={{ borderRadius: "12px" }}
        src="https://open.spotify.com/embed/playlist/37i9dQZF1DWSf2RDTDayIx?utm_source=generator&theme=0"
        width="100%"
        height="352"
        frameBorder="0"
        allowFullScreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
      <iframe
        style={{ borderRadius: "12px" }}
        src="https://open.spotify.com/embed/playlist/37i9dQZF1DWSf2RDTDayIx?utm_source=generator"
        width="100%"
        height="352"
        frameBorder="0"
        allowFullScreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default ChangeMood;
