type Props = {
  onStart: () => void;
};

export default function StartScreen({ onStart }: Props) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: 60,
      }}
    >
      <h1
        style={{
          fontSize: 48,
          marginBottom: 20,
        }}
      >
        DECODE THE SIGNAL
      </h1>

      <p
        style={{
          color: "#9bd9c8",
          maxWidth: 600,
          margin: "0 auto",
          lineHeight: 1.8,
        }}
      >
        Alien civilizations are sending encrypted
        transmissions across the galaxy.

        <br />
        <br />

        Connect your wallet.

        Spend 1 UTC.

        Decode the signal.

        Earn the highest Decoder Rank.
      </p>

      <button
        style={{
          marginTop: 40,
        }}
        onClick={onStart}
      >
        START MISSION
      </button>
    </div>
  );
}