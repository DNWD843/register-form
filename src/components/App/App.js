import { useCallback } from 'react';
import { Form } from '../Form/Form';
import './App.css';

function App() {
  const handleSubmitRegisterForm = useCallback((data) => {
    console.log(data);
  }, []);

  return <Form handleSubmit={handleSubmitRegisterForm} />;
}

export default App;
