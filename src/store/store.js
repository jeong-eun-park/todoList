import { create } from "zustand";
import produce from "immer";

const useStore = create((set, get) => ({
  input: "",
  setInput: (newInput) => set({ input: newInput }),

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
