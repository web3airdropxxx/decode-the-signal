type Props = {
  status: string;
  wallet: string;
  balance: string;
};

export default function StatusPanel({
  status,
  wallet,
  balance,
}: Props) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: 15,
      }}
    >
      {[
        ["STATUS", status],
        ["WALLET", wallet],
        ["UTC", balance],
      ].map(([label, value]) => (
        <div
          key={label}
          style={{
            background: "rgba(255,255,255,.05)",
            border: "1px solid rgba(0,255,170,.2)",
            borderRadius: 14,
            padding: 20,
          }}
        >
          <div
            style={{
              color: "#78cbb7",
              fontSize: 12,
              marginBottom: 10,
            }}
          >
            {label}
          </div>

          <strong>{value}</strong>
        </div>
      ))}
    </div>
  );
}