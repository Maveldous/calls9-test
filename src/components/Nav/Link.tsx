import { ReactNode } from "react"

interface IProps {
  children: ReactNode | string
  to: string
  className?: string
}

function Link({ children, to, className = "" }: IProps) {
  return (
    <a
      className={`uppercase px-3 hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-100 ${className}`}
      href={to}
    >
      {children}
    </a>
  )
}
export default Link
