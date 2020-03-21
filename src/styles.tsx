import styled from "styled-components";

export const cor = {
  branco: "#FFFFFF",
  rosa: "#FF686B",
  rosaClaro: "#FFA69E",
  azul: "#74C2AE",
  azulClaro: "#A5FFD6"
};

const tema = {
  borda: `solid 3px ${cor.branco}`,
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
  font-size: 0.9rem;
  padding: 15px 20px;
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
  font-size: 32px;
  height: 50px;
  left: 0;
  padding: 15px 40px;
  position: sticky;
  top: 0;
  width: 100vw;
`;

export const ApplicationBody = styled.main`
  padding: 20px;
  display: flex;
  flex: 1;
  overflow: auto;
`;

export const P = styled.p`
  color: white;
  margin-left: 12px;
`;

export const Textarea = styled.textarea`
  ${defaultInput}
  height: 100px;
`;

export const Input = styled.input`
  ${defaultInput}
  height: 40px;
`;

export const Button = styled.button<{ background?: string }>`
  border: ${tema.borda};
  color: ${tema.cor};
  background: ${(props: any) => props.background || tema.fundoBotao};
  font-size: 0.9rem;
  padding: 0 20px;
  height: 40px;
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

export const ImageContainer = styled.div<{ background?: string }>`
  align-items: center;
  background: ${(props: any) => props.background || cor.azulClaro};
  box-shadow: ${tema.boxShadow};
  display: flex;
  flex: 1;
  height: 100%;
  justify-content: center;
  position: relative;
  padding: 45px;
`;

// box-shadow: ${tema.boxShadow};

const imageCommons = `
  background: ${cor.branco};
  border-radius: ${tema.borderRadius};
  box-shadow: -3px -1px 5px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
  position: absolute;
  font-family: Montserrat Alternates, Roboto, sans-serif;
`;

export const ImageDescription = styled.div`
  ${imageCommons};
  /* width: 300px;
  height: 65px;
  top: 0;
  left: 0; */
  /* transform: rotateZ(-15deg) translateY(65px) translateX(10px); */

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ImagePrice = styled.div`
  ${imageCommons};
  /* width: 160px;
  height: 85px;
  bottom: 25px;
  right: 25px; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .de,
  .por {
    margin-top: 5px;
  }

  span,
  strong {
    font-size: 1.15rem;
    margin-left: 10px;
  }

  strong {
    font-size: 1.4rem;
  }
`;
