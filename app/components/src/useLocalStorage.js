'use client'
// import { useState, useEffect } from 'react';

// export default function useLocalStorage(key, initialValue, empty) {
//     if (!empty) console.error("Please assign an fallback value.")
//     // State to store our value
//     // Pass initial state function to useState so logic is only executed once
//     const [storedValue, setStoredValue] = useState(() => {
//         if (typeof window === "undefined") {
//             return empty;
//         }
//         try {
//             // Get from local storage by key
//             const item = window.localStorage.getItem(key);
//             if (!window.localStorage.getItem(key)) {
//                 window.localStorage.setItem(key, JSON.stringify(initialValue));
//             }
//             // Parse stored json or if none return initialValue
//             return item ? JSON.parse(item) : initialValue;
//         } catch (error) {
//             // If error also return initialValue
//             console.log(error);
//             return initialValue;
//         }
//     });
//     // Return a wrapped version of useState's setter function that ...
//     // ... persists the new value to localStorage.
//     const setValue = (value) => {
//         try {
//             // Allow value to be a function so we have same API as useState
//             const valueToStore =
//                 value instanceof Function ? value(storedValue) : value;
//             // Save state
//             setStoredValue(valueToStore);
//             // Save to local storage
//             if (typeof window !== "undefined") {
//                 window.localStorage.setItem(key, JSON.stringify(valueToStore));
//             }
//         } catch (error) {
//             // A more advanced implementation would handle the error case
//             console.log(error);
//         }
//     };
//     return [storedValue, setValue];
// }


import { useState, useEffect, useRef } from "react";

export default function useLocalStorage(key, defaultValue) {
    const isMounted = useRef(false);
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        try {
            const item = window.localStorage.getItem(key);
            if (item) {
                setValue(JSON.parse(item));
            }
        } catch (e) {
            console.log(e);
        }
        return () => {
            isMounted.current = false;
        };
    }, [key]);

    useEffect(() => {
        if (isMounted.current) {
            console.log("updated to", value)
            window.localStorage.setItem(key, JSON.stringify(value));
        } else {
            isMounted.current = true;
        }
    }, [key, value]);

    return [value, setValue];
}
