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

const decodeCombination = (combination, order, i) => {
  let maxTryAmount = 100;
  let trimmedCombination = combination.replace(" ", "");
  let result = [];

  while (trimmedCombination.length !== 0 && maxTryAmount !== 0) {
    roseColors.forEach((color) => {
      if (trimmedCombination.indexOf(color) !== 0) {
        return;
      } else {
        result.push(color);
        trimmedCombination = trimmedCombination.slice(color.length);
      }
    });
    maxTryAmount -=1;
  }
  if (maxTryAmount === 0) {
    const errText = `Ошибка обработки комбинации цветов: "${combination}". \nЗаказ ${order}. Строка ${i + 1}. \nОн будет пропущен. \nВозможно новый цвет?`;
    alert(errText)
  };

  return result;
};

const getColorsPerBouqet = (bouqSize, orderColorCode, order , i) => {
  const result = {};
  const bColors = decodeCombination(orderColorCode, order, i);
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
        case "M":
        case "MS": {
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
    roseStats: {},
    roseDetails: {},
    packagingDetails: {}
  };

  data.forEach((order, i) => {
    try {
      const sku = order[2];
      const updatedSKU = sku.replace("ZS", "S"); // "ZS" id is the same as "S"
      const splitOrderSKU = updatedSKU.split("-");
      const numberOfBouquets = order[3];
      const bouqSize = splitOrderSKU[0].replace(/^\D+/g, "");
      const packagingType = splitOrderSKU[0].replace(/\d/g, "");
      result.totalOrders = result.totalOrders += 1;

      // roses
      result.totalRoses = result.totalRoses += parseInt(bouqSize, 10) * numberOfBouquets;

      const orderColorCode = splitOrderSKU.length === 2 || packagingType === 'K' ? splitOrderSKU[1] : splitOrderSKU[2];
      const bouqInfo = getColorsPerBouqet(bouqSize, orderColorCode, order, i);

      Object.keys(bouqInfo).forEach((color) => {
        const colorsInOrder = bouqInfo[color] * numberOfBouquets;

        // if (!result.roseStats[color]) {
        //   result.roseStats[color] = {};
        // }
        // if (!result.roseStats[color][sku]) {
        //   result.roseStats[color][sku] = [];
        //   result.roseStats[color][sku].push({
        //     orderId: order[1],
        //     numberOfBouquets,
        //     colorsInOrder
        //   });
        // } else {
        //   result.roseStats[color][sku].push({
        //     orderId: order[1],
        //     numberOfBouquets,
        //     colorsInOrder
        //   });
        // }

        if (!result.roseDetails[color]) {
          result.roseDetails[color] = colorsInOrder;
        } else {
          result.roseDetails[color] += colorsInOrder;
        }
      });

      // packaging
      const packagingColor = getPackagingColor(packagingType, splitOrderSKU);
      if (packagingType !== 'R') {
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
      }
    } catch(error) {
      const errText = `Ошибка обработки заказа ${order}.\nСтрока ${i + 1}`;
      alert(errText)
      throw new Error(errText)
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
