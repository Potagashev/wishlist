import beauty_and_care from "../../app/icons/beauty_and_care.svg";
import buisness from "../../app/icons/buisness.svg";
import collecting from "../../app/icons/collecting.svg";
import dacha from "../../app/icons/dacha.svg";
import family_and_children from "../../app/icons/family_and_children.svg";
import fashion_and_style from "../../app/icons/fashion_and_style.svg";
import food_and_drinks from "../../app/icons/food_and_drinks.svg";
import games_and_toys from "../../app/icons/games_and_toys.svg";
import house from "../../app/icons/house.svg";
import humor_and_souvenirs from "../../app/icons/humor_and_souvenirs.svg";
import jewelry from "../../app/icons/jewelry.svg";
import other_sections from "../../app/icons/other_sections.svg";
import practical_things from "../../app/icons/practical_things.svg";
import romance from "../../app/icons/romance.svg";

export class Matches {
  public static matchParams(categoryName: string): string {
    let fileName = "";

    switch (categoryName) {
      case "beauty_and_care":
        fileName = beauty_and_care;
        break;

      case "buisness":
        fileName = buisness;
        break;

      case "collecting":
        fileName = collecting;
        break;

      case "dacha":
        fileName = dacha;
        break;

      case "family_and_children":
        fileName = family_and_children;
        break;

      case "fashion_and_style":
        fileName = fashion_and_style;
        break;

      case "food_and_drinks":
        fileName = food_and_drinks;
        break;

      case "games_and_toys":
        fileName = games_and_toys;
        break;

      case "house":
        fileName = house;
        break;

      case "humor_and_souvenirs":
        fileName = humor_and_souvenirs;
        break;

      case "jewelry":
        fileName = jewelry;
        break;

      case "other_sections":
        fileName = other_sections;
        break;

      case "practical_things":
        fileName = practical_things;
        break;

      case "romance":
        fileName = romance;
        break;

      default:
        break;
    }

    return categoryName;
  }
}
