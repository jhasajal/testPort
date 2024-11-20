import { useState, useEffect } from 'react'

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null })
  const [scrollY, setScrollY] = useState(0)

  const updateMousePosition = e => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  const updateScrollPosition = () => {
    setScrollY(window.scrollY)
  }

  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('scroll', updateScrollPosition)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('scroll', updateScrollPosition)
    }
  }, [])

  return { x: mousePosition.x, y: mousePosition.y, scrollY }
}

export default useMousePosition
