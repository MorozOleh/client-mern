import { useState, useEffect } from "react";


export const useMount = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        return () => { setIsMounted(false) }
    }, [])

    return { isMounted }

}