import React, { useState } from 'react';

const Wheel = () => {
    const [spinning, setSpinning] = useState(false);
    const [prize, setPrize] = useState(null);

    const segments = [0, 1, 10, 20, 30, 40]; // Ödüller
    const totalSegments = segments.length;

    const spinWheel = () => {
        if (spinning) return;
        setSpinning(true);

        const spinDuration = 3000; // 3 saniyelik döndürme
        const randomIndex = Math.floor(Math.random() * totalSegments); // Rastgele ödül seçimi

        setTimeout(() => {
            setPrize(segments[randomIndex]); // Kazanılan ödül
            setSpinning(false);
        }, spinDuration);
    };

    return (
        <div className="wheel-container">
            <div className={`wheel ${spinning ? 'spinning' : ''}`}>
                {segments.map((segment, index) => (
                    <div key={index} className="segment">
                        {segment} KITTY
                    </div>
                ))}
            </div>
            <button onClick={spinWheel} disabled={spinning}>
                {spinning ? 'Çark Dönüyor...' : 'Çarkı Çevir'}
            </button>
            {prize !== null && <p>Kazandığınız Ödül: {prize} KITTY!</p>}
        </div>
    );
};

export default Wheel;
