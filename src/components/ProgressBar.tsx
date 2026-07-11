type ProgressBarProps = {
  current: number;
  total: number;
};

export default function ProgressBar({
  current,
  total,
}: ProgressBarProps) {
  const percent = (current / total) * 100;

  return (
    <div
      style={{
        marginTop: 25,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <span>MISSION PROGRESS</span>

        <span>
          {current}/{total}
        </span>
      </div>

      <div
        style={{
          width: "100%",
          height: 18,
          border: "1px solid #00ff99",
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: "100%",
            background: "#00ff99",
          }}
        />
      </div>
    </div>
  );
}