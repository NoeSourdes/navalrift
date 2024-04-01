export const generateShips = () => {
  const shipSizes = [5, 4, 3, 3, 2];
  const ships = [];
  const grid = new Array(10).fill(0).map(() => new Array(10).fill(0));
  let shipId = 0;

  for (let size of shipSizes) {
    let direction, x, y;

    while (true) {
      direction = Math.random() < 0.5 ? "horizontal" : "vertical";
      x = Math.floor(
        Math.random() * (direction === "horizontal" ? 10 : 10 - size + 1)
      );
      y = Math.floor(
        Math.random() * (direction === "vertical" ? 10 : 10 - size + 1)
      );

      let isOverlap = false;

      for (let i = -1; i <= size; i++) {
        for (let j = -1; j <= 1; j++) {
          for (let k = -1; k <= 1; k++) {
            if (direction === "horizontal") {
              if (
                y + i + j < 0 ||
                y + i + j >= 10 ||
                x + k < 0 ||
                x + k >= 10
              ) {
                continue;
              }
              if (grid[x + k][y + i + j] === 1) {
                isOverlap = true;
                break;
              }
            } else {
              if (
                x + i + k < 0 ||
                x + i + k >= 10 ||
                y + j < 0 ||
                y + j >= 10
              ) {
                continue;
              }
              if (grid[x + i + k][y + j] === 1) {
                isOverlap = true;
                break;
              }
            }
          }
          if (isOverlap) {
            break;
          }
        }
        if (isOverlap) {
          break;
        }
      }

      if (!isOverlap) {
        break;
      }
    }

    for (let i = 0; i < size; i++) {
      if (direction === "horizontal") {
        if (y + i < 10) {
          grid[x][y + i] = 1;
        }
      } else {
        if (x + i < 10) {
          grid[x + i][y] = 1;
        }
      }
    }

    ships.push({
      size,
      direction,
      position: [x, y],
      id: shipId++,
    });
  }

  return ships;
};
