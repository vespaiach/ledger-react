import { useState, useEffect } from 'react';

export default function useImg(src, defaultSrc) {
    const [loaded, setLoaded] = useState(defaultSrc);
    useEffect(() => {
        if (src !== loaded) {
            const img = new Image();
            img.onload = () => {
                setLoaded(src);
            };
            img.src = src;
        }
    }, [src, loaded, setLoaded]);

    return loaded;
}
