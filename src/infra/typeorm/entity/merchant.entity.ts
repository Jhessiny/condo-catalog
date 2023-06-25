import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('merchants')
export class Merchant {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('character varying')
  name: string

  @Column('character varying')
  category: string

  @Column('character varying', { nullable: true })
  subCategory?: string | null

  @Column('character varying', { name: 'phone', length: 11 })
  phone: string

  @Column('character varying', {
    name: 'miniBio',
    nullable: true,
    length: 600,
  })
  miniBio?: string | null
}
