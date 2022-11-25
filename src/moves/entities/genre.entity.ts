import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Move } from "./move.entity";

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Move, (move: Move) => move.genres)
  moves: Move[];
}