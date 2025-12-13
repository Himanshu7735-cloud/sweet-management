import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from 'typeorm';

@Entity()
export class Sweet extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({unique: true})
  name!: string;

  @Column()
  category!: string;

  @Column('float')
  price!: number;

  @Column('int')
  quantity!: number;
  @Column({nullable: true})
  image!: string;}
