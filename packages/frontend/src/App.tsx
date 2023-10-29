import axios from 'axios';
import { FormEvent, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [markdownContent, setMarkdownContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [downloadHref, setDownloadHref] = useState('');

  useEffect(() => {
    const href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(markdownContent);
    setDownloadHref(href);
  }, [markdownContent]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    
    const { data } = await axios.post(import.meta.env.VITE_API_ENDPOINT, {
      description: inputValue,
    });
    
    setMarkdownContent(data.markdown);
    setIsLoading(false);
  };

  return (
    <>
      <header>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Describe the architecture change decision"
            className="prompt"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          ></textarea>

          <button type="submit">
            {isLoading ? <div className="loader" /> : 'Generate'}
          </button>
        </form>
      </header>

      <main>
        <textarea
          placeholder="# Hello World"
          className="editor"
          value={markdownContent}
          onChange={(event) => setMarkdownContent(event.target.value)}
        ></textarea>

        <div className="markdown-container">
          <ReactMarkdown className="markdown-output">{markdownContent}</ReactMarkdown>
        </div>
      </main>

      {markdownContent && <a className="download-button" download="adr.md" href={downloadHref}>DOWNLOAD</a>}
    </>
  )
}

export default App
