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

export const createUsersData = () => {
	for (let i = 0; i < 10; i++) {
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

	// create fake friend list
	const start = Math.floor(Math.random() * 5);
	const randomFriendsList = usersList.slice(start, start + 5);
	const filteredList = [];
	for (let i = 0; i < randomFriendsList.length; i++) {
		const {
			login: { uuid },
		} = randomFriendsList[i];
		filteredList.push(uuid);
	}

	async function asyncSetDoc() {
		await setDoc(userRef, {
			...data,
			friends: filteredList,
			// friends: [],
			createdAt: serverTimestamp(),
		});
	}

	asyncSetDoc();
};

export const addRoom = (data) => {
	const roomRef = doc(db, 'rooms');

	async function asyncAddRoom() {
		await addDoc(roomRef, {
			...data,
			createdAt: serverTimestamp(),
		});
	}

	asyncAddRoom();
};
