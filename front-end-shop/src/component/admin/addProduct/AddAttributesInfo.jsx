import React, { useState, useEffect } from "react";
import { AiOutlineEdit, AiOutlineCheck, AiOutlineDelete } from "react-icons/ai";

const AddAttributesInfo = ({ productData, onUpdateAttributes }) => {
  const [attributes, setAttributes] = useState([]); // List of attributes
  const [editingPropertyName, setEditingPropertyName] = useState(null); // Editing state for attribute names

  // Update attributes and synchronize with the parent component
  const setAttributesWithCallback = (updatedAttributes) => {
    setAttributes(updatedAttributes);
    if (onUpdateAttributes) {
      onUpdateAttributes(updatedAttributes); // Send updated data to the parent
    }
  };

  useEffect(() => {
    if (productData.attributes && productData.attributes.length > 0) {
      setAttributes(productData.attributes);
    } else {
      setAttributes([]);
    }
  }, [productData]);

  const handleAddProperty = () => {
    const newProperty = {
      displayName: `Thuộc tính ${attributes.length + 1}`,
      value: "",
    };
    setAttributesWithCallback([...attributes, newProperty]);
  };

  const handleDeleteProperty = (propertyIndex) => {
    const updatedAttributes = attributes.filter((_, index) => index !== propertyIndex);
    setAttributesWithCallback(updatedAttributes);
  };

  const handleSavePropertyName = () => {
    setEditingPropertyName(null); // Reset editing state
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Thuộc tính sản phẩm</h2>

      {attributes.map((property, propertyIndex) => (
        <div key={propertyIndex} className="flex items-center gap-4 mb-4">
          {/* Display Name */}
          <div className="flex items-center w-1/3">
            {editingPropertyName === propertyIndex ? (
              <div className="flex items-center gap-2 w-full">
                <input
                  type="text"
                  value={property.displayName}
                  onChange={(e) => {
                    const updatedAttributes = [...attributes];
                    updatedAttributes[propertyIndex].displayName = e.target.value;
                    setAttributesWithCallback(updatedAttributes);
                  }}
                  className="border rounded-md px-2 py-1 w-full"
                />
              </div>
            ) : (
              <span>{property.displayName}</span>
            )}
          </div>

          {/* Input Value */}
          <input
            type="text"
            value={property.value}
            onChange={(e) => {
              const updatedAttributes = [...attributes];
              updatedAttributes[propertyIndex].value = e.target.value;
              setAttributesWithCallback(updatedAttributes);
            }}
            className="border rounded-md px-2 py-1 w-2/3"
          />

          {/* Edit and Delete Icons */}
          <div className="flex gap-2">
            {editingPropertyName === propertyIndex ? (
              <AiOutlineCheck
                onClick={handleSavePropertyName}
                className="text-green-500 cursor-pointer"
              />
            ) : (
              <AiOutlineEdit
                onClick={() => setEditingPropertyName(propertyIndex)}
                className="text-blue-500 cursor-pointer"
              />
            )}
            <AiOutlineDelete
              onClick={() => handleDeleteProperty(propertyIndex)}
              className="text-red-500 cursor-pointer"
            />
          </div>
        </div>
      ))}

      {/* Add Property */}
      <button
        onClick={handleAddProperty}
        className="text-blue-500 border border-blue-500 px-2 py-1 rounded-md hover:bg-blue-500 hover:text-white"
      >
        + Thêm thuộc tính
      </button>
    </div>
  );
};

export default AddAttributesInfo;
