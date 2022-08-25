import { SketchPicker, RGBColor } from 'react-color';
import SubmitButton from './SubmitButton';

const Sidebar = ({
  onSubmit,
  onChangeColor,
  color,
  remainingPixels,
}: {
  remainingPixels: number;
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
          // justifyContent: 'space-around',
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
        <SubmitButton onClick={onSubmit} remainingPixels={remainingPixels} />
      </div>
    </>
  );
};

export default Sidebar;
