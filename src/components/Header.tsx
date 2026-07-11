type Props = {
  title: string;
  year: string;
};

export default function Header({
  title,
  year,
}: Props) {
  return (
    <div
      style={{
        textAlign: "center",
        marginBottom: 30,
      }}
    >
      <h1
        style={{
          fontSize: 42,
          marginBottom: 10,
          letterSpacing: 2,
        }}
      >
        {title}
      </h1>

      <p
        style={{
          color: "#7fe8d1",
        }}
      >
        {year}
      </p>
    </div>
  );
}