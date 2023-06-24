import React, { useRef, useState, useEffect } from "react";
import { SketchPicker } from "react-color";

const CanvasComp = () => {
  const canvasRef = useRef(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [imageSize, setImageSize] = useState({ width: 200, height: 200 });

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
          imageSize.width,
          imageSize.height
        );

        // Draw resize handle
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        const resizeHandleSize = 10;
        const resizeHandleX =
          imagePosition.x + imageSize.width - resizeHandleSize;
        const resizeHandleY =
          imagePosition.y + imageSize.height - resizeHandleSize;
        ctx.fillRect(
          resizeHandleX,
          resizeHandleY,
          resizeHandleSize,
          resizeHandleSize
        );
      }
    };

    handleCanvasDraw();
  }, [uploadedImage, imagePosition, imageSize]);

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
    const mouseX = e.nativeEvent.offsetX;
    const mouseY = e.nativeEvent.offsetY;

    // Check if resize handle is clicked
    if (
      mouseX > imagePosition.x + imageSize.width - 10 &&
      mouseX < imagePosition.x + imageSize.width + 10 &&
      mouseY > imagePosition.y + imageSize.height - 10 &&
      mouseY < imagePosition.y + imageSize.height + 10
    ) {
      setResizing(true);
      document.body.style.cursor = "nwse-resize"; // Set resizing cursor
    } else {
      setDragging(true);
      setOffsetX(mouseX - imagePosition.x);
      setOffsetY(mouseY - imagePosition.y);
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
    setResizing(false);
    document.body.style.cursor = "auto"; // Reset cursor
  };

  const handleMouseMove = (e) => {
    const mouseX = e.nativeEvent.offsetX;
    const mouseY = e.nativeEvent.offsetY;

    if (
      mouseX > imagePosition.x + imageSize.width - 10 &&
      mouseX < imagePosition.x + imageSize.width + 10 &&
      mouseY > imagePosition.y + imageSize.height - 10 &&
      mouseY < imagePosition.y + imageSize.height + 10
    ) {
      document.body.style.cursor = "nwse-resize"; // Set resize cursor
    } else {
      document.body.style.cursor = "auto"; // Reset cursor
    }

    if (dragging) {
      const x = mouseX - offsetX;
      const y = mouseY - offsetY;
      setImagePosition({ x, y });
    }

    if (resizing) {
      const width = mouseX - imagePosition.x;
      const height = mouseY - imagePosition.y;
      setImageSize({ width, height });
    }
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
    <div
      className="flex justify-between gap-10 h-screen max-w-[1208px] mx-auto items-center"
      onClick={handleParentClick}
    >
      <div className="">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{
            border: "1px solid black",
            backgroundColor: cardColor,
            cursor: resizing ? "nwse-resize" : "auto",
          }}
        />
      </div>
      <div className="">
        <div>
          <input type="file" onChange={handleImageUpload} />
        </div>
        <div>
          <button onClick={() => setShowPicker(!showPicker)}>
            color picker
          </button>
          {showPicker && (
            <div className="absolute bottom-0 left-0 " ref={colorPickerRef}>
              <SketchPicker
                color={cardColor}
                onChangeComplete={handleChangeComplete}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CanvasComp;
