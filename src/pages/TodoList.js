import styled from "styled-components";
import useStore from "../store/store";

const TodoList = () => {
  const {
    input,
    setInput,
    inputBox,
    addList,
    removeList,
    editList,
    isEdit,
    editFinish,
    editId,
  } = useStore();

  return (
    <div>
      <Box>
        <Title>TodoList</Title>
        <InputBox
          name="list"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></InputBox>
        <BtnBox>
          {isEdit ? (
            <Btn onClick={() => editFinish(input, editId)}>수정완료</Btn>
          ) : (
            <Btn onClick={() => addList(input)}>추가</Btn>
          )}
        </BtnBox>
        <ListBox>
          {inputBox.map((item) => {
            return (
              <div key={item.id}>
                <List>
                  {item.text}
                  <Btn onClick={() => editList(item.id)}>수정</Btn>
                  <Btn onClick={() => removeList(item.id)}>삭제</Btn>
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
