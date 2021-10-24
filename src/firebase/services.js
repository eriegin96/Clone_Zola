import app, { db } from './config';

export const getUserData = (uid) => {
	const userRef = db.doc(`users/${uid}`);
	return userRef
		.get()
		.then((user) => {
			if (user.exists) {
				return user.data();
			} else {
				return {};
			}
		})
		.catch((error) => {
			console.log('Error getting user:', error);
		});
};

export const addUser = (uid, data) => {
	const userRef = db.doc(`users/${uid}`);

	userRef.set({
		...data,
		currentWord: {},
		totalWords: 0,
		totalHistory: 0,
		totalTrash: 0,
		totalArchive: 0,
		totalRevision: 0,
		// createdAt: firebase.firestore.FieldValue.serverTimestamp(),
	});
};
