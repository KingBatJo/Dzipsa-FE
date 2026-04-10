/**
 * Tailwind 설정 파일
 * - 디자인 토큰(색상, 폰트 등) 확장
 * - 다크모드, 플러그인 설정
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // 커스텀 색상/폰트 등 추가
    },
  },
  plugins: [],
};
