export default function CanvaLight() {
  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
    </>
  );
}
