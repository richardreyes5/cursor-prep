import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "adm-study-game-v1";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function loadRaw() {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    if (!s) return null;
    return JSON.parse(s);
  } catch {
    return null;
  }
}

function defaultState() {
  return {
    xp: 0,
    streak: 0,
    lastStudyDate: null,
    itemStats: {},
    reviewQueue: [],
  };
}

function mergeState(raw) {
  const d = defaultState();
  if (!raw || typeof raw !== "object") return d;
  return {
    xp: typeof raw.xp === "number" ? raw.xp : d.xp,
    streak: typeof raw.streak === "number" ? raw.streak : d.streak,
    lastStudyDate: raw.lastStudyDate ?? d.lastStudyDate,
    itemStats: raw.itemStats && typeof raw.itemStats === "object" ? raw.itemStats : {},
    reviewQueue: Array.isArray(raw.reviewQueue) ? raw.reviewQueue : [],
  };
}

export function xpToLevel(xp) {
  return Math.min(50, 1 + Math.floor(xp / 150));
}

export function xpWithinLevel(xp) {
  const lvl = xpToLevel(xp);
  const floor = (lvl - 1) * 150;
  const next = lvl * 150;
  return { level: lvl, current: xp - floor, needed: next - floor };
}

/**
 * XP, streak, per-item stats, review queue — persisted in localStorage.
 */
export function useGameState() {
  const [state, setState] = useState(() => mergeState(loadRaw()));

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const touchStreak = useCallback(() => {
    const t = todayISO();
    setState((s) => {
      if (s.lastStudyDate === t) return s;
      let streak = s.streak;
      if (!s.lastStudyDate) streak = 1;
      else {
        const prev = new Date(s.lastStudyDate + "T12:00:00Z");
        const cur = new Date(t + "T12:00:00Z");
        const diffDays = Math.round((cur - prev) / 86400000);
        if (diffDays === 1) streak += 1;
        else if (diffDays > 1) streak = 1;
      }
      return { ...s, lastStudyDate: t, streak };
    });
  }, []);

  const addXp = useCallback((amount) => {
    setState((s) => ({ ...s, xp: Math.max(0, s.xp + amount) }));
  }, []);

  const recordItemResult = useCallback((itemId, gotIt, categoryId) => {
    setState((s) => {
      const prev = s.itemStats[itemId] ?? { reviews: 0, gotIt: 0, reviewAgain: 0 };
      const nextStats = {
        ...s.itemStats,
        [itemId]: {
          reviews: prev.reviews + 1,
          gotIt: prev.gotIt + (gotIt ? 1 : 0),
          reviewAgain: prev.reviewAgain + (gotIt ? 0 : 1),
          lastCategoryId: categoryId,
        },
      };
      let reviewQueue = [...s.reviewQueue].filter((id) => id !== itemId);
      if (!gotIt) reviewQueue = [itemId, ...reviewQueue];
      return { ...s, itemStats: nextStats, reviewQueue };
    });
  }, []);

  const masteryForCategories = useCallback(
    (categories) => {
      return categories.map((cat) => {
        const total = cat.items.length;
        if (total === 0) {
          return { id: cat.id, label: cat.label, pct: 0, mastered: 0, touched: 0, total: 0 };
        }
        let sumRatio = 0;
        let touched = 0;
        let strong = 0;
        for (const it of cat.items) {
          const st = state.itemStats[it.id];
          if (!st || st.reviews === 0) continue;
          touched += 1;
          sumRatio += st.gotIt / st.reviews;
          if (st.gotIt / st.reviews >= 0.66) strong += 1;
        }
        const pct =
          touched === 0 ? 0 : Math.round((100 * sumRatio) / total);
        return {
          id: cat.id,
          label: cat.label,
          pct,
          mastered: strong,
          touched,
          total,
        };
      });
    },
    [state.itemStats]
  );

  const levelInfo = useMemo(() => xpWithinLevel(state.xp), [state.xp]);

  return {
    ...state,
    levelInfo,
    touchStreak,
    addXp,
    recordItemResult,
    masteryForCategories,
  };
}
