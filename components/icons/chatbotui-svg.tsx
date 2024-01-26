import { FC } from "react"

interface ChatbotUISVGProps {
  theme: "dark" | "light"
  scale?: number
}

export const ChatbotUISVG: FC<ChatbotUISVGProps> = ({ theme, scale = 1 }) => {
  return (
    <svg
      width={189 * scale}
      height={194 * scale}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="12.5"
        y="12.5"
        width="164"
        height="127"
        rx="37.5"
        fill={`${theme === "dark" ? "#000" : "#fff"}`}
        stroke={`${theme === "dark" ? "#fff" : "#000"}`}
        strokeWidth="25"
      />
      <path
        d="M20 7.5v9l-4 2.25l-4 2.25l-4 -2.25l-4 -2.25v-9l4 -2.25l4 -2.25l4 2.25z"
        stroke={theme === "dark" ? "#fff" : "#000"}
      />
      <path
        d="M12 12l4 -2.25l4 -2.25"
        stroke={theme === "dark" ? "#fff" : "#000"}
      />
      <path d="M12 12l0 9" stroke={theme === "dark" ? "#fff" : "#000"} />
      <path
        d="M12 12l-4 -2.25l-4 -2.25"
        stroke={theme === "dark" ? "#fff" : "#000"}
      />
      <path d="M20 12l-4 2v4.75" stroke={theme === "dark" ? "#fff" : "#000"} />
      <path d="M4 12l4 2l0 4.75" stroke={theme === "dark" ? "#fff" : "#000"} />
      <path
        d="M8 5.25l4 2.25l4 -2.25"
        stroke={theme === "dark" ? "#fff" : "#000"}
      />
    </svg>
  )
}
