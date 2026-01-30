import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { HiiqLogo } from './HiiqLogo';

export const HeroLoop: React.FC = () => {
    const frame = useCurrentFrame();

    // Background pulsing effect
    const bgOpacity = interpolate(frame % 120, [0, 60, 120], [0.95, 0.98, 0.95]);

    return (
        <AbsoluteFill style={{ backgroundColor: '#05111a', justifyContent: 'center', alignItems: 'center' }}>
            {/* Subtle Tech Grid Background */}
            <AbsoluteFill style={{
                backgroundImage: 'linear-gradient(#00F0FF 1px, transparent 1px), linear-gradient(90deg, #00F0FF 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                opacity: 0.05
            }} />

            {/* Main Logo */}
            <div style={{ width: 800, height: 800 }}>
                <HiiqLogo
                    mainColor="#e2e8f0"
                    accentColor="#00F0FF"
                    sunColor="#FF6B6B"
                />
            </div>

            {/* Status Overlay */}
            <div style={{ position: 'absolute', bottom: 50, right: 50, fontFamily: 'monospace', color: '#00F0FF', opacity: 0.7 }}>
                SYSTEM_STATUS: ONLINE<br />
                V.2026.1.0
            </div>
        </AbsoluteFill>
    );
};
