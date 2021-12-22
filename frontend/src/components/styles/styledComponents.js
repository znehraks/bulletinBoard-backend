import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.bgColor};
  width: 100vw;
  height: 100vh;
`;
export const Nav = styled.div`
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
export const Menu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  color: white;
`;
export const LogoutBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const AuthButton = styled.span`
  cursor: pointer;
`;
export const ProfileImg = styled.img`
  width: 3vw;
  height: 3vw;
  border-radius: 50%;
  margin-right: 1vw;
  cursor: pointer;
`;
export const LogoImg = styled.img`
  width: 10vw;
  cursor: pointer;
`;
export const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 80%;
  width: 100%;
  background: ${(props) => props.theme.lightHeaderColor};
  position: relative;
`;
export const MainLeftContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: ${(props) => props.theme.ContainerColor};
  margin: 0 0.2vw;
  height: 100%;
`;

export const MainLeftButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  font-size: 1.2vw;
  border: 1px solid rgba(0, 0, 0, 0.5);
  margin: 2.5vw 0;
  padding: 0.6vw;
  cursor: pointer;
  :nth-child(2) {
    margin: 0;
  }
  :hover {
    background: ${(props) => props.theme.lightHeaderColor};
    color: #fff;
  }
`;
export const ButtonImg = styled.img`
  width: 2vw;
`;
export const MainRightContainer = styled.div`
  flex: 6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.ContainerColor};
  height: 100%;
`;
export const MainRightContainerTitle = styled.span`
  margin-top: 1vw;
  width: 80%;
  height: 10%;
  text-align: center;
  font-size: 1.8vw;
`;
export const BoardWrapper = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
export const BoardRow = styled.div`
  width: 95%;
  height: 10%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  cursor: ${(props) => (props.isTitle ? "inherit" : "pointer")};
  border-top: 1px solid rgba(0, 0, 0, 0.5);
  :last-child {
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  }
  :hover {
    background-color: ${(props) =>
      props.isTitle ? "inherit" : props.theme.lightHeaderColor};
    color: ${(props) => (props.isTitle ? "inherit" : "#fff")};
  }
`;
export const BoardCell = styled.div`
  width: 100%;
  height: 3vw;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2vw;
  font-weight: 600;
  border-right: 1px solid rgba(0, 0, 0, 0.5);
  :first-child {
    border-left: 1px solid rgba(0, 0, 0, 0.5);
    flex: 1;
  }
  :nth-child(2) {
    flex: 3;
  }
  :nth-child(3) {
    flex: 2;
  }
  :last-child {
    flex: 2;
  }
`;
export const CurrentTitleContainer = styled.div`
  width: 80%;
  height: 10%;
  font-size: 1.2vw;
  border: 1px solid rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  background-color: #fff;
`;
export const CurrentTitleContainerEdit = styled.input`
  width: 80%;
  height: 10%;
  font-size: 1.2vw;
  border: 1px solid rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
export const CurrentContentContainer = styled.div`
  width: 80%;
  height: 70%;
  font-size: 0.9vw;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-top: none;
  display: flex;
  align-items: flex-start;
  background-color: #fff;
`;
export const CurrentContentContainerEdit = styled.textarea`
  width: 80%;
  height: 70%;
  font-size: 1vw;
  resize: none;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-top: none;
  display: flex;
  align-items: flex-start;
`;
export const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const ButtonContainer = styled.div`
  font-size: 1.2vw;
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding: 0.4vw;
  margin: ${(props) => (props.margin ? props.margin : "1vw 1vw 0 1vw")};
  background-color: inherit;
  color: #000;
  cursor: pointer;
  :hover {
    background-color: ${(props) =>
      props.bgColor ? props.bgColor : props.theme.lightHeaderColor};
    color: #fff;
  }
`;

export const ProfileContainer = styled.div`
  width: 100%;
  height: 80%;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 4px solid ${(props) => props.theme.lightHeaderColor};
`;

export const Profile = styled.img`
  width: 10vw;
  height: 10vw;
  border-radius: 50%;
  margin: 2vw 0;
`;
export const ProfileLeftContainer = styled.div`
  flex: 2;
  height: 100%;
  background-color: ${(props) => props.theme.lightHeaderColor};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-right: 0.1vw;
  padding-top: 3vw;
`;
export const ProfileRightContainer = styled.div`
  flex: 5;
  height: 95%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-size: 1.2vw;
  overflow-y: auto;
`;

export const ProfileRightContainerSpan = styled.div`
  font-size: 1.2vw;
  color: white;
`;

export const EmptyContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const WordCount = styled.span`
  font-size: 1vw;
  font-weight: 600;
  position: absolute;
  bottom: ${(props) => props.bottom};
  right: ${(props) => props.right};
`;
export const AddPostButton = styled.div`
  position: absolute;
  width: 3vw;
  height: 3vw;
  bottom: 5vw;
  border-radius: 50%;
  font-size: 2vw;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 4vw;
  color: #000;
  border: 1px solid rgba(0, 0, 0, 0.5);
  background-color: inherit;
  color: black;
  padding-bottom: 0.4vw;
  :hover {
    background-color: ${(props) => props.theme.lightHeaderColor};
    color: #fff;
  }
  cursor: pointer;
`;

export const GoToBackButton = styled.div`
  position: absolute;
  width: 5vw;
  height: 5vw;
  top: 5vw;
  border-radius: 50%;
  font-size: 1vw;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 7vw;
  color: #000;
  border: 1px solid rgba(0, 0, 0, 0.5);
  :hover {
    background-color: ${(props) => props.theme.lightHeaderColor};
    color: #fff;
  }
  cursor: pointer;
`;
export const PageSpan = styled.span`
  font-size: 1.2vw;
  margin-bottom: 1vw;
`;

export const AuthContainer = styled.div`
  width: 80%;
  height: 70%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const AuthInputContainer = styled.div`
  width: 35%;
  height: 8%;
  margin: 1vw 0;
  font-size: 1.2vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 2vw;
`;
export const AuthInputTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100%;
  font-size: 1.2vw;
`;
export const AuthInput = styled.input`
  flex: 3;
  height: 100%;
  font-size: 1.2vw;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 10%;
  background: ${(props) => props.theme.lightHeaderColor};
`;
export const FooterLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #333;
  margin: 0 0.2vw;
  height: 100%;
  background: ${(props) => props.theme.headerColor};
`;
export const FooterRight = styled.div`
  flex: 6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #555;
  height: 100%;
  background: ${(props) => props.theme.headerColor};
`;
