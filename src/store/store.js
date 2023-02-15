import { create } from "zustand";

const useStore = create((set) => ({
  input: "",
  setInput: (newInput) => set({ input: newInput }),

  inputBox: [],
  addList: (input) => {
    set((state) => ({
      inputBox: [...state.inputBox, { id: state.inputBox.length, text: input }],
    }));
  },

  removeList: (id) => {
    set((state) => ({
      inputBox: state.inputBox.filter((list) => list.id !== id),
    }));
  },

  isEdit: false,
  editId: "",
  editList: (id) => {
    set((state) => ({
      input: state.inputBox.find((list) => list.id === id).text,
      isEdit: true,
      editId: id,
    }));
  },
  editFinish: (input, editId) => {
    set((state) => ({
      inputBox: state.inputBox.map((list) => {
        if (list.id === editId) {
          return { ...list, text: input };
        }
        return list;
      }),
    }));
  },
}));

export default useStore;
