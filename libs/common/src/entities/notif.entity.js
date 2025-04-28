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
exports.NotifEntity = void 0;
const typeorm_1 = require("typeorm");
const reservation_entity_1 = require("./reservation.entity");
let NotifEntity = class NotifEntity {
    id;
    reservation_id;
    message;
    notification_date;
    is_sent;
    reservation;
};
exports.NotifEntity = NotifEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], NotifEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'reservation_id',
    }),
    __metadata("design:type", String)
], NotifEntity.prototype, "reservation_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NotifEntity.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'notification_date',
    }),
    __metadata("design:type", Date)
], NotifEntity.prototype, "notification_date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'is_sent',
    }),
    __metadata("design:type", Boolean)
], NotifEntity.prototype, "is_sent", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({
        name: 'reservation_id',
    }),
    (0, typeorm_1.ManyToOne)(() => reservation_entity_1.ReservationEntity, (reservation) => reservation.notifs),
    __metadata("design:type", reservation_entity_1.ReservationEntity)
], NotifEntity.prototype, "reservation", void 0);
exports.NotifEntity = NotifEntity = __decorate([
    (0, typeorm_1.Entity)('notifications')
], NotifEntity);
