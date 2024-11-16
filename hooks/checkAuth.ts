// hooks/useAuth.js

'use client';

import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { toast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from 'firebase/firestore';

export const checkAuth = () => {
  const [user, setUser] = useState<{ uid: string, fullname?: string } | null>(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // Query Firestore to find the document where the uid field matches the current user's uid
          const usersRef = collection(db, "users");
          const q = query(usersRef, where("uid", "==", currentUser.uid));
          const querySnapshot = await getDocs(q);

          // Check if a document was found
          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0].data(); // Get the first matching document
            const userData = { ...currentUser, fullname: userDoc.fullname };
            setUser(userData);
          } else {
            console.warn("User document not found in Firestore.");
            setUser(currentUser); // Set currentUser without fullname if no document is found
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUser(null); // User is not authenticated
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [auth]);

  return user;
};
