type NoteListItem = {
	id: string;
	title: string;
	createdAt: Date;
	updatedAt: Date;
	author: {
		name: string;
	} | null;
	tags: {
		tag: {
			id: string;
			name: string;
		};
	}[];
};

export default NoteListItem;
