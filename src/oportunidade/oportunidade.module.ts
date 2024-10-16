import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClienteModule } from "../cliente/cliente.module";
import { ClienteService } from "../cliente/services/cliente.service";
import { OportunidadeController } from "./controllers/oportunidade.controller";
import { Oportunidade } from "./entities/oportunidade.entity";
import { OportunidadeService } from "./services/oportunidade.service";

@Module({
    imports: [TypeOrmModule.forFeature([Oportunidade]), ClienteModule],
    providers: [OportunidadeService, ClienteService],
    controllers: [OportunidadeController],
    exports: [TypeOrmModule]
})

export class OportunidadeModule { }