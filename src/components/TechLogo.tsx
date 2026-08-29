import React from "react";

interface TechLogoProps {
  name: string;
  size?: number;
  className?: string;
}

export default function TechLogo({ name, size = 16, className = "" }: TechLogoProps) {
  const normName = name.toLowerCase().trim();

  // Java
  if (normName === "java") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
      >
        <path
          d="M8.85 18.56c-.92.53.67.71 2.42.27 2.42-.27 3.68-.24 6.08.22 0 0 .95-.6-.43-.92-3.95-.9-8.48-.23-6.32 1.41z"
          fill="#5382A1"
        />
        <path
          d="M7.8 15.48c-1.05.78.57.98 2.45.31 2.45-.31 4.77-.35 8.02.38 0 0 .68-.45-.33-.73-3.95-1.1-9.98-.38-8.25 1.33z"
          fill="#E76F00"
        />
        <path
          d="M13.27 6.02c.8 1.05-1.15 2.13-1.15 2.13s3.08-1.63 1.67-3.3c-1.38-1.63-2.62-2.48.57-4.97 0 0-4.09 1.83-1.09 6.14z"
          fill="#E76F00"
        />
        <path
          d="M17.25 10.29c.75.87 2.13.45 2.13.45s-.75.47-1.85.53c-1.78.1-3.38-.35-3.38-.35s.82-.42 3.1-.63z"
          fill="#5382A1"
        />
        <path
          d="M12.52 3.01s-3.75 3.37 0 6.55c-1.28-1.2-1.95-2.63-.87-3.95 1.25-1.52.87-2.6.87-2.6z"
          fill="#5382A1"
        />
        <path
          d="M18.85 14.44s.88-.55-.67-.88c-2.35-.5-5.25-.33-8.08.08-1.9.28-3.7.83-3.7.83s1.25-.43 3.73-.77c3.15-.42 6.45-.48 8.72.74z"
          fill="#E76F00"
        />
        <path
          d="M6.5 21.2c4.8 1.1 10.2.7 13.2-.8-.4-.4-1.2-.2-2.4.1-3.6.7-7.8.6-10.8-.2.8.5 0 .9 0 .9z"
          fill="#5382A1"
        />
      </svg>
    );
  }

  // JavaScript
  if (normName === "javascript" || normName === "js") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
      >
        <rect width="24" height="24" rx="3" fill="#F7DF1E" />
        <path
          d="M6.5 18.2c.7.4 1.5.7 2.4.7 1.4 0 2.2-.7 2.2-1.8v-6.3h-1.8v6.2c0 .6-.3.9-.9.9-.4 0-.8-.1-1.1-.3l-.8.6zm7.2-.1c.9.5 2 .8 3.1.8 2.1 0 3.3-1.1 3.3-2.7 0-1.5-.9-2.3-2.4-2.9l-.7-.3c-1-.4-1.4-.8-1.4-1.4 0-.7.6-1.2 1.5-1.2.9 0 1.6.3 2.1.6l.6-1.4c-.6-.4-1.5-.7-2.6-.7-2 0-3.2 1.1-3.2 2.6 0 1.4.9 2.2 2.3 2.8l.7.3c1.1.4 1.5.8 1.5 1.5 0 .8-.7 1.3-1.7 1.3-1.1 0-2-.4-2.5-.8l-.7 1.4z"
          fill="#000000"
        />
      </svg>
    );
  }

  // TypeScript
  if (normName === "typescript" || normName === "ts") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
      >
        <rect width="24" height="24" rx="3" fill="#3178C6" />
        <path
          d="M5.5 10.8h5v1.6h-1.6v5.8h-1.8v-5.8H5.5v-1.6zm8.2 7.3c.9.5 2 .8 3.1.8 2.1 0 3.3-1.1 3.3-2.7 0-1.5-.9-2.3-2.4-2.9l-.7-.3c-1-.4-1.4-.8-1.4-1.4 0-.7.6-1.2 1.5-1.2.9 0 1.6.3 2.1.6l.6-1.4c-.6-.4-1.5-.7-2.6-.7-2 0-3.2 1.1-3.2 2.6 0 1.4.9 2.2 2.3 2.8l.7.3c1.1.4 1.5.8 1.5 1.5 0 .8-.7 1.3-1.7 1.3-1.1 0-2-.4-2.5-.8l-.7 1.4z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // Python
  if (normName === "python") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
      >
        <path
          d="M11.9 2c-3.1 0-5.1.7-5.1 2.8v2.1h5.1v.7H4.7c-2.1 0-4 .9-4 3.7 0 2.8 1.5 3.8 3.5 3.8h1.6v-2.3c0-2.4 2-4.4 4.4-4.4h5.1V6.1c0-2.1-2.2-4.1-7.4-4.1zm-2.8 1.6c.6 0 1.1.5 1.1 1.1s-.5 1.1-1.1 1.1-1.1-.5-1.1-1.1.5-1.1 1.1-1.1z"
          fill="#3776AB"
        />
        <path
          d="M12.1 22c3.1 0 5.1-.7 5.1-2.8v-2.1h-5.1v-.7h7.2c2.1 0 4-.9 4-3.7 0-2.8-1.5-3.8-3.5-3.8h-1.6v2.3c0 2.4-2 4.4-4.4 4.4h-5.1v2.3c0 2.1 2.2 4.1 7.4 4.1zm2.8-1.6c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1 1.1.5 1.1 1.1-.5 1.1-1.1 1.1z"
          fill="#FFD438"
        />
      </svg>
    );
  }

  // C Language
  if (normName === "c") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
      >
        <path
          d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z"
          fill="#00599C"
          stroke="#A8B9CC"
          strokeWidth="0.8"
        />
        <path
          d="M15.5 8.5c-.9-.8-2.1-1.2-3.5-1.2-3 0-5.1 2.1-5.1 4.7s2.1 4.7 5.1 4.7c1.4 0 2.6-.4 3.5-1.2l1.1 1.5c-1.2 1.1-2.9 1.7-4.6 1.7-4.2 0-7.2-2.9-7.2-6.7s3-6.7 7.2-6.7c1.7 0 3.4.6 4.6 1.7l-1.1 1.5z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // React
  if (normName === "react") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
      >
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="4"
          transform="rotate(60 12 12)"
          stroke="#61DAFB"
          strokeWidth="1.5"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="4"
          transform="rotate(120 12 12)"
          stroke="#61DAFB"
          strokeWidth="1.5"
        />
        <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
      </svg>
    );
  }

  // Next.js
  if (normName === "next.js" || normName === "nextjs") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
      >
        <circle cx="12" cy="12" r="11" fill="#000000" stroke="#FFFFFF" strokeWidth="1.2" />
        <path
          d="M15.5 7.5v8m-7-8v9l8.6-8.8"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // Vue.js
  if (normName === "vue.js" || normName === "vue" || normName === "vuejs") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
      >
        <path d="M12 18.5L1.5 2h4.8L12 11.2 17.7 2h4.8L12 18.5z" fill="#42B883" />
        <path d="M12 14L5.6 2h3.8L12 7.6 14.6 2h3.8L12 14z" fill="#35495E" />
      </svg>
    );
  }

  // HTML5
  if (normName === "html5" || normName === "html") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
      >
        <path d="M3 2l1.6 18.3L12 23l7.4-2.7L21 2H3z" fill="#E34F26" />
        <path d="M12 3.8v17.4l5.9-2.2L19.2 3.8H12z" fill="#EF652A" />
        <path
          d="M7.4 6.7h9.2l-.3 3.3H7.7l.3 3.3h7.9l-.4 3.7-3.5 1-3.5-1-.2-2.1H6.6l.4 3.8 5 1.4 5-1.4.8-8.7H6.1l.3-3.3h1z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // CSS3
  if (normName === "css3" || normName === "css") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
      >
        <path d="M3 2l1.6 18.3L12 23l7.4-2.7L21 2H3z" fill="#1572B6" />
        <path d="M12 3.8v17.4l5.9-2.2L19.2 3.8H12z" fill="#33A9DC" />
        <path
          d="M7.4 6.7h9.2l-.3 3.3H7.7l.3 3.3h7.9l-.4 3.7-3.5 1-3.5-1-.2-2.1H6.6l.4 3.8 5 1.4 5-1.4.8-8.7H6.1l.3-3.3h1z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // Tailwind CSS
  if (normName === "tailwind css" || normName === "tailwind") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
      >
        <path
          d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.974 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.974 12 6.001 12z"
          fill="#06B6D4"
        />
      </svg>
    );
  }

  // Spring Boot
  if (normName === "spring boot" || normName === "spring") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
      >
        <rect width="24" height="24" rx="12" fill="#6DB33F" />
        <path
          d="M17.5 12.2c-.3 2.7-2.3 4.8-5 5.1-3 .4-5.7-1.8-6-4.8-.3-3 1.8-5.7 4.8-6 1.8-.2 3.6.5 4.7 1.8l-1.6 1.5c-.8-.9-2-.1-2.4 1-.4 1.1.2 2.3 1.3 2.6 1.1.3 2.3-.3 2.6-1.4l1.6.2z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // Express.js
  if (normName === "express.js" || normName === "express") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
      >
        <rect width="24" height="24" rx="4" fill="#1e293b" />
        <path
          d="M4.5 15.5l4-7h2.2l-4 7h-2.2zm6.8 0l2.8-3.7-2.6-3.3h2.2l1.6 2.2 1.6-2.2h2.2l-2.6 3.3 2.8 3.7h-2.3l-1.8-2.5-1.8 2.5h-2.1z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // REST APIs
  if (normName === "rest apis" || normName === "rest" || normName === "api") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
      >
        <circle cx="5" cy="12" r="3" fill="#00D4B4" />
        <circle cx="19" cy="6" r="3" fill="#4edea3" />
        <circle cx="19" cy="18" r="3" fill="#60a5fa" />
        <path d="M7.8 10.8l8.4-3.6M7.8 13.2l8.4 3.6" stroke="#94a3b8" strokeWidth="1.5" />
      </svg>
    );
  }

  // JWT
  if (normName === "jwt") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
      >
        <circle cx="12" cy="12" r="10" fill="#000000" stroke="#FB015B" strokeWidth="1.2" />
        <path
          d="M8.5 7.5l3.5 2 3.5-2v4.5l-3.5 2-3.5-2V7.5z"
          stroke="#D63AFF"
          strokeWidth="1.2"
          fill="none"
        />
        <circle cx="12" cy="12" r="1.5" fill="#00B9F1" />
      </svg>
    );
  }

  // Docker
  if (normName === "docker") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
      >
        <path
          d="M13.9 12.5h-1.4v-1.4h1.4v1.4zm-1.8 0h-1.4v-1.4h1.4v1.4zm-1.8 0H8.9v-1.4h1.4v1.4zm-1.8 0H7.1v-1.4h1.4v1.4zm3.6-1.8h-1.4V9.3h1.4v1.4zm-1.8 0h-1.4V9.3h1.4v1.4zm-1.8 0H8.9V9.3h1.4v1.4zm3.6-1.8h-1.4V7.5h1.4v1.4z"
          fill="#2496ED"
        />
        <path
          d="M23.9 12.8c-.4-.3-1.4-.4-2.1-.1-.1-.6-.5-1.1-.9-1.5l-.6.5c.3.4.4.8.4 1.3-1.1.1-2.2.7-2.6 1.8H2.1c-.2 1.3.1 2.9 1.1 4.1 1.4 1.6 3.5 2.1 5.5 2.1 4.6 0 8.7-2.4 10.8-6.4 1.6.1 3.4-.4 4.4-1.3z"
          fill="#2496ED"
        />
      </svg>
    );
  }

  // MySQL
  if (normName === "mysql") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
      >
        <path
          d="M20.2 13.2c-.3-.2-1.7-.8-3.1-.2-1.3.6-2.1 2-2.1 2s-1.8-1.5-4-1.3c-2.3.2-3.4 1.7-3.4 1.7s-.6-3.2 2-5.4c2.6-2.2 5.5-1.6 5.5-1.6s-.9-.8-2.7-.8c-2.7 0-5.4 1.9-6.4 4.7-.6 1.8-.4 3.7.5 5.2 1.3 2.1 3.8 2.6 3.8 2.6s-.3-.5-.4-.9c1.6.4 3.3.2 4.7-.7.9-.6 1.5-1.5 1.5-1.5s1.2 1.1 2.8.7c1.4-.4 1.7-1.7 1.7-1.7s.4.6 1.1.6c.9 0 1.2-.8 1.2-.8s-.6-.2-.9-.4c-.6-.4-.9-1.1-.9-1.3z"
          fill="#00758F"
        />
        <circle cx="16.5" cy="11.5" r="0.8" fill="#F29111" />
      </svg>
    );
  }

  // MSSQL
  if (normName === "mssql" || normName === "sql server" || normName === "microsoft sql server") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
      >
        <ellipse cx="12" cy="6" rx="8" ry="3" fill="#CC292B" />
        <path
          d="M4 6v5c0 1.66 3.58 3 8 3s8-1.34 8-3V6"
          stroke="#CC292B"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M4 11v5c0 1.66 3.58 3 8 3s8-1.34 8-3v-5"
          stroke="#CC292B"
          strokeWidth="1.5"
          fill="none"
        />
        <path d="M8 6h8M8 11h8M8 16h8" stroke="#FFFFFF" strokeWidth="0.8" />
      </svg>
    );
  }

  // MongoDB
  if (normName === "mongodb") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
      >
        <path
          d="M12 1.5s-.2.2-.4.5C10.2 4.1 4.5 9.7 4.5 15.3c0 4.2 3.4 7.2 7.5 7.2s7.5-3 7.5-7.2c0-5.6-5.7-11.2-7.1-13.3-.2-.3-.4-.5-.4-.5z"
          fill="#47A248"
        />
        <path
          d="M12 2v20.5c.3 0 .7-.1 1-.2 3.6-.9 6.5-3.8 6.5-7 0-5-4.8-10.2-6.5-12.3-.3-.4-.6-.7-1-1z"
          fill="#499D4A"
        />
        <path
          d="M12 22.5c-.3 0-.7 0-1-.1-3.6-.9-6.5-3.8-6.5-7.1 0-5 4.8-10.2 6.5-12.3.3.4.6.7 1 1v18.5z"
          fill="#3FA037"
        />
        <path
          d="M12 21.8v-7.6c-.6.2-1.2.6-1.5 1.1-.3.5-.4 1.1-.4 1.7 0 2.2 1.2 4 1.9 4.8z"
          fill="#FFFFFF"
          opacity="0.6"
        />
      </svg>
    );
  }

  // Redis
  if (normName === "redis") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
      >
        <path d="M12 2l9 5.2v9.6l-9 5.2-9-5.2V7.2L12 2z" fill="#DC382D" />
        <path d="M12 4.5l6.5 3.8v7.4L12 19.5l-6.5-3.8V8.3L12 4.5z" fill="#A8241B" />
        <circle cx="12" cy="12" r="2.5" fill="#FFFFFF" />
      </svg>
    );
  }

  // AWS S3 / AWS
  if (normName === "aws s3" || normName === "aws" || normName === "s3") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
      >
        <rect width="24" height="24" rx="4" fill="#232F3E" />
        <path
          d="M12 4.5l6 3.5v8l-6 3.5-6-3.5v-8l6-3.5z"
          stroke="#FF9900"
          strokeWidth="1.5"
          fill="#E05243"
          fillOpacity="0.2"
        />
        <path d="M12 8v8M8 10l8 4M16 10l-8 4" stroke="#FF9900" strokeWidth="1" />
      </svg>
    );
  }

  // Render
  if (normName === "render") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
      >
        <rect width="24" height="24" rx="4" fill="#000000" />
        <path
          d="M12 4a8 8 0 00-8 8v8h8a8 8 0 008-8 8 8 0 00-8-8zm0 12H8v-4a4 4 0 014-4 4 4 0 014 4 4 4 0 01-4 4z"
          fill="#46E3B7"
        />
      </svg>
    );
  }

  // Netlify
  if (normName === "netlify") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
      >
        <path
          d="M16.8 9.5L12.5 5.2a.7.7 0 00-1 0L7.2 9.5a.7.7 0 000 1l4.3 4.3c.3.3.7.3 1 0l4.3-4.3a.7.7 0 000-1z"
          fill="#00C7B7"
        />
        <path
          d="M18.8 11.5l2.2 2.2a.7.7 0 010 1l-4.3 4.3a.7.7 0 01-1 0l-2.2-2.2M5.2 11.5L3 13.7a.7.7 0 000 1l4.3 4.3a.7.7 0 001 0l2.2-2.2"
          stroke="#00C7B7"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // Aiven Cloud / Aiven
  if (normName === "aiven cloud" || normName === "aiven") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
      >
        <circle cx="12" cy="12" r="10" fill="#FF3554" />
        <path
          d="M7 14.5c0-2.8 2.2-5 5-5s5 2.2 5 5M9.5 12a2.5 2.5 0 015 0"
          stroke="#FFFFFF"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="10" cy="14" r="1" fill="#FFFFFF" />
        <circle cx="14" cy="14" r="1" fill="#FFFFFF" />
      </svg>
    );
  }

  // GitHub Actions
  if (normName === "github actions" || normName === "github-actions" || normName === "actions") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
      >
        <circle cx="12" cy="12" r="10" fill="#2088FF" />
        <path
          d="M7.5 12l3-3 1.2 1.2L9.9 12l1.8 1.8-1.2 1.2-3-3zm9 0l-3 3-1.2-1.2 1.8-1.8-1.8-1.8 1.2-1.2 3 3z"
          fill="#FFFFFF"
        />
        <circle cx="12" cy="12" r="1.5" fill="#FFFFFF" />
      </svg>
    );
  }

  // CI/CD
  if (normName === "ci/cd" || normName === "cicd" || normName === "ci / cd") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
      >
        <path
          d="M7.5 8a4.5 4.5 0 000 9c2.2 0 3.7-1.8 4.5-3.5.8 1.7 2.3 3.5 4.5 3.5a4.5 4.5 0 000-9c-2.2 0-3.7 1.8-4.5 3.5C11.2 9.8 9.7 8 7.5 8z"
          stroke="#4edea3"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="7.5" cy="12.5" r="1.5" fill="#4edea3" />
        <circle cx="16.5" cy="12.5" r="1.5" fill="#4edea3" />
      </svg>
    );
  }

  // Git
  if (normName === "git") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
      >
        <path
          d="M21.6 10.7L13.3 2.4a1.8 1.8 0 00-2.6 0L8.3 4.8l3.3 3.3a2.2 2.2 0 012.7 2.7l3.2 3.2a2.1 2.1 0 011.8 3.5 2.1 2.1 0 01-3.5-1.8l-3-3v4.6a2.1 2.1 0 01.6 1.5 2.1 2.1 0 01-4.2 0c0-.6.2-1.1.6-1.5v-4.9a2.1 2.1 0 01-1.2-2.7L5.4 6.9 2.4 9.9a1.8 1.8 0 000 2.6l8.3 8.3c.7.7 1.9.7 2.6 0l8.3-8.3a1.8 1.8 0 000-2.6z"
          fill="#F05032"
        />
      </svg>
    );
  }

  // GitHub
  if (normName === "github") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 text-ink ${className}`}
      >
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    );
  }

  // Postman
  if (normName === "postman") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
      >
        <circle cx="12" cy="12" r="11" fill="#FF6C37" />
        <path
          d="M16.5 7.5c-1.5 1-3.2 2.6-4.5 4.5l-3.2-1.8 1.8 3.2c-1.9 1.3-3.5 3-4.5 4.5 3.5-.5 7.2-3 9.2-6.5.6-1 .9-2.5 1.2-3.9z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // Figma
  if (normName === "figma") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
      >
        <path d="M8 2h4v5H8a2.5 2.5 0 010-5z" fill="#F24E1E" />
        <path d="M12 2h4a2.5 2.5 0 010 5h-4V2z" fill="#FF7262" />
        <path d="M8 7h4v5H8a2.5 2.5 0 010-5z" fill="#A259FF" />
        <circle cx="14.5" cy="9.5" r="2.5" fill="#1ABCFE" />
        <path d="M8 12h4v5a2.5 2.5 0 01-2.5 2.5A2.5 2.5 0 017 17a2.5 2.5 0 011-5z" fill="#0ACF83" />
      </svg>
    );
  }

  // Blender
  if (normName === "blender") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
      >
        <circle cx="12" cy="14" r="6" fill="#E87D0D" />
        <circle cx="12" cy="14" r="2.8" fill="#22578C" />
        <path
          d="M12 8V2m-3.5 7.5L3.5 4m8.5 4l5-5.5"
          stroke="#E87D0D"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // TensorFlow
  if (normName === "tensorflow") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
      >
        <path d="M12 2.5l8 4.6v4.6l-8-4.6V2.5z" fill="#FF6F00" />
        <path d="M12 7.1l8 4.6v4.6l-8-4.6V7.1z" fill="#FFA800" />
        <path d="M4 7.1l8-4.6v4.6L4 11.7V7.1z" fill="#FF9100" />
        <path d="M4 11.7l8-4.6v14.4l-8-4.6V11.7z" fill="#FF6F00" />
      </svg>
    );
  }

  // Google Colab
  if (normName === "google colab" || normName === "colab") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
      >
        <path
          d="M7.5 7.5a4.5 4.5 0 000 9c2.2 0 3.7-1.8 4.5-3.5-.8-1.7-2.3-3.5-4.5-3.5z"
          fill="#F9AB00"
        />
        <path
          d="M16.5 7.5c-2.2 0-3.7 1.8-4.5 3.5.8 1.7 2.3 3.5 4.5 3.5a4.5 4.5 0 000-9z"
          fill="#E37400"
        />
      </svg>
    );
  }

  // PostgreSQL
  if (normName === "postgresql" || normName === "postgres") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
      >
        <path
          d="M12 2C6.5 2 2 6.5 2 12c0 3.5 1.8 6.6 4.6 8.4.4.3.9-.1.8-.6-.3-1.6-.2-3.1.2-4.4.6-2.1 2.2-3.8 4.4-4.4 2.2-.6 4.7.1 6.2 1.7 1.5 1.6 1.8 3.9 1 5.9-.6 1.5-1.7 2.8-3.2 3.4-.4.2-.5.7-.2 1.1.9.9 2.1 1.5 3.4 1.7 2.8.5 5.6-.9 6.8-3.4C21.8 19.3 22 15.8 22 12c0-5.5-4.5-10-10-10z"
          fill="#336791"
        />
        <circle cx="9" cy="9" r="1.2" fill="#FFFFFF" />
      </svg>
    );
  }

  // Kubernetes
  if (normName === "kubernetes" || normName === "k8s") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
      >
        <circle cx="12" cy="12" r="10" fill="#326CE5" />
        <path
          d="M12 6v12M6.8 9l10.4 6M6.8 15l10.4-6"
          stroke="#FFFFFF"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="2.5" fill="#326CE5" stroke="#FFFFFF" strokeWidth="1.2" />
      </svg>
    );
  }

  // RAG (Retrieval-Augmented Generation) / AI
  if (normName === "rag" || normName === "ai/ml" || normName === "genai") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
      >
        <circle cx="12" cy="12" r="9.5" stroke="#A855F7" strokeWidth="1.2" fill="#1e1035" />
        <path
          d="M8 8l4 4-4 4M12 12h4"
          stroke="#00D4B4"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="8" r="1.2" fill="#A855F7" />
        <circle cx="16" cy="16" r="1.2" fill="#A855F7" />
      </svg>
    );
  }

  // Generic fallback code icon
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#4edea3"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
