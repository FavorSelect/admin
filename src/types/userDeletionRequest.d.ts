export interface DeletionRequest {
  id: number;
  reason: string;
  status: string;
  uniqueAccountDeletedId: string;
  createdAt: string;
  updatedAt: string;
}

export interface DeletionRequestResponse {
  requests: DeletionRequest[];
}

export interface DeletionRequestResponseById {
  request: DeletionRequest;
}
