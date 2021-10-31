import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { query, where, collection, doc, getDoc, getDocs, onSnapshot } from 'firebase/firestore';

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
				id: doc.id,
			}));

			setDocuments(data);
		});

		return unsubscribe;
	}, [collectionName, condition]);

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

			setDocuments({...data[0]});
		});

		return unsubscribe;
	}, [collectionName, condition]);

	return documents;
};
