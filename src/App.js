import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import './App.css';

const App = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const apiUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

  const handleError = (error, defaultMessage) => {
    console.error('Erro:', error);
    setErrorMessage(defaultMessage);
    setShortenedUrl('');
  };

  const shortenUrl = async () => {
    try {
      setLoading(true);
      console.log('Enviando requisição para encurtar URL:', originalUrl);
      const response = await axios.post(`${apiUrl}/shorten`, { originalUrl });
      console.log('Resposta recebida:', response.data);
      setShortenedUrl(response.data.shortUrl);
      setErrorMessage('');
    } catch (error) {
      handleError(error, 'Ocorreu um erro ao encurtar a URL. Tente novamente.');
    } finally {
      setLoading(false);
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

        <Button variant="primary" className='btn-url-original' onClick={shortenUrl} disabled={loading}>
          {loading ? 'Aguarde...' : 'Encurtar Link'}
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
