import { ref } from 'vue';
import PageModal from '@/components/page-modal';

type CallbackFn = (item?: any) => void;

export function usePageModal(
  newCallback?: CallbackFn,
  editCallback?: CallbackFn
) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>();

  const defaultInfo = ref({});
  const handleAddClick = () => {
    defaultInfo.value = {};
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true;
    }

    newCallback && newCallback();
  };
  const handleEditClick = (item: any) => {
    defaultInfo.value = { ...item };
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true;
    }

    editCallback && editCallback(item);
  };

  return [pageModalRef, defaultInfo, handleAddClick, handleEditClick];
}
