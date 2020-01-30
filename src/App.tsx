import * as React from "react";
import htmlToImage from "html-to-image";
import domToImage from "dom-to-image";
import styled from "styled-components";
import download from "downloadjs";

import FileLoader, { FileResponse } from "./FileLoader";

const { useState, useRef, useEffect, useCallback } = React;

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
  height: 100%;
  width: 500px;
  object-fit: cover;
`;

export default function App() {
  const [description, setDescription] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const [file, setFile] = useState<FileResponse>();
  const [url, setUrl] = useState<string>("");
  const [image, setImage] = useState<string | null>();
  const pasteHandle = useCallback(
    event => {
      const items = [...event.clipboardData.items];
      const item = items.find(({ kind }) => kind === "file");

      if (item !== undefined && item.kind === "file") {
        const blob = item.getAsFile();
        const reader = new FileReader();
        reader.onload = event => {
          if (
            !event.target ||
            !event.target.result ||
            typeof event.target.result !== "string"
          )
            return;
          setUrl(event.target.result);
        };
        reader.readAsDataURL(blob);
      }
    },
    [setUrl]
  );

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

  useEffect(() => {
    window.addEventListener("paste", pasteHandle);

    return () => window.removeEventListener("paste", pasteHandle);
  }, [pasteHandle]);

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
          {/* <input
            placeholder="Url da imagem"
            value={url}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setUrl(event.target.value)
            }
          /> */}

          <FileLoader onChange={setFile} />
          <button
            style={{
              border: "2px dotted blueviolet",
              color: "blueviolet",
              background: "none",
              padding: 10,
              cursor: "pointer"
            }}
            className="mt-2"
            onClick={async () => {
              if (!ref.current) return;

              const data = await domToImage.toPng(ref.current);
              download(data, "produto.png");
            }}
          >
            Download
          </button>
        </div>

        <div
          ref={ref}
          style={{
            flex: 1,
            background: "white",
            position: "relative",
            display: "inline-block"
          }}
        >
          {image && <Imagem src={image} alt="" />}

          <pre
            style={{
              position: "absolute",
              bottom: 10,
              left: 10
            }}
          >
            <strong>
              <p>{description}</p>
            </strong>
          </pre>
        </div>
      </Container>
    </div>
  );
}
