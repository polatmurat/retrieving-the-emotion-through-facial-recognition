const Playlist = ({ url }) => {
  return (
    <iframe
      style={{ borderRadius: "12px" }}
      src={url}
      width="100%"
      height="352"
      frameBorder="0"
      allowFullScreen=""
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
  );
};

export default Playlist;
