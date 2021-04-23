import { v4 as uuid } from 'uuid'

import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn,
} from 'typeorm'

@Entity('users')
class User {
    @PrimaryColumn()
    id: string

    @Column()
    email: string

    @UpdateDateColumn()
    updated_at: Date

    @CreateDateColumn()
    created_at: Date

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }
}

export { User }
