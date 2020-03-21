import React, { useState } from "react";
import styled from "styled-components";
import { Rnd } from 'react-rnd'

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
  bg: string | undefined,
  description: string,
  de: string,
  por: string,
  image: string | null,
  img: boolean,
}

export default function ImageContainer({
  bg,
  description,
  de,
  por,
  image,
  img,
}: ImageContainerProps) {
  const [isMoving, setMoving] = useState(false);

  const [imageState, setImageState] = useState({
    width: '500px',
    height: '500px',
    x: 50,
    y: 50,
  });

  return (
    <StyledImageContainer background={bg}>
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

      {image && (
        <Rnd
          style={{
            zIndex: 1,
            cursor: "move",
            overflow: "hidden",
            background: 'white'
          }}
          size={{ width: imageState.width, height: imageState.height }}
          position={{ x: imageState.x, y: imageState.y }}
          onDrag={() => {
            if (!isMoving) setMoving(true);
          }}
          onDragStop={(e, d) => {
            setImageState(state => ({
              ...state,
              x: d.x, 
              y: d.y 
            }));
            setMoving(false);
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            setImageState(state => ({
              ...state,
              width: ref.style.width,
              height: ref.style.height,
            }));
          }}
        >
          <Imagem
            style={{ display: isMoving ? 'none' : 'inline-block'}}
            src={image}
            alt=""
          />
        </Rnd>
      )}

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
    </StyledImageContainer>
  );
}
