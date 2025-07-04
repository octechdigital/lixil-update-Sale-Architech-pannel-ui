/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BaseResponse,
  DashboardCountResponse,
  GetAnyDataResponse,
  GetRejectReasonResponse,
  GetUserDataResponse,
  LoginResponse,
} from "../interface/api";

import {
  authorisedApiCall,
  defaultCatch,
  fetchHandler,
  responseHelper,
  unauthorisedApiCall,
} from "./utils";

class APIS {
// eslint-disable-next-line @typescript-eslint/no-unused-vars
  private showLoader = (loaderTitle?: string | undefined) => {};
  private hideLoader = (loaderTitle?: string | undefined) => {};
  private static instance: APIS | null = null;
  public instanceId = "TEST";

  constructor(instanceId: string) {
    this.instanceId = instanceId;
  }

  static getInstance() {
    return APIS.instance || (APIS.instance = new APIS("TEST NEW 1"));
  }

  initialize(
    showLoader: (loaderTitle?: string | undefined) => void,
    hideLoader: () => void
  ) {
    this.showLoader = showLoader;
    this.hideLoader = hideLoader;
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    return unauthorisedApiCall("/approval/login", { email, password })
      .then(fetchHandler)
      .then(responseHelper)
      .catch(defaultCatch)
      .finally();
  }

  async logout(): Promise<BaseResponse> {
    this.showLoader("Logout...");
    return authorisedApiCall("/admin/logout", {}, "GET")
      .then(fetchHandler)
      .then(responseHelper)
      .catch(defaultCatch)
      .finally(this.hideLoader);
  }

  async dashboardCount(): Promise<DashboardCountResponse> {
    return authorisedApiCall("/admin/getAppData", {}, "GET")
      .then(fetchHandler)
      .then(responseHelper)
      .catch(defaultCatch)
      .finally();
  }
// Search salers Details by Mobile Number
async searchSales(mobile: string): Promise<GetAnyDataResponse> {
  return authorisedApiCall("/approval/searchSales", { mobile })
    .then(fetchHandler)
    .then(responseHelper)
    .catch(defaultCatch);
}


 // Search Architects Details by Mobile Number
async searchArchitect(mobile: string): Promise<GetAnyDataResponse> {
  return authorisedApiCall("/approval/searchArchitect", { mobile })
    .then(fetchHandler)
    .then(responseHelper)
    .catch(defaultCatch);
}
 // update Architect 
async updateArchitect(data: {
  architectId: string;
  firstName: string;
  lastName: string;
  firmName: string;
  gender: string;
  mobile: string;
  email: string;
  address1: string;
  address2: string;
  landmark: string;
  city: string;
  state: string;
  region: string;
  pincode: string;
  spocName: string;
  spocMobile: string;
  spocManagerName: string;
  spocManagerMobile: string;
  regionalManagerMobile: string;
}): Promise<any> {
  return authorisedApiCall("/approval/updateArchitect", data)
    .then(fetchHandler)
    .then(responseHelper)
    .catch(defaultCatch);
}


  async getPendingData(): Promise<GetAnyDataResponse> {
    return authorisedApiCall("/admin/getPendingUsers", {}, "GET")
      .then(fetchHandler)
      .then(responseHelper)
      .catch(defaultCatch)
      .finally();
  }
  async getApproveData(): Promise<GetAnyDataResponse> {
    return authorisedApiCall("/admin/getApprovedUsers", {}, "GET")
      .then(fetchHandler)
      .then(responseHelper)
      .catch(defaultCatch)
      .finally();
  }
  async getRejectedData(): Promise<GetAnyDataResponse> {
    return authorisedApiCall("/admin/getRejectedUsers", {}, "GET")
      .then(fetchHandler)
      .then(responseHelper)
      .catch(defaultCatch)
      .finally();
  }

  async getUserData(userId: string): Promise<GetUserDataResponse> {
    return authorisedApiCall(`/admin/getUserInfo/${userId}`, {}, "GET")
      .then(fetchHandler)
      .then(responseHelper)
      .catch(defaultCatch)
      .finally();
  }

  async getRejectReasonData(): Promise<GetRejectReasonResponse> {
    return authorisedApiCall("/admin/rejectReason", {}, "GET")
      .then(fetchHandler)
      .then(responseHelper)
      .catch(defaultCatch)
      .finally();
  }
  async getApproveReasonData(): Promise<GetRejectReasonResponse> {
    return authorisedApiCall("/admin/approveReason", {}, "GET")
      .then(fetchHandler)
      .then(responseHelper)
      .catch(defaultCatch)
      .finally();
  }

  async userAction(
    endpoint: "review" | "reject" | "approve",
    userId: number,
    payload: Record<string, any> = {}
  ): Promise<BaseResponse> {
    const finalPayload = {
      userId,
      ...payload,
    };

    return authorisedApiCall(`/admin/${endpoint}`, finalPayload)
      .then(fetchHandler)
      .then(responseHelper)
      .catch(defaultCatch)
      .finally();
  }
}
const API = APIS.getInstance();

export default API;
