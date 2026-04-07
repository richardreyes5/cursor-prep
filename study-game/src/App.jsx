import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import questionsData from "./data/questions.json";
import Layout from "./components/Layout.jsx";
import CategoryPicker from "./components/CategoryPicker.jsx";
import FlashCard from "./components/FlashCard.jsx";
import Dashboard from "./components/Dashboard.jsx";
import SessionSummary from "./components/SessionSummary.jsx";
import TimedBlitz, { BLITZ_SECONDS } from "./components/TimedBlitz.jsx";
import ScenarioPage from "./ScenarioPage.jsx";
import { useQuiz } from "./hooks/useQuiz.js";
import { useGameState } from "./hooks/useGameState.js";

const ALL_IDS = questionsData.categories.map((c) => c.id);

const flashcardOnly = (item) => item.type !== "scenario";

export default function App() {
  const game = useGameState();
  const [view, setView] = useState("home");
  const [selectedIds, setSelectedIds] = useState(ALL_IDS);
  const [queueMode, setQueueMode] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [sessionSummary, setSessionSummary] = useState(null);

  const sessionRef = useRef(null);
  const sessionDoneRef = useRef(false);

  const restrictIds = queueMode ? game.reviewQueue : null;

  const quiz = useQuiz(selectedIds, {
    shuffleDeck: true,
    itemFilter: flashcardOnly,
    restrictItemIds: restrictIds && restrictIds.length ? restrictIds : null,
  });

  const { rebuildOrder, deck, current, index, atEnd, next, progress } = quiz;

  const blitzQuiz = useQuiz(selectedIds, {
    shuffleDeck: true,
    itemFilter: flashcardOnly,
  });

  const [blitzRemaining, setBlitzRemaining] = useState(BLITZ_SECONDS);
  const [blitzScore, setBlitzScore] = useState(0);
  const [blitzIdx, setBlitzIdx] = useState(0);
  const [blitzFinished, setBlitzFinished] = useState(false);

  useEffect(() => {
    if (view === "flashcards") {
      rebuildOrder();
    }
  }, [view, selectedIds, queueMode, game.reviewQueue, rebuildOrder]);

  useEffect(() => {
    if (view !== "blitz" || blitzFinished) return undefined;
    const t = setInterval(() => {
      setBlitzRemaining((r) => Math.max(0, r - 1));
    }, 1000);
    return () => clearInterval(t);
  }, [view, blitzFinished]);

  useEffect(() => {
    if (view !== "blitz" || blitzFinished) return;
    if (blitzRemaining <= 0) setBlitzFinished(true);
  }, [view, blitzRemaining, blitzFinished]);

  const goHome = useCallback(() => {
    setQueueMode(false);
    setView("home");
  }, []);

  const startFlashSession = useCallback(() => {
    sessionRef.current = {
      startXp: game.xp,
      reviewed: 0,
      gotIt: 0,
      reviewAgain: 0,
    };
    sessionDoneRef.current = false;
    setSessionSummary(null);
    setFlipped(false);
    setView("flashcards");
  }, [game.xp]);

  const startBlitz = useCallback(() => {
    blitzQuiz.rebuildOrder();
    setBlitzRemaining(BLITZ_SECONDS);
    setBlitzScore(0);
    setBlitzIdx(0);
    setBlitzFinished(false);
    game.touchStreak();
    setView("blitz");
  }, [blitzQuiz, game]);

  const masteryRows = useMemo(
    () => game.masteryForCategories(questionsData.categories),
    [game.masteryForCategories, game.itemStats]
  );

  const toggleCat = useCallback((id) => {
    setSelectedIds((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }, []);

  const handleFlashRate = useCallback(
    (gotIt) => {
      if (!current) return;
      game.touchStreak();
      const xp = gotIt ? 12 : 4;
      game.addXp(xp);
      game.recordItemResult(current.id, gotIt, current.categoryId);
      const s = sessionRef.current;
      if (s) {
        s.reviewed += 1;
        if (gotIt) s.gotIt += 1;
        else s.reviewAgain += 1;
      }
      setFlipped(false);
      next();
    },
    [current, game, next]
  );

  useEffect(() => {
    if (view !== "flashcards") {
      sessionDoneRef.current = false;
      return;
    }
    if (!atEnd) {
      sessionDoneRef.current = false;
      return;
    }
    if (sessionDoneRef.current) return;
    const sr = sessionRef.current;
    if (!sr || sr.reviewed === 0) return;
    sessionDoneRef.current = true;
    setSessionSummary({
      reviewed: sr.reviewed,
      gotIt: sr.gotIt,
      reviewAgain: sr.reviewAgain,
      xpGained: game.xp - sr.startXp,
    });
  }, [view, atEnd, game.xp]);

  const navHome = (
    <>
      <button type="button" className="nav-link" onClick={goHome}>
        Home
      </button>
      <button type="button" className="nav-link" onClick={() => setView("dashboard")}>
        Dashboard
      </button>
    </>
  );

  if (view === "home") {
    return (
      <Layout
        title="ADM Study Game"
        nav={navHome}
        actions={
          <span className="pill">
            Lvl {game.levelInfo.level} · {game.xp} XP · 🔥 {game.streak}
          </span>
        }
      >
        <p className="lead">
          Active recall across your prep library — flashcards, tactical scenarios, and a 60-second blitz.
        </p>
        <div className="menu-grid">
          <button type="button" className="menu-card" onClick={() => setView("pick-flash")}>
            <h2>Flashcards</h2>
            <p>Flip, self-rate, build streaks and XP.</p>
          </button>
          <button type="button" className="menu-card" onClick={() => setView("scenario")}>
            <h2>Scenario simulator</h2>
            <p>Practice CTO / CISO-style conversations from the tactical bank.</p>
          </button>
          <button type="button" className="menu-card" onClick={() => setView("pick-blitz")}>
            <h2>Timed blitz</h2>
            <p>60 seconds of rapid-fire checks.</p>
          </button>
          <button type="button" className="menu-card" onClick={() => setView("dashboard")}>
            <h2>Progress</h2>
            <p>Mastery by category and review queue.</p>
          </button>
        </div>
      </Layout>
    );
  }

  if (view === "pick-flash") {
    return (
      <Layout title="Flashcards" nav={navHome}>
        <CategoryPicker
          categories={questionsData.categories}
          selectedIds={selectedIds}
          onToggle={toggleCat}
          onSelectAll={() => setSelectedIds(ALL_IDS)}
          onClear={() => setSelectedIds([])}
        />
        <div className="toolbar">
          <button
            type="button"
            className="btn btn--primary"
            disabled={selectedIds.length === 0}
            onClick={() => {
              setQueueMode(false);
              startFlashSession();
            }}
          >
            Start session
          </button>
        </div>
      </Layout>
    );
  }

  if (view === "pick-blitz") {
    return (
      <Layout title="Timed blitz" nav={navHome}>
        <CategoryPicker
          categories={questionsData.categories}
          selectedIds={selectedIds}
          onToggle={toggleCat}
          onSelectAll={() => setSelectedIds(ALL_IDS)}
          onClear={() => setSelectedIds([])}
        />
        <div className="toolbar">
          <button
            type="button"
            className="btn btn--primary"
            disabled={selectedIds.length === 0}
            onClick={startBlitz}
          >
            Start 60s blitz
          </button>
        </div>
      </Layout>
    );
  }

  if (view === "flashcards") {
    const showSummary = Boolean(sessionSummary && atEnd);
    return (
      <Layout
        title={queueMode ? "Review queue" : "Flashcards"}
        nav={navHome}
        actions={
          <span className="pill">
            {deck.length ? `${Math.min(index + 1, deck.length)}/${deck.length}` : "0/0"} · {progress}%
          </span>
        }
      >
        {showSummary ? (
          <SessionSummary
            stats={sessionSummary}
            onClose={() => {
              setSessionSummary(null);
              setQueueMode(false);
              setView("home");
            }}
            onAgain={() => {
              setSessionSummary(null);
              sessionDoneRef.current = false;
              startFlashSession();
            }}
          />
        ) : null}
        {!atEnd && current ? (
          <>
            <FlashCard key={current.id} item={current} flipped={flipped} onFlip={setFlipped} />
            <div className="toolbar toolbar--flash">
              <button
                type="button"
                className="btn btn--success"
                disabled={!flipped}
                onClick={() => handleFlashRate(true)}
              >
                Got it
              </button>
              <button
                type="button"
                className="btn btn--warning"
                disabled={!flipped}
                onClick={() => handleFlashRate(false)}
              >
                Review again
              </button>
            </div>
          </>
        ) : null}
        {atEnd && !sessionSummary && deck.length > 0 ? (
          <p className="muted">Session complete — preparing summary…</p>
        ) : null}
        {!current && deck.length === 0 ? (
          <p className="muted">No cards match this selection{queueMode ? " (queue empty)" : ""}.</p>
        ) : null}
      </Layout>
    );
  }

  if (view === "dashboard") {
    return (
      <Layout title="Progress" nav={navHome}>
        <Dashboard
          streak={game.streak}
          xp={game.xp}
          levelInfo={game.levelInfo}
          masteryRows={masteryRows}
          reviewQueueLength={game.reviewQueue.length}
          onStudyQueue={() => {
            if (!game.reviewQueue.length) return;
            setQueueMode(true);
            setSelectedIds(ALL_IDS);
            startFlashSession();
          }}
        />
      </Layout>
    );
  }

  if (view === "scenario") {
    return <ScenarioPage game={game} navHome={navHome} onHome={goHome} />;
  }

  if (view === "blitz") {
    const bDeck = blitzQuiz.deck;
    const bItem = bDeck[blitzIdx] ?? null;
    return (
      <Layout title="Timed blitz" nav={navHome}>
        <TimedBlitz
          item={bItem}
          remaining={blitzRemaining}
          score={blitzScore}
          finished={blitzFinished}
          onMenu={goHome}
          onKnow={() => {
            if (!bItem || blitzFinished) return;
            game.touchStreak();
            game.addXp(6);
            setBlitzScore((s) => s + 1);
            setBlitzIdx((i) => (bDeck.length ? (i + 1) % bDeck.length : 0));
          }}
          onLearn={() => {
            if (!bItem || blitzFinished) return;
            game.addXp(2);
            setBlitzIdx((i) => (bDeck.length ? (i + 1) % bDeck.length : 0));
          }}
        />
      </Layout>
    );
  }

  return null;
}
