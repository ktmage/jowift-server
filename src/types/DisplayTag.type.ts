// client側から見たNoteの型
type DisplayNote = {
	id: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;
};

export default DisplayNote;
