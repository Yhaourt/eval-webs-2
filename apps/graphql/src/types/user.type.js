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
exports.UserInputType = exports.UserType = void 0;
const graphql_1 = require("@nestjs/graphql");
const reservation_type_1 = require("./reservation.type");
let UserType = class UserType {
    id;
    keycloak_id;
    email;
    created_at;
    reservations;
};
exports.UserType = UserType;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], UserType.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserType.prototype, "keycloak_id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserType.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], UserType.prototype, "created_at", void 0);
__decorate([
    (0, graphql_1.Field)(() => [reservation_type_1.ReservationType]),
    __metadata("design:type", Array)
], UserType.prototype, "reservations", void 0);
exports.UserType = UserType = __decorate([
    (0, graphql_1.ObjectType)()
], UserType);
let UserInputType = class UserInputType {
    keycloak_id;
    email;
};
exports.UserInputType = UserInputType;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserInputType.prototype, "keycloak_id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserInputType.prototype, "email", void 0);
exports.UserInputType = UserInputType = __decorate([
    (0, graphql_1.InputType)()
], UserInputType);
