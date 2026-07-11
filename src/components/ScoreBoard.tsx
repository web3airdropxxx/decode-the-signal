type ScoreBoardProps = {
  score: number;
  accuracy: number;
  level: string;
};

export default function ScoreBoard({
  score,
  accuracy,
  level,
}: ScoreBoardProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: 20,
        marginTop: 25,
      }}
    >
      <div
        style={{
          border: "1px solid #00ff99",
          padding: 15,
          textAlign: "center",
        }}
      >
        <h3>SCORE</h3>

        <h1>{score}</h1>
      </div>

      <div
        style={{
          border: "1px solid #00ff99",
          padding: 15,
          textAlign: "center",
        }}
      >
        <h3>ACCURACY</h3>

        <h1>{accuracy}%</h1>
      </div>

      <div
        style={{
          border: "1px solid #00ff99",
          padding: 15,
          textAlign: "center",
        }}
      >
        <h3>LEVEL</h3>

        <h2>{level}</h2>
      </div>
    </div>
  );
}