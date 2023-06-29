import React, { useRef, useState, useEffect } from "react";
import { Stage, Layer, Image, Transformer, Text } from "react-konva";
import { SketchPicker } from "react-color";

function Test() {
  const stageRef = useRef(null);
  const imageRef = useRef(null);
  const transformerRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [textNodes, setTextNodes] = useState([]);
  const [inputText, setInputText] = useState("");
  const [selectedFont, setSelectedFont] = useState("Arial");
  const [fileName, setFileName] = useState(""); // State variable for file name
  const [selectedTextIndex, setSelectedTextIndex] = useState(-1);

  useEffect(() => {
    if (selectedImage) {
      // Attach transformer to the selected image when it changes
      transformerRef.current.nodes([imageRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selectedImage]);

  useEffect(() => {
    // Listen for "keydown" event on the document
    const handleKeyDown = (event) => {
      if (event.code === "Delete") {
        // "Delete" key is pressed
        if (transformerRef.current.nodes().length > 0) {
          // There is a selected element
          const selectedNode = transformerRef.current.nodes()[0];

          if (selectedNode === imageRef.current) {
            // Selected element is the image
            setSelectedImage(null);
            setFileName(""); // Clear the file name
          } else {
            // Selected element is a text node
            const updatedNodes = textNodes.filter(
              (node) => node !== selectedNode
            );
            setTextNodes(updatedNodes);
          }

          // Remove the selected node and clear the transformer
          selectedNode.destroy();
          transformerRef.current.nodes([]);
          stageRef.current.batchDraw();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener
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
        // Set the size of the image to half of the stage
        const stageWidth = stageRef.current.width();
        const stageHeight = stageRef.current.height();
        const width = stageWidth / 2;
        const height = (image.height / image.width) * width;
        setSelectedImage({ image, width, height });
        setFileName(file.name); // Update the file name
      };
    };
    reader.readAsDataURL(file);
  };

  const handleClick = (event) => {
    if (event.target === stageRef.current) {
      transformerRef.current.nodes([]);
      transformerRef.current.getLayer().batchDraw();
      setSelectedTextIndex(-1); // Deselect the text node when clicking on the stage
    } else if (event.target instanceof window.Konva.Text) {
      const clickedTextIndex = textNodes.findIndex(
        (node) => node === event.target
      );
      if (clickedTextIndex !== -1) {
        setSelectedTextIndex(clickedTextIndex);
        setTextColor(textNodes[clickedTextIndex].fill());
      } else {
        setSelectedTextIndex(-1);
        setTextColor("#ffffff");
      }
    }
  };

  const handleAddText = () => {
    const textNode = new window.Konva.Text({
      x: 20,
      y: 20,
      text: inputText,
      fontFamily: selectedFont, // Set the selected font
      fill:
        selectedTextIndex === -1
          ? textColor
          : textNodes[selectedTextIndex].fill(), // Use the selected text color if available
    });

    setTextNodes([...textNodes, textNode]);
    setInputText(""); // Clear the input field after adding text
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleFontChange = (event) => {
    const newFont = event.target.value;
    setSelectedFont(newFont);

    if (transformerRef.current.nodes().length > 0) {
      // There is a selected element
      const selectedNode = transformerRef.current.nodes()[0];

      if (selectedNode instanceof window.Konva.Text) {
        // Selected element is a text node
        selectedNode.fontFamily(newFont);
        stageRef.current.batchDraw();
      }
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
  const [textColor, setTextColor] = useState("#ffffff");
  const [showTextPicker, setShowTextPicker] = useState(false);
  const textPickerRef = useRef();
  const handleTextColorChange = (color) => {
    setTextColor(color.hex);

    if (selectedTextIndex !== -1) {
      const updatedNodes = [...textNodes];
      updatedNodes[selectedTextIndex] = updatedNodes[selectedTextIndex].clone(); // Clone the text node to avoid modifying the original
      updatedNodes[selectedTextIndex].fill(color.hex);
      setTextNodes(updatedNodes);
    }
  };

  return (
    <div onClick={handleParentClick}>
      <input id="file-input" type="file" onChange={handleFileChange} />
      <button onClick={() => setShowPicker(!showPicker)}>color picker</button>
      {showPicker && (
        <div className="absolute bottom-0 right-0 " ref={colorPickerRef}>
          <SketchPicker
            color={cardColor}
            onChangeComplete={handleChangeComplete}
          />
        </div>
      )}
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter text"
      />
      <div>
        <label
          onClick={() => setShowTextPicker(!showTextPicker)}
          htmlFor="text-color"
        >
          Text Color:
        </label>
        {showTextPicker && (
          <div className="absolute right-[250px] bottom-0" ref={textPickerRef}>
            <SketchPicker
              id="text-color"
              color={textColor}
              onChangeComplete={handleTextColorChange}
            />
          </div>
        )}
      </div>
      <select value={selectedFont} onChange={handleFontChange}>
        <option value="Arial">Arial</option>
        <option value="Helvetica">Helvetica</option>
        <option value="Times New Roman">Times New Roman</option>
        {/* Add more font options as needed */}
      </select>
      <button onClick={handleAddText}>Add Text</button>
      <div
        className=""
        style={{ background: cardColor, width: 400, height: 300 }}
      >
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
                  setSelectedTextIndex(index); // Set the selected text node index
                  setTextColor(textNode.fill()); // Set the text color to the selected text color
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
                  e.cancelBubble = true; // Prevent bubbling up to stage
                  transformerRef.current.nodes([e.target]);
                  transformerRef.current.getLayer().batchDraw();
                  setSelectedTextIndex(index); // Set the selected text node index
                  setTextColor(textNode.fill()); // Set the text color to the selected text color
                }}
                fontFamily={textNode.fontFamily()} // Set the font family of the text
                fill={selectedTextIndex === index ? textColor : textNode.fill()} // Use the selected text color if it matches the index
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
