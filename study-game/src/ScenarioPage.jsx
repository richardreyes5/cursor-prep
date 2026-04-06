import { useEffect } from "react";
import Layout from "./components/Layout.jsx";
import ScenarioSimulator from "./components/ScenarioSimulator.jsx";
import { useQuiz } from "./hooks/useQuiz.js";

const scenarioOnly = (item) => item.type === "scenario";

export default function ScenarioPage({ game, navHome, onHome }) {
  const scenarioQuiz = useQuiz(["tactical-scenarios"], {
    shuffleDeck: true,
    itemFilter: scenarioOnly,
  });

  const { deck, current, index, next, rebuildOrder } = scenarioQuiz;

  useEffect(() => {
    rebuildOrder();
  }, [rebuildOrder]);

  const done = deck.length > 0 && index >= deck.length;

  return (
    <Layout title="Scenario simulator" nav={navHome}>
      {done ? (
        <div className="card">
          <p>You&apos;ve reached the end of the scenario deck.</p>
          <button type="button" className="btn btn--primary" onClick={onHome}>
            Home
          </button>
        </div>
      ) : (
        <ScenarioSimulator
          item={current}
          index={index}
          total={deck.length}
          onRate={(rating) => {
            if (!current) return;
            game.touchStreak();
            const xpMap = { strong: 20, ok: 12, weak: 4 };
            game.addXp(xpMap[rating] ?? 6);
            game.recordItemResult(current.id, rating !== "weak", current.categoryId);
          }}
          onNext={() => next()}
        />
      )}
    </Layout>
  );
}
