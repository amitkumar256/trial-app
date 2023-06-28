import React, { useRef, useState, useEffect } from "react";
import { Stage, Layer, Image, Transformer } from "react-konva";

function Test() {
  const stageRef = useRef(null);
  const imageRef = useRef(null);
  const transformerRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (selectedImage) {
      // Attach transformer to the selected image when it changes
      transformerRef.current.nodes([imageRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selectedImage]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const image = new window.Image();
      image.src = reader.result;
      image.onload = () => {
        // Set the size of the image to half of the stage
        const stageWidth = stageRef.current.width();
        const stageHeight = stageRef.current.height();
        const width = stageWidth / 2;
        const height = (image.height / image.width) * width;
        setSelectedImage({ image, width, height });
      };
    };
    reader.readAsDataURL(file);
  };

  const handleClick = (event) => {
    // Check if the click event target is the image itself
    if (event.target === stageRef.current) {
      transformerRef.current.nodes([]);
      transformerRef.current.getLayer().batchDraw();
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <div className="bg-red-200" style={{ width: 400, height: 300 }}>
        <Stage
          className=""
          width={400}
          height={300}
          ref={stageRef}
          onClick={handleClick}
        >
          <Layer>
            {selectedImage && (
              <Image
                image={selectedImage.image}
                ref={imageRef}
                draggable
                onDragStart={(e) => {
                  e.target.setAttrs({ shadowOffsetX: 5, shadowOffsetY: 5 });
                }}
                onDragEnd={(e) => {
                  e.target.setAttrs({ shadowOffsetX: 0, shadowOffsetY: 0 });
                  stageRef.current.batchDraw();
                }}
                onClick={(e) => {
                  e.cancelBubble = true; // Prevent bubbling up to stage
                  transformerRef.current.nodes([e.target]);
                  transformerRef.current.getLayer().batchDraw();
                }}
                width={selectedImage.width}
                height={selectedImage.height}
              />
            )}
            <Transformer ref={transformerRef} />
          </Layer>
        </Stage>
      </div>
    </div>
  );
}

export default Test;
