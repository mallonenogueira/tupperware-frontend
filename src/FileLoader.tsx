import * as React from "react";
import styled from "styled-components";
import axios from "axios";
const { useState, useEffect, useRef } = React;

const StyledLabel = styled.label`
  align-items: center;
  border: 2px dotted blueviolet;
  color: blueviolet;
  cursor: pointer;
  display: flex;
  height: 100px;
  justify-content: center;
  padding: 10px;
  width: 100%;
`;

const StyledInput = styled.input`
  display: none;
`;

const StyledText = styled.p`
  text-align: center;
`;

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
  const ref = useRef<HTMLInputElement>();

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
    <StyledLabel
      className="mt-2"
      onDragOver={(event: DragEvent) => event.preventDefault()}
      onDragEnter={(event: DragEvent) => event.preventDefault()}
      onDrop={async (event: DragEvent) => {
        event.preventDefault();
        if (!event.dataTransfer || !event.dataTransfer.files) return;

        setFile(event.dataTransfer.files[0]);
      }}
      onKeyUp={(event: KeyboardEvent) => {
        if (ref && ref.current && event.which === 13) ref.current.click();
      }}
      tabIndex="0"
    >
      <StyledText>
        {fileName || "Solte seus arquivos aqui ou clique para selecionar! =D"}
      </StyledText>

      <StyledInput
        ref={ref}
        type="file"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          if (!event.target || !event.target.files) return;

          setFile(event.target.files[0]);
        }}
      />
    </StyledLabel>
  );
}
