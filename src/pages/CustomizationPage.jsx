import { useState } from "react";

import HairIcon from "../assets/HairIcon.svg";
import ClothesIcon from "../assets/ClothesIcon.svg";
import WallpaperIcon from "../assets/WallpaperIcon.svg";
import WindowViewIcon from "../assets/WindowView.svg";
import DeskSetIcon from "../assets/DeskSet.svg";
import ItemCard from "../components/ItemCard";
import ArrowDownIcon from "../assets/ArrowDownIcon.png";
import AccessoryIcon from "../assets/AccessoryIcon.png";
import WindowIcon from "../assets/WindowIcon.png";

// =========================
// HAIR ICONS
// =========================

import IconHair1 from "../assets/Customization/Icons/icon_hair_1.png";
import IconHair2 from "../assets/Customization/Icons/icon_hair_2.png";
import IconHair3 from "../assets/Customization/Icons/icon_hair_3.png";
import IconHair4 from "../assets/Customization/Icons/icon_hair_4.png";
import IconHair5 from "../assets/Customization/Icons/icon_hair_5.png";

// =========================
// CLOTHES ICONS
// =========================

import IconClothes1 from "../assets/Customization/Icons/icon_clothes_1.png";
import IconClothes2 from "../assets/Customization/Icons/icon_clothes_2.png";
import IconClothes3 from "../assets/Customization/Icons/icon_clothes_3.png";
import IconClothes4 from "../assets/Customization/Icons/icon_clothes_4.png";
import IconClothes5 from "../assets/Customization/Icons/icon_clothes_5.png";

// =========================
// ACCESSORY ICONS
// =========================

import IconAccessory1 from "../assets/Customization/Icons/icon_accessory_1.png";
import IconAccessory2 from "../assets/Customization/Icons/icon_accessory_2.png";
import IconAccessory3 from "../assets/Customization/Icons/icon_accessory_3.png";
import IconAccessory4 from "../assets/Customization/Icons/icon_accessory_4.png";

// =========================
// WALLPAPER ICONS
// =========================

import IconWallpaper1 from "../assets/Customization/Icons/icon_wallpaper_1.png";
import IconWallpaper2 from "../assets/Customization/Icons/icon_wallpaper_2.png";
import IconWallpaper3 from "../assets/Customization/Icons/icon_wallpaper_3.png";
import IconWallpaper4 from "../assets/Customization/Icons/icon_wallpaper_4.png";
import IconWallpaper5 from "../assets/Customization/Icons/icon_wallpaper_5.png";
import IconWallpaper6 from "../assets/Customization/Icons/icon_wallpaper_6.png";
import IconWallpaper7 from "../assets/Customization/Icons/icon_wallpaper_7.png";

// =========================
// WINDOW ICONS
// =========================

import IconWindow1 from "../assets/Customization/Icons/icon_window_1.png";
import IconWindow2 from "../assets/Customization/Icons/icon_window_2.png";
import IconWindow3 from "../assets/Customization/Icons/icon_window_3.png";
import IconWindow4 from "../assets/Customization/Icons/icon_window_4.png";

// =========================
// DESK ICONS
// =========================

import IconDeskset1 from "../assets/Customization/Icons/icon_deskset_1.png";
import IconDeskset2 from "../assets/Customization/Icons/icon_deskset_2.png";
import IconDeskset3 from "../assets/Customization/Icons/icon_deskset_3.png";
import IconDeskset4 from "../assets/Customization/Icons/icon_deskset_4.png";

// =========================
// VIEW ICONS
// =========================

import IconView1 from "../assets/Customization/Icons/icon_view_1.png";
import IconView2 from "../assets/Customization/Icons/icon_view_2.png";
import IconView3 from "../assets/Customization/Icons/icon_view_3.png";
import IconView4 from "../assets/Customization/Icons/icon_view_4.png";

function CustomizationPage({
  setPage,
  isClosingCustomization,
  setIsClosingCustomization,

  equippedItems,
  setEquippedItems,

  coins,
  setCoins,

  ownedItems,
  setOwnedItems,
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
      name: "Accessory",
      icon: AccessoryIcon,
      stateKey: "accessory",
    },

    {
      name: "Dinding",
      icon: WallpaperIcon,
      stateKey: "wallpaper",
    },

    {
      name: "Window",
      icon: WindowIcon,
      stateKey: "window",
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
        name: "Blonde",
        image: IconHair1,
        price: 0,
      },

      {
        id: 2,
        key: "cream",
        name: "Cream",
        image: IconHair2,
        price: 300,
      },

      {
        id: 3,
        key: "brown",
        name: "Brown",
        image: IconHair3,
        price: 400,
      },

      {
        id: 4,
        key: "orange",
        name: "Orange",
        image: IconHair4,
        price: 500,
      },

      {
        id: 5,
        key: "blonde",
        name: "Blonde",
        image: IconHair5,
        price: 600,
      },
    ],

    Baju: [
      {
        id: 6,
        key: "default",
        name: "Default",
        image: IconClothes1,
        price: 0,
      },

      {
        id: 7,
        key: "sweater",
        name: "Sweater",
        image: IconClothes2,
        price: 500,
      },

      {
        id: 8,
        key: "turtleneck",
        name: "Turtleneck",
        image: IconClothes3,
        price: 800,
      },

      {
        id: 9,
        key: "fantasy",
        name: "Fantasy",
        image: IconClothes4,
        price: 700,
      },

      {
        id: 10,
        key: "royal",
        name: "Royal",
        image: IconClothes5,
        price: 900,
      },
    ],

    Accessory: [
      {
        id: 11,
        key: "default",
        name: "Default",
        image: IconAccessory1,
        price: 0,
      },

      {
        id: 12,
        key: "elegant",
        name: "Elegant",
        image: IconAccessory2,
        price: 500,
      },

      {
        id: 13,
        key: "fantasy",
        name: "Fantasy",
        image: IconAccessory3,
        price: 700,
      },

      {
        id: 14,
        key: "royal",
        name: "Royal",
        image: IconAccessory4,
        price: 1000,
      },
    ],

    Dinding: [
      {
        id: 15,
        key: "default",
        name: "Default",
        image: IconWallpaper1,
        price: 0,
      },

      {
        id: 16,
        key: "blue",
        name: "Blue",
        image: IconWallpaper2,
        price: 400,
      },

      {
        id: 17,
        key: "white",
        name: "White",
        image: IconWallpaper3,
        price: 600,
      },

      {
        id: 18,
        key: "brick",
        name: "Brick",
        image: IconWallpaper4,
        price: 700,
      },

      {
        id: 19,
        key: "cottage",
        name: "Cottage",
        image: IconWallpaper5,
        price: 800,
      },

      {
        id: 20,
        key: "fantasy",
        name: "Fantasy",
        image: IconWallpaper6,
        price: 1000,
      },

      {
        id: 21,
        key: "royal",
        name: "Royal",
        image: IconWallpaper7,
        price: 1200,
      },
    ],

    Window: [
      {
        id: 22,
        key: "default",
        name: "Default",
        image: IconWindow1,
        price: 0,
      },

      {
        id: 23,
        key: "elegant",
        name: "Elegant",
        image: IconWindow2,
        price: 600,
      },

      {
        id: 24,
        key: "fantasy",
        name: "Fantasy",
        image: IconWindow3,
        price: 900,
      },

      {
        id: 25,
        key: "royal",
        name: "Royal",
        image: IconWindow4,
        price: 1200,
      },
    ],

    View: [
      {
        id: 26,
        key: "forest",
        name: "Forest",
        image: IconView1,
        price: 0,
      },

      {
        id: 27,
        key: "galaxy",
        name: "Galaxy",
        image: IconView2,
        price: 1200,
      },

      {
        id: 28,
        key: "snow",
        name: "Snow",
        image: IconView3,
        price: 1000,
      },

      {
        id: 29,
        key: "sunset",
        name: "Sunset",
        image: IconView4,
        price: 1100,
      },
    ],

    Meja: [
      {
        id: 30,
        key: "default",
        name: "Default",
        image: IconDeskset1,
        price: 0,
      },

      {
        id: 31,
        key: "gaming",
        name: "Gaming",
        image: IconDeskset2,
        price: 1000,
      },

      {
        id: 32,
        key: "fantasy",
        name: "Fantasy",
        image: IconDeskset3,
        price: 900,
      },

      {
        id: 33,
        key: "royal",
        name: "Royal",
        image: IconDeskset4,
        price: 1400,
      },
    ],
  };

  const selectedCategoryData = categories.find(
    (category) => category.name === selectedCategory,
  );
  const currentItems = customizationItems[selectedCategory] || [];

  function isItemOwned(item) {
    return ownedItems[selectedCategoryData.stateKey]?.includes(item.key);
  }

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
                price={item.price}
                owned={isItemOwned(item)}
                equipped={isItemEquipped(item)}
                selected={selectedItemId === item.id}
                onClick={() => {
                  setSelectedItemId(item.id);

                  const categoryKey = selectedCategoryData.stateKey;

                  const alreadyOwned = isItemOwned(item);

                  // ======================
                  // BUY ITEM
                  // ======================
                  if (!alreadyOwned) {
                    if (coins < item.price) {
                      alert("Coin tidak cukup!");
                      return;
                    }

                    setCoins((prev) => prev - item.price);

                    setOwnedItems((prev) => ({
                      ...prev,

                      [categoryKey]: [...prev[categoryKey], item.key],
                    }));

                    return;
                  }

                  // ======================
                  // EQUIP ITEM
                  // ======================
                  setEquippedItems((prev) => ({
                    ...prev,

                    [categoryKey]: item.key,
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
