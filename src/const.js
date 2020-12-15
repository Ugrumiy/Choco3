export const appSections = [
  {
    id: "roseCounter",
    name: "Подсчет роз"
  },
  {
    id: "skuGenerator",
    name: "Генератор Артикулов"
  }
];

export const orderDataTypes = [
  {
    id: "roses",
    name: "Розы"
  },
  {
    id: "packaging",
    name: "Упаковка"
  }
];

export const proportions = {
  // 9: {
  //   1: [9],
  //   2: [6, 3],
  //   3: [3, 3, 3]
  // },
  // 19: {
  //   1: [19],
  //   2: [9, 10],
  //   3: [7, 6, 6]
  // },
  // 27: {
  //   1: [27],
  //   2: [14, 13],
  //   3: [9, 9, 9]
  // },
  // 37: {
  //   1: [37],
  //   2: [19, 18],
  //   3: [13, 12, 12]
  // },
  // 51: {
  //   1: [51],
  //   2: [26, 25],
  //   3: [17, 17, 17]
  // },
  // 61: {
  //   1: [61],
  //   2: [31, 30],
  //   3: [21, 20, 20]
  // },
  // 73: {
  //   1: [73],
  //   2: [37, 36],
  //   3: [25, 24, 24]
  // },
  // 87: {
  //   1: [87],
  //   2: [44, 43],
  //   3: [29, 29, 29]
  // }
};

export const colorNameMap = {
  B: {
    name: "Белый",
    color: "white"
  },
  G: {
    name: "Голубой",
    color: "blue"
  },
  J: {
    name: "Желтый",
    color: "yellow"
  },
  K: {
    name: "Красный",
    color: "red"
  },
  O: {
    name: "Оранжевый",
    color: "orange"
  },
  R: {
    name: "Розовый",
    color: "pink"
  },
  F: {
    name: "Фиолетовый",
    color: "#8b00ff"
  },
  SH: {
    name: "Шоколадный",
    color: "#4f2811"
  },
  ZL: {
    name: "Золотой",
    color: "#d4af37"
  }
};

export const roseColors = Object.keys(colorNameMap);

export const type = "B";

export const sizes = [7, 19, 37, 61].sort((a, b) => a - b);
export const paperColorsMap = {
  A: {
    name: "Аквамарин",
    color: "#7fffd4"
  },
  B: {
    name: "Белый",
    color: "white"
  },
  G: {
    name: "Голубой",
    color: "#add8e6"
  },
  J: {
    name: "Желтый",
    color: "yellow"
  },
  Z: {
    name: "Зеленый",
    color: "green"
  },
  K: {
    name: "Красный",
    color: "red"
  },
  O: {
    name: "Оранжевый",
    color: "orange"
  },
  R: {
    name: "Розовый",
    color: "pink"
  },
  S: {
    name: "Синий",
    color: "blue"
  },
  T: {
    name: "Темно-голубой",
    color: "#72bcd4"
  },
  F: {
    name: "Фиолетовый",
    color: "#8b00ff"
  },
  ZL: {
    name: "Золотой",
    color: "#d4af37"
  },
  C: {
    name: "Сиреневый",
    color: "#c8a2c8"
  },
  CH: {
    name: "Чёрный",
    color: "black"
  },
  M: {
    name: "Малиновый",
    color: "maroon"
  },
  SH: {
    name: "Шоколадный",
    color: "#4f2811"
  }
};

export const paperColors = Object.keys(paperColorsMap).sort();

export const packageNamesMap = {
  B: "Букет",
  M: "Мини-коробка",
  K: "Корзина",
  SH: "Шляпная коробка",
  Z: "Шляпная коробка (закрытая)",
  ZS: "Сердце (закрытое)",
  S: "Сердце"
};

export const boxSizesMap = {
  SH: {
    37: "12",
    51: "16",
    73: "20",
    101: "25"
  },
  Z: {
    19: "16",
    27: "18",
    37: "20"
  }
};
