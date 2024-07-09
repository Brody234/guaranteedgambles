import React, { useEffect, useState } from 'react';

const CheckDimensions = ({ setIsHeightLessThanWidth }) => {
    useEffect(() => {
        const checkDimensions = () => {
            const { innerHeight, innerWidth } = window;
            setIsHeightLessThanWidth(innerHeight < innerWidth);
        };

        checkDimensions();
        window.addEventListener('resize', checkDimensions);

        return () => {
            window.removeEventListener('resize', checkDimensions);
        };
    }, [setIsHeightLessThanWidth]);

    return null;
};

export default CheckDimensions;
