import React, { useState, useEffect } from "react";

const useAudio = (url) => {
  const [song] = useState(
    new Audio(url)
  );
  const [play, setPlay] = useState(false);

  const toggle = () => setPlay(!play);

  useEffect(() => {
    play ? song.play() : song.pause();
  }, [play]);

  useEffect(() => {
    song.addEventListener("ended", () => setPlay(true));
    return () => {
      song.removeEventListener("ended", () => setPlay(true));
    };
  }, []);

  return [play, toggle];
};

export default useAudio