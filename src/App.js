import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import './App.css';

const App = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const shortenUrl = async () => {
    try {
      if (!originalUrl) {
        setErrorMessage('Por favor, digite uma URL válida.');
        setShortenedUrl('');
      } else {
        console.log('Backend URL:', process.env.REACT_APP_BACKEND_URL);
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/shorten`, {
          originalUrl,
        });
        
        setShortenedUrl(response.data.shortUrl);
        setErrorMessage('');
      }
    } catch (error) {
      console.error('Error shortening URL:', error);
      setErrorMessage('Ocorreu um erro ao encurtar a URL. Tente novamente.');
      setShortenedUrl('');
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Encurtador de Link</h1>
      </div>
      <Form className='form'>
        <Form.Group controlId="formOriginalUrl" className='form-url-original'>
          <Form.Label className='text-url'>Insira o Link Original</Form.Label>
          <Form.Control
            className='input'
            type="url"
            placeholder="Digite o Link original"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" className='btn-url-original' onClick={shortenUrl}>
          Encurtar Link
        </Button>
      </Form>

      {errorMessage && <Alert variant="danger" className="mt-3 new-url">{errorMessage}</Alert>}

      {shortenedUrl && !errorMessage && (
        <div className="mt-3 new-url">
          <p>Seu Novo Link</p>
          <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
            {shortenedUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default App;
