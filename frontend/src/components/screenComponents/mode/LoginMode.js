import React, { useEffect, useRef } from "react";
import {
  ButtonBox,
  ButtonContainer,
  AuthContainer,
  AuthInputContainer,
  AuthInputTitle,
  AuthInput,
} from "../../styles/styledComponents";
import { SIGNUP } from "../Enum";
import PropTypes from "prop-types";

export const LoginMode = ({ idInput, passwordInput, loginFunc, setMode }) => {
  const idRef = useRef();
  const passwordRef = useRef();
  useEffect(() => {
    idRef.current.focus();
  }, []);
  return (
    <AuthContainer>
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
              loginFunc(idInput.value, passwordInput.value);
            }
          }}
        />
      </AuthInputContainer>
      <ButtonBox>
        <ButtonContainer
          onClick={() => {
            loginFunc(idInput.value, passwordInput.value);
          }}
        >
          로그인
        </ButtonContainer>
        <ButtonContainer
          onClick={() => {
            setMode(SIGNUP);
          }}
        >
          회원가입
        </ButtonContainer>
      </ButtonBox>
    </AuthContainer>
  );
};

LoginMode.propTypes = {
  idInput: PropTypes.object.isRequired,
  passwordInput: PropTypes.object.isRequired,
  loginFunc: PropTypes.func.isRequired,
  setMode: PropTypes.func.isRequired,
};
