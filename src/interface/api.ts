/* eslint-disable @typescript-eslint/no-explicit-any */

// ===== Base Types =====
export interface BaseResponse {
  status: number;
  message: string;
}

// More specific generic record type without JSX.Element (separate UI concerns)
export interface GenericRecord {
  [key: string]: string | number | boolean | null | undefined;
}

// For UI-specific data with render functions
export interface UIGenericRecord extends GenericRecord {
  [key: string]: string | number | boolean | null | undefined | ((props: any) => JSX.Element);
}

// ===== Authentication =====
export interface LoginResponse extends BaseResponse {
  data: {
    token: string;
    refreshToken?: string;
    expiresIn?: number;
    user?: {
      id: string | number;
      email: string;
      name?: string;
      role?: string;
    };
  };
}

// ===== Dashboard =====
export interface DashboardCountItem {
  id: string | number;
  title: string;
  count: number;
  icon?: string;
  color?: string;
  trend?: number; // percentage change
  [key: string]: any; // for additional dynamic properties
}

export interface DashboardCountResponse extends BaseResponse {
  data: DashboardCountItem[];
  title: string;
}

// ===== Generic Data Responses =====
export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResponse<T = GenericRecord> extends BaseResponse {
  data: {
    data: T[];
    pagination: PaginationMeta;
  };
}

export interface GetAnyDataResponse extends BaseResponse {
  data: {
    data: GenericRecord[];
    total?: number;
    page?: number;
    limit?: number;
  };
}

// ===== User Data =====
export interface UserData {
  id: string | number;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  role?: string;
  status?: 'active' | 'inactive' | 'pending';
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any; // for additional dynamic properties
}

export interface GetUserDataResponse extends BaseResponse {
  data: UserData;
}

export interface GetUsersListResponse extends BaseResponse {
  data: {
    users: UserData[];
    total: number;
    page?: number;
    limit?: number;
  };
}

// ===== Reject Reasons =====
export interface RejectReason {
  id: string | number;
  reason: string;
  category?: string;
  isActive?: boolean;
  createdAt?: string;
  [key: string]: any;
}

export interface GetRejectReasonResponse extends BaseResponse {
  data: RejectReason[];
}

// ===== Campaign Related =====
export interface CampaignData {
  id?: string | number;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  status?: 'draft' | 'active' | 'paused' | 'completed';
  targetAudience?: string[];
  budget?: number;
  createdBy?: string | number;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

export interface CreateCampaignData {
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  targetAudience?: string[];
  budget?: number;
  // Add other required fields for campaign creation
}

export interface CreateCampaignResponse extends BaseResponse {
  data: {
    campaignId: string | number;
    campaign: CampaignData;
  };
}

export interface GetCampaignsResponse extends BaseResponse {
  data: {
    campaigns: CampaignData[];
    total: number;
    page?: number;
    limit?: number;
  };
}

// ===== Architect Related (based on your previous component) =====
export interface ArchitectData {
  id?: string | number;
  firstName: string;
  lastName: string;
  firmName: string;
  gender: 'M' | 'F' | 'O';
  contactNumber: string;
  email: string;
  address1: string;
  address2?: string;
  landmark?: string;
  city: string;
  state: string;
  region?: string;
  pincode: string;
  spocName?: string;
  spocMobile?: string;
  spocManagerName?: string;
  spocManagerMobile?: string;
  regionalManagerMobile?: string;
  status?: 'active' | 'inactive';
  createdAt?: string;
  updatedAt?: string;
}

export interface SearchArchitectResponse extends BaseResponse {
  data: ArchitectData | null;
}

export interface UpdateArchitectResponse extends BaseResponse {
  data: {
    updated: boolean;
    architect: ArchitectData;
  };
}

// ===== Error Handling =====
export interface ApiError {
  status: number;
  message: string;
  errors?: {
    field: string;
    message: string;
  }[];
  timestamp?: string;
  path?: string;
}

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

export interface ErrorResponse extends BaseResponse {
  errors?: ValidationError[];
  timestamp?: string;
  path?: string;
}

// ===== Utility Types =====
export type ApiResponse<T = any> = BaseResponse & {
  data?: T;
};

export type AsyncApiResponse<T = any> = Promise<ApiResponse<T>>;

// Generic search/filter parameters
export interface SearchParams {
  query?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, any>;
}

// Generic API request options
export interface ApiRequestOptions {
  timeout?: number;
  headers?: Record<string, string>;
  params?: SearchParams;
  retries?: number;
}

// ===== Type Guards =====
export const isBaseResponse = (obj: any): obj is BaseResponse => {
  return typeof obj === 'object' && 
         typeof obj.status === 'number' && 
         typeof obj.message === 'string';
};

export const isErrorResponse = (obj: any): obj is ErrorResponse => {
  return isBaseResponse(obj) && obj.status >= 400;
};

export const isSuccessResponse = (obj: any): obj is BaseResponse => {
  return isBaseResponse(obj) && obj.status >= 200 && obj.status < 300;
};
