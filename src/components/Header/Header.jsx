import useTheme from '../../context/ThemeContext';

const Header = () => {
  const { darkMode, switchTheme } = useTheme();

  return (
    <>
      <header
        className={darkMode ? 'header elements-dark' : 'header elements-light'}
      >
        <div className="header-title">Where in the world?</div>
        <div
          className="modes"
          onClick={(e) => {
            switchTheme();
          }}
        >
          {darkMode ? (
            <span className="mode-img">
              <i className="bi bi-moon-fill"></i>
            </span>
          ) : (
            <span className="mode-img">
              <i className="bi bi-moon"></i>
            </span>
          )}
          Dark Mode
        </div>
      </header>
    </>
  );
};

export default Header;
