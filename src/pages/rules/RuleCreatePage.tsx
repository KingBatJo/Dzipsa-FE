import FormPageLayout from '@/components/form/FormPageLayout';

const RuleCreatePage = () => {
  return (
    <FormPageLayout
      title="규칙 등록"
      onSubmit={() => {
        console.log('완료');
      }}
    >
      규칙 등록 페이지
    </FormPageLayout>
  );
};

export default RuleCreatePage;
