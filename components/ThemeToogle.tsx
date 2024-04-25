import { useEffect, useState } from 'react';
import { FaMoon } from 'react-icons/fa';
import { useTheme } from 'next-themes'
import { BsSunFill } from 'react-icons/bs';

const ThemeToogle = () => {
  const [darkMode, setDarkMode] = useState(true);
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme == 'dark') setDarkMode(true);
  }, []);

   // Função para alternar entre os temas
   const toggleTheme = () => {
    // Inverte o tema atual
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setDarkMode(!darkMode)
  };

  return (
    <>
      <div
        className="relative  w-14 h-6 flex items-center  bg-[#3a37c5] cursor-pointer rounded-full p-1"
        onClick={() => toggleTheme()}
      >
        <FaMoon className="text-white" size={18} />
        <div
          className="absolute bg-white dark:bg-medium w-5 h-5 rounded-full shadow-md transform transition-transform duration-300"
          style={darkMode ? { left: '2px' } : { right: '2px' }}
        ></div>
        <BsSunFill
        className='ml-auto text-yellow-400'
        size={18}
        />
      </div>
      
    </>
  );
};

export default ThemeToogle;
