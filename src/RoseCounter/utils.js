import { proportions, roseColors, boxSizesMap } from "../const";
const getDivision = (num, colorAmount) => {
  let result = [];

  const oneDivision = num / colorAmount;
  if (num % colorAmount === 0) {
    result = new Array(colorAmount).fill(oneDivision);
  } else {
    result.push(Math.ceil(oneDivision));
    for (let i = 2; i <= colorAmount; i++) {
      result.push(Math.floor(oneDivision));
    }
  }
  return result;
};

const decodeCombination = (combination) => {
  let result = [];

  while (combination.length !== 0) {
    roseColors.forEach((color) => {
      if (combination.indexOf(color) !== 0) {
        return;
      } else {
        result.push(color);
        combination = combination.slice(color.length);
      }
    });
  }
  return result;
};

const getColorsPerBouqet = (bouqSize, orderColorCode) => {
  const result = {};
  const bColors = decodeCombination(orderColorCode);
  bColors.forEach((color, i) => {
    const proprotion =
      proportions[bouqSize] && proportions[bouqSize][bColors.length]
        ? proportions[bouqSize][bColors.length]
        : getDivision(bouqSize, bColors.length);
    result[color] = parseInt(proprotion[i], 10);
  });

  return result;
};

const getSumOfColors = (obj) => Object.keys(obj).reduce((sum, key) => sum + parseFloat(obj[key] || 0), 0);

const getPackagingColor = (packagingType, splitSku) => (packagingType !== "K" ? splitSku[1] : "plain");

const getRealPackagingNames = (packagingDetails) => {
  let result = {};
  Object.keys(packagingDetails).forEach((packagingType) => {
    result[packagingType] = {};
    const colors = Object.keys(packagingDetails[packagingType]);
    colors.forEach((color) => {
      switch (packagingType) {
        case "B": {
          const sumOfColors = getSumOfColors(packagingDetails[packagingType][color]);
          result[packagingType][color] = `${sumOfColors / 2} листов (${sumOfColors}шт.)`;
          break;
        }
        case "K": {
          result[packagingType][color] = `${packagingDetails[packagingType]["plain"][27]} шт.`;
          break;
        }
        case "M": {
          const sumOfColors = getSumOfColors(packagingDetails[packagingType][color]);
          result[packagingType][color] = `${sumOfColors} шт.`;
          break;
        }
        case "SH":
        case "Z": {
          const obj = packagingDetails[packagingType][color];
          let res = "";
          Object.keys(obj).forEach((size) => {
            res = `${res}${boxSizesMap[packagingType][size]}см - ${obj[size]} шт.\n`;
          });
          result[packagingType][color] = res;
          break;
        }
        case "ZS":
        case "S": {
          const obj = packagingDetails[packagingType][color];
          let res = "";
          Object.keys(obj).forEach((size) => {
            res = `${res}${size} - ${obj[size]} шт.\n`;
          });
          result[packagingType][color] = res;
          break;
        }
        default:
          return;
      }
    });
  });

  return result;
};
export const getTotalColors = (data) => {
  let result = {
    totalOrders: 0,
    totalRoses: 0,
    roseDetails: {},
    packagingDetails: {}
  };

  data.forEach((order) => {
    const updatedSKU = order[2].replace("ZS", "S"); // ZS id sthe same as S
    const splitOrderSKU = updatedSKU.split("-");
    const numberOfBouquets = order[3];
    const bouqSize = splitOrderSKU[0].replace(/^\D+/g, "");

    result.totalOrders = result.totalOrders += 1;

    // roses
    result.totalRoses = result.totalRoses += parseInt(bouqSize, 10);
    const orderColorCode = splitOrderSKU.length === 2 ? splitOrderSKU[1] : splitOrderSKU[2];
    const bouqInfo = getColorsPerBouqet(bouqSize, orderColorCode);

    Object.keys(bouqInfo).forEach((color) => {
      const colorsInOrder = bouqInfo[color] * numberOfBouquets;

      if (!result.roseDetails[color]) {
        result.roseDetails[color] = colorsInOrder;
      } else {
        result.roseDetails[color] += colorsInOrder;
      }
    });

    // packaging
    let packagingType = splitOrderSKU[0].replace(/\d/g, "");
    const packagingColor = getPackagingColor(packagingType, splitOrderSKU);
    if (!result.packagingDetails[packagingType]) {
      result.packagingDetails[packagingType] = {};
    }
    if (!result.packagingDetails[packagingType][packagingColor]) {
      result.packagingDetails[packagingType][packagingColor] = {};
    }
    if (!result.packagingDetails[packagingType][packagingColor][bouqSize]) {
      result.packagingDetails[packagingType][packagingColor][bouqSize] = 1;
    } else {
      result.packagingDetails[packagingType][packagingColor][bouqSize] =
        result.packagingDetails[packagingType][packagingColor][bouqSize] + 1;
    }
  });
  result.packagingDetails = getRealPackagingNames(result.packagingDetails);
  let sortable = [];
  for (let color in result.roseDetails) {
    sortable.push([color, result.roseDetails[color]]);
  }

  sortable.sort((a, b) => b[1] - a[1]);
  result.roseDetails = Object.fromEntries(sortable);

  return result;
};
