import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const themes = [
    { name: "light", icon: "🌞" },
    { name: "dark", icon: "🌙" },
    { name: "cyberpunk", icon: "🤖" },
    { name: "retro", icon: "🕹️" },
  ];

  const [theme, setTheme] = useState(() => {
    // Initialize from localStorage or fallback to 'dark'
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <select
      className="select w-full max-w-xs mt-4"
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
    >
      {themes.map((t) => (
        <option key={t.name} value={t.name}>
          {t.icon} {t.name}
        </option>
      ))}
    </select>
  );
};

export default ThemeSwitcher;
