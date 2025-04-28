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
exports.RoomInputType = exports.RoomType = void 0;
const graphql_1 = require("@nestjs/graphql");
const reservation_type_1 = require("./reservation.type");
let RoomType = class RoomType {
    id;
    name;
    capacity;
    location;
    created_at;
    reservations;
};
exports.RoomType = RoomType;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], RoomType.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], RoomType.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], RoomType.prototype, "capacity", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], RoomType.prototype, "location", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], RoomType.prototype, "created_at", void 0);
__decorate([
    (0, graphql_1.Field)(() => [reservation_type_1.ReservationType]),
    __metadata("design:type", Array)
], RoomType.prototype, "reservations", void 0);
exports.RoomType = RoomType = __decorate([
    (0, graphql_1.ObjectType)()
], RoomType);
let RoomInputType = class RoomInputType {
    name;
    capacity;
    location;
};
exports.RoomInputType = RoomInputType;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], RoomInputType.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], RoomInputType.prototype, "capacity", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], RoomInputType.prototype, "location", void 0);
exports.RoomInputType = RoomInputType = __decorate([
    (0, graphql_1.InputType)()
], RoomInputType);
