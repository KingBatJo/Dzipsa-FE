import RuleForm, {
  type RuleFormInitialValues,
  type RuleFormSubmitValues,
} from '@/pages/rules/components/RuleForm';
import { useLocation, useNavigate } from 'react-router-dom';

type LocationState = {
  rule?: RuleFormInitialValues & {
    id?: number;
  };
};

const RuleEditPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const rule = (location.state as LocationState | undefined)?.rule;

  if (!rule) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <p className="text-base font-medium">수정할 규칙 정보가 없어요.</p>
      </div>
    );
  }

  const handleEdit = (values: RuleFormSubmitValues) => {
    console.log('규칙 수정:', rule.id, values);
    navigate(-1);
  };

  const handleDelete = () => {
    console.log('규칙 삭제:', rule.id);
    navigate(-1);
  };

  return (
    <RuleForm
      mode="edit"
      initialValues={rule}
      onSubmit={handleEdit}
      onDelete={handleDelete}
    />
  );
};

export default RuleEditPage;
