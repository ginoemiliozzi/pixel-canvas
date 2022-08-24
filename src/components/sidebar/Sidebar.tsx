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
    <Grid>
      <SketchPicker
        onChange={(newValue) => onChangeColor(newValue.rgb)}
        color={color}
      />

      <Button onClick={onSubmit} variant="outlined">
        submit
      </Button>
    </Grid>
  );
};

export default Sidebar;
