import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import {
	query,
	where,
	collection,
	doc,
	getDoc,
	getDocs,
	onSnapshot,
	orderBy,
} from 'firebase/firestore';

export const useFirestore = (collectionName, condition) => {
	const [documents, setDocuments] = useState([]);

	useEffect(() => {
		let docRef = collection(db, collectionName);
		let q = query(docRef);

		if (condition) {
			if (!condition.compareValue || !condition.compareValue.length) {
				return;
			}

			q = query(
				docRef,
				where(condition.fieldName, condition.operator, condition.compareValue)
			);
		}

		const unsubscribe = onSnapshot(q, (snapshot) => {
			const data = snapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));

			setDocuments(data);
		});

		return unsubscribe;
	}, [collectionName, condition]);

	return documents;
};

export const useFirestoreContactList = (uid) => {
	const [documents, setDocuments] = useState([]);

	useEffect(() => {
		let docRef = collection(db, 'users', uid, 'friends');

		const unsubscribe = onSnapshot(docRef, (snapshot) => {
			const data = snapshot.docs.map((doc) => ({
				...doc.data(),
			}));

			setDocuments(data);
		});

		return unsubscribe;
	}, [uid]);

	return documents;
};

export const useFirestoreRecentList = (uid) => {
	const [documents, setDocuments] = useState([]);

	useEffect(() => {
		let docRef = collection(db, 'rooms');
		let q = query(docRef, where('members', 'array-contains', uid))

		const unsubscribe = onSnapshot(q, (snapshot) => {
			const data = snapshot.docs.map((doc) => {
				const membersArr = doc.data().members.slice()
				const index = membersArr.indexOf(uid)
				membersArr.splice(index, 1)
				return membersArr[0]
			});

			setDocuments(data);
		});

		return unsubscribe;
	}, [uid]);

	return documents;
};

export const useFirestoreSuggestList = (uid) => {
	const [userDocs, setUserDocs] = useState([]);
	const [friendDocs, setFriendDocs] = useState([]);

	useEffect(() => {
		let userRef = collection(db, 'users');
		let friendRef = collection(db, 'users', uid, 'friends');

		const userUnsubscribe = onSnapshot(userRef, (snapshot) => {
			const data = snapshot.docs.map((doc) => ({
				...doc.data(),
			}));

			setUserDocs(data);
		});
		const friendUnsubscribe = onSnapshot(friendRef, (snapshot) => {
			const data = snapshot.docs.map((doc) => ({
				...doc.data(),
			}));

			setFriendDocs(data);
		});

		return (userUnsubscribe, friendUnsubscribe);
	}, [uid]);

	const uidList = friendDocs.map((item) => item.uid);
	uidList.push(uid);
	const suggestList = userDocs.filter((user) => !uidList.includes(user.uid));

	return suggestList;
};

export const useFirestoreMessages = (roomId) => {
	const [documents, setDocuments] = useState([]);

	useEffect(() => {
		let docRef = collection(db, 'rooms', roomId, 'messages');
		let q = query(docRef, orderBy('createdAt'));

		const unsubscribe = onSnapshot(q, (snapshot) => {
			const data = snapshot.docs.map((doc) => ({
				...doc.data(),
			}));

			setDocuments(data);
		});

		return unsubscribe;
	}, [roomId]);

	return documents;
};

export const useFirestoreObject = (collectionName, condition) => {
	const [documents, setDocuments] = useState({});

	useEffect(() => {
		let docRef = collection(db, collectionName);
		let q = query(docRef);

		if (condition) {
			if (!condition.compareValue || !condition.compareValue.length) {
				return;
			}

			q = query(
				docRef,
				where(
					condition.fieldName,
					condition.operator,
					condition.compareValue
				) /* , orderBy('createdAt') */
			);
		}

		const unsubscribe = onSnapshot(q, (snapshot) => {
			const data = snapshot.docs.map((doc) => ({
				...doc.data(),
			}));

			setDocuments({ ...data[0] });
		});

		return unsubscribe;
	}, [collectionName, condition]);

	return documents;
};
