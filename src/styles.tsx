import styled from "styled-components";

export const cor = {
  branco: "#FFFFFF",
  rosa: "#FF686B",
  rosaClaro: "#FFA69E",
  azul: "#74C2AE",
  azulClaro: "#A5FFD6"
};

const tema = {
  borda: `solid 5px ${cor.branco}`,
  cor: cor.branco,
  bordaHover: cor.azulClaro,
  fundoInput: cor.rosa,
  fundoApplication: cor.rosaClaro,
  fundoHeader: cor.azul,
  fundoBotao: cor.azul,
  borderRadius: "10px",
  boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.25)"
};

const defaultInput = `
  background: ${tema.fundoInput};
  border: ${tema.borda};
  color: ${tema.cor};
  border-radius: ${tema.borderRadius};
  box-shadow: ${tema.boxShadow};
  font-size: 1rem;
  padding: 15px 25px;
  outline: 0;
  margin: 12px;
  width: calc(100% - 24px);
  flex: 1;

  ::placeholder {
    color: ${tema.cor};
  }

  :hover {
    border-color: ${tema.bordaHover};
  }

  :focus {
    border-color: ${tema.bordaHover};
  }
`;

export const ApplicationContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background: ${tema.fundoApplication};
`;

export const ApplicationHeader = styled.header`
  align-items: center;
  background: ${tema.fundoHeader};
  box-shadow: ${tema.boxShadow};
  color: ${tema.cor};
  display: flex;
  font-weight: bold;
  font-size: 42px;
  height: 80px;
  left: 0;
  padding: 15px 40px;
  position: sticky;
  top: 0;
  width: 100vw;
`;

export const ApplicationBody = styled.main`
  padding: 25px;
  display: flex;
  flex: 1;
`;

export const Textarea = styled.textarea`
  ${defaultInput}
  height: 100px;
`;

export const Input = styled.input`
  ${defaultInput}
  height: 50px;
`;

export const Button = styled.button`
  border: ${tema.borda};
  color: ${tema.cor};
  background: ${tema.fundoBotao};
  font-size: 1rem;
  padding: 0 25px;
  height: 50px;
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: center;

  border-radius: ${tema.borderRadius};
  margin: 12px;
  box-shadow: ${tema.boxShadow};

  :hover {
    border-color: ${tema.bordaHover};
  }

  :focus {
    border-color: ${tema.bordaHover};
  }
`;

export const StyledFileLoader = styled.label`
  ${defaultInput}
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  height: 100px;

  input {
    display: none;
  }

  p {
    text-align: center;
  }
`;
