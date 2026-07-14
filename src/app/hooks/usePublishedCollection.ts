import { useEffect, useState } from "react";

export function usePublishedCollection<DatabaseRow, UiItem>(
  fallback: readonly UiItem[],
  fetchPublished: () => Promise<DatabaseRow[]>,
  mapRow: (row: DatabaseRow, index: number) => UiItem,
) {
  const [items, setItems] = useState<readonly UiItem[]>(fallback);

  useEffect(() => {
    let active = true;

    fetchPublished()
      .then((rows) => {
        if (active && rows.length > 0) {
          setItems(rows.map(mapRow));
        }
      })
      .catch(() => {
        // Retain the local collection when the public read is unavailable.
      });

    return () => {
      active = false;
    };
  }, [fallback, fetchPublished, mapRow]);

  return items;
}
