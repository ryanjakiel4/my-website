import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { Link } from 'react-scroll';
import { IoMdHome } from "react-icons/io";
import {
  IoAlbums,
  IoDocument,
  IoPerson,
  IoGameController
} from "react-icons/io5";

/*
Navigation bar with named tabs with icons in desktop mode, and with a hamburger button
revealing a menu in mobile mode.  The condition for entering mobile mode is a width smaller
than 42em, where 'em' is a unit of pixels equal to the font-size of the section.
*/

function NavigationBar() {
  const [openDrawer, toggleDrawer] = useState(false);
  const drawerRef = useRef(null);

  useEffect(() => {
    /* Close the drawer when the user clicks outside of it */
    const closeDrawer = event => {
      if (drawerRef.current && drawerRef.current.contains(event.target)) {
        return;
      }

      toggleDrawer(false);
    };

    document.addEventListener("mousedown", closeDrawer);
    return () => document.removeEventListener("mousedown", closeDrawer);
  }, []);

  return (
    <Navbar.Background>
      <Navbar.Wrapper>
        <Navbar.Logo>RJ</Navbar.Logo>

        <HamburgerButton.Wrapper onClick={() => toggleDrawer(true)}>
          <HamburgerButton.Lines />
        </HamburgerButton.Wrapper>

        <Navbar.Items ref={drawerRef} openDrawer={openDrawer}>
          <Navbar.Item>
            <Link activeClass="active" to="home" spy={true} smooth={true} isDynamic={true} duration={500}>
              <Navbar.Link>
                <Navbar.Icon>
                  <IoMdHome />
                </Navbar.Icon>
                <Navbar.Text>
                  Home
                </Navbar.Text>
              </Navbar.Link>
            </Link>
          </Navbar.Item>
          <Navbar.Item>
            <Link activeClass="active" to="about" spy={true} smooth={true} isDynamic={true} duration={500}>
              <Navbar.Link>
                <Navbar.Icon>
                  <IoPerson />
                </Navbar.Icon>
                <Navbar.Text>
                  About
                </Navbar.Text>
              </Navbar.Link>
            </Link>
          </Navbar.Item>
          <Navbar.Item>
            <Link activeClass="active" to="projects" spy={true} smooth={true} isDynamic={true} duration={500}>
              <Navbar.Link>
                <Navbar.Icon>
                  <IoAlbums />
                </Navbar.Icon>
                <Navbar.Text>
                  Projects
                </Navbar.Text>
              </Navbar.Link>
            </Link>
          </Navbar.Item>
          <Navbar.Item>
            <Link activeClass="active" to="resume" spy={true} smooth={true} isDynamic={true} duration={500}>
              <Navbar.Link>
                <Navbar.Icon>
                  <IoDocument />
                </Navbar.Icon>
                <Navbar.Text>
                  Resume
                </Navbar.Text>
              </Navbar.Link>
            </Link>
          </Navbar.Item>
          <Navbar.Item>
            <Link activeClass="active" to="games" spy={true} smooth={true} isDynamic={true} duration={500}>
              <Navbar.Link>
                <Navbar.Icon>
                  <IoGameController />
                </Navbar.Icon>
                <Navbar.Text>
                  Games
                </Navbar.Text>
              </Navbar.Link>
            </Link>
          </Navbar.Item>
        </Navbar.Items>
      </Navbar.Wrapper>
    </Navbar.Background>
  );
}
const Navbar = {
  Background: styled.div`
      z-index: 1000;
      display: flex;
      background-color: rgba(255,255,255,1);
      position: relative;
      box-shadow: 0px 5px 5px -7px;
      height: 70px;
    `,
  Wrapper: styled.nav`
      flex: 1;
      
      align-self: flex-start;
  
      padding: 1rem 3rem;
  
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      width: 100vw;
      height: 60px;
    `,
  Logo: styled.div`
      color: rgb(0,0,100);
      padding-top: 10px;
      font-size: 65px;
    `,
  Items: styled.ul`
      list-style: none;
      padding-top: 20px;
      font-size: 20px;
      display: flex;
  
      @media only screen and (max-width: 42em) {
        position: fixed;
        right: 0;
        top: 0;
  
        height: 100%;
  
        flex-direction: column;
  
        background-color: white;
        padding: 1rem 2rem;
  
        transition: 0.2s ease-out;
  
        transform: ${({ openDrawer }) =>
      openDrawer ? `translateX(0)` : `translateX(100%)`};
      }
    `,
  Item: styled.li`
      padding: 0 1rem;
      cursor: pointer;
  
      @media only screen and (max-width: 42em) {
        padding: 1rem 0;
      }
    `,
  Link: styled.div`
      display: flex;
    `,
  Icon: styled.div`
    text-align: center;
    flex: 1;
    padding-right: 7px;
    padding-top: 2px;
    `,
  Text: styled.div`
    text-align: center;
    flex: 1;
    `
};

const HamburgerButton = {
  Wrapper: styled.button`
      height: 3rem;
      width: 3rem;
      position: relative;
      font-size: 12px;
  
      display: none;
  
      @media only screen and (max-width: 42em) {
        display: block;
      }
  
      /* Remove default button styles */
      border: none;
      background: transparent;
      outline: none;
  
      cursor: pointer;
  
      &:after {
        content: "";
        display: block;
        position: absolute;
        height: 150%;
        width: 150%;
        top: -25%;
        left: -25%;
      }
    `,
  Lines: styled.div`
      top: 50%;
      margin-top: -0.125em;
  
      &,
      &:after,
      &:before {
        /* Create lines */
        height: 2px;
        pointer-events: none;
        display: block;
        content: "";
        width: 100%;
        background-color: black;
        position: absolute;
      }
  
      &:after {
        /* Move bottom line below center line */
        top: -0.8rem;
      }
  
      &:before {
        /* Move top line on top of center line */
        top: 0.8rem;
      }
    `
};

export default NavigationBar;