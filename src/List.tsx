import React, { useEffect, useState } from "react";
import styled from "styled-components";

import {
  ApplicationContainer,
  ApplicationHeader,
  ApplicationBody
} from "./styles";

const Imagem = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

export default function List({
  list = [],
  setSelected
}: {
  list?: any[];
  setSelected: any;
}) {
  return (
    <ApplicationContainer>
      <ApplicationHeader>Tupperware</ApplicationHeader>

      <ApplicationBody
        style={{
          flexWrap: "wrap"
        }}
      >
        {list.map((item, index) => (
          <span
            style={{
              display: "inline-block",
              margin: 10,
              cursor: "pointer"
            }}
            key={index}
            onClick={() => {
              setSelected(item);
            }}
          >
            <Imagem
              style={{
                width: 250,
                height: 250
              }}
              src={`http://pedidos.tupperware.com.br/${item.img}`}
            />
            {item.texts.map((text: any, index2: any) =>
              text ? (
                <div key={index2} dangerouslySetInnerHTML={{ __html: text }} />
              ) : null
            )}
          </span>
        ))}
      </ApplicationBody>
    </ApplicationContainer>
  );
}
