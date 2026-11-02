import { FaLightbulb } from "react-icons/fa";

function ToggleTheme({ theme, toggleTheme }) {
  return (
    <button className="toggle-theme" onClick={toggleTheme}>
      <FaLightbulb />
      <span>{theme === "dark" ? "Dark Mode" : "Light Mode"}</span>
    </button>
  );
}

export default ToggleTheme;
