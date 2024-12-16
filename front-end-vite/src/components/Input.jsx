import React from 'react'

export const Input = ({ 
  label, 
  className = '', 
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        className={`w-full h-[40px] px-3 py-2 border border-gray-300 focus:outline-none focus:border-black ${className}`}
        {...props}
      />
    </div>
  )
}

