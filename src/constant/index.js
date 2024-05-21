export const options = {
  method: "GET",
  url: "https://flight-radar1.p.rapidapi.com/flights/list-in-boundary",
  params: {
    bl_lat: "26.374991",
    bl_lng: "-123.206959",
    tr_lat: "46.921166",
    tr_lng: "-64.82998",
    limit: "300",
  },
  headers: {
    "X-RapidAPI-Key": "95c802f0ffmsh9313315b35d6314p1330ecjsned84a1ae46c3",
    "X-RapidAPI-Host": "flight-radar1.p.rapidapi.com",
  },
};

export const options2 = {
  headers: {
    "X-RapidAPI-Key": "95c802f0ffmsh9313315b35d6314p1330ecjsned84a1ae46c3",
    "X-RapidAPI-Host": "flight-radar1.p.rapidapi.com",
  },
};
