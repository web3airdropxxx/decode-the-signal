type Props = {
  visible: boolean;
};

export default function DecryptScreen({ visible }: Props) {
  if (!visible) return null;

  return (
    <div
      style={{
        border: "2px solid #00ff99",
        marginTop: 25,
        padding: 40,
        textAlign: "center",
        animation: "pulse 1s infinite",
      }}
    >
      <h2>INITIALIZING QUANTUM DECODER</h2>

      <br />

      <h1
        style={{
          letterSpacing: 8,
          fontSize: 40,
        }}
      >
        █▒▒▒▒▒▒▒▒▒
      </h1>

      <br />

      <p>Decrypting transmission...</p>

      <p>Please wait...</p>
    </div>
  );
}