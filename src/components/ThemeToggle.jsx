import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { LuSun, LuMoon } from 'react-icons/lu'

export const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="p-2 w-9 h-9" />
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:ring-2 ring-blue-400 transition-all"
      aria-label="Toggle Theme"
    >
      {resolvedTheme === 'dark' ? <LuSun size={20} /> : <LuMoon size={20} />}
    </button>
  )
}
