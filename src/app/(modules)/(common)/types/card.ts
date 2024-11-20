import { ImageSourcePropType } from "react-native";

export interface ICard {
  cardId: string;
  name: string;
  securityCode: string;
  cardNumber: string;
  holder: string;
  expirationDate: string;
  brand: string;
  favorite: boolean;
  used: boolean;
  brandImage: ImageSourcePropType;
}
