type AppHeaderProps = {
    title: string;
};

export function AppHeader({
    title,
}: AppHeaderProps) {
    return (
        <header className="sticky top-0 z-20 bg-white shadow-sm">
            <div className="mx-auto flex h-14 max-w-screen-sm items-center justify-center px-4">
                <h1 className="text-lg font-semibold">
                    {title}
                </h1>
            </div>
        </header>
    );
}