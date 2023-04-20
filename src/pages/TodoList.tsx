import React from "react";
import styled from "styled-components";
import useStore from "../store/store";
import { shallow } from "zustand/shallow";

const TodoList = () => {
  const {
    input,
    setInput,
    inputBox,
    addList,
    removeList,
    isEdit,
    editList,
    editFinish,
  } = useStore(
    (state) => ({
      input: state.input,
      setInput: state.setInput,
      inputBox: state.inputBox,
      addList: state.addList,
      removeList: state.removeList,
      isEdit: state.isEdit,
      editList: state.editList,
      editFinish: state.editFinish,
    }),
    shallow
  );
  // const { input } = useStore((state) => state.input)

  // store를 통째로 가져오면 매번 다른값으로 인식해서 항상 렌더링
  // shallow를 사용하면 이전값과 변경값을 비교하여 변화를 감지하고 렌더링
  // selector 로 따로 빼주면 독립적으로 상태변경여부를 알수있어서 변화를 감지하고 렌더링

  return (
    <div>
      <Box>
        <Title>TodoList</Title>
        <InputBox
          name="list"
          value={input}
          onChange={(e:React.ChangeEvent<HTMLInputElement>):void => setInput(e.target.value)}
        ></InputBox>
        <BtnBox>
          {isEdit ? (
            <Btn onClick={() => editFinish()}>수정완료</Btn>
          ) : (
            <Btn onClick={() => addList()}>추가</Btn>
          )}
        </BtnBox>
        <ListBox>
          {inputBox.map((item) => {
            return (
              <div key={item.id}>
                <List>
                  {item.text}
                  <Btn onClick={():void => editList(item.id)}>수정</Btn>
                  <Btn onClick={():void => removeList(item.id)}>삭제</Btn>
                </List>
              </div>
            );
          })}
        </ListBox>
      </Box>
    </div>
  );
};

export default TodoList;

const Box = styled.div`
  justify-content: center;
  text-align: center;
  margin: 100px auto;
  width: 600px;
  height: 600px;
`;
const Title = styled.div`
  font-size: 40px;
`;
const InputBox = styled.input`
  margin-top: 100px;
  font-size: 30px;
`;

const BtnBox = styled.div`
  margin-top: 30px;
`;

const Btn = styled.button`
  font-size: 20px;
  margin-right: 20px;
`;

const ListBox = styled.ul`
  list-style: none;
`;

const List = styled.li`
  font-size: 15px;
`;
