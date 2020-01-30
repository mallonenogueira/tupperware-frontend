import * as React from "react";
import htmlToImage from "html-to-image";
import styled from "styled-components";
import download from "downloadjs";

import FileLoader, { FileResponse } from "./FileLoader";

const { useState, useRef, useEffect } = React;

const Container = styled.div`
  display: flex;
  padding: 20px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  border: dotted 2px blueviolet;
  padding: 15px;
  font-size: 1.1rem;
  color: #555;
`;

const Imagem = styled.img`
  width: 100%;
  max-height: 500px;
  max-width: 500px;
  object-fit: cover;
`;

export default function App() {
  const [description, setDescription] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const [file, setFile] = useState<FileResponse>();
  const [url, setUrl] = useState<string>("");
  const [image, setImage] = useState<string | null>();

  useEffect(() => {
    if (url) {
      setImage(url);
      return;
    }

    if (file && file.base64) {
      setImage(file.base64);
      return;
    }

    setImage(null);
  }, [url, file]);

  return (
    <div className="App">
      <Container>
        <div style={{ flex: 1, marginRight: 20 }}>
          <Textarea
            placeholder="Descrição do produto..."
            value={description}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(event.target.value)
            }
          />
          <input
            placeholder="Url da imagem"
            value={url}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setUrl(event.target.value)
            }
          />

          <FileLoader onChange={setFile} />
          <button
            className="mt-2"
            onClick={async () => {
              if (!ref.current) return;
              const data = await htmlToImage.toPng(ref.current);
              // download(data, "produto.png");
            }}
          >
            Download
          </button>
        </div>

        <div
          ref={ref}
          style={{
            flex: 1,
            background: "white"
          }}
        >
          {image && <Imagem src={image} alt="" />}

          <pre>
            <p>{description}</p>
          </pre>
        </div>
      </Container>
    </div>
  );
}
