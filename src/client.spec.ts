import { Access, AddBlueprintAppDTO, AddBlueprintAssertionRuleDTO, AddBlueprintCorrelationRuleDTO, AddBlueprintFileRuleDTO, AddBlueprintParameterRuleDTO, AddBlueprintRunConfigurationDTO, AddBlueprintUserDTO, Application, AssertionRule, Blueprint, CorrelationRule, CorrelationRuleScope, CorrelationRuleType, CreateApplicationDTO, CreateBlueprintDTO, CreateEnvironmentDTO, CreateNamespaceDTO, Environment, FileRule, FileType, ModificationType, Namespace, ParameterRule, ParameterRuleType, RepositoryType, RunConfiguration, SimulationType, UpdateApplicationDTO, UpdateBlueprintAssertionRuleDTO, UpdateBlueprintCorrelationRuleDTO, UpdateBlueprintDTO, UpdateBlueprintFileRuleDTO, UpdateBlueprintParameterRuleDTO, UpdateBlueprintPermissionsDTO, UpdateBlueprintRunConfigurationDTO, UpdateBlueprintUserDTO, UpdateEnvironmentDTO, UpdateNamespaceDTO, UserPermissions } from "@testament/core-service";
import { suite, test } from "@testdeck/mocha";
import * as nock from "nock";
import { createClient, TestamentClient } from "./client";
import { HttpStatus, StatusError } from "./http/http";
import { Page } from "./page";
import { assert } from "./util/test.util";

@suite
export class TestamentClientTests {

    private host: string = "http://localhost:8081";
    private client: TestamentClient = createClient({ baseUrl: this.host });

    @test
    async testNonStatusError() {
        nock(this.host)
            .post("/api/namespaces")
            .replyWithError("Some error");

        try {
            await this.client.createNamespace({ name: "Namespace 1" });
        } catch(err) {
            assert.strictEqual(err.message, "Some error");
            return;
        }
        throw new Error("Expected an error to be thrown");
    }

    @test
    async testStatusError() {
        nock(this.host)
            .post("/api/namespaces")
            .reply(HttpStatus.CONFLICT, {
                message: "Namespace already exists"
            });

        try {
            await this.client.createNamespace({ name: "Namespace 1" });
        } catch(err) {
            assert.instanceOf(err, StatusError);
            assert.deepEqual(err.response, {
                status: HttpStatus.CONFLICT,
                headers: {
                    "content-type": "application/json"
                },
                body: {
                    message: "Namespace already exists"
                }
            });
            return;
        }
        throw new Error("Expected an error to be thrown");
    }

    @test
    async testCreateNamespace() {
        const dto: CreateNamespaceDTO = {
            name: "Namespace 1",
            members: [
                {
                    userId: "u1"
                }
            ]
        };
        
        const namespace: Namespace = {
            id: "n1",
            name: "Namespace 1",
            members: [
                {
                    userId: "u1"
                }
            ],
            metadata: {
                creator: {
                    userId: "u1",
                    timeCreated: new Date()
                }
            }
        };
        
        nock(this.host)
            .post("/api/namespaces", dto as any)
            .matchHeader("X-User-Id", "123")
            .reply(HttpStatus.CREATED, namespace);

        const response = await this.client.createNamespace(dto, { headers: { "X-User-Id": "123" } });
        
        assert.strictEqual(response.status, HttpStatus.CREATED);
        assert.deepEqual(response.body, namespace);
    }

    @test
    async testGetAllNamespaces() {
        const namespaces: Page<Namespace> = {
            content: [
                {
                    id: "n1",
                    name: "Namespace 1",
                    members: [
                        {
                            userId: "u1"
                        }
                    ],
                    metadata: {
                        creator: {
                            userId: "u1",
                            timeCreated: new Date()
                        }
                    }
                },
                {
                    id: "n2",
                    name: "Namespace 2",
                    members: [
                        {
                            userId: "u1"
                        }
                    ],
                    metadata: {
                        creator: {
                            userId: "u1",
                            timeCreated: new Date()
                        }
                    }
                }
            ],
            elements: 2,
            page: 1,
            limit: 50,
            totalPages: 1,
            totalElements: 2,
            firstPage: true,
            lastPage: true,
            sort: null
        };
        
        nock(this.host)
            .get("/api/namespaces?metadata.creator.userId=u1")
            .reply(HttpStatus.OK, namespaces);

        const response = await this.client.getAllNamespaces({ params: { "metadata.creator.userId": "u1" } });
        
        assert.strictEqual(response.status, HttpStatus.OK);
        assert.deepEqual(response.body, namespaces);
    }

    @test
    async testGetNamespace() {
        const namespace: Namespace = {
            id: "n1",
            name: "Namespace 1",
            members: [
                {
                    userId: "u1"
                }
            ],
            metadata: {
                creator: {
                    userId: "u1",
                    timeCreated: new Date()
                }
            }
        };
        
        nock(this.host)
            .get("/api/namespaces/n1")
            .reply(HttpStatus.OK, namespace);

        const response = await this.client.getNamespace("n1");
        
        assert.strictEqual(response.status, HttpStatus.OK);
        assert.deepEqual(response.body, namespace);
    }

    @test
    async testGetNamespacesForMember() {
        const namespaceIds: string[] = ["u1", "u3", "u11"];
        
        nock(this.host)
            .get("/api/users/u1/namespaces")
            .reply(HttpStatus.OK, namespaceIds);

        const response = await this.client.getNamespacesForMember("u1");
        
        assert.strictEqual(response.status, HttpStatus.OK);
        assert.deepEqual(response.body, namespaceIds);
    }

    @test
    async testUpdateNamespace() {
        const dto: UpdateNamespaceDTO = {
            name: "Namespace 1",
            members: [
                {
                    userId: "u1"
                },
                {
                    userId: "u4"
                },
            ]
        };
        
        const namespace: Namespace = {
            id: "n1",
            name: "Namespace 1",
            members: [
                {
                    userId: "u1"
                },
                {
                    userId: "u4"
                }
            ],
            metadata: {
                creator: {
                    userId: "u1",
                    timeCreated: new Date()
                }
            }
        };

        nock(this.host)
            .put("/api/namespaces/n1")
            .reply(HttpStatus.OK, namespace);

        const response = await this.client.updateNamespace("n1", dto);
        
        assert.strictEqual(response.status, HttpStatus.OK);
        assert.deepEqual(response.body, namespace);
    }

    @test
    async testDeleteNamespace() {
        const namespace: Namespace = {
            id: "n1",
            name: "Namespace 1",
            members: [
                {
                    userId: "u1"
                }
            ],
            metadata: {
                creator: {
                    userId: "u1",
                    timeCreated: new Date()
                }
            }
        };
        
        nock(this.host)
            .delete("/api/namespaces/n1")
            .reply(HttpStatus.OK, namespace);

        const response = await this.client.deleteNamespace("n1");
        
        assert.strictEqual(response.status, HttpStatus.OK);
        assert.deepEqual(response.body, namespace);
    }
    
    @test
    async testCreateApp() {
        const dto: CreateApplicationDTO = {
            name: "Application 1"
        };
        
        const application: Application = {
            id: "a1",
            name: "Application 1"
        };
        
        nock(this.host)
            .post("/api/apps", dto as any)
            .matchHeader("X-User-Id", "123")
            .reply(HttpStatus.CREATED, application);

        const response = await this.client.createApp(dto, { headers: { "X-User-Id": "123" } });
        
        assert.strictEqual(response.status, HttpStatus.CREATED);
        assert.deepEqual(response.body, application);
    }

    @test
    async testGetAllApps() {
        const applications: Page<Application> = {
            content: [
                {
                    id: "a1",
                    name: "Application"
                },
                {
                    id: "a2",
                    name: "Application"
                }
            ],
            elements: 2,
            page: 1,
            limit: 50,
            totalPages: 1,
            totalElements: 2,
            firstPage: true,
            lastPage: true,
            sort: null
        };
        
        nock(this.host)
            .get("/api/apps?name=Application")
            .reply(HttpStatus.OK, applications);

        const response = await this.client.getAllApps({ params: { "name": "Application" } });
        
        assert.strictEqual(response.status, HttpStatus.OK);
        assert.deepEqual(response.body, applications);
    }

    @test
    async testGetApp() {
        const application: Application = {
            id: "a1",
            name: "Application 1"
        };
        
        nock(this.host)
            .get("/api/apps/a1")
            .reply(HttpStatus.OK, application);

        const response = await this.client.getApp("a1");
        
        assert.strictEqual(response.status, HttpStatus.OK);
        assert.deepEqual(response.body, application);
    }

    @test
    async testUpdateApp() {
        const dto: UpdateApplicationDTO = {
            name: "Application 1"
        };
        
        const application: Application = {
            id: "a1",
            name: "Application 1"
        };

        nock(this.host)
            .put("/api/apps/a1")
            .reply(HttpStatus.OK, application);

        const response = await this.client.updateApp("a1", dto);
        
        assert.strictEqual(response.status, HttpStatus.OK);
        assert.deepEqual(response.body, application);
    }

    @test
    async testDeleteApp() {
        const application: Application = {
            id: "n1",
            name: "Application 1"
        };
        
        nock(this.host)
            .delete("/api/apps/a1")
            .reply(HttpStatus.OK, application);

        const response = await this.client.deleteApp("a1");
        
        assert.strictEqual(response.status, HttpStatus.OK);
        assert.deepEqual(response.body, application);
    }

    @test
    async testCreateEnvironment() {
        const dto: CreateEnvironmentDTO = {
            name: "Environment 1"
        };
        
        const environment: Environment = {
            id: "a1",
            name: "Environment 1"
        };
        
        nock(this.host)
            .post("/api/environments", dto as any)
            .matchHeader("X-User-Id", "123")
            .reply(HttpStatus.CREATED, environment);

        const response = await this.client.createEnvironment(dto, { headers: { "X-User-Id": "123" } });
        
        assert.strictEqual(response.status, HttpStatus.CREATED);
        assert.deepEqual(response.body, environment);
    }

    @test
    async testGetAllEnvironments() {
        const environments: Page<Environment> = {
            content: [
                {
                    id: "a1",
                    name: "Environment"
                },
                {
                    id: "a2",
                    name: "Environment"
                }
            ],
            elements: 2,
            page: 1,
            limit: 50,
            totalPages: 1,
            totalElements: 2,
            firstPage: true,
            lastPage: true,
            sort: null
        };
        
        nock(this.host)
            .get("/api/environments?name=Environment")
            .reply(HttpStatus.OK, environments);

        const response = await this.client.getAllEnvironments({ params: { "name": "Environment" } });
        
        assert.strictEqual(response.status, HttpStatus.OK);
        assert.deepEqual(response.body, environments);
    }

    @test
    async testGetEnvironment() {
        const environment: Environment = {
            id: "a1",
            name: "Environment 1"
        };
        
        nock(this.host)
            .get("/api/environments/a1")
            .reply(HttpStatus.OK, environment);

        const response = await this.client.getEnvironment("a1");
        
        assert.strictEqual(response.status, HttpStatus.OK);
        assert.deepEqual(response.body, environment);
    }

    @test
    async testUpdateEnvironment() {
        const dto: UpdateEnvironmentDTO = {
            name: "Environment 1"
        };
        
        const environment: Environment = {
            id: "a1",
            name: "Environment 1"
        };

        nock(this.host)
            .put("/api/environments/a1")
            .reply(HttpStatus.OK, environment);

        const response = await this.client.updateEnvironment("a1", dto);
        
        assert.strictEqual(response.status, HttpStatus.OK);
        assert.deepEqual(response.body, environment);
    }

    @test
    async testDeleteEnvironment() {
        const environment: Environment = {
            id: "n1",
            name: "Environment 1"
        };
        
        nock(this.host)
            .delete("/api/environments/a1")
            .reply(HttpStatus.OK, environment);

        const response = await this.client.deleteEnvironment("a1");
        
        assert.strictEqual(response.status, HttpStatus.OK);
        assert.deepEqual(response.body, environment);
    }

    @test
    async testCreateBlueprint() {
        const dto: CreateBlueprintDTO = {
            name: "Blueprint 1",
            description: "Simple Blueprint",
            namespaceId: "n1",
            simulation: {
                type: SimulationType.JAVA_CHROMIUM,
                repository: {
                    type: RepositoryType.GIT,
                    git: {
                        url: "https://path/to/repository",
                        username: "user",
                        password: "password"
                    }
                },
                runCommands: [
                    "gradle assemble",
                    "java -jar build/libs/simulation-0.0.1.jar"
                ]
            }
        };
        
        const blueprint: Blueprint = {
            id: "b1",
            name: "Blueprint 1",
            description: "Simple Blueprint",
            namespaceId: "n1",
            simulation: {
                type: SimulationType.JAVA_CHROMIUM,
                repository: {
                    type: RepositoryType.GIT,
                    git: {
                        url: "https://path/to/repository",
                        username: "user",
                        password: "password"
                    }
                },
                runCommands: [
                    "gradle assemble",
                    "java -jar build/libs/simulation-0.0.1.jar"
                ]
            },
            permissions: {
                all: {
                    access: Access.NONE
                },
                namespace: {
                    access: Access.WRITE
                },
                users: [
                    {
                        id: "u1",
                        access: Access.ADMIN
                    }
                ]
            },
            metadata: {
                creator: {
                    userId: "u1",
                    timeCreated: new Date()
                },
                lastModified: {
                    type: ModificationType.CREATE,
                    userId: "u1",
                    timeModified: new Date()
                }
            }
        };
        
        nock(this.host)
            .post("/api/blueprints", dto as any)
            .matchHeader("X-User-Id", "123")
            .reply(HttpStatus.CREATED, blueprint);

        const response = await this.client.createBlueprint(dto, { headers: { "X-User-Id": "123" } });
        
        assert.strictEqual(response.status, HttpStatus.CREATED);
        assert.deepEqual(response.body, blueprint);
    }

    @test
    async testGetAllBlueprints() {
        const blueprints: Page<Blueprint> = {
            content: [
                {
                    id: "b1",
                    name: "Blueprint 1",
                    description: "Simple Blueprint",
                    namespaceId: "n1",
                    permissions: {
                        all: {
                            access: Access.NONE
                        },
                        namespace: {
                            access: Access.WRITE
                        },
                        users: [
                            {
                                id: "u1",
                                access: Access.ADMIN
                            }
                        ]
                    },
                    metadata: {
                        creator: {
                            userId: "u1",
                            timeCreated: new Date()
                        },
                        lastModified: {
                            type: ModificationType.CREATE,
                            userId: "u1",
                            timeModified: new Date()
                        }
                    }
                },
                {
                    id: "b2",
                    name: "Blueprint 2",
                    description: "Simple Blueprint",
                    namespaceId: "n1",
                    permissions: {
                        all: {
                            access: Access.NONE
                        },
                        namespace: {
                            access: Access.WRITE
                        },
                        users: [
                            {
                                id: "u1",
                                access: Access.ADMIN
                            }
                        ]
                    },
                    metadata: {
                        creator: {
                            userId: "u1",
                            timeCreated: new Date()
                        },
                        lastModified: {
                            type: ModificationType.CREATE,
                            userId: "u1",
                            timeModified: new Date()
                        }
                    }
                }
            ],
            elements: 2,
            page: 1,
            limit: 50,
            totalPages: 1,
            totalElements: 2,
            firstPage: true,
            lastPage: true,
            sort: null
        };
        
        nock(this.host)
            .get("/api/blueprints?description=Simple+Blueprint")
            .reply(HttpStatus.OK, blueprints);

        const response = await this.client.getAllBlueprints({ params: { "description": "Simple Blueprint" } });
        
        assert.strictEqual(response.status, HttpStatus.OK);
        assert.deepEqual(response.body, blueprints);
    }

    @test
    async testGetBlueprint() {
        const blueprint: Blueprint = {
            id: "b1",
            name: "Blueprint 1",
            namespaceId: "n1",
            permissions: {
                all: {
                    access: Access.NONE
                },
                namespace: {
                    access: Access.WRITE
                },
                users: [
                    {
                        id: "u1",
                        access: Access.ADMIN
                    }
                ]
            },
            metadata: {
                creator: {
                    userId: "u1",
                    timeCreated: new Date()
                },
                lastModified: {
                    type: ModificationType.CREATE,
                    userId: "u1",
                    timeModified: new Date()
                }
            }
        };
        
        nock(this.host)
            .get("/api/blueprints/b1")
            .reply(HttpStatus.OK, blueprint);

        const response = await this.client.getBlueprint("b1");
        
        assert.strictEqual(response.status, HttpStatus.OK);
        assert.deepEqual(response.body, blueprint);
    }

    @test
    async testUpdateBlueprint() {
        const dto: UpdateBlueprintDTO = {
            description: "Updated Blueprint"
        };
        
        const blueprint: Blueprint = {
            id: "b1",
            name: "Blueprint 1",
            description: "Updated Blueprint",
            namespaceId: "n1",
            permissions: {
                all: {
                    access: Access.NONE
                },
                namespace: {
                    access: Access.WRITE
                },
                users: [
                    {
                        id: "u1",
                        access: Access.ADMIN
                    }
                ]
            },
            metadata: {
                creator: {
                    userId: "u1",
                    timeCreated: new Date()
                },
                lastModified: {
                    type: ModificationType.CREATE,
                    userId: "u1",
                    timeModified: new Date()
                }
            }
        };

        nock(this.host)
            .patch("/api/blueprints/b1")
            .reply(HttpStatus.OK, blueprint);

        const response = await this.client.updateBlueprint("b1", dto);
        
        assert.strictEqual(response.status, HttpStatus.OK);
        assert.deepEqual(response.body, blueprint);
    }

    @test
    async testDeleteBlueprint() {
        const blueprint: Blueprint = {
            id: "n1",
            name: "Blueprint 1",
            namespaceId: "n1",
            permissions: {
                all: {
                    access: Access.NONE
                },
                namespace: {
                    access: Access.WRITE
                },
                users: [
                    {
                        id: "u1",
                        access: Access.ADMIN
                    }
                ]
            },
            metadata: {
                creator: {
                    userId: "u1",
                    timeCreated: new Date()
                },
                lastModified: {
                    type: ModificationType.CREATE,
                    userId: "u1",
                    timeModified: new Date()
                }
            }
        };
        
        nock(this.host)
            .delete("/api/blueprints/b1")
            .reply(HttpStatus.OK, blueprint);

        const response = await this.client.deleteBlueprint("b1");
        
        assert.strictEqual(response.status, HttpStatus.OK);
        assert.deepEqual(response.body, blueprint);
    }

    @test
    async testAddBlueprintApp() {
        const dto: AddBlueprintAppDTO = {
            id: "a1"
        };
        
        const appIds: string[] = [
            "a1",
            "a2"
        ];
        
        nock(this.host)
            .post("/api/blueprints/b1/apps", dto as any)
            .matchHeader("X-User-Id", "123")
            .reply(HttpStatus.CREATED, appIds);

        const response = await this.client.addBlueprintApp("b1", dto, { headers: { "X-User-Id": "123" } });
        
        assert.strictEqual(response.status, HttpStatus.CREATED);
        assert.deepEqual(response.body, appIds);
    }

    @test
    async testRemoveBlueprintApp() {
        const apps: string[] = [
            "a2"
        ];
        
        nock(this.host)
            .delete("/api/blueprints/b1/apps/a1")
            .reply(HttpStatus.OK, apps);

        const response = await this.client.removeBlueprintApp("b1", "a1");
        
        assert.strictEqual(response.status, HttpStatus.OK);
        assert.deepEqual(response.body, apps);
    }

    @test
    async testAddBlueprintAssertion() {
        const dto: AddBlueprintAssertionRuleDTO = {
            id: "a1",
            name: "Assertion 1",
            text: "Some text"
        };
        
        const assertionRule: AssertionRule = {
            id: "a1",
            name: "Assertion 1",
            text: "Some text"
        };
        
        nock(this.host)
            .post("/api/blueprints/b1/assertions", dto as any)
            .matchHeader("X-User-Id", "123")
            .reply(HttpStatus.CREATED, assertionRule);

        const response = await this.client.addBlueprintAssertion("b1", dto, { headers: { "X-User-Id": "123" } });
        
        assert.strictEqual(response.status, HttpStatus.CREATED);
        assert.deepEqual(response.body, assertionRule);
    }

    @test
    async testUpdateBlueprintAssertion() {
        const dto: UpdateBlueprintAssertionRuleDTO = {
            description: "Updated Assertion"
        };
        
        const assertionRule: AssertionRule = {
            id: "a1",
            name: "Assertion 1",
            description: "Updated Assertion",
            text: "Some text"
        };
        
        nock(this.host)
            .patch("/api/blueprints/b1/assertions/a1", dto as any)
            .matchHeader("X-User-Id", "123")
            .reply(HttpStatus.OK, assertionRule);

        const response = await this.client.updateBlueprintAssertion("b1", "a1", dto, { headers: { "X-User-Id": "123" } });
        
        assert.strictEqual(response.status, HttpStatus.OK);
        assert.deepEqual(response.body, assertionRule);
    }

    @test
    async testRemoveBlueprintAssertion() {
        const assertionRule: AssertionRule = {
            id: "a1",
            name: "Assertion 1",
            text: "Some text"
        };
        
        nock(this.host)
            .delete("/api/blueprints/b1/assertions/a1")
            .reply(HttpStatus.OK, assertionRule);

        const response = await this.client.removeBlueprintAssertion("b1", "a1");
        
        assert.strictEqual(response.status, HttpStatus.OK);
        assert.deepEqual(response.body, assertionRule);
    }

    @test
    async testAddBlueprintParameter() {
        const dto: AddBlueprintParameterRuleDTO = {
            id: "p1",
            name: "Parameter 1",
            type: ParameterRuleType.FILE,
            file: {
                column: "EmpUsername",
                name: "Username"
            }
        };
        
        const parameterRule: ParameterRule = {
            id: "p1",
            name: "Parameter 1",
            type: ParameterRuleType.FILE,
            file: {
                column: "EmpUsername",
                name: "Username"
            }
        };
        
        nock(this.host)
            .post("/api/blueprints/b1/parameters", dto as any)
            .matchHeader("X-User-Id", "123")
            .reply(HttpStatus.CREATED, parameterRule);

        const response = await this.client.addBlueprintParameter("b1", dto, { headers: { "X-User-Id": "123" } });
        
        assert.strictEqual(response.status, HttpStatus.CREATED);
        assert.deepEqual(response.body, parameterRule);
    }

    @test
    async testUpdateBlueprintParameter() {
        const dto: UpdateBlueprintParameterRuleDTO = {
            displayName: "Updated Parameter"
        };
        
        const parameterRule: ParameterRule = {
            id: "p1",
            name: "Parameter 1",
            type: ParameterRuleType.FILE,
            file: {
                column: "EmpUsername",
                name: "Username"
            }
        };
        
        nock(this.host)
            .patch("/api/blueprints/b1/parameters/p1", dto as any)
            .matchHeader("X-User-Id", "123")
            .reply(HttpStatus.OK, parameterRule);

        const response = await this.client.updateBlueprintParameter("b1", "p1", dto, { headers: { "X-User-Id": "123" } });
        
        assert.strictEqual(response.status, HttpStatus.OK);
        assert.deepEqual(response.body, parameterRule);
    }

    @test
    async testRemoveBlueprintParameter() {
        const parameterRule: ParameterRule = {
            id: "p1",
            name: "Parameter 1",
            type: ParameterRuleType.FILE,
            file: {
                column: "EmpUsername",
                name: "Username"
            }
        };
        
        nock(this.host)
            .delete("/api/blueprints/b1/parameters/p1")
            .reply(HttpStatus.OK, parameterRule);

        const response = await this.client.removeBlueprintParameter("b1", "p1");
        
        assert.strictEqual(response.status, HttpStatus.OK);
        assert.deepEqual(response.body, parameterRule);
    }

    @test
    async testAddBlueprintCorrelation() {
        const dto: AddBlueprintCorrelationRuleDTO = {
            id: "c1",
            name: "Correlation 1",
            type: CorrelationRuleType.BOUNDARY,
            boundary: {
                left: 'ViewState="',
                right: '"'
            },
            scope: CorrelationRuleScope.ALL
        };
        
        const correlationRule: CorrelationRule = {
            id: "c1",
            name: "Correlation 1",
            type: CorrelationRuleType.BOUNDARY,
            boundary: {
                left: 'ViewState="',
                right: '"'
            },
            scope: CorrelationRuleScope.ALL
        };
        
        nock(this.host)
            .post("/api/blueprints/b1/correlations", dto as any)
            .matchHeader("X-User-Id", "123")
            .reply(HttpStatus.CREATED, correlationRule);

        const response = await this.client.addBlueprintCorrelation("b1", dto, { headers: { "X-User-Id": "123" } });
        
        assert.strictEqual(response.status, HttpStatus.CREATED);
        assert.deepEqual(response.body, correlationRule);
    }

    @test
    async testUpdateBlueprintCorrelation() {
        const dto: UpdateBlueprintCorrelationRuleDTO = {
            displayName: "Updated Correlation"
        };
        
        const correlationRule: CorrelationRule = {
            id: "c1",
            name: "Correlation 1",
            displayName: "Updated Correlation",
            type: CorrelationRuleType.BOUNDARY,
            boundary: {
                left: 'ViewState="',
                right: '"'
            },
            scope: CorrelationRuleScope.ALL
        };
        
        nock(this.host)
            .patch("/api/blueprints/b1/correlations/c1", dto as any)
            .matchHeader("X-User-Id", "123")
            .reply(HttpStatus.OK, correlationRule);

        const response = await this.client.updateBlueprintCorrelation("b1", "c1", dto, { headers: { "X-User-Id": "123" } });
        
        assert.strictEqual(response.status, HttpStatus.OK);
        assert.deepEqual(response.body, correlationRule);
    }

    @test
    async testRemoveBlueprintCorrelation() {
        const correlationRule: CorrelationRule = {
            id: "c1",
            name: "Correlation 1",
            type: CorrelationRuleType.BOUNDARY,
            boundary: {
                left: 'ViewState="',
                right: '"'
            },
            scope: CorrelationRuleScope.ALL
        };
        
        nock(this.host)
            .delete("/api/blueprints/b1/correlations/c1")
            .reply(HttpStatus.OK, correlationRule);

        const response = await this.client.removeBlueprintCorrelation("b1", "c1");
        
        assert.strictEqual(response.status, HttpStatus.OK);
        assert.deepEqual(response.body, correlationRule);
    }

    @test
    async testAddBlueprintFile() {
        const dto: AddBlueprintFileRuleDTO = {
            id: "f1",
            name: "File 1",
            type: FileType.CSV
        };
        
        const fileRule: FileRule = {
            id: "f1",
            name: "File 1",
            type: FileType.CSV
        };
        
        nock(this.host)
            .post("/api/blueprints/b1/files", dto as any)
            .matchHeader("X-User-Id", "123")
            .reply(HttpStatus.CREATED, fileRule);

        const response = await this.client.addBlueprintFile("b1", dto, { headers: { "X-User-Id": "123" } });
        
        assert.strictEqual(response.status, HttpStatus.CREATED);
        assert.deepEqual(response.body, fileRule);
    }

    @test
    async testUpdateBlueprintFile() {
        const dto: UpdateBlueprintFileRuleDTO = {
            description: "Updated File"
        };
        
        const fileRule: FileRule = {
            id: "f1",
            name: "File 1",
            description: "Updated File",
            type: FileType.CSV
        };
        
        nock(this.host)
            .patch("/api/blueprints/b1/files/f1", dto as any)
            .matchHeader("X-User-Id", "123")
            .reply(HttpStatus.OK, fileRule);

        const response = await this.client.updateBlueprintFile("b1", "f1", dto, { headers: { "X-User-Id": "123" } });
        
        assert.strictEqual(response.status, HttpStatus.OK);
        assert.deepEqual(response.body, fileRule);
    }

    @test
    async testRemoveBlueprintFile() {
        const fileRule: FileRule = {
            id: "f1",
            name: "File 1",
            type: FileType.CSV
        };
        
        nock(this.host)
            .delete("/api/blueprints/b1/files/f1")
            .reply(HttpStatus.OK, fileRule);

        const response = await this.client.removeBlueprintFile("b1", "f1");
        
        assert.strictEqual(response.status, HttpStatus.OK);
        assert.deepEqual(response.body, fileRule);
    }

    @test
    async testAddBlueprintRunConfiguration() {
        const dto: AddBlueprintRunConfigurationDTO = {
            id: "r1",
            name: "RunConfiguration 1",
            simulationOptions: {
                args: "--username=user --password=password"
            }
        };
        
        const runConfiguration: RunConfiguration = {
            id: "r1",
            name: "RunConfiguration 1",
            simulationOptions: {
                args: "--username=user --password=password"
            }       
        };
        
        nock(this.host)
            .post("/api/blueprints/b1/run-configurations", dto as any)
            .matchHeader("X-User-Id", "123")
            .reply(HttpStatus.CREATED, runConfiguration);

        const response = await this.client.addBlueprintRunConfiguration("b1", dto, { headers: { "X-User-Id": "123" } });
        
        assert.strictEqual(response.status, HttpStatus.CREATED);
        assert.deepEqual(response.body, runConfiguration);
    }

    @test
    async testUpdateBlueprintRunConfiguration() {
        const dto: UpdateBlueprintRunConfigurationDTO = {
            description: "Updated Run Configuration"
        };
        
        const runConfiguration: RunConfiguration = {
            id: "r1",
            name: "RunConfiguration 1",
            description: "Updated Run Configuration",
            simulationOptions: {
                args: "--username=user --password=password"
            }
        };
        
        nock(this.host)
            .patch("/api/blueprints/b1/run-configurations/r1", dto as any)
            .matchHeader("X-User-Id", "123")
            .reply(HttpStatus.OK, runConfiguration);

        const response = await this.client.updateBlueprintRunConfiguration("b1", "r1", dto, { headers: { "X-User-Id": "123" } });
        
        assert.strictEqual(response.status, HttpStatus.OK);
        assert.deepEqual(response.body, runConfiguration);
    }

    @test
    async testRemoveBlueprintRunConfiguration() {
        const runConfiguration: RunConfiguration = {
            id: "r1",
            name: "RunConfiguration 1",
            simulationOptions: {
                args: "--username=user --password=password"
            }
        };
        
        nock(this.host)
            .delete("/api/blueprints/b1/run-configurations/r1")
            .reply(HttpStatus.OK, runConfiguration);

        const response = await this.client.removeBlueprintRunConfiguration("b1", "r1");
        
        assert.strictEqual(response.status, HttpStatus.OK);
        assert.deepEqual(response.body, runConfiguration);
    }

    @test
    async testAddBlueprintUserPermissions() {
        const dto: AddBlueprintUserDTO = {
            id: "u1",
            access: Access.WRITE
        };
        
        const userPermissions: UserPermissions = {
            id: "u1",
            access: Access.WRITE
        };
        
        nock(this.host)
            .post("/api/blueprints/b1/permissions/users", dto as any)
            .matchHeader("X-User-Id", "123")
            .reply(HttpStatus.CREATED, userPermissions);

        const response = await this.client.addBlueprintUserPermissions("b1", dto, { headers: { "X-User-Id": "123" } });
        
        assert.strictEqual(response.status, HttpStatus.CREATED);
        assert.deepEqual(response.body, userPermissions);
    }

    @test
    async testUpdateBlueprintPermissions() {
        const dto: UpdateBlueprintPermissionsDTO = {
            all: {
                access: Access.READ
            },
            namespace: {
                access: Access.WRITE
            }
        };
        
        const permissions: UpdateBlueprintPermissionsDTO = {
            all: {
                access: Access.READ
            },
            namespace: {
                access: Access.WRITE
            }
        };
        
        nock(this.host)
            .patch("/api/blueprints/b1/permissions", dto as any)
            .matchHeader("X-User-Id", "123")
            .reply(HttpStatus.CREATED, permissions);

        const response = await this.client.updateBlueprintPermissions("b1", dto, { headers: { "X-User-Id": "123" } });
        
        assert.strictEqual(response.status, HttpStatus.CREATED);
        assert.deepEqual(response.body, permissions);
    }

    @test
    async testUpdateBlueprintUserPermissions() {
        const dto: UpdateBlueprintUserDTO = {
            access: Access.WRITE
        };
        
        const userPermissions: UserPermissions = {
            id: "u1",
            access: Access.WRITE
        };
        
        nock(this.host)
            .patch("/api/blueprints/b1/permissions/users/u1", dto as any)
            .matchHeader("X-User-Id", "123")
            .reply(HttpStatus.CREATED, userPermissions);

        const response = await this.client.updateBlueprintUserPermissions("b1", "u1", dto, { headers: { "X-User-Id": "123" } });
        
        assert.strictEqual(response.status, HttpStatus.CREATED);
        assert.deepEqual(response.body, userPermissions);
    }

    @test
    async testRemoveBlueprintUserPermissions() {
        const userPermissions: UserPermissions = {
            id: "u1",
            access: Access.WRITE
        };
        
        nock(this.host)
            .delete("/api/blueprints/b1/permissions/users/u1")
            .reply(HttpStatus.OK, userPermissions);

        const response = await this.client.removeBlueprintUserPermissions("b1", "u1");
        
        assert.strictEqual(response.status, HttpStatus.OK);
        assert.deepEqual(response.body, userPermissions);
    }

}