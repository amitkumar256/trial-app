import React, { useRef, useState, useEffect } from "react";
import { Stage, Layer, Image, Transformer, Text } from "react-konva";

function Test() {
  const stageRef = useRef(null);
  const imageRef = useRef(null);
  const transformerRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [textNodes, setTextNodes] = useState([]);
  const [inputText, setInputText] = useState("");
  const [selectedFont, setSelectedFont] = useState("Arial");

  useEffect(() => {
    if (selectedImage) {
      transformerRef.current.nodes([imageRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selectedImage]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Delete") {
        if (transformerRef.current.nodes().length > 0) {
          const selectedNode = transformerRef.current.nodes()[0];

          if (selectedNode === imageRef.current) {
            setSelectedImage(null);
          } else {
            const updatedNodes = textNodes.filter(
              (node) => node !== selectedNode
            );
            setTextNodes(updatedNodes);
          }
          selectedNode.destroy();
          transformerRef.current.nodes([]);
          stageRef.current.batchDraw();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [textNodes]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const image = new window.Image();
      image.src = reader.result;
      image.onload = () => {
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
    if (event.target === stageRef.current) {
      transformerRef.current.nodes([]);
      stageRef.current.batchDraw();
    }
  };

  const handleAddText = () => {
    const textNode = new window.Konva.Text({
      x: 20,
      y: 20,
      text: inputText,
      fontFamily: selectedFont,
      draggable: true,
    });

    setTextNodes([...textNodes, textNode]);
    setInputText("");
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleFontChange = (event) => {
    setSelectedFont(event.target.value);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter text"
      />
      <select value={selectedFont} onChange={handleFontChange}>
        <option value="Arial">Arial</option>
        <option value="Helvetica">Helvetica</option>
        <option value="Times New Roman">Times New Roman</option>
        {/* Add more font options as needed */}
      </select>
      <button onClick={handleAddText}>Add Text</button>
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
                  e.cancelBubble = true;
                  transformerRef.current.nodes([e.target]);
                  transformerRef.current.getLayer().batchDraw();
                }}
                width={selectedImage.width}
                height={selectedImage.height}
              />
            )}
            {textNodes.map((textNode, index) => (
              <Text
                key={index}
                text={textNode.text()}
                x={textNode.x()}
                y={textNode.y()}
                draggable
                onClick={(e) => {
                  e.cancelBubble = true;
                  transformerRef.current.nodes([e.target]);
                  transformerRef.current.getLayer().batchDraw();
                }}
                fontFamily={textNode.fontFamily()}
              />
            ))}
            <Transformer ref={transformerRef} />
          </Layer>
        </Stage>
      </div>
    </div>
  );
}

export default Test;
