import { useCallback, useMemo, useState } from "react";
import questionsData from "../data/questions.json";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Core quiz engine: build a deck from selected categories, navigate, optional shuffle.
 */
export function useQuiz(selectedCategoryIds, options = {}) {
  const { shuffleDeck = true, itemFilter = null, restrictItemIds = null } = options;

  const categories = questionsData.categories;

  const pool = useMemo(() => {
    const restrict =
      restrictItemIds && restrictItemIds.length
        ? new Set(Array.isArray(restrictItemIds) ? restrictItemIds : [...restrictItemIds])
        : null;
    const ids = new Set(selectedCategoryIds);
    const out = [];
    for (const cat of categories) {
      if (!ids.has(cat.id)) continue;
      for (const item of cat.items) {
        if (restrict && !restrict.has(item.id)) continue;
        if (itemFilter && !itemFilter(item)) continue;
        out.push({ ...item, categoryId: cat.id, categoryLabel: cat.label });
      }
    }
    return out;
  }, [categories, selectedCategoryIds, itemFilter, restrictItemIds]);

  const [order, setOrder] = useState([]);
  const [index, setIndex] = useState(0);

  const rebuildOrder = useCallback(() => {
    const base = shuffleDeck ? shuffle(pool) : [...pool];
    setOrder(base.map((x) => x.id));
    setIndex(0);
  }, [pool, shuffleDeck]);

  const deck = useMemo(() => {
    if (!order.length) return [];
    const byId = new Map(pool.map((p) => [p.id, p]));
    return order.map((id) => byId.get(id)).filter(Boolean);
  }, [order, pool]);

  const current = deck[index] ?? null;
  const atEnd = deck.length > 0 && index >= deck.length;
  const progress =
    deck.length === 0 ? 0 : Math.min(100, Math.round((index / deck.length) * 100));

  const next = useCallback(() => {
    setIndex((i) => Math.min(i + 1, deck.length));
  }, [deck.length]);

  const prev = useCallback(() => {
    setIndex((i) => Math.max(i - 1, 0));
  }, []);

  const goTo = useCallback(
    (i) => {
      setIndex(Math.max(0, Math.min(i, deck.length - 1)));
    },
    [deck.length]
  );

  return {
    categories,
    pool,
    deck,
    current,
    index,
    atEnd,
    progress,
    next,
    prev,
    goTo,
    rebuildOrder,
    setIndex,
  };
}
