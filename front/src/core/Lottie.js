import React, { useEffect } from 'react';
import lottie from 'lottie-web';

const Lottie = ({ animationData, width, height, itemKey }) => {

  useEffect(() => {
    const instance = lottie.loadAnimation({
      container: document.getElementById(itemKey),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData
    });

    return () => instance.destroy();
  }, [animationData, itemKey]);

  return <div style={{ width, height }} id={itemKey}/>
};

export default Lottie;
