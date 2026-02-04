export default function StudioLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="m-0 p-0 overflow-hidden h-screen text-black bg-white">
            {children}
        </div>
    );
}
