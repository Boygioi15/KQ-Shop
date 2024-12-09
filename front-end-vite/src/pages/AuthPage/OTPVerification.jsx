import React, { useState, useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { Button } from '../../components/Button'
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function OTPVerification({ setShowOTPModal, token, registerDto, phone, isLogin }) {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [timeLeft, setTimeLeft] = useState(56)
  const [isResending, setIsResending] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef([])
  const { signIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [timeLeft])

  const handleChange = (index, value) => {
    if (isNaN(value)) return
    
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value !== '' && index < 5) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1].focus()
    }
  }

  const handleResend = async () => {
    setIsResending(true);
    try {
      const response = await fetch('http://localhost:8000/api/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerDto),
      });

      if (response.ok) {
        console.log('OTP resent successfully');
        setTimeLeft(56); // Reset the countdown timer
      } else {
        console.error('Failed to resend OTP');
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
    } finally {
      setIsResending(false);
    }
  };

  const closeOTPModal = () => {
    setShowOTPModal(false);
  };

  const handleVerifyOtp = async () => {
    setIsSubmitting(true);
    const verifyOtpDto = isLogin ? { otp: otp.join(''), phone } : { otp: otp.join('') };
    const url = isLogin ? 'http://localhost:8000/api/auth/sign-in/verify-otp' : 'http://localhost:8000/api/auth/register/verify-otp';
    const headers = isLogin ? { 'Content-Type': 'application/json',} : { 'Content-Type': 'application/json', 'Authorization': token };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(verifyOtpDto),
      });

      if (response.ok) {
        const data = response.json();
        const newToken = data.token;
        signIn(newToken);
        setShowOTPModal(false);
        navigate('/');
      } else {
        console.error('OTP verification failed');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <button onClick={closeOTPModal} className="text-gray-400">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold mb-2">Xác nhận OTP</h1>
        <p className="text-gray-600 text-sm">
          Mã xác nhận đã được gửi đến {isLogin ? phone : registerDto.identifier}
        </p>
      </div>

      <div className="mb-6">
        <div className="flex justify-center gap-2 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="text"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(index, e.target.value)}
              onKeyDown={e => handleKeyDown(index, e)}
              className="w-12 h-12 text-center border border-gray-300 rounded-md text-lg font-semibold focus:border-black focus:outline-none"
            />
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 text-sm">
          <span className="text-gray-500">{timeLeft}s</span>
        </div>
        <div>
        <button
            onClick={handleResend}
            disabled={isResending || timeLeft > 0}
            className="flex items-center text-blue-600 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 mr-1">
              <path
                fill="currentColor"
                d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"
              />
            </svg>
            Gửi lại OTP
          </button>
        </div>
      </div>

      <Button
        onClick={handleVerifyOtp}
        disabled={isSubmitting}>
        XÁC NHẬN
      </Button>

      <p className="text-center text-xs text-gray-500 mt-4">
          Tiếp tục, bạn sẽ đồng ý <a href="#" className="text-blue-500">Chính sách bảo mật</a> & <a href="#" className="text-blue-500">Cookie</a> và <a href="#" className="text-blue-500">Điều khoản</a> và <a href="#" className="text-blue-500">Điều kiện</a> của chúng tôi.
      </p>
    </div>
  )
}

