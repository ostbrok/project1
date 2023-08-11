export enum UserRoleEnum {
    'NOT_SELECTED' = 'Не выбрана',
    'BOSS' = 'Начальник',
    'EMPLOYEE' = 'Работник'
}

export interface IUser {
    docId: string
    id: number
    firstname?: string
    lastname?: string
    phoneNumber?: string
    image: string
    role?: UserRoleEnum
}
