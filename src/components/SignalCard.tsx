type SignalCardProps = {
  transmission: number;
  signal: string;
  difficulty: number;
  reward: number;
};

export default function SignalCard({
  transmission,
  signal,
  difficulty,
  reward,
}: SignalCardProps) {
  return (
    <div
      style={{
        border: "1px solid #00ff99",
        padding: 25,
        marginTop: 30,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <div>
          <h2>TRANSMISSION</h2>
          <p>#{transmission}</p>
        </div>

        <div style={{ textAlign: "right" }}>
          <p>Difficulty</p>

          <h3>{"★".repeat(difficulty)}</h3>

          <p>Reward</p>

          <h3>{reward} XP</h3>
        </div>
      </div>

      <div
        style={{
          border: "1px dashed #00ff99",
          padding: 25,
          textAlign: "center",
          fontSize: 42,
          letterSpacing: 10,
        }}
      >
        {signal}
      </div>
    </div>
  );
}