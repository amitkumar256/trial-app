import React, { useRef, useEffect } from "react";

function CanvasWithImage() {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  let isDragging = false;
  let prevMousePosition = { x: 0, y: 0 };
  let rotation = 0;
  let scale = 1;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    function drawImage() {
      context.clearRect(0, 0, canvas.width, canvas.height);

      if (imageRef.current) {
        context.save();
        context.translate(canvas.width / 2, canvas.height / 2);
        context.rotate(rotation);
        context.scale(scale, scale);
        context.drawImage(
          imageRef.current,
          -imageRef.current.width / 2,
          -imageRef.current.height / 2
        );
        context.restore();
      }
    }

    function handleMouseDown(event) {
      const { offsetX, offsetY } = event.nativeEvent;
      const canvasCenter = { x: canvas.width / 2, y: canvas.height / 2 };

      const mouseX = offsetX - canvasCenter.x;
      const mouseY = offsetY - canvasCenter.y;

      if (
        mouseX >= -imageRef.current.width / 2 &&
        mouseX <= imageRef.current.width / 2 &&
        mouseY >= -imageRef.current.height / 2 &&
        mouseY <= imageRef.current.height / 2
      ) {
        isDragging = true;
        prevMousePosition = { x: mouseX, y: mouseY };
      }
    }

    function handleMouseMove(event) {
      if (isDragging) {
        const { offsetX, offsetY } = event.nativeEvent;
        const canvasCenter = { x: canvas.width / 2, y: canvas.height / 2 };

        const mouseX = offsetX - canvasCenter.x;
        const mouseY = offsetY - canvasCenter.y;

        const deltaX = mouseX - prevMousePosition.x;
        const deltaY = mouseY - prevMousePosition.y;

        prevMousePosition = { x: mouseX, y: mouseY };

        rotation += (deltaX * Math.PI) / 180;
        scale += deltaY / 100;

        drawImage();
      }
    }

    function handleMouseUp() {
      isDragging = false;
    }

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  function handleImageUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        imageRef.current = img;
        drawImage(); // Call the drawImage function to render the uploaded image
      };
      img.src = reader.result;
    };

    reader.readAsDataURL(file);
  }

  function drawImage() {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);

    if (imageRef.current) {
      context.save();
      context.translate(canvas.width / 2, canvas.height / 2);
      context.rotate(rotation);
      context.scale(scale, scale);
      context.drawImage(
        imageRef.current,
        imageRef.current.width / 2,

        imageRef.current.height / 2
      );
      context.restore();
    }
  }

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      <canvas ref={canvasRef} width={800} height={600} />
    </div>
  );
}

export default CanvasWithImage;
