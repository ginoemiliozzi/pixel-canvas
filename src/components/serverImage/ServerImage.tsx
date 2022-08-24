import React, { useEffect, useState } from 'react';
import { ImageDimensions } from '../../constants';
import { subscribeOnNewSnapshot } from '../../util/db';

const ServerImage = () => {
  const [dataUrl, setDataUrl] = useState('');
  useEffect(() => {
    subscribeOnNewSnapshot(setDataUrl);
  }, []);

  return (
    <img
      src={dataUrl}
      alt="amazing art"
      style={{
        width: ImageDimensions.width,
        height: ImageDimensions.height,
        border: '1px solid hotpink',
      }}
    />
  );
};

export default ServerImage;
