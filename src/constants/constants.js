export const ItemTypes = {
  CITY: 'city'
};

export function determineIcon(id) {
  id = Number(id);
  let mainIcon;
  let condition;

  if (200 <= id && id <= 232) condition = 1;
  else if (300 <= id && id <= 321) condition = 2;
  else if (500 <= id && id <= 531) condition = 3;
  else if (600 <= id && id <= 622) condition = 4;
  else if (id == 800) condition = 5;
  else if (801 <= id && id <= 804) condition = 6;
  else condition = 7;

  switch(condition) {
    case 1:
      mainIcon = "wi wi-thunderstorm";
      break
    case 2:
      mainIcon = "wi wi-showers";
      break;
    case 3:
      mainIcon = "wi wi-rain";
      break
    case 4:
      mainIcon = "wi wi-snow";
      break
    case 5:
      mainIcon = "wi wi-day-sunny";
      break
    case 6:
      mainIcon = "wi wi-cloudy";
      break
    case 7:
      mainIcon = "wi wi-na";
      break
  }

  return mainIcon;
}
