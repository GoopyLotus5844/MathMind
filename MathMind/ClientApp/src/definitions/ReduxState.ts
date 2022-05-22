import { User } from "./User"
import { ThemeType } from "./ThemeType";

export interface ReduxState {
    currentUser: User,
    theme: ThemeType
}