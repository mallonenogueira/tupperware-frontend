import React, { useState, useEffect, useRef } from "react";

import { StyledFileLoader } from "./styles";

export interface FileResponse {
  base64: string;
  name: string;
}

export default function FileLoader({
  onChange
}: {
  onChange: (fileResponse: FileResponse) => void;
}) {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!file) {
      setFileName(null);
      return;
    }
    setFileName(file.name);

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      if (!reader.result || typeof reader.result !== "string") return;

      onChange({
        base64: reader.result,
        name: file.name
      });
    };
  }, [file, onChange]);

  return (
    <StyledFileLoader
      className="mt-2"
      onDragOver={(event: any) => event.preventDefault()}
      onDragEnter={(event: any) => event.preventDefault()}
      onDrop={async (event: any) => {
        event.preventDefault();
        if (!event.dataTransfer || !event.dataTransfer.files) return;

        setFile(event.dataTransfer.files[0]);
      }}
      onKeyUp={(event: any) => {
        if (ref && ref.current && event.which === 13) ref.current.click();
      }}
      tabIndex={0}
    >
      {fileName ? (
        <p>fileName</p>
      ) : (
        <>
          <p>
            Arraste sua imagem aqui <br />
            ou
            <br />
            Clique para selecionar
          </p>
        </>
      )}

      <input
        ref={ref}
        type="file"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          if (!event.target || !event.target.files) return;

          setFile(event.target.files[0]);
        }}
      />
    </StyledFileLoader>
  );
}
