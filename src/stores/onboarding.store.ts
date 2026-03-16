import { createJSONStorage, persist } from 'zustand/middleware';

import { create } from 'zustand';

export type CreateHouseStep = 'motto' | 'profile' | 'invite';
export type JoinHouseStep = 'invite' | 'confirm' | 'profile';

type CreateFlowState = {
  step: CreateHouseStep;
  motto: string;
  nickname: string;
  isNicknameEdited: boolean;
  selectedProfileId: string;
};

type JoinFlowState = {
  step: JoinHouseStep;
  inviteCode: string;
  nickname: string;
  isNicknameEdited: boolean;
  selectedProfileId: string;
};

type OnboardingState = {
  createFlow: CreateFlowState;
  joinFlow: JoinFlowState;

  setCreateStep: (step: CreateHouseStep) => void;
  updateCreateFlow: (payload: Partial<CreateFlowState>) => void;
  setCreateNickname: (nickname: string) => void;
  resetCreateFlow: () => void;

  setJoinStep: (step: JoinHouseStep) => void;
  updateJoinFlow: (payload: Partial<JoinFlowState>) => void;
  setJoinNickname: (nickname: string) => void;
  resetJoinFlow: () => void;

  initializeNicknames: (nickname: string) => void;
  resetOnboarding: () => void;
};

const CREATE_FLOW_INITIAL_STATE: CreateFlowState = {
  step: 'motto',
  motto: '',
  nickname: '',
  isNicknameEdited: false,
  selectedProfileId: '1',
};

const JOIN_FLOW_INITIAL_STATE: JoinFlowState = {
  step: 'invite',
  inviteCode: '',
  nickname: '',
  isNicknameEdited: false,
  selectedProfileId: '1',
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      createFlow: CREATE_FLOW_INITIAL_STATE,
      joinFlow: JOIN_FLOW_INITIAL_STATE,

      // 방 생성 플로우 step 변경
      setCreateStep: (step) =>
        set((state) => ({
          createFlow: {
            ...state.createFlow,
            step,
          },
        })),

      // 방 생성 플로우 입력값 부분 업데이트
      updateCreateFlow: (payload) =>
        set((state) => ({
          createFlow: {
            ...state.createFlow,
            ...payload,
          },
        })),

      setCreateNickname: (nickname) =>
        set((state) => ({
          createFlow: {
            ...state.createFlow,
            nickname,
            isNicknameEdited: true,
          },
        })),

      resetCreateFlow: () =>
        set({
          createFlow: CREATE_FLOW_INITIAL_STATE,
        }),

      // 방 입장 플로우 step 변경
      setJoinStep: (step) =>
        set((state) => ({
          joinFlow: {
            ...state.joinFlow,
            step,
          },
        })),

      // 방 입장 플로우 입력값 부분 업데이트
      updateJoinFlow: (payload) =>
        set((state) => ({
          joinFlow: {
            ...state.joinFlow,
            ...payload,
          },
        })),

      setJoinNickname: (nickname) =>
        set((state) => ({
          joinFlow: {
            ...state.joinFlow,
            nickname,
            isNicknameEdited: true,
          },
        })),

      resetJoinFlow: () =>
        set({
          joinFlow: JOIN_FLOW_INITIAL_STATE,
        }),

      initializeNicknames: (nickname) =>
        set((state) => ({
          createFlow: {
            ...state.createFlow,
            nickname:
              !state.createFlow.isNicknameEdited &&
              !state.createFlow.nickname.trim()
                ? nickname
                : state.createFlow.nickname,
          },
          joinFlow: {
            ...state.joinFlow,
            nickname:
              !state.joinFlow.isNicknameEdited &&
              !state.joinFlow.nickname.trim()
                ? nickname
                : state.joinFlow.nickname,
          },
        })),

      // 온보딩 전체 초기화
      resetOnboarding: () =>
        set({
          createFlow: CREATE_FLOW_INITIAL_STATE,
          joinFlow: JOIN_FLOW_INITIAL_STATE,
        }),
    }),
    {
      name: 'onboarding-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
