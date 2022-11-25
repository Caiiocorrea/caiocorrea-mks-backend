import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Move } from "./move.entity";

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  local: string;

  @ManyToMany(() => Move, (move: Move) => move.artists)
  moves: Move[];
}