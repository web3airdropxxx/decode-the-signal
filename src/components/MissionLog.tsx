type MissionLogProps = {
  history: boolean[];
};

export default function MissionLog({
  history,
}: MissionLogProps) {
  return (
    <div
      style={{
        border: "1px solid #00ff99",
        padding: 20,
        marginTop: 25,
      }}
    >
      <h2>MISSION LOG</h2>

      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          marginTop: 15,
        }}
      >
        {history.length === 0 && <p>No transmissions decoded.</p>}

        {history.map((item, index) => (
          <div
            key={index}
            style={{
              width: 42,
              height: 42,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid #00ff99",
              fontSize: 20,
            }}
          >
            {item ? "✔" : "✘"}
          </div>
        ))}
      </div>
    </div>
  );
}