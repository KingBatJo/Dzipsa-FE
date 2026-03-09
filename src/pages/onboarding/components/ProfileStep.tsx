import { useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import EditableInput from './EditableInput';
import Profile from '@/assets/profile.svg';
import { RefreshCw } from 'lucide-react';

const ProfileStep = () => {
  const [nickname, setNickname] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="pt-3">
      <section className="flex flex-col gap-2 px-2 pb-10">
        <h1 className="text-xl font-semibold">
          나를 표현할 프로필과
          <br />
          닉네임을 설정해주세요
        </h1>
      </section>

      <section className="flex justify-center pb-[45px]">
        <div className="relative">
          <img src={Profile} alt="프로필 사진" />

          <Button className="absolute -right-3 bottom-0 h-fit rounded-xl p-[9px] outline-2 outline-white [&>svg]:h-6 [&>svg]:w-6">
            <RefreshCw />
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-1 px-10">
        <EditableInput
          id="nickname"
          ref={inputRef}
          value={nickname}
          placeholder="닉네임을 입력해주세요"
          maxLength={20}
          onChange={setNickname}
        />

        <div className="flex justify-end text-xs font-semibold text-[#BCBCBC]">
          최대 20글자
        </div>
      </section>
    </div>
  );
};

export default ProfileStep;
