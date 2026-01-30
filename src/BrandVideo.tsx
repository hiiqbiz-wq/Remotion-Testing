
import { AbsoluteFill, Img, useCurrentFrame, interpolate, Easing, staticFile } from 'remotion';

export const BrandVideo = () => {
    const frame = useCurrentFrame();

    // Cinematic Zoom for Background - Slower, more subtle
    const scale = interpolate(frame, [0, 300], [1, 1.05], {
        extrapolateRight: "clamp",
    });

    // Logo Fade In & Motion - "Floats up from top right to center"
    // Start: Top Right + Small (Deep) -> End: Center + Normal (Surface)
    const logoOpacity = interpolate(frame, [0, 150], [0, 1], {
        extrapolateRight: "clamp",
    });

    const logoScale = interpolate(frame, [0, 180], [0.4, 1], {
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic),
    });

    const logoX = interpolate(frame, [0, 180], [400, 0], {
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic),
    });

    const logoY = interpolate(frame, [0, 180], [-300, 0], {
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic),
    });

    // Text Reveal - Delays until logo is mostly settled
    const textOpacity = interpolate(frame, [120, 200], [0, 1], {
        extrapolateRight: "clamp",
    });

    const textY = interpolate(frame, [120, 200], [30, 0], {
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic),
    });

    return (
        <AbsoluteFill style={{ backgroundColor: '#000' }}>
            {/* Background - Digital Wall */}
            <AbsoluteFill style={{ overflow: 'hidden' }}>
                <Img
                    src={staticFile("brand-assets/digital-wall.png")}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transform: `scale(${scale})`,
                    }}
                />
                {/* Dark Overlay for contrast */}
                <AbsoluteFill style={{ backgroundColor: 'rgba(5, 17, 26, 0.7)' }} />
            </AbsoluteFill>

            {/* Main Content */}
            <AbsoluteFill
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                {/* HIIQ Logo White */}
                <Img
                    src={staticFile("brand-assets/hiiq-logo-white.svg")}
                    style={{
                        width: '40%',
                        opacity: logoOpacity,
                        transform: `translate(${logoX}px, ${logoY}px) scale(${logoScale})`,
                    }}
                />

                {/* Tagline */}
                <div
                    style={{
                        fontFamily: 'Unbounded, sans-serif',
                        color: '#00F0FF', // Cyan
                        fontSize: 60,
                        fontWeight: 700,
                        marginTop: 40,
                        opacity: textOpacity,
                        transform: `translateY(${textY}px)`,
                        textShadow: '0 0 20px rgba(0, 240, 255, 0.5)',
                        letterSpacing: '0.1em',
                    }}
                >
                    CONTROL IN CHAOS
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
