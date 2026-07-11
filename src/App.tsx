import { useMemo, useState } from "react";
import "./App.css";

import Header from "./components/Header";
import StatusPanel from "./components/StatusPanel";
import ConnectButton from "./components/ConnectButton";
import SignalCard from "./components/SignalCard";
import ProgressBar from "./components/ProgressBar";
import MissionLog from "./components/MissionLog";
import ScoreBoard from "./components/ScoreBoard";
import StartScreen from "./components/StartScreen";

type Question = {
  signal: string;
  options: string[];
  answer: string;
};

const QUESTIONS: Question[] = [
  {
    signal: "☍ ✦ △ ◈ ⌬",
    options: ["HELLO", "EARTH", "UNKNOWN", "DANGER"],
    answer: "HELLO",
  },
  {
    signal: "⌬ ☉ ☍ ✦ ◈",
    options: ["ALIEN", "FUTURE", "EARTH", "GALAXY"],
    answer: "ALIEN",
  },
  {
    signal: "◈ △ ✦ ☉ ☍",
    options: ["MESSAGE", "ERROR", "SYSTEM", "RETURN"],
    answer: "MESSAGE",
  },
  {
    signal: "☉ ☉ ✦ △ ⌬",
    options: ["ENERGY", "STAR", "LIGHT", "POWER"],
    answer: "ENERGY",
  },
  {
    signal: "△ ✦ ◈ ☍ ☉",
    options: ["WARNING", "ESCAPE", "ATTACK", "RETURN"],
    answer: "WARNING",
  },
];

const TOTAL = 10;
const START_UTC = 10;

export default function App() {
  const [started, setStarted] = useState(false);
  const [connected, setConnected] = useState(false);

  const [credits, setCredits] = useState(START_UTC);
  const [score, setScore] = useState(0);
  const [played, setPlayed] = useState(0);

  const [history, setHistory] = useState<boolean[]>([]);
  const [signalReady, setSignalReady] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const [message, setMessage] = useState(
    "Connect your wallet to begin your mission."
  );

  const [current, setCurrent] = useState(
    Math.floor(Math.random() * QUESTIONS.length)
  );

  const question = QUESTIONS[current];

  const transmission = 10000 + played + 1;

  const difficulty = Math.min(
    5,
    Math.max(1, Math.floor(played / 2) + 1)
  );

  const reward = difficulty * 10;

  const correct = useMemo(
    () => history.filter(Boolean).length,
    [history]
  );

  const accuracy = useMemo(() => {
    if (history.length === 0) return 0;

    return Math.round(
      (correct / history.length) * 100
    );
  }, [correct, history]);

  let level = "RECRUIT";

  if (score >= 30) level = "JUNIOR";
  if (score >= 60) level = "SENIOR";
  if (score >= 100) level = "ELITE";
  if (score >= 160) level = "LEGEND";

  function connectWallet() {
    setConnected(true);
    setMessage(
      "Wallet connected. Ready to receive transmissions."
    );
  }

  function receiveSignal() {
    if (gameOver) return;

    if (!connected) {
      setMessage("Connect wallet first.");
      return;
    }

    if (signalReady) {
      setMessage(
        "Finish decoding the current signal."
      );
      return;
    }

    if (credits <= 0) {
      setMessage("No UTC remaining.");
      return;
    }

    setCredits((c) => c - 1);

    setPlayed((p) => p + 1);

    setAnswered(false);

    setSignalReady(true);

    setCurrent(
      Math.floor(Math.random() * QUESTIONS.length)
    );

    setMessage("Transmission received.");
  }

  function choose(option: string) {
    if (!signalReady) return;

    if (answered) return;

    const success =
      option === question.answer;

    setAnswered(true);

    setSignalReady(false);

    setHistory((prev) => [
      ...prev,
      success,
    ]);

    if (success) {
      setScore((s) => s + reward);

      setMessage(
        `Correct! +${reward} XP`
      );
    } else {
      setMessage(
        `Wrong. Correct answer: ${question.answer}`
      );
    }

    if (played >= TOTAL) {
      setGameOver(true);
    }
  }

  function resetGame() {
    setCredits(START_UTC);
    setScore(0);
    setPlayed(0);
    setHistory([]);
    setAnswered(false);
    setSignalReady(false);
    setGameOver(false);

    setCurrent(
      Math.floor(Math.random() * QUESTIONS.length)
    );

    setMessage(
      "New mission started."
    );
  }

  return (
    <div className="app">
      <div className="terminal">
        {!started ? (
          <StartScreen
            onStart={() => setStarted(true)}
          />
        ) : (
          <>
            <Header
              title="🛰 DECODE THE SIGNAL"
              year="UNICITY TESTNET"
            />

            <div className="story">
              <p>
                Decode encrypted alien
                transmissions.
              </p>

              <p>
                Each transmission costs
                exactly <strong>1 UTC</strong>.
              </p>
            </div>

            <StatusPanel
              status={
                connected
                  ? "ONLINE"
                  : "OFFLINE"
              }
              wallet={
                connected
                  ? "CONNECTED"
                  : "DISCONNECTED"
              }
              balance={
                connected
                  ? `${credits} UTC`
                  : "---"
              }
            />
                        {!connected ? (
              <div
                style={{
                  marginTop: 30,
                }}
                onClick={connectWallet}
              >
                <ConnectButton text="CONNECT WALLET" />
              </div>
            ) : (
              <>
                <ProgressBar
                  current={played}
                  total={TOTAL}
                />

                {signalReady ? (
                  <SignalCard
                    transmission={transmission}
                    signal={question.signal}
                    difficulty={difficulty}
                    reward={reward}
                  />
                ) : (
                  <div
                    className="signal"
                  >
                    <h2>
                      📡 NO ACTIVE
                      TRANSMISSION
                    </h2>

                    <p
                      style={{
                        marginTop: 15,
                        opacity: 0.8,
                      }}
                    >
                      Spend 1 UTC to
                      receive an
                      encrypted alien
                      transmission.
                    </p>

                    <div
                      className="signal-code"
                    >
                      ░ ░ ░ ░ ░
                    </div>
                  </div>
                )}

                <button
                  style={{
                    marginTop: 25,
                  }}
                  disabled={
                    signalReady ||
                    gameOver
                  }
                  onClick={
                    receiveSignal
                  }
                >
                  SPEND 1 UTC TO
                  DECODE
                </button>

                <div className="answer-grid">
                  {question.options.map(
                    (
                      option,
                      index
                    ) => (
                      <button
                        key={
                          option
                        }
                        disabled={
                          !signalReady ||
                          answered
                        }
                        onClick={() =>
                          choose(
                            option
                          )
                        }
                      >
                        {String.fromCharCode(
                          65 + index
                        )}
                        . {option}
                      </button>
                    )
                  )}
                </div>

                <div className="system">
                  <strong>
                    SYSTEM
                    MESSAGE
                  </strong>

                  <p
                    style={{
                      marginTop: 10,
                    }}
                  >
                    {message}
                  </p>
                </div>

                <MissionLog
                  history={
                    history
                  }
                />

                <ScoreBoard
                  score={score}
                  accuracy={
                    accuracy
                  }
                  level={level}
                />
                                {gameOver && (
                  <div
                    style={{
                      marginTop: 35,
                      padding: 30,
                      borderRadius: 16,
                      border: "2px solid #ffd54a",
                      background:
                        "linear-gradient(180deg,#162234,#0b1320)",
                      textAlign: "center",
                    }}
                  >
                    <h1
                      style={{
                        color: "#ffd54a",
                        marginBottom: 20,
                      }}
                    >
                      🎉 MISSION COMPLETE
                    </h1>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(2,1fr)",
                        gap: 20,
                        marginTop: 25,
                        marginBottom: 30,
                      }}
                    >
                      <div>
                        <h3>FINAL SCORE</h3>

                        <h2
                          style={{
                            marginTop: 10,
                          }}
                        >
                          {score} XP
                        </h2>
                      </div>

                      <div>
                        <h3>RANK</h3>

                        <h2
                          style={{
                            marginTop: 10,
                          }}
                        >
                          {level}
                        </h2>
                      </div>

                      <div>
                        <h3>ACCURACY</h3>

                        <h2
                          style={{
                            marginTop: 10,
                          }}
                        >
                          {accuracy}%
                        </h2>
                      </div>

                      <div>
                        <h3>UTC SPENT</h3>

                        <h2
                          style={{
                            marginTop: 10,
                          }}
                        >
                          {played} UTC
                        </h2>
                      </div>
                    </div>

                    <button
                      onClick={resetGame}
                    >
                      PLAY AGAIN
                    </button>
                  </div>
                )}
              </>
            )}

            <div className="footer">
              <p>
                Built for Unicity Builders
                Program
              </p>

              <p
                style={{
                  marginTop: 8,
                }}
              >
                Decode The Signal • UTC
                Testnet Demo
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}