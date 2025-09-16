interface MdxLayoutProps {
  children: React.ReactNode;
}

export default function MdxLayout({ children }: MdxLayoutProps) {
  return (
    <div className="relative">
      {/* Cover Banner or Gradient */}
      <div className="pointer-events-none fixed md:pl-[265px] md:pr-2 top-0 md:top-2 left-0 right-0 z-1">
        <div className="md:container w-full max-w-none md:max-w-6xl mx-auto px-4 md:px-0 h-12 bg-gradient-to-t to-sidebar rounded-t-2xl" />
      </div>

      <div className="mx-auto px-4 mt-4 pt-10">{children}</div>

      {/* Footer glow */}
      {/* <div className="pointer-events-none fixed md:pl-[265px] md:pr-2 bottom-0 md:bottom-2 left-0 right-0 z-1">
        <div className="md:container w-full max-w-none md:max-w-6xl mx-auto px-4 md:px-0 h-12 bg-gradient-to-t from-sidebar rounded-b-2xl" />
      </div> */}
    </div>
  );
}
