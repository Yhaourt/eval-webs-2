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
exports.ReservationResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const reservation_type_1 = require("../types/reservation.type");
const common_1 = require("@nestjs/common");
const keycloak_auth_guard_1 = require("../auth/keycloak-auth-guard");
const reservation_entity_1 = require("../../../../libs/app/src/entities/reservation.entity");
let ReservationResolver = class ReservationResolver {
    reservationRepo;
    constructor(reservationRepo) {
        this.reservationRepo = reservationRepo;
    }
    async listReservations(skip = 0, limit = 20) {
        return this.reservationRepo.find({
            skip,
            take: limit,
            relations: ['room', 'user'],
        });
    }
    async reservation(id) {
        return this.reservationRepo.findOneOrFail({
            where: { id },
            relations: ['room', 'user'],
        });
    }
    async createReservation(input) {
        const newReservation = this.reservationRepo.create(input);
        const reservation = await this.reservationRepo.save(newReservation);
        return this.reservationRepo.findOneOrFail({
            where: { id: reservation.id },
            relations: ['room', 'user'],
        });
    }
    async updateReservation(id, input) {
        await this.reservationRepo.update({ id }, input);
        return this.reservationRepo.findOneOrFail({
            where: { id },
            relations: ['room', 'user'],
        });
    }
    async deleteReservation(id) {
        const reservation = await this.reservationRepo.findOneOrFail({
            where: { id },
            relations: ['room', 'user'],
        });
        await this.reservationRepo.remove(reservation);
        return true;
    }
};
exports.ReservationResolver = ReservationResolver;
__decorate([
    (0, graphql_1.Query)(() => [reservation_type_1.ReservationType]),
    __param(0, (0, graphql_1.Args)('skip', { type: () => Number, nullable: true })),
    __param(1, (0, graphql_1.Args)('limit', { type: () => Number, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReservationResolver.prototype, "listReservations", null);
__decorate([
    (0, graphql_1.Query)(() => reservation_type_1.ReservationType, { nullable: true }),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReservationResolver.prototype, "reservation", null);
__decorate([
    (0, graphql_1.Mutation)(() => reservation_type_1.ReservationType),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reservation_type_1.ReservationInputType]),
    __metadata("design:returntype", Promise)
], ReservationResolver.prototype, "createReservation", null);
__decorate([
    (0, graphql_1.Mutation)(() => reservation_type_1.ReservationType),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, reservation_type_1.ReservationInputType]),
    __metadata("design:returntype", Promise)
], ReservationResolver.prototype, "updateReservation", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReservationResolver.prototype, "deleteReservation", null);
exports.ReservationResolver = ReservationResolver = __decorate([
    (0, graphql_1.Resolver)(() => reservation_type_1.ReservationType),
    (0, common_1.UseGuards)(keycloak_auth_guard_1.KeycloakAuthGuard),
    __param(0, (0, typeorm_1.InjectRepository)(reservation_entity_1.ReservationEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ReservationResolver);
