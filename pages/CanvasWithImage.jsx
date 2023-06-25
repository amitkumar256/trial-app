import React, { useRef, useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import { fabric } from "fabric";

function CanvasWithImage() {
  const canvasRef = useRef(null);
  let canvas;
  let fabricImg;

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const imgData = reader.result;

      fabric.Image.fromURL(imgData, (img) => {
        if (fabricImg) {
          canvas.remove(fabricImg);
        }

        const maxWidth = canvas.getWidth();
        const maxHeight = canvas.getHeight();

        const aspectRatio = img.width / img.height;
        let width = maxWidth;
        let height = maxWidth / aspectRatio;

        if (height > maxHeight) {
          height = maxHeight;
          width = maxHeight * aspectRatio;
        }

        fabricImg = img.set({
          left: 0,
          top: 0,
          scaleX: width / img.width,
          scaleY: height / img.height,
        });

        canvas.add(fabricImg);
        canvas.renderAll();
      });
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    canvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
    });

    return () => {
      canvas.dispose();
    };
  }, []);
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
    <div onClick={handleParentClick}>
      <input className="" type="file" onChange={handleImageUpload} />
      <button onClick={() => setShowPicker(!showPicker)}>color picker</button>
      {showPicker && (
        <div className="absolute bottom-0 right-0 " ref={colorPickerRef}>
          <SketchPicker
            color={cardColor}
            onChangeComplete={handleChangeComplete}
          />
        </div>
      )}
      <div
        style={{
          backgroundColor: cardColor,
          width: "800px",
          height: "600px",
          overflow: "hidden", // Hide overflow from the container
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute", // Position the canvas absolutely within the container
            top: "0",
            left: "0",
          }}
        />
      </div>
    </div>
  );
}

export default CanvasWithImage;
