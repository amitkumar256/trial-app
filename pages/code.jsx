import React, { useRef, useState, useEffect } from "react";

const CanvasComp = () => {
  const canvasRef = useRef(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const handleCanvasDraw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw uploaded image if available
      if (uploadedImage) {
        ctx.drawImage(
          uploadedImage,
          imagePosition.x,
          imagePosition.y,
          200,
          200
        );
      }
    };

    handleCanvasDraw();
  }, [uploadedImage, imagePosition]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const image = new Image();
      image.src = event.target.result;
      image.onload = () => {
        setUploadedImage(image);
      };
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDown = (e) => {
    setDragging(true);
    setOffsetX(e.nativeEvent.offsetX - imagePosition.x);
    setOffsetY(e.nativeEvent.offsetY - imagePosition.y);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      const x = e.nativeEvent.offsetX - offsetX;
      const y = e.nativeEvent.offsetY - offsetY;
      setImagePosition({ x, y });
    }
  };

  return (
    <div className="flex justify-center">
      <canvas
        className="bg-yellow-200"
        ref={canvasRef}
        width={400}
        height={400}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{ border: "1px solid black" }}
      />

      <input type="file" onChange={handleImageUpload} />
    </div>
  );
};

export default CanvasComp;
