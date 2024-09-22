export const touchShip = (x: number, y: number, arrayShip: any) => {
  let touched = false;

  for (let ship of arrayShip) {
    const [shipX, shipY] = ship.position;
    if (ship.direction === "horizontal") {
      if (x === shipX && y >= shipY && y < shipY + ship.size) {
        touched = true;
        break;
      }
    } else {
      if (y === shipY && x >= shipX && x < shipX + ship.size) {
        touched = true;
        break;
      }
    }
  }

  if (touched) {
    return true;
  } else {
    return false;
  }
};
