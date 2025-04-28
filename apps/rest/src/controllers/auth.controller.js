"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const login_dto_1 = require("../dto/login.dto");
const register_dto_1 = require("../dto/register.dto");
const querystring = __importStar(require("node:querystring"));
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../../../libs/app/src/entities/user.entity");
let AuthController = class AuthController {
    userRepo;
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async login(data) {
        const { email, password } = data;
        const response = await fetch(`${process.env.KEYCLOAK_URL}/realms/myrealm/protocol/openid-connect/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: querystring.stringify({
                client_id: process.env.KEYCLOAK_CLIENT_ID,
                client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
                grant_type: 'password',
                username: email,
                password: password,
            }),
        });
        if (!response.ok) {
            throw new Error('Failed to fetch tokens');
        }
        return (await response.json());
    }
    async register(data) {
        const { email, password, username, firstName, lastName } = data;
        try {
            const adminTokenResponse = await fetch(`${process.env.KEYCLOAK_URL}/realms/master/protocol/openid-connect/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: querystring.stringify({
                    client_id: process.env.KEYCLOAK_ADMIN_CLIENT_ID,
                    client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
                    grant_type: 'password',
                    username: process.env.KEYCLOAK_ADMIN_USERNAME,
                    password: process.env.KEYCLOAK_ADMIN_PASSWORD,
                }),
            });
            if (!adminTokenResponse.ok) {
                throw new Error('Failed to obtain admin token');
            }
            const adminToken = await adminTokenResponse.json();
            const userResponse = await fetch(`${process.env.KEYCLOAK_URL}/admin/realms/myrealm/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${adminToken.access_token}`,
                },
                body: JSON.stringify({
                    username,
                    email,
                    firstName,
                    lastName,
                    enabled: true,
                    credentials: [
                        {
                            type: 'password',
                            value: password,
                            temporary: false,
                        },
                    ],
                }),
            });
            if (!userResponse.ok) {
                throw new Error('Failed to create user');
            }
            const locationHeader = userResponse.headers.get('Location');
            if (!locationHeader) {
                throw new Error('User created but ID not found in response');
            }
            const userId = locationHeader.split('/').pop();
            return this.userRepo.save({
                keycloak_id: userId,
                email,
            });
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException('Registration failed', common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginInputDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AuthController);
