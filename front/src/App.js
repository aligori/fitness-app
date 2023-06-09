import logo from './logo.svg';
import './assets/App.css';
import { useEffect, useState } from 'react';

function App() {
  const [fetchMessage, setFetchMessage] = useState('Not fetched')
  const [data, setData] = useState([])
  const [migrated, setMigrated] = useState(false)

  const migrateData = async () => {
    try {
      await fetch('http://localhost:8080/migrate', { method: "POST" });
      setMigrated(true)
    } catch (err) {
      console.log('Error migrating!')  //TODO: Replace by proper toast error message
    }
  }

  useEffect(function () {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8080/test');
        const resData = await response.json();
        setFetchMessage('success')
        setData(resData.data)
      } catch (err) {
        setFetchMessage('Error')
      }
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {fetchMessage}
        {data.map((data) => data.firstname)}
        {!migrated && (<button onClick={migrateData}>Migrate</button>)}
      </header>
    </div>
  );
}

export default App;
