// app/theme-provider.js
'use client';

import { createContext } from 'react';
import useLocalStorage from './src/useLocalStorage';
export const SessionContext = createContext(null);

export default function SessionProvider({ children }) {
    const [sessionData, setSessionData] = useLocalStorage("sessionData", {
        session: "Session 1",
        data: {
            "Session 1": {
                options: {
                    event: "3x3",
                    input: "Stackmat"
                },
                timeList: [],
                time: 0,
                scramble: "Trying to load scramble from cache...",
                status: "idle",
            }
        }
    });
    return (
        <SessionContext.Provider value={[sessionData, setSessionData]}>
            {children}
        </SessionContext.Provider>
    );
}