import React from "react"

export default function LogoNameHeader() {
  return (
    <header className="w-full border-b">
      <div className="container flex h-16 ml-10 items-center">
        <a href="/" className="flex items-center space-x-3">
          <img
            src="/menu.png?height=40&width=40"
            alt="Bank Dash"
            width={40}
            height={40}
            className="rounded-md"
          />
          <span className="text-xl font-semibold text-primary">Bank Dash</span>
        </a>
      </div>
    </header>
  )
}