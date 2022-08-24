import React, { useEffect, useState } from 'react';
import { ImageDimensions } from '../../constants';
import { subscribeOnNewSnapshot } from '../../util/db';

const ServerImage = () => {
  const [dataUrl, setDataUrl] = useState<string>();
  useEffect(() => {
    subscribeOnNewSnapshot(setDataUrl);
  }, []);

  return dataUrl ? (
    <img
      src={dataUrl}
      alt="amazing art"
      style={{
        width: ImageDimensions.width,
        height: ImageDimensions.height,
      }}
    />
  ) : null;
};

export default ServerImage;
