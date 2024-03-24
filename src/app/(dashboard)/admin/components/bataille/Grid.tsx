interface PropsGrid {
  ship: any;
}

export const Grid = ({ ship }: PropsGrid) => {
  const rows = new Array(10).fill(null);
  const cols = new Array(10).fill(null);

  const isShipPosition = (rowIndex: number, colIndex: number) => {
    for (let s = 0; s < ship.length; s++) {
      for (let i = 0; i < ship[s].size; i++) {
        if (ship[s].direction === "horizontal") {
          if (
            rowIndex === ship[s].position[0] &&
            colIndex === ship[s].position[1] + i
          ) {
            return ship[s].size;
          }
        } else {
          if (
            rowIndex === ship[s].position[0] + i &&
            colIndex === ship[s].position[1]
          ) {
            return ship[s].size;
          }
        }
      }
    }
    return false;
  };

  return (
    <div>
      {rows.map((_, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {cols.map((_, colIndex) => (
            <div
              key={colIndex}
              className={`w-[38.4px] h-[38.4px] flex items-center justify-center max-sm:w-8 max-sm:h-8 ${
                isShipPosition(rowIndex, colIndex) === 4
                  ? "bg-warning rounded-[7px]"
                  : isShipPosition(rowIndex, colIndex) === 3
                  ? "bg-success rounded-[7px]"
                  : isShipPosition(rowIndex, colIndex) === 2
                  ? "bg-secondary rounded-[7px]"
                  : isShipPosition(rowIndex, colIndex) === 1
                  ? "bg-primary rounded-[7px]"
                  : ""
              }`}
            >
              {isShipPosition(rowIndex, colIndex) ? (
                ""
              ) : (
                <span className="w-2 h-2 rounded-full bg-border"></span>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
