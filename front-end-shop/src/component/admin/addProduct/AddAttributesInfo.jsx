import React, { useState, useEffect } from "react";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';

const AddAttributesInfo = ({ productData, onUpdateAttributes }) => {
  const [attributes, setAttributes] = useState([]); // Initialize as an array
  const [errorMessages, setErrorMessages] = useState({}); // To track validation errors

  // Function to update local attributes and notify parent
  const setAttributesWithCallback = (updatedAttributes) => {
    setAttributes(updatedAttributes);
    if (onUpdateAttributes) {
      onUpdateAttributes(updatedAttributes);
    }
  };

  useEffect(() => {
    if (productData.attributes && Array.isArray(productData.attributes)) {
      setAttributes(productData.attributes);
    } else {
      setAttributes([]);
    }
  }, [productData]);

  // Handle adding a new attribute
  const handleAddAttribute = () => {
    const newAttribute = { id: uuidv4(), name: "", value: "" };
    setAttributesWithCallback([...attributes, newAttribute]);
  };

  // Handle changes to attribute name or value with validation
  const handleChangeAttribute = (id, field, value) => {
    const updatedAttributes = attributes.map(attr => {
      if (attr.id === id) {
        return { ...attr, [field]: value };
      }
      return attr;
    });

    // Validation for attribute names
    let errors = { ...errorMessages };
    if (field === "name") {
      const names = updatedAttributes.map(attr => attr.name.trim());
      const hasDuplicates = names.some((name, index) => name !== "" && names.indexOf(name) !== index);

      if (value.trim() === "") {
        errors[id] = "Tên thuộc tính không được để trống.";
      } else if (hasDuplicates) {
        errors[id] = "Tên thuộc tính phải là duy nhất.";
      } else {
        delete errors[id];
      }
    }

    setErrorMessages(errors);
    setAttributesWithCallback(updatedAttributes);
  };

  // Handle deleting an attribute with confirmation
  const handleDeleteAttribute = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa thuộc tính này?")) {
      const updatedAttributes = attributes.filter(attr => attr.id !== id);
      setAttributesWithCallback(updatedAttributes);
      
      // Remove any associated error message
      const updatedErrors = { ...errorMessages };
      delete updatedErrors[id];
      setErrorMessages(updatedErrors);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Thuộc tính sản phẩm</h2>

      {/* Render attributes as list */}
      <ul className="mb-4">
        {attributes.map((attribute) => (
          <li key={attribute.id} className="flex items-center gap-4 mb-2">
            {/* Attribute Name */}
            <div className="flex-1">
              <input
                type="text"
                value={attribute.name}
                onChange={(e) => handleChangeAttribute(attribute.id, "name", e.target.value)}
                placeholder="Tên thuộc tính"
                className={`border rounded-md px-2 py-1 w-full ${errorMessages[attribute.id] ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errorMessages[attribute.id] && (
                <p className="text-red-500 text-sm mt-1">{errorMessages[attribute.id]}</p>
              )}
            </div>

            {/* Attribute Value */}
            <div className="flex-1">
              <input
                type="text"
                value={attribute.value}
                onChange={(e) => handleChangeAttribute(attribute.id, "value", e.target.value)}
                placeholder="Giá trị"
                className="border rounded-md px-2 py-1 w-full"
              />
            </div>

            {/* Delete Button */}
            <button
              type="button"
              onClick={() => handleDeleteAttribute(attribute.id)}
              className="text-red-500 hover:text-red-700"
              title="Xóa thuộc tính"
            >
              <AiOutlineDelete size={20} />
            </button>
          </li>
        ))}
      </ul>

      {/* Add New Attribute Button */}
      <button
        onClick={handleAddAttribute}
        className="text-blue-500 border border-blue-500 px-2 py-1 rounded-md hover:bg-blue-500 hover:text-white"
      >
        + Thêm thuộc tính
      </button>
    </div>
  );
};

export default AddAttributesInfo;