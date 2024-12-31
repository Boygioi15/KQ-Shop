const ProductInfo = () => {
  return (
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-800">Product information</h3>
      <table className="w-full table-auto mt-4">
        <tbody className="divide-y divide-gray-300">
          <tr>
            <td className="p-2 text-sm text-gray-800 font-bold">TYPE</td>
            <td className="p-2 text-sm text-gray-800">LAPTOP</td>
          </tr>
          <tr>
            <td className="p-2 text-sm text-gray-800 font-bold">RAM</td>
            <td className="p-2 text-sm text-gray-800">16 GB</td>
          </tr>
          <tr>
            <td className="p-2 text-sm text-gray-800 font-bold">SSD</td>
            <td className="p-2 text-sm text-gray-800">1000 GB</td>
          </tr>
          <tr>
            <td className="p-2 text-sm text-gray-800 font-bold">
              PROCESSOR TYPE
            </td>
            <td className="p-2 text-sm text-gray-800">INTEL CORE I7-12700H</td>
          </tr>
          <tr>
            <td className="p-2 text-sm text-gray-800 font-bold">
              PROCESSOR SPEED
            </td>
            <td className="p-2 text-sm text-gray-800">2.3 - 4.7 GHz</td>
          </tr>
          <tr>
            <td className="p-2 text-sm text-gray-800 font-bold">
              DISPLAY SIZE INCH
            </td>
            <td className="p-2 text-sm text-gray-800">16.0</td>
          </tr>
          <tr>
            <td className="p-2 text-sm text-gray-800 font-bold">
              DISPLAY SIZE CM
            </td>
            <td className="p-2 text-sm text-gray-800">40.64 cm</td>
          </tr>
          <tr>
            <td className="p-2 text-sm text-gray-800 font-bold">
              DISPLAY TYPE
            </td>
            <td className="p-2 text-sm text-gray-800">
              OLED, TOUCHSCREEN, 120 Hz
            </td>
          </tr>
          <tr>
            <td className="p-2 text-sm text-gray-800 font-bold">
              DISPLAY RESOLUTION
            </td>
            <td className="p-2 text-sm text-gray-800">2880x1620</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductInfo;
