import * as React from "react";
import domToImage from "dom-to-image";
import styled from "styled-components";
import download from "downloadjs";

import {
  ApplicationContainer,
  ApplicationHeader,
  ApplicationBody,
  Textarea,
  Input,
  Button
} from "./styles";

import FileLoader, { FileResponse } from "./FileLoader";

const { useState, useRef, useEffect, useCallback } = React;

const Imagem = styled.img`
  height: 100%;
  width: 500px;
  object-fit: cover;
`;

const PROXY_URL = "https://dsouj.sse.codesandbox.io/proxy";

function isValidUrl(url: string) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(url);
}

function getProxyUrl(url: string) {
  if (isValidUrl(url)) {
    return `${PROXY_URL}?url=${url}`;
  }

  return url;
}

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
      setImage(getProxyUrl(url));
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
    <ApplicationContainer>
      <ApplicationHeader>Tupperware</ApplicationHeader>

      <ApplicationBody>
        <div style={{ maxWidth: 500, width: 500 }}>
          <FileLoader onChange={setFile} />
          <Input
            placeholder="Endereço web da imagem"
            value={url}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setUrl(event.target.value)
            }
          />

          <div style={{ display: "flex" }}>
            <Input
              placeholder="R$ - De"
              value={url}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setUrl(event.target.value)
              }
            />

            <Input
              placeholder="R$ - Para"
              value={url}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setUrl(event.target.value)
              }
            />
          </div>

          <Textarea
            placeholder="Detalhes do produto"
            value={description}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(event.target.value)
            }
          />
          <Button
            onClick={async () => {
              if (!ref.current) return;

              try {
                const data = await domToImage.toPng(ref.current);
                download(data, "produto.png");
              } catch (err) {
                console.log("Erro");
              }

              // const data = html2Canvas.
              // const data = await html2canvas(ref.current, {
              //   proxy: "https://dsouj.sse.codesandbox.io/"
              // });
            }}
          >
            Download
          </Button>
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
      </ApplicationBody>
    </ApplicationContainer>
  );
}
