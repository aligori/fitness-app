import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

const Lottie = ({ animationData, width, height }) => {
  const element = useRef(null);
  const lottieInstance = useRef();

  useEffect(() => {
    if (element.current) {
      lottieInstance.current = lottie.loadAnimation({
        animationData,
        container: element.current
      });
    }
  }, [animationData]);

  return <div style={{ width, height }} ref={element} />;
};

export default Lottie;
