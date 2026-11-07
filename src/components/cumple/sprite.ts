export type SpriteCell = { x: number; y: number; c: string };

export type Sprite = {
  w: number;
  h: number;
  cells: SpriteCell[];
};

export function sprite(grid: string[], colors: Record<string, string>): Sprite {
  const cells: SpriteCell[] = [];
  grid.forEach((row, y) =>
    row.split("").forEach((ch, x) => {
      if (ch !== "." && colors[ch]) cells.push({ x, y, c: colors[ch] });
    })
  );
  return { w: grid[0].length, h: grid.length, cells };
}
