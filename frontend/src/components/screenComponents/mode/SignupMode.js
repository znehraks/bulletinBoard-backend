import React, { useEffect, useRef } from "react";
import {
  ButtonBox,
  ButtonContainer,
  AuthContainer,
  AuthInputContainer,
  AuthInputTitle,
  AuthInput,
} from "../../styles/styledComponents";
import { LOGIN } from "../Enum";
import PropTypes from "prop-types";
export const SignupMode = ({
  nameInput,
  idInput,
  passwordInput,
  signupFunc,
  setMode,
}) => {
  const nameRef = useRef();
  const idRef = useRef();
  const passwordRef = useRef();
  useEffect(() => {
    nameRef.current.focus();
  }, []);
  return (
    <AuthContainer>
      <AuthInputContainer>
        <AuthInputTitle>이름:</AuthInputTitle>
        <AuthInput
          ref={nameRef}
          type="text"
          placeholder="이름 입력"
          {...nameInput}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              idRef.current.focus();
            }
          }}
        />
      </AuthInputContainer>
      <AuthInputContainer>
        <AuthInputTitle>아이디:</AuthInputTitle>
        <AuthInput
          ref={idRef}
          type="text"
          placeholder="아이디 입력"
          {...idInput}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              passwordRef.current.focus();
            }
          }}
        />
      </AuthInputContainer>
      <AuthInputContainer>
        <AuthInputTitle>비밀번호:</AuthInputTitle>
        <AuthInput
          ref={passwordRef}
          type="password"
          placeholder="비밀번호 입력"
          {...passwordInput}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              signupFunc(nameInput.value, idInput.value, passwordInput.value);
            }
          }}
        />
      </AuthInputContainer>
      <ButtonBox>
        <ButtonContainer
          onClick={() => {
            signupFunc(nameInput.value, idInput.value, passwordInput.value);
          }}
        >
          완료
        </ButtonContainer>
        <ButtonContainer
          onClick={() => {
            setMode(LOGIN);
          }}
        >
          로그인하기
        </ButtonContainer>
      </ButtonBox>
    </AuthContainer>
  );
};

SignupMode.propTypes = {
  nameInput: PropTypes.object.isRequired,
  idInput: PropTypes.object.isRequired,
  passwordInput: PropTypes.object.isRequired,
  signupFunc: PropTypes.func.isRequired,
  setMode: PropTypes.func.isRequired,
};
