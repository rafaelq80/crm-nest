import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import {
    IsEmail,
    IsNotEmpty,
    Matches
} from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Oportunidade } from '../../oportunidade/entities/oportunidade.entity';

@Entity({ name: 'tb_clientes' })
export class Cliente {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty({ example: 'email@email.com.br' })
  email: string;

  @Matches(/^\d{10,11}$/, {
    message:
      'Telefone inválido. Informe DDD + número (10 dígitos para fixo, 11 para celular)',
  })
  @IsNotEmpty()
  @Column({ length: 11, nullable: false })
  @ApiProperty({ example: '1133334444' })
  telefone: string;

  @Matches(/^\d{14}$/, {
    message: 'CNPJ inválido. Informe exatamente 14 dígitos numéricos',
  })
  @IsNotEmpty()
  @Column({ length: 14, nullable: false })
  @ApiProperty({ example: '12345678000199' })
  cnpj: string;

  @Column({ length: 5000 })
  @ApiProperty()
  foto: string;

  @Column({ length: 10000 })
  @ApiProperty()
  historico: string;

  @OneToMany(() => Oportunidade, (oportunidade) => oportunidade.cliente)
  @ApiProperty()
  oportunidade?: Oportunidade[];
}
