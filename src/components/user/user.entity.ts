/* eslint-disable camelcase */
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  BeforeInsert,
} from 'typeorm'

import { v4 as uuid } from 'uuid'
import bcrypt from 'bcrypt'
import { zonedTimeToUtc } from 'date-fns-tz'

@Entity({ name: 'users' })
class User {
  @PrimaryColumn()
  private id!: string

  @Column({ nullable: false })
  private name: string

  @Column({ nullable: false })
  private email: string

  @Column({ name: 'password_hash', nullable: false })
  private passwordHash!: string

  @CreateDateColumn({ name: 'created_at' })
  private createdAt!: Date

  static password: string

  constructor(name: string, email: string, password: string) {
    this.name = name
    this.email = email
    User.password = password
  }

  @BeforeInsert()
  private generateUUid() {
    this.id = uuid()
  }

  @BeforeInsert()
  private async generatePasswordHash() {
    const hashCost = 12
    this.passwordHash = await bcrypt.hash(User.password, hashCost)
  }

  @BeforeInsert()
  private generatedCreateAt() {
    this.createdAt = zonedTimeToUtc(new Date(), '', {
      timeZone: 'America/Sao_Paulo',
    })
  }

  get Id(): string {
    return this.id
  }

  get Name(): string {
    return this.name
  }

  get Email(): string {
    return this.email
  }

  get PassWord(): string {
    return this.passwordHash
  }
}

export default User
