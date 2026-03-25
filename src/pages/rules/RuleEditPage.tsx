import type { CreateRuleRequest } from '@/api/rule/rule.types';
import {
  useDeleteRuleMutation,
  useUpdateRuleMutation,
} from '@/api/rule/rule.query';
import RuleForm, {
  type RuleFormInitialValues,
} from '@/pages/rules/components/RuleForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type LocationState = {
  rule?: RuleFormInitialValues & {
    id?: number;
  };
};

const RuleEditPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { mutate: updateRule, isPending: isUpdating } = useUpdateRuleMutation();
  const { mutate: deleteRule, isPending: isDeleting } = useDeleteRuleMutation();

  const isSubmitting = isUpdating || isDeleting;

  const rule = (location.state as LocationState | undefined)?.rule;

  if (!rule || typeof rule.id !== 'number') {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <p className="text-base font-medium">수정할 규칙 정보가 없어요.</p>
      </div>
    );
  }

  const ruleId = rule.id;

  const handleEdit = (values: CreateRuleRequest) => {
    updateRule(
      {
        ruleId,
        payload: values,
      },
      {
        onSuccess: () => {
          const title = values.title?.trim();

          toast(title ? `[${title}] 규칙이 수정되었어요.` : '규칙이 수정되었어요.');
          navigate('/rules');
        },
        onError: () => {
          toast('규칙 수정에 실패했어요. 다시 시도해주세요.');
        },
      }
    );
  };

  const handleDelete = () => {
    deleteRule(ruleId, {
      onSuccess: () => {
        const title = rule.title?.trim();

        toast(title ? `[${title}] 규칙이 삭제되었어요.` : '규칙이 삭제되었어요.');
        navigate('/rules');
      },
      onError: () => {
        toast('규칙 삭제에 실패했어요. 다시 시도해주세요.');
      },
    });
  };

  return (
    <RuleForm
      mode="edit"
      initialValues={rule}
      onSubmit={handleEdit}
      onDelete={handleDelete}
      isSubmitting={isSubmitting}
    />
  );
};

export default RuleEditPage;
