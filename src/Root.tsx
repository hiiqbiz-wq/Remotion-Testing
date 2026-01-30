import { Composition } from 'remotion';
import { HeroLoop } from './HeroLoop';
import { BrandVideo } from './BrandVideo';

export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="HiiqHeroLoop"
                component={HeroLoop}
                durationInFrames={300}
                fps={30}
                width={1920}
                height={1080}
            />
            <Composition
                id="BrandVideo"
                component={BrandVideo}
                durationInFrames={300}
                fps={30}
                width={1920}
                height={1080}
            />
        </>
    );
};
