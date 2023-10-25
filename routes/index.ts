import express from 'express';

const router = express.Router();




// // tag
// router.post('/tag', async (req, res) => {
// 	const { name, id } = req.body;

// 	try {
// 		const result = await prisma.tag.create({
// 			data: {
// 				name: name,
// 				author: {
// 					connect: { id: id }
// 				}
// 			}
// 		});
// 		res.status(200).json(result);
// 	} catch (error) {
// 		console.log(error);
// 		res.status(500).json(error);
// 	} finally {
// 		await prisma.$disconnect();
// 	}
// });

// // note
// router.get('/note', async (req, res) => {
// 	const { userId } = req.body;

// 	try {
// 		const result = await prisma.user.findUnique({
// 			where: { id: userId },
// 			select: {
// 				notes: {
// 					select: {
// 						id: true,
// 						title: true,
// 						content: true,
// 						createdAt: true,
// 						updatedAt: true,
// 						tags: {
// 							select: {
// 								tag: {
// 									select: {
// 										name: true,
// 									}
// 								}
// 							}
// 						}
// 					}
// 				}
// 			}
// 		});
// 		res.status(200).json(result);
// 	} catch (error) {
// 		console.log(error);
// 		res.status(500).json(error);
// 	} finally {
// 		await prisma.$disconnect();
// 	}
// })

// router.post('/note', async (req, res) => {
// 	const { title, content, id } = req.body;

// 	try {
// 		const result = await prisma.note.create({
// 			data: {
// 				title: title,
// 				content: content,
// 				author: {
// 					connect: { id: id }
// 				}
// 			}
// 		});
// 		res.status(200).json(result);
// 	} catch (error) {
// 		console.log(error);
// 		res.status(500).json(error);
// 	} finally {
// 		await prisma.$disconnect();
// 	}
// });

// // note_tag
// router.post('/note_tag', async (req, res) => {
// 	const { noteId, tagId } = req.body;

// 	try {
// 		const result = await prisma.noteTag.create({
// 			data: {
// 				noteId: noteId,
// 				tagId: tagId,
// 			}
// 		});
// 		res.status(200).json(result);
// 	} catch (error) {
// 		console.log(error);
// 		res.status(500).json(error);
// 	} finally {
// 		await prisma.$disconnect();
// 	}
// });

export default router;