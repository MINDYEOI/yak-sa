

const medicines = [
  { _id: 0, name: "전체" },
  {
    _id: 1,
    name: "진통제",
  },
  {
    _id: 2,
    name: "소화제",
  },
  {
    _id: 3,
    name: "감기약",
  },
  {
    _id: 4,
    name: "해열제",
  },
  {
    _id: 5,
    name: "파스류",
  },
  {
    _id: 6,
    name: "상처치료",
  },
  {
    _id: 7,
    name: "기타",
  },
];




const price = [
  {
    _id: 0,
    name: "Any",
    array: [],
  },
  {
    _id: 1,
    name: "배달비 무료",
    array: [0],
  },
  {
    _id: 2,
    name: "배달비 500원 ~ 1000원",
    array: [500, 1000],
  },
  {
    _id: 3,
    name: "배달비 1000원 ~ 2000원",
    array: [1001, 2000],
  },
  {
    _id: 4,
    name: "배달비 200원 ~ 3000원",
    array: [2001, 3000],
  },
  {
    _id: 5,
    name: "3000원 이상",
    array: [3000, 1500000],
  },
];

export { price, medicines };
