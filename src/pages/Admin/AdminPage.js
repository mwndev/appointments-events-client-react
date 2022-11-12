import React, { useState } from "react";
import styled from "styled-components";
import { PageWrapper } from "../../general_components/styledComponents1";
import ToggleBar from "../../general_components/Togglebar";
import { ViewAsTimeframe } from "./ViewAsTimeFrame";
import { ViewSessionTypes } from "./ViewSessionTypes";

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
`;

const Header = styled.h1`
  font-size: 2.2em;
  text-align: center;
  margin: 1cm;
  font-weight: 400;
  margin: 3cm 0 1cm 0;

  span {
    border-bottom: 3px solid ${(p) => p.theme.ic4};
  }
`;

const Admin = () => {
  const [simpleLayout, toggleLayout] = useState(true);

  return (
    <PageWrapper>
      <ToggleBar
        bool={simpleLayout}
        toggle={toggleLayout}
        textArr={["Simple layout", "Functional layout"]}
      ></ToggleBar>
      <Header>
        <span>Manage Appointments by Timeframe</span>
      </Header>
      <ViewAsTimeframe
        simpleLayout={simpleLayout}
        toggleLayout={toggleLayout}
      />
      <Header>
        <span>Manage Session Types</span>
      </Header>
      <ViewSessionTypes
        simpleLayout={simpleLayout}
        toggleLayout={toggleLayout}
      />
    </PageWrapper>
  );
};

export default Admin;
