import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';  

const HomePage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase.from('your_table_name').select('*');
        
        if (error) {
          setError(error.message);
        } else {
          setData(data);
        }
      } catch (err) {
        setError(err.message);
      }
    }

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Supabase Connection Test</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li> // Adjust based on your table structure
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
