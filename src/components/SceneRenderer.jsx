import AnimationLayer from "./AnimationLayer";

// =========================
// BODY
// =========================

import Body from "../assets/Customization/body.png";

// =========================
// HAIR
// =========================

import HairDefault from "../assets/Customization/hair_default.png";
import HairCream from "../assets/Customization/hair_cream.png";
import HairBrown from "../assets/Customization/hair_brown.png";
import HairOrange from "../assets/Customization/hair_orange.png";
import HairBlonde from "../assets/Customization/hair_blonde.png";

// =========================
// CLOTHES
// =========================

import ClothesDefault from "../assets/Customization/clothes_default.png";
import ClothesFantasy from "../assets/Customization/clothes_fantasy.png";
import ClothesNoble from "../assets/Customization/clothes_noble.png";
import ClothesSweater from "../assets/Customization/clothes_sweater.png";
import ClothesTurtleneck from "../assets/Customization/clothes_turtleneck.png";

// =========================
// ACCESSORY
// =========================

import AccessoryDefault from "../assets/Customization/accessory_default.png";
import AccessoryElegant from "../assets/Customization/accessory_elegant.png";
import AccessoryFantasy from "../assets/Customization/accessory_fantasy.png";
import AccessoryRoyal from "../assets/Customization/accessory_royal.png";

// =========================
// WALLPAPER
// =========================

import WallpaperDefault from "../assets/Customization/wallpaper_default.png";
import WallpaperBlue from "../assets/Customization/wallpaper_blue.png";
import WallpaperBrick from "../assets/Customization/wallpaper_brick.png";
import WallpaperCottage from "../assets/Customization/wallpaper_cottage.png";
import WallpaperFantasy from "../assets/Customization/wallpaper_fantasy.png";
import WallpaperRoyal from "../assets/Customization/wallpaper_royal.png";
import WallpaperWhite from "../assets/Customization/wallpaper_white.png";

// =========================
// WINDOW
// =========================

import WindowDefault from "../assets/Customization/window_default.png";
import WindowElegant from "../assets/Customization/window_elegant.png";
import WindowFantasy from "../assets/Customization/window_fantasy.png";
import WindowRoyal from "../assets/Customization/window_royal.png";

// =========================
// DESK
// =========================

import DeskDefault from "../assets/Customization/desk_default.png";
import DeskFantasy from "../assets/Customization/desk_fantasy.png";
import DeskGaming from "../assets/Customization/desk_gaming.png";
import DeskRoyal from "../assets/Customization/desk_royal.png";

// =========================
// CHAIR
// =========================

import ChairDefault from "../assets/Customization/chair_default.png";
import ChairFantasy from "../assets/Customization/chair_fantasy.png";
import ChairGaming from "../assets/Customization/chair_gaming.png";
import ChairRoyal from "../assets/Customization/chair_royal.png";

// =========================
// TREE
// =========================

import Tree1 from "../assets/Customization/Animation/tree_1.png";
import Tree2 from "../assets/Customization/Animation/tree_2.png";
import Tree3 from "../assets/Customization/Animation/tree_3.png";
import Tree4 from "../assets/Customization/Animation/tree_4.png";
import Tree5 from "../assets/Customization/Animation/tree_5.png";
import Tree6 from "../assets/Customization/Animation/tree_6.png";
import Tree7 from "../assets/Customization/Animation/tree_7.png";

// =========================
// GALAXY
// =========================

import Galaxy1 from "../assets/Customization/Animation/galaxy_1.png";
import Galaxy2 from "../assets/Customization/Animation/galaxy_2.png";
import Galaxy3 from "../assets/Customization/Animation/galaxy_3.png";
import Galaxy4 from "../assets/Customization/Animation/galaxy_4.png";
import Galaxy5 from "../assets/Customization/Animation/galaxy_5.png";
import Galaxy6 from "../assets/Customization/Animation/galaxy_6.png";
import Galaxy7 from "../assets/Customization/Animation/galaxy_7.png";
import Galaxy8 from "../assets/Customization/Animation/galaxy_8.png";

// =========================
// SNOW
// =========================

import Snow1 from "../assets/Customization/Animation/snow_1.png";
import Snow2 from "../assets/Customization/Animation/snow_2.png";
import Snow3 from "../assets/Customization/Animation/snow_3.png";
import Snow4 from "../assets/Customization/Animation/snow_4.png";

// =========================
// SUNSET
// =========================

import Sunset1 from "../assets/Customization/Animation/sunset_1.png";
import Sunset2 from "../assets/Customization/Animation/sunset_2.png";
import Sunset3 from "../assets/Customization/Animation/sunset_3.png";
import Sunset4 from "../assets/Customization/Animation/sunset_4.png";

// =========================
// ARM
// =========================

import Arm1 from "../assets/Customization/Animation/arm_1.png";
import Arm2 from "../assets/Customization/Animation/arm_2.png";
import Arm3 from "../assets/Customization/Animation/arm_3.png";

function SceneRenderer({ equippedItems }) {
  // =========================
  // HAIR MAP
  // =========================

  const hairMap = {
    default: HairDefault,
    cream: HairCream,
    brown: HairBrown,
    orange: HairOrange,
    blonde: HairBlonde,
  };

  // =========================
  // CLOTHES MAP
  // =========================

  const clothesMap = {
    default: ClothesDefault,
    fantasy: ClothesFantasy,
    royal: ClothesNoble,
    sweater: ClothesSweater,
    turtleneck: ClothesTurtleneck,
  };

  // =========================
  // ACCESSORY MAP
  // =========================

  const accessoryMap = {
    default: AccessoryDefault,
    elegant: AccessoryElegant,
    fantasy: AccessoryFantasy,
    royal: AccessoryRoyal,
  };

  // =========================
  // WALLPAPER MAP
  // =========================

  const wallpaperMap = {
    default: WallpaperDefault,
    blue: WallpaperBlue,
    brick: WallpaperBrick,
    cottage: WallpaperCottage,
    fantasy: WallpaperFantasy,
    royal: WallpaperRoyal,
    white: WallpaperWhite,
  };

  // =========================
  // WINDOW MAP
  // =========================

  const windowMap = {
    default: WindowDefault,
    elegant: WindowElegant,
    fantasy: WindowFantasy,
    royal: WindowRoyal,
  };

  // =========================
  // DESK MAP
  // =========================

  const deskMap = {
    default: DeskDefault,
    fantasy: DeskFantasy,
    gaming: DeskGaming,
    royal: DeskRoyal,
  };

  // =========================
  // CHAIR MAP
  // =========================

  const chairMap = {
    default: ChairDefault,
    fantasy: ChairFantasy,
    gaming: ChairGaming,
    royal: ChairRoyal,
  };

  // =========================
  // VIEW FRAMES
  // =========================

  const treeFrames = [Tree1, Tree2, Tree3, Tree4, Tree5, Tree6, Tree7];

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

  const snowFrames = [Snow1, Snow2, Snow3, Snow4];

  const sunsetFrames = [Sunset1, Sunset2, Sunset3, Sunset4];

  // =========================
  // VIEW MAP
  // =========================

  const animationViewMap = {
    forest: treeFrames,
    galaxy: galaxyFrames,
    snow: snowFrames,
    sunset: sunsetFrames,
  };

  // =========================
  // ARM
  // =========================

  const armFrames = [Arm1, Arm2, Arm3];

  return (
    <div className="scene-renderer">
      {/* WALLPAPER */}
      <img
        src={wallpaperMap[equippedItems.wallpaper]}
        alt=""
        className="scene-layer"
      />

      {/* VIEW */}
      <AnimationLayer
        frames={animationViewMap[equippedItems.windowView] || treeFrames}
        frameDuration={220}
        className="scene-layer"
      />

      {/* WINDOW */}
      <img
        src={windowMap[equippedItems.window]}
        alt=""
        className="scene-layer"
      />

      {/* ACCESSORY */}
      <img
        src={accessoryMap[equippedItems.accessory]}
        alt=""
        className="scene-layer"
      />

      {/* CHAIR */}
      <img src={chairMap[equippedItems.desk]} alt="" className="scene-layer" />

      {/* BODY */}
      <img src={Body} alt="" className="scene-layer" />

      {/* ARM */}
      <AnimationLayer
        frames={armFrames}
        frameDuration={220}
        className="scene-layer"
      />

      {/* CLOTHES */}
      <img
        src={clothesMap[equippedItems.clothes]}
        alt=""
        className="scene-layer"
      />

      {/* DESK */}
      <img src={deskMap[equippedItems.desk]} alt="" className="scene-layer" />

      {/* HAIR */}
      <img src={hairMap[equippedItems.hair]} alt="" className="scene-layer" />
    </div>
  );
}

export default SceneRenderer;
