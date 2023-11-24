export const CanvasLight = () => {
  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
    </>
  );
};

export default CanvasLight;
