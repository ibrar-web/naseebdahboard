import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  sidebarOpen: boolean;
  pageTitle: string;
}

const initialState: UiState = {
  sidebarOpen: true,
  pageTitle: 'Dashboard',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setPageTitle(state, action: PayloadAction<string>) {
      state.pageTitle = action.payload;
    },
  },
});

export const { toggleSidebar, setPageTitle } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
