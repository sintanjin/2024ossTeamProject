import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          오픈소스 스튜디오 22100215 김태연
        </p>
        <a
          className="App-link"
          href="https://github.com/sintanjin/2024react"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github address
        </a>
      </header>
    </div>
  );
}

export default App;
