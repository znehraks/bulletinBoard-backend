import React, { useContext } from "react";
import styled from "styled-components";
import Logo_img from "../styles/images/DesignC_logo_03_white.png";
import Profile_img from "../styles/images/logo.jpg";
import { LOGIN, MAIN } from "./Enum";
import PropTypes from "prop-types";
import isLoggedInContext from "./Context";

const Nav = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background: ${(props) => props.theme.headerColor};
  font-size: 1.1vw;
  font-weight: 600;
  :first-child {
    flex: 3;
  }
  :not(:first-child) {
    flex: 1;
  }
`;
const Menu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  color: white;
`;
const LogoutBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const AuthButton = styled.span`
  cursor: pointer;
`;
const ProfileImg = styled.img`
  width: 3vw;
  height: 3vw;
  border-radius: 50%;
  margin-right: 1vw;
  cursor: pointer;
`;
const LogoImg = styled.img`
  width: 10vw;
  cursor: pointer;
`;
export const Header = ({ setMode }) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(isLoggedInContext);
  return (
    <Nav>
      <Menu onClick={() => setMode(MAIN)}>
        <LogoImg src={Logo_img} alt={"로고"} />
      </Menu>
      <Menu>
        {!isLoggedIn ? (
          <AuthButton onClick={() => setMode(LOGIN)}>로그인하기</AuthButton>
        ) : (
          <LogoutBox>
            <ProfileImg src={Profile_img} alt={"프로필이미지"} />
            <AuthButton
              onClick={() => {
                localStorage.removeItem("token");
                setIsLoggedIn(false);
                window.location.href = "/";
              }}
            >
              로그아웃하기
            </AuthButton>
          </LogoutBox>
        )}
      </Menu>
    </Nav>
  );
};

Header.propTypes = {
  setMode: PropTypes.func.isRequired,
};
