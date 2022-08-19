import { useState, useEffect } from "react";

const useAudio = (url) => {
  const [song] = useState(
    new Audio(url)
  );
  const [play, setPlay] = useState(false);

  const toggle = () => setPlay(!play);

  useEffect(() => {
      play ? (song.loop = true,  song.play()) : song.pause();
  }, [play]);


  return [play, toggle];
};

export default useAudio