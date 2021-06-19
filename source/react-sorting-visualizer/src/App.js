import './App.css';
import SortingVisualizer from './components/SortingVisualizer';
import Toolbar from './components/Toolbar';

function App() {
  
  const eventBus = {
    on(event, callback) {
      document.addEventListener(event, (e) => callback(e.detail));
    },
    dispatch(event, data) {
      document.dispatchEvent(new CustomEvent(event, { detail: data }));
    },
    remove(event, callback) {
      document.removeEventListener(event, callback);
    },
  };

  return (
    <div className="App">
      <Toolbar eventBus={eventBus}></Toolbar>
      <SortingVisualizer eventBus={eventBus}></SortingVisualizer>
    </div>
  );

  
}

export default App;
