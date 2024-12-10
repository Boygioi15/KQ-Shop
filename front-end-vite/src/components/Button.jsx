import React, { useState } from 'react'

export const Button = ({ 
  children, 
  className = '', 
  variant = 'primary', 
  ...props 
}) => {
  // Define the base styles and variant styles
  const baseStyles = 'px-4 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors'
  const variantStyles = {
    primary: 'bg-black text-white hover:bg-black/90 focus:ring-black',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
    clicked: 'bg-gray-300 text-black', // New style for the clicked state
  }

  // Add state to track button click
  const [isClicked, setIsClicked] = useState(false)

  // Modify to include your new styling (full width, centered text, and font weight)
  const updatedStyles = 'w-full text-center font-semibold h-[44px]'

  // Handle click event
  const handleClick = (e) => {
    setIsClicked(true) // Set clicked state
    if (props.onClick) props.onClick(e) // Call passed onClick handler if provided

    // Reset the clicked state after a delay (optional)
    setTimeout(() => setIsClicked(false), 200)
  }

  return (
    <button 
      type="submit"
      className={`${baseStyles} ${
        isClicked ? variantStyles.clicked : variantStyles[variant]
      } ${updatedStyles} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  )
}
