import { AddBlueprintAppDTO, AddBlueprintAssertionRuleDTO, AddBlueprintCorrelationRuleDTO, AddBlueprintFileRuleDTO, AddBlueprintParameterRuleDTO, AddBlueprintRunConfigurationDTO, AddBlueprintUserDTO, Application, AssertionRule, Blueprint, CorrelationRule, CreateApplicationDTO, CreateBlueprintDTO, CreateEnvironmentDTO, CreateNamespaceDTO, Environment, FileRule, Namespace, ParameterRule, Permissions, RunConfiguration, UpdateApplicationDTO, UpdateBlueprintAssertionRuleDTO, UpdateBlueprintCorrelationRuleDTO, UpdateBlueprintDTO, UpdateBlueprintFileRuleDTO, UpdateBlueprintParameterRuleDTO, UpdateBlueprintPermissionsDTO, UpdateBlueprintRunConfigurationDTO, UpdateBlueprintUserDTO, UpdateEnvironmentDTO, UpdateNamespaceDTO, UserPermissions } from "@testament/core-service";
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { resolve } from "url";
import { createAxiosInstance, getHttpResponse } from "./axios";
import { HttpResponse, StatusError } from "./http";
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
    return new TestamentClient(options.axios || createAxiosInstance(), options);
}

export class TestamentClient {

    private baseUrl: string;
    private userAgent: string;

    constructor(private axios: AxiosInstance, options: ClientOptions) {
        this.baseUrl = options.baseUrl;
        this.userAgent = options.userAgent;
        this.axios.interceptors.response.use(response => response, error => {
            if(error.response) { 
                return new StatusError(error.message, error.response);
            } else {
                return error;
            }
        });
    }

    async createNamespace(dto: CreateNamespaceDTO, options: ClientRequestOptions = {}): Promise<HttpResponse<Namespace>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        config.data = dto;
        const response: AxiosResponse<Namespace> = await this.axios.post(resolve(this.baseUrl, `/api/namespaces`), config);
        return getHttpResponse(response);
    }

    async getAllNamespaces(options: ClientRequestOptions = {}): Promise<HttpResponse<Page<Namespace>>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<Page<Namespace>> = await this.axios.get(resolve(this.baseUrl, `/api/namespaces`), config);
        return getHttpResponse(response);
    }

    async getNamespace(namespaceId: string, options: ClientRequestOptions = {}): Promise<HttpResponse<Namespace>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<Namespace> = await this.axios.get(resolve(this.baseUrl, `/api/namespaces/${namespaceId}`), config);
        return getHttpResponse(response);
    }

    async getNamespacesForMember(memberId: string, options: ClientRequestOptions = {}): Promise<HttpResponse<string[]>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<string[]> = await this.axios.get(resolve(this.baseUrl, `/api/users/${memberId}/namespaces`), config);
        return getHttpResponse(response);
    }

    // TODO: use PATCH
    async updateNamespace(dto: UpdateNamespaceDTO, options: ClientRequestOptions = {}): Promise<HttpResponse<Namespace>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        config.data = dto;
        const response: AxiosResponse<Namespace> = await this.axios.put(resolve(this.baseUrl, `/api/namespaces`), config);
        return getHttpResponse(response);
    }

    async deleteNamespace(namespaceId: string, options: ClientRequestOptions = {}): Promise<HttpResponse<Namespace>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<Namespace> = await this.axios.delete(resolve(this.baseUrl, `/api/namespaces/${namespaceId}`), config);
        return getHttpResponse(response);
    }

    async createApp(dto: CreateApplicationDTO, options: ClientRequestOptions = {}): Promise<HttpResponse<Application>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        config.data = dto;
        const response: AxiosResponse<Application> = await this.axios.post(resolve(this.baseUrl, `/api/applications`), config);
        return getHttpResponse(response);
    }

    async getAllApps(options: ClientRequestOptions = {}): Promise<HttpResponse<Page<Application>>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<Page<Application>> = await this.axios.get(resolve(this.baseUrl, `/api/applications`), config);
        return getHttpResponse(response);
    }

    async getApp(applicationId: string, options: ClientRequestOptions = {}): Promise<HttpResponse<Application>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<Application> = await this.axios.get(resolve(this.baseUrl, `/api/applications/${applicationId}`), config);
        return getHttpResponse(response);
    }

    // TODO: use PATCH
    async updateApp(dto: UpdateApplicationDTO, options: ClientRequestOptions = {}): Promise<HttpResponse<Application>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        config.data = dto;
        const response: AxiosResponse<Application> = await this.axios.put(resolve(this.baseUrl, `/api/applications`), config);
        return getHttpResponse(response);
    }

    async deleteApp(applicationId: string, options: ClientRequestOptions = {}): Promise<HttpResponse<Application>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<Application> = await this.axios.delete(resolve(this.baseUrl, `/api/applications/${applicationId}`), config);
        return getHttpResponse(response);
    }

    async createEnvironment(dto: CreateEnvironmentDTO, options: ClientRequestOptions = {}): Promise<HttpResponse<Environment>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        config.data = dto;
        const response: AxiosResponse<Environment> = await this.axios.post(resolve(this.baseUrl, `/api/environments`), config);
        return getHttpResponse(response);
    }

    async getAllEnvironments(options: ClientRequestOptions = {}): Promise<HttpResponse<Page<Environment>>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<Page<Environment>> = await this.axios.get(resolve(this.baseUrl, `/api/environments`), config);
        return getHttpResponse(response);
    }

    async getEnvironment(environmentId: string, options: ClientRequestOptions = {}): Promise<HttpResponse<Environment>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<Environment> = await this.axios.get(resolve(this.baseUrl, `/api/environments/${environmentId}`), config);
        return getHttpResponse(response);
    }

    // TODO: use PATCH
    async updateEnvironment(dto: UpdateEnvironmentDTO, options: ClientRequestOptions = {}): Promise<HttpResponse<Environment>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        config.data = dto;
        const response: AxiosResponse<Environment> = await this.axios.put(resolve(this.baseUrl, `/api/environments`), config);
        return getHttpResponse(response);
    }

    async deleteEnvironment(environmentId: string, options: ClientRequestOptions = {}): Promise<HttpResponse<Environment>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<Environment> = await this.axios.delete(resolve(this.baseUrl, `/api/environments/${environmentId}`), config);
        return getHttpResponse(response);
    }

    async createBlueprint(dto: CreateBlueprintDTO, options: ClientRequestOptions = {}): Promise<HttpResponse<Blueprint>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        config.data = dto;
        const response: AxiosResponse<Blueprint> = await this.axios.post(resolve(this.baseUrl, `/api/blueprints`), config);
        return getHttpResponse(response);
    }

    async getAllBlueprints(options: ClientRequestOptions = {}): Promise<HttpResponse<Page<Blueprint>>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<Page<Blueprint>> = await this.axios.get(resolve(this.baseUrl, `/api/blueprints`), config);
        return getHttpResponse(response);
    }

    async getBlueprint(blueprintId: string, options: ClientRequestOptions = {}): Promise<HttpResponse<Blueprint>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<Blueprint> = await this.axios.get(resolve(this.baseUrl, `/api/blueprints/${blueprintId}`), config);
        return getHttpResponse(response);
    }

    async updateBlueprint(dto: UpdateBlueprintDTO, options: ClientRequestOptions = {}): Promise<HttpResponse<Blueprint>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        config.data = dto;
        const response: AxiosResponse<Blueprint> = await this.axios.patch(resolve(this.baseUrl, `/api/blueprints`), config);
        return getHttpResponse(response);
    }

    async deleteBlueprint(blueprintId: string, options: ClientRequestOptions = {}): Promise<HttpResponse<Blueprint>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<Blueprint> = await this.axios.delete(resolve(this.baseUrl, `/api/blueprints/${blueprintId}`), config);
        return getHttpResponse(response);
    }

    // TODO: change blueprint app APIs to return App DTO in core service
    async addBlueprintApp(blueprintId: string, dto: AddBlueprintAppDTO, options: ClientRequestOptions = {}): Promise<HttpResponse<Blueprint>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        config.data = dto;
        const response: AxiosResponse<Blueprint> = await this.axios.post(resolve(this.baseUrl, `/api/blueprints/${blueprintId}/apps`), config);
        return getHttpResponse(response);
    }

    async removeBlueprintApp(blueprintId: string, appId: string, options: ClientRequestOptions = {}): Promise<HttpResponse<Blueprint>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<Blueprint> = await this.axios.delete(resolve(this.baseUrl, `/api/blueprints/${blueprintId}/apps/${appId}`), config);
        return getHttpResponse(response);
    }

    async addBlueprintParameter(blueprintId: string, dto: AddBlueprintParameterRuleDTO, options: ClientRequestOptions = {}): Promise<HttpResponse<ParameterRule>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        config.data = dto;
        const response: AxiosResponse<ParameterRule> = await this.axios.post(resolve(this.baseUrl, `/api/blueprints/${blueprintId}/parameters`), config);
        return getHttpResponse(response);
    }

    async updateBlueprintParameter(blueprintId: string, parameterId: string, dto: UpdateBlueprintParameterRuleDTO, options: ClientRequestOptions = {}): Promise<HttpResponse<ParameterRule>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        config.data = dto;
        const response: AxiosResponse<ParameterRule> = await this.axios.patch(resolve(this.baseUrl, `/api/blueprints/${blueprintId}/parameters/${parameterId}`), config);
        return getHttpResponse(response);
    }

    async removeBlueprintParameter(blueprintId: string, parameterId: string, options: ClientRequestOptions = {}): Promise<HttpResponse<ParameterRule>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<ParameterRule> = await this.axios.delete(resolve(this.baseUrl, `/api/blueprints/${blueprintId}/parameters/${parameterId}`), config);
        return getHttpResponse(response);
    }

    async addBlueprintAssertion(blueprintId: string, dto: AddBlueprintAssertionRuleDTO, options: ClientRequestOptions = {}): Promise<HttpResponse<AssertionRule>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        config.data = dto;
        const response: AxiosResponse<AssertionRule> = await this.axios.post(resolve(this.baseUrl, `/api/blueprints/${blueprintId}/assertions`), config);
        return getHttpResponse(response);
    }

    async updateBlueprintAssertion(blueprintId: string, assertionId: string, dto: UpdateBlueprintAssertionRuleDTO, options: ClientRequestOptions = {}): Promise<HttpResponse<AssertionRule>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        config.data = dto;
        const response: AxiosResponse<AssertionRule> = await this.axios.patch(resolve(this.baseUrl, `/api/blueprints/${blueprintId}/assertions/${assertionId}`), config);
        return getHttpResponse(response);
    }

    async removeBlueprintAssertion(blueprintId: string, assertionId: string, options: ClientRequestOptions = {}): Promise<HttpResponse<AssertionRule>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<AssertionRule> = await this.axios.delete(resolve(this.baseUrl, `/api/blueprints/${blueprintId}/assertions/${assertionId}`), config);
        return getHttpResponse(response);
    }

    async addBlueprintCorrelation(blueprintId: string, dto: AddBlueprintCorrelationRuleDTO, options: ClientRequestOptions = {}): Promise<HttpResponse<CorrelationRule>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        config.data = dto;
        const response: AxiosResponse<CorrelationRule> = await this.axios.post(resolve(this.baseUrl, `/api/blueprints/${blueprintId}/correlations`), config);
        return getHttpResponse(response);
    }

    async updateBlueprintCorrelation(blueprintId: string, correlationId: string, dto: UpdateBlueprintCorrelationRuleDTO, options: ClientRequestOptions = {}): Promise<HttpResponse<CorrelationRule>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        config.data = dto;
        const response: AxiosResponse<CorrelationRule> = await this.axios.patch(resolve(this.baseUrl, `/api/blueprints/${blueprintId}/correlations/${correlationId}`), config);
        return getHttpResponse(response);
    }

    async removeBlueprintCorrelation(blueprintId: string, correlationId: string, options: ClientRequestOptions = {}): Promise<HttpResponse<CorrelationRule>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<CorrelationRule> = await this.axios.delete(resolve(this.baseUrl, `/api/blueprints/${blueprintId}/correlations/${correlationId}`), config);
        return getHttpResponse(response);
    }

    async addBlueprintFile(blueprintId: string, dto: AddBlueprintFileRuleDTO, options: ClientRequestOptions = {}): Promise<HttpResponse<FileRule>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        config.data = dto;
        const response: AxiosResponse<FileRule> = await this.axios.post(resolve(this.baseUrl, `/api/blueprints/${blueprintId}/files`), config);
        return getHttpResponse(response);
    }

    async updateBlueprintFile(blueprintId: string, fileId: string, dto: UpdateBlueprintFileRuleDTO, options: ClientRequestOptions = {}): Promise<HttpResponse<FileRule>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        config.data = dto;
        const response: AxiosResponse<FileRule> = await this.axios.patch(resolve(this.baseUrl, `/api/blueprints/${blueprintId}/files/${fileId}`), config);
        return getHttpResponse(response);
    }

    async removeBlueprintFile(blueprintId: string, fileId: string, options: ClientRequestOptions = {}): Promise<HttpResponse<FileRule>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<FileRule> = await this.axios.delete(resolve(this.baseUrl, `/api/blueprints/${blueprintId}/files/${fileId}`), config);
        return getHttpResponse(response);
    }

    async addBlueprintRunConfiguration(blueprintId: string, dto: AddBlueprintRunConfigurationDTO, options: ClientRequestOptions = {}): Promise<HttpResponse<RunConfiguration>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        config.data = dto;
        const response: AxiosResponse<RunConfiguration> = await this.axios.post(resolve(this.baseUrl, `/api/blueprints/${blueprintId}/run-configurations`), config);
        return getHttpResponse(response);
    }

    async updateBlueprintRunConfiguration(blueprintId: string, runConfigurationId: string, dto: UpdateBlueprintRunConfigurationDTO, options: ClientRequestOptions = {}): Promise<HttpResponse<RunConfiguration>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        config.data = dto;
        const response: AxiosResponse<RunConfiguration> = await this.axios.patch(resolve(this.baseUrl, `/api/blueprints/${blueprintId}/run-configurations/${runConfigurationId}`), config);
        return getHttpResponse(response);
    }

    async removeBlueprintRunConfiguration(blueprintId: string, runConfigurationId: string, options: ClientRequestOptions = {}): Promise<HttpResponse<RunConfiguration>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<RunConfiguration> = await this.axios.delete(resolve(this.baseUrl, `/api/blueprints/${blueprintId}/run-configurations/${runConfigurationId}`), config);
        return getHttpResponse(response);
    }

    async updateBlueprintPermissions(blueprintId: string, dto: UpdateBlueprintPermissionsDTO, options: ClientRequestOptions = {}): Promise<HttpResponse<Permissions>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        config.data = dto;
        const response: AxiosResponse<Permissions> = await this.axios.patch(resolve(this.baseUrl, `/api/blueprints/${blueprintId}/permissions`), config);
        return getHttpResponse(response);
    }

    async addBlueprintUserPermissions(blueprintId: string, dto: AddBlueprintUserDTO, options: ClientRequestOptions = {}): Promise<HttpResponse<UserPermissions>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        config.data = dto;
        const response: AxiosResponse<UserPermissions> = await this.axios.post(resolve(this.baseUrl, `/api/blueprints/${blueprintId}/permissions/users`), config);
        return getHttpResponse(response);
    }

    async updateBlueprintUserPermissions(blueprintId: string, userId: string, dto: UpdateBlueprintUserDTO, options: ClientRequestOptions = {}): Promise<HttpResponse<UserPermissions>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        config.data = dto;
        const response: AxiosResponse<UserPermissions> = await this.axios.patch(resolve(this.baseUrl, `/api/blueprints/${blueprintId}/permissions/users/${userId}`), config);
        return getHttpResponse(response);
    }

    async removeBlueprintUserPermissions(blueprintId: string, userId: string, options: ClientRequestOptions = {}): Promise<HttpResponse<UserPermissions>> {
        const config: AxiosRequestConfig = this.getAxiosRequestConfig(options);
        const response: AxiosResponse<UserPermissions> = await this.axios.delete(resolve(this.baseUrl, `/api/blueprints/${blueprintId}/permissions/users/${userId}`), config);
        return getHttpResponse(response);
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