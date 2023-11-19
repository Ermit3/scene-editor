interface EditorProps {
  children?: React.ReactNode;
}

export default function EditorLayout({ children }: EditorProps) {
  return <div className="min-h-screen">{children}</div>;
}
