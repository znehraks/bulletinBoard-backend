import React from "react";
import styled from "styled-components";
import { DETAIL } from "./Enum";
import PropTypes from "prop-types";

const BoardRow = styled.div`
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
const BoardCell = styled.div`
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

export const BoardTable = ({ data, me, page, setCurrent, setMode }) => {
  return (
    <>
      {data &&
        data.map((row, index) => {
          if (index < page * 8 && index >= (page - 1) * 8) {
            return (
              <BoardRow
                onClick={() => {
                  setCurrent({
                    code: row.board_code,
                    title: row.board_title,
                    content: row.board_content,
                    img_url: row.board_img_url,
                    author: row.board_author,
                    created_at: row.created_at,
                    is_mine: row.user_code === me.code,
                  });
                  setMode(DETAIL);
                }}
                key={row.board_code}
              >
                <BoardCell>{row.board_code}</BoardCell>
                <BoardCell>{row.board_title}</BoardCell>
                <BoardCell>{row.board_author}</BoardCell>
                <BoardCell>{row.created_at.split("T")[0]}</BoardCell>
              </BoardRow>
            );
          } else {
            return null;
          }
        })}
    </>
  );
};

BoardTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  me: PropTypes.object.isRequired,
  page: PropTypes.number.isRequired,
  setCurrent: PropTypes.func.isRequired,
  setMode: PropTypes.func.isRequired,
};
