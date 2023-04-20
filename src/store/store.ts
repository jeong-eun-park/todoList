import { create } from "zustand";
import produce from "immer";

interface InputItem {
  input: string ;
  setInput:(newInput: string)=> void ;
  newInput: string;
  inputBox: {id:number, text:string}[];
  addList:()=> void;
  removeList:(id:number)=>void;
  isEdit: boolean;
  editId: string | number;
  list: {id:number, text:string};
  editList:(id:number)=>void;
  editFinish: ()=>void;
}

const useStore = create<InputItem>((set, get) => ({
  input: "",
  setInput: (newInput) => set({ input: newInput }),
  newInput:'',
  inputBox: [],
  addList: () => {
    set(
      produce((state) => {
        state.inputBox.push({
          id: state.inputBox.length,
          text: get().input,
        });
      })
    );
  },
  removeList: (id) => {
    set((state) => ({
      inputBox: state.inputBox.filter((list) => list.id !== id),
    }));
  },
  list: {id:0, text:''},
  isEdit: false,
  editId: "",
  editList: (id) => {
    set((state) => ({
      input: state.inputBox.find((list) => list.id === id).text,
      isEdit: true,
      editId: id,
    }));
  },
  editFinish: () => {
    set((state) => ({
      inputBox: state.inputBox.map((list) => {
        return list.id === get().editId ? { ...list, text: get().input } : list;
      }),
      isEdit: false,
    }));
  },
}));

export default useStore;

