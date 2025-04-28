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
exports.RoomResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const room_type_1 = require("../types/room.type");
const common_1 = require("@nestjs/common");
const keycloak_auth_guard_1 = require("../auth/keycloak-auth-guard");
const room_entity_1 = require("../../../../libs/app/src/entities/room.entity");
let RoomResolver = class RoomResolver {
    roomRepo;
    constructor(roomRepo) {
        this.roomRepo = roomRepo;
    }
    async listRooms(skip = 0, limit = 20) {
        return this.roomRepo.find({
            skip,
            take: limit,
        });
    }
    async room(id) {
        return this.roomRepo.findOneOrFail({ where: { id } });
    }
    async createRoom(input) {
        const newRoom = this.roomRepo.create(input);
        const room = await this.roomRepo.save(newRoom);
        return this.roomRepo.findOneOrFail({ where: { id: room.id } });
    }
    async updateRoom(id, input) {
        await this.roomRepo.update({ id }, input);
        return this.roomRepo.findOneByOrFail({ id });
    }
    async deleteRoom(id) {
        const room = await this.roomRepo.findOneByOrFail({ id });
        await this.roomRepo.remove(room);
        return true;
    }
};
exports.RoomResolver = RoomResolver;
__decorate([
    (0, graphql_1.Query)(() => [room_type_1.RoomType]),
    __param(0, (0, graphql_1.Args)('skip', { type: () => Number, nullable: true })),
    __param(1, (0, graphql_1.Args)('limit', { type: () => Number, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "listRooms", null);
__decorate([
    (0, graphql_1.Query)(() => room_type_1.RoomType, { nullable: true }),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "room", null);
__decorate([
    (0, graphql_1.Mutation)(() => room_type_1.RoomType),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [room_type_1.RoomInputType]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "createRoom", null);
__decorate([
    (0, graphql_1.Mutation)(() => room_type_1.RoomType),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, room_type_1.RoomInputType]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "updateRoom", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "deleteRoom", null);
exports.RoomResolver = RoomResolver = __decorate([
    (0, graphql_1.Resolver)(() => room_type_1.RoomType),
    (0, common_1.UseGuards)(keycloak_auth_guard_1.KeycloakAuthGuard),
    __param(0, (0, typeorm_1.InjectRepository)(room_entity_1.RoomEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RoomResolver);
