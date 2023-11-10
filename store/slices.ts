import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ContactState = {
	contacts: null,
};

const contactsSlice = createSlice({
	name: 'contacts',
	initialState,
	reducers: {
		setContacts: (state, action: PayloadAction<Contact[]>) => {
			state.contacts = action.payload;
		},
	},
});

export const { setContacts } = contactsSlice.actions;

const rootReducer = contactsSlice.reducer;

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
