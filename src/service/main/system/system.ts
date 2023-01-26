import myRequest from '@/service';
import type { IDataType } from '@/service/types';

export function getPageListData(url: string, queryInfo: any) {
  return myRequest.post<IDataType>({
    url: url,
    data: queryInfo
  });
}

// url /users/id
export function deletePageData(url: string) {
  return myRequest.delete<IDataType>({
    url: url
  });
}

export function createPageData(url: string, newData: any) {
  return myRequest.post<IDataType>({
    url,
    data: newData
  });
}
export function editPageData(url: string, editData: any) {
  return myRequest.patch<IDataType>({
    url,
    data: editData
  });
}
