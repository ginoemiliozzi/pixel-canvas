import { SketchPicker, RGBColor } from 'react-color';
import SubmitButton from './SubmitButton';

const Sidebar = ({
  onSubmit,
  onChangeColor,
  color,
  remainingPixels,
  canvasFinished,
}: {
  remainingPixels: number;
  onSubmit: () => void;
  onChangeColor: (rgbColor: RGBColor) => void;
  color?: RGBColor;
  canvasFinished: boolean;
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
        <SubmitButton onClick={onSubmit} remainingPixels={remainingPixels} canvasFinished={canvasFinished}/>
      </div>
    </>
  );
};

export default Sidebar;
