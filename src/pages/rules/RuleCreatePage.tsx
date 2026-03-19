import RuleForm, {
  type RuleFormSubmitValues,
} from '@/pages/rules/components/RuleForm';

const RuleCreatePage = () => {
  const handleCreate = (values: RuleFormSubmitValues) => {
    console.log('규칙 등록:', values);
  };

  return <RuleForm onSubmit={handleCreate} />;
};

export default RuleCreatePage;
