import { AddBlueprintAppDTO, AddBlueprintAssertionRuleDTO, AddBlueprintCorrelationRuleDTO, AddBlueprintFileRuleDTO, AddBlueprintParameterRuleDTO, AddBlueprintRunConfigurationDTO, AddBlueprintUserDTO, Application, AssertionRule, Blueprint, CorrelationRule, CreateApplicationDTO, CreateBlueprintDTO, CreateEnvironmentDTO, CreateNamespaceDTO, Environment, FileRule, Namespace, ParameterRule, Permissions, RunConfiguration, UpdateApplicationDTO, UpdateBlueprintAssertionRuleDTO, UpdateBlueprintCorrelationRuleDTO, UpdateBlueprintDTO, UpdateBlueprintFileRuleDTO, UpdateBlueprintParameterRuleDTO, UpdateBlueprintPermissionsDTO, UpdateBlueprintRunConfigurationDTO, UpdateBlueprintUserDTO, UpdateEnvironmentDTO, UpdateNamespaceDTO, UserPermissions } from "@testament/core-service";
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { resolve } from "url";
import { createAxiosInstance, getHttpResponse } from "./http/axios";
import { HttpResponse, StatusError } from "./http/http";
import { Page } from "./page";

export interface ClientOptions {
    baseUrl: string;
    axios?: AxiosInstance;
    userAgent?: string;
}

export interface ClientRequestOptions {
    headers?: { [key: string]: string }; 
    params?: { [key: string]: string }; 
}

export function createClient(options: ClientOptions) {
    return new TestamentClient(options);
}

export class TestamentClient {

    private axios: AxiosInstance;
    private baseUrl: string;
    private userAgent: string;

    constructor(options: ClientOptions) {
        this.baseUrl = options.baseUrl;
        this.userAgent = options.userAgent;
        this.axios = options.axios || createAxiosInstance();
        this.axios.interceptors.response.use(response => response, error => {
            if(error.response) { 
                throw new StatusError(getHttpResponse(error.response));
            } else {
                throw error;
            }
        });
    }

    async createNamespace(dto: CreateNamespaceDTO, options: ClientRequestOptions = {}): Promise<HttpResponse<Namespace>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<Namespace> = await this.axios.post(resolve(this.baseUrl, `/api/namespaces`), dto, config);
        return getHttpResponse(response, { reviveDates: true });
    }

    async getAllNamespaces(options: ClientRequestOptions = {}): Promise<HttpResponse<Page<Namespace>>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<Page<Namespace>> = await this.axios.get(resolve(this.baseUrl, `/api/namespaces`), config);
        return getHttpResponse(response, { reviveDates: true });
    }

    async getNamespace(namespaceId: string, options: ClientRequestOptions = {}): Promise<HttpResponse<Namespace>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<Namespace> = await this.axios.get(resolve(this.baseUrl, `/api/namespaces/${namespaceId}`), config);
        return getHttpResponse(response, { reviveDates: true });
    }

    async getNamespacesForMember(memberId: string, options: ClientRequestOptions = {}): Promise<HttpResponse<string[]>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<string[]> = await this.axios.get(resolve(this.baseUrl, `/api/users/${memberId}/namespaces`), config);
        return getHttpResponse(response, { reviveDates: true });
    }

    async updateNamespace(namespaceId: string, dto: UpdateNamespaceDTO, options: ClientRequestOptions = {}): Promise<HttpResponse<Namespace>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        config.data = dto;
        const response: AxiosResponse<Namespace> = await this.axios.put(resolve(this.baseUrl, `/api/namespaces/${namespaceId}`), config);
        return getHttpResponse(response, { reviveDates: true });
    }

    async deleteNamespace(namespaceId: string, options: ClientRequestOptions = {}): Promise<HttpResponse<Namespace>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<Namespace> = await this.axios.delete(resolve(this.baseUrl, `/api/namespaces/${namespaceId}`), config);
        return getHttpResponse(response, { reviveDates: true });
    }

    async createApp(dto: CreateApplicationDTO, options: ClientRequestOptions = {}): Promise<HttpResponse<Application>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<Application> = await this.axios.post(resolve(this.baseUrl, `/api/apps`), dto, config);
        return getHttpResponse(response, { reviveDates: true });
    }

    async getAllApps(options: ClientRequestOptions = {}): Promise<HttpResponse<Page<Application>>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<Page<Application>> = await this.axios.get(resolve(this.baseUrl, `/api/apps`), config);
        return getHttpResponse(response, { reviveDates: true });
    }

    async getApp(applicationId: string, options: ClientRequestOptions = {}): Promise<HttpResponse<Application>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<Application> = await this.axios.get(resolve(this.baseUrl, `/api/apps/${applicationId}`), config);
        return getHttpResponse(response, { reviveDates: true });
    }

    async updateApp(applicationId: string, dto: UpdateApplicationDTO, options: ClientRequestOptions = {}): Promise<HttpResponse<Application>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        config.data = dto;
        const response: AxiosResponse<Application> = await this.axios.put(resolve(this.baseUrl, `/api/apps/${applicationId}`), config);
        return getHttpResponse(response, { reviveDates: true });
    }

    async deleteApp(applicationId: string, options: ClientRequestOptions = {}): Promise<HttpResponse<Application>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<Application> = await this.axios.delete(resolve(this.baseUrl, `/api/apps/${applicationId}`), config);
        return getHttpResponse(response, { reviveDates: true });
    }

    async createEnvironment(dto: CreateEnvironmentDTO, options: ClientRequestOptions = {}): Promise<HttpResponse<Environment>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<Environment> = await this.axios.post(resolve(this.baseUrl, `/api/environments`), dto, config);
        return getHttpResponse(response, { reviveDates: true });
    }

    async getAllEnvironments(options: ClientRequestOptions = {}): Promise<HttpResponse<Page<Environment>>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<Page<Environment>> = await this.axios.get(resolve(this.baseUrl, `/api/environments`), config);
        return getHttpResponse(response, { reviveDates: true });
    }

    async getEnvironment(environmentId: string, options: ClientRequestOptions = {}): Promise<HttpResponse<Environment>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<Environment> = await this.axios.get(resolve(this.baseUrl, `/api/environments/${environmentId}`), config);
        return getHttpResponse(response, { reviveDates: true });
    }

    async updateEnvironment(environmentId: string, dto: UpdateEnvironmentDTO, options: ClientRequestOptions = {}): Promise<HttpResponse<Environment>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        config.data = dto;
        const response: AxiosResponse<Environment> = await this.axios.put(resolve(this.baseUrl, `/api/environments/${environmentId}`), config);
        return getHttpResponse(response, { reviveDates: true });
    }

    async deleteEnvironment(environmentId: string, options: ClientRequestOptions = {}): Promise<HttpResponse<Environment>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<Environment> = await this.axios.delete(resolve(this.baseUrl, `/api/environments/${environmentId}`), config);
        return getHttpResponse(response, { reviveDates: true });
    }

    async createBlueprint(dto: CreateBlueprintDTO, options: ClientRequestOptions = {}): Promise<HttpResponse<Blueprint>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<Blueprint> = await this.axios.post(resolve(this.baseUrl, `/api/blueprints`), dto, config);
        return getHttpResponse(response, { reviveDates: true });
    }

    async getAllBlueprints(options: ClientRequestOptions = {}): Promise<HttpResponse<Page<Blueprint>>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<Page<Blueprint>> = await this.axios.get(resolve(this.baseUrl, `/api/blueprints`), config);
        return getHttpResponse(response, { reviveDates: true });
    }

    async getBlueprint(blueprintId: string, options: ClientRequestOptions = {}): Promise<HttpResponse<Blueprint>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<Blueprint> = await this.axios.get(resolve(this.baseUrl, `/api/blueprints/${blueprintId}`), config);
        return getHttpResponse(response, { reviveDates: true });
    }

    async updateBlueprint(blueprintId: string, dto: UpdateBlueprintDTO, options: ClientRequestOptions = {}): Promise<HttpResponse<Blueprint>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        config.data = dto;
        const response: AxiosResponse<Blueprint> = await this.axios.patch(resolve(this.baseUrl, `/api/blueprints/${blueprintId}`), config);
        return getHttpResponse(response, { reviveDates: true });
    }

    async deleteBlueprint(blueprintId: string, options: ClientRequestOptions = {}): Promise<HttpResponse<Blueprint>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<Blueprint> = await this.axios.delete(resolve(this.baseUrl, `/api/blueprints/${blueprintId}`), config);
        return getHttpResponse(response, { reviveDates: true });
    }

    async addBlueprintApp(blueprintId: string, dto: AddBlueprintAppDTO, options: ClientRequestOptions = {}): Promise<HttpResponse<string[]>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<string[]> = await this.axios.post(resolve(this.baseUrl, `/api/blueprints/${blueprintId}/apps`), dto, config);
        return getHttpResponse(response, { reviveDates: true });
    }

    async removeBlueprintApp(blueprintId: string, appId: string, options: ClientRequestOptions = {}): Promise<HttpResponse<string[]>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<string[]> = await this.axios.delete(resolve(this.baseUrl, `/api/blueprints/${blueprintId}/apps/${appId}`), config);
        return getHttpResponse(response, { reviveDates: true });
    }

    async addBlueprintAssertion(blueprintId: string, dto: AddBlueprintAssertionRuleDTO, options: ClientRequestOptions = {}): Promise<HttpResponse<AssertionRule>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<AssertionRule> = await this.axios.post(resolve(this.baseUrl, `/api/blueprints/${blueprintId}/assertions`), dto, config);
        return getHttpResponse(response, { reviveDates: true });
    }

    async updateBlueprintAssertion(blueprintId: string, assertionId: string, dto: UpdateBlueprintAssertionRuleDTO, options: ClientRequestOptions = {}): Promise<HttpResponse<AssertionRule>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<AssertionRule> = await this.axios.patch(resolve(this.baseUrl, `/api/blueprints/${blueprintId}/assertions/${assertionId}`), dto, config);
        return getHttpResponse(response, { reviveDates: true });
    }

    async removeBlueprintAssertion(blueprintId: string, assertionId: string, options: ClientRequestOptions = {}): Promise<HttpResponse<AssertionRule>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<AssertionRule> = await this.axios.delete(resolve(this.baseUrl, `/api/blueprints/${blueprintId}/assertions/${assertionId}`), config);
        return getHttpResponse(response, { reviveDates: true });
    }

    async addBlueprintParameter(blueprintId: string, dto: AddBlueprintParameterRuleDTO, options: ClientRequestOptions = {}): Promise<HttpResponse<ParameterRule>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<ParameterRule> = await this.axios.post(resolve(this.baseUrl, `/api/blueprints/${blueprintId}/parameters`), dto, config);
        return getHttpResponse(response, { reviveDates: true });
    }

    async updateBlueprintParameter(blueprintId: string, parameterId: string, dto: UpdateBlueprintParameterRuleDTO, options: ClientRequestOptions = {}): Promise<HttpResponse<ParameterRule>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<ParameterRule> = await this.axios.patch(resolve(this.baseUrl, `/api/blueprints/${blueprintId}/parameters/${parameterId}`), dto, config);
        return getHttpResponse(response, { reviveDates: true });
    }

    async removeBlueprintParameter(blueprintId: string, parameterId: string, options: ClientRequestOptions = {}): Promise<HttpResponse<ParameterRule>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<ParameterRule> = await this.axios.delete(resolve(this.baseUrl, `/api/blueprints/${blueprintId}/parameters/${parameterId}`), config);
        return getHttpResponse(response, { reviveDates: true });
    }

    async addBlueprintCorrelation(blueprintId: string, dto: AddBlueprintCorrelationRuleDTO, options: ClientRequestOptions = {}): Promise<HttpResponse<CorrelationRule>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<CorrelationRule> = await this.axios.post(resolve(this.baseUrl, `/api/blueprints/${blueprintId}/correlations`), dto, config);
        return getHttpResponse(response, { reviveDates: true });
    }

    async updateBlueprintCorrelation(blueprintId: string, correlationId: string, dto: UpdateBlueprintCorrelationRuleDTO, options: ClientRequestOptions = {}): Promise<HttpResponse<CorrelationRule>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<CorrelationRule> = await this.axios.patch(resolve(this.baseUrl, `/api/blueprints/${blueprintId}/correlations/${correlationId}`), dto, config);
        return getHttpResponse(response, { reviveDates: true });
    }

    async removeBlueprintCorrelation(blueprintId: string, correlationId: string, options: ClientRequestOptions = {}): Promise<HttpResponse<CorrelationRule>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<CorrelationRule> = await this.axios.delete(resolve(this.baseUrl, `/api/blueprints/${blueprintId}/correlations/${correlationId}`), config);
        return getHttpResponse(response, { reviveDates: true });
    }

    async addBlueprintFile(blueprintId: string, dto: AddBlueprintFileRuleDTO, options: ClientRequestOptions = {}): Promise<HttpResponse<FileRule>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<FileRule> = await this.axios.post(resolve(this.baseUrl, `/api/blueprints/${blueprintId}/files`), dto, config);
        return getHttpResponse(response, { reviveDates: true });
    }

    async updateBlueprintFile(blueprintId: string, fileId: string, dto: UpdateBlueprintFileRuleDTO, options: ClientRequestOptions = {}): Promise<HttpResponse<FileRule>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<FileRule> = await this.axios.patch(resolve(this.baseUrl, `/api/blueprints/${blueprintId}/files/${fileId}`), dto, config);
        return getHttpResponse(response, { reviveDates: true });
    }

    async removeBlueprintFile(blueprintId: string, fileId: string, options: ClientRequestOptions = {}): Promise<HttpResponse<FileRule>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<FileRule> = await this.axios.delete(resolve(this.baseUrl, `/api/blueprints/${blueprintId}/files/${fileId}`), config);
        return getHttpResponse(response, { reviveDates: true });
    }

    async addBlueprintRunConfiguration(blueprintId: string, dto: AddBlueprintRunConfigurationDTO, options: ClientRequestOptions = {}): Promise<HttpResponse<RunConfiguration>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<RunConfiguration> = await this.axios.post(resolve(this.baseUrl, `/api/blueprints/${blueprintId}/run-configurations`), dto, config);
        return getHttpResponse(response, { reviveDates: true });
    }

    async updateBlueprintRunConfiguration(blueprintId: string, runConfigurationId: string, dto: UpdateBlueprintRunConfigurationDTO, options: ClientRequestOptions = {}): Promise<HttpResponse<RunConfiguration>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<RunConfiguration> = await this.axios.patch(resolve(this.baseUrl, `/api/blueprints/${blueprintId}/run-configurations/${runConfigurationId}`), dto, config);
        return getHttpResponse(response, { reviveDates: true });
    }

    async removeBlueprintRunConfiguration(blueprintId: string, runConfigurationId: string, options: ClientRequestOptions = {}): Promise<HttpResponse<RunConfiguration>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<RunConfiguration> = await this.axios.delete(resolve(this.baseUrl, `/api/blueprints/${blueprintId}/run-configurations/${runConfigurationId}`), config);
        return getHttpResponse(response, { reviveDates: true });
    }

    async updateBlueprintPermissions(blueprintId: string, dto: UpdateBlueprintPermissionsDTO, options: ClientRequestOptions = {}): Promise<HttpResponse<Permissions>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<Permissions> = await this.axios.patch(resolve(this.baseUrl, `/api/blueprints/${blueprintId}/permissions`), dto, config);
        return getHttpResponse(response, { reviveDates: true });
    }

    async addBlueprintUserPermissions(blueprintId: string, dto: AddBlueprintUserDTO, options: ClientRequestOptions = {}): Promise<HttpResponse<UserPermissions>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<UserPermissions> = await this.axios.post(resolve(this.baseUrl, `/api/blueprints/${blueprintId}/permissions/users`), dto, config);
        return getHttpResponse(response, { reviveDates: true });
    }

    async updateBlueprintUserPermissions(blueprintId: string, userId: string, dto: UpdateBlueprintUserDTO, options: ClientRequestOptions = {}): Promise<HttpResponse<UserPermissions>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<UserPermissions> = await this.axios.patch(resolve(this.baseUrl, `/api/blueprints/${blueprintId}/permissions/users/${userId}`), dto, config);
        return getHttpResponse(response, { reviveDates: true });
    }

    async removeBlueprintUserPermissions(blueprintId: string, userId: string, options: ClientRequestOptions = {}): Promise<HttpResponse<UserPermissions>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<UserPermissions> = await this.axios.delete(resolve(this.baseUrl, `/api/blueprints/${blueprintId}/permissions/users/${userId}`), config);
        return getHttpResponse(response, { reviveDates: true });
    }

    private getAxiosRequestConfig(requestOptions: ClientRequestOptions = {}): AxiosRequestConfig {
        return {
            headers: requestOptions.headers || {},
            params: requestOptions.params || {},
            httpAgent: this.userAgent,
            httpsAgent: this.userAgent
        }
    }

}