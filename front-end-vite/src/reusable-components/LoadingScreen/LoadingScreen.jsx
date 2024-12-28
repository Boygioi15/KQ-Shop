import { useLoading } from "../../contexts/LoadingContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import './style.css'
const LoadingScreen = () => {
    const { isLoading } = useLoading();
  
    return (
      isLoading && (
        <div className="relative min-h-screen flex items-center justify-center">
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl flex flex-col items-center">
            <AiOutlineLoading3Quarters className="text-4xl text-black-500 animate-spin" />
            <p className="mt-4 text-gray-700 font-medium">Chờ tí nhé...</p>
          </div>
        </div>
      </div>
      )
    );
  };
  
  export default LoadingScreen;
  