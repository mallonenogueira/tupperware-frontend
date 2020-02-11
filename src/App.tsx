import * as React from "react";
import domToImage from "dom-to-image";
import styled from "styled-components";
import download from "downloadjs";

import {
  ApplicationContainer,
  ApplicationHeader,
  ApplicationBody,
  Button,
  ImageContainer,
  ImageDescription,
  ImagePrice,
  Input,
  Textarea,
  P,
  cor
} from "./styles";

import FileLoader, { FileResponse } from "./FileLoader";

const { useState, useRef, useEffect, useCallback } = React;

const Imagem = styled.img`
  height: 100%;
  width: 100%;
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
  const [de, setDe] = useState<string>("");
  const [por, setPor] = useState<string>("");
  const [image, setImage] = useState<string | null>();
  const [bg, setBg] = useState<string | undefined>();
  const pasteHandle = useCallback(
    event => {
      const items = [...event.clipboardData.items];
      const item = items.find(({ kind }) => kind === "file");

      if (item !== undefined && item.kind === "file") {
        const blob = item.getAsFile();
        const reader = new FileReader();
        reader.onload = (event: any) => {
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
        <div style={{ maxWidth: 500, width: 500, marginRight: 25 }}>
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
              value={de}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setDe(event.target.value)
              }
            />

            <Input
              placeholder="R$ - Por"
              value={por}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setPor(event.target.value)
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

          <P>Mude sua cor de fundo</P>

          <div style={{ display: "flex" }}>
            <Button background={cor.rosa} onClick={() => setBg(cor.rosa)} />
            <Button
              background={cor.rosaClaro}
              onClick={() => setBg(cor.rosaClaro)}
            />
            <Button background={cor.azul} onClick={() => setBg(cor.azul)} />
            <Button
              background={cor.azulClaro}
              onClick={() => setBg(cor.azulClaro)}
            />
            <Button background={cor.branco} onClick={() => setBg(cor.branco)} />
          </div>
          <Button
            onClick={async () => {
              if (!ref.current) return;

              try {
                const data = await domToImage.toPng(ref.current);
                download(data, "produto.png");
              } catch (err) {
                console.log("Erro");
              }
            }}
          >
            Download
          </Button>
        </div>

        <div
          ref={ref}
          style={{
            flex: 1,
            position: "relative",
            display: "inline-block"
          }}
        >
          <ImageContainer background={bg}>
            <ImageDescription>
              <pre
                style={{
                  position: "absolute",
                  top: 10,
                  left: 10
                }}
              >
                <strong>
                  <p>{description}</p>
                </strong>
              </pre>
            </ImageDescription>
            <ImagePrice>
              {de && (
                <div className="de">
                  De: <span>{de}</span>
                </div>
              )}

              {por && (
                <div className="por">
                  Por: <strong>{por}</strong>
                </div>
              )}
            </ImagePrice>
            {image && <Imagem src={image} alt="" />}
          </ImageContainer>
        </div>
      </ApplicationBody>
    </ApplicationContainer>
  );
}
