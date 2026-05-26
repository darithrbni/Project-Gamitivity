import { useState } from "react";

import HairIcon from "../assets/HairIcon.svg";
import ClothesIcon from "../assets/ClothesIcon.svg";
import WallpaperIcon from "../assets/WallpaperIcon.svg";
import WindowViewIcon from "../assets/WindowView.svg";
import DeskSetIcon from "../assets/DeskSet.svg";
import ItemCard from "../components/ItemCard";

import ArrowDownIcon from "../assets/ArrowDownIcon.png";

// HAIR ICONS
import IconHair1 from "../assets/Customization/Icons/icon_hair_1.png";
import IconHair2 from "../assets/Customization/Icons/icon_hair_2.png";
import IconHair3 from "../assets/Customization/Icons/icon_hair_3.png";

// CLOTHES ICONS
import IconClothes1 from "../assets/Customization/Icons/icon_clothes_1.png";
import IconClothes2 from "../assets/Customization/Icons/icon_clothes_2.png";
import IconClothes3 from "../assets/Customization/Icons/icon_clothes_3.png";

// DESK ICONS
import IconDeskset1 from "../assets/Customization/Icons/icon_deskset_1.png";
import IconDeskset2 from "../assets/Customization/Icons/icon_deskset_2.png";

// VIEW ICONS
import IconTree from "../assets/Customization/Icons/icon_tree_1.png";
import IconGalaxy from "../assets/Customization/Icons/icon_galaxy.png";
import IconSnow from "../assets/Customization/Icons/icon_snow.png";
import IconSunset from "../assets/Customization/Icons/icon_sunset_1.png";

// WALLPAPER ICONS
import IconWallpaper1 from "../assets/Customization/Icons/icon_wallpaper_1.png";
import IconWallpaper2 from "../assets/Customization/Icons/icon_wallpaper_2.png";
import IconWallpaper3 from "../assets/Customization/Icons/icon_wallpaper_3.png";
import IconWallpaper4 from "../assets/Customization/Icons/icon_wallpaper_4.png";
import IconWallpaper5 from "../assets/Customization/Icons/icon_wallpaper_5.png";

function CustomizationPage({
  setPage,
  isClosingCustomization,
  setIsClosingCustomization,

  equippedItems,
  setEquippedItems,
}) {
  const [selectedCategory, setSelectedCategory] = useState("Rambut");
  const categories = [
    {
      name: "Rambut",
      icon: HairIcon,
      stateKey: "hair",
    },

    {
      name: "Baju",
      icon: ClothesIcon,
      stateKey: "clothes",
    },

    {
      name: "Dinding",
      icon: WallpaperIcon,
      stateKey: "wallpaper",
    },

    {
      name: "View",
      icon: WindowViewIcon,
      stateKey: "windowView",
    },

    {
      name: "Meja",
      icon: DeskSetIcon,
      stateKey: "desk",
    },
  ];

  const [selectedItemId, setSelectedItemId] = useState(1);

  const customizationItems = {
    Rambut: [
      {
        id: 1,
        key: "default",
        name: "Rambut Pirang",
        image: IconHair1,
        owned: true,
      },

      {
        id: 2,
        key: "silver",
        name: "Rambut Krem",
        image: IconHair2,
        owned: true,
      },

      {
        id: 3,
        key: "blue",
        name: "Rambut Cokelat",
        image: IconHair3,
        owned: true,
      },
    ],

    Baju: [
      {
        id: 4,
        key: "default",
        name: "Baju Default",
        image: IconClothes1,
        owned: true,
      },

      {
        id: 5,
        key: "blue",
        name: "Hoodie Biru",
        image: IconClothes2,
        owned: true,
      },

      {
        id: 6,
        key: "dark",
        name: "Jaket Hitam",
        image: IconClothes3,
        owned: true,
      },
    ],

    Dinding: [
      {
        id: 7,
        key: "default",
        name: "Wallpaper Krem",
        image: IconWallpaper1,
        owned: true,
      },
      {
        id: 8,
        key: "pink",
        name: "Wallpaper Biru",
        image: IconWallpaper2,
        owned: true,
      },
      {
        id: 9,
        key: "blue",
        name: "Wallpaper Putih",
        image: IconWallpaper3,
        owned: true,
      },
    ],

    View: [
      {
        id: 10,
        key: "default",
        name: "Hutan",
        image: IconTree,
        owned: true,
      },

      {
        id: 11,
        key: "galaxy",
        name: "Langit Malam",
        image: IconGalaxy,
        owned: true,
      },

      {
        id: 12,
        key: "snow",
        name: "Musim Salju",
        image: IconSnow,
        owned: true,
      },

      {
        id: 13,
        key: "sunset",
        name: "Pantai",
        image: IconSunset,
        owned: true,
      },
    ],

    Meja: [
      {
        id: 14,
        key: "default",
        name: "Meja Kayu",
        image: IconDeskset1,
        owned: true,
      },
      {
        id: 15,
        key: "gaming",
        name: "Meja Gaming",
        image: IconDeskset2,
        owned: true,
      },
    ],
  };

  const selectedCategoryData = categories.find(
    (category) => category.name === selectedCategory,
  );
  const currentItems = customizationItems[selectedCategory] || [];

  function isItemEquipped(item) {
    return equippedItems[selectedCategoryData.stateKey] === item.key;
  }

  return (
    <>
      {/* CUSTOMIZATION SIDEBAR */}
      <div className="customization-wrapper">
        <div
          className={`customization-sidebar ${
            isClosingCustomization
              ? "customization-sidebar-close"
              : "customization-sidebar-open"
          }`}
        >
          <button
            className="customization-close-button"
            onClick={() => {
              setIsClosingCustomization(true);

              setTimeout(() => {
                setPage("main");

                setIsClosingCustomization(false);
              }, 300);
            }}
          >
            <img
              src={ArrowDownIcon}
              alt="Close"
              className="customization-close-icon"
            />
          </button>
          <div className="customization-categories">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`customization-category-button ${
                  selectedCategory === category.name
                    ? "customization-category-button-active"
                    : ""
                }`}
                onClick={() => {
                  setSelectedCategory(category.name);

                  const firstItem = customizationItems[category.name]?.[0];

                  if (firstItem) {
                    setSelectedItemId(firstItem.id);
                  }
                }}
              >
                <img
                  src={category.icon}
                  alt={category.name}
                  className="customization-category-icon"
                />

                <span className="customization-category-text">
                  {category.name}
                </span>
              </button>
            ))}
          </div>

          <div className="customization-divider" />

          <div className="customization-items-row">
            {currentItems.map((item) => (
              <ItemCard
                key={item.id}
                image={item.image}
                name={item.name}
                owned={item.owned}
                equipped={isItemEquipped(item)}
                selected={selectedItemId === item.id}
                onClick={() => {
                  setSelectedItemId(item.id);

                  if (!item.owned) {
                    return;
                  }

                  setEquippedItems((prev) => ({
                    ...prev,
                    [selectedCategoryData.stateKey]: item.key,
                  }));
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomizationPage;
