import { Composition, Still } from "remotion";
import { HairyMaclary } from "./HairyMaclary";
import { StaticPost } from "./GuessHowMuch/StaticPost";
import { GuessHowMuchVideo } from "./GuessHowMuch/Video";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Hairy Maclary compositions */}
      <Composition
        id="HairyMaclary"
        component={HairyMaclary}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          imagePath: "../Images/social media/Social Media Images/29.png",
        }}
      />
      <Composition
        id="HairyMaclarySquare"
        component={HairyMaclary}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{
          imagePath: "../Images/social media/Social Media Images/29.png",
        }}
      />

      {/* Guess How Much I Love You - Static Post */}
      <Still
        id="GuessHowMuch-Post"
        component={StaticPost}
        width={1080}
        height={1080}
      />

      {/* Guess How Much I Love You - Videos */}
      <Composition
        id="GuessHowMuch-Reel"
        component={GuessHowMuchVideo}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="GuessHowMuch-Square"
        component={GuessHowMuchVideo}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1080}
      />
    </>
  );
};
