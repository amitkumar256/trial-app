import React, { useRef, useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import { fabric } from "fabric";

function CanvasWithImage() {
  const canvasRef = useRef(null);
  const fabricImgRef = useRef(null);
  const canvasInstanceRef = useRef(null);
  const [showPicker, setShowPicker] = useState(false);
  const [cardColor, setCardColor] = useState("#ffffff");
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

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
    });

    canvasInstanceRef.current = canvas;

    return () => {
      canvas.dispose();
    };
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const imgData = reader.result;

      fabric.Image.fromURL(imgData, (img) => {
        const canvas = canvasInstanceRef.current;

        if (fabricImgRef.current) {
          canvas.remove(fabricImgRef.current);
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

        const fabricImg = img.set({
          left: 0,
          top: 0,
          scaleX: width / img.width,
          scaleY: height / img.height,
        });

        fabricImgRef.current = fabricImg;

        canvas.add(fabricImg);
        canvas.renderAll();
      });
    };

    reader.readAsDataURL(file);
  };

  const addText = () => {
    const canvas = canvasInstanceRef.current;
    const text = new fabric.Textbox("Your Text", {
      left: canvas.getWidth() / 2,
      top: canvas.getHeight() / 2,
      fontSize: 20,
      fill: "#000000",
      borderColor: "#000000",
      cornerColor: "#000000",
      cornerSize: 6,
      transparentCorners: false,
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
  };

  return (
    <div onClick={handleParentClick}>
      <input className="" type="file" onChange={handleImageUpload} />
      <button onClick={() => setShowPicker(!showPicker)}>color picker</button>
      <button onClick={addText}>Add Text</button>
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
