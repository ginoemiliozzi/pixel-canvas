import React from 'react';

import { Button, Grid } from '@mui/material';

import { SketchPicker, RGBColor } from 'react-color';

const Sidebar = ({
  onSubmit,
  onChangeColor,
  color,
}: {
  onSubmit: () => void;
  onChangeColor: (rgbColor: RGBColor) => void;
  color?: RGBColor;
}) => {
  return (
    <>
      <div
        style={{
          minWidth: '250px',
          display: 'flex',
          justifyContent: 'space-around',
          flexDirection: 'column',
          padding: '10px',
        }}>
        <div style={{ margin: 'auto' }}>
          <SketchPicker
            onChange={(newValue) => onChangeColor(newValue.rgb)}
            color={color}
            disableAlpha={true}
          />
        </div>
        <SubmitButton onClick={onSubmit} />
      </div>
    </>
  );
};

export default Sidebar;
