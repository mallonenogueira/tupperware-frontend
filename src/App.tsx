import * as React from "react";
import styled from "styled-components";

const { useState, useEffect } = React;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Label = styled.label`
  border: 2px dotted blueviolet;
  width: 500px;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Input = styled.input`
  display: none;
`;

export default function App() {
  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState();
  const [file, setFile] = useState();
  const [base64, setBase64] = useState();

  useEffect(() => {
    if (!file) {
      setBase64(null);
      setFileName(null);
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setBase64(reader.result);
    };

    reader.readAsDataURL(file);
    setFileName(file.name);
  }, [file]);

  return (
    <div className="App">
      <Container>
        <textarea
          value={description}
          onChange={event => setDescription(event.target.value)}
        />

        <Label
          onDragOver={event => event.preventDefault()}
          onDragEnter={event => event.preventDefault()}
          onDrop={event => {
            event.preventDefault();
            setFile(event.dataTransfer.files[0]);
          }}
        >
          <h3>{fileName}</h3>

          <Input
            type="file"
            onChange={event => {
              setFile(event.target.files[0]);
            }}
          />
        </Label>

        <h2>{description}</h2>
        <img title={fileName} src={base64} alt="" />
      </Container>
    </div>
  );
}
