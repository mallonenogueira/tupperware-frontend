import React, { useState } from "react";
import styled from "styled-components";
import { Rnd } from "react-rnd";

import Rerodrag from "./Rerodrag";

import {
  ImageContainer as StyledImageContainer,
  ImageDescription,
  ImagePrice
} from "../../styles";

/* ${props => (props.img ? "height: 100%;" : "500px")}
  ${props => (props.img ? "width: 100%;" : "")} */
// ${props => (props.img ? "object-fit: contain;" : "")}
const Imagem = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

interface ImageContainerProps {
  bg: string | undefined;
  description: string;
  de: string;
  por: string;
  image: string | null;
  img: boolean;
  hiddenDrag?: boolean;
}

export default function ImageContainer({
  bg,
  description,
  de,
  por,
  image,
  img,
  hiddenDrag
}: ImageContainerProps) {
  const [isMoving, setMoving] = useState(false);

  const [imageState, setImageState] = useState({
    width: "500px",
    height: "500px",
    x: 50,
    y: 50
  });

  return (
    <StyledImageContainer background={bg}>
      {image && (
        <Rerodrag hiddenDrag={hiddenDrag}>
          {(style: any) => <Imagem style={style} src={image} alt="" />}
        </Rerodrag>
      )}

      <Rerodrag hiddenDrag={hiddenDrag}>
        {(style: any) => (
          <ImagePrice style={style}>
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
        )}
      </Rerodrag>

      <Rerodrag hiddenDrag={hiddenDrag} >
        {(style: any) => (
          <ImageDescription  style={style}>
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
        )}
      </Rerodrag>
    </StyledImageContainer>
  );
}
