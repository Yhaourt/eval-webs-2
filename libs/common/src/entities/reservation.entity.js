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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const room_entity_1 = require("./room.entity");
const notif_entity_1 = require("./notif.entity");
let ReservationEntity = class ReservationEntity {
    id;
    user_id;
    room_id;
    start_time;
    end_time;
    status;
    created_at;
    user;
    room;
    notifs;
};
exports.ReservationEntity = ReservationEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ReservationEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'user_id',
    }),
    __metadata("design:type", String)
], ReservationEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'room_id',
    }),
    __metadata("design:type", String)
], ReservationEntity.prototype, "room_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'start_time',
    }),
    __metadata("design:type", Date)
], ReservationEntity.prototype, "start_time", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'end_time',
    }),
    __metadata("design:type", Date)
], ReservationEntity.prototype, "end_time", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ReservationEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
    }),
    __metadata("design:type", Date)
], ReservationEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({
        name: 'user_id',
    }),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.reservations),
    __metadata("design:type", user_entity_1.UserEntity)
], ReservationEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({
        name: 'room_id',
    }),
    (0, typeorm_1.ManyToOne)(() => room_entity_1.RoomEntity, (room) => room.reservations),
    __metadata("design:type", room_entity_1.RoomEntity)
], ReservationEntity.prototype, "room", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notif_entity_1.NotifEntity, (notif) => notif.reservation, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], ReservationEntity.prototype, "notifs", void 0);
exports.ReservationEntity = ReservationEntity = __decorate([
    (0, typeorm_1.Entity)('reservations')
], ReservationEntity);
