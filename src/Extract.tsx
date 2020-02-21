import React from "react";
import {
  ApplicationContainer,
  ApplicationHeader,
  ApplicationBody
} from "./styles";
import ScrappingTupperware from "./ScrappingTupperwareService";

import List from "./List";
import App from "./App";

export default function Extract() {
  const [loading, setLoading] = React.useState<string | null>(" ");
  const [list, setList] = React.useState<any[] | undefined>();
  const [selected, setSelected] = React.useState<any>();

  React.useEffect(() => {
    new ScrappingTupperware("#myFrame")
      .start(({ err }: any) => {
        setLoading(err.message);
      })
      .then(responses => {
        setList(responses[5]);
        setLoading(null);
      });
  }, []);

  if (loading || !list) {
    return (
      <ApplicationContainer>
        <ApplicationHeader>Tupperware</ApplicationHeader>

        <ApplicationBody style={{ flexDirection: "column" }}>
          <div>{loading}</div>
          <iframe
            id="myFrame"
            style={{ flex: 1, width: "100%" }}
            src="/cav/default.aspx"
          ></iframe>
        </ApplicationBody>
      </ApplicationContainer>
    );
  }

  if (selected) {
    return <App selected={selected} setSelected={setSelected} />;
  }

  return <List list={list} setSelected={setSelected} />;
}
