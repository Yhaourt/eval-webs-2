"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotifResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const notif_type_1 = require("../types/notif.type");
const common_1 = require("@nestjs/common");
const keycloak_auth_guard_1 = require("../auth/keycloak-auth-guard");
const notif_entity_1 = require("../../../../libs/app/src/entities/notif.entity");
let NotifResolver = class NotifResolver {
    notifRepo;
    constructor(notifRepo) {
        this.notifRepo = notifRepo;
    }
    async listNotifs(skip = 0, limit = 20) {
        return this.notifRepo.find({
            skip,
            take: limit,
            relations: ['reservation'],
        });
    }
    async notif(id) {
        return this.notifRepo.findOneOrFail({
            where: { id },
            relations: ['reservation'],
        });
    }
    async createNotif(input) {
        const newNotif = this.notifRepo.create(input);
        const notif = await this.notifRepo.save(newNotif);
        return this.notifRepo.findOneOrFail({
            where: { id: notif.id },
            relations: ['reservation'],
        });
    }
    async updateNotif(id, input) {
        await this.notifRepo.update({ id }, input);
        return this.notifRepo.findOneOrFail({
            where: { id },
            relations: ['reservation'],
        });
    }
    async deleteNotif(id) {
        const notif = await this.notifRepo.findOneOrFail({
            where: { id },
            relations: ['reservation'],
        });
        await this.notifRepo.remove(notif);
        return true;
    }
};
exports.NotifResolver = NotifResolver;
__decorate([
    (0, graphql_1.Query)(() => [notif_type_1.NotifType]),
    __param(0, (0, graphql_1.Args)('skip', { type: () => Number, nullable: true })),
    __param(1, (0, graphql_1.Args)('limit', { type: () => Number, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NotifResolver.prototype, "listNotifs", null);
__decorate([
    (0, graphql_1.Query)(() => notif_type_1.NotifType, { nullable: true }),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotifResolver.prototype, "notif", null);
__decorate([
    (0, graphql_1.Mutation)(() => notif_type_1.NotifType),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notif_type_1.NotifInputType]),
    __metadata("design:returntype", Promise)
], NotifResolver.prototype, "createNotif", null);
__decorate([
    (0, graphql_1.Mutation)(() => notif_type_1.NotifType),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, notif_type_1.NotifInputType]),
    __metadata("design:returntype", Promise)
], NotifResolver.prototype, "updateNotif", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotifResolver.prototype, "deleteNotif", null);
exports.NotifResolver = NotifResolver = __decorate([
    (0, graphql_1.Resolver)(() => notif_type_1.NotifType),
    (0, common_1.UseGuards)(keycloak_auth_guard_1.KeycloakAuthGuard),
    __param(0, (0, typeorm_1.InjectRepository)(notif_entity_1.NotifEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NotifResolver);
