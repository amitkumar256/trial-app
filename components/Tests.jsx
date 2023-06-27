import React, { useRef } from "react";
import { Stage, Layer, Image, Transformer } from "react-konva";
import { SketchPicker } from "react-color";
import { useState } from "react";

function Tests(props) {
  const imageRef = useRef(null);
  const transformRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const img = new window.Image();
      img.src = reader.result;

      img.onload = () => {
        // Calculate maximum dimensions to fit the image within the canvas
        const maxWidth = 400;
        const maxHeight = 300;

        const aspectRatio = img.width / img.height;
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          width = maxWidth;
          height = width / aspectRatio;
        }

        if (height > maxHeight) {
          height = maxHeight;
          width = height * aspectRatio;
        }

        // Set the image properties and initial position
        imageRef.current.setAttrs({
          image: img,
          width,
          height,
          x: (maxWidth - width) / 2,
          y: (maxHeight - height) / 2,
          draggable: true,
        });

        // Update the transformer with the new image reference
        transformRef.current.nodes([imageRef.current]);
      };
    };

    reader.readAsDataURL(file);
  };
  const [showPicker, setShowPicker] = useState(false);
  const [cardColor, setCardColor] = useState("#000000");
  const handleChangeComplete = (color) => {
    setCardColor(color.hex);
  };

  const colorPickerRef = useRef();

  const handleParentClick = (event) => {
    if (
      showPicker &&
      (!colorPickerRef.current ||
        !colorPickerRef.current.contains(event.target))
    ) {
      setShowPicker(false);
    }
  };

  return (
    <div onClick={handleParentClick} className="h-screen">
      <input type="file" onChange={handleImageUpload} />
      <button onClick={() => setShowPicker(!showPicker)}>color picker</button>
      {showPicker && (
        <div className="absolute bottom-0 right-0 " ref={colorPickerRef}>
          <SketchPicker
            color={cardColor}
            onChangeComplete={handleChangeComplete}
          />
        </div>
      )}
      <div style={{ background: cardColor, width: 400, height: 300 }}>
        <Stage width={400} height={300}>
          <Layer>
            <Image ref={imageRef} />
            <Transformer ref={transformRef} />
          </Layer>
        </Stage>
      </div>
    </div>
  );
}

export default Tests;
