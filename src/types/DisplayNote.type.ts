// client側から見たNoteの型
type DisplayTag = {
	id: string;
	title: string;
	content: string;
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

export default DisplayTag;
