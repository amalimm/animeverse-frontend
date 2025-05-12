'use client'

import { Backdrop, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

class LoadingModal {
    constructor() {
        this.listeners = new Set();
    }

    show() {
        this.listeners.forEach(listener => listener(true));
    }

    hide() {
        this.listeners.forEach(listener => listener(false));
    }

    subscribe(callback) {
        this.listeners.add(callback);
        return () => this.listeners.delete(callback);
    }
}

export const loading = new LoadingModal();

export function LoadingOverlay() {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        return loading.subscribe(setIsLoading);
    }, []);

    if (!isLoading) return null;

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true} >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}
