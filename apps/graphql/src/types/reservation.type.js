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
exports.ReservationInputType = exports.ReservationType = void 0;
const graphql_1 = require("@nestjs/graphql");
const room_type_1 = require("./room.type");
const user_type_1 = require("./user.type");
const notif_type_1 = require("./notif.type");
let ReservationType = class ReservationType {
    id;
    room_id;
    user_id;
    start_time;
    end_time;
    status;
    created_at;
    room;
    user;
    notifs;
};
exports.ReservationType = ReservationType;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], ReservationType.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ReservationType.prototype, "room_id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ReservationType.prototype, "user_id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], ReservationType.prototype, "start_time", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], ReservationType.prototype, "end_time", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ReservationType.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], ReservationType.prototype, "created_at", void 0);
__decorate([
    (0, graphql_1.Field)(() => room_type_1.RoomType),
    __metadata("design:type", room_type_1.RoomType)
], ReservationType.prototype, "room", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_type_1.UserType),
    __metadata("design:type", user_type_1.UserType)
], ReservationType.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(() => [notif_type_1.NotifType]),
    __metadata("design:type", Array)
], ReservationType.prototype, "notifs", void 0);
exports.ReservationType = ReservationType = __decorate([
    (0, graphql_1.ObjectType)()
], ReservationType);
let ReservationInputType = class ReservationInputType {
    room_id;
    user_id;
    start_time;
    end_time;
    status;
};
exports.ReservationInputType = ReservationInputType;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ReservationInputType.prototype, "room_id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ReservationInputType.prototype, "user_id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], ReservationInputType.prototype, "start_time", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], ReservationInputType.prototype, "end_time", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ReservationInputType.prototype, "status", void 0);
exports.ReservationInputType = ReservationInputType = __decorate([
    (0, graphql_1.InputType)()
], ReservationInputType);
