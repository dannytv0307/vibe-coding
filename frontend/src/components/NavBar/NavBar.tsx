export interface NavBarProps {
  children?: React.ReactNode
  className?: string
}

export function NavBar({ children, className }: NavBarProps) {
  return (
    <header
      role="banner"
      className={['sticky top-0 z-50 w-full bg-white border-b border-gray-200', className]
        .filter(Boolean)
        .join(' ')}
    >
      <nav
        aria-label="Main navigation"
        className="flex items-center gap-4 max-w-7xl mx-auto px-4 h-15"
      >
        {children}
      </nav>
    </header>
  )
}
