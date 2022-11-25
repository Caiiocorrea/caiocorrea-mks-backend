import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, } from "typeorm";
import { Artist } from "./artist.entity";
import { Genre } from "./genre.entity";

@Entity()
export class Move {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column()
  yearrealization: string;

  @Column()
  duration: string;

  @ManyToMany(() => Artist, (artist: Artist) => artist.moves, {
    cascade: true
  })
  @JoinTable()
  artists: Artist[];

  @ManyToMany(() => Genre, (genre: Genre) => genre.moves, {
    cascade: true
  })
  @JoinTable()
  genres: Genre[];
}