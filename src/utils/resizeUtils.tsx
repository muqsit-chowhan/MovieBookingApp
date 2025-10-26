import { Dimensions } from "react-native";

export const getHeight = function getDimentions(val: any) {
    const result = (val / 100) * Dimensions.get('window').height;
    return result;
  };
  export const getWidth = function getDimentions(val: any) {
    const result = (val / 100) * Dimensions.get('window').width;
    return result;
  };
  