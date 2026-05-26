import AnimationLayer from "./AnimationLayer";

import Body from "../assets/Customization/body.png";

import HairDefault from "../assets/Customization/hair_1.png";
import HairSilver from "../assets/Customization/hair_2.png";
import HairBlue from "../assets/Customization/hair_3.png";

import ClothesDefault from "../assets/Customization/clothes_1.png";
import ClothesBlue from "../assets/Customization/clothes_2.png";
import ClothesDark from "../assets/Customization/clothes_3.png";

// TREE
import Tree1 from "../assets/Customization/Animation/tree_1.png";
import Tree2 from "../assets/Customization/Animation/tree_2.png";
import Tree3 from "../assets/Customization/Animation/tree_3.png";
import Tree4 from "../assets/Customization/Animation/tree_4.png";
import Tree5 from "../assets/Customization/Animation/tree_5.png";
import Tree6 from "../assets/Customization/Animation/tree_6.png";
import Tree7 from "../assets/Customization/Animation/tree_7.png";

// GALAXY
import Galaxy1 from "../assets/Customization/Animation/galaxy_1.png";
import Galaxy2 from "../assets/Customization/Animation/galaxy_2.png";
import Galaxy3 from "../assets/Customization/Animation/galaxy_3.png";
import Galaxy4 from "../assets/Customization/Animation/galaxy_4.png";
import Galaxy5 from "../assets/Customization/Animation/galaxy_5.png";
import Galaxy6 from "../assets/Customization/Animation/galaxy_6.png";
import Galaxy7 from "../assets/Customization/Animation/galaxy_7.png";
import Galaxy8 from "../assets/Customization/Animation/galaxy_8.png";

// SNOW
import Snow1 from "../assets/Customization/Animation/snow_1.png";
import Snow2 from "../assets/Customization/Animation/snow_2.png";
import Snow3 from "../assets/Customization/Animation/snow_3.png";
import Snow4 from "../assets/Customization/Animation/snow_4.png";

// SUNSET
import Sunset1 from "../assets/Customization/Animation/sunset_1.png";
import Sunset2 from "../assets/Customization/Animation/sunset_2.png";
import Sunset3 from "../assets/Customization/Animation/sunset_3.png";
import Sunset4 from "../assets/Customization/Animation/sunset_4.png";

// ARM FRAMES
import Arm1 from "../assets/Customization/Animation/arm_1.png";
import Arm2 from "../assets/Customization/Animation/arm_2.png";
import Arm3 from "../assets/Customization/Animation/arm_3.png";

// DEFAULT SLEEVE
import SleeveDefault1 from "../assets/Customization/Animation/sleeve_1.png";
import SleeveDefault2 from "../assets/Customization/Animation/sleeve_1.png";
import SleeveDefault3 from "../assets/Customization/Animation/sleeve_1.png";

// BLUE SLEEVE
import SleeveBlue1 from "../assets/Customization/Animation/sleeve_2.png";
import SleeveBlue2 from "../assets/Customization/Animation/sleeve_2.png";
import SleeveBlue3 from "../assets/Customization/Animation/sleeve_2.png";

// DARK SLEEVE
import SleeveDark1 from "../assets/Customization/Animation/sleeve_3.png";
import SleeveDark2 from "../assets/Customization/Animation/sleeve_3.png";
import SleeveDark3 from "../assets/Customization/Animation/sleeve_3.png";

// WALLPAPER
import WallpaperDefault from "../assets/Customization/wallpaper_1.png";
import WallpaperPink from "../assets/Customization/wallpaper_2.png";
import WallpaperBlue from "../assets/Customization/wallpaper_3.png";

// WINDOW FRAME
import WindowFrame from "../assets/Customization/window.png";

// DESK
import DeskDefault from "../assets/Customization/desk_1.png";
import DeskGaming from "../assets/Customization/desk_2.png";

// DRAWER
import Drawer from "../assets/Customization/laci.png";

// CHAIR
import ChairDefault from "../assets/Customization/chair_1.png";
import ChairGaming from "../assets/Customization/chair_2.png";

function SceneRenderer({ equippedItems }) {
  // HAIR MAP
  const hairMap = {
    default: HairDefault,
    silver: HairSilver,
    blue: HairBlue,
  };

  // CLOTHES MAP
  const clothesMap = {
    default: ClothesDefault,
    blue: ClothesBlue,
    dark: ClothesDark,
  };

  // WALLPAPER MAP
  const wallpaperMap = {
    default: WallpaperDefault,
    pink: WallpaperPink,
    blue: WallpaperBlue,
  };

  // DESK MAP
  const deskMap = {
    default: DeskDefault,
    gaming: DeskGaming,
  };

  // CHAIR MAP
  const chairMap = {
    default: ChairDefault,
    gaming: ChairGaming,
  };

  // TREE
  const treeFrames = [Tree1, Tree2, Tree3, Tree4, Tree5, Tree6, Tree7];

  // GALAXY
  const galaxyFrames = [
    Galaxy1,
    Galaxy2,
    Galaxy3,
    Galaxy4,
    Galaxy5,
    Galaxy6,
    Galaxy7,
    Galaxy8,
  ];

  // SNOW
  const snowFrames = [Snow1, Snow2, Snow3, Snow4];

  // SUNSET
  const sunsetFrames = [Sunset1, Sunset2, Sunset3, Sunset4];

  // VIEW ANIMATION MAP
  const animationViewMap = {
    default: treeFrames,
    galaxy: galaxyFrames,
    snow: snowFrames,
    sunset: sunsetFrames,
  };

  // ARM ANIMATION
  const armFrames = [Arm1, Arm2, Arm3];

  // SLEEVE MAP
  const sleeveMap = {
    default: [SleeveDefault1, SleeveDefault2, SleeveDefault3],

    blue: [SleeveBlue1, SleeveBlue2, SleeveBlue3],

    dark: [SleeveDark1, SleeveDark2, SleeveDark3],
  };

  return (
    <div className="scene-renderer">
      {/* WALLPAPER */}
      <img
        src={wallpaperMap[equippedItems.wallpaper]}
        alt=""
        className="scene-layer"
      />

      {/* ANIMATED VIEW */}
      <AnimationLayer
        frames={animationViewMap[equippedItems.windowView] || treeFrames}
        frameDuration={220}
        className="scene-layer"
      />

      {/* WINDOW */}
      <img src={WindowFrame} alt="" className="scene-layer" />

      {/* DRAWER */}
      <img src={Drawer} alt="" className="scene-layer" />

      {/* CHAIR */}
      <img src={chairMap[equippedItems.chair]} alt="" className="scene-layer" />

      {/* BODY */}
      <img src={Body} alt="" className="scene-layer" />

      {/* CLOTHES */}
      <img
        src={clothesMap[equippedItems.clothes]}
        alt=""
        className="scene-layer"
      />

      {/* DESK */}
      <img src={deskMap[equippedItems.desk]} alt="" className="scene-layer" />

      {/* ARM ANIMATION */}
      <AnimationLayer
        frames={armFrames}
        frameDuration={220}
        className="scene-layer"
      />

      {/* SLEEVE ANIMATION */}
      <AnimationLayer
        frames={sleeveMap[equippedItems.clothes]}
        frameDuration={220}
        className="scene-layer"
      />

      {/* HAIR */}
      <img src={hairMap[equippedItems.hair]} alt="" className="scene-layer" />
    </div>
  );
}

export default SceneRenderer;
