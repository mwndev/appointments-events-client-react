import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import github from "./svgs/github.svg";
import githubgreen from "./svgs/githubgreen.svg";
import menu from "./svgs/menu.svg";
import arrow from "./svgs/arrowleft.svg";

const OuterWrapper = styled.div`
  @media only screen and (max-width: 800px) {
    display: none !important;
  }
  height: calc(2cm + 1vh);
  width: 100%;
  background-color: ${(props) => props.theme.c3};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${(props) =>
    props.messageBelowBanner === undefined
      ? "0 0 0.5cm" + props.theme.ic7
      : "none"};
  margin-bottom: 1.8cm;
  a {
    margin: 3vw;
    padding: 0.4cm 0.2cm;
    color: #000;
    text-decoration: none;
    flex-shrink: 0;
    font-size: 1.1em;
    cursor: pointer;
    border-bottom: 0.08cm solid ${(props) => props.theme.c3};
    flex-shrink: 1;
    font-weight: 500;
    display: ${(props) =>
      props.messageBelowNav !== undefined ? "none" : "flex"};
    transition: 0.5s;
    white-space: nowrap;
  }
  a:hover {
    border-bottom: 0.08cm solid ${(props) => props.theme.ic6};
  }
`;

const SocialIcon = styled.img`
  height: 70%;
  aspect-ratio: 1 / 1;
  cursor: pointer;
  padding: 0.1cm;
  border-radius: 0.2cm;
  margin: 0 0.3cm;
`;

export const Header = ({ links, messageBelowBanner }) => {
  const [gh, setgh] = useState(github);

  const ghLink = process.env.REACT_APP_GH_LINK;

  return (
    <OuterWrapper>
      {links.map((link) => (
        <Link to={link[0]} key={uuidv4()}>
          {link[1]}
        </Link>
      ))}
      <SocialIcon
        onClick={() => window.open(ghLink || "set env variable")}
        src={gh}
        alt="github"
        onMouseOver={() => setgh(githubgreen)}
        onMouseLeave={() => setgh(github)}
      />
    </OuterWrapper>
  );
};

const PhoneHeaderWrapper = styled.div`
  height: ${(p) => p.theme.pHeaderHeight};
  width: 100%;
  min-width: 100vw;
  display: flex;
  top: 0;
  justify-content: left;
  align-items: center;
  box-shadow: 0 0 6px grey;
  position: absolute;
  @media only screen and (min-width: 800px) {
    display: none;
  }
`;
const IconWrapper = styled.div`
  height: 100%;
  aspect-ratio: 4 / 3;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 40%;
    aspect-ratio: 1 / 1;
  }
`;

const PhoneMenuWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  transition: all 0.3s ease-out;
  transform: translateX(${(p) => (!p.active ? "-100%" : "0%")});
  @media only screen and (min-width: 800px) {
    display: none;
  }
`;
const PhoneMenu = styled.div`
  width: clamp(60%, calc(6cm + 20vw), 85%);
  min-height: 100vh;
  background-color: ${(p) => p.theme.c3};
  opacity: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  box-shadow: 0 0 6px grey;
  z-index: 2;
`;
const PhoneMenuHeader = styled.div`
  height: ${(p) => p.theme.pHeaderHeight};
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
`;
const PhoneMenuItem = styled.div`
  flex-shrink: 0;
  height: clamp(1cm, 1.6cm, ${(p) => p.theme.pHeaderHeight});
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  a {
    padding-left: 0.6cm;
    font-size: 1.4em;
    text-decoration: none;
    color: ${(p) => p.theme.tc1};
  }
`;

export const PhoneHeader = ({ links }) => {
  const [active, toggle] = useState(false);
  return (
    <>
      <PhoneHeaderWrapper>
        <IconWrapper onClick={() => toggle(true)}>
          <img src={menu} alt="menu" />
        </IconWrapper>
      </PhoneHeaderWrapper>
      <PhoneMenuWrapper active={active}>
        <PhoneMenu>
          <PhoneMenuHeader>
            <IconWrapper onClick={() => toggle(false)}>
              <img src={arrow} />
            </IconWrapper>
          </PhoneMenuHeader>
          {links.map((item) => (
            <PhoneMenuItem>
              <Link onClick={() => toggle(false)} to={item[0]}>
                {item[1]}
              </Link>
            </PhoneMenuItem>
          ))}
        </PhoneMenu>
      </PhoneMenuWrapper>
    </>
  );
};
