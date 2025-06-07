import { initializeApp } from 'firebase/app';
import { getFirestore, doc, updateDoc, increment, onSnapshot } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Collection names
export const COLLECTIONS = {
  FOOD_ITEMS: 'foodItems',
  RESTAURANTS: 'restaurants'
};

// Like/Unlike functions
export const toggleLike = async (itemId: string, currentLikes: number) => {
  try {
    const itemRef = doc(db, COLLECTIONS.FOOD_ITEMS, itemId);
    await updateDoc(itemRef, {
      likes: increment(1)
    });
    return true;
  } catch (error) {
    console.error('Error toggling like:', error);
    return false;
  }
};

export const toggleUnlike = async (itemId: string, currentLikes: number) => {
  try {
    const itemRef = doc(db, COLLECTIONS.FOOD_ITEMS, itemId);
    await updateDoc(itemRef, {
      likes: increment(-1)
    });
    return true;
  } catch (error) {
    console.error('Error toggling unlike:', error);
    return false;
  }
};

// Real-time listener for likes
export const subscribeToLikes = (itemId: string, callback: (likes: number) => void) => {
  const itemRef = doc(db, COLLECTIONS.FOOD_ITEMS, itemId);
  
  return onSnapshot(itemRef, (doc) => {
    if (doc.exists()) {
      const data = doc.data();
      callback(data.likes || 0);
    }
  }, (error) => {
    console.error('Error subscribing to likes:', error);
  });
};

export { db }; 