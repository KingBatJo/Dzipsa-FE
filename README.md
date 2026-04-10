# Dzipsa
<a href="https://www.dzipsa.site/">
  <img width="1920" height="1080" alt="디집사" src="https://github.com/user-attachments/assets/86363ff5-369e-4ffe-a0b4-d4bd214ee33e" />
</a>

> 🔗 [Dzipsa](https://www.dzipsa.site/)

함께 사는 사람들 간의 역할 분담과 책임 관리의 어려움을 해결하기 위해 만든 서비스입니다.

사용자는 방(집)에 참여하여 규칙을 설정하고, 할 일을 등록 및 분배하며, 지연된 할 일과 경고를 통해 책임감을 유지할 수 있습니다.

## Project Info
- 개발 기간: 2026.02.25 ~ 2026.03.26 (약 1개월)
- 팀 구성: FE 1명, BE 2명, PM 2명, PD 2명

프론트엔드는 UI 구현, 라우팅, 상태 관리, API 연동 등을 담당

## Tech Stack
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white&style=for-the-badge)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white&style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=react-router&logoColor=white&style=for-the-badge)
![Zustand](https://img.shields.io/badge/Zustand-443E38?style=for-the-badge&logo=react&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)

![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)

![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)

![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## Features

### 1. 방 생성 및 참여
온보딩 단계에서 초대 코드를 통해 같은 집 구성원으로 연결

| 로그인 | 집 생성하기 | 초대코드 입력하기 | 로딩 화면 |
|---|---|---|---|
| <img width="375" height="800" alt="LoginPage" src="https://github.com/user-attachments/assets/053c9fd5-5b2a-4eca-9adc-529b9ddba8c0" /> | ![CreateHouse_final](https://github.com/user-attachments/assets/195f4f8a-3a01-47a3-98f1-dc064e569a87) | ![JoinHouse_final](https://github.com/user-attachments/assets/877b6f87-3abc-41e1-aa7d-7b942f2323de) | <img width="375" height="800" alt="Loading" src="https://github.com/user-attachments/assets/fe535256-ec29-4fca-b481-2e2052d0e228" /> |

### 2. 규칙 관리
구성원 간 지킬 규칙을 설정
- 반복 요일 및 시간 설정 지원
- 경고 기능(집사에게 알리기) 제공
- 경고된 규칙은 규칙 페이지 상단에 노출

| 규칙 등록 | 시간 설정 다이얼로그 | 규칙 상세보기 및 편집 |
|------------|------------|------------|
| ![Rule_new](https://github.com/user-attachments/assets/179aefee-9093-4e12-9582-d44b0896a223) | ![TimeWheelDialog](https://github.com/user-attachments/assets/5a2b480b-6480-4035-95a8-6be74bd0d398) | ![RuleEdit](https://github.com/user-attachments/assets/2d7fe961-f174-4827-ba4c-c1b133ae415c) |

| 경고(집사에게 알리기) | 규칙 리스트 조회(무한스크롤) |
|------------|------------|
| ![Rule_Notice](https://github.com/user-attachments/assets/aeacbc6a-1fb1-4329-a007-448baa0ae98d) | ![RulesList_InfinityScroll](https://github.com/user-attachments/assets/9db901e1-2a3f-4c84-93fa-9fe18c28708b) |

### 3. 할 일 관리
- 할 일 생성(매주/매월 반복 설정 가능) / 수정 / 삭제  
- 반복 할 일 삭제 시 범위 선택 지원
  - 이번 일정만 삭제
  - 이후 일정 모두 삭제
  - 전체 반복 삭제
- 랜덤 배정 기능 제공
- 할 일 완료 (사진 첨부 지원)

| 할 일 등록 | 담당자 랜덤배정 | 할 일 상세보기+편집 | 할 일 삭제 |
|----|----|----|----|
| ![할일등록](https://github.com/user-attachments/assets/2802d56c-9076-4425-80f1-22240f16ecde) | ![담당자 랜덤배정](https://github.com/user-attachments/assets/f7b5f2e2-59e8-4e66-b847-120f10a41cda) | ![할일상세보기+수정](https://github.com/user-attachments/assets/57b12a7f-4cb6-499d-8a81-52da92dccb60) | ![할일삭제](https://github.com/user-attachments/assets/22d8179c-07df-47b6-b971-d4c0f412a2c4) |

| 할 일 완료 (사진 첨부) | 진행중으로 변경 |
|----|----|
| ![할일완료+사진첨부](https://github.com/user-attachments/assets/e3a119f4-8ddb-4c6d-8775-8dc7d43dc10d) | ![진행중으로변경](https://github.com/user-attachments/assets/ab4f831c-c9a6-4309-a556-aa489ff411fd) |

#### 3-1. 탭 구성 (탭별 무한스크롤 지원)
- 나의 할 일: 놓친 할 일 / 오늘 할 일 / 예정된 할 일
- 우리집 할 일: 전체 할 일 / 구성원별 할 일 조회
- 완료된 할 일: 피드 형태로 조회

| 나의 할 일 | 우리집 할 일 | 완료된 할 일 |
|----|----|----|
| ![나의할일_5개씩더보기](https://github.com/user-attachments/assets/61546565-6c6d-4321-acb5-13200302418b) | ![우리집할일_무한스크롤](https://github.com/user-attachments/assets/310d495f-73f5-4f94-bb95-124dd5f75934) | ![완료된할일_무한스크롤](https://github.com/user-attachments/assets/f550b5e7-53cd-437a-871f-d51bf9759658) |
| 5개씩 더보기 | 10개씩 | 10개씩 |


### 4. 홈 대시보드
홈 화면에서 다음 정보를 확인 가능
- 경고된 규칙에 따른 집 상태 단계 (총 5단계)
- 놓친 할 일 개수 및 경고 규칙 개수
- 온보딩에서 설정한 우리집 가훈 및 구성원 정보
- 나의 오늘 할 일 및 빠른 완료 기능

| 오늘 할 일 가로 무한 스크롤 및 빠른 완료 | 놓친 할 일 개수 반영 | 경고 규칙 개수 및 상태 반영 |
|---|---|---|
| ![오늘할일빠른완료](https://github.com/user-attachments/assets/5d4b904f-daa7-42ff-b3bc-d4a1860b2417) | ![놓친할일개수](https://github.com/user-attachments/assets/abb73aec-55d8-4545-9380-3e03d42602e0) | ![규칙경고개수및상태반영](https://github.com/user-attachments/assets/34a449d3-3e2a-4b85-9b72-109f74aa9c58) |

### 5. 마이페이지 및 방 관리
- 내 프로필 정보 확인
- 내 방 초대 및 구성원 관리, 방 나가기, 로그아웃 기능 제공

#### 5-1. 내 방 초대 및 구성원 관리
- 현재 방의 초대코드 확인 가능
- 초대코드 재발급 가능
- 방장인 경우에만 구성원 내보내기 가능

| 마이페이지 | 구성원 내보내기(방장만 가능) |
|---|---|
| ![Mypage_final](https://github.com/user-attachments/assets/48ace074-9796-4952-960b-4e37ceb1b805) | ![kick_out](https://github.com/user-attachments/assets/6ac85870-ec3a-4a08-a805-79594a549f21) |

## Project Structure

```
src/
├── api/                 # API 통신 모듈
├── assets/              # 정적 리소스
├── components/          # 재사용 컴포넌트
│   ├── common/
│   ├── form/
│   ├── layout/
│   └── ui/
├── constants/           # 상수 정의
├── hooks/               # 공통 커스텀 훅
├── lib/                 # 라이브러리 설정/헬퍼
├── pages/               # 라우트 단위 페이지
│   ├── home/
│   ├── login/
│   ├── mypage/
│   ├── notification/
│   ├── onboarding/
│   ├── rules/
│   └── todos/
├── providers/           # 전역 Provider 설정
├── routes/              # 라우팅 설정
├── schemas/             # 유효성 검증 스키마
├── stores/              # 전역 상태 관리
├── types/               # TypeScript 타입 정의
└── utils/               # 유틸리티 함수
```

## Routing Structure

```
Routing
├── /                              # 루트 진입
├── /login                         # 로그인
├── /auth/callback                 # 소셜 로그인 콜백
├── /signup (group)
│   ├── /signup/terms              # 약관 동의
│   │   └── /signup/terms/:type    # 약관 상세
│   └── /signup/complete           # 가입 완료 및 온보딩 진입 안내
├── /onboarding                    # 집에 입장하지 않은 사용자만 접근
│   ├── /onboarding/create         # 하우스 생성
│   └── /onboarding/join           # 하우스 참여
├── /home                          # 로그인 + 약관 동의 + 집 입장 완료 후 접근
├── /todos                         # 기본 탭(/todos/my)으로 리다이렉트
│   ├── /todos/:tab                # 탭별 할 일(my | house | completed)
│   ├── /todos/new                 # 할 일 생성
│   ├── /todos/:todoId/edit        # 할 일 수정
│   ├── /todos/list/category/:type # 카테고리별 목록
│   └── /todos/list/member/:memberId # 멤버별 목록
├── /rules                         # 규칙
│   ├── /rules/new                 # 규칙 생성
│   └── /rules/:ruleId/edit        # 규칙 수정
├── /notifications                 # 알림
├── /mypage                        # 마이페이지
│   └── /mypage/invitation         # 초대 코드/링크
└── *                              # 404 Not Found
```

## Getting Started

```bash
# 패키지 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

## Troubleshooting

### 1. 새로고침 시 로그인 상태 유지 문제

- 문제
    - 새로고침 시 로그인 페이지로 리다이렉트되거나, 사용자가 보던 페이지가 유지되지 않는 문제 발생
- 원인
    - zustand 메모리 초기화로 `accessToken`이 null이 된 상태에서 라우트 가드가 먼저 실행되어 비로그인 상태로 판단됨
- 해결
    - `AuthInitializer`를 Router 최상단에 배치하여 인증 복구를 먼저 수행
    - `refresh → 사용자 정보 조회` 이후에 라우트 렌더링 진행
    - 인증 완료 전까지 렌더링을 차단하는 상태(`isAuthChecked`) 도입

→ 새로고침 시에도 로그인 상태와 현재 페이지가 유지되도록 개선

### 2. 랜덤 배정 오버레이 이미지 지연 문제

- 문제
    - 오버레이 진입 시 핵심 이미지가 늦게 로드되어 깜빡임 발생
- 원인
    - preload를 적용했지만, 이미지 용량(약 1MB 이상)이 커서 다운로드 시간이 병목 발생
- 해결
    - preload 유지 + 이미지 용량 최적화 병행
    - SVG → PNG로 변경하여 약 60~170KB로 축소

→ 로딩 시간 약 3초 → 300~400ms로 개선, 즉시 표시되도록 개선

## Next Steps

- React Query 캐시 전략 개선
    - 불필요한 invalidate 및 중복 API 호출을 줄이고, 캐시 재사용성을 높이는 방향으로 개선
- 인증 구조 개선
    - accessToken을 persist로 관리하고, 토큰 유효성 검사 기반으로 로그인 상태를 안정적으로 유지하도록 개선
- 에러 처리 구조 개선
    - 분산된 에러 처리 로직을 공통 레이어로 통합하여 일관된 에러 핸들링 적용
- 알림 및 미구현 기능 확장
    - 사용자 행동 기반 알림 기능 추가 및 MVP 범위에서 제외된 기능 확장
