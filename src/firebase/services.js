import { db } from './config';
import {
	query,
	collection,
	doc,
	addDoc,
	getDoc,
	setDoc,
	updateDoc,
	serverTimestamp,
} from 'firebase/firestore';
import { usersList } from 'resources/data/users-list';

const start = Math.floor(Math.random() * 40);
export const createUsersData = () => {
	for (let i = start; i < start + 10; i++) {
		const {
			cell,
			dob: { age, date },
			email,
			gender,
			location: { city, country, state, street },
			login: { password, username, uuid },
			name: { first, last },
			picture: { large },
		} = usersList[i];
		const userRef = doc(db, 'users', uuid);
		async function asyncUsersData() {
			await setDoc(userRef, {
				cell,
				age,
				date,
				email,
				gender,
				city,
				country,
				state,
				street: `${street.number} ${street.name}`,
				password,
				username,
				uid: uuid,
				displayName: `${first} ${last}`,
				photoURL: large,
				createdAt: serverTimestamp(),
			});
		}
		asyncUsersData();
	}
};

export const createRooms = (uid, friendId) => {
	const roomRef = collection(db, 'rooms');
	// for (let i = 0; i < 5; i++) {
	async function asyncRoomData() {
		await addDoc(roomRef, {
			// members: [uid, list[i]],
			members: [uid, friendId],
			createdAt: serverTimestamp(),
		});
	}
	asyncRoomData();
	// }
};

export const getUserData = (uid) => {
	const userRef = doc(db, 'users', uid);

	async function asyncGetDoc() {
		const userSnap = await getDoc(userRef);

		if (userSnap.exists()) {
			return userSnap.data();
		} else {
			return {};
		}
	}

	return asyncGetDoc();
};

export const addUser = (uid, data) => {
	const userRef = doc(db, 'users', uid);

	async function asyncSetDoc() {
		await setDoc(userRef, {
			...data,
			createdAt: serverTimestamp(),
		});
	}

	asyncSetDoc();
};

export const updateUser = (uid, data) => {
	const userRef = doc(db, 'users', uid);

	async function asyncUpdateDoc() {
		await updateDoc(userRef, {
			...data,
			modifiedAt: serverTimestamp(),
		});
	}

	asyncUpdateDoc();
};

export const addFriend = (uid, friendId) => {
	const userRef = doc(db, 'users', uid);
	const friendOfFriendRef = doc(db, 'users', friendId, 'friends', uid);
	const friendRef = doc(db, 'users', friendId);
	const friendOfUserRef = doc(db, 'users', uid, 'friends', friendId);

	async function asyncAddRoom() {
		// add user to friend
		const userSnap = await getDoc(userRef);
		await setDoc(friendOfFriendRef, {
			uid: uid,
			photoURL: userSnap.data().photoURL,
			displayName: userSnap.data().displayName,
			cell: userSnap.data(),
			createdAt: serverTimestamp(),
		});

		// add friend to user
		const friendSnap = await getDoc(friendRef);
		await setDoc(friendOfUserRef, {
			uid: friendId,
			photoURL: friendSnap.data().photoURL,
			displayName: friendSnap.data().displayName,
			cell: friendSnap.data(),
			createdAt: serverTimestamp(),
		});
	}

	asyncAddRoom();
};

export const addRoom = (data) => {
	const roomRef = collection(db, 'rooms');

	async function asyncAddRoom() {
		await addDoc(roomRef, {
			...data,
			createdAt: serverTimestamp(),
			modifiedAt: serverTimestamp(),
		});
	}

	asyncAddRoom();
};

export const addMessage = (uid, data) => {
	const messageRef = collection(db, 'rooms', uid, 'messages');
	const roomRef = doc(db, 'rooms', uid);

	async function asyncAddMessage() {
		await addDoc(messageRef, {
			...data,
			createdAt: serverTimestamp(),
		});

		await updateDoc(roomRef, {
			modifiedAt: serverTimestamp(),
		});
	}

	asyncAddMessage();
};
