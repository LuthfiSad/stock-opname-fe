import { API_ENDPOINT } from "@core/configs/app";
import { HTTP_REQUEST } from "@core/libs/api/config";
import { ApiResponse } from "@core/libs/api/types";
import { AuthLoginDTO, AuthLoginModel } from "@core/model/auth";

export const authService = {
  login: HTTP_REQUEST.post<ApiResponse<AuthLoginModel>, AuthLoginDTO>(
    API_ENDPOINT.login
  ),
  check: HTTP_REQUEST.post<ApiResponse>(API_ENDPOINT.check),
};