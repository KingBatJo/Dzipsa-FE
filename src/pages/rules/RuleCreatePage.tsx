import type { CreateRuleRequest } from '@/api/rule/rule.types';
import RuleForm from '@/pages/rules/components/RuleForm';
import { toast } from 'sonner';
import { useCreateRuleMutation } from '@/api/rule/rule.query';
import { useNavigate } from 'react-router-dom';

const RuleCreatePage = () => {
  const navigate = useNavigate();
  const { mutate: createRule, isPending } = useCreateRuleMutation();

  const handleCreate = (payload: CreateRuleRequest) => {
    createRule(payload, {
      onSuccess: () => {
        toast('규칙이 등록되었어요.');
        navigate('/rules');
      },
      onError: () => {
        toast('규칙 등록에 실패했어요. 다시 시도해주세요.');
      },
    });
  };

  return (
    <RuleForm mode="create" onSubmit={handleCreate} isSubmitting={isPending} />
  );
};

export default RuleCreatePage;
