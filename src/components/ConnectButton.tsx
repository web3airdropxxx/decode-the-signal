type ConnectButtonProps = {
  text: string;
};

export default function ConnectButton({
  text,
}: ConnectButtonProps) {
  return <button>{text}</button>;
}