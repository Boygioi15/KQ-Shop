import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userDetail, setUserDetail] = useState(null);
  // Update the context state and persist to localStorage
  const signIn = (newToken) => {
    localStorage.setItem('token', newToken);
  };
  const signOut = () => {
    localStorage.removeItem('token');
  };
  const fetchUserDetail = async () => {
    const token = localStorage.getItem('token');
    if(!token){
      throw new Error('Không có token');
    }
    try {
      const response = await fetch('http://localhost:8000/api/auth/user-detail', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUserDetail(data);
    }catch (error) {
      if (error.response) {
          alert(`Lấy thông tin nguời dùng thất bại, lỗi: ` + error.response.data.msg);
          throw new Error(error.response.data.msg);
      } else if (error.request) {
          alert('Không nhận được phản hồi từ server');
          throw new Error(error.response.data.msg);
      } else {
          alert('Lỗi bất ngờ: ' + error.message);
          throw new Error(error.response.data.msg);
      }
    }
  };
  return (
    <AuthContext.Provider value={{signIn, signOut, userDetail, fetchUserDetail}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
