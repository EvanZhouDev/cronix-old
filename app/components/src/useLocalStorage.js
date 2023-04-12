"use client"
import { useState, useEffect } from 'react';

export default function useLocalStorage(key, defaultValue) {
    const [value, setValue] = useState(() => {
        const storedValue = window.localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : defaultValue;
    });

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};