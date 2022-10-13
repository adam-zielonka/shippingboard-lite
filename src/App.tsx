import { observer } from 'mobx-react-lite';
import './App.css';
import { store } from './store/Store';

function App() {
  return (
    <div className="App">
      <div>
        {store.counter} <br/>
        <button onClick={store.riseCounter}>Counter up</button>
      </div>
    </div>
  );
}

export default observer(App);
