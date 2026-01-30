import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const HiiqLogo: React.FC<{
    mainColor?: string;
    accentColor?: string;
    sunColor?: string;
    style?: React.CSSProperties;
}> = ({
    mainColor = '#ffffff',
    accentColor = '#00F0FF',
    sunColor = '#FF6B6B',
    style
}) => {
        const frame = useCurrentFrame();
        const { fps, durationInFrames } = useVideoConfig();

        // Animations
        // 1. Gear Rotation (Continuous slow spin)
        const gearRotation = interpolate(
            frame,
            [0, durationInFrames],
            [0, 360]
        );

        // 2. Sun Rise (Subtle vertical movement loop)
        const sunY = interpolate(
            frame % (durationInFrames / 2),
            [0, durationInFrames / 4, durationInFrames / 2],
            [0, -10, 0],
            { extrapolateRight: 'clamp' }
        );

        // 3. Clouds Drifting (Horizontal loop)
        const cloudX = interpolate(
            frame % durationInFrames,
            [0, durationInFrames],
            [0, 20]
        );

        const strokeWidth = 8;
        const fineWidth = 5;

        return (
            <svg viewBox="0 0 300 300" style={{ ...style, overflow: 'visible' }}>
                <defs>
                    <mask id="circle-mask-anim">
                        <circle cx="150" cy="150" r="130" fill="white" />
                    </mask>
                </defs>

                {/* 1. The Circle Frame */}
                <path
                    d="M50 220 A 130 130 0 1 1 250 220"
                    fill="none"
                    stroke={mainColor}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* 2. The Scene (Masked/Contained) */}
                <g transform="translate(150, 150)">
                    {/* Sun - Animated Rise */}
                    <g transform={`translate(0, ${-60 + sunY})`}>
                        <circle cx="0" cy="0" r="45" fill="none" stroke={sunColor} strokeWidth={6} />

                        {/* Clouds - Animated Drift - Moving opposite to sun for parallax or just subtle drift */}
                        <g transform={`translate(${cloudX}, 0)`}>
                            <path d="M-50 10 H-10 M20 10 H50" fill="none" stroke={mainColor} strokeWidth={fineWidth} strokeLinecap="round" />
                            <path d="M-60 30 H-20 M30 30 H60" fill="none" stroke={mainColor} strokeWidth={fineWidth} strokeLinecap="round" />
                        </g>
                    </g>

                    {/* Mountains */}
                    <path
                        d="M-130 50 L-100 0 L-70 40 L-50 10 L-20 60"
                        fill="none"
                        stroke={mainColor}
                        strokeWidth={strokeWidth}
                        strokeLinejoin="bevel"
                    />

                    {/* City */}
                    <path d="M10 60 V-10 H35 V60" fill="none" stroke={accentColor} strokeWidth={6} />
                    <path d="M45 60 V-30 H70 V60" fill="none" stroke={accentColor} strokeWidth={6} />
                    <path d="M80 60 V0 H100 V60" fill="none" stroke={accentColor} strokeWidth={6} />

                    {/* Windows - Flicker effect? Optional. Static for now */}
                    <path d="M52 -20 H62 M52 -10 H62 M52 0 H62 M52 10 H62 M52 20 H62" fill="none" stroke={mainColor} strokeWidth={3} strokeLinecap="round" />

                    {/* Birds */}
                    <g transform="translate(0, -10)">
                        <path d="M-90 -90 L-80 -85 L-70 -90" fill="none" stroke={mainColor} strokeWidth={3} />
                        <path d="M-110 -70 L-100 -65 L-90 -70" fill="none" stroke={mainColor} strokeWidth={3} />
                    </g>
                </g>

                {/* 3. The Lettering (Foreground) */}
                <g transform="translate(30, 180)">
                    {/* H */}
                    <path d="M5 0 V80 M5 40 H55 M55 0 V80" fill={mainColor} strokeWidth={0} />
                    <path d="M-5 5 H15 M-5 75 H15 M45 5 H65 M45 75 H65" stroke={mainColor} strokeWidth={8} strokeLinecap="round" />

                    {/* II (Flip Flops) */}
                    <g transform="translate(80, 10)">
                        <path d="M15 5 C5 5 5 25 5 65 C5 75 15 75 25 75 C35 75 35 55 35 20 C35 5 25 5 15 5 Z" fill="none" stroke={mainColor} strokeWidth={strokeWidth} />
                        <path d="M15 20 L25 45 M15 20 L5 45" fill="none" stroke={accentColor} strokeWidth={4} strokeLinecap="round" />

                        <g transform="translate(40, 0)">
                            <path d="M15 5 C5 5 5 25 5 65 C5 75 15 75 25 75 C35 75 35 55 35 20 C35 5 25 5 15 5 Z" fill="none" stroke={mainColor} strokeWidth={strokeWidth} />
                            <path d="M15 20 L25 45 M15 20 L5 45" fill="none" stroke={accentColor} strokeWidth={4} strokeLinecap="round" />
                        </g>
                    </g>

                    {/* Q: The Gear Bulb - Rotating */}
                    <g transform="translate(190, 45)">
                        <g transform={`rotate(${gearRotation} 10 10)`}>
                            {/* Rotating Gear Center at 10,10 based on our relative translation inside group */}
                            <path d="M-30 0 L-25 -10 L-15 -10 L-10 -20 L0 -20 L5 -10 L15 -10 L20 -20 L30 -20 L35 -10 L45 -10 L50 0 L60 0 L55 10 L65 20 L55 30 L60 40 L50 40 L45 50 L35 50 L30 60 L20 60 L15 50 L5 50 L0 60 L-10 60 L-15 50 L-25 50 L-30 40 L-40 40 L-35 30 L-25 20 L-35 10 Z"
                                fill={mainColor} transform="scale(0.85) translate(10, 10)" />
                        </g>

                        {/* Stationary Bulb over the gear */}
                        <path d="M0 -15 C15 -15 25 0 25 15 C25 30 15 35 15 40 H-15 C-15 35 -25 30 -25 15 C-25 0 -15 -15 0 -15 Z"
                            fill="#0B1120" stroke={mainColor} strokeWidth={4} transform="translate(10, 10)" />
                        <path d="M-8 40 V20 M8 40 V20 M-8 20 Q0 5 8 20" stroke={accentColor} strokeWidth={4} fill="none" transform="translate(10, 10)" />
                    </g>
                </g>

                {/* 4. Text lockup - Static for now */}
                <text x="150" y="295" textAnchor="middle" fontFamily="monospace" fontWeight="900" fontSize="26" letterSpacing="3" fill={mainColor} style={{ textTransform: 'uppercase' }}>BUSINESS</text>
                <text x="150" y="325" textAnchor="middle" fontFamily="monospace" fontWeight="700" fontSize="22" letterSpacing="6" fill={mainColor} style={{ textTransform: 'uppercase' }}>SOLUTIONS</text>
            </svg>
        );
    };
