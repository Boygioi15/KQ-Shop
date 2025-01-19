import React, { useState } from "react";
import mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist/webpack";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; 
const AddProductForm = ({ productData, handleChange }) => {
  const [file, setFile] = useState(null);

  // Hàm xử lý đọc nội dung file
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const fileType = selectedFile.type;

      // Kiểm tra loại tệp và xử lý tương ứng
      if (fileType === "text/plain") {
        readTextFile(selectedFile);
      } else if (
        fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        readDocxFile(selectedFile);
      } else if (fileType === "application/pdf") {
        readPdfFile(selectedFile);
      } else {
        alert("Loại tệp không hỗ trợ");
      }
    }
  };

  // Hàm đọc tệp .txt
  const readTextFile = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const fileContent = reader.result; // Nội dung của file dưới dạng text
      handleChange({ target: { name: "description", value: fileContent } });
    };
    reader.readAsText(file); // Đọc file dưới dạng văn bản
  };

  // Hàm đọc tệp .docx sử dụng mammoth
  const readDocxFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const arrayBuffer = e.target.result;
      mammoth
        .extractRawText({ arrayBuffer })
        .then((result) => {
          handleChange({
            target: { name: "description", value: result.value },
          });
        })
        .catch((err) => {
          alert("Đọc tệp .docx thất bại");
        });
    };
    reader.readAsArrayBuffer(file); // Đọc file dưới dạng ArrayBuffer
  };

  // Hàm đọc tệp .pdf sử dụng pdfjs-dist
  const readPdfFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const typedArray = new Uint8Array(e.target.result);
      pdfjsLib
        .getDocument(typedArray)
        .promise.then((pdf) => {
          let text = "";
          const totalPages = pdf.numPages;
          const pagesPromises = [];

          for (let i = 1; i <= totalPages; i++) {
            pagesPromises.push(
              pdf.getPage(i).then((page) => {
                return page.getTextContent().then((content) => {
                  content.items.forEach((item) => {
                    text += item.str + " ";
                  });
                });
              })
            );
          }

          Promise.all(pagesPromises).then(() => {
            handleChange({ target: { name: "description", value: text } });
          });
        })
        .catch((err) => {
          alert("Đọc tệp .pdf thất bại");
        });
    };
    reader.readAsArrayBuffer(file); // Đọc file dưới dạng ArrayBuffer
  };

  // Tùy chỉnh modules của React Quill
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      ["link"],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ["image"],
    ],
  };

  return (
    <>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
          Tên sản phẩm
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={productData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nhập tên sản phẩm"
        />
      </div>
    </>
  );
};

export default AddProductForm;
